import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import TentangKamiClient from '@/components/TentangKamiClient'

export default async function TentangKamiPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <TentangKamiClient />
}

