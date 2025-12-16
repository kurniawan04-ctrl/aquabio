'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { User, Lock, Mail, UserCircle } from 'lucide-react'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setError(null)
      try {
        const username = formData.get('username') as string
        console.log('📝 Attempting signup for username:', username)
        
        const result = await signUp(formData)
        console.log('📥 Signup result:', result)
        
        if (result?.error) {
          console.error('❌ Signup error:', result.error)
          setError(result.error)
        } else if (result?.success) {
          console.log('✅ Signup successful, redirecting to login...')
          // Redirect ke login setelah daftar berhasil
          router.push('/login?message=Registrasi berhasil! Silakan login dengan username dan password Anda.')
        }
      } catch (err: any) {
        console.error('💥 Signup exception:', err)
        // If it's a redirect error, let it propagate
        if (err.message === 'NEXT_REDIRECT') {
          return
        }
        setError(err.message || 'Terjadi kesalahan saat mendaftar')
      }
    })
  }

  return (
    <section className="w-full max-w-2xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-10 shadow-2xl flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-4xl md:text-5xl mb-3">
          Daftar Akun Baru
        </h2>
      </div>
      
      <form action={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-100 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <Label htmlFor="fullName" className="font-['Montserrat',sans-serif] text-white text-xl">
            Nama Lengkap
          </Label>
          <div className="relative">
            <UserCircle className="absolute left-6 top-1/2 h-8 w-8 -translate-y-1/2 text-cyan-200" />
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Masukkan nama lengkap"
              className="h-20 pl-16 pr-5 border-2 border-white/20 bg-white/10 text-white text-xl placeholder:text-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="email" className="font-['Montserrat',sans-serif] text-white text-xl">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-6 top-1/2 h-8 w-8 -translate-y-1/2 text-cyan-200" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Masukkan email"
              className="h-20 pl-16 pr-5 border-2 border-white/20 bg-white/10 text-white text-xl placeholder:text-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="username" className="font-['Montserrat',sans-serif] text-white text-xl">
            Username
          </Label>
          <div className="relative">
            <User className="absolute left-6 top-1/2 h-8 w-8 -translate-y-1/2 text-cyan-200" />
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Masukkan username"
              className="h-20 pl-16 pr-5 border-2 border-white/20 bg-white/10 text-white text-xl placeholder:text-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label htmlFor="password" className="font-['Montserrat',sans-serif] text-white text-xl">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-6 top-1/2 h-8 w-8 -translate-y-1/2 text-cyan-200 z-10" />
            <PasswordInput
              id="password"
              name="password"
              required
              placeholder="Masukkan password"
              minLength={6}
              className="h-20 pl-16 pr-16 border-2 border-white/20 bg-white/10 text-white text-xl placeholder:text-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
            />
          </div>
          <p className="font-['Montserrat',sans-serif] text-base text-cyan-200/80">
            Gunakan password minimal 6 karakter yang kuat dan unik
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-10 text-2xl font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/50 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Memproses...' : 'Daftar'}
        </Button>
      </form>
      
      <p className="mt-6 text-center font-['Montserrat',sans-serif] text-xl text-cyan-100">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-cyan-300 hover:text-white hover:underline font-semibold transition-colors">
          Login
        </Link>
      </p>
    </section>
  )
}

