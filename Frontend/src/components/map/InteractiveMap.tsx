import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, CircleMarker, useMapEvents } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

import { SamplePoint, Coordinate } from '@/types'
import L from 'leaflet'
import { getPriceColor, getHeatmapStats } from '@/utils/heatmapUtils'
import { formatCurrency } from '@/services/idwService'

interface InteractiveMapProps {
  onLocationSelect: (coordinate: Coordinate) => void
  selectedLocation?: Coordinate | null
  samplePoints: SamplePoint[]
  showHeatmap?: boolean
  radiusFilter?: number
}

export const InteractiveMap = ({
  onLocationSelect,
  selectedLocation,
  samplePoints,
  showHeatmap = true,
  radiusFilter = 2,
}: InteractiveMapProps) => {

  // Komponen khusus untuk menangani klik pada React-Leaflet v3+
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        const coordinate = { lat, lng }
        onLocationSelect(coordinate)
      },
    })
    return null
  }

  // Update center to point to IKN (Balikpapan-Sepaku corridor)
  const center: LatLngExpression = [-1.15, 116.82]

  // Peta dikunci ke tema Terang (Voyager) agar jalanan dan area tanah lebih jelas terbaca
  const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  // Get heatmap statistics
  const heatmapStats = getHeatmapStats(samplePoints)

  // Filter points by distance if radiusFilter is set
  const filteredPoints = radiusFilter
    ? samplePoints.filter((p) => (p.distanceToTol ?? 0) <= radiusFilter)
    : samplePoints

  // Custom icon for sample points
  const samplePointIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI1IiBmaWxsPSIjMjJDNTVFIi8+PC9zdmc+',
    iconSize: [24, 24],
    popupAnchor: [0, -12],
  })

  // Custom icon for selected location
  const selectedIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2IiBmaWxsPSIjMDBEMUZGIiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
    iconSize: [32, 32],
    popupAnchor: [0, -16],
  })

  // HandleMapClick dan useEffect dihapus karena sudah diganti dengan useMapEvents

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="w-full h-full bg-background z-0"
    >
      <TileLayer
        url={tileUrl}
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
      />

      <MapClickHandler />

      {/* Region boundary polygon */}
      <FeatureGroup>
        <Popup>Region Boundary</Popup>
      </FeatureGroup>

      {showHeatmap &&
        filteredPoints.map((point) => {
          const color = getPriceColor(point.price, heatmapStats.minPrice, heatmapStats.maxPrice)
          const radius = 8 + (point.price - heatmapStats.minPrice) / (heatmapStats.maxPrice - heatmapStats.minPrice) * 12

          return (
            <CircleMarker
              key={`heatmap-${point.id}`}
              center={[point.lat, point.lng]}
              radius={radius}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.7,
                weight: 2,
                opacity: 0.8,
                color: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <Popup className="popup-custom">
                <div className="text-sm space-y-2">
                  <p className="font-semibold text-foreground">{point.locationName || `Point ${point.id}`}</p>
                  <p className="text-primary font-mono">{formatCurrency(point.price)}</p>
                  <p className="text-muted-foreground text-xs">{point.description}</p>
                  <div className="pt-2 border-t border-card-border text-muted-foreground text-xs">
                    <p>Distance to Toll: {point.distanceToTol?.toFixed(2)} km</p>
                    <p>Coordinates: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}</p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}

      {/* Sample points (non-heatmap markers) */}
      {!showHeatmap &&
        filteredPoints.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]} icon={samplePointIcon}>
            <Popup className="popup-custom">
              <div className="text-sm space-y-2">
                <p className="font-semibold text-foreground">{point.locationName || `Sample Point ${point.id}`}</p>
                <p className="text-primary font-mono">{formatCurrency(point.price)}</p>
                <p className="text-muted-foreground text-xs">{point.description}</p>
                <div className="pt-2 border-t border-card-border text-muted-foreground text-xs">
                  <p>Distance to Toll: {point.distanceToTol?.toFixed(2)} km</p>
                  <p>Coordinates: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Selected location marker */}
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={selectedIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-foreground">Lokasi Target</p>
              <p className="text-muted-foreground">{selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
