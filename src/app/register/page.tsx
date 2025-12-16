import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RegisterPageClient from '@/components/RegisterPageClient'

export default async function RegisterPage() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Jika sudah login, redirect ke beranda
    if (user) {
      redirect('/beranda')
    }
    
    // Jika belum login, tampilkan halaman register (boleh akses)
    return <RegisterPageClient />
  } catch (error) {
    // Jika error, tetap tampilkan register form (user akan lihat error saat submit)
    return <RegisterPageClient />
  }
}

