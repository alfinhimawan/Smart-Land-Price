import { motion } from 'framer-motion'
import { idwFormulaBase64 } from '@/utils/idwFormulaBase64'

export const IDWExplanation = () => {
  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Mekanika <span className="text-primary">IDW</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full opacity-70"></div>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Memahami logika matematika di balik prediksi harga lahan spasial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            
            {/* Bento 1: Formula (Spans 2 columns on desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 row-span-1 card-glass p-8 md:p-12 relative overflow-hidden group flex flex-col justify-center items-center"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />
              <p className="text-muted-foreground text-sm mb-8 font-semibold uppercase tracking-wider relative z-10">Rumus Matematis IDW</p>
              
              {/* Levitating Formula */}
              <div className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-xl shadow-primary/10 animate-float relative z-10 border border-white/20">
                <img src={idwFormulaBase64} alt="Rumus IDW" className="h-16 md:h-24 object-contain mx-auto" />
              </div>
            </motion.div>

            {/* Bento 2: Apa itu IDW? */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-1 row-span-1 card-glass p-8 relative overflow-hidden group flex flex-col justify-center"
            >
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors duration-700" />
              <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">Apa itu IDW?</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">
                Teknik interpolasi deterministik yang mengasumsikan bahwa nilai di lokasi yang tidak terukur merupakan rata-rata tertimbang dari nilai-nilai di titik sampel terdekat. Semakin dekat sebuah sampel, semakin dominan pengaruhnya.
              </p>
            </motion.div>

            {/* Bento 3: Parameter p */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-3 row-span-1 card-glass p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="md:col-span-1 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-foreground mb-4">Parameter <span className="text-primary">Kekuatan (p)</span></h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Sensitivitas jarak terhadap bobot. Mengontrol seberapa drastis pengaruh titik data menurun seiring bertambahnya jarak.
                  </p>
                </div>
                
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-background/50 border border-card-border p-6 rounded-xl hover:border-primary/50 transition-colors shadow-sm">
                    <div className="text-2xl font-black text-primary mb-2">p = 2</div>
                    <div className="text-sm text-foreground font-semibold mb-1">Default Ideal</div>
                    <p className="text-sm text-muted-foreground">Keseimbangan sempurna antara titik terdekat dan titik yang sedikit lebih jauh.</p>
                  </div>
                  
                  <div className="bg-background/50 border border-card-border p-6 rounded-xl hover:border-secondary/50 transition-colors shadow-sm">
                    <div className="text-2xl font-black text-secondary mb-2">p &gt; 2</div>
                    <div className="text-sm text-foreground font-semibold mb-1">Sangat Lokal</div>
                    <p className="text-sm text-muted-foreground">Prediksi hanya sangat dipengaruhi oleh titik sampel yang paling dekat.</p>
                  </div>
                  
                  <div className="bg-background/50 border border-card-border p-6 rounded-xl hover:border-emerald-500/50 transition-colors shadow-sm sm:col-span-2">
                    <div className="text-2xl font-black text-emerald-500 mb-2">p &lt; 2</div>
                    <div className="text-sm text-foreground font-semibold mb-1">Global & Merata</div>
                    <p className="text-sm text-muted-foreground">Distribusi pengaruh lebih merata hingga ke titik-titik yang lebih jauh, menghaluskan fluktuasi lokal.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}
