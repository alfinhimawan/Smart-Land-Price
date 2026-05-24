import { motion } from 'framer-motion'
import { Card, Slider } from '@/components/ui'
import { SamplePoint } from '@/types'
import { SamplePointDetails } from './SamplePointDetails'
import { List } from 'lucide-react'

interface SamplePointsExplorerProps {
  points: SamplePoint[]
  onPointSelect?: (point: SamplePoint) => void
  selectedPointId?: string
  maxDistanceFilter?: number
  onDistanceFilterChange?: (distance: number) => void
}

export const SamplePointsExplorer = ({
  points,
  onPointSelect,
  selectedPointId,
  maxDistanceFilter = 2.5,
  onDistanceFilterChange,
}: SamplePointsExplorerProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Data Tanah</h2>
        <span className="text-xs text-muted-foreground bg-foreground/10 px-2 py-1 rounded-full">{points.length} titik</span>
      </div>

      {/* Distance Filter */}
      {onDistanceFilterChange && (
        <Card variant="glass" className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">Filter Jarak ke Tol</label>
            <span className="text-xs text-primary font-mono">{maxDistanceFilter.toFixed(2)} km</span>
          </div>
          <Slider
            label=""
            value={maxDistanceFilter}
            min={0.1}
            max={2.5}
            step={0.1}
            onChange={onDistanceFilterChange}
          />
        </Card>
      )}

      {/* Points List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {points.length > 0 ? (
          points.map((point) => (
            <motion.div key={point.id} variants={itemVariants}>
              <SamplePointDetails
                point={point}
                isSelected={selectedPointId === point.id}
                onClick={() => onPointSelect?.(point)}
              />
            </motion.div>
          ))
        ) : (
          <Card variant="glass" className="py-8 text-center">
            <p className="text-sm text-muted-foreground">Tidak ada data yang cocok dengan filter saat ini</p>
          </Card>
        )}
      </div>

      {/* Stats */}
      <Card variant="glass" className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-foreground/5 border border-card-border">
          <p className="text-xs text-muted-foreground">Total Data</p>
          <p className="text-2xl font-bold text-primary">{points.length}</p>
        </div>
        <div className="p-3 rounded-lg bg-foreground/5 border border-card-border">
          <p className="text-xs text-muted-foreground">Harga Rata-rata</p>
          <p className="text-2xl font-bold text-primary">
            {((points.reduce((sum, p) => sum + p.price, 0) / points.length) / 1000000).toFixed(1)}jt
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
