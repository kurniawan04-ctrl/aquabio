# 🚀 PANDUAN DEPLOY KE PRODUCTION - AQUABIODIVERSA

**Tujuan:** Deploy perubahan fitur yang sudah berjalan di localhost ke website production Vercel.

---

## 📋 LANGKAH 1: PREPARASI SEBELUM DEPLOY

### ✅ 1.1 Test Build Lokal
Pastikan aplikasi bisa di-build tanpa error:

```bash
npm run build
```

**Yang harus dicek:**
- [ ] Build berhasil tanpa error
- [ ] Tidak ada TypeScript errors
- [ ] Tidak ada ESLint errors yang critical
- [ ] Semua halaman ter-generate dengan benar

**Jika ada error:** Fix dulu di localhost sebelum deploy!

---

### ✅ 1.2 Test Fitur di Localhost
Pastikan semua fitur berjalan dengan baik:

- [ ] **Fitur Profil:**
  - [ ] Halaman `/profil` bisa diakses
  - [ ] Foto biota user muncul dengan benar
  - [ ] Admin bisa lihat semua foto
  - [ ] User biasa hanya lihat foto sendiri
  - [ ] Edit biota berfungsi
  - [ ] Hapus biota berfungsi
  - [ ] Notifikasi muncul saat hapus/edit

- [ ] **Fitur Lainnya:**
  - [ ] Login & Register
  - [ ] Upload foto biota
  - [ ] Pencarian biota
  - [ ] Gallery
  - [ ] Detail biota modal

- [ ] **Console Errors:**
  - [ ] Buka Developer Tools (F12)
  - [ ] Cek tab Console - tidak ada error merah
  - [ ] Cek tab Network - semua request berhasil (200/201)

---

## 📋 LANGKAH 2: COMMIT & PUSH KE GIT

### ✅ 2.1 Cek Status Git
```bash
git status
```

**Pastikan:**
- [ ] Semua file perubahan sudah ter-track
- [ ] Tidak ada file penting yang ter-ignore

---

### ✅ 2.2 Stage Semua Perubahan
```bash
git add .
```

**Verifikasi:**
```bash
git status
```
Pastikan semua file yang diubah sudah di-stage (warna hijau).

---

### ✅ 2.3 Commit Perubahan
```bash
git commit -m "Deploy perubahan fitur profil dan perbaikan lainnya"
```

**Tips pesan commit:**
- Gunakan pesan yang jelas dan deskriptif
- Contoh: "Perbaiki fitur profil, tambahkan notifikasi, dan perbaiki layout detail biota"

---

### ✅ 2.4 Push ke Repository
```bash
git push origin master
```

**ATAU jika branch Anda `main`:**
```bash
git push origin main
```

**Verifikasi:**
- [ ] Push berhasil tanpa error
- [ ] Buka GitHub/GitLab, pastikan commit terbaru sudah ada
- [ ] Cek **Files changed** - semua file yang diubah sudah ter-push

---

## 📋 LANGKAH 3: VERIFIKASI VERCEL CONFIGURATION

### ✅ 3.1 Cek Branch yang Terhubung
1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project **AQUABIODIVERSA**
3. Buka **Settings** → **Git**
4. Pastikan **Production Branch** adalah `master` atau `main` (sesuai branch Anda)

**⚠️ PENTING:** Branch yang Anda push harus sama dengan Production Branch!

---

### ✅ 3.2 Verifikasi Environment Variables
Buka **Settings** → **Environment Variables**, pastikan ada:

**Wajib ada 3 environment variables:**

1. **`NEXT_PUBLIC_SUPABASE_URL`**
   - Value: URL Supabase project (contoh: `https://xxxxx.supabase.co`)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

2. **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
   - Value: Anon/Public key dari Supabase
   - Environment: ✅ Production, ✅ Preview, ✅ Development

3. **`NEXT_PUBLIC_SITE_URL`**
   - Value: URL website Vercel (contoh: `https://aquabiodiversa.vercel.app`)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

**⚠️ PENTING:** 
- Setelah menambah/mengubah environment variables, **WAJIB** redeploy!
- Pastikan semua 3 environment variables di-set untuk **Production**

**Detail lengkap:** Lihat `CARA_SET_ENV_VERCEL.md`

---

## 📋 LANGKAH 4: TRIGGER DEPLOYMENT

### ✅ 4.1 Automatic Deployment (Recommended)
Setelah `git push`, Vercel akan **otomatis** deploy:

1. Buka **Deployments** tab di Vercel Dashboard
2. Tunggu 1-2 menit
3. Cek deployment terbaru:
   - ✅ Status: **Ready** (hijau) = Berhasil
   - ❌ Status: **Error** (merah) = Ada masalah, cek logs

---

### ✅ 4.2 Manual Redeploy (Jika Perlu)
Jika automatic deployment tidak jalan atau ingin redeploy:

1. Buka **Deployments** tab
2. Klik **⋯** (three dots) pada deployment terbaru
3. Pilih **Redeploy**
4. **JANGAN** centang "Use existing Build Cache" (untuk fresh build)
5. Klik **Redeploy**

**Tunggu hingga status menjadi "Ready"**

---

## 📋 LANGKAH 5: VERIFIKASI DEPLOYMENT

### ✅ 5.1 Cek Build Logs
1. Buka deployment terbaru di Vercel
2. Klik **View Build Logs** atau **View Function Logs**
3. Pastikan tidak ada error:
   - ✅ Build successful
   - ✅ No TypeScript errors
   - ✅ No ESLint errors
   - ✅ All pages generated

**Jika ada error:** Copy error message dan fix di localhost, lalu commit & push lagi.

---

### ✅ 5.2 Cek Website Publik
Buka URL website Vercel Anda (contoh: `https://aquabiodiversa.vercel.app`)

**Yang harus dicek:**
- [ ] Website bisa diakses
- [ ] Tidak ada error "Missing Supabase environment variables"
- [ ] Halaman login/register muncul dengan benar
- [ ] Tidak ada blank page atau error page

---

## 📋 LANGKAH 6: TEST FITUR DI PRODUCTION

### ✅ 6.1 Test Authentication
- [ ] **Login** - Masuk dengan akun yang sudah ada
- [ ] **Register** - Daftar akun baru (jika perlu)
- [ ] **Logout** - Pastikan logout berfungsi

---

### ✅ 6.2 Test Fitur Profil (PENTING!)
Buka halaman `/profil` setelah login:

**Test untuk User Biasa:**
- [ ] Halaman profil bisa diakses
- [ ] Foto biota yang di-upload user muncul dengan benar
- [ ] Hanya foto milik user sendiri yang muncul (bukan foto user lain)
- [ ] Klik foto biota → modal detail muncul
- [ ] Edit biota → perubahan tersimpan
- [ ] Hapus biota → foto terhapus dan notifikasi muncul
- [ ] Notifikasi sukses/error muncul dengan benar

**Test untuk Admin:**
- [ ] Login sebagai admin
- [ ] Halaman profil bisa diakses
- [ ] **Semua** foto biota muncul (bukan hanya foto admin)
- [ ] Admin bisa edit/hapus foto milik user lain
- [ ] Notifikasi muncul dengan benar

---

### ✅ 6.3 Test Fitur Lainnya
- [ ] **Upload Foto** - Upload berhasil, gambar muncul
- [ ] **Pencarian** - Search biota, hasil relevan
- [ ] **Gallery** - Semua foto biota muncul
- [ ] **Detail Biota** - Modal detail muncul dengan layout yang benar
- [ ] **Beranda** - Semua biota muncul dengan benar

---

## 🐛 TIPS DEBUGGING: FITUR PROFIL TIDAK BEKERJA

Jika setelah deploy, fitur profil belum bekerja di website live, ikuti langkah debugging berikut:

---

### ❌ Problem 1: Halaman Profil Blank / Error

**Gejala:**
- Halaman `/profil` blank atau error
- Console error: "Cannot read property of undefined"

**Solusi:**

1. **Cek Console Errors:**
   ```
   - Buka website di browser
   - Tekan F12 (Developer Tools)
   - Cek tab Console untuk error merah
   - Copy error message
   ```

2. **Cek Environment Variables:**
   ```
   - Buka Vercel Dashboard → Settings → Environment Variables
   - Pastikan NEXT_PUBLIC_SUPABASE_URL sudah di-set
   - Pastikan NEXT_PUBLIC_SUPABASE_ANON_KEY sudah di-set
   - Pastikan NEXT_PUBLIC_SITE_URL sudah di-set
   - Jika belum ada, tambahkan dan REDEPLOY
   ```

3. **Cek Build Logs:**
   ```
   - Buka deployment terbaru di Vercel
   - Klik View Build Logs
   - Cari error yang terkait dengan profil
   - Jika ada error, fix di localhost lalu commit & push lagi
   ```

4. **Cek Supabase Connection:**
   ```bash
   # Test di localhost dulu
   npm run dev
   # Buka http://localhost:3000/profil
   # Cek apakah error sama dengan di production
   ```

---

### ❌ Problem 2: Foto Biota Tidak Muncul di Profil

**Gejala:**
- Halaman profil bisa diakses
- Tapi foto biota tidak muncul (kosong)
- Atau hanya muncul sebagian

**Solusi:**

1. **Cek Network Requests:**
   ```
   - Buka Developer Tools (F12)
   - Buka tab Network
   - Refresh halaman profil
   - Cari request ke Supabase (biota table)
   - Cek status response:
     * 200 = OK
     * 401 = Unauthorized (cek auth)
     * 403 = Forbidden (cek RLS policies)
     * 500 = Server error (cek Supabase)
   ```

2. **Cek RLS Policies di Supabase:**
   ```
   - Buka Supabase Dashboard
   - Buka Table Editor → biota table
   - Buka tab Policies
   - Pastikan ada policy:
     * "Anyone can view biota" (SELECT)
     * "Authenticated users can insert biota" (INSERT)
     * "Users can update own biota" (UPDATE)
     * "Users can delete own biota" (DELETE)
   ```

3. **Cek User Authentication:**
   ```
   - Buka Console di browser
   - Ketik: localStorage.getItem('supabase.auth.token')
   - Jika null, berarti user belum login
   - Pastikan user sudah login sebelum akses profil
   ```

4. **Cek Filter Foto di Code:**
   ```
   - Buka src/components/ProfilAkun.tsx
   - Cek logic filter foto (line 67-81)
   - Pastikan user.id dan fish.userId match
   - Console.log untuk debug:
     console.log('User ID:', user?.id)
     console.log('Fish User IDs:', fishDatabase.map(f => f.userId))
   ```

---

### ❌ Problem 3: Admin Tidak Bisa Lihat Semua Foto

**Gejala:**
- Login sebagai admin
- Tapi hanya foto admin sendiri yang muncul
- Seharusnya admin bisa lihat semua foto

**Solusi:**

1. **Cek isAdmin Prop:**
   ```
   - Buka src/app/profil/page.tsx
   - Cek apakah isAdmin di-pass dengan benar (line 23, 46)
   - Console.log untuk debug:
     console.log('Is Admin:', isAdmin)
   ```

2. **Cek Database:**
   ```
   - Buka Supabase Dashboard
   - Buka Table Editor → profiles table
   - Cek apakah user memiliki is_admin = true
   - Jika belum, update manual:
     UPDATE profiles SET is_admin = true WHERE id = 'user-id-here'
   ```

3. **Cek Filter Logic:**
   ```
   - Buka src/components/ProfilAkun.tsx
   - Cek logic filter (line 67-81)
   - Pastikan jika isAdmin = true, semua foto ditampilkan
   - Console.log untuk debug:
     console.log('Is Admin:', isAdmin)
     console.log('My Photos Count:', myPhotos.length)
   ```

---

### ❌ Problem 4: Edit/Hapus Biota Tidak Berfungsi

**Gejala:**
- Klik edit/hapus di profil
- Tidak terjadi apa-apa atau error

**Solusi:**

1. **Cek Console Errors:**
   ```
   - Buka Developer Tools (F12)
   - Buka tab Console
   - Klik edit/hapus
   - Cek error yang muncul
   ```

2. **Cek Network Requests:**
   ```
   - Buka tab Network
   - Klik edit/hapus
   - Cari request ke Supabase
   - Cek status response:
     * 200 = OK
     * 401 = Unauthorized
     * 403 = Forbidden (cek RLS policies)
     * 500 = Server error
   ```

3. **Cek RLS Policies:**
   ```
   - Buka Supabase Dashboard
   - Buka Table Editor → biota table
   - Buka tab Policies
   - Pastikan ada policy:
     * "Users can update own biota" (UPDATE)
     * "Users can delete own biota" (DELETE)
     * "Admins can update any biota" (UPDATE)
     * "Admins can delete any biota" (DELETE)
   ```

4. **Cek Notifikasi:**
   ```
   - Pastikan toast/sonner sudah ter-install
   - Cek apakah notifikasi muncul di console
   - Jika tidak muncul, cek import toast di ProfilAkunClient.tsx
   ```

---

### ❌ Problem 5: Perubahan Tidak Muncul di Production

**Gejala:**
- Sudah commit & push
- Tapi perubahan tidak muncul di website

**Solusi:**

1. **Cek Git Status:**
   ```bash
   git status
   git log --oneline -5
   ```
   Pastikan commit terbaru sudah ter-push.

2. **Cek Vercel Deployment:**
   ```
   - Buka Vercel Dashboard → Deployments
   - Cek deployment terbaru
   - Pastikan Commit SHA sama dengan commit terbaru di GitHub
   - Jika berbeda, trigger manual redeploy
   ```

3. **Force Redeploy (Tanpa Cache):**
   ```
   - Buka Deployments tab
   - Klik ⋯ pada deployment terbaru
   - Pilih Redeploy
   - JANGAN centang "Use existing Build Cache"
   - Klik Redeploy
   ```

4. **Clear Browser Cache:**
   ```
   - Tekan Ctrl + Shift + R (Windows) atau Cmd + Shift + R (Mac)
   - Atau buka Incognito/Private Window
   - Test lagi
   ```

---

## 📋 CHECKLIST RINGKAS

### Pre-Deployment
- [ ] Build lokal berhasil (`npm run build`)
- [ ] Semua fitur berjalan di localhost
- [ ] Tidak ada console errors

### Git & Push
- [ ] `git add .` - semua perubahan di-stage
- [ ] `git commit -m "..."` - commit dengan pesan jelas
- [ ] `git push origin master` - push ke repository
- [ ] Verifikasi di GitHub - commit terbaru sudah ada

### Vercel Configuration
- [ ] Environment variables sudah di-set (3 variables)
- [ ] Production branch sudah benar (master/main)
- [ ] Deployment berhasil (status Ready)

### Production Testing
- [ ] Website bisa diakses
- [ ] Fitur profil berfungsi dengan benar
- [ ] User biasa hanya lihat foto sendiri
- [ ] Admin bisa lihat semua foto
- [ ] Edit/hapus biota berfungsi
- [ ] Notifikasi muncul dengan benar

---

## 🎯 QUICK COMMAND SEQUENCE

Copy-paste command berikut secara berurutan:

```bash
# 1. Test build lokal
npm run build

# 2. Cek git status
git status

# 3. Stage semua perubahan
git add .

# 4. Commit
git commit -m "Deploy perubahan fitur profil dan perbaikan lainnya"

# 5. Push ke repository
git push origin master

# 6. Tunggu Vercel automatic deployment (1-2 menit)
# 7. Buka Vercel Dashboard → Deployments → Cek status
# 8. Test website publik
```

---

## 🆘 BUTUH BANTUAN LEBIH LANJUT?

Jika masih ada masalah setelah mengikuti panduan ini:

1. **Cek Dokumentasi Lain:**
   - `CHECKLIST_DEPLOY_VERCEL.md` - Checklist lengkap
   - `CARA_SET_ENV_VERCEL.md` - Setup environment variables
   - `FIX_VERCEL_DEPLOY.md` - Troubleshooting umum

2. **Cek Logs:**
   - **Vercel Logs:** Deployment → View Build Logs
   - **Browser Console:** F12 → Console tab
   - **Network Requests:** F12 → Network tab
   - **Supabase Logs:** Dashboard → Logs → API Logs

3. **Compare Localhost vs Production:**
   - Test fitur yang sama di localhost dan production
   - Bandingkan error yang muncul
   - Cek apakah environment variables berbeda

---

**✅ SELAMAT!** Jika semua checklist sudah dicentang, website Anda seharusnya sudah berjalan dengan baik di production! 🎉

