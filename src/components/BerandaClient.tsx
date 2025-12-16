'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/actions/auth'
import Beranda from './Beranda'

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

interface BerandaClientProps {
  fishDatabase: FishData[]
  user: any
  isAdmin: boolean
}

export default function BerandaClient({ fishDatabase, user, isAdmin }: BerandaClientProps) {
  const router = useRouter()

  // Note: Admin redirect is now handled in server component (src/app/beranda/page.tsx)
  // This isAdmin prop is kept for backward compatibility but should always be false here

  const handleSelectFish = (fish: FishData) => {
    router.push(`/biota/${fish.id}`)
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

  const handleSearch = (query: string) => {
    router.push(`/pencarian?q=${encodeURIComponent(query)}`)
  }

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  // Mock user object untuk Beranda component
  const mockUser = {
    username: user?.user_metadata?.username || user?.email?.split('@')[0] || 'User',
    email: user?.email,
  }

  return (
    <Beranda
      fishDatabase={fishDatabase}
      onSelectFish={handleSelectFish}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onSearch={handleSearch}
      onNavigateToAbout={handleNavigateToAbout}
      user={mockUser}
    />
  )
}

