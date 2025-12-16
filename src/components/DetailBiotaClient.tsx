'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/actions/auth'
import DetailBiota from './DetailBiota'

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

interface DetailBiotaClientProps {
  fish: FishData
  user: any
}

export default function DetailBiotaClient({ fish, user }: DetailBiotaClientProps) {
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
    }
    router.push(routes[page] || '/beranda')
  }

  const handleLogout = async () => {
    await signOut()
  }

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  return (
    <DetailBiota
      fish={fish}
      onBack={handleBack}
      onBackHome={handleBackHome}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onNavigateToAbout={handleNavigateToAbout}
      user={user}
    />
  )
}

