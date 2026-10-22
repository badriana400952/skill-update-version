# Windows PowerShell 1-Liner Installer for Framework Upgrade Skills
$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "     FRAMEWORK UPGRADE SKILLS SUITE INSTALLER (WINDOWS)     " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$repoUrl = "https://github.com/username/skill-update-versi"
$tempZip = Join-Path $env:TEMP "framework-upgrade-skills.zip"
$tempExtract = Join-Path $env:TEMP "framework-upgrade-skills-main"
$antigravitySkillsDir = Join-Path $env:USERPROFILE ".gemini\config\skills"
$claudeSkillsDir = Join-Path $env:USERPROFILE ".claude\skills"

# Check local current repo directory first
$localSkillsDir = Join-Path $PSScriptRoot "skills"
if (Test-Path $localSkillsDir) {
    Write-Host "[+] Terdeteksi berjalan dari folder lokal repository." -ForegroundColor Green
    $sourceDir = $localSkillsDir
} else {
    Write-Host "[+] Mengunduh skills dari repository GitHub..." -ForegroundColor Yellow
    $zipUrl = "$repoUrl/archive/refs/heads/main.zip"
    Invoke-WebRequest -Uri $zipUrl -OutFile $tempZip
    Expand-Archive -Path $tempZip -DestinationPath $env:TEMP -Force
    $sourceDir = Join-Path $tempExtract "skills"
}

# Target Antigravity
if (-not (Test-Path $antigravitySkillsDir)) {
    New-Item -ItemType Directory -Force -Path $antigravitySkillsDir | Out-Null
}
Copy-Item -Path "$sourceDir\*" -Destination $antigravitySkillsDir -Recurse -Force
Write-Host "[✔] Sukses memasang ke Google Antigravity: $antigravitySkillsDir" -ForegroundColor Green

# Optional: Claude Code
if (Test-Path (Join-Path $env:USERPROFILE ".claude")) {
    if (-not (Test-Path $claudeSkillsDir)) {
        New-Item -ItemType Directory -Force -Path $claudeSkillsDir | Out-Null
    }
    Copy-Item -Path "$sourceDir\*" -Destination $claudeSkillsDir -Recurse -Force
    Write-Host "[✔] Sukses memasang ke Claude Code: $claudeSkillsDir" -ForegroundColor Green
}

Write-Host "`nSemua skills siap digunakan!" -ForegroundColor Cyan
Write-Host "Buka coding agent Anda dan ketik:"
Write-Host "  'Tolong upgrade project ini ke Next.js 15 dan ikuti panduan resminya.'" -ForegroundColor Yellow
