import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBiota } from '@/actions/biota'
import BerandaClient from '@/components/BerandaClient'

export default async function BerandaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile untuk cek admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.is_admin || false

  // Redirect admin to admin page (server-side redirect)
  if (isAdmin) {
    redirect('/admin')
  }

  // Fetch biota data
  let biota = []
  try {
    biota = await getBiota()
  } catch (error) {
    console.error('Error fetching biota:', error)
  }

  // Convert to FishData format
  const fishDatabase = biota.map((item: any) => ({
    id: item.id,
    name: item.name,
    image: item.image_url || '/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png',
    location: item.location,
    category: item.category || 'Ikan Air Tawar',
    description: item.description || '',
    photographer: item.photographer,
    uploadDate: item.created_at,
    userId: item.user_id,
  }))

  return <BerandaClient fishDatabase={fishDatabase} user={user} isAdmin={false} />
}

