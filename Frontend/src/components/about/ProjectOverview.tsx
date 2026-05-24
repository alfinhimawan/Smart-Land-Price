import { motion } from 'framer-motion'
import { Card } from '@/components/ui'

export const ProjectOverview = () => {
  const sections = [
    {
      title: 'Purpose',
      content:
        'Aplikasi ini mendemonstrasikan prediksi spasial tingkat lanjut untuk harga tanah di sekitar jalur tol IKN. Menggunakan teknik GIS canggih untuk memperkirakan nilai tanah berdasarkan kedekatan lokasi ke rute tol dan interpolasi dari titik referensi.',
    },
    {
      title: 'Methodology',
      content:
        'Sistem ini menggunakan interpolasi Inverse Distance Weighted (IDW) untuk memprediksi harga tanah berdasarkan titik sampel. Metode ini memberikan bobot yang berbanding terbalik dengan jarak, berarti titik yang lebih dekat memiliki pengaruh lebih besar pada prediksi. Parameter kekuatan mengontrol seberapa kuat jarak mempengaruhi bobot.',
    },
    {
      title: 'Data',
      content:
        'Aplikasi ini menggunakan 15 titik data sampel yang mewakili harga tanah di berbagai lokasi di sekitar jaringan tol IKN. Semua data adalah untuk tujuan demonstrasi. Anda dapat menyediakan dataset Anda sendiri untuk prediksi yang disesuaikan.',
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-center mb-16">Project Overview</h2>

          <div className="space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card variant="glass">
                  <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
