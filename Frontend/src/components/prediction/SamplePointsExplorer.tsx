import { motion } from 'framer-motion'
import { SamplePoint } from '@/types'
import { List } from 'lucide-react'

interface SamplePointsExplorerProps {
  points: SamplePoint[]
  onPointSelect?: (point: SamplePoint) => void
  selectedPointId?: string
}

export const SamplePointsExplorer = ({
  points,
  onPointSelect,
  selectedPointId,
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
      {/* Points Table */}
      <div className="max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent rounded-xl border border-card-border bg-card/40 shadow-inner">
        {points.length > 0 ? (
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs uppercase bg-card/90 text-muted-foreground border-b border-card-border sticky top-0 backdrop-blur-xl z-10 shadow-sm">
              <tr>
                <th className="px-5 py-4 font-semibold tracking-wider text-left w-16">ID</th>
                <th className="px-5 py-4 font-semibold tracking-wider text-left">Nama Lokasi</th>
                <th className="px-5 py-4 font-semibold tracking-wider text-center w-32">Jarak Tol</th>
                <th className="px-5 py-4 font-semibold tracking-wider text-right w-40">Harga Pasar / m²</th>
                <th className="px-5 py-4 font-semibold tracking-wider text-left w-40">Koordinat</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => {
                const isSelected = selectedPointId === point.id;
                return (
                  <motion.tr 
                    key={point.id} 
                    variants={itemVariants}
                    className={`group border-b border-card-border/40 cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-primary/20 to-transparent relative after:absolute after:inset-y-0 after:left-0 after:w-1 after:bg-primary after:shadow-[0_0_12px_#00D1FF]' 
                        : 'hover:bg-foreground/5'
                    }`}
                    onClick={() => onPointSelect?.(point)}
                  >
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground text-left group-hover:text-foreground/70 transition-colors">
                      {point.id}
                    </td>
                    <td className={`px-5 py-4 font-medium text-left transition-colors ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {point.locationName}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm ${
                        point.distanceToTol && point.distanceToTol <= 3.0 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {point.distanceToTol?.toFixed(2)} km
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={`font-mono font-bold text-lg transition-colors ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        Rp {(point.price / 1000000).toFixed(1)} <span className="text-xs font-normal text-muted-foreground ml-1">jt</span>
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-[10px] text-left text-muted-foreground tracking-wider group-hover:text-foreground/70 transition-colors">
                      {point.lat.toFixed(4)},<br/>{point.lng.toFixed(4)}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-card-border/50 flex items-center justify-center">
              <List className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Tidak ada data yang cocok dengan filter saat ini</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-card to-card/40 border border-card-border shadow-sm flex items-center justify-between group hover:border-primary/40 transition-colors">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Data</p>
            <p className="text-3xl font-black text-foreground drop-shadow-sm">{points.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
            <List className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-card to-card/40 border border-card-border shadow-sm flex items-center justify-between group hover:border-emerald-500/40 transition-colors">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Harga Rata-rata</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-black text-foreground drop-shadow-sm">
                {points.length > 0 ? ((points.reduce((sum, p) => sum + p.price, 0) / points.length) / 1000000).toFixed(1) : '0'}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">jt / m²</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
            <span className="text-emerald-500 font-black text-xl">Rp</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
