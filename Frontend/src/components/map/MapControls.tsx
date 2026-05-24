import { Layers, MapPin } from 'lucide-react'
interface MapControlsProps {
  showHeatmap: boolean
  onHeatmapToggle: (value: boolean) => void
  radiusFilter: number
  onRadiusChange: (value: number) => void
  maxRadius?: number
}

export const MapControls = ({
  showHeatmap,
  onHeatmapToggle,
  radiusFilter,
  onRadiusChange,
  maxRadius = 50.0,
}: MapControlsProps) => {

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
      {/* Heatmap Toggle */}
      <div className="flex flex-1 items-center gap-4 w-full bg-card/40 hover:bg-card/60 transition-colors p-3.5 rounded-xl border border-card-border shadow-sm">
         <div className="p-2.5 rounded-lg bg-primary/10">
           <Layers className="w-5 h-5 text-primary" />
         </div>
         <div className="flex-1">
           <h3 className="font-bold text-foreground text-sm leading-none mb-1.5">Visualisasi Heatmap</h3>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
             <div className="w-2 h-2 rounded-full bg-amber-500" />
             <div className="w-2 h-2 rounded-full bg-red-500" />
             <p className="text-[10px] text-muted-foreground leading-none uppercase tracking-wider ml-1">Zona Harga</p>
           </div>
         </div>
         <button
            onClick={() => onHeatmapToggle(!showHeatmap)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
              showHeatmap ? 'bg-primary' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                showHeatmap ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
      </div>

      {/* Distance Filter Toolbar */}
      <div className="flex flex-1 items-center gap-4 w-full bg-card/40 hover:bg-card/60 transition-colors p-3.5 rounded-xl border border-card-border shadow-sm">
        <div className="p-2.5 rounded-lg bg-primary/10">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-bold text-foreground text-sm leading-none mb-1.5">Saringan Tampilan Peta</h3>
              <p className="text-[10px] text-muted-foreground leading-none uppercase tracking-wider">Jarak Maksimal dari Tol</p>
            </div>
            <span className="text-xs font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">{radiusFilter.toFixed(1)} km</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={maxRadius}
            step={0.1}
            value={radiusFilter}
            onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
          />
        </div>
      </div>
    </div>
  )
}
