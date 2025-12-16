'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function signUp(formData: FormData | null) {
  try {
    if (!formData) {
      return { error: 'Form data tidak valid' }
    }

    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string
    const fullName = formData.get('fullName') as string

    if (!email || !password || !username || !fullName) {
      return { error: 'Semua field harus diisi' }
    }

    // Get origin for email redirect
    // Priority: 1. NEXT_PUBLIC_SITE_URL env var, 2. headers origin, 3. localhost fallback
    const headersList = await headers()
    let origin = process.env.NEXT_PUBLIC_SITE_URL
    
    if (!origin) {
      origin = headersList.get('origin') || 
               (headersList.get('host') ? `https://${headersList.get('host')}` : null) ||
               'http://localhost:3000'
    }
    
    // Ensure origin doesn't have trailing slash
    origin = origin.replace(/\/$/, '')
    
    console.log('📧 Email redirect origin:', origin)

    const data = {
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName,
        },
        emailRedirectTo: `${origin}/auth/callback?next=/beranda`,
      },
    }

    const { data: signUpData, error } = await supabase.auth.signUp(data)

    if (error) {
      console.error('SignUp error:', error)
      // Handle specific Supabase errors
      if (error.message.includes('data breach')) {
        return { error: 'Password ini pernah bocor di data breach. Silakan gunakan password yang lebih kuat dan unik.' }
      }
      if (error.message.includes('already registered') || error.message.includes('User already registered')) {
        return { error: 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.' }
      }
      if (error.message.includes('password')) {
        return { error: 'Password tidak memenuhi syarat. Gunakan password minimal 6 karakter.' }
      }
      return { error: error.message }
    }

    // Wait for trigger to create profile, then verify it was created
    if (signUpData.user) {
      // Wait for trigger (up to 2 seconds)
      let profileCreated = false
      for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, username, email')
          .eq('id', signUpData.user.id)
          .single()
        
        if (profile && !profileError) {
          console.log('Profile created successfully:', profile)
          profileCreated = true
          break
        }
      }
      
      // Fallback: create profile manually if trigger failed
      if (!profileCreated) {
        console.error('⚠️ Profile was not created by trigger, creating manually...')
        const { data: insertedProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: signUpData.user.id,
            username: username,
            email: email,
            full_name: fullName,
          })
          .select()
          .single()
        
        if (insertError) {
          console.error('❌ Failed to create profile manually:', insertError)
          return { error: `Registrasi berhasil, tapi profile gagal dibuat: ${insertError.message}. Silakan hubungi admin.` }
        } else {
          console.log('✅ Profile created manually successfully:', insertedProfile)
        }
      }
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error: any) {
    // Handle NEXT_REDIRECT error
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return { error: error.message || 'Terjadi kesalahan saat mendaftar' }
  }
}

export async function signIn(formData: FormData | null) {
  try {
    if (!formData) {
      return { error: 'Form data tidak valid' }
    }

    const supabase = await createClient()

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (!username || !password) {
      return { error: 'Username dan password harus diisi' }
    }

    // Cari email dari username di profiles table (case insensitive)
    // Coba exact match dulu
    let profile = null
    let profileError = null
    
    const { data: profileExact, error: errorExact } = await supabase
      .from('profiles')
      .select('email, username')
      .eq('username', username)
      .single()

    if (profileExact && !errorExact) {
      profile = profileExact
    } else {
      // Jika exact match gagal, coba case insensitive
      console.log('Exact match failed, trying case insensitive...')
      const { data: profileCaseInsensitive, error: errorCaseInsensitive } = await supabase
        .from('profiles')
        .select('email, username')
        .ilike('username', username)
        .single()
      
      if (profileCaseInsensitive && !errorCaseInsensitive) {
        profile = profileCaseInsensitive
        console.log('Found profile with case insensitive search:', profile)
      } else {
        profileError = errorCaseInsensitive || errorExact
        console.error('Profile not found:', profileError)
      }
    }

    if (profileError || !profile) {
      // Debug: cek semua profiles untuk troubleshooting
      const { data: allProfiles, error: allProfilesError } = await supabase
        .from('profiles')
        .select('username, email')
        .limit(10)
      
      console.error('=== LOGIN DEBUG ===')
      console.error('Username searched:', username)
      console.error('Profile error:', profileError)
      console.error('All profiles error:', allProfilesError)
      console.error('Available profiles:', allProfiles)
      console.error('==================')
      
      // Return error dengan info lebih detail
      const errorMsg = allProfiles && allProfiles.length > 0
        ? `Username "${username}" tidak ditemukan. Username yang tersedia: ${allProfiles.map(p => p.username).join(', ')}`
        : `Username "${username}" tidak ditemukan. Pastikan Anda sudah mendaftar dan profile sudah dibuat.`
      
      return { error: errorMsg }
    }

    // Login dengan email yang ditemukan
    const { error } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password: password,
    })

    if (error) {
      console.error('Login error:', error)
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Username atau password salah' }
      }
      if (error.message.includes('Email not confirmed')) {
        return { error: 'Email belum dikonfirmasi. Silakan cek email Anda.' }
      }
      return { error: error.message || 'Password salah' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error: any) {
    console.error('SignIn catch error:', error)
    // Handle NEXT_REDIRECT error
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return { error: error.message || 'Terjadi kesalahan saat login' }
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function resendConfirmationEmail(email: string) {
  try {
    const supabase = await createClient()
    
    // Get origin for email redirect
    const headersList = await headers()
    let origin = process.env.NEXT_PUBLIC_SITE_URL
    
    if (!origin) {
      origin = headersList.get('origin') || 
               (headersList.get('host') ? `https://${headersList.get('host')}` : null) ||
               'http://localhost:3000'
    }
    
    origin = origin.replace(/\/$/, '')
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/beranda`,
      },
    })

    if (error) {
      console.error('Resend confirmation error:', error)
      return { error: error.message || 'Gagal mengirim ulang email konfirmasi' }
    }

    return { success: true, message: 'Email konfirmasi telah dikirim ulang. Silakan cek inbox Anda.' }
  } catch (error: any) {
    console.error('Resend confirmation catch error:', error)
    return { error: error.message || 'Terjadi kesalahan saat mengirim ulang email konfirmasi' }
  }
}

