'use client'

import { useRouter } from 'next/navigation'
import PencarianTidakDitemukan from './PencarianTidakDitemukan'

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

interface PencarianTidakDitemukanClientProps {
  query: string
  fishDatabase: FishData[]
}

export default function PencarianTidakDitemukanClient({ query, fishDatabase }: PencarianTidakDitemukanClientProps) {
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
    <PencarianTidakDitemukan
      query={query}
      fishDatabase={fishDatabase}
      onBack={handleBack}
      onBackHome={handleBackHome}
      onSelectFish={handleSelectFish}
      onNavigateToAbout={handleNavigateToAbout}
    />
  )
}

