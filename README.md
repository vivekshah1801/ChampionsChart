# Champions Chart 📊

A minimal, handwritten-style Progressive Web App (PWA) for tracking your personal goals: **weight**, **height**, and **pushups**.

## Features

- 📈 **Track 3 Metrics**: Weight (kg), Height (cm), and Pushups (count)
- ✍️ **Handwritten Style**: Beautiful, hand-drawn aesthetic using chart.xkcd
- 📱 **Mobile-First Design**: Optimized for touch and mobile screens
- 🎨 **Color-Coded**: Blue for Weight, Red for Height, Green for Pushups
- 💾 **Offline-First**: Uses IndexedDB for local storage
- 🚀 **PWA**: Installable on mobile and desktop devices
- ⚡ **Fast & Minimal**: No bloat, just what you need

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173 to see the app.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Visit http://localhost:4173 to test the production PWA.

## Technology Stack

- **React 19** + **TypeScript** - Modern UI development
- **Vite** - Lightning-fast build tool
- **chart.xkcd** - Hand-drawn style charts
- **IndexedDB** (via idb) - Offline data storage
- **Vite PWA Plugin** - Service worker and PWA features
- **Caveat Font** - Handwritten typography

## How to Use

1. **Select a Metric**: Click on Weight, Height, or Pushups
2. **Add Data**: Enter a value and click "Add"
3. **View Progress**: See your hand-drawn chart update
4. **Track History**: View recent entries below the chart
5. **Delete Entries**: Click the × button to remove entries

## Mobile Installation

### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home screen"
4. Tap "Add"

### Desktop (Chrome/Edge)
1. Look for the install icon in the address bar
2. Click "Install Champions Chart"

## Features in Detail

### Data Storage
- All data stored locally in IndexedDB
- Works completely offline after first load
- No backend required
- Privacy-first: your data never leaves your device

### Chart Visualization
- Shows last 20 data points
- Hand-drawn xkcd style
- Color-coded by metric
- Handles missing/sparse data gracefully

### Metrics
- **Weight**: Decimal values in kg
- **Height**: Decimal values in cm
- **Pushups**: Integer count

## Project Structure

```
src/
  components/       # React components
    Chart.tsx
    EntriesList.tsx
    InputForm.tsx
    MetricSelector.tsx
  hooks/            # Custom React hooks
    useMetricData.ts
  styles/           # CSS modules
    App.css
    Chart.css
    EntriesList.css
    InputForm.css
    MetricSelector.css
  utils/            # Utilities
    db.ts           # IndexedDB operations
    types.ts        # TypeScript types
  App.tsx           # Main app component
  main.tsx          # Entry point
public/
  icons/            # PWA icons
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT

---

**Keep pushing! 💪**
