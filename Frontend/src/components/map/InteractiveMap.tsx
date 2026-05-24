import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, CircleMarker, Polyline } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { SamplePoint, Coordinate } from '@/types'
import L from 'leaflet'
import { getPriceColor, getHeatmapStats } from '@/utils/heatmapUtils'
import { formatCurrency } from '@/services/idwService'
import { tollRoutes } from '@/data/samplePoints'

interface InteractiveMapProps {
  onLocationSelect: (coordinate: Coordinate) => void
  selectedLocation?: Coordinate | null
  samplePoints: SamplePoint[]
  regionBound: any
  showHeatmap?: boolean
  radiusFilter?: number
}

export const InteractiveMap = ({
  onLocationSelect,
  selectedLocation,
  samplePoints,
  regionBound,
  showHeatmap = true,
  radiusFilter = 2,
}: InteractiveMapProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const [markerPosition, setMarkerPosition] = useState<Coordinate | null>(selectedLocation || null)

  const center: LatLngExpression = [-2.1833, 111.4833]

  const [isDarkMode, setIsDarkMode] = useState(
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const tileUrl = isDarkMode 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

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

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng

    // Check if click is within region bounds
    if (
      lat >= regionBound.minLat &&
      lat <= regionBound.maxLat &&
      lng >= regionBound.minLng &&
      lng <= regionBound.maxLng
    ) {
      const coordinate = { lat, lng }
      setMarkerPosition(coordinate)
      onLocationSelect(coordinate)
    }
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('click', handleMapClick)
      return () => {
        mapRef.current?.off('click', handleMapClick)
      }
    }
  }, [regionBound])

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={12}
      className="w-full h-full bg-background z-0"
    >
      <TileLayer
        url={tileUrl}
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
      />

      {/* Region boundary polygon */}
      <FeatureGroup>
        <Popup>Region Boundary</Popup>
      </FeatureGroup>

      {/* Toll Routes - Display with distinct colors */}
      {tollRoutes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.coordinates as [number, number][]}
          pathOptions={{
            color: route.color,
            weight: 4,
            opacity: 0.8,
            lineCap: 'round',
            lineJoin: 'round',
            dashArray: '5, 5',
          }}
        >
          <Popup className="popup-custom">
            <div className="text-sm space-y-2">
              <p className="font-semibold text-foreground">{route.name}</p>
              <p className="text-muted-foreground text-xs">{route.description}</p>
            </div>
          </Popup>
        </Polyline>
      ))}
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
      {markerPosition && (
        <Marker position={[markerPosition.lat, markerPosition.lng]} icon={selectedIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-foreground">Prediction Location</p>
              <p className="text-muted-foreground">{markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
