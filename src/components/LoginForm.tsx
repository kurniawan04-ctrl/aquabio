'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, resendConfirmationEmail } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { User, Lock } from 'lucide-react'
import Link from 'next/link'

export default function LoginForm({ message, error: initialError }: { message?: string; error?: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(initialError || null)
  const [isPending, startTransition] = useTransition()
  const [resendEmail, setResendEmail] = useState('')
  const [resendStatus, setResendStatus] = useState<{ success?: boolean; message?: string } | null>(null)
  const [isResending, setIsResending] = useState(false)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setError(null)
      try {
        console.log('🔐 Attempting login...')
        const result = await signIn(formData)
        console.log('📥 Login result:', result)
        
        if (result?.error) {
          console.error('❌ Login error:', result.error)
          setError(result.error)
        } else if (result?.success) {
          console.log('✅ Login successful, redirecting...')
          // Redirect to beranda on success
          router.push('/beranda')
        }
      } catch (err: any) {
        console.error('💥 Login exception:', err)
        // If it's a redirect error, let it propagate
        if (err.message === 'NEXT_REDIRECT') {
          return
        }
        setError(err.message || 'Terjadi kesalahan saat login')
      }
    })
  }

  return (
    <section className="w-full max-w-2xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-10 shadow-2xl flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-4xl md:text-5xl mb-3">
          Masuk ke Akun Anda
        </h2>
      </div>
      
      <form action={handleSubmit} className="space-y-6">
        {message && (
          <div className="p-3 bg-green-500/20 border border-green-400/50 rounded-lg text-green-100 text-sm backdrop-blur-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="space-y-2">
            <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-100 text-sm backdrop-blur-sm">
              {error}
            </div>
            {error.includes('expired') || error.includes('invalid') ? (
              <div className="p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg text-sm backdrop-blur-sm">
                <p className="text-blue-100 mb-2 font-medium">Kirim ulang email konfirmasi?</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-cyan-200/50"
                  />
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!resendEmail) {
                        setResendStatus({ success: false, message: 'Silakan masukkan email' })
                        return
                      }
                      setIsResending(true)
                      setResendStatus(null)
                      const result = await resendConfirmationEmail(resendEmail)
                      setIsResending(false)
                      if (result.error) {
                        setResendStatus({ success: false, message: result.error })
                      } else {
                        setResendStatus({ success: true, message: result.message })
                        setResendEmail('')
                      }
                    }}
                    disabled={isResending}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isResending ? 'Mengirim...' : 'Kirim Ulang'}
                  </Button>
                </div>
                {resendStatus && (
                  <p className={`text-sm mt-2 ${resendStatus.success ? 'text-green-100' : 'text-red-100'}`}>
                    {resendStatus.message}
                  </p>
                )}
              </div>
            ) : null}
          </div>
        )}
        
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
              className="h-20 pl-16 pr-16 border-2 border-white/20 bg-white/10 text-white text-xl placeholder:text-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-10 text-2xl font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/50 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>
      
      <p className="mt-6 text-center font-['Montserrat',sans-serif] text-xl text-cyan-100">
        Belum punya akun?{' '}
        <Link href="/register" className="text-cyan-300 hover:text-white hover:underline font-semibold transition-colors">
          Daftar sekarang
        </Link>
      </p>
    </section>
  )
}

