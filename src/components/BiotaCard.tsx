'use client'

import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'

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

interface BiotaCardProps {
  fish: FishData
  onClick: () => void
  index?: number
}

export default function BiotaCard({ fish, onClick, index = 0 }: BiotaCardProps) {
  return (
    <motion.div
      key={fish.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="overflow-hidden rounded-2xl border-2 border-white/30 bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-cyan-400">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={fish.image}
            alt={fish.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h4 className="mb-2 font-['Montserrat',sans-serif] font-bold text-cyan-800">
            {fish.name}
          </h4>
          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{fish.location}</span>
          </div>
          
          {/* View Detail Button */}
          <button
            onClick={onClick}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 py-2 font-['Montserrat',sans-serif] font-semibold text-white shadow-md transition-all hover:from-cyan-700 hover:to-blue-700 hover:shadow-lg"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </motion.div>
  )
}


