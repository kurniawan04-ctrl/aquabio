'use client'

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, ArrowLeft, Home, MapPin, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import BiotaCard from "./BiotaCard";
import BiotaDetailModal from "./BiotaDetailModal";
const img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1 = "/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";

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

interface HasilPencarianProps {
  query: string;
  fishDatabase: FishData[];
  onBack: () => void;
  onBackHome: () => void;
  onSelectFish: (fish: FishData) => void;
  onNavigateToAbout: () => void;
}

export default function HasilPencarian({ 
  query, 
  fishDatabase,
  onBack, 
  onBackHome,
  onSelectFish,
  onNavigateToAbout
}: HasilPencarianProps) {
  const [selectedFish, setSelectedFish] = useState<FishData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{
    initialX: number;
    initialY: number;
    animateX: number;
    duration: number;
    delay: number;
  }>>([]);
  const [isClient, setIsClient] = useState(false);

  // Generate particle positions only on client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const particleCount = 20;
    const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1000;
    
    const newParticles = Array.from({ length: particleCount }, () => ({
      initialX: Math.random() * width,
      initialY: height + 50,
      animateX: Math.random() * width,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
    }));
    
    setParticles(newParticles);
  }, []);

  const handleSelectFish = (fish: FishData) => {
    setSelectedFish(fish);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedFish(null);
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cyan-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          alt="Underwater cave with blue light - HD background"
          className="h-full w-full object-cover object-center"
          src={img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles - Only render on client to avoid hydration mismatch */}
      {isClient && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-white/30"
              initial={{
                x: particle.initialX,
                y: particle.initialY,
              }}
              animate={{
                y: -50,
                x: particle.animateX,
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-['Montserrat',sans-serif] text-cyan-200 text-sm">
                  Hasil pencarian untuk:
                </p>
                <p className="font-['Montserrat',sans-serif] font-bold text-white text-xl">
                  &quot;{query}&quot;
                </p>
              </div>
            </div>
            <div className="rounded-full bg-green-500/30 px-4 py-2 backdrop-blur-sm">
              <p className="font-['Montserrat',sans-serif] font-semibold text-white">
                ✓ {fishDatabase.length} Hasil Ditemukan
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <h3 className="mb-6 font-['Montserrat',sans-serif] font-bold text-cyan-300 text-2xl md:text-3xl">
            🐠 Biota Yang Ditemukan
          </h3>

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fishDatabase.map((fish, index) => (
              <BiotaCard
                key={fish.id}
                fish={fish}
                onClick={() => handleSelectFish(fish)}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <BiotaDetailModal
        fish={selectedFish}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}