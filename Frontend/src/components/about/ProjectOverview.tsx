import { motion } from 'framer-motion'
import { Map, Cpu, Database } from 'lucide-react'

export const ProjectOverview = () => {
  const sections = [
    {
      title: 'Project Overview',
      content:
        'Aplikasi ini dirancang sebagai sistem pengambilan keputusan berbasis spasial untuk memprediksi harga lahan di koridor pembangunan infrastruktur tol IKN. Dengan memanfaatkan teknik GIS dan metode numerik, aplikasi ini mengestimasi nilai tanah berdasarkan kedekatan lokasi terhadap titik referensi transaksi pasar.',
      icon: Map,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: 'Methodology',
      content:
        'Sistem mengimplementasikan algoritma Inverse Distance Weighted (IDW). Metode ini bekerja berdasarkan prinsip Tobler’s First Law of Geography, di mana setiap titik sampel memberikan pengaruh terhadap lokasi target dengan bobot yang berbanding terbalik terhadap kuadrat jarak.',
      icon: Cpu,
      color: "from-rose-500 to-orange-500"
    },
    {
      title: 'Data & Validasi',
      content:
        'Estimasi dilakukan berdasarkan dataset spasial harga lahan di sepanjang jaringan tol IKN. Sebelum kalkulasi, sistem melakukan data cleaning menggunakan metode Interquartile Range (IQR) untuk mengeliminasi nilai ekstrem (outlier) demi menjaga akurasi prediksi.',
      icon: Database,
      color: "from-emerald-500 to-teal-500"
    },
  ]

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto space-y-32">
        {sections.map((section, idx) => {
          const isEven = idx % 2 === 0;
          const Icon = section.icon;
          
          return (
            <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
              {/* Visual Side */}
              <motion.div 
                className="w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${section.color} p-1 animate-glow`}>
                  <div className="w-full h-full rounded-full bg-card/95 backdrop-blur-md flex items-center justify-center relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <Icon className="w-20 h-20 md:w-28 md:h-28 text-foreground/80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                  </div>
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">{section.title}</h3>
                <div className="w-20 h-1 bg-primary mb-8 rounded-full opacity-70"></div>
                <p className="text-xl text-muted-foreground leading-relaxed font-light">{section.content}</p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
