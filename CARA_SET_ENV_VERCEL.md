# 🔧 CARA SET ENVIRONMENT VARIABLES DI VERCEL

**Error:** "Missing Supabase environment variables. Please check your .env.local file."

Error ini muncul karena environment variables belum diset di Vercel Dashboard atau diset untuk environment yang salah.

---

## 📋 LANGKAH-LANGKAH SET ENVIRONMENT VARIABLES DI VERCEL

### Step 1: Buka Vercel Dashboard

1. Login ke [vercel.com](https://vercel.com)
2. Pilih project **aquabio** (atau nama project Anda)
3. Klik **Settings** (di menu atas)
4. Klik **Environment Variables** (di sidebar kiri)

### Step 2: Tambahkan Environment Variables

Klik tombol **"Add New"** dan tambahkan **3 variables** berikut:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL

- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://xxxxx.supabase.co` (ganti dengan URL Supabase Anda)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Klik "Save"**

**Cara mendapatkan nilai:**
1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Buka **Settings** → **API**
4. Copy **Project URL** (bukan anon key)

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (ganti dengan anon key Anda)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Klik "Save"**

**Cara mendapatkan nilai:**
1. Di Supabase Dashboard → **Settings** → **API**
2. Copy **anon public** key (bukan service_role key)

#### Variable 3: NEXT_PUBLIC_SITE_URL (Recommended)

- **Name:** `NEXT_PUBLIC_SITE_URL`
- **Value Production:** `https://your-domain.vercel.app` (ganti dengan domain Vercel Anda)
- **Value Preview:** `https://your-preview-url.vercel.app` (atau biarkan kosong, akan menggunakan origin)
- **Value Development:** `http://localhost:3000`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Klik "Save"**

**Catatan:** Jika tidak diset, aplikasi akan menggunakan `headers().get('origin')` sebagai fallback, yang seharusnya tetap bekerja.

---

## ⚠️ PENTING: SET UNTUK SEMUA ENVIRONMENTS

**WAJIB:** Centang semua 3 environment untuk setiap variable:
- ✅ **Production** - Untuk production deployment
- ✅ **Preview** - Untuk preview deployments (setiap push ke branch)
- ✅ **Development** - Untuk local development (jika menggunakan Vercel CLI)

**Jangan hanya centang Production!** Jika hanya Production yang dicentang, preview deployments akan error.

---

## 🔄 SETELAH MENAMBAHKAN ENVIRONMENT VARIABLES

### Option 1: Redeploy (Recommended)

1. Setelah menambahkan semua environment variables
2. Klik **Deployments** di menu atas
3. Klik **"..."** (three dots) pada deployment terbaru
4. Pilih **"Redeploy"**
5. Pastikan **"Use existing Build Cache"** di-uncheck (atau biarkan checked, tidak masalah)
6. Klik **"Redeploy"**

### Option 2: Push Commit Baru

1. Buat commit baru (bisa commit kosong):
   ```bash
   git commit --allow-empty -m "Trigger redeploy for env vars"
   git push origin master
   ```
2. Vercel akan otomatis deploy ulang dengan environment variables baru

---

## ✅ VERIFIKASI ENVIRONMENT VARIABLES

### Cara 1: Cek di Vercel Dashboard

1. Buka **Settings** → **Environment Variables**
2. Pastikan semua 3 variables ada:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (optional)

### Cara 2: Cek di Deployment Logs

1. Buka **Deployments**
2. Klik deployment terbaru
3. Klik **"Build Logs"**
4. Cari di logs apakah ada error tentang missing environment variables

### Cara 3: Cek di Runtime (Browser Console)

1. Buka website yang sudah di-deploy
2. Buka Browser DevTools (F12)
3. Buka tab **Console**
4. Jika masih ada error "Missing Supabase environment variables", berarti:
   - Environment variables belum di-redeploy
   - Atau format value salah (ada spasi, quotes, dll)

---

## 🐛 TROUBLESHOOTING

### Masalah 1: "Missing Supabase environment variables" masih muncul setelah set env vars

**Solusi:**
1. ✅ Pastikan semua variables diset untuk **semua environments** (Production, Preview, Development)
2. ✅ **Redeploy** deployment setelah menambahkan env vars
3. ✅ Pastikan tidak ada typo di nama variable (case-sensitive)
4. ✅ Pastikan value tidak ada quotes atau spasi ekstra

### Masalah 2: Environment variables tidak muncul di build logs

**Catatan:** Environment variables yang dimulai dengan `NEXT_PUBLIC_` akan di-inject ke client-side code, tapi tidak akan muncul di build logs untuk keamanan.

**Verifikasi:**
- Cek di browser console apakah `process.env.NEXT_PUBLIC_SUPABASE_URL` ada
- Atau cek Network tab untuk melihat apakah request ke Supabase berhasil

### Masalah 3: Error hanya muncul di Preview, tidak di Production

**Penyebab:** Environment variables hanya diset untuk Production, tidak untuk Preview.

**Solusi:**
1. Buka **Settings** → **Environment Variables**
2. Edit setiap variable
3. Pastikan **Preview** juga dicentang
4. Redeploy

### Masalah 4: Format Value Salah

**Jangan gunakan:**
```
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"  ❌ (jangan pakai quotes)
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co  ❌ (jangan pakai spasi sebelum =)
```

**Gunakan:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  ✅
```

---

## 📝 CONTOH SCREENSHOT LOKASI (Visual Guide)

### Di Vercel Dashboard:

```
Project: aquabio
├── Overview
├── Deployments
├── Analytics
├── Settings
│   ├── General
│   ├── Environment Variables  ← KLIK DI SINI
│   ├── Domains
│   └── ...
```

### Di Environment Variables Page:

```
Environment Variables
┌─────────────────────────────────────────────────┐
│ Add New                                         │
├─────────────────────────────────────────────────┤
│ Name: NEXT_PUBLIC_SUPABASE_URL                  │
│ Value: https://xxxxx.supabase.co                │
│ Environment: ☑ Production ☑ Preview ☑ Development │
│ [Save]                                          │
└─────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST FINAL

Setelah menambahkan environment variables, pastikan:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` sudah diset
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah diset
- [ ] `NEXT_PUBLIC_SITE_URL` sudah diset (recommended)
- [ ] Semua variables diset untuk **Production, Preview, dan Development**
- [ ] Sudah **Redeploy** setelah menambahkan env vars
- [ ] Tidak ada typo di nama variable
- [ ] Value tidak ada quotes atau spasi ekstra
- [ ] Website sudah bisa diakses tanpa error

---

## 🚀 SETELAH SEMUA BENAR

Setelah environment variables diset dan di-redeploy:

1. ✅ Website seharusnya bisa diakses
2. ✅ Login/Register seharusnya berfungsi
3. ✅ Tidak ada error "Missing Supabase environment variables"
4. ✅ Semua fitur yang menggunakan Supabase seharusnya bekerja

**Jika masih ada masalah, cek:**
- Browser console untuk error detail
- Vercel deployment logs
- Supabase Dashboard untuk memastikan project masih aktif

---

**Selamat! Project Anda seharusnya sudah berjalan dengan baik di Vercel! 🎉**

