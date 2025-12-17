'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
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
      
      // ✅ NOTIFIKASI SUKSES: Muncul setelah berhasil upload biota
      toast.success('Biota berhasil di upload.', {
        description: 'Foto biota telah disimpan ke database.',
        duration: 3000,
      })
      
      // Delay sedikit sebelum redirect agar user bisa melihat notifikasi
      setTimeout(() => {
        router.push('/beranda')
        router.refresh()
      }, 500)
    } catch (error: any) {
      console.error('❌ Error uploading biota:', error)
      
      // Log detailed error info for debugging
      console.error('Error details:', {
        message: error?.message,
        fileName: fish.imageFile?.name,
        fileType: fish.imageFile?.type,
        fileSize: fish.imageFile?.size,
        fileExtension: fish.imageFile?.name?.split('.').pop(),
      })
      
      const errorMessage = error?.message || 'Gagal mengupload foto. Silakan coba lagi.'
      
      // More specific error messages for better UX
      let userFriendlyMessage = errorMessage
      if (errorMessage.includes('Tipe file tidak didukung')) {
        userFriendlyMessage = 'Format foto tidak didukung. Gunakan JPG, PNG, WebP, HEIC, atau TIFF. Jika dari kamera iPhone, coba convert ke JPG terlebih dahulu.'
      } else if (errorMessage.includes('Ukuran file terlalu besar')) {
        userFriendlyMessage = 'Ukuran foto terlalu besar (maksimal 10MB). Coba kompres foto atau gunakan foto dengan resolusi lebih rendah.'
      } else if (errorMessage.includes('Bucket') || errorMessage.includes('Permission')) {
        userFriendlyMessage = 'Terjadi kesalahan pada server. Silakan coba lagi dalam beberapa saat.'
      }
      
      // ❌ NOTIFIKASI ERROR: Muncul jika gagal upload biota
      toast.error('Gagal mengupload biota', {
        description: userFriendlyMessage,
        duration: 5000, // Lebih lama agar user bisa baca
      })
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

