import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { SamplePoint } from '@/types'
import { formatCurrency } from '@/services/idwService'
import { MapPin, Smartphone, Navigation } from 'lucide-react'

interface SamplePointDetailsProps {
  point: SamplePoint
  isSelected?: boolean
  onClick?: () => void
}

export const SamplePointDetails = ({ point, isSelected = false, onClick }: SamplePointDetailsProps) => {
  return (
    <motion.div
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      onClick={onClick}
      className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-accent-cyan' : ''}`}
    >
      <Card
        variant={isSelected ? 'gradient' : 'solid'}
        className={`space-y-3 ${isSelected ? 'border-accent-cyan/50' : 'border-white/10'}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm">{point.locationName || `Point ${point.id}`}</h3>
            <p className="text-xs text-gray-400">{point.description}</p>
          </div>
          {isSelected && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan">
              Terpilih
            </span>
          )}
        </div>

        {/* Price */}
        <div className="py-2 px-3 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
          <p className="text-xs text-gray-400 mb-1">Harga</p>
          <p className="text-lg font-bold text-accent-cyan font-mono">{formatCurrency(point.price)}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Latitude */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3" />
              Lintang
            </p>
            <p className="text-sm font-mono text-white">{point.lat.toFixed(4)}</p>
          </div>

          {/* Longitude */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
              <Navigation className="w-3 h-3" />
              Bujur
            </p>
            <p className="text-sm font-mono text-white">{point.lng.toFixed(4)}</p>
          </div>

          {/* Distance to Toll */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
              <Smartphone className="w-3 h-3" />
              Jarak ke Tol
            </p>
            <p className="text-sm font-semibold text-amber-400">{point.distanceToTol?.toFixed(2)} km</p>
          </div>

          {/* ID */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-gray-500 mb-1">ID Tanah</p>
            <p className="text-sm font-mono text-gray-300">{point.id}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
