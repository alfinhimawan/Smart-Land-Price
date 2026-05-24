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
      className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
    >
      <Card
        variant={isSelected ? 'gradient' : 'solid'}
        className={`space-y-3 ${isSelected ? 'border-primary/50' : 'border-card-border'}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">{point.locationName || `Point ${point.id}`}</h3>
            <p className="text-xs text-muted-foreground">{point.description}</p>
          </div>
          {isSelected && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary">
              Terpilih
            </span>
          )}
        </div>

        {/* Price */}
        <div className="py-2 px-3 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-xs text-muted-foreground mb-1">Harga</p>
          <p className="text-lg font-bold text-primary font-mono">{formatCurrency(point.price)}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Latitude */}
          <div className="p-2 rounded-lg bg-foreground/5 border border-card-border">
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3" />
              Lintang
            </p>
            <p className="text-sm font-mono text-foreground">{point.lat.toFixed(4)}</p>
          </div>

          {/* Longitude */}
          <div className="p-2 rounded-lg bg-foreground/5 border border-card-border">
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <Navigation className="w-3 h-3" />
              Bujur
            </p>
            <p className="text-sm font-mono text-foreground">{point.lng.toFixed(4)}</p>
          </div>

          {/* Distance to Toll */}
          <div className="p-2 rounded-lg bg-foreground/5 border border-card-border">
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <Smartphone className="w-3 h-3" />
              Jarak ke Tol
            </p>
            <p className="text-sm font-semibold text-amber-400">{point.distanceToTol?.toFixed(2)} km</p>
          </div>

          {/* ID */}
          <div className="p-2 rounded-lg bg-foreground/5 border border-card-border">
            <p className="text-xs text-muted-foreground mb-1">ID Tanah</p>
            <p className="text-sm font-mono text-muted-foreground">{point.id}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
