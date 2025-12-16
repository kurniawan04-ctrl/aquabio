'use client'

import { motion } from "motion/react";
import { Search, FishOff, ArrowLeft, Home } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1 = "/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";
const imgRectangle15 = "/48888d8f2adb1ccb13c4e60a34a5e0a8e99bb9b8.png";
const imgRectangle16 = "/e7514e0a1edf118e9ce83188f04cf9d3e6a02b9f.png";
const imgRectangle17 = "/a8cfa9809f1a6a9b5ff9cb7338f44487a42d4aba.png";

interface FishData {
  id: number | string;
  name: string;
  image: string;
  location: string;
  category?: string;
  description?: string;
  photographer?: string;
  uploadDate?: string;
  userId?: string;
}

interface PencarianTidakDitemukanProps {
  query: string;
  fishDatabase: FishData[];
  onBack: () => void;
  onBackHome: () => void;
  onSelectFish?: (fish: FishData) => void;
  onNavigateToAbout: () => void;
}

export default function PencarianTidakDitemukan({ 
  query, 
  fishDatabase,
  onBack, 
  onBackHome,
  onSelectFish,
  onNavigateToAbout
}: PencarianTidakDitemukanProps) {
  // Get latest 3 photos from database (only uploaded biota)
  const recommendations = [...fishDatabase]
    .sort((a, b) => {
      // Sort by uploadDate if available
      if (a.uploadDate && b.uploadDate) {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      }
      // Fallback: sort by id (handle both string and number)
      const aId = typeof a.id === 'string' ? a.id : String(a.id)
      const bId = typeof b.id === 'string' ? b.id : String(b.id)
      return bId.localeCompare(aId)
    })
    .slice(0, 3);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cyan-900">
      {/* Background Image with Overlay - SAMA DENGAN BERANDA */}
      <div className="absolute inset-0">
        <img
          alt="Underwater coral reef background"
          className="h-full w-full object-cover"
          src={img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles - SAMA DENGAN BERANDA */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-white/30"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            }}
            animate={{
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Glassmorphism Navbar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              {/* Left: Back Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onBack}
                  className="flex items-center justify-center rounded-lg bg-white/20 p-2 text-white transition-all hover:scale-110 hover:bg-white/30"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={onBackHome}
                  className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white transition-all hover:scale-110 hover:bg-white/30"
                >
                  <Home className="h-5 w-5" />
                  <span className="hidden font-['Montserrat',sans-serif] font-semibold sm:inline">
                    Beranda
                  </span>
                </button>
              </div>

              {/* Right: Brand */}
              <h1 
                onClick={onNavigateToAbout}
                className="cursor-pointer bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-['Montserrat',sans-serif] font-extrabold text-transparent text-xl md:text-2xl lg:text-3xl transition-all hover:scale-105">
                AQUABIODIVERSA
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Search Bar Display */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-['Montserrat',sans-serif] text-cyan-200 text-sm">
                Hasil pencarian untuk:
              </p>
              <p className="font-['Montserrat',sans-serif] font-bold text-white text-xl">
                &quot;{query}&quot;
              </p>
            </div>
          </div>
        </motion.div>

        {/* No Result Found Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          {/* Fish Off Icon with Animation */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="mb-6 flex justify-center"
          >
            <div className="rounded-full bg-gray-500/30 p-8">
              <FishOff className="h-24 w-24 text-gray-400" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* No Result Text */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-['Montserrat',sans-serif] font-bold text-gray-400 text-3xl md:text-4xl lg:text-5xl"
          >
            NO RESULT FOUND!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 font-['Montserrat',sans-serif] text-cyan-200 text-lg"
          >
            Biota yang Anda cari tidak ditemukan. Coba kata kunci lain atau lihat rekomendasi di bawah.
          </motion.p>
        </motion.div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <h3 className="mb-6 font-['Montserrat',sans-serif] font-bold text-cyan-300 text-2xl md:text-3xl">
            🐠 Jelajahi Kontribusi Terbaru
          </h3>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.length > 0 ? (
              recommendations.map((fish, index) => (
                <motion.button
                  key={fish.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => onSelectFish && onSelectFish(fish)}
                  className="group overflow-hidden rounded-xl border-2 border-white/30 bg-white/20 shadow-xl backdrop-blur-sm transition-all hover:border-cyan-300 hover:shadow-2xl"
                >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={fish.image}
                    alt={fish.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-4 text-left">
                  <h4 className="font-['Montserrat',sans-serif] font-bold text-white mb-2">
                    {fish.name}
                  </h4>
                  <p className="font-['Montserrat',sans-serif] text-cyan-200 text-sm">
                    📍 {fish.location}
                  </p>
                  <div className="mt-2 inline-block rounded-full bg-cyan-500/30 px-3 py-1">
                    <p className="font-['Montserrat',sans-serif] text-white text-xs">
                      {fish.category}
                    </p>
                  </div>
                </div>
              </motion.button>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-cyan-200 text-lg">
                  Belum ada biota yang diupload. Jadilah yang pertama!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}