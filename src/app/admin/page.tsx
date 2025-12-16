import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBiota } from '@/actions/biota'
import AdminBerandaClient from '@/components/AdminBerandaClient'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, username, full_name')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.is_admin || false

  if (!isAdmin) {
    // Redirect non-admin users to beranda
    redirect('/beranda')
  }

  // Fetch all biota data
  let biota = []
  try {
    biota = await getBiota()
  } catch (error) {
    console.error('Error fetching biota:', error)
    biota = []
  }

  // Convert to FishData format and get photographer names
  const fishDatabase = await Promise.all(
    biota.map(async (item: any) => {
      // Get photographer name from profiles if user_id exists
      let photographer = item.photographer || 'Unknown'
      let uploadedBy = photographer
      
      if (item.user_id) {
        const { data: uploaderProfile } = await supabase
          .from('profiles')
          .select('username, full_name')
          .eq('id', item.user_id)
          .single()
        
        if (uploaderProfile) {
          uploadedBy = uploaderProfile.full_name || uploaderProfile.username || 'Unknown'
          photographer = uploadedBy
        }
      }
      
      return {
        id: item.id,
        name: item.name,
        image: item.image_url || '/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png',
        location: item.location,
        category: item.category || 'Ikan Air Tawar',
        description: item.description || '',
        photographer: photographer,
        uploadDate: item.created_at,
        userId: item.user_id,
        uploadedBy: uploadedBy, // For admin display
      }
    })
  )

  return (
    <AdminBerandaClient 
      fishDatabase={fishDatabase} 
      user={{
        id: user.id,
        username: profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'Admin',
        email: user.email,
        full_name: profile?.full_name || user.user_metadata?.full_name,
      }}
    />
  )
}

