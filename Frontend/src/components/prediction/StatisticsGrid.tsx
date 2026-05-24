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
      variant={variant === 'highlight' ? 'gradient' : 'solid'}
      className={variant === 'highlight' ? 'border-accent-cyan/50 shadow-glow' : ''}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-lg bg-white/5">{icon}</div>
          {variant === 'highlight' && <Badge variant="info">Featured</Badge>}
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">
            {value}
            {unit && <span className="text-lg text-gray-400 ml-1">{unit}</span>}
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
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)

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
          icon={<DollarSign className="w-6 h-6 text-accent-cyan" />}
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
        <StatCard label="Titik Sampel" value={samplePoints.length} icon={<MapPin className="w-6 h-6 text-accent-blue" />} />
      </motion.div>
    </motion.div>
  )
}
