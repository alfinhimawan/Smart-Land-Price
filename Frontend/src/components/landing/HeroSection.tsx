import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background styling - Modern grid & subtle glow */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent-cyan/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-gray-300 text-sm font-medium shadow-2xl">
            <MapPin className="w-4 h-4 text-accent-cyan" />
            <span>Sistem Prediksi Spasial Cerdas IKN</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl">
            Estimasi Harga Lahan <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-blue-400 to-accent-blue">
              Secara Instan & Presisi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tinggalkan metode tebak-tebakan. Gunakan kekuatan algoritma Inverse Distance Weighting (IDW) untuk menganalisis dan memprediksi nilai lahan geografis dengan akurasi tinggi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto justify-center">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto group text-base px-8 h-14 rounded-xl shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]">
                Mulai Prediksi Sekarang
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-14 rounded-xl border-white/10 hover:bg-white/5">
                Pelajari Cara Kerjanya
              </Button>
            </Link>
          </div>

          {/* Bottom Stats / Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/5 mt-12 w-full max-w-3xl"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">IDW</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Algoritma Inti</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">95%</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Tingkat Akurasi</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">&lt;1s</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Waktu Respon</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white mb-1">100%</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Data Interaktif</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
