#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '..');
const SKILLS_SRC_DIR = join(ROOT_DIR, 'skills');

const args = process.argv.slice(2);
const command = args[0] || 'help';

function printBanner() {
  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                FRAMEWORK UPGRADE SKILLS SUITE                     ║
║   Automated Framework Migrations for AI Coding Agents             ║
╚═══════════════════════════════════════════════════════════════════╝
`);
}

function printHelp() {
  printBanner();
  console.log(`Penggunaan:
  npx framework-upgrade-skills <command> [options]

Perintah yang tersedia:
  install           Pasang skills ke coding agent (Antigravity, Claude Code, dll)
  list              Daftar skills yang tersedia di dalam suite
  inspect [dir]     Periksa framework & versi dari project di direktori saat ini
  help              Tampilkan bantuan ini

Pilihan untuk 'install':
  --agent <name>    Pilih target agent: antigravity | claude | local | all
                    (Default: otomatis mendeteksi agent yang terpasang)
  --dest <path>     Tentukan path folder tujuan kustom

Contoh:
  npx framework-upgrade-skills install
  npx framework-upgrade-skills install --agent antigravity
  npx framework-upgrade-skills install --agent claude
  npx framework-upgrade-skills inspect
  npx framework-upgrade-skills inspect ./my-legacy-app
`);
}

function getAvailableSkills() {
  if (!existsSync(SKILLS_SRC_DIR)) return [];
  return readdirSync(SKILLS_SRC_DIR).filter(item => {
    const fullPath = join(SKILLS_SRC_DIR, item);
    return statSync(fullPath).isDirectory() && existsSync(join(fullPath, 'SKILL.md'));
  });
}

function listSkills() {
  printBanner();
  console.log('Skills yang tersedia di dalam paket:');
  const skills = getAvailableSkills();
  if (skills.length === 0) {
    console.log('  (Tidak ada skill ditemukan)');
    return;
  }

  for (const skill of skills) {
    const skillMdPath = join(SKILLS_SRC_DIR, skill, 'SKILL.md');
    let desc = '';
    try {
      const content = readFileSync(skillMdPath, 'utf8');
      const match = content.match(/description:\s*([^\n\r]+)/);
      if (match) desc = match[1].trim();
    } catch {
      // ignore
    }
    console.log(`\n  • \x1b[1m\x1b[36m${skill}\x1b[0m`);
    if (desc) {
      console.log(`    ${desc}`);
    }
  }
  console.log('\n');
}

function resolveDestinations(agentFlag, customDest) {
  if (customDest) {
    return [resolve(customDest)];
  }

  const home = homedir();
  const destinations = [];

  const antigravityPath = join(home, '.gemini', 'config', 'skills');
  const claudeGlobalPath = join(home, '.claude', 'skills');
  const localProjectAgentPath = resolve(process.cwd(), '.agents', 'skills');
  const localProjectClaudePath = resolve(process.cwd(), '.claude', 'skills');

  if (agentFlag === 'antigravity') {
    destinations.push({ name: 'Google Antigravity', path: antigravityPath });
  } else if (agentFlag === 'claude') {
    destinations.push({ name: 'Claude Code (Global)', path: claudeGlobalPath });
  } else if (agentFlag === 'local') {
    destinations.push({ name: 'Local Project (.agents/skills)', path: localProjectAgentPath });
  } else if (agentFlag === 'all') {
    destinations.push({ name: 'Google Antigravity', path: antigravityPath });
    destinations.push({ name: 'Claude Code (Global)', path: claudeGlobalPath });
  } else {
    // Auto detect existing configs or default to Antigravity and Local
    let found = false;
    if (existsSync(join(home, '.gemini'))) {
      destinations.push({ name: 'Google Antigravity', path: antigravityPath });
      found = true;
    }
    if (existsSync(join(home, '.claude'))) {
      destinations.push({ name: 'Claude Code (Global)', path: claudeGlobalPath });
      found = true;
    }
    if (!found) {
      // Default fallback
      destinations.push({ name: 'Google Antigravity (Default)', path: antigravityPath });
      destinations.push({ name: 'Local Project (.agents/skills)', path: localProjectAgentPath });
    }
  }

  return destinations;
}

function installSkills() {
  printBanner();
  const skills = getAvailableSkills();
  if (skills.length === 0) {
    console.error('\x1b[31m[ERROR] Folder skills tidak ditemukan di dalam paket!\x1b[0m');
    process.exit(1);
  }

  let agentFlag = null;
  let customDest = null;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--agent' && args[i + 1]) {
      agentFlag = args[i + 1].toLowerCase();
      i++;
    } else if (args[i] === '--dest' && args[i + 1]) {
      customDest = args[i + 1];
      i++;
    }
  }

  const targets = resolveDestinations(agentFlag, customDest);

  console.log(`Memasang ${skills.length} skills ke target environment...\n`);

  for (const target of targets) {
    const targetPath = typeof target === 'string' ? target : target.path;
    const targetName = typeof target === 'string' ? target : target.name;

    console.log(`\x1b[1m\x1b[34m[>] Target: ${targetName}\x1b[0m`);
    console.log(`    Path: ${targetPath}`);

    try {
      if (!existsSync(targetPath)) {
        mkdirSync(targetPath, { recursive: true });
      }

      for (const skill of skills) {
        const src = join(SKILLS_SRC_DIR, skill);
        const dst = join(targetPath, skill);
        cpSync(src, dst, { recursive: true, force: true });
        console.log(`    \x1b[32m✔\x1b[0m ${skill}`);
      }
      console.log(`    \x1b[32m✓ Sukses dipasang di ${targetName}!\x1b[0m\n`);
    } catch (err) {
      console.error(`    \x1b[31m✖ Gagal memasang di ${targetName}: ${err.message}\x1b[0m\n`);
    }
  }

  console.log(`\x1b[1m\x1b[32mSemua skills berhasil dipasang!\x1b[0m`);
  console.log(`Sekarang Anda bisa membuka project di AI Coding Agent Anda dan menjalankan perintah seperti:`);
  console.log(`  "Tolong upgrade project ini ke Next.js 15 mengikuti panduan resmi."`);
  console.log(`  "Gunakan framework-upgrade-orchestrator untuk memperbarui project ini."\n`);
}

function inspectProject() {
  const targetDir = args[1] ? resolve(args[1]) : process.cwd();
  const pkgPath = join(targetDir, 'package.json');

  printBanner();
  console.log(`Memeriksa project di: \x1b[1m${targetDir}\x1b[0m\n`);

  if (!existsSync(pkgPath)) {
    console.error(`\x1b[31m[ERROR] Tidak ditemukan package.json di direktori ini!\x1b[0m`);
    process.exit(1);
  }

  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    let pm = 'npm';
    if (existsSync(join(targetDir, 'pnpm-lock.yaml'))) pm = 'pnpm';
    else if (existsSync(join(targetDir, 'yarn.lock'))) pm = 'yarn';
    else if (existsSync(join(targetDir, 'bun.lockb'))) pm = 'bun';

    console.log(`  Nama Project     : \x1b[33m${pkg.name || 'unnamed'}\x1b[0m`);
    console.log(`  Package Manager  : \x1b[36m${pm}\x1b[0m`);
    console.log(`  Node Engine      : ${pkg.engines?.node || 'unspecified'}`);

    let detected = false;

    if (deps['next']) {
      detected = true;
      const hasApp = existsSync(join(targetDir, 'app')) || existsSync(join(targetDir, 'src', 'app'));
      const hasPages = existsSync(join(targetDir, 'pages')) || existsSync(join(targetDir, 'src', 'pages'));
      let routerType = 'Unknown';
      if (hasApp && hasPages) routerType = 'Hybrid (Pages + App Router)';
      else if (hasApp) routerType = 'App Router';
      else if (hasPages) routerType = 'Pages Router';

      console.log(`\n  \x1b[1mFramework Terdeteksi: Next.js\x1b[0m`);
      console.log(`  • Versi Saat Ini : ${deps['next']}`);
      console.log(`  • React Versi    : ${deps['react'] || 'Not directly installed'}`);
      console.log(`  • Arsitektur     : ${routerType}`);
      console.log(`  • Skill Target   : \x1b[32mnextjs-upgrade\x1b[0m`);
    }

    if (deps['vue']) {
      detected = true;
      console.log(`\n  \x1b[1mFramework Terdeteksi: Vue.js\x1b[0m`);
      console.log(`  • Versi Saat Ini : ${deps['vue']}`);
      console.log(`  • Vue Router     : ${deps['vue-router'] || 'None'}`);
      console.log(`  • State Manager  : ${deps['pinia'] ? 'pinia' : deps['vuex'] ? 'vuex' : 'none'}`);
      console.log(`  • Skill Target   : \x1b[32mvue-upgrade\x1b[0m`);
    }

    if (deps['react'] && !deps['next']) {
      detected = true;
      console.log(`\n  \x1b[1mFramework Terdeteksi: React (SPA/Custom)\x1b[0m`);
      console.log(`  • Versi React    : ${deps['react']}`);
      console.log(`  • React DOM      : ${deps['react-dom'] || 'None'}`);
      console.log(`  • Types React    : ${deps['@types/react'] || 'None'}`);
      console.log(`  • Skill Target   : \x1b[32mreact-upgrade\x1b[0m`);
    }

    if (!detected) {
      console.log(`\n  \x1b[33mTidak ditemukan framework spesifik (React/Next/Vue) di dependencies.\x1b[0m`);
      console.log(`  • Skill Terkait  : \x1b[32mframework-upgrade-orchestrator\x1b[0m`);
    }

    console.log(`\n\x1b[1m\x1b[32mRekomendasi:\x1b[0m Jalankan AI Agent Anda dengan skill \x1b[36mframework-upgrade-orchestrator\x1b[0m.`);
  } catch (err) {
    console.error(`\x1b[31m[ERROR] Gagal membaca package.json: ${err.message}\x1b[0m`);
  }
}

switch (command) {
  case 'install':
  case 'i':
    installSkills();
    break;
  case 'list':
  case 'ls':
    listSkills();
    break;
  case 'inspect':
  case 'scan':
    inspectProject();
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}
