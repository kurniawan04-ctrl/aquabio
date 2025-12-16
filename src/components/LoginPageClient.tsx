'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import LoginForm from './LoginForm'
import Logo from './Logo'

const imgBackground = "/5468057469ab2db33e9f9d2c12419f6659505266.png"

interface LoginPageClientProps {
  message?: string
  error?: string
}

export default function LoginPageClient({ message, error }: LoginPageClientProps) {
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

      {/* Floating particles animation - Only render on client to avoid hydration mismatch */}
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

      {/* Header Brand - Logo + Title + Tagline */}
      <div className="relative z-10 flex flex-col items-center gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Logo className="h-12 w-12 flex-shrink-0 md:h-14 md:w-14" />
          <h1 className="font-['Montserrat',sans-serif] font-extrabold text-white text-2xl md:text-3xl tracking-wide drop-shadow-lg">
            AQUABIODIVERSA
          </h1>
        </div>
        <p className="font-['Montserrat',sans-serif] text-white text-sm md:text-base text-center drop-shadow-md">
          Jelajahi Keanekaragaman Biota Air Nusantara
        </p>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-lg px-4 md:px-6">
        <LoginForm message={message} error={error} />
      </div>
    </main>
  )
}

