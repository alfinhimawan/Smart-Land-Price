import { motion } from 'framer-motion'
import { Coordinate } from '@/types'
import { Card } from '@/components/ui'
import { MapPin, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CoordinateInfoProps {
  coordinate: Coordinate
}

export const CoordinateInfo = ({ coordinate }: CoordinateInfoProps) => {
  const [copied, setCopied] = useState(false)

  const coordString = `${coordinate.lat.toFixed(6)}, ${coordinate.lng.toFixed(6)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(coordString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-primary/30">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Lokasi Terpilih</h3>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Lintang</p>
            <p className="font-mono text-sm text-primary font-semibold">{coordinate.lat.toFixed(6)}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Bujur</p>
            <p className="font-mono text-sm text-primary font-semibold">{coordinate.lng.toFixed(6)}</p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm text-muted-foreground"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Coordinates
              </>
            )}
          </button>
        </div>
      </Card>
    </motion.div>
  )
}
