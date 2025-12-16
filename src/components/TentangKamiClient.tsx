'use client'

import { useRouter } from 'next/navigation'
import TentangKami from './TentangKami'

export default function TentangKamiClient() {
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

  return (
    <TentangKami
      onBack={handleBack}
      onBackHome={handleBackHome}
      onNavigate={handleNavigate}
    />
  )
}

