import { SamplePoint, Coordinate, PredictionResult } from '@/types';

/**
 * Calculate Euclidean distance between two coordinates
 */
export const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const lat1 = (coord1.lat * Math.PI) / 180;
  const lat2 = (coord2.lat * Math.PI) / 180;
  const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const deltaLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const earthRadiusKm = 6371;

  return earthRadiusKm * c; // distance in km
};

/**
 * Simple Euclidean distance (for approximation)
 */
const simpleDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const latDiff = coord1.lat - coord2.lat;
  const lngDiff = coord1.lng - coord2.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
};

/**
 * IDW (Inverse Distance Weighted) Interpolation
 * Z(x) = Σ(Zi/di^p) / Σ(1/di^p)
 */
export const predictPrice = (
  coordinate: Coordinate,
  samplePoints: SamplePoint[],
  power: number = 2,
  radius: number = 0.05
): PredictionResult => {
  // Filter points within radius
  const nearbyPoints = samplePoints
    .map((point) => ({
      ...point,
      distance: simpleDistance(coordinate, point),
    }))
    .filter((point) => point.distance <= radius)
    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

  if (nearbyPoints.length === 0) {
    // If no points in radius, use all points
    nearbyPoints.push(
      ...samplePoints.map((point) => ({
        ...point,
        distance: simpleDistance(coordinate, point),
      }))
    );
  }

  // Ensure we have at least 3 points for meaningful interpolation
  const pointsToUse = nearbyPoints.slice(0, Math.max(3, nearbyPoints.length));

  let numerator = 0;
  let denominator = 0;

  const pointsWithWeights = pointsToUse.map((point) => {
    const distance = point.distance ?? 0;

    // Avoid division by zero
    if (distance < 0.0001) {
      return {
        ...point,
        weight: 1,
      };
    }

    const weight = 1 / Math.pow(distance, power);
    numerator += weight * point.price;
    denominator += weight;

    return {
      ...point,
      weight,
    };
  });

  const predictedPrice = numerator / denominator;

  // Calculate confidence (0-100)
  const minDistance = Math.min(...pointsWithWeights.map((p) => p.distance ?? Infinity));
  const confidence = Math.max(10, Math.min(95, 100 - minDistance * 500));

  return {
    predictedPrice: Math.round(predictedPrice),
    confidence: Math.round(confidence),
    nearestPoints: pointsWithWeights.slice(0, 5),
    coordinates: coordinate,
    radiusUsed: radius,
    powerUsed: power,
    totalSamplesUsed: pointsToUse.length,
    timestamp: new Date(),
  };
};

/**
 * Format currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format coordinate
 */
export const formatCoordinate = (coord: Coordinate): string => {
  return `${coord.lat.toFixed(4)}, ${coord.lng.toFixed(4)}`;
};
