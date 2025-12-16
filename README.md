# AquaBiodiversa - Next.js App

Platform dokumentasi biodiversitas air Indonesia dengan Next.js 15, Supabase, dan Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project di [Supabase](https://supabase.com)
2. Copy `.env.example` ke `.env.local`
3. Isi dengan credentials Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Setup Database

Jalankan migration SQL di Supabase Dashboard:

1. Buka Supabase Dashboard → SQL Editor
2. Copy isi file `supabase/migrations/001_initial_schema.sql`
3. Jalankan query tersebut

### 4. Setup Storage Bucket

1. Buka Supabase Dashboard → Storage
2. Buat bucket baru dengan nama: `biota-images`
3. Set policy untuk public access (opsional) atau gunakan RLS

### 5. Copy Assets

Copy semua file PNG dari `AQUABIODIVERSA.COM/src/assets/` ke `public/`:

```bash
# Windows PowerShell
Copy-Item -Path "AQUABIODIVERSA.COM\src\assets\*.png" -Destination "public\" -Force

# Copy images juga
Copy-Item -Path "AQUABIODIVERSA.COM\public\image\*" -Destination "public\image\" -Force
```

### 6. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📁 Struktur Project

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── login/        # Halaman login
│   │   ├── register/     # Halaman register
│   │   ├── beranda/      # Halaman utama
│   │   └── ...
│   ├── components/        # React components
│   ├── actions/          # Server Actions
│   │   ├── auth.ts      # Auth actions
│   │   └── biota.ts     # Biota CRUD actions
│   └── lib/
│       └── supabase/     # Supabase clients
├── public/               # Static assets
├── supabase/
│   └── migrations/      # Database migrations
└── middleware.ts        # Auth middleware
```

## 🔐 Authentication

- Login: `/login`
- Register: `/register`
- Protected routes menggunakan middleware
- Server Actions untuk auth operations

## 🗄️ Database Schema

- `profiles` - User profiles (extends auth.users)
- `biota` - Data biodiversitas air
- Row Level Security (RLS) enabled
- Policies untuk user/admin permissions

## 🛠️ Tech Stack

- **Next.js 15** - React framework dengan App Router
- **Supabase** - Backend as a Service (Auth + Database + Storage)
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Server Actions** - Server-side mutations
- **Radix UI** - UI components

## 📝 Next Steps

1. Migrate semua components dari `AQUABIODIVERSA.COM/src/components/`
2. Setup halaman-halaman utama (beranda, gallery, detail, dll)
3. Implement upload image dengan Supabase Storage
4. Add search & filter functionality
5. Deploy ke Vercel

## 🚢 Deployment

1. Push ke GitHub
2. Connect ke Vercel
3. Add environment variables di Vercel
4. Deploy!

