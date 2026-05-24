import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { useState, useEffect, useRef } from 'react'

import { ParticleBackground } from './ParticleBackground'

const TypewriterText = ({ text, delay = 0, speed = 50 }: { text: string, delay?: number, speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return <>{displayText}<span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse align-middle" style={{ visibility: displayText.length === text.length ? 'hidden' : 'visible' }}></span></>;
};

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Antigravity 3D Particle Sphere */}
      <ParticleBackground />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-card-border backdrop-blur-sm text-muted-foreground text-sm font-medium shadow-2xl">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Sistem Prediksi Spasial Cerdas IKN</span>
          </div>

          {/* Title with Typewriter Effect */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] max-w-4xl min-h-[140px] sm:min-h-[160px]">
            <TypewriterText text="Estimasi Harga Lahan " delay={100} speed={40} />
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-400 to-primary">
              <TypewriterText text="Secara Instan & Presisi" delay={1100} speed={40} />
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Tinggalkan metode tebak-tebakan. Gunakan kekuatan algoritma Inverse Distance Weighting (IDW) untuk menganalisis dan memprediksi nilai lahan geografis dengan akurasi tinggi.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto justify-center"
          >
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto group text-base px-8 h-14 rounded-xl shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]">
                Mulai Prediksi Sekarang
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-14 rounded-xl border-card-border hover:bg-foreground/5 backdrop-blur-sm">
                Pelajari Cara Kerjanya
              </Button>
            </Link>
          </motion.div>

          {/* Bottom Stats / Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/5 mt-12 w-full max-w-3xl"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground mb-1">IDW</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Algoritma Inti</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground mb-1">95%</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Tingkat Akurasi</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground mb-1">&lt;1s</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Waktu Respon</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground mb-1">100%</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Data Interaktif</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
