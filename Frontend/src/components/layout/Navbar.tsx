import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Menu, X, ChevronRight, Github, Home, Map, Info, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const links = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Peta Prediksi', href: '/dashboard', icon: Map },
    { name: 'Tentang Proyek', href: '/about', icon: Info },
    { name: 'Akurasi Model', href: '/validation', icon: CheckCircle },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-950/80 backdrop-blur-lg border-b border-white/10 shadow-lg py-2' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-accent-cyan to-accent-blue rounded-xl group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
              <MapPin className="w-5 h-5 text-dark-950" />
            </div>
            <div>
              <div className="font-bold text-lg text-white tracking-tight leading-none">SmartLand<span className="text-accent-cyan">.ID</span></div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mt-1">Prediksi Harga IKN</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group flex items-center gap-2 ${
                    isActive(link.href) ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-cyan rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <Link to="/dashboard">
              <Button variant="primary" size="sm" className="group">
                Coba Sekarang
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-dark-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
              {links.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive(link.href)
                        ? 'bg-accent-cyan/10 text-accent-cyan font-medium border border-accent-cyan/20'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                )
              })}
              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <Link to="/dashboard" className="w-full">
                  <Button variant="primary" className="w-full justify-center">
                    Coba Prediksi Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
