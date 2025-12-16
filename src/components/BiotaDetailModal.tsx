'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, Fish, MapPin, Calendar, Camera, ImageIcon, User } from 'lucide-react'
import ImageModal from './ImageModal'
import { useState } from 'react'

interface FishData {
  id: number | string
  name: string
  image: string
  location: string
  category?: string
  description?: string
  photographer?: string
  uploadDate?: string
  userId?: string
}

interface BiotaDetailModalProps {
  fish: FishData | null
  isOpen: boolean
  onClose: () => void
}

export default function BiotaDetailModal({ fish, isOpen, onClose }: BiotaDetailModalProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "15 Nov 2024"
    const date = new Date(dateString)
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  if (!fish) return null

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 z-[9999] overflow-y-auto sm:inset-8 md:inset-12 lg:inset-16"
            >
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-white/30 bg-white/90 shadow-2xl backdrop-blur-xl">
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition-all hover:bg-white hover:scale-110"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Layout: Desktop = Grid 2 kolom, Mobile = Stack vertikal */}
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Fish Image - Lebih kecil dan proporsional */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative h-64 sm:h-80 lg:h-full lg:min-h-[500px] overflow-hidden cursor-pointer group"
                      onClick={() => setIsImageModalOpen(true)}
                    >
                      <img
                        src={fish.image}
                        alt={fish.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Click to View Full Size Indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-white text-sm font-medium">
                          Klik untuk melihat ukuran penuh
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Section - Langsung terlihat tanpa scroll */}
                    <div className="p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[500px] lg:max-h-none">
                      {/* Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-4"
                      >
                        <h2 className="font-['Montserrat',sans-serif] font-bold text-cyan-900 text-xl md:text-2xl lg:text-3xl">
                          {fish.name.toUpperCase()}
                        </h2>
                      </motion.div>

                      {/* Details Grid - Compact, langsung terlihat */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-4 grid grid-cols-2 gap-3 sm:gap-4"
                      >
                        {/* Category */}
                        <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-3 border border-cyan-200">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <ImageIcon className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                            <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs">
                              Kategori
                            </h3>
                          </div>
                          <div className="inline-flex items-center rounded-md bg-cyan-100 px-2 py-1">
                            <span className="text-xs font-medium text-cyan-900">{fish.category || "Ikan Air Tawar"}</span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-3 border border-cyan-200">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                            <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs">
                              Lokasi
                            </h3>
                          </div>
                          <p className="text-xs font-medium text-gray-700 line-clamp-2">
                            {fish.location}
                          </p>
                        </div>

                        {/* Date */}
                        <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-3 border border-cyan-200">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                            <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs">
                              Tanggal
                            </h3>
                          </div>
                          <p className="text-xs font-medium text-gray-700">{formatDate(fish.uploadDate)}</p>
                        </div>

                        {/* Photographer */}
                        <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-3 border border-cyan-200">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <Camera className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                            <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs">
                              Fotografer
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex-shrink-0">
                              <User className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-xs font-medium text-gray-700 line-clamp-1">{fish.photographer || "Tabola Bale"}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Description - Langsung terlihat setelah details */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-4"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Fish className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                          <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-base">
                            Deskripsi
                          </h3>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {fish.description || `${fish.name} adalah ikan air tawar asli Indonesia yang berasal dari perairan ${fish.location}.`}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={fish.image}
        imageAlt={fish.name}
      />
    </>
  )
}

