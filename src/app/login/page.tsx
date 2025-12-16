import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginPageClient from '@/components/LoginPageClient'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>
}) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      redirect('/beranda')
    }
  } catch (error) {
    // If Supabase is not configured, still show login form
    // User will see error when trying to login
  }

  // Await searchParams as required by Next.js
  const params = await searchParams

  return <LoginPageClient message={params.message} error={params.error} />
}

