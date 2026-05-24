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

  const titleText = "Analitik Spasial Komprehensif"
  const titleCharacters = titleText.split("")

  return (
    <section className="py-24 px-4 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Keunggulan Sistem
          </motion.h2>
          
          <motion.h3 
            className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {titleCharacters.map((char, i) => (
              <motion.span 
                key={i} 
                variants={{
                  visible: { opacity: 1, display: "inline-block" },
                  hidden: { opacity: 0, display: "none" }
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span 
              variants={{
                visible: { visibility: "hidden", transition: { delay: 1.5 } },
                hidden: { visibility: "visible" }
              }}
              className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-pulse"
            />
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }} // Delayed to appear after typing
            viewport={{ once: true }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Dilengkapi dengan fitur canggih untuk memberikan wawasan harga lahan yang mendalam, akurat, dan mudah dipahami oleh pengguna.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                bounce: 0.5, 
                duration: 0.8, 
                delay: index * 0.15 
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full p-8 rounded-2xl bg-card border border-white/5 group-hover:border-primary/30 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-xl bg-background border border-card-border flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-md">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
