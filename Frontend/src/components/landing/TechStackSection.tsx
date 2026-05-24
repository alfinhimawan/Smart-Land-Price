import { motion } from 'framer-motion'
import { Zap, Database, GitBranch, Layers } from 'lucide-react'

export const TechStackSection = () => {
  const techs = [
    { icon: <Zap className="w-6 h-6" />, name: 'React', desc: 'Perpustakaan UI' },
    { icon: <GitBranch className="w-6 h-6" />, name: 'TypeScript', desc: 'Keamanan Tipe' },
    { icon: <Layers className="w-6 h-6" />, name: 'Tailwind CSS', desc: 'Styling' },
    { icon: <Database className="w-6 h-6" />, name: 'Leaflet', desc: 'Pemetaan GIS' },
    { icon: <Zap className="w-6 h-6" />, name: 'Framer Motion', desc: 'Animasi' },
    { icon: <GitBranch className="w-6 h-6" />, name: 'Vite', desc: 'Alat Build' },
  ]

  return (
    <section className="py-20 px-4 bg-dark-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Modern Technology Stack</h2>
          <p className="section-subtitle">Dibangun dengan alat terkini untuk kinerja dan keandalan</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {techs.map((tech, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all group"
            >
              <div className="text-accent-cyan group-hover:text-accent-blue mb-3 transition-colors">{tech.icon}</div>
              <h3 className="font-semibold text-white text-sm text-center">{tech.name}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{tech.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
