import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Menu, X, ChevronRight, Home, Map, Info, CheckCircle, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setScrolled(currentScrollY > 20)

      // Hide navbar when scrolling down past 80px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const links = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Tentang Proyek', href: '/about', icon: Info },
    { name: 'Akurasi Model', href: '/validation', icon: CheckCircle },
    { name: 'Peta Prediksi', href: '/dashboard', icon: Map },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled 
          ? 'bg-background border-b border-card-border shadow-sm py-2' 
          : 'bg-background py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <MapPin className="w-6 h-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            <div className="font-bold text-2xl tracking-tight leading-none flex items-baseline">
              <span className="text-foreground">SmartLand</span>
              <span className="text-primary">.ID</span>
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
                    isActive(link.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
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
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {location.pathname !== '/dashboard' && (
              <Link to="/dashboard">
                <Button variant="primary" size="sm" className="group">
                  Coba Sekarang
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-card-border bg-background/95 backdrop-blur-xl overflow-hidden"
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
                        ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                )
              })}
              <div className="pt-4 mt-2 border-t border-card-border flex flex-col gap-3">
                {location.pathname !== '/dashboard' && (
                  <Link to="/dashboard" className="w-full">
                    <Button variant="primary" className="w-full justify-center">
                      Coba Prediksi Sekarang
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

