# 🚀 Cara Membuat Akun Admin - Step by Step

## ⚠️ Penting: Password vs Admin Status

**Password** disimpan di Supabase Auth (`auth.users`), **BUKAN** di tabel `profiles`.  
**Admin status** (`is_admin`) disimpan di tabel `profiles`.

Jadi untuk membuat admin:
1. ✅ User **harus sudah terdaftar** (sudah punya akun dengan email & password)
2. ✅ Update `is_admin = TRUE` di tabel `profiles`

---

## 📋 Cara 1: Buat Admin Baru dari Awal (Paling Mudah)

### Step 1: Daftar Akun Baru

1. Buka website: `http://localhost:3000/register`
2. Isi form:
   - **Nama Lengkap:** `Administrator`
   - **Email:** `admin@aquabio.com` (atau email Anda)
   - **Username:** `admin` (atau username yang diinginkan)
   - **Password:** `admin123` (atau password yang diinginkan - **INGAT PASSWORD INI!**)
3. Klik **"Daftar"**
4. Login dengan username dan password yang baru dibuat

### Step 2: Set User Menjadi Admin

1. **Buka Supabase Dashboard**
   - Login ke [supabase.com](https://supabase.com)
   - Pilih project Anda

2. **Buka SQL Editor**
   - Klik menu **"SQL Editor"** di sidebar kiri
   - Klik **"New query"**

3. **Jalankan SQL berikut:**

```sql
-- Ganti 'admin' dengan username yang baru dibuat
UPDATE profiles 
SET is_admin = TRUE 
WHERE username = 'admin';
```

4. Klik **"Run"** atau tekan `Ctrl+Enter`

5. **Verifikasi:**
   - Seharusnya muncul: "Success. No rows returned"
   - Artinya update berhasil

### Step 3: Login Kembali sebagai Admin

1. **Logout** dari website
2. **Login lagi** dengan:
   - Username: `admin` (atau username yang Anda buat)
   - Password: `admin123` (atau password yang Anda buat)
3. **Seharusnya:** Redirect otomatis ke `/admin` (bukan `/beranda`)

---

## 📋 Cara 2: Jadikan User yang Sudah Ada Menjadi Admin

Jika sudah punya akun yang ingin dijadikan admin:

### Step 1: Cek Username yang Ada

1. Buka Supabase Dashboard → SQL Editor
2. Jalankan query ini untuk melihat semua user:

```sql
SELECT id, username, email, full_name, is_admin 
FROM profiles 
ORDER BY created_at DESC;
```

3. Pilih username yang ingin dijadikan admin

### Step 2: Set Admin

```sql
-- Ganti 'username_yang_dipilih' dengan username dari hasil query di atas
UPDATE profiles 
SET is_admin = TRUE 
WHERE username = 'username_yang_dipilih';
```

### Step 3: Login

- **Username:** Username yang dipilih
- **Password:** Password yang digunakan saat daftar (jika lupa, bisa reset di Supabase Dashboard)

---

## 📋 Cara 3: Set Admin via Email

Jika tahu email user yang ingin dijadikan admin:

```sql
-- Ganti 'email@example.com' dengan email user
UPDATE profiles 
SET is_admin = TRUE 
WHERE email = 'email@example.com';
```

**Password:** Gunakan password yang digunakan saat daftar dengan email tersebut.

---

## 🔍 Cara Cek Apakah User Sudah Admin

Jalankan query ini:

```sql
SELECT username, email, is_admin 
FROM profiles 
WHERE username = 'admin';  -- Ganti dengan username yang ingin dicek
```

Jika `is_admin = true`, maka user sudah admin.

---

## 🔑 Informasi Login Admin

Setelah user dijadikan admin:
- ✅ **Username:** Sama seperti saat daftar
- ✅ **Password:** Sama seperti saat daftar
- ✅ **Email:** Sama seperti saat daftar

**Tidak ada password khusus untuk admin!** Admin menggunakan password yang sama seperti saat pertama kali daftar.

---

## ❓ FAQ

### Q: Saya lupa password admin, bagaimana?

**A:** Reset password di Supabase Dashboard:
1. Supabase Dashboard → Authentication → Users
2. Cari user admin
3. Klik **"..."** → **"Reset Password"**
4. Email reset password akan dikirim ke email user

### Q: Bagaimana cara melihat semua admin?

**A:** Jalankan query ini:

```sql
SELECT username, email, full_name, created_at 
FROM profiles 
WHERE is_admin = TRUE;
```

### Q: Bagaimana cara menghapus status admin?

**A:** Jalankan query ini:

```sql
UPDATE profiles 
SET is_admin = FALSE 
WHERE username = 'admin';  -- Ganti dengan username
```

### Q: Bisa membuat admin langsung tanpa daftar dulu?

**A:** Tidak bisa. User harus terdaftar dulu di Supabase Auth, baru bisa dijadikan admin dengan update `is_admin = TRUE`.

---

## ✅ Checklist Membuat Admin

- [ ] Daftar akun baru (atau gunakan akun yang sudah ada)
- [ ] Catat username dan password
- [ ] Buka Supabase Dashboard → SQL Editor
- [ ] Jalankan `UPDATE profiles SET is_admin = TRUE WHERE username = '...'`
- [ ] Verifikasi update berhasil
- [ ] Logout dari website
- [ ] Login lagi dengan username/password
- [ ] Pastikan redirect ke `/admin`

---

**Setelah selesai, admin bisa login dengan username dan password yang digunakan saat daftar!**

