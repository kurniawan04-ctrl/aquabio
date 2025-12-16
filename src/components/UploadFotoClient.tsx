'use client'

import { useRouter } from 'next/navigation'
import { createBiota } from '@/actions/biota'
import UploadFoto from './UploadFoto'

interface UploadFotoClientProps {
  user: any
}

export default function UploadFotoClient({ user }: UploadFotoClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleBackHome = () => {
    router.push('/beranda')
  }

  const handleUpload = async (fish: { 
    name: string
    image: string
    location: string
    category: string
    description: string
    photographer?: string
    uploadDate?: string
    imageFile?: File
  }) => {
    try {
      console.log('📤 Starting upload...', { 
        name: fish.name, 
        hasFile: !!fish.imageFile,
        fileSize: fish.imageFile?.size 
      })

      const formData = new FormData()
      formData.append('name', fish.name)
      formData.append('location', fish.location)
      formData.append('category', fish.category)
      formData.append('description', fish.description || '')
      formData.append('photographer', fish.photographer || user?.user_metadata?.username || user?.email?.split('@')[0] || 'User')
      
      if (fish.imageFile) {
        console.log('📁 Appending image file:', fish.imageFile.name, fish.imageFile.size, 'bytes')
        formData.append('image', fish.imageFile)
      } else if (fish.image) {
        console.log('🔗 Using image URL:', fish.image)
        formData.append('imageUrl', fish.image)
      } else {
        throw new Error('Tidak ada foto yang dipilih!')
      }

      console.log('🚀 Calling createBiota...')
      const result = await createBiota(formData)
      console.log('✅ Upload successful:', result)
      
      router.push('/beranda')
      router.refresh()
    } catch (error: any) {
      console.error('❌ Error uploading biota:', error)
      const errorMessage = error?.message || 'Gagal mengupload foto. Silakan coba lagi.'
      alert(errorMessage)
    }
  }

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  return (
    <UploadFoto
      onBack={handleBack}
      onBackHome={handleBackHome}
      onUpload={handleUpload}
      onNavigateToAbout={handleNavigateToAbout}
      user={user}
    />
  )
}

