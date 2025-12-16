'use client'

import { motion } from "motion/react";
import Image from "next/image";
import Logo from "./Logo";
import { ArrowLeft, Home, Info, GraduationCap, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1 = "/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";

interface TentangKamiProps {
  onBack: () => void;
  onBackHome: () => void;
  onNavigate: (page: string) => void;
}

// Data tim
const teamMembers = [
  {
    name: "Ardiansyah Gunaevi",
    nim: "2401232",
    role: "Mahasiswa Teknik Komputer",
    photoUrl: "/image/ardy.jpg"
  },
  {
    name: "Giega Ghassanny",
    nim: "2400250",
    role: "Mahasiswa Teknik Komputer",
    photoUrl: "/image/giega.jpg"
  },
  {
    name: "Kurniawan Tri Untoro",
    nim: "2401859",
    role: "Mahasiswa Teknik Komputer",
    photoUrl: "/image/kurniawan.jpg"
  },
  {
    name: "Rifa Alida Rosyidah",
    nim: "2411189",
    role: "Mahasiswa Teknik Komputer",
    photoUrl: "/image/rifa.jpg"
  },
  {
    name: "Syifa Auliya Zahara",
    nim: "2405740",
    role: "Mahasiswa Teknik Komputer",
    photoUrl: "/image/syifa.jpg"
  }
];

export default function TentangKami({ onBack, onBackHome, onNavigate }: TentangKamiProps) {
  return (
    <div className="relative min-h-screen w-full overflow-auto bg-gradient-to-br from-cyan-900 via-blue-900 to-blue-950">
      {/* Underwater Background with Bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated Bubbles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}%`,
            }}
            animate={{
              y: [0, -1200],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
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

              {/* Right: Logo */}
              <div className="flex items-center gap-3">
                <Logo className="h-10 w-10 sm:h-12 sm:w-12" />
                <span className="hidden bg-gradient-to-r from-white to-cyan-200 bg-clip-text font-['Montserrat',sans-serif] font-bold text-transparent sm:inline text-xl">
                  AQUABIODIVERSA
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg">
              <Info className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="font-['Montserrat',sans-serif] font-bold text-white text-3xl sm:text-4xl">
                Tentang Kami
              </h1>
              <p className="font-['Montserrat',sans-serif] text-cyan-100 mt-1">
                About AquaBiodiversa
              </p>
            </div>
          </div>

          {/* AquaBiodiversa Description */}
          <div className="mt-6 space-y-4 rounded-xl bg-white/10 p-5 border border-white/20">
            <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-xl">
              🐠 AquaBiodiversa
            </h2>
            <p className="font-['Montserrat',sans-serif] text-cyan-50 leading-relaxed">
              Platform digital inovatif yang didedikasikan untuk mengeksplorasi, mendokumentasikan, dan melestarikan keanekaragaman biota air nusantara. 
              Kami mengajak seluruh masyarakat untuk berkontribusi dalam pelestarian ekosistem perairan Indonesia yang kaya akan biodiversitas.
            </p>
          </div>

          {/* Visi & Misi */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Visi */}
            <div className="rounded-xl bg-white/10 p-5 border border-white/20">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-white mb-3 text-lg">
                🎯 Visi
              </h3>
              <p className="font-['Montserrat',sans-serif] text-cyan-50 leading-relaxed">
                Menjadi platform terdepan dalam dokumentasi dan pelestarian biota air nusantara melalui partisipasi masyarakat dan teknologi digital.
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-xl bg-white/10 p-5 border border-white/20">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-white mb-3 text-lg">
                🚀 Misi
              </h3>
              <ul className="font-['Montserrat',sans-serif] text-cyan-50 space-y-2 list-disc list-inside">
                <li>Mendokumentasi keanekaragaman biota air Indonesia</li>
                <li>Meningkatkan kesadaran pelestarian ekosistem perairan</li>
                <li>Memfasilitasi kolaborasi komunitas</li>
              </ul>
            </div>
          </div>

          {/* University Info */}
          <div className="mt-6 space-y-2 rounded-xl bg-white/10 p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white">
              <GraduationCap className="h-5 w-5 text-cyan-300" />
              <span className="font-['Montserrat',sans-serif] font-semibold">
                Universitas Pendidikan Indonesia (UPI)
              </span>
            </div>
            <div className="flex items-center gap-2 text-cyan-100">
              <MapPin className="h-5 w-5 text-cyan-300" />
              <span className="font-['Montserrat',sans-serif]">
                Kampus UPI Cibiru - Program Studi Teknik Komputer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-all"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-600/0 opacity-0 transition-opacity group-hover:opacity-20" />
              
              {/* Avatar Circle - Foto jika tersedia, kalau tidak pakai inisial */}
              <div className="relative mb-4 flex justify-center">
                {member.photoUrl ? (
                  <div className="relative h-24 w-24">
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover shadow-lg ring-4 ring-white/30 transition-all group-hover:ring-white/50"
                      unoptimized
                    />
                  </div>
                ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg ring-4 ring-white/30 transition-all group-hover:ring-white/50">
                  <span className="font-['Montserrat',sans-serif] font-bold text-white text-3xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                )}
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="font-['Montserrat',sans-serif] font-bold text-white mb-2 text-xl">
                  {member.name}
                </h3>
                <p className="font-['Montserrat',sans-serif] text-cyan-200 mb-2">
                  NIM: {member.nim}
                </p>
                <div className="inline-block rounded-full bg-white/20 px-4 py-1 backdrop-blur-sm">
                  <p className="font-['Montserrat',sans-serif] text-white text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 rounded-2xl border-2 border-white/30 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl"
        >
          <p className="font-['Montserrat',sans-serif] text-cyan-100">
            © 2025 AquaBiodiversa - Universitas Pendidikan Indonesia
          </p>
          <p className="font-['Montserrat',sans-serif] text-cyan-200 mt-1 text-sm">
            Jelajahi dan Berkontribusi Terhadap Keanekaragaman Biota Air Nusantara 🐠
          </p>
        </motion.div>
      </div>
    </div>
  );
}