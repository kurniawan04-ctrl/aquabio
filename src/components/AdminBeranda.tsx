'use client'

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { 
  Home,
  User, 
  LogOut,
  Edit2,
  Trash2,
  Shield,
  Image as ImageIcon
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const imgUnderwaterCave = "/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";

interface AdminBerandaProps {
  fishDatabase: any[];
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onEditFish?: (fish: any) => void;
  onDeleteFish?: (fishId: string | number) => void;
  onNavigateToAbout?: () => void;
  user: {
    id: string;
    username: string;
    email?: string;
    full_name?: string;
  };
  isDeleting?: string | number | null;
}

export default function AdminBeranda({ 
  fishDatabase, 
  onLogout, 
  onNavigate, 
  onEditFish, 
  onDeleteFish,
  onNavigateToAbout,
  user,
  isDeleting
}: AdminBerandaProps) {
  const [particles, setParticles] = useState<Array<{ id: number; initialX: number; initialY: number; animateX: number; duration: number; delay: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const generateParticles = () => {
      const newParticles = [];
      const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const height = typeof window !== 'undefined' ? window.innerHeight : 1000;
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          initialX: Math.random() * width,
          initialY: height + 50,
          animateX: Math.random() * width,
          duration: Math.random() * 8 + 12,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', generateParticles);
      return () => window.removeEventListener('resize', generateParticles);
    }
  }, []);


  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-cyan-900">
      {/* Background Image with Overlay - Full Screen */}
      <div className="fixed inset-0 w-screen h-screen">
        <img
          alt="Underwater cave with blue light - HD background"
          className="w-full h-full object-cover object-center"
          src={imgUnderwaterCave}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles - Only render on client to avoid hydration mismatch */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
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
        {/* Admin Navbar */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-4 mt-4 md:mx-8 md:mt-6 lg:mx-12 lg:mt-8"
        >
          <div className="relative rounded-2xl border-2 border-white/30 bg-white/20 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6 md:py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-2xl" />
            
            <div className="relative flex items-center justify-between">
              {/* Left: Admin Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 shadow-lg">
                  <Shield className="h-5 w-5 text-white" />
                  <span className="hidden sm:inline font-['Montserrat',sans-serif] font-bold text-white">
                    ADMIN PANEL
                  </span>
                </div>
              </div>

              {/* Center: Admin Info */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-600 shadow-lg md:h-12 md:w-12">
                  <User className="h-5 w-5 text-white md:h-6 md:w-6" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-['Montserrat',sans-serif] text-white drop-shadow-md">
                    <span className="font-semibold">{user.username}</span>
                  </p>
                  <p className="font-['Montserrat',sans-serif] text-xs text-orange-200">
                    Administrator
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

        {/* Admin Content */}
        <div className="mx-4 mt-8 pb-16 md:mx-8 lg:mx-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <div className="mb-2 flex items-center justify-center gap-3">
              <Shield className="h-10 w-10 text-orange-400" />
              <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-3xl md:text-4xl drop-shadow-lg">
                KELOLA SEMUA FOTO BIOTA
              </h2>
            </div>
            <p className="font-['Montserrat',sans-serif] text-cyan-200">
              Anda dapat mengedit atau menghapus foto biota yang tidak sesuai
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <ImageIcon className="h-5 w-5 text-cyan-300" />
              <p className="font-['Montserrat',sans-serif] font-semibold text-cyan-100">
                Total Foto: {fishDatabase.length}
              </p>
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <Button
              onClick={onLogout}
              className="bg-gradient-to-r from-red-600 to-orange-600 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-red-700 hover:to-orange-700 hover:scale-105"
            >
              <LogOut className="mr-2 h-5 w-5" />
              LOGOUT
            </Button>
          </motion.div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fishDatabase.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                className="group overflow-hidden rounded-2xl border-2 border-white/40 bg-white/10 shadow-2xl backdrop-blur-xl transition-all hover:border-orange-400/60 hover:shadow-orange-400/50"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={photo.image}
                    alt={photo.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Category Badge */}
                  {photo.category && (
                    <div className="absolute top-3 right-3">
                      <div className="rounded-lg bg-cyan-600/90 px-3 py-1 backdrop-blur-sm">
                        <span className="font-['Montserrat',sans-serif] text-xs font-semibold text-white">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-white drop-shadow-lg mb-1">
                    {photo.name}
                  </h3>
                  <p className="text-sm text-cyan-100 drop-shadow-md mb-1">{photo.location}</p>
                  
                  {/* Uploaded By Badge */}
                  {photo.uploadedBy && (
                    <div className="mb-3">
                      <span className="inline-block text-xs text-orange-200 bg-orange-600/30 px-2 py-1 rounded">
                        📤 {photo.uploadedBy}
                      </span>
                    </div>
                  )}

                  {/* Admin Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white transition-all hover:from-cyan-700 hover:to-blue-700"
                      onClick={() => onEditFish && onEditFish(photo)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 transition-all hover:from-red-700 hover:to-orange-700 disabled:opacity-50"
                      onClick={() => onDeleteFish && onDeleteFish(photo.id)}
                      disabled={isDeleting === photo.id}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {isDeleting === photo.id ? 'Menghapus...' : 'Hapus'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {fishDatabase.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-16"
            >
              <ImageIcon className="h-20 w-20 text-cyan-300/50 mx-auto mb-4" />
              <p className="font-['Montserrat',sans-serif] text-xl text-white drop-shadow-lg">
                Belum ada foto biota yang diunggah
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}