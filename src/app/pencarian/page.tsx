import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBiota } from '@/actions/biota'
import HasilPencarianClient from '@/components/HasilPencarianClient'
import PencarianTidakDitemukanClient from '@/components/PencarianTidakDitemukanClient'

export const dynamic = 'force-dynamic'

export default async function PencarianPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Await searchParams as required by Next.js
  const params = await searchParams
  const query = params.q || ''

  // Fetch biota data dengan search
  let biota = []
  try {
    // Only fetch with search if query is provided
    if (query && query.trim()) {
      biota = await getBiota(query.trim())
    } else {
      // If no search query, return empty array
      biota = []
    }
  } catch (error) {
    console.error('Error fetching biota:', error)
    biota = []
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

  // If search query exists but no results, show "not found" page
  // Fetch all biota for recommendations (only uploaded biota from database)
  if (query && query.trim() && fishDatabase.length === 0) {
    let allBiota = []
    try {
      // Fetch all biota (without search) for recommendations
      allBiota = await getBiota()
    } catch (error) {
      console.error('Error fetching all biota for recommendations:', error)
      allBiota = []
    }

    // Convert to FishData format for recommendations
    const recommendationsDatabase = allBiota.map((item: any) => ({
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

    return <PencarianTidakDitemukanClient query={query} fishDatabase={recommendationsDatabase} />
  }

  // If no search query, redirect to beranda (should not happen, but safety check)
  if (!query || !query.trim()) {
    redirect('/beranda')
  }

  return <HasilPencarianClient fishDatabase={fishDatabase} query={query} />
}

