'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { signOut } from '@/actions/auth'
import { deleteBiota } from '@/actions/biota'
import AdminBeranda from './AdminBeranda'

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
  uploadedBy?: string
}

interface AdminBerandaClientProps {
  fishDatabase: FishData[]
  user: {
    id: string
    username: string
    email?: string
    full_name?: string
  }
}

export default function AdminBerandaClient({ fishDatabase, user }: AdminBerandaClientProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | number | null>(null)

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      about: '/tentang-kami',
      profile: '/profil',
      upload: '/upload',
      gallery: '/gallery',
    }
    router.push(routes[page] || '/admin')
  }

  const handleEditFish = (fish: FishData) => {
    router.push(`/edit/${fish.id}`)
  }

  const handleDeleteFish = async (fishId: string | number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus foto biota ini?')) {
      return
    }

    setIsDeleting(fishId)
    try {
      await deleteBiota(fishId.toString())
      // Notifikasi sukses setelah berhasil menghapus
      toast.success('Biota berhasil dihapus.', {
        description: 'Foto biota telah dihapus dari database.',
        duration: 3000,
      })
      // Refresh the page to show updated data
      router.refresh()
    } catch (error: any) {
      console.error('Error deleting biota:', error)
      // Notifikasi error jika gagal menghapus
      toast.error('Gagal menghapus biota', {
        description: error.message || 'Terjadi kesalahan saat menghapus foto biota. Silakan coba lagi.',
        duration: 4000,
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  return (
    <AdminBeranda
      fishDatabase={fishDatabase}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
      onEditFish={handleEditFish}
      onDeleteFish={handleDeleteFish}
      onNavigateToAbout={handleNavigateToAbout}
      user={user}
      isDeleting={isDeleting}
    />
  )
}

