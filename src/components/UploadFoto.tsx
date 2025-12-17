'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Home,
  User, 
  ArrowLeft,
  Camera,
  Upload,
  X,
  Fish,
  Leaf,
  Shell,
  Bug
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UploadFotoProps {
  onBack: () => void;
  onBackHome: () => void;
  onUpload: (fish: { name: string; image: string; location: string; category: string; description: string; photographer?: string; uploadDate?: string; imageFile?: File }) => void;
  onNavigateToAbout: () => void;
  user?: any;
}

export default function UploadFoto({ onBack, onBackHome, onUpload, onNavigateToAbout, user }: UploadFotoProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    namaUmum: "",
    deskripsi: "",
    lokasi: ""
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
    const particleCount = 25;
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    // Validasi
    if (!selectedFile) {
      alert('Silakan pilih foto terlebih dahulu!')
      return
    }
    if (!formData.namaUmum) {
      alert('Silakan isi nama umum biota!')
      return
    }
    if (!formData.lokasi) {
      alert('Silakan isi lokasi penemuan biota!')
      return
    }
    if (!selectedCategory) {
      alert('Silakan pilih kategori biota!')
      return
    }

    // Kirim file langsung (bukan base64) untuk upload ke API
    onUpload({
      name: formData.namaUmum,
      image: previewUrl, // Preview URL untuk display
      imageFile: selectedFile, // File untuk upload ke API
      location: formData.lokasi,
      category: selectedCategory,
      description: formData.deskripsi,
      photographer: user?.user_metadata?.username || user?.email?.split('@')[0] || "Unknown",
      uploadDate: new Date().toISOString()
    });
    
    // Reset form
    setSelectedFile(null);
    setPreviewUrl("");
    setSelectedCategory("");
    setFormData({ namaUmum: "", deskripsi: "", lokasi: "" });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-cyan-900">
      {/* Background Image with Overlay - Full Screen */}
      <div className="fixed inset-0 w-screen h-screen">
        <ImageWithFallback
          alt="Deep blue ocean underwater - HD background"
          className="w-full h-full object-cover object-center"
          src="https://images.unsplash.com/photo-1646995919720-a27def2d37e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwb2NlYW4lMjBibHVlfGVufDF8fHx8MTc2NDUxNDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/50 to-cyan-900/70" />
      </div>

      {/* Floating particles - Only render on client to avoid hydration mismatch */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
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
        {/* Navbar */}
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
                    <span className="font-semibold">{user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'}</span>
                  </p>
                </div>
              </div>

              {/* Right: Logo & Brand */}
              <div className="flex items-center gap-2 md:gap-3">
                <Logo className="h-8 w-8 drop-shadow-lg md:h-10 md:w-10" />
                <h1 
                  onClick={onNavigateToAbout}
                  className="cursor-pointer bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-['Montserrat',sans-serif] font-extrabold text-transparent drop-shadow-lg text-xl transition-all hover:scale-105 md:text-2xl lg:text-3xl">
                  AQUABIODIVERSA
                </h1>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Upload Form */}
        <div className="mx-4 mt-8 pb-16 md:mx-8 lg:mx-auto lg:max-w-4xl">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-3xl md:text-4xl drop-shadow-lg">
              UNGGAH BIOTA BARU
            </h2>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border-2 border-white/30 bg-white/90 p-6 md:p-8 shadow-2xl backdrop-blur-sm"
          >
            {/* Section 1: Foto */}
            <div className="mb-8">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-cyan-900 text-xl mb-4">
                1. Foto
              </h3>

              {/* Drag & Drop Area */}
              <div
                className={`relative overflow-hidden rounded-xl border-2 border-dashed ${
                  previewUrl ? 'border-cyan-500' : 'border-cyan-300'
                } bg-gradient-to-br from-cyan-50 to-blue-50 p-8 transition-all ${
                  !previewUrl ? 'hover:border-cyan-500 hover:from-cyan-100 hover:to-blue-100' : ''
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {!previewUrl ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="font-['Montserrat',sans-serif] font-bold text-cyan-900 text-2xl mb-2">
                      DRAG & DROP AREA
                    </h4>
                    <p className="text-gray-700 mb-1">Pilih atau Seret Foto Di Sini</p>
                    <p className="text-gray-600 text-sm mb-4">(Maks. 1 File)</p>
                    <label>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/heic,image/heif,image/tiff,image/tif,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif,.tiff,.tif"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="cursor-pointer rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-cyan-700 hover:to-blue-700 hover:scale-105">
                        <Upload className="mr-2 inline h-5 w-5" />
                        Pilih Foto
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative w-full h-96">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                      }}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white shadow-lg transition-all hover:bg-red-600 hover:scale-110 z-10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Informasi Dasar */}
            <div className="mb-8">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-cyan-900 text-xl mb-4">
                2. Informasi Dasar
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Nama Umum */}
                <div>
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-900">
                    Nama Umum
                  </label>
                  <Input
                    placeholder="Masukkan nama umum biota"
                    value={formData.namaUmum}
                    onChange={(e) => setFormData({ ...formData, namaUmum: e.target.value })}
                    className="h-14 border-2 border-gray-200 font-['Montserrat',sans-serif] focus:border-cyan-400"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-900">
                    Kategori
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-all ${
                          selectedCategory === cat.id
                            ? `border-cyan-500 bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105`
                            : 'border-gray-200 bg-white text-gray-700 hover:border-cyan-300'
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

                {/* Deskripsi */}
                <div className="md:col-span-2">
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-900">
                    Deskripsi
                  </label>
                  <Textarea
                    placeholder="Deskripsikan biota yang diunggah"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    className="min-h-24 border-2 border-gray-200 font-['Montserrat',sans-serif] focus:border-cyan-400"
                  />
                </div>

                {/* Lokasi */}
                <div className="md:col-span-2">
                  <label className="mb-2 block font-['Montserrat',sans-serif] font-semibold text-cyan-900">
                    Lokasi
                  </label>
                  <Input
                    placeholder="Lokasi penemuan biota"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className="h-14 border-2 border-gray-200 font-['Montserrat',sans-serif] focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="h-14 w-full sm:w-auto font-['Montserrat',sans-serif] font-bold text-gray-700 border-2"
                onClick={onBack}
              >
                Batal
              </Button>
              <Button
                className="h-14 w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 px-8 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-cyan-700 hover:to-blue-700 hover:scale-105"
                onClick={handleSubmit}
              >
                <Upload className="mr-2 h-5 w-5" />
                Unggah & Simpan
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}