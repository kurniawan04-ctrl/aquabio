'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
// import { useAuth } from "./AuthContext"; // Optional, for backward compatibility
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  ArrowLeft,
  User, 
  Upload, 
  ImageIcon, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  Info,
  Search,
  MapPin
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import BiotaCard from "./BiotaCard";
import BiotaDetailModal from "./BiotaDetailModal";

// Image paths for public folder (Next.js)
const img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1 = "/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";
const imgRectangle15 = "/48888d8f2adb1ccb13c4e60a34a5e0a8e99bb9b8.png";
const imgRectangle16 = "/e7514e0a1edf118e9ce83188f04cf9d3e6a02b9f.png";
const imgRectangle17 = "/a8cfa9809f1a6a9b5ff9cb7338f44487a42d4aba.png";
const imgRectangle18 = "/f3ca749e9269954417e50a89a00127f7dc4cd4d9.png";
const imgRectangle19 = "/115e61b35b73266e0a95d9fb566ec13828e34c44.png";
const imgRectangle20 = "/42c7891104c5a627a54b753faff3d0b0a402cc41.png";

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

interface BerandaProps {
  fishDatabase: FishData[];
  onSelectFish: (fish: FishData) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onSearch?: (query: string) => void;
  onNavigateToAbout?: () => void;
  user?: { username?: string; email?: string };
}

export default function Beranda({ fishDatabase, onSelectFish, onNavigate, onLogout, onSearch, onNavigateToAbout, user }: BerandaProps) {
  const currentUser = user;
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  // Get latest 6 photos (sort by uploadDate descending, fallback to id)
  const latestPhotos = [...fishDatabase]
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
    .slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleSelectFish = (fish: FishData) => {
    setSelectedFish(fish);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedFish(null);
  };

  const menuItems = [
    { icon: User, label: "Akun", action: () => { console.log("Action: Navigating to profile"); onNavigate("profile"); } },
    { icon: Upload, label: "Upload Foto", action: () => { console.log("Action: Navigating to upload"); onNavigate("upload"); } },
    { icon: ImageIcon, label: "Gallery", action: () => { console.log("Action: Navigating to gallery"); onNavigate("gallery"); } },
    { icon: LogOut, label: "Logout", action: () => { console.log("Action: Logging out - Session ended"); onLogout(); }, danger: true }
  ];

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
      <div className="relative">
        {/* Navbar */}
        <div className="relative z-[100]">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-4 mt-4 md:mx-8 md:mt-6 lg:mx-12 lg:mt-8"
          >
            <div className="relative rounded-2xl border-2 border-white/30 bg-white/20 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6 md:py-4">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-2xl" />
              
              <div className="relative flex items-center justify-between">
                {/* Left: Menu Button & User Info */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-lg p-2 text-white transition-colors hover:bg-white/20 lg:hidden"
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>

                  {/* Desktop Menu Dropdown */}
                  <div className="relative hidden lg:block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("🔵 Menu button clicked, current state:", isDropdownOpen);
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white transition-all hover:bg-white/30"
                    >
                      <Menu className="h-5 w-5" />
                      <span>Menu</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <>
                        {/* Simple Overlay */}
                        <div
                          className="fixed inset-0 z-[200]"
                          onClick={() => {
                            console.log("🔴 Overlay clicked");
                            setIsDropdownOpen(false);
                          }}
                        />
                        
                        {/* Dropdown Menu */}
                        <div className="absolute left-0 top-full z-[300] mt-2 w-48 rounded-xl border-2 border-cyan-400/50 bg-white shadow-2xl"
                          style={{ transform: 'translateX(-1rem)' }}
                        >
                          <div className="py-2">
                            {menuItems.map((item, index) => (
                              <div
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(`✅ CLICKED: ${item.label}`);
                                  setIsDropdownOpen(false);
                                  setTimeout(() => {
                                    console.log(`🚀 EXECUTING: ${item.label}`);
                                    item.action();
                                  }, 150);
                                }}
                                className={`flex w-full cursor-pointer items-center gap-3 px-5 py-3 transition-colors ${
                                  item.danger
                                    ? 'text-red-600 hover:bg-red-50'
                                    : 'text-gray-700 hover:bg-cyan-50'
                                } ${index === 0 ? 'rounded-t-xl' : ''} ${index === menuItems.length - 1 ? 'rounded-b-xl' : ''}`}
                              >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                <span className="font-medium">{item.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Center: User Info */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg md:h-12 md:w-12">
                      <User className="h-5 w-5 text-white md:h-6 md:w-6" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="font-['Montserrat',sans-serif] text-white drop-shadow-md">
                        Halo, <span className="font-bold">{currentUser?.username || 'User'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Logo & Brand - CLICKABLE to Tentang Kami */}
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
                  <h1 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-['Montserrat',sans-serif] font-extrabold text-transparent drop-shadow-lg text-xl md:text-2xl lg:text-3xl group-hover:from-cyan-200 group-hover:to-blue-300 transition-all">
                    AQUABIODIVERSA
                  </h1>
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className="mt-2 rounded-xl border-2 border-cyan-400/50 bg-white shadow-2xl lg:hidden z-[9999]">
                <div className="py-2">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`📱 Mobile Menu clicked: ${item.label}`);
                        setIsMenuOpen(false);
                        setTimeout(() => {
                          console.log(`🚀 Mobile Executing: ${item.label}`);
                          item.action();
                        }, 100);
                      }}
                      className={`flex w-full cursor-pointer items-center gap-3 px-5 py-3 transition-colors ${
                        item.danger
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-gray-700 hover:bg-cyan-50'
                      } ${index === 0 ? 'rounded-t-xl' : ''} ${index === menuItems.length - 1 ? 'rounded-b-xl' : ''}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.nav>
        </div>

        {/* Hero Section */}
        <div className="mx-4 mt-8 text-center md:mx-8 md:mt-12 lg:mx-12 lg:mt-24 xl:mt-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-0 mb-4 font-['Montserrat',sans-serif] font-extrabold text-white drop-shadow-2xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            TEMUKAN KEINDAHAN
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              BIOTA AIR NUSANTARA
            </span>
          </motion.h2>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl md:mt-8"
          >
            <div className="relative overflow-hidden rounded-full border-2 border-cyan-300/50 bg-white/90 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-400/50">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-600 md:h-6 md:w-6 md:left-6" />
              <Input
                type="text"
                placeholder="Cari berdasarkan nama atau kategori"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 border-0 bg-transparent pl-12 pr-32 text-gray-700 placeholder:text-gray-500 focus-visible:ring-0 md:h-16 md:pl-16 md:pr-40"
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 h-full rounded-l-none rounded-r-full bg-gradient-to-r from-cyan-600 to-blue-600 px-6 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-cyan-700 hover:to-blue-700 md:px-8"
              >
                CARI
              </Button>
            </div>
          </motion.form>
        </div>

        {/* Photo Gallery Section */}
        <div className="mx-4 mt-12 pb-16 md:mx-8 md:mt-16 lg:mx-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="mb-6 text-center font-['Montserrat',sans-serif] font-bold text-white drop-shadow-lg text-2xl md:mb-8 md:text-3xl lg:text-4xl">
              Foto Biota Terbaru!
            </h3>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {latestPhotos.map((fish, index) => (
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