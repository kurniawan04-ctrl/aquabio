'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  imageAlt: string
}

export default function ImageModal({ isOpen, onClose, imageUrl, imageAlt }: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:scale-110"
          aria-label="Tutup"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Zoom Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsZoomed(!isZoomed)
          }}
          className="absolute top-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:scale-110"
          aria-label={isZoomed ? "Zoom Out" : "Zoom In"}
        >
          {isZoomed ? <ZoomOut className="h-6 w-6" /> : <ZoomIn className="h-6 w-6" />}
        </button>

        {/* Image Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-h-[90vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            onError={(e) => {
              // Fallback jika gambar tidak bisa dimuat
              const target = e.target as HTMLImageElement
              target.src = '/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png'
            }}
          />
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-md"
        >
          <p>Klik gambar untuk zoom • Tekan ESC untuk tutup</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

