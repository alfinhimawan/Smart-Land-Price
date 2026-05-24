import { SamplePoint } from '@/types';

// Sample data points around IKN region (Nusantara, Kalimantan)
// Coordinates are approximate for demonstration purposes
export const samplePoints: SamplePoint[] = [
  { id: '1', lat: -2.1833, lng: 111.4833, price: 450000, locationName: 'Central Area', distanceToTol: 0.3, description: 'Strategic location near main access' },
  { id: '2', lat: -2.1900, lng: 111.5000, price: 520000, locationName: 'Business District', distanceToTol: 0.5, description: 'Developing commercial center' },
  { id: '3', lat: -2.1750, lng: 111.4700, price: 380000, locationName: 'Residential Area', distanceToTol: 1.2, description: 'Developing residential zone' },
  { id: '4', lat: -2.2000, lng: 111.5100, price: 580000, locationName: 'Premium District', distanceToTol: 0.2, description: 'Premium area closest to toll' },
  { id: '5', lat: -2.1650, lng: 111.4600, price: 420000, locationName: 'Sub Urban', distanceToTol: 1.5, description: 'Suburban development' },
  { id: '6', lat: -2.2100, lng: 111.4900, price: 510000, locationName: 'Business Hub', distanceToTol: 0.8, description: 'Secondary business center' },
  { id: '7', lat: -2.1550, lng: 111.5200, price: 490000, locationName: 'Mixed Use Zone', distanceToTol: 1.1, description: 'Mixed-use development zone' },
  { id: '8', lat: -2.2200, lng: 111.5300, price: 650000, locationName: 'Elite Zone', distanceToTol: 0.1, description: 'Premium elite zone' },
  { id: '9', lat: -2.1400, lng: 111.4800, price: 360000, locationName: 'Emerging Area', distanceToTol: 2.0, description: 'Emerging development area' },
  { id: '10', lat: -2.2300, lng: 111.4700, price: 540000, locationName: 'Central Hub', distanceToTol: 0.6, description: 'Main activity hub' },
  { id: '11', lat: -2.1600, lng: 111.4500, price: 410000, locationName: 'Suburban East', distanceToTol: 1.8, description: 'Eastern suburban area' },
  { id: '12', lat: -2.2050, lng: 111.5250, price: 620000, locationName: 'Premium Hub', distanceToTol: 0.4, description: 'Main premium hub' },
  { id: '13', lat: -2.1700, lng: 111.5100, price: 470000, locationName: 'Development Zone', distanceToTol: 0.9, description: 'Active development zone' },
  { id: '14', lat: -2.2150, lng: 111.4800, price: 550000, locationName: 'Gateway District', distanceToTol: 0.7, description: 'Strategic gateway area' },
  { id: '15', lat: -2.1450, lng: 111.4950, price: 400000, locationName: 'Access Point', distanceToTol: 1.3, description: 'Alternative access point' },
];

// IKN Toll Road Network Routes (approximate)
// These represent the main toll routes in the IKN region
export const tollRoutes = [
  {
    id: 'toll-balsam',
    name: 'Tol Balikpapan-Samarinda (Balsam)',
    color: '#FF6B6B',
    description: 'Jalan Tol Utama Kalimantan Timur',
    coordinates: [
      [-1.221, 116.899], // Balikpapan
      [-1.171, 116.938],
      [-1.114, 116.969],
      [-1.077, 116.983], // Samboja / KM 38
      [-1.002, 117.009],
      [-0.854, 117.065],
      [-0.648, 117.091], // Samarinda
    ],
  },
  {
    id: 'toll-ikn',
    name: 'Jalan Tol Akses IKN',
    color: '#4ECDC4',
    description: 'Seksi 3A, 3B, dan 5A (Menuju KIPP)',
    coordinates: [
      [-1.077, 116.983], // Simpang Susun Samboja (KM 38)
      [-1.109, 116.879],
      [-1.127, 116.793], // Simpang Tempadung
      [-1.122, 116.732], // Jembatan Pulau Balang
      [-1.050, 116.720],
      [-0.975, 116.711], // Kawasan Inti IKN
    ],
  }
];

// IKN Region boundary (approximate)
export const iknBoundary = {
  minLat: -1.30,
  maxLat: -0.90,
  minLng: 116.70,
  maxLng: 117.00,
};

// Statistics
export const calculateStatistics = (points: SamplePoint[]) => {
  const prices = points.map((p) => p.price);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  return {
    averagePrice: Math.round(avgPrice),
    highestPrice: maxPrice,
    lowestPrice: minPrice,
    totalPoints: points.length,
  };
};
