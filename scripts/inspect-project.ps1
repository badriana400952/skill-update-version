param (
    [string]$TargetDir = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

$pkgPath = Join-Path $TargetDir "package.json"
if (-not (Test-Path $pkgPath)) {
    Write-Error "No package.json found at: $TargetDir"
    exit 1
}

$rawJson = Get-Content $pkgPath -Raw | ConvertFrom-Json

# Detect package manager
$pm = "npm"
if (Test-Path (Join-Path $TargetDir "pnpm-lock.yaml")) { $pm = "pnpm" }
elseif (Test-Path (Join-Path $TargetDir "yarn.lock")) { $pm = "yarn" }
elseif (Test-Path (Join-Path $TargetDir "bun.lockb")) { $pm = "bun" }

# Collect dependencies
$allDeps = @{}
if ($rawJson.dependencies) {
    $rawJson.dependencies.psobject.properties | ForEach-Object { $allDeps[$_.Name] = $_.Value }
}
if ($rawJson.devDependencies) {
    $rawJson.devDependencies.psobject.properties | ForEach-Object { $allDeps[$_.Name] = $_.Value }
}

$report = [PSCustomObject]@{
    TargetDir             = $TargetDir
    ProjectName           = if ($rawJson.name) { $rawJson.name } else { "unnamed" }
    PackageManager        = $pm
    NodeEngine            = if ($rawJson.engines -and $rawJson.engines.node) { $rawJson.engines.node } else { "unspecified" }
    NextVersion           = $allDeps["next"]
    ReactVersion          = $allDeps["react"]
    VueVersion            = $allDeps["vue"]
    RoutingArchitecture   = "N/A"
    RecommendedSkill      = "framework-upgrade-orchestrator"
}

# Next.js detection
if ($allDeps.ContainsKey("next")) {
    $hasApp = (Test-Path (Join-Path $TargetDir "app")) -or (Test-Path (Join-Path $TargetDir "src\app"))
    $hasPages = (Test-Path (Join-Path $TargetDir "pages")) -or (Test-Path (Join-Path $TargetDir "src\pages"))

    if ($hasApp -and $hasPages) {
        $report.RoutingArchitecture = "Hybrid (Pages Router + App Router)"
    } elseif ($hasApp) {
        $report.RoutingArchitecture = "App Router"
    } elseif ($hasPages) {
        $report.RoutingArchitecture = "Pages Router"
    }
    $report.RecommendedSkill = "nextjs-upgrade"
}
elseif ($allDeps.ContainsKey("vue")) {
    $report.RecommendedSkill = "vue-upgrade"
}
elseif ($allDeps.ContainsKey("react")) {
    $report.RecommendedSkill = "react-upgrade"
}

Write-Output ($report | Format-List | Out-String)
