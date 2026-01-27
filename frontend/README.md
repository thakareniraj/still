# Still App - Frontend

A React + TypeScript PWA for mental reset and focus.

## Features

- **Breathing Module**: Guided breathing exercises with animated circle
- **Eye Exercises**: 20-20-20 rule reminders and peripheral vision training
- **Mind Warm-Up**: Gentle reading exercises with adaptive difficulty
- **Mental Declutter**: Brain dump and intention-setting
- **Offline Support**: PWA with offline caching
- **Minimal UI**: Distraction-free, fullscreen experience

## Tech Stack

- React 18
- TypeScript 5
- Vite (Build tool)
- Vite PWA Plugin
- IndexedDB (Offline storage)

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── HomeScreen.tsx   # Main home screen
│   ├── modules/             # Feature modules
│   │   ├── BreathingModule.tsx
│   │   ├── EyeExercisesModule.tsx
│   │   ├── MindWarmUpModule.tsx
│   │   └── MentalDeclutterModule.tsx
│   ├── styles/              # Global styles
│   ├── utils/               # Utility functions
│   │   └── serviceWorker.ts # PWA service worker
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies

```

## Features in Detail

### Breathing Module
- Multiple breathing patterns (4-7-8, Box breathing, etc.)
- Animated circle that grows/shrinks with breath
- Progress tracking
- 3-5 minute sessions

### Eye Exercises
- 20-20-20 Rule: Look away for 20 seconds every 20 minutes
- Peripheral vision exercises
- Visual guides and timers

### Mind Warm-Up
- Short reading passages
- Adaptive difficulty (easy, medium, hard)
- Gentle comprehension questions
- No pressure responses
- Under 3 minutes per session

### Mental Declutter
- 60-second brain dump
- Text auto-hides after session
- Single intention setting
- Clear mind, focused action

## PWA Features

- Installable on mobile and desktop
- Works offline with cached assets
- Fullscreen capability
- Native app feel
- IndexedDB for offline data storage

## Configuration

### API Endpoint
Update the API proxy in `vite.config.ts`:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

### Service Worker
The PWA is configured via `vite-plugin-pwa`. Update `vite.config.ts` to customize:
- App name and description
- Icons and splash screens
- Cache strategies
- Installation prompts

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome for Android)

## Performance Optimizations

- Code splitting per module
- Lazy loading of components
- Optimized CSS with media queries
- Efficient re-renders with React hooks
- Service Worker caching strategy

## Design Principles

- **Minimal**: Only essential UI elements
- **Calm**: Soft colors, gentle animations
- **Offline-first**: Works without internet
- **Inclusive**: Dark mode support, accessible fonts
- **Mobile-first**: Optimized for small screens

## Future Enhancements

- Sound support (rain, white noise, etc.)
- Session history and analytics
- Multiple breathing patterns
- User customization
- Cloud sync

## Development Tips

1. Use React DevTools for debugging
2. Check PWA in DevTools Application tab
3. Test offline mode in Network tab
4. Use Chrome Lighthouse for performance audits
5. Test dark mode with system preferences

## Troubleshooting

### Service Worker not updating
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Clear site data in DevTools
- Check service worker scope in DevTools

### PWA not installing
- Make sure manifest.json is valid
- Check HTTPS (or localhost)
- Verify service worker is registered

### Components not updating
- Check React hooks dependencies
- Use React DevTools Profiler
- Verify state management
