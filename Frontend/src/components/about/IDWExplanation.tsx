import { motion } from 'framer-motion'

export const IDWExplanation = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-12">
            {/* Formula */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-card-border rounded-lg p-8 text-center"
            >
              <p className="text-muted-foreground text-sm mb-4">Rumus IDW (Inverse Distance Weighted)</p>
              <p className="text-3xl font-mono text-primary font-bold">
                Z(x₀) = Σ(Zᵢ/dᵢᵖ) / Σ(1/dᵢᵖ)
              </p>
              <p className="text-muted-foreground text-xs mt-4">Di mana p adalah parameter kekuatan yang mengontrol pengaruh jarak</p>
            </motion.div>

            {/* Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-foreground mb-4">Apa itu IDW?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Inverse Distance Weighted (IDW) adalah metode interpolasi spasial yang memperkirakan nilai di lokasi yang tidak terukur berdasarkan nilai dari titik yang diukur di dekatnya. Pengaruh dari titik yang dikenal berkurang seiring dengan jarak. Ini banyak digunakan dalam GIS untuk prediksi harga tanah, pemodelan elevasi, dan analisis lingkungan.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-foreground mb-4">Parameter Kekuatan (p)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Parameter kekuatan mengontrol pengaruh jarak pada bobot prediksi. Nilai yang lebih tinggi (misalnya, p=3) memberi bobot lebih kepada titik yang lebih dekat dan kurang pada yang jauh. Nilai yang lebih rendah (misalnya, p=1) mendistribusikan bobot lebih merata. Default adalah p=2 untuk prediksi seimbang di sekitar jaringan tol IKN.
                </p>
              </motion.div>
            </div>

            {/* Key Variables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card border border-card-border rounded-lg p-8"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Komponen Rumus</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-primary mb-2">Z(x₀)</p>
                  <p className="text-muted-foreground text-sm">Nilai prediksi di lokasi x₀</p>
                </div>
                <div>
                  <p className="font-mono text-primary mb-2">Zᵢ</p>
                  <p className="text-muted-foreground text-sm">Nilai yang dikenal di titik sampel i</p>
                </div>
                <div>
                  <p className="font-mono text-primary mb-2">dᵢ</p>
                  <p className="text-muted-foreground text-sm">Jarak antara x₀ dan titik sampel i</p>
                </div>
                <div>
                  <p className="font-mono text-primary mb-2">p</p>
                  <p className="text-muted-foreground text-sm">Parameter kekuatan (default: 2)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
