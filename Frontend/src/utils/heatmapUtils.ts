import { SamplePoint } from '@/types'

/**
 * Calculate heatmap color based on price
 */
export const getPriceColor = (price: number, minPrice: number, maxPrice: number): string => {
  const normalized = (price - minPrice) / (maxPrice - minPrice)

  // Color gradient: Green (cheap) -> Yellow -> Orange -> Red (expensive)
  if (normalized < 0.25) {
    // Green to Yellow
    const ratio = normalized / 0.25
    return interpolateColor('#22C55E', '#FBBF24', ratio)
  } else if (normalized < 0.5) {
    // Yellow to Orange
    const ratio = (normalized - 0.25) / 0.25
    return interpolateColor('#FBBF24', '#F97316', ratio)
  } else if (normalized < 0.75) {
    // Orange to Red
    const ratio = (normalized - 0.5) / 0.25
    return interpolateColor('#F97316', '#EF4444', ratio)
  } else {
    // Dark Red
    return '#DC2626'
  }
}

/**
 * Interpolate between two hex colors
 */
const interpolateColor = (color1: string, color2: string, ratio: number): string => {
  const r1 = parseInt(color1.slice(1, 3), 16)
  const g1 = parseInt(color1.slice(3, 5), 16)
  const b1 = parseInt(color1.slice(5, 7), 16)

  const r2 = parseInt(color2.slice(1, 3), 16)
  const g2 = parseInt(color2.slice(3, 5), 16)
  const b2 = parseInt(color2.slice(5, 7), 16)

  const r = Math.round(r1 + (r2 - r1) * ratio)
  const g = Math.round(g1 + (g2 - g1) * ratio)
  const b = Math.round(b1 + (b2 - b1) * ratio)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Filter points by distance from toll road
 */
export const filterPointsByDistance = (points: SamplePoint[], maxDistance: number): SamplePoint[] => {
  return points.filter((point) => {
    const distance = point.distanceToTol ?? 0
    return distance <= maxDistance
  })
}

/**
 * Get statistics for heatmap
 */
export const getHeatmapStats = (points: SamplePoint[]) => {
  const prices = points.map((p) => p.price)
  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    avgPrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
  }
}

/**
 * Create heatmap layer data (for visualization purposes)
 */
export const createHeatmapData = (points: SamplePoint[], intensity: number = 1): Array<[number, number, number]> => {
  const stats = getHeatmapStats(points)
  return points.map((point) => {
    const normalized = (point.price - stats.minPrice) / (stats.maxPrice - stats.minPrice)
    const value = normalized * intensity
    return [point.lat, point.lng, value]
  })
}
