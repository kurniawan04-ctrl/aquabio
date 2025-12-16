'use client'

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Home, Save, X, Edit3, Image as ImageIcon, Fish, Leaf, Bug, Shell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ImageModal from "./ImageModal";
const img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1 = "/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";

interface FishData {
  id: number | string;
  name: string;
  image: string;
  location: string;
  category?: string;
  description?: string;
  photographer?: string;
}

interface EditFotoBiotaProps {
  fish: FishData;
  onBack: () => void;
  onBackHome: () => void;
  onSave: (updatedFish: { name: string; location: string; category: string; description: string; photographer?: string; imageFile?: File; imageUrl?: string }) => void;
  onNavigateToAbout: () => void;
}

export default function EditFotoBiota({ fish, onBack, onBackHome, onSave, onNavigateToAbout }: EditFotoBiotaProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: fish.name,
    description: fish.description || "",
    location: fish.location,
    category: fish.category || "Ikan"
  });
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

  const categories = [
    { id: "Ikan", label: "Ikan", icon: Fish, color: "from-blue-500 to-cyan-500" },
    { id: "Tanaman Air", label: "Tanaman Air", icon: Leaf, color: "from-green-500 to-emerald-500" },
    { id: "Amfibi", label: "Amfibi", icon: Bug, color: "from-purple-500 to-pink-500" },
    { id: "Krustasea", label: "Krustasea", icon: Shell, color: "from-orange-500 to-red-500" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      name: formData.name,
      description: formData.description,
      location: formData.location,
      category: formData.category,
      photographer: fish.photographer,
      imageUrl: fish.image,
    });
  };

  const handleCancel = () => {
    onBack();
  };

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
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
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

        {/* Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-3">
            <Edit3 className="h-10 w-10 text-cyan-300" />
            <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-3xl md:text-4xl">
              EDIT FOTO BIOTA
            </h2>
          </div>
          <p className="font-['Montserrat',sans-serif] text-cyan-200">
            Perbarui informasi biota air yang Anda unggah
          </p>
        </motion.div>

        {/* Edit Form Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Photo Preview */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <ImageIcon className="h-6 w-6 text-cyan-300" />
                <h3 className="font-['Montserrat',sans-serif] font-bold text-white text-xl">
                  1. Foto Biota
                </h3>
              </div>
              
              <div 
                className="relative overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => setIsImageModalOpen(true)}
              >
                <ImageWithFallback
                  src={fish.image}
                  alt={fish.name}
                  className="h-80 w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Click to View Full Size Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-white text-sm font-medium">
                    Klik untuk melihat ukuran penuh
                  </div>
                </div>
              </div>
              
              <p className="mt-4 font-['Montserrat',sans-serif] text-cyan-200 text-sm">
                💡 Preview foto yang telah diunggah • Klik foto untuk melihat ukuran penuh
              </p>
            </div>
          </motion.div>

          {/* Right: Information Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <Edit3 className="h-6 w-6 text-cyan-300" />
                <h3 className="font-['Montserrat',sans-serif] font-bold text-white text-xl">
                  2. Informasi Dasar
                </h3>
              </div>

              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-200 text-sm">
                    Nama Biota *
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Contoh: Betta Hendra"
                      className="h-12 border-2 border-white/30 bg-white/90 font-['Montserrat',sans-serif] backdrop-blur-sm transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50"
                    />
                  </div>
                </div>

                {/* Category Field */}
                <div>
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-200 text-sm">
                    Kategori *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleInputChange('category', cat.id)}
                        className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-all ${
                          formData.category === cat.id
                            ? `border-cyan-400 bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105`
                            : 'border-white/30 bg-white/90 text-gray-700 hover:border-cyan-300'
                        }`}
                      >
                        <cat.icon className="h-6 w-6" />
                        <span className="text-xs font-medium text-center leading-tight">
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-200 text-sm">
                    Deskripsi
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Contoh: Spesies Betta yang bisa hidup di air tawar..."
                    rows={4}
                    className="border-2 border-white/30 bg-white/90 font-['Montserrat',sans-serif] backdrop-blur-sm transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50"
                  />
                </div>

                {/* Location Field */}
                <div>
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-200 text-sm">
                    Lokasi *
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Contoh: Sungai Barito, Kalimantan"
                    className="h-12 border-2 border-white/30 bg-white/90 font-['Montserrat',sans-serif] backdrop-blur-sm transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                onClick={handleSave}
                className="h-14 flex-1 bg-cyan-600 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all duration-300 hover:bg-cyan-700 hover:scale-105 hover:shadow-xl"
              >
                <Save className="mr-2 h-5 w-5" />
                SIMPAN
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="h-14 flex-1 border-2 border-white/70 bg-white/20 font-['Montserrat',sans-serif] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:scale-105"
              >
                <X className="mr-2 h-5 w-5" />
                BATAL
              </Button>
            </motion.div>
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