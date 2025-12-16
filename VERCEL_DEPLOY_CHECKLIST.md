# ✅ CHECKLIST DEPLOY KE VERCEL - AQUABIODIVERSA

**Tanggal:** $(date)  
**Status:** ✅ SIAP DEPLOY

---

## 1. ✅ BUILD STATUS

### Build Lokal
```bash
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (4/4)
✓ Collecting build traces
✓ Finalizing page optimization
```

**Status:** ✅ BUILD BERHASIL

---

## 2. ✅ FIXES YANG SUDAH DITERAPKAN

### 2.1 Dynamic Routes (Next.js 15)
✅ **Fixed:** Semua dynamic routes menggunakan `Promise<{ id: string }>` untuk params
- `src/app/biota/[id]/page.tsx`
- `src/app/edit/[id]/page.tsx`

### 2.2 Force Dynamic untuk Halaman dengan Supabase
✅ **Fixed:** Semua halaman yang menggunakan Supabase memiliki `export const dynamic = 'force-dynamic'`

**Halaman yang sudah diperbaiki:**
1. ✅ `/` (Home) - `src/app/page.tsx`
2. ✅ `/admin` - `src/app/admin/page.tsx`
3. ✅ `/beranda` - `src/app/beranda/page.tsx`
4. ✅ `/profil` - `src/app/profil/page.tsx`
5. ✅ `/gallery` - `src/app/gallery/page.tsx`
6. ✅ `/upload` - `src/app/upload/page.tsx`
7. ✅ `/pencarian` - `src/app/pencarian/page.tsx`
8. ✅ `/biota/[id]` - `src/app/biota/[id]/page.tsx`
9. ✅ `/edit/[id]` - `src/app/edit/[id]/page.tsx`
10. ✅ `/login` - `src/app/login/page.tsx`
11. ✅ `/register` - `src/app/register/page.tsx`
12. ✅ `/tentang-kami` - `src/app/tentang-kami/page.tsx` ⭐ **BARU DIPERBAIKI**

### 2.3 TypeScript Errors
✅ **Fixed:** Semua TypeScript errors sudah diperbaiki
- StorageError type issues
- ProfilAkun fullName property
- Middleware & server cookiesToSet type annotations

### 2.4 ESLint Warnings
✅ **Fixed:** 
- Disabled `@next/next/no-img-element` rule (beberapa kasus memerlukan `<img>` tag)
- Fixed unescaped entities (quotes)

---

## 3. ✅ ENVIRONMENT VARIABLES UNTUK VERCEL

### Required Variables (HARUS DISET):

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://xxxxx.supabase.co`
   - Environment: Production, Preview, Development
   - **PENTING:** Harus diset sebelum deploy pertama

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Environment: Production, Preview, Development
   - **PENTING:** Harus diset sebelum deploy pertama

### Recommended Variables:

3. **NEXT_PUBLIC_SITE_URL** (Recommended)
   - Value Production: `https://your-domain.vercel.app`
   - Value Preview: `https://your-preview-url.vercel.app`
   - Value Development: `http://localhost:3000`
   - **Catatan:** Jika tidak diset, akan menggunakan `headers().get('origin')` sebagai fallback

---

## 4. ✅ SUPABASE SETUP CHECKLIST

### Database
- [ ] Migration `001_initial_schema.sql` sudah dijalankan
- [ ] Migration `002_storage_policies.sql` sudah dijalankan (jika menggunakan RLS untuk storage)
- [ ] Tabel `profiles` dan `biota` sudah dibuat
- [ ] RLS policies sudah aktif

### Storage
- [ ] Bucket `biota_images` sudah dibuat
- [ ] Bucket sudah di-set sebagai **public** ATAU RLS policies sudah dikonfigurasi
- [ ] Storage policies sudah di-set untuk `INSERT` dan `SELECT`

### Authentication
- [ ] Email provider sudah di-enable di Supabase Dashboard
- [ ] Email confirmations bisa di-disable untuk development (opsional)
- [ ] Site URL di Supabase Dashboard sudah di-set: `https://your-domain.vercel.app`
- [ ] Redirect URLs di Supabase Dashboard sudah di-set:
  - `https://your-domain.vercel.app/auth/callback`
  - `http://localhost:3000/auth/callback` (untuk development)

---

## 5. ✅ VERIFIKASI STRUKTUR PROJECT

### File Konfigurasi
- ✅ `package.json` - Scripts lengkap (dev, build, start, lint)
- ✅ `next.config.ts` - Konfigurasi valid dengan Supabase image domain
- ✅ `tsconfig.json` - Path aliases (@/*) sudah dikonfigurasi
- ✅ `.eslintrc.json` - ESLint config dengan rule yang tepat
- ✅ `tailwind.config.ts` - Tailwind config valid
- ✅ `postcss.config.js` - PostCSS config valid
- ✅ `middleware.ts` - Auth middleware aktif

### Source Code
- ✅ `src/app/` - Semua halaman sudah ada dan menggunakan `force-dynamic`
- ✅ `src/components/` - Semua components sudah di-migrate
- ✅ `src/actions/` - Server Actions untuk auth dan biota
- ✅ `src/lib/supabase/` - Supabase clients (client, server, middleware)
- ✅ `supabase/migrations/` - Database migrations lengkap

### Public Assets
- ✅ `public/` - Semua images sudah di-copy

---

## 6. ✅ DEPLOYMENT STEPS

### Step 1: Push ke GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin master
```

### Step 2: Connect ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Import project dari GitHub
3. Pilih repository `aquabio`

### Step 3: Configure Project
- **Framework Preset:** Next.js (auto-detect)
- **Root Directory:** `./` (root)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

### Step 4: Add Environment Variables
**Di Vercel Dashboard → Project Settings → Environment Variables:**

Tambahkan semua variables dari section 3 di atas.

**PENTING:** 
- Set untuk semua environments (Production, Preview, Development)
- Pastikan tidak ada typo atau spasi ekstra
- Jangan gunakan quotes di value

### Step 5: Deploy
1. Klik "Deploy"
2. Tunggu build selesai
3. Cek build logs untuk error

### Step 6: Post-Deploy
1. Update Supabase Site URL dengan domain Vercel
2. Update Supabase Redirect URLs dengan domain Vercel
3. Test login/register flow
4. Test email confirmation (jika enabled)
5. Test upload foto
6. Test semua fitur utama

---

## 7. ✅ POTENSI MASALAH & SOLUSI

### Masalah 1: Build Error "Missing Supabase environment variables"
**Penyebab:** Environment variables tidak diset di Vercel  
**Solusi:** 
- Pastikan semua env vars sudah diset di Vercel Dashboard
- Redeploy setelah menambahkan env vars

### Masalah 2: Prerender Error
**Penyebab:** Halaman mencoba di-prerender saat build  
**Solusi:** ✅ **SUDAH DIPERBAIKI** - Semua halaman menggunakan `force-dynamic`

### Masalah 3: Email Confirmation Redirect ke Localhost
**Penyebab:** `NEXT_PUBLIC_SITE_URL` tidak diset atau Supabase Site URL salah  
**Solusi:**
- Set `NEXT_PUBLIC_SITE_URL` di Vercel
- Update Supabase Site URL di Dashboard

### Masalah 4: Storage Permission Denied
**Penyebab:** Bucket tidak public atau RLS policies tidak dikonfigurasi  
**Solusi:**
- Buat bucket `biota_images` di Supabase Storage
- Set bucket sebagai public ATAU jalankan migration `002_storage_policies.sql`

### Masalah 5: TypeScript Errors
**Penyebab:** Type errors di code  
**Solusi:** ✅ **SUDAH DIPERBAIKI** - Semua type errors sudah diperbaiki

---

## 8. ✅ TESTING CHECKLIST SETELAH DEPLOY

### Authentication
- [ ] Login dengan username dan password berhasil
- [ ] Register akun baru berhasil
- [ ] Logout berhasil
- [ ] Redirect ke login jika tidak authenticated
- [ ] Redirect ke beranda jika sudah authenticated

### Features
- [ ] Halaman beranda menampilkan biota
- [ ] Upload foto berhasil
- [ ] Edit biota berhasil (untuk owner)
- [ ] Delete biota berhasil (untuk owner)
- [ ] Search biota berhasil
- [ ] Detail biota bisa dibuka
- [ ] Gallery menampilkan semua biota
- [ ] Profile menampilkan biota user
- [ ] Admin page bisa diakses oleh admin
- [ ] Admin bisa edit/delete semua biota

### Images
- [ ] Images dari Supabase Storage bisa di-load
- [ ] Image upload berhasil
- [ ] Image preview berfungsi
- [ ] Image modal (full-size view) berfungsi

---

## 9. ✅ FINAL CHECKLIST SEBELUM DEPLOY

- [x] Build lokal berhasil (`npm run build`)
- [x] Semua halaman menggunakan `force-dynamic`
- [x] Semua TypeScript errors sudah diperbaiki
- [x] Semua ESLint errors sudah diperbaiki
- [ ] Environment variables sudah diset di Vercel
- [ ] Supabase migrations sudah dijalankan
- [ ] Supabase storage bucket sudah dibuat
- [ ] Supabase Site URL sudah diupdate
- [ ] Supabase Redirect URLs sudah diupdate
- [ ] Code sudah di-push ke GitHub

---

## 10. ✅ KESIMPULAN

**Status Project:** ✅ **SIAP UNTUK DEPLOY KE VERCEL**

**Yang Sudah Diperbaiki:**
1. ✅ Semua halaman menggunakan `force-dynamic` (termasuk `/tentang-kami`)
2. ✅ Semua TypeScript errors sudah diperbaiki
3. ✅ Semua ESLint errors sudah diperbaiki
4. ✅ Dynamic routes sudah kompatibel dengan Next.js 15
5. ✅ Build lokal berhasil tanpa error

**Yang Perlu Dilakukan:**
1. ⚠️ Set environment variables di Vercel Dashboard
2. ⚠️ Pastikan Supabase sudah di-setup dengan benar
3. ⚠️ Update Supabase Site URL dan Redirect URLs setelah deploy

**Project siap untuk production deployment! 🚀**

