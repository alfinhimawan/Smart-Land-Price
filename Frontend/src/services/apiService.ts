import { Coordinate, PredictionResult, SamplePoint } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://smart-land-price-api.vercel.app/api/v1';

/**
 * Fetch all sample points from the backend
 */
export const fetchSamplePoints = async (): Promise<SamplePoint[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lahan/`);
    if (!response.ok) {
      throw new Error('Failed to fetch sample points');
    }
    const data = await response.json();
    
    // Map backend snake_case to frontend camelCase
    return data.map((item: any) => ({
      id: String(item.id_lahan),
      lat: item.latitude,
      lng: item.longitude,
      price: item.harga_per_meter,
      locationName: item.nama_lokasi,
      distanceToTol: item.jarak_ke_tol_km,
      description: item.keterangan,
    }));
  } catch (error) {
    console.error('Error fetching sample points:', error);
    return [];
  }
};

/**
 * Fetch prediction from the backend IDW algorithm
 */
export const fetchPrediction = async (
  coordinate: Coordinate,
  radiusFilter: number
): Promise<PredictionResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lahan/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: coordinate.lat,
        longitude: coordinate.lng,
        radius_km: radiusFilter,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to calculate prediction');
    }

    const data = await response.json();

    // Map the returned logs to SamplePoint format
    const nearestPoints = data.logs.map((log: any) => ({
      id: String(log.id_lahan),
      lat: log.latitude,
      lng: log.longitude,
      price: log.harga_per_meter,
      locationName: log.nama_lokasi,
      distance: log.distance,
      weight: log.weight,
    }));

    // Calculate a rough confidence score based on the closest distance
    const minDistance = Math.min(...nearestPoints.map((p: any) => p.distance ?? Infinity));
    const confidence = Math.max(10, Math.min(95, 100 - minDistance * 500));

    return {
      predictedPrice: data.predicted_price,
      confidence: Math.round(confidence),
      nearestPoints: nearestPoints,
      coordinates: coordinate,
      radiusUsed: 0, // Not handled by backend currently
      powerUsed: 2,  // Hardcoded in backend currently
      timestamp: new Date(),
      totalSamplesUsed: data.total_samples_used,
    };
  } catch (error) {
    console.error('Error predicting price:', error);
    throw error;
  }
};
