# 🔐 Cara Membuat Akun Admin Khusus

## 📋 Informasi Akun Admin Default

Setelah setup, Anda bisa login dengan:
- **Username:** `admin`
- **Email:** `admin@aquabio.com`
- **Password:** `AdminAquabio123!`

---

## 🚀 Step-by-Step: Membuat Akun Admin Khusus

### Step 1: Buat User di Supabase Auth Dashboard

1. **Buka Supabase Dashboard**
   - Login ke [supabase.com](https://supabase.com)
   - Pilih project Anda

2. **Buka Authentication → Users**
   - Klik menu **"Authentication"** di sidebar kiri
   - Klik tab **"Users"**

3. **Tambah User Baru**
   - Klik tombol **"Add User"** atau **"Create User"**
   - Isi form:
     - **Email:** `admin@aquabio.com`
     - **Password:** `AdminAquabio123!`
     - **Auto Confirm User:** ✅ **CHECKED** (penting!)
   - Klik **"Create User"**

4. **Copy User ID**
   - Setelah user dibuat, cari user dengan email `admin@aquabio.com`
   - **Copy UUID** (User ID) - akan terlihat seperti: `12345678-1234-1234-1234-123456789abc`
   - Simpan UUID ini untuk step berikutnya

### Step 2: Buat Profile Admin di Database

1. **Buka SQL Editor**
   - Klik menu **"SQL Editor"** di sidebar kiri
   - Klik **"New query"**

2. **Jalankan SQL berikut:**

```sql
-- Ganti 'USER_ID_HERE' dengan UUID yang di-copy dari Step 1
INSERT INTO public.profiles (id, username, email, full_name, is_admin)
VALUES (
  'USER_ID_HERE', -- Paste UUID di sini
  'admin',
  'admin@aquabio.com',
  'Administrator',
  TRUE
)
ON CONFLICT (id) 
DO UPDATE SET 
  is_admin = TRUE,
  username = 'admin',
  email = 'admin@aquabio.com',
  full_name = 'Administrator';
```

**Contoh (ganti dengan UUID Anda):**
```sql
INSERT INTO public.profiles (id, username, email, full_name, is_admin)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', -- UUID dari Step 1
  'admin',
  'admin@aquabio.com',
  'Administrator',
  TRUE
)
ON CONFLICT (id) 
DO UPDATE SET 
  is_admin = TRUE,
  username = 'admin',
  email = 'admin@aquabio.com',
  full_name = 'Administrator';
```

3. **Klik "Run"** atau tekan `Ctrl+Enter`

4. **Verifikasi:**
   - Seharusnya muncul: "Success. 1 row inserted" atau "Success. 1 row updated"
   - Artinya admin profile berhasil dibuat

### Step 3: Verifikasi Admin Account

Jalankan query ini untuk memastikan admin sudah dibuat:

```sql
SELECT id, username, email, full_name, is_admin 
FROM profiles 
WHERE email = 'admin@aquabio.com' OR username = 'admin';
```

**Seharusnya muncul:**
- `is_admin = true` ✅
- `username = 'admin'` ✅
- `email = 'admin@aquabio.com'` ✅

### Step 4: Login sebagai Admin

1. **Buka website:** `http://localhost:3000/login`

2. **Login dengan:**
   - **Username:** `admin`
   - **Password:** `AdminAquabio123!`

3. **Seharusnya:**
   - ✅ Login berhasil
   - ✅ Redirect otomatis ke `/admin` (bukan `/beranda`)
   - ✅ Tampilan admin dengan badge "ADMIN PANEL"

---

## 🔄 Alternatif: Jika User Sudah Ada

Jika user dengan email `admin@aquabio.com` sudah ada (misalnya dari register sebelumnya):

### Cara 1: Update via Email

```sql
UPDATE profiles 
SET is_admin = TRUE,
    username = 'admin',
    full_name = 'Administrator'
WHERE email = 'admin@aquabio.com';
```

### Cara 2: Update via Username

```sql
UPDATE profiles 
SET is_admin = TRUE,
    email = 'admin@aquabio.com',
    full_name = 'Administrator'
WHERE username = 'admin';
```

---

## 🛠️ Troubleshooting

### Error: "duplicate key value violates unique constraint"

**Penyebab:** Username atau email sudah digunakan

**Solusi:**
```sql
-- Cek username/email yang sudah ada
SELECT username, email FROM profiles WHERE username = 'admin' OR email = 'admin@aquabio.com';

-- Jika sudah ada, update saja:
UPDATE profiles 
SET is_admin = TRUE 
WHERE username = 'admin' OR email = 'admin@aquabio.com';
```

### Error: "insert or update on table 'profiles' violates foreign key constraint"

**Penyebab:** User belum dibuat di Supabase Auth

**Solusi:**
1. Pastikan sudah membuat user di Supabase Dashboard → Authentication → Users
2. Pastikan UUID yang digunakan benar (copy dari user yang baru dibuat)

### Login tidak redirect ke /admin

**Penyebab:** `is_admin` belum di-set ke `TRUE`

**Solusi:**
```sql
-- Cek status admin
SELECT username, email, is_admin FROM profiles WHERE username = 'admin';

-- Jika is_admin = false, update:
UPDATE profiles SET is_admin = TRUE WHERE username = 'admin';
```

### Lupa Password Admin

**Solusi:**
1. Supabase Dashboard → Authentication → Users
2. Cari user `admin@aquabio.com`
3. Klik **"..."** → **"Reset Password"**
4. Email reset password akan dikirim

---

## ✅ Checklist

- [ ] User dibuat di Supabase Auth Dashboard
- [ ] UUID user sudah di-copy
- [ ] Profile admin dibuat dengan SQL
- [ ] Verifikasi `is_admin = TRUE`
- [ ] Login dengan username: `admin`, password: `AdminAquabio123!`
- [ ] Redirect ke `/admin` berhasil
- [ ] Tampilan admin panel muncul

---

## 🔐 Informasi Login Admin

**Setelah setup selesai:**
- **Username:** `admin`
- **Email:** `admin@aquabio.com`
- **Password:** `AdminAquabio123!`
- **Status:** Admin (redirect ke `/admin`)

**Catatan:** Untuk keamanan, disarankan untuk mengganti password setelah setup pertama kali.

---

**Setelah semua step selesai, Anda bisa langsung login dengan username `admin` dan password `AdminAquabio123!` dan akan langsung diarahkan ke halaman admin!**

