# 🚀 Setup Project AquaBiodiversa

## ✅ Yang Sudah Selesai

1. ✅ **Struktur Next.js App Router** - Lengkap dengan folder structure
2. ✅ **Supabase Client Setup** - Client & Server ready untuk production
3. ✅ **Database Schema dengan RLS** - Migration SQL sudah dibuat
4. ✅ **Server Actions** - Auth & Biota CRUD operations
5. ✅ **Auth Protection** - Middleware & protected routes
6. ✅ **UI Components** - Button, Input, Label sudah dibuat

## 📋 Yang Perlu Dilakukan

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Copy `.env.example` ke `.env.local`
3. Isi credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Setup Database

1. Buka Supabase Dashboard → SQL Editor
2. Copy isi file `supabase/migrations/001_initial_schema.sql`
3. Paste dan Run

### 4. Setup Storage

1. Buka Supabase Dashboard → Storage
2. Create bucket: `biota-images`
3. Set public atau gunakan RLS (recommended)

### 5. Copy Assets

Jalankan perintah di PowerShell:

```powershell
Copy-Item -Path "AQUABIODIVERSA.COM\src\assets\*.png" -Destination "public\" -Force
Copy-Item -Path "AQUABIODIVERSA.COM\public\image\*" -Destination "public\image\" -Force
```

### 6. Run Development

```bash
npm run dev
```

## 📝 Next: Migrate Components

Components yang perlu di-migrate dari `AQUABIODIVERSA.COM/src/components/`:

- [ ] Beranda.tsx → `src/app/beranda/page.tsx`
- [ ] AdminBeranda.tsx → `src/app/admin/page.tsx`
- [ ] Gallery.tsx → `src/app/gallery/page.tsx`
- [ ] DetailBiota.tsx → `src/app/biota/[id]/page.tsx`
- [ ] UploadFoto.tsx → `src/app/upload/page.tsx`
- [ ] ProfilAkun.tsx → `src/app/profil/page.tsx`
- [ ] TentangKami.tsx → `src/app/tentang-kami/page.tsx`
- [ ] UI components lainnya dari `ui/` folder

## 🎯 Status

- ✅ Project structure
- ✅ Supabase setup
- ✅ Database schema
- ✅ Auth system
- ✅ Server Actions
- ⏳ Component migration (next step)
- ⏳ Assets migration (manual copy)

