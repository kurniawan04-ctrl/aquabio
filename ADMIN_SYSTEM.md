# 🔐 Sistem Admin - Next.js

## ✅ Fitur yang Sudah Dibuat

### 1. **Halaman Admin** (`/admin`)
- ✅ Route protection - hanya admin yang bisa akses
- ✅ Redirect non-admin ke `/beranda`
- ✅ Menampilkan semua foto biota (tidak hanya milik admin)
- ✅ Fitur edit dan hapus untuk semua biota
- ✅ UI khusus admin dengan badge "ADMIN PANEL"

### 2. **Admin Beranda Component**
- ✅ Tampilan khusus admin dengan warna orange/red
- ✅ Grid layout untuk semua foto biota
- ✅ Action buttons: Edit dan Hapus
- ✅ Menampilkan informasi uploader
- ✅ Total foto counter
- ✅ Floating particles animation
- ✅ Background underwater seperti halaman lain

### 3. **Admin Beranda Client**
- ✅ Handle navigation
- ✅ Handle logout
- ✅ Handle edit (navigate ke `/edit/[id]`)
- ✅ Handle delete dengan confirmation
- ✅ Loading state saat delete

### 4. **Auto Redirect Admin**
- ✅ Admin yang login di `/beranda` otomatis redirect ke `/admin`
- ✅ Non-admin tetap di `/beranda`

### 5. **Database & RLS**
- ✅ Field `is_admin` di table `profiles`
- ✅ RLS policies untuk admin (update & delete semua biota)
- ✅ Migration file untuk dokumentasi admin account

---

## 🗄️ Database Schema

### Table: `profiles`
```sql
- id (UUID) - references auth.users(id)
- username (VARCHAR) - UNIQUE
- email (VARCHAR) - UNIQUE
- full_name (VARCHAR)
- is_admin (BOOLEAN) - default FALSE
- created_at, updated_at
```

### RLS Policies untuk Admin
```sql
-- Admins can update any biota
CREATE POLICY "Admins can update any biota"
  ON public.biota FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Admins can delete any biota
CREATE POLICY "Admins can delete any biota"
  ON public.biota FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );
```

---

## 🚀 Cara Membuat Akun Admin

### ⚠️ Penting: Password vs Admin Status

**Password** disimpan di Supabase Auth (`auth.users`), bukan di tabel `profiles`.  
**Admin status** (`is_admin`) disimpan di tabel `profiles`.

Jadi untuk membuat admin, Anda perlu:
1. **User sudah terdaftar** (sudah punya akun dengan email & password)
2. **Update `is_admin = TRUE`** di tabel `profiles`

---

### Opsi 1: Buat Admin dari User yang Sudah Ada (Recommended)

**Langkah 1: Daftar Akun Baru (jika belum ada)**
1. Buka website → Klik "Daftar"
2. Isi form:
   - Nama Lengkap: `Administrator`
   - Email: `admin@example.com` (atau email Anda)
   - Username: `admin` (atau username yang diinginkan)
   - Password: `password123` (atau password yang diinginkan)
3. Klik "Daftar"
4. Login dengan email/username dan password yang baru dibuat

**Langkah 2: Set User Menjadi Admin**
1. **Login ke Supabase Dashboard**
2. **Buka SQL Editor**
3. **Jalankan SQL berikut:**

```sql
-- Ganti 'admin' dengan username yang baru dibuat
UPDATE profiles 
SET is_admin = TRUE 
WHERE username = 'admin';
```

**Langkah 3: Login Kembali**
1. Logout dari website
2. Login lagi dengan username/password yang sama
3. **Seharusnya:** Redirect otomatis ke `/admin`

---

### Opsi 2: Set Admin via Email

Jika sudah tahu email user yang ingin dijadikan admin:

```sql
-- Ganti 'email@example.com' dengan email user
UPDATE profiles 
SET is_admin = TRUE 
WHERE email = 'email@example.com';
```

**Password:** Gunakan password yang digunakan saat daftar dengan email tersebut.

---

### Opsi 3: Set Admin via User ID

Jika sudah tahu User ID dari Supabase Dashboard:

```sql
-- Ganti 'user-id-here' dengan UUID user dari auth.users
UPDATE profiles 
SET is_admin = TRUE 
WHERE id = 'user-id-here';
```

**Cara cari User ID:**
1. Supabase Dashboard → Authentication → Users
2. Cari user yang ingin dijadikan admin
3. Copy UUID-nya

---

### Opsi 4: Cek Username yang Ada di Database

Jika tidak tahu username apa saja yang ada:

```sql
-- Lihat semua username yang ada
SELECT id, username, email, full_name, is_admin 
FROM profiles 
ORDER BY created_at DESC;
```

Kemudian pilih username yang ingin dijadikan admin dan jalankan:

```sql
UPDATE profiles 
SET is_admin = TRUE 
WHERE username = 'username_yang_dipilih';
```

---

## 📝 Contoh Lengkap: Membuat Admin Baru

### Step 1: Daftar Akun
1. Buka `http://localhost:3000/register`
2. Isi:
   - Nama Lengkap: `Admin User`
   - Email: `admin@aquabio.com`
   - Username: `admin`
   - Password: `admin123`
3. Klik "Daftar"
4. Login dengan username: `admin`, password: `admin123`

### Step 2: Set Admin di Database
1. Buka Supabase Dashboard → SQL Editor
2. Jalankan:
```sql
UPDATE profiles 
SET is_admin = TRUE 
WHERE username = 'admin';
```

### Step 3: Verifikasi
1. Logout dari website
2. Login lagi dengan:
   - Username: `admin`
   - Password: `admin123`
3. **Seharusnya:** Redirect ke `/admin` (bukan `/beranda`)

---

## 🔑 Informasi Login Admin

Setelah user dijadikan admin:
- **Username:** Sama seperti saat daftar
- **Password:** Sama seperti saat daftar
- **Email:** Sama seperti saat daftar

**Tidak ada password khusus untuk admin!** Admin menggunakan password yang sama seperti saat pertama kali daftar.

---

## 🧪 Testing

### Test 1: Admin Access
1. Buat atau update user menjadi admin (lihat cara di atas)
2. Login dengan akun admin
3. **Seharusnya:** Redirect otomatis ke `/admin`
4. **Seharusnya:** Tampilan admin dengan badge "ADMIN PANEL"
5. **Seharusnya:** Semua foto biota terlihat (tidak hanya milik admin)

### Test 2: Non-Admin Access
1. Login dengan akun non-admin
2. Coba akses `/admin` langsung
3. **Seharusnya:** Redirect ke `/beranda`
4. **Seharusnya:** Tetap di `/beranda` (tidak redirect ke admin)

### Test 3: Admin Edit Biota
1. Login sebagai admin
2. Di halaman `/admin`, klik tombol "Edit" pada salah satu foto
3. **Seharusnya:** Navigate ke `/edit/[id]`
4. **Seharusnya:** Bisa edit foto (meskipun bukan milik admin)

### Test 4: Admin Delete Biota
1. Login sebagai admin
2. Di halaman `/admin`, klik tombol "Hapus" pada salah satu foto
3. **Seharusnya:** Muncul confirmation dialog
4. **Seharusnya:** Setelah konfirmasi, foto terhapus
5. **Seharusnya:** Halaman refresh dan foto tidak muncul lagi

### Test 5: Logout Admin
1. Login sebagai admin
2. Di halaman `/admin`, klik tombol "LOGOUT"
3. **Seharusnya:** Redirect ke `/login`
4. **Seharusnya:** Session cleared

---

## 📝 File Structure

```
src/
├── app/
│   └── admin/
│       └── page.tsx          # Admin page dengan route protection
├── components/
│   ├── AdminBeranda.tsx      # Admin UI component
│   └── AdminBerandaClient.tsx # Admin client wrapper
└── actions/
    └── biota.ts              # CRUD operations (sudah support admin)

supabase/
└── migrations/
    ├── 001_initial_schema.sql    # Schema dengan is_admin field
    └── 003_create_admin_account.sql # Dokumentasi cara membuat admin
```

---

## 🎨 UI Features

### Admin Navbar
- **Badge:** "ADMIN PANEL" dengan icon Shield (orange/red gradient)
- **User Info:** Username dan "Administrator" label
- **Logo:** AQUABIODIVERSA dengan hover effect

### Admin Content
- **Title:** "KELOLA SEMUA FOTO BIOTA" dengan icon Shield
- **Total Counter:** Menampilkan jumlah total foto
- **Grid Layout:** Responsive grid (1-4 columns)
- **Action Buttons:** Edit (cyan/blue) dan Hapus (red/orange)
- **Uploader Badge:** Menampilkan siapa yang upload foto

### Color Scheme
- **Primary:** Orange/Red gradient (untuk admin badge dan buttons)
- **Accent:** Cyan/Blue (untuk edit buttons)
- **Background:** Underwater theme dengan floating particles

---

## ✅ Status

- ✅ Admin page sudah dibuat
- ✅ Route protection sudah berfungsi
- ✅ Auto redirect admin sudah berfungsi
- ✅ Edit semua biota sudah berfungsi
- ✅ Delete semua biota sudah berfungsi
- ✅ UI admin sudah sesuai dengan project sebelumnya
- ✅ Database schema sudah support admin
- ✅ RLS policies sudah support admin

**Sistem admin sudah lengkap dan siap digunakan!**

