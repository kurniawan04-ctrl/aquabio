'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateBiota } from '@/actions/biota'
import EditFotoBiota from './EditFotoBiota'

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

interface EditFotoBiotaClientProps {
  fish: FishData
}

export default function EditFotoBiotaClient({ fish }: EditFotoBiotaClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleBackHome = () => {
    router.push('/beranda')
  }

  const handleSave = async (updatedFish: {
    name: string
    location: string
    category: string
    description: string
    photographer?: string
    imageFile?: File
    imageUrl?: string
  }) => {
    try {
      const formData = new FormData()
      formData.append('name', updatedFish.name)
      formData.append('location', updatedFish.location)
      formData.append('category', updatedFish.category)
      formData.append('description', updatedFish.description || '')
      formData.append('photographer', updatedFish.photographer || '')
      
      if (updatedFish.imageFile) {
        formData.append('image', updatedFish.imageFile)
      } else if (updatedFish.imageUrl) {
        formData.append('imageUrl', updatedFish.imageUrl)
      }

      await updateBiota(fish.id.toString(), formData)
      // Notifikasi sukses setelah berhasil mengedit
      toast.success('Biota berhasil diperbarui.', {
        description: 'Perubahan data biota telah disimpan.',
        duration: 3000,
      })
      router.push(`/biota/${fish.id}`)
      router.refresh()
    } catch (error: any) {
      console.error('Error updating biota:', error)
      // Notifikasi error jika gagal mengedit
      toast.error('Gagal memperbarui biota', {
        description: error.message || 'Terjadi kesalahan saat menyimpan perubahan. Silakan coba lagi.',
        duration: 4000,
      })
    }
  }

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  return (
    <EditFotoBiota
      fish={fish}
      onBack={handleBack}
      onBackHome={handleBackHome}
      onSave={handleSave}
      onNavigateToAbout={handleNavigateToAbout}
    />
  )
}

