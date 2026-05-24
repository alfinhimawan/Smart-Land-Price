# Smart Land Price Prediction - IKN Spatial Dashboard

A premium modern GIS dashboard frontend application for interactive land price prediction using IDW (Inverse Distance Weighted) interpolation around the IKN region.

## 🚀 Features

- **Interactive GIS Map**: Click-based location selection with Leaflet mapping
- **Heatmap Visualization**: Visual representation of land price distribution
- **Spatial Prediction**: IDW interpolation-based price prediction
- **Real-time Analytics**: Live statistics and confidence metrics
- **Modern UI/UX**: Premium glassmorphism design with Framer Motion animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Technology Stack

- **React 18**: UI library
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **TailwindCSS**: Utility-first styling
- **React Leaflet**: GIS mapping integration
- **Framer Motion**: Smooth animations
- **Lucide React**: Modern icon library

## 📦 Installation

1. Navigate to project directory:

```bash
cd smart-land-price
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 📖 Usage

### Landing Page

- View project overview
- Explore key features
- Access technology stack information

### Dashboard

- Click on map to select locations
- Adjust IDW power and search radius parameters
- View real-time predictions with confidence levels
- See nearest sample points influencing prediction

### About Page

- Understand IDW interpolation method
- Learn project methodology
- Explore technical implementation

### Validation Page

- Manual calculation examples
- Accuracy metrics and validation results
- Methodology notes

## 🎯 Key Features

### IDW Interpolation Formula

Z(x₀) = Σ(Zᵢ/dᵢᵖ) / Σ(1/dᵢᵖ)

Where:

- Z(x₀) = Predicted value at location x₀
- Zᵢ = Known value at sample point i
- dᵢ = Distance between x₀ and sample point i
- p = Power parameter (default: 2)

### Customizable Parameters

- **IDW Power**: 0.5 - 5.0 (controls distance influence)
- **Search Radius**: 0.01 - 0.2 degrees (affects sample point selection)

## 🎨 Design System

### Color Palette

- **Background**: #020617, #0F172A
- **Accent**: #00D1FF (Cyan), #3B82F6 (Blue)
- **Status**: Green (#22C55E), Warning (#F59E0B), Error (#EF4444)

### Typography

- Primary Font: Inter, Poppins
- Minimum text size: 12px for accessibility

## 📱 Responsive Breakpoints

- Mobile: < 768px (Single column layout)
- Tablet: 768px - 1024px (Two column layout)
- Desktop: > 1024px (Full layout)

## 🔧 Project Structure

```
src/
├── assets/          # Images and icons
├── components/      # Reusable React components
│   ├── layout/     # Layout components
│   ├── map/        # Map-related components
│   ├── prediction/ # Prediction components
│   ├── landing/    # Landing page components
│   ├── about/      # About page components
│   └── ui/         # UI components
├── pages/          # Page components
├── services/       # Business logic (IDW calculation)
├── data/           # Sample data points
├── types/          # TypeScript types
├── utils/          # Utility functions
├── styles/         # Global CSS
└── router/         # Route configuration
```

## 🎓 Scientific Background

The application uses **Inverse Distance Weighted (IDW)** spatial interpolation:

1. **Method**: Estimates unmeasured values based on nearby measured points
2. **Algorithm**: Assigns weights inversely proportional to distance
3. **Parameter p**: Controls how strongly distance affects weighting (default: 2)
4. **Application**: Land price prediction based on sample locations

## 📊 Sample Data

The system includes 15 sample data points representing land prices within the IKN region. All data is for demonstration purposes.

## 🚀 Performance

- **Build size**: ~450KB (production)
- **Load time**: < 2 seconds (typical)
- **Prediction time**: ~1.5 seconds (with animation)
- **Map interaction**: 60 FPS

## 🔐 Security Notes

- Frontend-only application
- No backend API calls
- No user authentication
- All calculations performed client-side
- No data persistence

## 📝 License

This project is created for educational purposes.

## 👥 Credits

Built with modern web technologies for advanced GIS visualization and spatial analysis.

---

**Version**: 1.0.0  
**Last Updated**: 2024
