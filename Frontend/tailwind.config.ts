import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          850: '#1a202c',
          900: '#111827',
          950: '#020617',
        },
        cyan: {
          50: '#ECFDF5',
          400: '#22D3EE',
          500: '#06B6D4',
        },
        accent: {
          cyan: '#00D1FF',
          blue: '#3B82F6',
          darkBlue: '#2563EB',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 209, 255, 0.25)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 209, 255, 0.5)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 15px rgba(0, 209, 255, 0.4)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.4)',
        elevated: '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
