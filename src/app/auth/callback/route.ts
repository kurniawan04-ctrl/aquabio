import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/beranda'
  const error_description = requestUrl.searchParams.get('error_description')
  const error_code = requestUrl.searchParams.get('error_code')

  // Handle error from Supabase (e.g., expired link)
  if (error_code || error_description) {
    console.error('Email confirmation error:', { error_code, error_description })
    
    let errorMessage = 'Email confirmation failed'
    if (error_code === 'otp_expired') {
      errorMessage = 'Link konfirmasi email sudah expired. Silakan request link baru atau daftar ulang.'
    } else if (error_description) {
      errorMessage = error_description
    }
    
    return redirect(`/login?error=${encodeURIComponent(errorMessage)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.session) {
      // Check if email is from Google (for registration requirement)
      const userEmail = data.session.user.email
      if (userEmail) {
        const isGoogleEmail = userEmail.endsWith('@gmail.com') || 
                            userEmail.endsWith('@googlemail.com') ||
                            userEmail.includes('@') && userEmail.split('@')[1]?.includes('google')
        
        if (!isGoogleEmail) {
          // If not Google email, sign out and show error
          await supabase.auth.signOut()
          return redirect(`/register?error=${encodeURIComponent('Registrasi hanya dapat dilakukan dengan akun Google (Gmail). Silakan gunakan email Gmail Anda.')}`)
        }
      }
      
      // Create or update profile for Google OAuth user
      if (data.session.user) {
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.session.user.id)
          .single()
        
        if (!existingProfile) {
          // Create profile for new Google OAuth user
          const username = data.session.user.email?.split('@')[0] || 'user'
          const fullName = data.session.user.user_metadata?.full_name || 
                          data.session.user.user_metadata?.name || 
                          username
          
          await supabase
            .from('profiles')
            .insert({
              id: data.session.user.id,
              username: username,
              email: data.session.user.email || '',
              full_name: fullName,
            })
        }
      }
      
      console.log('✅ Email confirmed successfully')
      return redirect(next)
    }
    
    // Handle specific errors
    if (error) {
      console.error('Email confirmation error:', error)
      
      let errorMessage = 'Email confirmation failed'
      if (error.message.includes('expired') || error.message.includes('otp_expired')) {
        errorMessage = 'Link konfirmasi email sudah expired. Silakan request link baru atau daftar ulang.'
      } else if (error.message.includes('invalid') || error.message.includes('invalid_token')) {
        errorMessage = 'Link konfirmasi email tidak valid. Silakan request link baru.'
      } else {
        errorMessage = error.message || 'Email confirmation failed'
      }
      
      return redirect(`/login?error=${encodeURIComponent(errorMessage)}`)
    }
  }

  // If there's no code, redirect to login
  return redirect('/login?error=' + encodeURIComponent('Link konfirmasi email tidak valid. Silakan cek email Anda atau request link baru.'))
}

