import { motion } from 'framer-motion'
import { Card, Slider } from '@/components/ui'
import { Zap, Layers, MapPin } from 'lucide-react'

interface MapControlsProps {
  showHeatmap: boolean
  onHeatmapToggle: (value: boolean) => void
  radiusFilter: number
  onRadiusChange: (value: number) => void
  maxRadius?: number
  visiblePointsCount?: number
  totalPointsCount?: number
}

export const MapControls = ({
  showHeatmap,
  onHeatmapToggle,
  radiusFilter,
  onRadiusChange,
  maxRadius = 2.5,
  visiblePointsCount = 0,
  totalPointsCount = 0,
}: MapControlsProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      {/* Heatmap Toggle */}
      <motion.div variants={itemVariants}>
        <Card variant="glass" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-cyan/20">
                <Layers className="w-5 h-5 text-accent-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Visualisasi Heatmap</h3>
                <p className="text-xs text-gray-400">Zona harga tematik</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onHeatmapToggle(!showHeatmap)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                showHeatmap ? 'bg-accent-cyan' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  showHeatmap ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-gray-300">{showHeatmap ? 'Aktif' : 'Tidak Aktif'}</span>
          </div>

          {showHeatmap && (
              <div className="pt-3 border-t border-white/10">
              <div className="space-y-3">
                <p className="text-xs text-gray-400 font-mono">Skala Harga:</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-gray-300">Rendah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600" />
                    <span className="text-gray-300">Tinggi</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Distance Filter */}
      <motion.div variants={itemVariants}>
        <Card variant="glass" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-blue/20">
              <MapPin className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Jarak ke Tol</h3>
              <p className="text-xs text-gray-400">Filter dengan jarak maksimal</p>
            </div>
          </div>

          <div className="space-y-3">
            <Slider
              label={`Radius: ${radiusFilter.toFixed(2)} km`}
              value={radiusFilter}
              min={0.1}
              max={maxRadius}
              step={0.1}
              onChange={onRadiusChange}
            />

            {totalPointsCount > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400">Penanda Aktif</p>
                  <p className="text-lg font-semibold text-accent-blue">{visiblePointsCount}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400">Total Data</p>
                  <p className="text-lg font-semibold text-accent-cyan">{totalPointsCount}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Info Card */}
      <motion.div variants={itemVariants}>
        <Card variant="glass" className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-warning" />
            <p className="text-xs font-semibold text-gray-400">Tips</p>
          </div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex gap-2">
              <span className="text-accent-cyan">•</span>
            <span>Klik di area peta kosong untuk prediksi harga</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-cyan">•</span>
              <span>Gunakan slider untuk memfilter penanda berdasarkan jarak</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-cyan">•</span>
              <span>Aktifkan heatmap untuk visualisasi zona harga</span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  )
}
