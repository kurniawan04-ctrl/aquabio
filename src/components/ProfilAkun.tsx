'use client'

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import ImageModal from "./ImageModal";
import { 
  ArrowLeft,
  Home,
  User, 
  Edit2,
  Trash2
} from "lucide-react";
const img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1 = "/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";
const imgRectangle15 = "/48888d8f2adb1ccb13c4e60a34a5e0a8e99bb9b8.png";
const imgRectangle16 = "/e7514e0a1edf118e9ce83188f04cf9d3e6a02b9f.png";
const imgRectangle17 = "/a8cfa9809f1a6a9b5ff9cb7338f44487a42d4aba.png";
const imgRectangle18 = "/f3ca749e9269954417e50a89a00127f7dc4cd4d9.png";
const imgRectangle19 = "/115e61b35b73266e0a95d9fb566ec13828e34c44.png";
const imgRectangle20 = "/42c7891104c5a627a54b753faff3d0b0a402cc41.png";

interface ProfilAkunProps {
  fishDatabase: any[];
  onBack: () => void;
  onBackHome: () => void;
  onNavigate: (page: string) => void;
  onEditFish?: (fish: any) => void;
  onDeleteFish?: (fishId: number | string) => void;
  onNavigateToAbout?: () => void;
  user?: { username?: string; email?: string; id?: string; fullName?: string };
  isAdmin?: boolean;
}

export default function ProfilAkun({ fishDatabase, onBack, onBackHome, onNavigate, onEditFish, onDeleteFish, onNavigateToAbout, user, isAdmin = false }: ProfilAkunProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null)
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

  // Filter photos: Admin sees all, regular users see only their own
  // Check by user_id (from database) - compare as numbers or strings
  const myPhotos = isAdmin 
    ? fishDatabase 
    : fishDatabase.filter(fish => {
        // Get fish user ID (prefer userId, fallback to uploadedBy)
        const fishUserId = fish.userId !== undefined ? fish.userId : (fish.uploadedBy ? parseInt(fish.uploadedBy) : null);
        // Get current user ID
        const currentUserId = user?.id ? String(user.id) : null;
        
        // Compare (both as strings for consistency)
        const match = fishUserId !== null && currentUserId !== null && (
          fishUserId.toString() === currentUserId.toString()
        );
        
        return match;
      });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-cyan-900">
      {/* Background Image with Overlay - Full Screen */}
      <div className="fixed inset-0 w-screen h-screen">
        <img
          alt="Underwater cave with blue light - HD background"
          className="w-full h-full object-cover object-center"
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
                <button
                  onClick={onBackHome}
                  className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white transition-all hover:bg-white/30 hover:scale-110"
                >
                  <Home className="h-5 w-5" />
                  <span className="hidden sm:inline font-['Montserrat',sans-serif] font-semibold">Beranda</span>
                </button>
              </div>

              {/* Center: User Info */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg md:h-12 md:w-12">
                  <User className="h-5 w-5 text-white md:h-6 md:w-6" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-['Montserrat',sans-serif] text-white drop-shadow-md">
                    <span className="font-semibold">{user?.username}</span>
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

        {/* Profile Section */}
        <div className="mx-4 mt-8 pb-16 md:mx-8 lg:mx-12">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 rounded-2xl border-2 border-white/40 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-2xl md:text-3xl drop-shadow-lg">
                  {user?.fullName || user?.username || 'User'}
                </h2>
                <p className="text-cyan-100 drop-shadow-md">Kontributor Aktif</p>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-2xl md:text-3xl drop-shadow-lg">
              Kontribusi Foto Saya
            </h2>
          </motion.div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-white/40 bg-white/10 shadow-2xl backdrop-blur-xl transition-all hover:scale-105 hover:shadow-cyan-400/50 hover:border-cyan-400/60"
              >
                {/* Image */}
                <div 
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => {
                    setSelectedImage({ url: photo.image, alt: photo.name })
                    setIsImageModalOpen(true)
                  }}
                >
                  <img
                    src={photo.image}
                    alt={photo.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Click to View Full Size Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1.5 text-white text-xs font-medium">
                      Klik untuk melihat ukuran penuh
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-white drop-shadow-lg mb-1">
                    {photo.name}
                  </h3>
                  <p className="text-xs text-cyan-100 drop-shadow-md mb-3">{photo.date}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white transition-all hover:from-cyan-700 hover:to-blue-700"
                      onClick={() => onEditFish ? onEditFish(photo) : console.log("Edit", photo.id)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => onDeleteFish ? onDeleteFish(photo.id) : console.log("Delete", photo.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => {
            setIsImageModalOpen(false)
            setSelectedImage(null)
          }}
          imageUrl={selectedImage.url}
          imageAlt={selectedImage.alt}
        />
      )}
    </div>
  );
}