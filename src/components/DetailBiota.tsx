'use client'

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import ImageModal from "./ImageModal";
import { 
  ArrowLeft,
  User, 
  ImageIcon,
  Fish,
  MapPin,
  Calendar,
  Camera
} from "lucide-react";
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
}

interface DetailBiotaProps {
  fish: FishData;
  onBack: () => void;
  onBackHome: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onNavigateToAbout?: () => void;
  user?: any;
}

export default function DetailBiota({ fish, onBack, onBackHome, onNavigate, onLogout, onNavigateToAbout, user }: DetailBiotaProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
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

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "15 Nov 2024";
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cyan-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          alt="Underwater coral reef background"
          className="h-full w-full object-cover"
          src={img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles - Only render on client to avoid hydration mismatch */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
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

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navbar - Simple */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-4 mt-4 md:mx-8 md:mt-6 lg:mx-12 lg:mt-8"
        >
          <div className="relative rounded-2xl border-2 border-white/30 bg-white/20 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6 md:py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-2xl" />
            
            <div className="relative flex items-center justify-between">
              {/* Left: Back Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onBack}
                  className="flex items-center justify-center rounded-lg bg-white/20 p-2 text-white transition-all hover:bg-white/30 hover:scale-110"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </div>

              {/* Center: User Info */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg md:h-12 md:w-12">
                  <User className="h-5 w-5 text-white md:h-6 md:w-6" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-['Montserrat',sans-serif] text-white drop-shadow-md">
                    <span className="font-semibold">{user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'}</span>
                  </p>
                </div>
              </div>

              {/* Right: Logo & Brand */}
              <button
                onClick={() => {
                  console.log("🐠 Logo clicked - Navigating to Tentang Kami");
                  if (onNavigateToAbout) {
                    onNavigateToAbout();
                  } else {
                    onNavigate("about");
                  }
                }}
                className="flex items-center gap-2 md:gap-3 transition-all hover:scale-105 cursor-pointer group"
              >
                <Logo className="h-8 w-8 drop-shadow-lg md:h-10 md:w-10 transition-transform group-hover:rotate-12" />
                <h1 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-['Montserrat',sans-serif] font-extrabold text-transparent drop-shadow-lg text-xl group-hover:from-cyan-200 group-hover:to-blue-300 transition-all md:text-2xl lg:text-3xl">
                  AQUABIODIVERSA
                </h1>
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Detail Content */}
        <div className="mx-4 mt-6 pb-8 sm:mx-6 sm:mt-8 md:mx-8 md:mt-10 lg:mx-auto lg:max-w-4xl xl:max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Card */}
            <div className="overflow-hidden rounded-2xl border-2 border-white/30 bg-white/90 shadow-2xl backdrop-blur-sm">
              {/* Fish Image - Responsive */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative aspect-video overflow-hidden md:aspect-[21/9] cursor-pointer group"
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

              {/* Content Section */}
              <div className="p-5 sm:p-6 md:p-8">
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mb-4 md:mb-6"
                >
                  <h2 className="font-['Montserrat',sans-serif] font-bold text-cyan-900 text-2xl md:text-3xl lg:text-4xl">
                    {fish.name.toUpperCase()}
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mb-5 md:mb-6"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Fish className="h-5 w-5 text-cyan-600 md:h-6 md:w-6" />
                    <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-base md:text-lg">
                      Deskripsi
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {fish.description || `${fish.name} adalah ikan air tawar asli Indonesia yang berasal dari perairan ${fish.location}.`}
                  </p>
                </motion.div>

                {/* Details Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="mb-6 md:mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4"
                >
                  {/* Category */}
                  <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border border-cyan-200">
                    <div className="mb-2 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-cyan-600 md:h-5 md:w-5" />
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs md:text-sm">
                        Kategori
                      </h3>
                    </div>
                    <div className="inline-flex items-center rounded-md bg-cyan-100 px-3 py-1">
                      <span className="text-xs md:text-sm font-medium text-cyan-900">{fish.category || "Ikan Air Tawar"}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border border-cyan-200">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cyan-600 md:h-5 md:w-5" />
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs md:text-sm">
                        Lokasi
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-700">
                      {fish.location}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border border-cyan-200">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-cyan-600 md:h-5 md:w-5" />
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs md:text-sm">
                        Tanggal
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-700">{formatDate(fish.uploadDate)}</p>
                  </div>

                  {/* Photographer */}
                  <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border border-cyan-200">
                    <div className="mb-2 flex items-center gap-2">
                      <Camera className="h-4 w-4 text-cyan-600 md:h-5 md:w-5" />
                      <h3 className="font-['Montserrat',sans-serif] font-semibold text-cyan-900 text-xs md:text-sm">
                        Fotografer
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 md:h-7 md:w-7">
                        <User className="h-3 w-3 text-white md:h-4 md:w-4" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-gray-700">{fish.photographer || "Tabola Bale"}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Back to Beranda Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={onBackHome}
                    className="h-12 md:h-14 w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 px-8 md:px-12 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-cyan-700 hover:to-blue-700 hover:scale-105"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    KEMBALI KE BERANDA
                  </Button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={fish.image}
        imageAlt={fish.name}
      />
    </div>
  );
}