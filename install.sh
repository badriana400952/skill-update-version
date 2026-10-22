#!/usr/bin/env bash
set -e

echo "============================================================"
echo "    FRAMEWORK UPGRADE SKILLS SUITE INSTALLER (MAC/LINUX)   "
echo "============================================================"

ANTIGRAVITY_DIR="$HOME/.gemini/config/skills"
CLAUDE_DIR="$HOME/.claude/skills"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCAL_SKILLS_DIR="$SCRIPT_DIR/skills"

if [ -d "$LOCAL_SKILLS_DIR" ]; then
    echo "[+] Menggunakan skills dari folder lokal repository..."
    SRC_DIR="$LOCAL_SKILLS_DIR"
else
    echo "[+] Mengunduh skills dari GitHub..."
    TMP_DIR=$(mktemp -d)
    curl -fsSL https://github.com/username/skill-update-versi/archive/refs/heads/main.tar.gz | tar -xz -C "$TMP_DIR"
    SRC_DIR="$TMP_DIR/skill-update-versi-main/skills"
fi

mkdir -p "$ANTIGRAVITY_DIR"
cp -r "$SRC_DIR"/* "$ANTIGRAVITY_DIR"/
echo "[✔] Berhasil dipasang ke Google Antigravity: $ANTIGRAVITY_DIR"

if [ -d "$HOME/.claude" ]; then
    mkdir -p "$CLAUDE_DIR"
    cp -r "$SRC_DIR"/* "$CLAUDE_DIR"/
    echo "[✔] Berhasil dipasang ke Claude Code: $CLAUDE_DIR"
fi

echo ""
echo "Semua skills siap digunakan di AI coding agent Anda!"
