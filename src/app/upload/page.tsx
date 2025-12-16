import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import UploadFotoClient from '@/components/UploadFotoClient'

export const dynamic = 'force-dynamic'

export default async function UploadPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <UploadFotoClient user={user} />
}

