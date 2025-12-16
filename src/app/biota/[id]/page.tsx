import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBiotaById } from '@/actions/biota'
import DetailBiotaClient from '@/components/DetailBiotaClient'

export default async function DetailBiotaPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch biota data
  let biota = null
  try {
    biota = await getBiotaById(params.id)
  } catch (error) {
    console.error('Error fetching biota:', error)
    redirect('/beranda')
  }

  if (!biota) {
    redirect('/beranda')
  }

  // Convert to FishData format
  const fish = {
    id: biota.id,
    name: biota.name,
    image: biota.image_url || '/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png',
    location: biota.location,
    category: biota.category || 'Ikan Air Tawar',
    description: biota.description || '',
    photographer: biota.photographer,
    uploadDate: biota.created_at,
    userId: biota.user_id,
  }

  return <DetailBiotaClient fish={fish} user={user} />
}

