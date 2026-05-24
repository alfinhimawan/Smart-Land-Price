export const COLORS = {
  background: {
    dark: '#020617',
    darkAlt: '#0F172A',
    card: '#111827',
  },
  accent: {
    cyan: '#00D1FF',
    blue: '#3B82F6',
    darkBlue: '#2563EB',
  },
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  heatmap: ['#22C55E', '#FBBF24', '#F97316', '#EF4444'],
};

export const MAP_CONFIG = {
  defaultZoom: 12,
  defaultCenter: [-2.1833, 111.4833] as [number, number],
  attribution: '© OpenStreetMap contributors',
};

export const IDW_CONFIG = {
  defaultPower: 2,
  defaultRadius: 0.05,
  minPower: 0.5,
  maxPower: 5,
  minRadius: 0.01,
  maxRadius: 0.2,
};

export const ANIMATION_CONFIG = {
  duration: 0.3,
  stagger: 0.05,
};
