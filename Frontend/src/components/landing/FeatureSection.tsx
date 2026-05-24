import { motion } from 'framer-motion'
import { MapPin, Activity, Layers, Crosshair } from 'lucide-react'

export const FeatureSection = () => {
  const features = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Peta GIS Interaktif',
      description: 'Navigasi peta IKN yang responsif. Klik lokasi mana saja untuk langsung mendapatkan estimasi harga lahan secara real-time.',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Visualisasi Heatmap',
      description: 'Pemetaan distribusi harga menggunakan lapisan warna (heatmap) untuk mengidentifikasi area bernilai tinggi dan rendah dengan cepat.',
    },
    {
      icon: <Crosshair className="w-6 h-6" />,
      title: 'Akurasi Spasial',
      description: 'Memperhitungkan faktor jarak dari titik referensi data nyata untuk memastikan estimasi harga relevan secara geografis.',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Metode Interpolasi IDW',
      description: 'Menggunakan algoritma Inverse Distance Weighting untuk mengkalkulasi nilai tak diketahui berdasarkan titik sampel terdekat.',
    },
  ]

  return (
    <section className="py-24 px-4 relative z-10 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-accent-cyan font-semibold tracking-wider uppercase text-sm mb-3">Keunggulan Sistem</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Analitik Spasial Komprehensif</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Dilengkapi dengan fitur canggih untuk memberikan wawasan harga lahan yang mendalam, akurat, dan mudah dipahami oleh pengguna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full p-8 rounded-2xl bg-dark-900 border border-white/5 group-hover:border-accent-cyan/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-dark-950 border border-white/10 flex items-center justify-center text-accent-cyan mb-6 group-hover:scale-110 group-hover:bg-accent-cyan/10 transition-all duration-500 shadow-lg">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
