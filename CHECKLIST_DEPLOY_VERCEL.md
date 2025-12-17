# ✅ CHECKLIST DEPLOY KE VERCEL - AQUABIODIVERSA

**Tujuan:** Memastikan semua perubahan lokal juga berjalan baik di website publik (Vercel).

---

## 📋 LANGKAH 1: VERIFIKASI PERUBAHAN LOKAL

### ✅ 1.1 Test Semua Fitur di Localhost
- [ ] **Layout Detail Biota** - Buka modal detail biota di:
  - [ ] Halaman Beranda
  - [ ] Halaman Gallery
  - [ ] Halaman Hasil Pencarian
  - [ ] Halaman Profil Pengguna
  - [ ] Halaman Admin
- [ ] **Notifikasi** - Test notifikasi untuk:
  - [ ] Upload biota (sukses & error)
  - [ ] Edit biota (sukses & error)
  - [ ] Hapus biota (sukses & error)
- [ ] **Fitur Lainnya:**
  - [ ] Login & Register
  - [ ] Pencarian biota
  - [ ] Upload foto biota
  - [ ] Edit foto biota
  - [ ] Hapus foto biota (user & admin)

### ✅ 1.2 Cek Console Errors
- [ ] Buka **Developer Tools** (F12)
- [ ] Cek tab **Console** - Pastikan tidak ada error merah
- [ ] Cek tab **Network** - Pastikan semua request berhasil (status 200/201)

### ✅ 1.3 Build Test Lokal
```bash
npm run build
```
- [ ] Build berhasil tanpa error
- [ ] Tidak ada warning yang critical
- [ ] Semua halaman ter-build dengan benar

---

## 📋 LANGKAH 2: GIT OPERATIONS

### ✅ 2.1 Cek Status Git
```bash
git status
```
- [ ] Pastikan semua file yang diubah sudah ter-track
- [ ] Tidak ada file penting yang ter-ignore

### ✅ 2.2 Stage Perubahan
```bash
git add .
```
- [ ] Semua file perubahan sudah di-stage

### ✅ 2.3 Commit Perubahan
```bash
git commit -m "Perbaiki layout detail biota dan tambahkan notifikasi"
```
- [ ] Commit berhasil
- [ ] Pesan commit jelas dan deskriptif

### ✅ 2.4 Push ke Repository
```bash
git push origin master
```
**ATAU jika branch Anda berbeda:**
```bash
git push origin main
```
- [ ] Push berhasil tanpa error
- [ ] Perubahan sudah ada di GitHub/GitLab

### ✅ 2.5 Verifikasi di GitHub/GitLab
- [ ] Buka repository di browser
- [ ] Cek **Commits** - Pastikan commit terbaru sudah ada
- [ ] Cek **Files changed** - Pastikan semua file yang diubah sudah ter-push

---

## 📋 LANGKAH 3: VERIFIKASI VERCEL CONFIGURATION

### ✅ 3.1 Cek Branch yang Terhubung ke Vercel
- [ ] Login ke [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Pilih project **AquaBiodiversa**
- [ ] Buka tab **Settings** → **Git**
- [ ] Pastikan **Production Branch** adalah `master` atau `main` (sesuai branch Anda)
- [ ] Pastikan branch yang Anda push sama dengan Production Branch

### ✅ 3.2 Verifikasi Environment Variables
Buka **Settings** → **Environment Variables**, pastikan ada:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - Value: URL Supabase project Anda (contoh: `https://xxxxx.supabase.co`)
  - Environment: **Production**, **Preview**, **Development** (semua)

- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Value: Anon/Public key dari Supabase
  - Environment: **Production**, **Preview**, **Development** (semua)

- [ ] `NEXT_PUBLIC_SITE_URL`
  - Value: URL website Vercel Anda (contoh: `https://aquabiodiversa.vercel.app`)
  - Environment: **Production**, **Preview**, **Development** (semua)

**⚠️ PENTING:** Jika environment variables belum ada atau salah, ikuti langkah di `CARA_SET_ENV_VERCEL.md`

---

## 📋 LANGKAH 4: TRIGGER DEPLOYMENT DI VERCEL

### ✅ 4.1 Automatic Deployment (Recommended)
- [ ] Setelah `git push`, Vercel akan **otomatis** deploy
- [ ] Buka tab **Deployments** di Vercel Dashboard
- [ ] Cek status deployment terbaru:
  - [ ] Status: **Ready** (hijau) = Berhasil
  - [ ] Status: **Error** (merah) = Ada masalah, cek logs

### ✅ 4.2 Manual Redeploy (Jika Perlu)
Jika automatic deployment tidak jalan atau ingin redeploy:

1. Buka **Deployments** tab
2. Klik **⋯** (three dots) pada deployment terbaru
3. Pilih **Redeploy**
4. Pilih **Use existing Build Cache** (opsional)
5. Klik **Redeploy**

- [ ] Redeploy berhasil
- [ ] Status menjadi **Ready**

---

## 📋 LANGKAH 5: VERIFIKASI DEPLOYMENT

### ✅ 5.1 Cek Build Logs
- [ ] Buka deployment terbaru di Vercel
- [ ] Klik **View Function Logs** atau **View Build Logs**
- [ ] Pastikan tidak ada error:
  - [ ] ✅ Build successful
  - [ ] ✅ No TypeScript errors
  - [ ] ✅ No ESLint errors
  - [ ] ✅ All pages generated

### ✅ 5.2 Cek Website Publik
Buka URL website Vercel Anda (contoh: `https://aquabiodiversa.vercel.app`)

- [ ] Website bisa diakses
- [ ] Tidak ada error "Missing Supabase environment variables"
- [ ] Halaman login/register muncul dengan benar

---

## 📋 LANGKAH 6: TEST FITUR DI PRODUCTION

### ✅ 6.1 Test Authentication
- [ ] **Login** - Masuk dengan akun yang sudah ada
- [ ] **Register** - Daftar akun baru (jika perlu)
- [ ] **Logout** - Pastikan logout berfungsi

### ✅ 6.2 Test Layout Detail Biota
Buka modal detail biota di berbagai halaman:

- [ ] **Halaman Beranda**
  - [ ] Klik salah satu kartu biota
  - [ ] Modal muncul dengan layout yang benar (gambar + detail seimbang)
  - [ ] Detail langsung terlihat tanpa scroll (di desktop)
  - [ ] Klik gambar bisa buka full-size

- [ ] **Halaman Gallery**
  - [ ] Klik salah satu foto biota
  - [ ] Modal muncul dengan layout yang benar
  - [ ] Detail langsung terlihat

- [ ] **Halaman Hasil Pencarian**
  - [ ] Search biota tertentu
  - [ ] Klik hasil pencarian
  - [ ] Modal muncul dengan layout yang benar

- [ ] **Halaman Profil Pengguna**
  - [ ] Klik foto biota milik user
  - [ ] Modal muncul dengan layout yang benar

- [ ] **Halaman Admin** (jika Anda admin)
  - [ ] Klik foto biota
  - [ ] Modal muncul dengan layout yang benar

### ✅ 6.3 Test Notifikasi
- [ ] **Upload Biota**
  - [ ] Upload foto biota baru
  - [ ] Notifikasi sukses muncul: "Biota berhasil di upload."
  - [ ] Redirect ke halaman beranda

- [ ] **Edit Biota**
  - [ ] Edit data biota
  - [ ] Notifikasi sukses muncul: "Biota berhasil diperbarui."

- [ ] **Hapus Biota (User)**
  - [ ] Hapus biota milik sendiri
  - [ ] Notifikasi sukses muncul: "Data biota Anda berhasil dihapus."

- [ ] **Hapus Biota (Admin)**
  - [ ] Hapus biota milik user lain (jika admin)
  - [ ] Notifikasi sukses muncul: "Biota berhasil dihapus."

### ✅ 6.4 Test Fitur Lainnya
- [ ] **Pencarian** - Search biota, hasil relevan
- [ ] **Upload Foto** - Upload berhasil, gambar muncul
- [ ] **Edit Foto** - Edit berhasil, perubahan tersimpan
- [ ] **Gallery** - Semua foto biota muncul
- [ ] **Profil** - Foto biota user muncul dengan benar
- [ ] **Admin Dashboard** - Admin bisa akses (jika admin)

---

## 📋 LANGKAH 7: TROUBLESHOOTING (Jika Ada Masalah)

### ❌ Problem: Website Error "Missing Supabase environment variables"
**Solusi:**
1. Buka Vercel Dashboard → **Settings** → **Environment Variables**
2. Pastikan semua 3 environment variables sudah di-set
3. Pastikan environment variables di-set untuk **Production**
4. **Redeploy** setelah menambahkan/mengubah environment variables

**Detail:** Lihat `CARA_SET_ENV_VERCEL.md`

---

### ❌ Problem: Perubahan Tidak Muncul di Website Publik
**Solusi:**
1. **Cek Git Status:**
   ```bash
   git status
   git log --oneline -5
   ```
   - Pastikan commit terbaru sudah ter-push

2. **Cek Vercel Deployments:**
   - Buka **Deployments** tab
   - Pastikan deployment terbaru menggunakan commit terbaru
   - Cek **Commit SHA** di deployment

3. **Force Redeploy:**
   - Klik **⋯** pada deployment terbaru
   - Pilih **Redeploy**
   - **JANGAN** centang "Use existing Build Cache"
   - Klik **Redeploy**

4. **Clear Browser Cache:**
   - Tekan `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
   - Atau buka **Incognito/Private Window**

**Detail:** Lihat `FIX_VERCEL_DEPLOY.md`

---

### ❌ Problem: Build Error di Vercel
**Solusi:**
1. **Cek Build Logs:**
   - Buka deployment yang error
   - Klik **View Build Logs**
   - Cari error message

2. **Common Errors:**
   - **TypeScript Error:** Fix di localhost, commit & push
   - **ESLint Error:** Fix di localhost, commit & push
   - **Missing Dependency:** Pastikan semua dependencies ada di `package.json`

3. **Test Build Lokal:**
   ```bash
   npm run build
   ```
   - Fix semua error di localhost dulu
   - Baru commit & push

---

### ❌ Problem: Fitur Tidak Berfungsi di Production (Tapi Berfungsi di Localhost)
**Solusi:**
1. **Cek Environment Variables:**
   - Pastikan semua env vars sudah di-set di Vercel
   - Pastikan nilai env vars benar (tidak ada typo)

2. **Cek Console Errors:**
   - Buka website di browser
   - Buka **Developer Tools** (F12)
   - Cek tab **Console** untuk error

3. **Cek Network Requests:**
   - Buka tab **Network**
   - Cek request ke Supabase
   - Pastikan tidak ada 401/403/500 errors

4. **Cek Supabase Dashboard:**
   - Pastikan project Supabase masih aktif
   - Pastikan RLS policies sudah benar
   - Pastikan Storage bucket permissions sudah benar

---

## 📋 LANGKAH 8: FINAL VERIFICATION

### ✅ 8.1 Cross-Browser Testing
Test di berbagai browser:
- [ ] **Chrome** (Desktop & Mobile)
- [ ] **Firefox** (Desktop)
- [ ] **Safari** (Desktop & Mobile, jika ada Mac/iOS)
- [ ] **Edge** (Desktop)

### ✅ 8.2 Responsive Testing
Test di berbagai ukuran layar:
- [ ] **Desktop** (1920x1080, 1366x768)
- [ ] **Tablet** (768x1024)
- [ ] **Mobile** (375x667, 414x896)

### ✅ 8.3 Performance Check
- [ ] Website load cepat (< 3 detik)
- [ ] Gambar tidak terlalu lama loading
- [ ] Tidak ada lag saat interaksi

---

## 📋 CHECKLIST SUMMARY

### ✅ Pre-Deployment
- [ ] Semua fitur berjalan baik di localhost
- [ ] Build lokal berhasil tanpa error
- [ ] Tidak ada console errors

### ✅ Git & Deployment
- [ ] Semua perubahan sudah di-commit
- [ ] Semua perubahan sudah di-push ke repository
- [ ] Vercel automatic deployment berhasil
- [ ] Build di Vercel berhasil tanpa error

### ✅ Configuration
- [ ] Environment variables sudah di-set di Vercel
- [ ] Branch yang terhubung ke Vercel sudah benar
- [ ] Supabase configuration sudah benar

### ✅ Production Testing
- [ ] Website bisa diakses
- [ ] Layout detail biota berfungsi dengan benar
- [ ] Notifikasi muncul dengan benar
- [ ] Semua fitur utama berfungsi

---

## 🎯 QUICK REFERENCE

### Command Sequence (Copy-Paste Ready)
```bash
# 1. Test build lokal
npm run build

# 2. Cek git status
git status

# 3. Stage semua perubahan
git add .

# 4. Commit
git commit -m "Perbaiki layout detail biota dan tambahkan notifikasi"

# 5. Push ke repository
git push origin master
# ATAU
git push origin main

# 6. Tunggu Vercel automatic deployment (biasanya 1-2 menit)
# 7. Cek Vercel Dashboard → Deployments
# 8. Test website publik
```

### Vercel Dashboard Links
- **Dashboard:** https://vercel.com/dashboard
- **Deployments:** https://vercel.com/dashboard → Pilih project → **Deployments**
- **Settings:** https://vercel.com/dashboard → Pilih project → **Settings**
- **Environment Variables:** https://vercel.com/dashboard → Pilih project → **Settings** → **Environment Variables**

---

## 📝 NOTES

1. **Automatic Deployment:** Vercel akan otomatis deploy setiap kali Anda push ke branch yang terhubung (biasanya `master` atau `main`).

2. **Environment Variables:** Setelah menambahkan/mengubah environment variables di Vercel, **WAJIB** redeploy agar perubahan berlaku.

3. **Build Cache:** Jika ada masalah aneh setelah deploy, coba redeploy **tanpa** menggunakan build cache.

4. **Testing:** Selalu test di production setelah deploy untuk memastikan semua fitur berjalan dengan benar.

5. **Backup:** Sebelum deploy perubahan besar, pastikan Anda punya backup atau bisa rollback jika ada masalah.

---

## 🆘 BUTUH BANTUAN?

Jika masih ada masalah setelah mengikuti checklist ini:

1. **Cek Dokumentasi:**
   - `CARA_SET_ENV_VERCEL.md` - Setup environment variables
   - `FIX_VERCEL_DEPLOY.md` - Troubleshooting deployment
   - `ANALISIS_DEPLOY_VERCEL.md` - Analisis lengkap deployment

2. **Cek Vercel Logs:**
   - Buka deployment yang error
   - Klik **View Function Logs** atau **View Build Logs**
   - Copy error message untuk debugging

3. **Cek Supabase Logs:**
   - Buka Supabase Dashboard
   - Buka **Logs** → **API Logs** atau **Auth Logs**
   - Cek error yang muncul

---

**✅ SELAMAT!** Jika semua checklist sudah dicentang, website Anda seharusnya sudah berjalan dengan baik di production! 🎉


