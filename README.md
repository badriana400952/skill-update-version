# Framework Upgrade Skills Suite

Suite keahlian AI (skills) untuk memigrasikan dan meng-upgrade versi framework frontend (**React**, **Next.js**, dan **Vue.js**) secara otomatis, aman, dan berlandaskan **dokumentasi resmi**, tanpa halusinasi perubahan API.

---

## 🏗️ Arsitektur Skill

Sistem ini dirancang menggunakan pendekatan **spesialis modular**, dipimpin oleh sebuah orchestrator:

```
skills/
├── framework-upgrade-orchestrator/   # [Pintu Masuk] Mendeteksi framework & mengatur alur delegasi
│   ├── SKILL.md
│   └── references/
│       ├── triage-workflow.md        # Deteksi monorepo, framework & package manager
│       └── execution-checklist.md    # Quality gates & verifikasi 4 tahap
│
├── react-upgrade/                    # [Spesialis React] React 17 -> 18 -> 19
│   ├── SKILL.md
│   └── references/
│       ├── react19-breaking-changes.md # ref as prop, useActionState, context, defaultProps removal
│       ├── react18-breaking-changes.md # createRoot, automatic batching
│       ├── codemod-guide.md          # npx codemod@latest react/19/...
│       └── compatibility-matrix.md   # Node.js, TypeScript, UI libs
│
├── nextjs-upgrade/                   # [Spesialis Next.js] Next.js 13 -> 14 -> 15
│   ├── SKILL.md
│   └── references/
│       ├── next15-breaking-changes.md # async request APIs (cookies, headers, params), caching shift
│       ├── next14-breaking-changes.md # server actions, metadata
│       ├── codemod-guide.md          # @next/codemod upgrade
│       ├── pages-vs-app-router.md    # Aturan ketat: Jangan ubah Pages Router tanpa izin!
│       └── compatibility-matrix.md   # Next.js vs Node.js vs React 19
│
├── vue-upgrade/                      # [Spesialis Vue.js] Vue 2 -> Vue 3
│   ├── SKILL.md
│   └── references/
│       ├── vue3-breaking-changes.md  # createApp, v-model, listeners/attrs, lifecycle, Vue.set
│       ├── vue-router-and-state.md   # Vue Router 3->4, Vuex->Pinia
│       ├── migration-build-guide.md  # Strategi bertahap dengan @vue/compat
│       └── compatibility-matrix.md   # Node.js, Vite, TypeScript
│
└── framework-upgrade/                # [Skill Fondasi] Skill all-in-one / general fallback
    ├── SKILL.md
    └── references/
        └── general-upgrade-rules.md  # Prinsip anti-halusinasi & resolusi dependensi
```

---

## 🛡️ Prinsip Utama (Anti-Halusinasi)

1. **Sumber Kebenaran Adalah Dokumentasi Resmi**: AI tidak boleh mengarang API baru atau parameter fungsi berdasarkan ingatan model semata. AI harus memeriksa dokumentasi resmi, codemods resmi, dan file referensi lokal yang tersedia.
2. **Tidak Mengubah Arsitektur Tanpa Instruksi**:
   - Next.js: Project **Pages Router** **TIDAK BOLEH** langsung dirombak menjadi **App Router** kecuali ada permintaan eksplisit dari pengguna.
   - Vue: Komponen **Options API** **TIDAK BOLEH** dirombak paksa menjadi `<script setup>` hanya karena gaya baru.
3. **Upgrade Bertahap (Stepwise Major Version)**: Hindari melompati multi-versi secara drastis tanpa codemod resmi atau langkah persiapan (misal: Vue 2.6 -> 2.7 -> 3.x).
4. **Verifikasi Otomatis Nyata**: Menyatakan migrasi berhasil hanya jika perintah verifikasi (`tsc`, `lint`, `build`, `test`) benar-benar dieksekusi dan lolos.

---

## 🔄 4 Tahap Alur Kerja

```
1. Analisis Project  ──>  2. Pelajari Dokumen  ──>  3. Rencana Migrasi  ──>  4. Upgrade & Verifikasi
   - package.json          - Breaking changes        - Daftar file kena      - Package install
   - Lockfile              - Deprecated API          - Codemod runner        - Run codemods
   - Router model          - Compatibility check     - Risk assessment       - Typecheck & test
```

---

## 💻 Cara Install & Digunakan oleh Orang Lain Lewat Terminal

Anda dan pengguna lain dapat menginstall dan menggunakan skill suite ini melalui beberapa cara praktis berikut:

### Metode 1: Lewat NPX / NPM (Paling Direkomendasikan untuk Publik)

Setelah dipublikasikan ke npm registry, siapa pun dapat langsung menginstallnya dengan satu perintah di terminal:

```bash
# Menjalankan installer otomatis (mendeteksi Antigravity / Claude Code)
npx @badriana/framework-upgrade-skills install

# Atau menentukan target spesifik:
npx @badriana/framework-upgrade-skills install --agent antigravity
npx @badriana/framework-upgrade-skills install --agent claude
npx @badriana/framework-upgrade-skills install --agent local # Pasang di project saat ini (.agents/skills)

# Memeriksa framework & versi project sebelum upgrade:
npx @badriana/framework-upgrade-skills inspect
```

---

### Metode 2: One-Liner Script (Tanpa Install NPM)

Pengguna lain cukup menjalankan 1 baris perintah di terminal mereka:

**Di Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/badriana400952/skill-update-versi/main/install.ps1 | iex
```

**Di Linux / macOS (Bash / Zsh):**
```bash
curl -fsSL https://raw.githubusercontent.com/badriana400952/skill-update-versi/main/install.sh | bash
```

---

### Metode 3: Git Clone & Local Run

Jika pengguna meng-clone repository ini secara manual:

```bash
git clone https://github.com/badriana400952/skill-update-versi.git
cd skill-update-versi

# Install skills ke Antigravity & AI Agent di komputernya:
node bin/cli.js install

# Atau jika di Windows via PowerShell:
.\install.ps1
```

---

## 🚀 Cara Menggunakannya di AI Coding Agent Setelah Diinstall

Setelah diinstall ke agent mereka, pengguna tidak perlu lagi mengingat sintaks rumit. Cukup buka terminal coding agent mereka (Google Antigravity, Claude Code, Cursor, dsb.) di project lama mereka, dan ketik perintah alami:

- *"Tolong upgrade project ini ke Next.js 15 dan ikuti panduan resminya."*
- *"Gunakan framework-upgrade-orchestrator untuk menganalisis dan memperbarui framework project ini."*
- *"Periksa apakah ada breaking changes React 19 di komponen ini dan perbaiki menggunakan react-upgrade."*


---

## 🧰 Alat Bantu Otomatis

Tersedia skrip pemeriksa instan di `scripts/inspect-project.mjs`:
```bash
node scripts/inspect-project.mjs /path/ke/project-target
```
Output berupa ringkasan JSON yang berisi versi saat ini, arsitektur routing (Pages/App), package manager, dan rekomendasi skill yang harus dipanggil.
