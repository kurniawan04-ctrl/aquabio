# 📤 PANDUAN PUSH KE GIT REPOSITORY - STEP BY STEP

**Tujuan:** Push perubahan dari local ke GitHub/GitLab repository menggunakan Git Bash.

---

## 📋 LANGKAH 1: BUKA GIT BASH

1. **Buka Git Bash:**
   - Klik kanan di folder project `aquabio`
   - Pilih **"Git Bash Here"**
   - Atau buka Git Bash dan `cd` ke folder project:
     ```bash
     cd /c/Users/ASUS/Downloads/aquabio
     ```

---

## 📋 LANGKAH 2: CEK STATUS GIT

**Perintah:**
```bash
git status
```

**Yang harus dicek:**
- ✅ File yang diubah muncul di "Changes not staged for commit"
- ✅ File baru muncul di "Untracked files"
- ❌ Jika muncul "nothing to commit, working tree clean" → tidak ada perubahan

**Contoh output:**
```
On branch master
Changes not staged for commit:
  modified:   src/components/UploadFoto.tsx
  modified:   src/actions/biota.ts

Untracked files:
  DEPLOY_PRODUCTION.md
```

---

## 📋 LANGKAH 3: STAGE SEMUA PERUBAHAN

**Perintah:**
```bash
git add .
```

**Penjelasan:**
- `git add .` = menambahkan semua file yang diubah ke staging area
- File siap untuk di-commit

**Alternatif (jika hanya ingin stage file tertentu):**
```bash
# Stage file tertentu saja
git add src/components/UploadFoto.tsx
git add src/actions/biota.ts
```

**Verifikasi:**
```bash
git status
```

**Output yang diharapkan:**
```
On branch master
Changes to be committed:
  modified:   src/components/UploadFoto.tsx
  modified:   src/actions/biota.ts
  new file:   DEPLOY_PRODUCTION.md
```

---

## 📋 LANGKAH 4: COMMIT PERUBAHAN

**Perintah:**
```bash
git commit -m "Deskripsi perubahan yang jelas"
```

**Contoh pesan commit yang baik:**
```bash
# Contoh 1: Perbaikan fitur
git commit -m "Perbaiki fitur upload foto dan tambahkan validasi ukuran file"

# Contoh 2: Tambah fitur baru
git commit -m "Tambahkan support format HEIC dan TIFF untuk upload foto"

# Contoh 3: Fix bug
git commit -m "Fix: Perbaiki validasi email Google untuk registrasi"

# Contoh 4: Update dokumentasi
git commit -m "Update dokumentasi deploy production"
```

**⚠️ PENTING:**
- Gunakan pesan commit yang jelas dan deskriptif
- Jangan gunakan pesan kosong atau terlalu singkat
- Gunakan bahasa Indonesia atau Inggris (konsisten)

**Verifikasi:**
```bash
git log --oneline -1
```

**Output yang diharapkan:**
```
abc1234 Perbaiki fitur upload foto dan tambahkan validasi ukuran file
```

---

## 📋 LANGKAH 5: PUSH KE REPOSITORY

**Perintah:**
```bash
git push origin master
```

**ATAU jika branch Anda `main`:**
```bash
git push origin main
```

**Penjelasan:**
- `git push` = mengirim commit ke remote repository
- `origin` = nama remote repository (biasanya GitHub/GitLab)
- `master` = nama branch yang akan di-push

**Verifikasi:**
```bash
git status
```

**Output yang diharapkan:**
```
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

---

## 📋 LANGKAH 6: VERIFIKASI DI GITHUB/GITLAB

1. **Buka repository di browser:**
   - GitHub: `https://github.com/username/aquabio`
   - GitLab: `https://gitlab.com/username/aquabio`

2. **Cek commit terbaru:**
   - Klik tab **"Commits"**
   - Pastikan commit terbaru sudah ada dengan pesan yang benar

3. **Cek file yang diubah:**
   - Klik commit terbaru
   - Pastikan semua file yang diubah sudah ter-push

---

## 🎯 QUICK REFERENCE - COPY PASTE READY

**Urutan lengkap (copy-paste semua):**

```bash
# 1. Cek status
git status

# 2. Stage semua perubahan
git add .

# 3. Commit dengan pesan jelas
git commit -m "Deskripsi perubahan Anda di sini"

# 4. Push ke repository
git push origin master
```

---

## 🐛 TROUBLESHOOTING

### ❌ Problem 1: "fatal: not a git repository"

**Error:**
```
fatal: not a git repository (or any of the parent directories): .git
```

**Solusi:**
```bash
# Pastikan Anda di folder project yang benar
cd /c/Users/ASUS/Downloads/aquabio

# Atau init git repository (jika belum ada)
git init
```

---

### ❌ Problem 2: "fatal: 'origin' does not appear to be a git repository"

**Error:**
```
fatal: 'origin' does not appear to be a git repository
```

**Solusi:**
```bash
# Cek remote repository
git remote -v

# Jika belum ada, tambahkan remote
git remote add origin https://github.com/username/aquabio.git

# Atau jika salah nama, ubah
git remote set-url origin https://github.com/username/aquabio.git
```

---

### ❌ Problem 3: "error: failed to push some refs"

**Error:**
```
error: failed to push some refs to 'origin'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally.
```

**Solusi:**
```bash
# Pull dulu perubahan dari remote
git pull origin master

# Resolve conflict jika ada, lalu push lagi
git push origin master
```

**ATAU jika yakin ingin overwrite (HATI-HATI!):**
```bash
git push origin master --force
```

---

### ❌ Problem 4: "Authentication failed"

**Error:**
```
remote: Support for password authentication was removed on August 13, 2021.
fatal: Authentication failed
```

**Solusi:**
1. **Gunakan Personal Access Token (PAT):**
   - GitHub: Settings → Developer settings → Personal access tokens
   - Buat token baru dengan permission `repo`
   - Gunakan token sebagai password saat push

2. **Atau setup SSH key:**
   ```bash
   # Generate SSH key
   ssh-keygen -t ed25519 -C "your_email@example.com"
   
   # Copy public key
   cat ~/.ssh/id_ed25519.pub
   
   # Tambahkan ke GitHub/GitLab → Settings → SSH Keys
   ```

---

### ❌ Problem 5: "nothing to commit, working tree clean"

**Pesan:**
```
On branch master
nothing to commit, working tree clean
```

**Penjelasan:**
- Tidak ada perubahan yang perlu di-commit
- Semua perubahan sudah di-commit sebelumnya
- **Tidak ada masalah**, ini normal

**Jika ingin cek commit terbaru:**
```bash
git log --oneline -5
```

---

## ✅ CHECKLIST FINAL

Setelah push, pastikan:

- [ ] `git status` menunjukkan "Your branch is up to date with 'origin/master'"
- [ ] Commit terbaru sudah muncul di GitHub/GitLab
- [ ] Semua file yang diubah sudah ter-push
- [ ] Tidak ada error saat push
- [ ] Vercel otomatis deploy (jika sudah terhubung)

---

## 📝 CONTOH LENGKAP - Skenario Real

**Skenario:** Anda sudah mengubah file `src/actions/biota.ts` dan ingin push:

```bash
# 1. Buka Git Bash di folder project
cd /c/Users/ASUS/Downloads/aquabio

# 2. Cek status
git status
# Output: modified: src/actions/biota.ts

# 3. Stage perubahan
git add .

# 4. Commit
git commit -m "Perbaiki validasi ukuran file upload menjadi 10MB"

# 5. Push
git push origin master
# Output: 
# Enumerating objects: 5, done.
# Counting objects: 100% (5/5), done.
# Writing objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.
# To https://github.com/username/aquabio.git
#    abc1234..def5678  master -> master

# 6. Verifikasi
git status
# Output: Your branch is up to date with 'origin/master'
```

---

## 🎓 TIPS PENTING

1. **Selalu cek status sebelum push:**
   ```bash
   git status
   ```

2. **Gunakan pesan commit yang jelas:**
   - ❌ `git commit -m "fix"`
   - ✅ `git commit -m "Fix: Perbaiki validasi ukuran file upload"`

3. **Jangan push langsung tanpa commit:**
   - Harus commit dulu sebelum push

4. **Cek remote repository:**
   ```bash
   git remote -v
   ```

5. **Jika ragu, cek dulu:**
   ```bash
   git log --oneline -5  # Lihat commit terbaru
   git diff              # Lihat perubahan yang belum di-commit
   ```

---

## 🚀 SETELAH PUSH BERHASIL

1. **Vercel akan otomatis deploy** (jika project sudah terhubung)
   - Tunggu 1-2 menit
   - Cek Vercel Dashboard → Deployments

2. **Verifikasi di GitHub/GitLab:**
   - Buka repository di browser
   - Cek commit terbaru sudah ada

3. **Test di production:**
   - Buka website Vercel
   - Test fitur yang sudah diubah

---

**✅ SELESAI!** Perubahan Anda sudah ter-push ke repository! 🎉

