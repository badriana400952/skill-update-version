 tujuan saya membuat skill AI untuk upgrade versi framework secara otomatis mengikuti dokumentasi resminya, menurutku pendekatan terbaik adalah membuat beberapa skill spesialis, bukan satu skill yang mencampur semua framework.

Misalnya, skill tersebut dipasang di Antigravity atau AI coding agent lain. Saat saya membuka project lama, AI bisa menganalisis versi yang digunakan, membaca dokumentasi resmi React, Next.js, atau Vue, menemukan API yang deprecated atau berubah, lalu memperbarui kode dengan cara yang sesuai versi target.
1. Konsep skill yang ingin saya buat

1. Analisis project

AI mendeteksi framework, versi saat ini, package manager, struktur folder, konfigurasi, dan API yang digunakan.




2. Pelajari dokumentasi resmi

AI mencari panduan upgrade, breaking changes, API deprecated, codemod, dan migration guide sesuai versi target.




3. Buat rencana migrasi

AI mencocokkan perubahan dokumentasi dengan kode project, kemudian menjelaskan file yang perlu diperbarui beserta alasannya.




4. Upgrade dan verifikasi

AI memperbarui kode, menjalankan pemeriksaan yang tersedia, memperbaiki error migrasi, dan melaporkan bagian yang belum berhasil.



Prinsip terpentingnya: AI tidak boleh mengarang perubahan API berdasarkan ingatan model. Dokumentasi resmi dan hasil pemeriksaan project harus menjadi sumber utama.
2. Struktur skill yang aku rekomendasikan
Karena saya menggunakan Antigravity dan sudah terbiasa dengan skill spesialis, buat struktur seperti ini di direktori skills milikmu.
skills/

framework-upgrade-orchestrator/

Mendeteksi framework dan mengatur alur migrasi.


react-upgrade/

React, React DOM, Hooks, TypeScript, API deprecated.


nextjs-upgrade/

Next.js, Pages Router, App Router, routing, caching, API routes.


vue-upgrade/

Vue 2/3, Composition API, lifecycle, directives, Vue Router.




Setiap folder memiliki file SKILL.md. Skill utama mengarahkan AI ke skill spesialis yang tepat. saya tidak harus mengaktifkan semuanya untuk setiap project.

Perlu diluruskan juga: React 14 tidak pernah menjadi rilis resmi React. Kemungkinan yang saya maksud adalah Next.js 14, atau React 18 yang ingin dinaikkan ke React 19. Dokumentasi React saat ini mencantumkan React 19.3 sebagai versi terbaru. 

React
+1



3. Contoh SKILL.md yang bisa langsung saya buat
Aku sarankan mulai dari satu skill inti yang bisa menangani React, Next.js, dan Vue, lalu dikembangkan menjadi skill spesialis. Berikut fondasi yang bisa saya gunakan.

File: framework-upgrade/SKILL.md

---
name: framework-upgrade
description: >
  Analyze, plan, and migrate existing React, Next.js, and Vue projects
  to a requested or latest stable version using official documentation,
  version-specific migration guides, and verified project checks.
---

# Framework Upgrade Skill

## Objective

Safely upgrade existing projects to a target framework version
while preserving existing business logic, architecture, and behavior.

## Supported frameworks

- React and React DOM
- Next.js
- Vue.js
- Related official framework tooling and type definitions

## Mandatory workflow

### 1. Inspect the project

Before modifying anything:

- Read package.json and the lockfile.
- Identify the package manager.
- Detect current framework and runtime versions.
- Inspect TypeScript, build tools, linting, and test configuration.
- Identify routing architecture and application entry points.
- Identify dependencies that may be incompatible with the target version.
- Inspect existing business logic and public APIs.

Do not assume the project architecture.

### 2. Establish the target version

If the user requests a specific version, use that version.

If the user requests the latest version:

- Verify the latest stable release from official sources.
- Do not automatically select alpha, beta, experimental, or canary.
- Check supported Node.js and package manager versions.
- Check peer dependency compatibility.

Never invent version numbers.

### 3. Read official documentation

Use the official sources first.

React:
https://react.dev/

React upgrade guide:
https://react.dev/blog/2024/04/25/react-19-upgrade-guide

Next.js:
https://nextjs.org/docs

Next.js upgrade guide:
https://nextjs.org/docs/app/getting-started/upgrading

Vue:
https://vuejs.org/

Vue migration guide:
https://v3-migration.vuejs.org/

Find documentation relevant to both the current and target versions.

Identify:

- Breaking changes
- Deprecated and removed APIs
- Changed hooks and function signatures
- Changed component lifecycle behavior
- Configuration changes
- Runtime and TypeScript changes
- Required dependency upgrades
- Official codemods and migration tools

If official documentation cannot be accessed,
state that limitation and do not claim verification.

### 4. Map changes to the codebase

For each documented change:

- Find affected files and usages.
- Explain the current behavior.
- Explain the target-version behavior.
- Propose the smallest safe change.
- Check whether third-party packages are affected.
- Preserve existing business logic unless changes are necessary.

Do not replace working APIs merely because a newer
alternative exists. Verify whether replacement is required.

### 5. Prepare a migration plan

Classify findings as:

- Breaking change
- Deprecated API
- Optional improvement
- Dependency incompatibility
- Potential regression

List affected files, migration steps, risks, and validation commands.

Prefer incremental upgrades across major versions when required
by official migration guides or dependency constraints.

### 6. Apply changes safely

- Preserve existing project conventions.
- Use official codemods where appropriate.
- Review codemod output before accepting it.
- Do not overwrite configuration without inspecting it.
- Do not remove dependencies without checking their usage.
- Do not silently change routing architecture.
- Do not claim that a command succeeded unless it actually ran.

### 7. Verify the migration

Run available checks appropriate to the project:

- Package installation
- Type checking
- Linting
- Production build
- Unit and integration tests

Inspect runtime errors and migration warnings when possible.

Fix regressions introduced by the migration.
Distinguish migration failures from pre-existing failures.

### 8. Final report

Report:

1. Original and target versions
2. Official documentation consulted
3. Breaking changes found
4. Files modified and reasons
5. Dependencies upgraded or blocked
6. Commands executed and actual results
7. Remaining risks and manual actions

Never claim full compatibility without sufficient verification.



Dokumentasi yang dicantumkan di atas memang memiliki panduan migrasi resmi. Contohnya, React menyediakan panduan perubahan API dan codemod React 19; Next.js menyediakan panduan upgrade per versi; dan Vue menyediakan daftar breaking changes beserta strategi migrasinya. 

React
+2



4. Contoh kasus yang harus bisa ditangani AI
Berikut beberapa contoh supaya skill ini bukan sekadar menyuruh AI mengganti nomor versi di package.json.
React 18 → React 19

API migration

Misalnya, AI menemukan ReactDOM.render, findDOMNode, atau defaultProps pada function component. AI harus memeriksa dokumentasi dan mengubah pemakaian yang memang sudah tidak didukung.

Referensi: React 19 Upgrade Guide.


Next.js 14 → versi terbaru

Framework migration

AI harus memeriksa perubahan per major version, kompatibilitas React dan Node.js, konfigurasi, cache, routing, serta API yang digunakan. Project Pages Router tidak boleh langsung diubah menjadi App Router tanpa alasan dan persetujuan yang sesuai.

Referensi: Next.js Upgrade Guide.


Vue 2 → Vue 3

Breaking changes

AI perlu mendeteksi penggunaan $listeners, $scopedSlots, Vue.set, lifecycle beforeDestroy, dan pola lain yang mengalami perubahan. Selanjutnya, AI memeriksa Vue Router, state management, serta kompatibilitas plugin.

Referensi: Vue 3 Breaking Changes.


Contoh-contoh tersebut adalah kasus migrasi yang terdokumentasi, bukan berarti setiap project pasti menggunakan API tersebut.
5. Cara meningkatkan skill agar benar-benar mengikuti dokumentasi terbaru
Ada satu hal penting: menaruh URL dokumentasi di SKILL.md belum otomatis membuat AI membaca dokumentasi setiap saat. AI perlu mempunyai akses pencarian web, browser, atau dokumentasi yang tersedia secara lokal.

Aku merekomendasikan tiga lapisan berikut.
Lapisan	Tugas
SKILL.md	Mengatur instruksi dan alur kerja migrasi.
Dokumentasi resmi	Menjadi sumber kebenaran untuk versi dan perubahan API.
Pemeriksaan otomatis	Memvalidasi dependency, type checking, build, lint, dan test.

Jika nanti ingin lebih canggih, tambahkan:
- MCP dokumentasi untuk membantu AI mengambil informasi resmi.
- Version compatibility matrix untuk mencatat versi framework, Node.js, TypeScript, dan dependency yang kompatibel.
- Codemod runner untuk menerapkan transformasi kode yang sudah tersedia.
- Regression checks untuk memastikan fitur lama tidak rusak setelah upgrade.
Untuk upgrade major version, jangan langsung memperbarui seluruh dependency ke versi terbaru secara bersamaan. Periksa kompatibilitas dan lakukan migrasi bertahap jika diperlukan.