import { useState, useCallback, useMemo } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageContainer } from '@/components/layout/PageContainer'
import { InteractiveMap, MapControls } from '@/components/map'
import { PredictionCard, SamplePointsExplorer } from '@/components/prediction'
import { CoordinateInfo } from '@/components/prediction/CoordinateInfo'
import { LoadingOverlay } from '@/components/prediction/LoadingOverlay'
import { StatisticsGrid } from '@/components/prediction/StatisticsGrid'
import { Button, Card } from '@/components/ui'
import { samplePoints, iknBoundary } from '@/data/samplePoints'
import { predictPrice } from '@/services/idwService'
import { filterPointsByDistance } from '@/utils/heatmapUtils'
import { Coordinate, PredictionResult, SamplePoint } from '@/types'
import { motion } from 'framer-motion'
import { RotateCcw, Zap, Map, List } from 'lucide-react'
import { IDW_CONFIG } from '@/utils/constants'

type DashboardTab = 'map' | 'data'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('map')
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<SamplePoint | null>(null)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [idwPower, setIdwPower] = useState(IDW_CONFIG.defaultPower)
  const [radiusFilter, setRadiusFilter] = useState(IDW_CONFIG.defaultRadius)
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [distanceFilter, setDistanceFilter] = useState(2.0)

  const handleLocationSelect = useCallback((coordinate: Coordinate) => {
    setSelectedCoordinate(coordinate)
    setPredictionResult(null)
  }, [])

  const handlePointSelect = useCallback((point: SamplePoint) => {
    setSelectedPoint(point)
  }, [])

  const handlePredict = useCallback(async () => {
    if (!selectedCoordinate) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = predictPrice(selectedCoordinate, samplePoints, idwPower, radiusFilter)
    setPredictionResult(result)
    setIsLoading(false)
  }, [selectedCoordinate, idwPower, radiusFilter])

  const handleReset = useCallback(() => {
    setSelectedCoordinate(null)
    setSelectedPoint(null)
    setPredictionResult(null)
    setIdwPower(IDW_CONFIG.defaultPower)
    setRadiusFilter(IDW_CONFIG.defaultRadius)
  }, [])

  // Calculate filtered points for display
  const visiblePoints = useMemo(() => {
    return filterPointsByDistance(samplePoints, distanceFilter)
  }, [distanceFilter])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        <PageContainer>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            
            {/* Header Section */}
            <div className="mt-4 mb-10">
              <motion.h1 
                className="text-3xl font-bold text-foreground"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: {}
                }}
              >
                {"Sistem Prediksi Harga Lahan".split("").map((char, i) => (
                  <motion.span 
                    key={i} 
                    variants={{
                      visible: { opacity: 1, display: "inline-block" },
                      hidden: { opacity: 0, display: "none" }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                  <motion.span 
                    variants={{
                      visible: { visibility: "hidden", transition: { delay: 1.5 } },
                      hidden: { visibility: "visible" }
                    }}
                    className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle animate-pulse"
                  />
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-muted-foreground mt-2"
              >
                Dasbor analisis cerdas menggunakan interpolasi Inverse Distance Weighting (IDW).
              </motion.p>
            </div>

            {/* Top Statistics */}
            <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
               <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Ringkasan Area Nusantara</h3>
               <StatisticsGrid samplePoints={samplePoints} />
            </div>

            {/* Main Interactive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               
               {/* Map Area (Takes 2 columns) */}
               <Card variant="glass" className="lg:col-span-2 overflow-hidden flex flex-col p-0 shadow-md">
                 <div className="p-4 border-b border-card-border bg-card flex justify-between items-center">
                   <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                     <Map className="w-5 h-5 text-primary" /> 
                     Peta Interaktif
                   </h2>
                 </div>
                 
                 <div className="h-[500px] w-full relative z-0">
                   <InteractiveMap
                     onLocationSelect={handleLocationSelect}
                     selectedLocation={selectedCoordinate}
                     samplePoints={samplePoints}
                     regionBound={iknBoundary}
                     showHeatmap={showHeatmap}
                     radiusFilter={distanceFilter}
                   />
                   {isLoading && (
                     <div className="absolute inset-0 z-50">
                       <LoadingOverlay />
                     </div>
                   )}
                 </div>

                 {/* Map Filter Controls placed elegantly below the map */}
                 <div className="p-4 bg-card/50 border-t border-card-border backdrop-blur-md">
                    <MapControls
                      showHeatmap={showHeatmap}
                      onHeatmapToggle={setShowHeatmap}
                      radiusFilter={distanceFilter}
                      onRadiusChange={setDistanceFilter}
                      maxRadius={2.5}
                      visiblePointsCount={visiblePoints.length}
                      totalPointsCount={samplePoints.length}
                    />
                 </div>
               </Card>

               {/* Right Control Panel (Takes 1 column) */}
               <Card variant="glass" className="lg:col-span-1 shadow-md flex flex-col gap-6 p-5">
                 <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-card-border pb-3">
                   <Zap className="w-5 h-5 text-primary" /> Parameter & Prediksi
                 </h2>
                 
                 <div className="space-y-5">
                   {/* IDW Power Slider */}
                   <div className="space-y-2">
                     <div className="flex justify-between items-center">
                       <label className="text-sm font-medium text-foreground">Kekuatan (Power)</label>
                       <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{idwPower.toFixed(1)}</span>
                     </div>
                     <input
                       type="range"
                       min={IDW_CONFIG.minPower}
                       max={IDW_CONFIG.maxPower}
                       step={0.1}
                       value={idwPower}
                       onChange={(e) => setIdwPower(parseFloat(e.target.value))}
                       className="w-full accent-primary"
                     />
                   </div>

                   {/* Radius Slider */}
                   <div className="space-y-2">
                     <div className="flex justify-between items-center">
                       <label className="text-sm font-medium text-foreground">Radius Pencarian (km)</label>
                       <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{radiusFilter.toFixed(3)}</span>
                     </div>
                     <input
                       type="range"
                       min={IDW_CONFIG.minRadius}
                       max={IDW_CONFIG.maxRadius}
                       step={0.01}
                       value={radiusFilter}
                       onChange={(e) => setRadiusFilter(parseFloat(e.target.value))}
                       className="w-full accent-primary"
                     />
                   </div>
                 </div>

                 <div className="pt-4 border-t border-card-border space-y-4">
                   {selectedCoordinate ? (
                     <div className="p-3 rounded-lg bg-card border border-primary/30 shadow-sm">
                       <CoordinateInfo coordinate={selectedCoordinate} />
                     </div>
                   ) : (
                     <div className="p-6 rounded-lg border-2 border-dashed border-card-border flex flex-col items-center justify-center text-center bg-card/30 h-28">
                       <p className="text-sm text-muted-foreground">Klik koordinat pada peta untuk memulai.</p>
                     </div>
                   )}

                   <div className="flex gap-2">
                     <Button
                       variant="primary"
                       className="w-full flex-1 py-2.5"
                       disabled={!selectedCoordinate}
                       onClick={handlePredict}
                     >
                       Prediksi Harga
                     </Button>
                     <Button variant="outline" className="px-4" onClick={handleReset} aria-label="Reset">
                       <RotateCcw className="w-5 h-5" />
                     </Button>
                   </div>
                 </div>

                 {/* Results Section directly appended if available */}
                 {predictionResult && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="pt-2"
                   >
                     <div className="rounded-xl overflow-hidden border border-primary/30 shadow-lg">
                       <PredictionCard result={predictionResult} />
                     </div>
                   </motion.div>
                 )}
               </Card>
            </div>

            {/* Bottom Data Section */}
            <Card variant="glass" className="shadow-md p-6">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2 border-b border-card-border pb-3">
                <List className="w-5 h-5 text-primary" /> Data Referensi Sampel Lahan
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SamplePointsExplorer
                    points={visiblePoints}
                    onPointSelect={handlePointSelect}
                    selectedPointId={selectedPoint?.id}
                    maxDistanceFilter={distanceFilter}
                    onDistanceFilterChange={setDistanceFilter}
                  />
                </div>
                
                <div className="lg:col-span-1">
                  {selectedPoint ? (
                    <div className="p-5 rounded-xl bg-card border border-card-border shadow-sm sticky top-24">
                      <h3 className="text-base font-bold text-foreground mb-4 border-b border-card-border pb-2">Detail Titik Sampel</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1 uppercase tracking-wider">Nama Lokasi</p>
                          <p className="text-foreground font-semibold">{selectedPoint.locationName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1 uppercase tracking-wider">Harga Pasar Per Meter</p>
                          <p className="text-primary font-mono text-xl font-bold">
                            Rp {(selectedPoint.price / 1000000).toFixed(1)} jt
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-foreground/5 border border-card-border">
                          <p className="text-muted-foreground text-xs mb-1 uppercase tracking-wider">Jarak ke Akses Tol</p>
                          <p className="text-foreground font-semibold text-lg">
                            {selectedPoint.distanceToTol?.toFixed(2)} km
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1 uppercase tracking-wider">Catatan Area</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{selectedPoint.description}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl border-2 border-dashed border-card-border flex items-center justify-center text-center bg-card/30 h-full min-h-[200px]">
                      <p className="text-sm text-muted-foreground">Pilih data lahan pada senarai di samping untuk melihat detail.</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

          </div>
        </PageContainer>
      </div>
      <Footer />
    </div>
  )
}
