'use client'

import { motion } from 'motion/react'
import RegisterForm from './RegisterForm'
import Logo from './Logo'

const imgBackground = "/5468057469ab2db33e9f9d2c12419f6659505266.png"

export default function RegisterPageClient() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-cyan-900 flex flex-col items-center justify-center bg-cover bg-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          alt="Underwater coral reef background"
          className="h-full w-full object-cover"
          src={imgBackground}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
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

      {/* Header Brand - Logo + Title + Tagline */}
      <div className="relative z-10 flex flex-col items-center gap-2 mb-8">
        <div className="flex items-center gap-3">
          <Logo className="h-20 w-20 flex-shrink-0 md:h-24 md:w-24" />
          <h1 className="font-['Montserrat',sans-serif] font-extrabold text-white text-4xl md:text-6xl tracking-wide drop-shadow-lg">
            AQUABIODIVERSA
          </h1>
        </div>
        <p className="font-['Montserrat',sans-serif] text-white text-lg md:text-2xl text-center drop-shadow-md">
          Jelajahi Keanekaragaman Biota Air Nusantara
        </p>
      </div>

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-2xl px-4 md:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </main>
  )
}

