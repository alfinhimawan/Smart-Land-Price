export interface Coordinate {
  lat: number;
  lng: number;
}

export interface SamplePoint extends Coordinate {
  id: string;
  price: number;
  distance?: number;
  weight?: number;
  locationName?: string;
  distanceToTol?: number;
  description?: string;
}

export interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  nearestPoints: SamplePoint[];
  coordinates: Coordinate;
  radiusUsed: number;
  powerUsed: number;
  timestamp: Date;
  totalSamplesUsed: number;
}

export interface DashboardState {
  selectedCoordinate: Coordinate | null;
  predictionResult: PredictionResult | null;
  isLoading: boolean;
  radiusFilter: number;
  idwPower: number;
  showHeatmap: boolean;
}

export interface RegionBound {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}
