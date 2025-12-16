import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, allow access to login/register only
  if (!supabaseUrl || !supabaseAnonKey) {
    if (
      request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register')
    ) {
      return NextResponse.next()
    }
    // Redirect to login if trying to access protected route without Supabase
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it so that the
  // middleware never runs, and your app becomes vulnerable to attacks.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname.startsWith('/login')
  const isRegisterPage = pathname.startsWith('/register')
  const isAuthCallback = pathname.startsWith('/auth/callback')
  const isRootPage = pathname === '/'
  const isBerandaPage = pathname === '/beranda'
  const isPublicPage = isLoginPage || isRegisterPage || isAuthCallback

  // Jika tidak ada user dan bukan di halaman public, redirect ke login
  // TAPI: Biarkan akses ke register page (user boleh daftar)
  if (!user && !isPublicPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Biarkan akses ke register page jika belum login (user boleh daftar)
  // Jangan redirect register ke login

  // Jika ada user dan di halaman login/register, redirect ke beranda
  if (user && (isLoginPage || isRegisterPage)) {
    const url = request.nextUrl.clone()
    url.pathname = '/beranda'
    return NextResponse.redirect(url)
  }

  // Behavior: Ketika refresh di halaman apapun (kecuali login/register/auth-callback/beranda/root), redirect ke beranda
  // Ini membuat aplikasi seperti SPA dimana refresh selalu kembali ke beranda
  if (user && !isPublicPage && !isRootPage && !isBerandaPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/beranda'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

