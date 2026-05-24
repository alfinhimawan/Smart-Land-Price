import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PredictionResult } from '@/types'
import { Card, Badge, Button } from '@/components/ui'
import { TrendingUp, Zap, MapPin, Download, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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
    if (!cardRef.current) return
    
    try {
      setIsExporting(true)
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#0a0a0f', // Match dark theme bg
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Laporan-Prediksi-IDW-${new Date().getTime()}.pdf`)
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
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 border-primary/50 text-primary hover:bg-primary/10"
          onClick={exportToPDF}
          disabled={isExporting}
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isExporting ? 'Memproses PDF...' : 'Cetak Laporan PDF'}
        </Button>
      </div>
      <motion.div
        ref={cardRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 p-4 -mx-4 sm:mx-0 sm:p-0 rounded-xl"
      >
      {/* Main Result Card */}
      <motion.div variants={itemVariants}>
        <Card variant="gradient" className="border-2 border-primary/50 shadow-glow">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Harga Tanah Prediksi</h3>
              <Badge variant="success">Selesai</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Harga Estimasi</p>
              <p className="text-4xl font-bold gradient-text">{formatPrice(result.predictedPrice)}</p>
            </div>

            <div className="pt-4 border-t border-card-border">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-warning" />
                <span className="text-muted-foreground">
                  Level Kepercayaan: <span className="text-primary font-semibold">{result.confidence}%</span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Info Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        {/* Coordinates */}
        <Card>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground">Koordinat</p>
            </div>
            <p className="text-sm font-mono text-foreground">
              {result.coordinates.lat.toFixed(4)}, {result.coordinates.lng.toFixed(4)}
            </p>
          </div>
        </Card>

        {/* Method */}
        <Card>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground">Metode</p>
            </div>
            <p className="text-sm font-mono text-foreground">IDW (p={result.powerUsed})</p>
          </div>
        </Card>
      </motion.div>
      {/* Nearest Points */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Titik Sampel Terdekat</h4>
            <div className="space-y-2">
              {result.nearestPoints.slice(0, 3).map((point) => (
                <div key={point.id} className="flex items-center justify-between py-2 border-b border-card-border last:border-0">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Titik #{point.id}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(point.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-primary">
                      {((point.weight ?? 0) * 100).toFixed(0)}% bobot
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* IDW Formula Info */}
      <motion.div variants={itemVariants}>
        <Card variant="solid" className="text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Z(x₀) = Σ(Zᵢ/dᵢ²) / Σ(1/dᵢ²)
          </p>
        </Card>
      </motion.div>
    </motion.div>
    </div>
  )
}
