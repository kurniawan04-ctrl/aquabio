import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBiotaById } from '@/actions/biota'
import EditFotoBiotaClient from '@/components/EditFotoBiotaClient'

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch biota data
  let biota = null
  try {
    biota = await getBiotaById(id)
  } catch (error) {
    console.error('Error fetching biota:', error)
    redirect('/beranda')
  }

  if (!biota) {
    redirect('/beranda')
  }

  // Check if user owns this biota or is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.is_admin || false

  if (biota.user_id !== user.id && !isAdmin) {
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

  return <EditFotoBiotaClient fish={fish} />
}

