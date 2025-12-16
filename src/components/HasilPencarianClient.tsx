'use client'

import { useRouter } from 'next/navigation'
import HasilPencarian from './HasilPencarian'

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

interface HasilPencarianClientProps {
  fishDatabase: FishData[]
  query: string
}

export default function HasilPencarianClient({ fishDatabase, query }: HasilPencarianClientProps) {
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

  const handleNavigateToAbout = () => {
    router.push('/tentang-kami')
  }

  return (
    <HasilPencarian
      fishDatabase={fishDatabase}
      query={query}
      onBack={handleBack}
      onBackHome={handleBackHome}
      onSelectFish={handleSelectFish}
      onNavigateToAbout={handleNavigateToAbout}
    />
  )
}

