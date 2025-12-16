'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteBiota } from '@/actions/biota'
import ProfilAkun from './ProfilAkun'

interface FishData {
  id: string | number
  name: string
  image: string
  location: string
  category?: string
  description?: string
  photographer?: string
  uploadDate?: string
  userId?: string
}

interface ProfilAkunClientProps {
  fishDatabase: FishData[]
  user: any
  isAdmin: boolean
}

export default function ProfilAkunClient({ fishDatabase, user, isAdmin }: ProfilAkunClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleBackHome = () => {
    router.push('/beranda')
  }

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      profile: '/profil',
      upload: '/upload',
      gallery: '/gallery',
      about: '/tentang-kami',
      edit: '/edit',
    }
    router.push(routes[page] || '/beranda')
  }

  const handleEditFish = (fish: FishData) => {
    router.push(`/edit/${fish.id}`)
  }

  const handleDeleteFish = async (fishId: number | string) => {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      try {
        await deleteBiota(fishId.toString())
        // ✅ NOTIFIKASI SUKSES: Muncul setelah berhasil menghapus biota
        toast.success('Data biota Anda berhasil dihapus.', {
          description: 'Foto biota telah dihapus dari database.',
          duration: 3000,
        })
        router.refresh()
      } catch (error: any) {
        console.error('Error deleting biota:', error)
        // ❌ NOTIFIKASI ERROR: Muncul jika gagal menghapus biota
        toast.error('Gagal menghapus data biota', {
          description: error.message || 'Terjadi kesalahan saat menghapus data biota. Silakan coba lagi.',
          duration: 4000,
        })
      }
    }
  }

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  const mockUser = {
    username: user?.user_metadata?.username || user?.email?.split('@')[0] || 'User',
    email: user?.email,
    id: user?.id,
    fullName: user?.user_metadata?.full_name || user?.user_metadata?.username || user?.email?.split('@')[0] || 'User',
  }

  return (
    <ProfilAkun
      fishDatabase={fishDatabase}
      onBack={handleBack}
      onBackHome={handleBackHome}
      onNavigate={handleNavigate}
      onEditFish={handleEditFish}
      onDeleteFish={handleDeleteFish}
      onNavigateToAbout={handleNavigateToAbout}
      user={mockUser}
      isAdmin={isAdmin}
    />
  )
}

