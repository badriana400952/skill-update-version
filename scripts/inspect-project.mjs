#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const targetDir = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

function detectPackageManager(dir) {
  if (existsSync(join(dir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(dir, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(dir, 'bun.lockb'))) return 'bun';
  if (existsSync(join(dir, 'package-lock.json'))) return 'npm';
  return 'unknown';
}

function inspect() {
  const pkgPath = join(targetDir, 'package.json');
  if (!existsSync(pkgPath)) {
    console.error(`[!] No package.json found at: ${targetDir}`);
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const pm = detectPackageManager(targetDir);

  const report = {
    targetDir,
    projectName: pkg.name || 'unnamed',
    packageManager: pm,
    nodeEngine: pkg.engines?.node || 'unspecified',
    frameworks: {},
    routingArchitecture: 'unknown',
    recommendedSkill: 'framework-upgrade-orchestrator',
  };

  // Next.js detection
  if (deps['next']) {
    report.frameworks.nextjs = {
      installedVersion: deps['next'],
      hasPagesRouter: existsSync(join(targetDir, 'pages')) || existsSync(join(targetDir, 'src', 'pages')),
      hasAppRouter: existsSync(join(targetDir, 'app')) || existsSync(join(targetDir, 'src', 'app')),
    };
    if (report.frameworks.nextjs.hasAppRouter && report.frameworks.nextjs.hasPagesRouter) {
      report.routingArchitecture = 'hybrid (Pages + App Router)';
    } else if (report.frameworks.nextjs.hasAppRouter) {
      report.routingArchitecture = 'App Router';
    } else if (report.frameworks.nextjs.hasPagesRouter) {
      report.routingArchitecture = 'Pages Router';
    }
    report.recommendedSkill = 'nextjs-upgrade';
  }

  // React detection
  if (deps['react']) {
    report.frameworks.react = {
      installedVersion: deps['react'],
      reactDomVersion: deps['react-dom'],
      typesReact: deps['@types/react'],
    };
    if (!report.frameworks.nextjs) {
      report.recommendedSkill = 'react-upgrade';
    }
  }

  // Vue detection
  if (deps['vue']) {
    report.frameworks.vue = {
      installedVersion: deps['vue'],
      vueRouter: deps['vue-router'],
      stateManager: deps['pinia'] ? 'pinia' : deps['vuex'] ? 'vuex' : 'none',
      compiler: deps['@vue/compiler-sfc'],
    };
    report.recommendedSkill = 'vue-upgrade';
  }

  console.log(JSON.stringify(report, null, 2));
}

inspect();
