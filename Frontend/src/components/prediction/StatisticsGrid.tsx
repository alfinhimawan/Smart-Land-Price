import { motion } from 'framer-motion'
import { SamplePoint } from '@/types'
import { Card, Badge } from '@/components/ui'
import { DollarSign, MapPin, TrendingUp } from 'lucide-react'

interface StatisticsCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  unit?: string
  variant?: 'default' | 'highlight'
}

const StatCard = ({ label, value, icon, unit, variant = 'default' }: StatisticsCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
  >
    <Card
      variant="glass"
      className={variant === 'highlight' ? 'border-primary/30 bg-primary/5' : ''}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-lg bg-primary/10">{icon}</div>
          {variant === 'highlight' && <Badge variant="info">Featured</Badge>}
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl font-bold text-foreground">
            {value}
            {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </Card>
  </motion.div>
)

interface StatisticsGridProps {
  samplePoints: SamplePoint[]
}

export const StatisticsGrid = ({ samplePoints }: StatisticsGridProps) => {
  const prices = samplePoints.map((p) => p.price)
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(price)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <motion.div variants={itemVariants}>
        <StatCard
          label="Harga Rata-rata"
          value={formatPrice(avgPrice)}
          icon={<DollarSign className="w-6 h-6 text-primary" />}
          variant="highlight"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          label="Harga Tertinggi"
          value={formatPrice(maxPrice)}
          icon={<TrendingUp className="w-6 h-6 text-success" />}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          label="Harga Terendah"
          value={formatPrice(minPrice)}
          icon={<TrendingUp className="w-6 h-6 text-warning" style={{ transform: 'scaleY(-1)' }} />}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard label="Titik Sampel" value={samplePoints.length} icon={<MapPin className="w-6 h-6 text-primary" />} />
      </motion.div>
    </motion.div>
  )
}
