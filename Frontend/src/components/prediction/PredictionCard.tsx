import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PredictionResult } from '@/types'
import { Button } from '@/components/ui'
import { TrendingUp, Zap, MapPin, Download, Loader2 } from 'lucide-react'
import { generatePdfReport } from '@/utils/generatePdfReport'

interface PredictionCardProps {
  result: PredictionResult
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export const PredictionCard = ({ result }: PredictionCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    try {
      setIsExporting(true)
      // Jeda kecil agar state loading muncul (karena PDF generation itu synchronous & blocking)
      await new Promise((resolve) => setTimeout(resolve, 100))
      
      generatePdfReport(result)
    } catch (error) {
      console.error('Failed to generate PDF', error)
    } finally {
      setIsExporting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 flex flex-col" 
      ref={cardRef}
    >
      {/* Main Result Card */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-xl bg-card border border-primary/20 shadow-lg p-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-card-border/50">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Hasil Prediksi Harga</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <p className="text-xs text-muted-foreground mb-1">Estimasi Nilai Pasar</p>
              <div className="flex items-end gap-1">
                <p className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.2)] tracking-tight">
                  {formatPrice(result.predictedPrice)}
                </p>
                <span className="text-sm font-bold text-muted-foreground mb-1.5">/m²</span>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-3 space-y-2 border border-card-border/50">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">Tingkat Kepercayaan (IDW)</span>
                <span className="text-xs font-bold text-primary">{result.confidence}%</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-card border border-card-border shadow-sm flex flex-col items-center text-center">
          <MapPin className="w-4 h-4 text-muted-foreground mb-1" />
          <p className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Koordinat Target</p>
          <p className="text-xs font-mono font-semibold text-foreground">
            {result.coordinates.lat.toFixed(4)}, {result.coordinates.lng.toFixed(4)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-card border border-card-border shadow-sm flex flex-col items-center text-center">
          <TrendingUp className="w-4 h-4 text-muted-foreground mb-1" />
          <p className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Parameter P</p>
          <p className="text-xs font-mono font-semibold text-foreground">
            {result.powerUsed}
          </p>
        </div>
      </motion.div>

      {/* Nearest Points */}
      <motion.div variants={itemVariants}>
        <div className="p-4 rounded-xl bg-card border border-card-border shadow-sm">
          <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Referensi Titik Terdekat</h4>
          <div className="space-y-3">
            {result.nearestPoints.slice(0, 3).map((point, index) => {
              const weightPercent = (point.weight ?? 0) * 100;
              return (
                <div key={point.id} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">#{point.id}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{formatPrice(point.price)}/m²</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {weightPercent.toFixed(1)}% bobot
                    </span>
                  </div>
                  <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${weightPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.1 + (index * 0.1) }}
                      className="h-full bg-primary/60 rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="pt-2">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary transition-all py-5 border-dashed"
          onClick={exportToPDF}
          disabled={isExporting}
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isExporting ? 'Menyimpan Laporan...' : 'Unduh Laporan Prediksi (PDF)'}
        </Button>
      </motion.div>
    </motion.div>
  )
}
