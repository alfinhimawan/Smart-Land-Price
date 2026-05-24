import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageContainer } from '@/components/layout/PageContainer'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui'

export default function ValidationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageContainer className="pt-32 pb-20">
        {/* Page Title */}
        <div className="max-w-4xl mx-auto text-center mb-16 px-4">
          <motion.h1 
            className="section-title"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {"Validation & Verification".split("").map((char, i) => (
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
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="section-subtitle mx-auto"
          >
            Validasi akademis terhadap akurasi kalkulasi interpolasi spasial IDW
          </motion.p>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="space-y-8">
            {/* Manual Calculation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contoh Perhitungan Manual</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Sebagai bentuk transparansi dan validasi, berikut adalah simulasi perhitungan IDW secara manual berdasarkan 3 sampel terdekat dari dataset asli IKN:
                  </p>

                  <div className="bg-card p-4 rounded-lg font-mono text-sm space-y-2">
                    <p className="text-primary">Target: Memprediksi harga pada koordinat (−1.036092, 116.977386)</p>
                    <p className="text-muted-foreground">
                      Titik sampel terdekat beserta jarak (km) dan harga per meternya:
                    </p>
                    <p>Titik 1: Jarak = 1.96 km, Harga = Rp 8.870.000 (Kec. Samboja - Kawasan Perumahan)</p>
                    <p>Titik 2: Jarak = 2.00 km, Harga = Rp 9.710.000 (Hutan Lindung Samboja)</p>
                    <p>Titik 3: Jarak = 2.41 km, Harga = Rp 10.280.000 (Km 38 Samboja)</p>
                  </div>

                  <p>
                    Menggunakan formula Inverse Distance Weighting dengan nilai pangkat (p) = 2:
                  </p>

                  <div className="bg-card p-4 rounded-lg font-mono text-sm text-primary">
                    <p>Bobot₁ = 1 / (1.96)² = 0.2603</p>
                    <p>Bobot₂ = 1 / (2.00)² = 0.2500</p>
                    <p>Bobot₃ = 1 / (2.41)² = 0.1722</p>
                    <p className="text-foreground mt-2">
                      Z = (0.2603×8.870.000 + 0.2500×9.710.000 + 0.1722×10.280.000) / (0.2603 + 0.2500 + 0.1722)
                    </p>
                    <p className="text-success font-bold mt-1">Hasil: ≈ Rp 9.533.446 / m²</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Accuracy Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card variant="glass">
                <h2 className="text-2xl font-bold text-foreground mb-6">Metrik Akurasi LOOCV</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Mean Absolute Error (MAE)</p>
                    <p className="text-3xl font-bold gradient-text">±Rp 1.6M</p>
                    <p className="text-xs text-muted-foreground">Penyimpangan absolut rata-rata: Rp 1.604.408</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Root Mean Square Error (RMSE)</p>
                    <p className="text-3xl font-bold text-primary">±Rp 3.1M</p>
                    <p className="text-xs text-muted-foreground">Nilai standar error prediksi: Rp 3.187.199</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Coefficient of Determination (R²)</p>
                    <p className="text-3xl font-bold text-emerald-500">0.24</p>
                    <p className="text-xs text-muted-foreground">Mampu menjelaskan 24% variasi (wajar pada set spasial kecil)</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Methodology Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card variant="glass">
                <h2 className="text-2xl font-bold text-foreground mb-6">Metodologi Validasi</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Leave-One-Out Cross-Validation (LOOCV)</h3>
                    <p>
                      Sistem mengevaluasi performa menggunakan pendekatan LOOCV terhadap keseluruhan dataset. Secara bergiliran, setiap titik sampel tunggal dieksklusi sementara sisa titik digunakan untuk memprediksi harga pada titik yang hilang tersebut.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Penanganan Pencilan (Outlier)</h3>
                    <p>
                      Sebelum interpolasi dilakukan, metode *Interquartile Range (IQR)* diterapkan secara ketat untuk menyingkirkan harga ekstrem yang dapat membiasakan pembobotan jarak.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Metrik Jarak Geosfer</h3>
                    <p>
                      Perhitungan jarak geografis menggunakan formula haversine yang memperhitungkan lengkungan bumi untuk menjamin akurasi radius pencarian.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </PageContainer>

      <Footer />
    </div>
  )
}
