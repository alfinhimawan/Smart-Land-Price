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
    <div className="min-h-screen bg-dark-950 flex flex-col">
      <Navbar />

      <div className="flex-1 pt-16 pb-20">
        <PageContainer className="h-full">
          <div className="max-w-7xl mx-auto h-full px-4 py-8">
            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <StatisticsGrid samplePoints={samplePoints} />
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-6 flex gap-2 border-b border-white/10"
            >
              <button
                onClick={() => setActiveTab('map')}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                  activeTab === 'map'
                    ? 'text-accent-cyan border-accent-cyan'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                <Map className="w-4 h-4" />
                Peta Interaktif
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                  activeTab === 'data'
                    ? 'text-accent-cyan border-accent-cyan'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
                Penjelajahi Data
              </button>
            </motion.div>

            {/* Main Content */}
            {activeTab === 'map' ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                {/* Sidebar - Controls and Map Filters */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="space-y-6"
                >
                  {/* Map Controls */}
                  <MapControls
                    showHeatmap={showHeatmap}
                    onHeatmapToggle={setShowHeatmap}
                    radiusFilter={distanceFilter}
                    onRadiusChange={setDistanceFilter}
                    maxRadius={2.5}
                    visiblePointsCount={visiblePoints.length}
                    totalPointsCount={samplePoints.length}
                  />

                  {/* Prediction Controls */}
                  <Card variant="glass" className="space-y-6 sticky top-20">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">Pengaturan Prediksi</h3>
                    </div>

                    {/* IDW Power Info */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-white">Kekuatan IDW</label>
                        <span className="text-xs font-mono text-accent-cyan">{idwPower.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min={IDW_CONFIG.minPower}
                        max={IDW_CONFIG.maxPower}
                        step={0.1}
                        value={idwPower}
                        onChange={(e) => setIdwPower(parseFloat(e.target.value))}
                        className="w-full accent-accent-cyan"
                      />
                      <p className="text-xs text-gray-400">Nilai lebih tinggi = titik terdekat berpengaruh lebih besar</p>
                    </div>

                    {/* Radius Info */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-white">Radius Pencarian (km)</label>
                        <span className="text-xs font-mono text-accent-cyan">{radiusFilter.toFixed(3)}</span>
                      </div>
                      <input
                        type="range"
                        min={IDW_CONFIG.minRadius}
                        max={IDW_CONFIG.maxRadius}
                        step={0.01}
                        value={radiusFilter}
                        onChange={(e) => setRadiusFilter(parseFloat(e.target.value))}
                        className="w-full accent-accent-cyan"
                      />
                      <p className="text-xs text-gray-400">Rentang pencarian untuk titik sampel</p>
                    </div>

                    {/* Current Selection */}
                    {selectedCoordinate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30"
                      >
                        <CoordinateInfo coordinate={selectedCoordinate} />
                      </motion.div>
                    )}

                    {/* Buttons */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <Button
                        variant="primary"
                        className="w-full"
                        disabled={!selectedCoordinate}
                        onClick={handlePredict}
                      >
                        <Zap className="w-4 h-4" />
                        Prediksi Harga
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500 text-center pt-4 border-t border-white/10">
                      Klik pada peta untuk memilih lokasi untuk prediksi
                    </p>
                  </Card>
                </motion.div>

                {/* Map and Results */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="lg:col-span-3 space-y-6"
                >
                  {/* Map Container */}
                  <Card variant="solid" className="h-96 lg:h-[600px] overflow-hidden p-0">
                    <InteractiveMap
                      onLocationSelect={handleLocationSelect}
                      selectedLocation={selectedCoordinate}
                      samplePoints={samplePoints}
                      regionBound={iknBoundary}
                      showHeatmap={showHeatmap}
                      radiusFilter={distanceFilter}
                    />
                  </Card>

                  {/* Prediction Results */}
                  {predictionResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PredictionCard result={predictionResult} />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Data Explorer Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="lg:col-span-3"
                >
                  <SamplePointsExplorer
                    points={visiblePoints}
                    onPointSelect={handlePointSelect}
                    selectedPointId={selectedPoint?.id}
                    maxDistanceFilter={distanceFilter}
                    onDistanceFilterChange={setDistanceFilter}
                  />
                </motion.div>

                {/* Data Details Sidebar */}
                {selectedPoint && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="lg:col-span-1"
                  >
                    <Card variant="glass" className="space-y-4 sticky top-20">
                      <h3 className="text-lg font-bold text-white">Detail Lahan</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Nama Lokasi</p>
                          <p className="text-white font-semibold">{selectedPoint.locationName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Harga Per Meter</p>
                          <p className="text-accent-cyan font-mono text-lg">
                            Rp {(selectedPoint.price / 1000000).toFixed(1)}jt
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-gray-400 text-xs mb-2">Jarak ke Tol</p>
                          <p className="text-accent-blue font-semibold text-lg">
                            {selectedPoint.distanceToTol?.toFixed(2)} km
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Deskripsi</p>
                          <p className="text-gray-300 text-xs leading-relaxed">{selectedPoint.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Loading Overlay */}
          {isLoading && <LoadingOverlay />}
        </PageContainer>
      </div>

      <Footer />
    </div>
  )
}
