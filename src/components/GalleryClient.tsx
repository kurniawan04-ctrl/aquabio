'use client'

import { useRouter } from 'next/navigation'
import Gallery from './Gallery'

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

interface GalleryClientProps {
  fishDatabase: FishData[]
  user: any
}

export default function GalleryClient({ fishDatabase, user }: GalleryClientProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleBackHome = () => {
    router.push('/beranda')
  }

  const handleSelectFish = (fish: FishData) => {
    router.push(`/biota/${fish.id}`)
  }

  const handleSearch = (query: string) => {
    router.push(`/pencarian?q=${encodeURIComponent(query)}`)
  }

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      profile: '/profil',
      upload: '/upload',
      gallery: '/gallery',
      about: '/tentang-kami',
    }
    router.push(routes[page] || '/beranda')
  }

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  const mockUser = {
    username: user?.user_metadata?.username || user?.email?.split('@')[0] || 'User',
    email: user?.email,
    id: user?.id,
  }

  return (
    <Gallery
      fishDatabase={fishDatabase}
      onBack={handleBack}
      onBackHome={handleBackHome}
      onNavigate={handleNavigate}
      onSelectFish={handleSelectFish}
      onSearch={handleSearch}
      onNavigateToAbout={handleNavigateToAbout}
      user={mockUser}
    />
  )
}

