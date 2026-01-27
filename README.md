# Still - Mental Reset & Focus App

A distraction-minimizing mental reset and focus application designed for overstimulated users. Built with React, TypeScript, and FastAPI.

## Overview

Still is a PWA that helps users gently restore attention without pressure, productivity guilt, or cognitive overload. Sessions last under three minutes and focus on regulation rather than performance.

### Core Philosophy

- **No gamification**: No scores, no streaks, no failure states
- **Offline-first**: Works without internet connection
- **Minimal UI**: Fullscreen, distraction-free experience
- **Adaptive**: Gentle difficulty scaling based on user engagement
- **Inclusive**: Dark mode support and accessible design

## Features

### 1. Breathing & Regulation
- Animated breathing exercises (4-7-8 pattern)
- Optional haptic feedback
- Multiple breathing patterns
- Visual progress tracking

### 2. Eye Exercises
- 20-20-20 Rule implementation
- Peripheral vision training
- Guided look-away sessions
- Timer and progress feedback

### 3. Mind Warm-Up
- Short, engaging paragraphs
- Adaptive difficulty levels (easy, medium, hard)
- Gentle comprehension questions
- 1-3 minute sessions

### 4. Mental Declutter
- 60-second brain dump interface
- Auto-hiding thoughts text
- Single intention reset
- Clear, focused next steps

### 5. Background Sounds (Coming Soon)
- Rain, white noise, brown noise
- Fan, cafe ambience, forest sounds
- Layering support
- Offline caching
- Auto-stop functionality

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **PWA**: vite-plugin-pwa
- **Offline Storage**: IndexedDB
- **Styling**: CSS3 with CSS Variables
- **Target**: Mobile-first, responsive design

### Backend
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **Data Model**: Pydantic
- **Features**: CORS, Content management, Session tracking

## Project Structure

```
attention_reset_app/
├── frontend/                 # React + TypeScript PWA
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── modules/         # Feature modules
│   │   ├── styles/          # Global styles
│   │   ├── utils/           # Utilities
│   │   ├── App.tsx          # Main app
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── backend/                  # FastAPI backend
│   ├── main.py              # Main application
│   ├── requirements.txt      # Dependencies
│   └── README.md
│
├── README.md               # This file
└── docs/                   # Documentation

```

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+ and pip

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
python main.py
```

The backend API will be available at `http://localhost:8000`

**API Documentation**:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Health & Root
- `GET /` - Root endpoint
- `GET /health` - Health check

### Content
- `GET /api/content/mindwarmup?difficulty=medium` - Get mind warm-up content
- `GET /api/content/mindwarmup/all` - Get all content
- `GET /api/sounds` - List available sounds
- `GET /api/sounds/{sound_name}` - Get specific sound

### Sessions
- `POST /api/sessions/breathing` - Save breathing session
- `POST /api/sessions/eyes` - Save eye exercise session
- `POST /api/sessions/mindwarmup` - Save mind warm-up session
- `POST /api/sessions/declutter` - Save declutter session
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/history` - Get session history

### Analytics
- `GET /api/analytics/summary` - Get usage analytics

## Features Breakdown

### Breathing Module (Complete)
- ✅ 4-7-8 breathing pattern
- ✅ Animated circle visualization
- ✅ Cycle tracking
- ✅ Session completion feedback

### Eye Exercises (Complete)
- ✅ 20-20-20 Rule guidance
- ✅ Look-away timer (20 seconds)
- ✅ Peripheral vision exercise (30 seconds)
- ✅ Progress indication

### Mind Warm-Up (Complete)
- ✅ Adaptive content
- ✅ Multiple difficulty levels
- ✅ Question responses
- ✅ Session tracking

### Mental Declutter (Complete)
- ✅ 60-second brain dump
- ✅ Text auto-hiding
- ✅ Intention setting
- ✅ Session completion

### Background Sounds (Future)
- ⏳ Sound management
- ⏳ Offline caching
- ⏳ Layering support

### PWA (In Progress)
- ✅ Service Worker
- ✅ Offline support
- ✅ Installable app
- ✅ IndexedDB storage
- ⏳ Full offline functionality

## Design Principles

### Visual Design
- Minimal, clean interface
- Soft color palette (blues, purples, warm accent)
- Smooth animations and transitions
- Large, readable typography
- Dark mode support

### UX Principles
- One-tap to start
- No failure language
- Gentle transitions between phases
- Clear progress indication
- No pressure or guilt messaging

### Accessibility
- High contrast ratios
- Clear focus states
- Readable font sizes (16px minimum)
- Keyboard accessible
- Screen reader friendly

## Browser Support

### Desktop
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile
- iOS Safari 14+
- Chrome for Android (latest)
- Firefox for Android (latest)

## Installation as PWA

### Desktop (Chrome/Edge)
1. Visit the app URL
2. Click "Install" in address bar
3. App adds to desktop

### Mobile (iOS)
1. Open app in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Confirm and add

### Mobile (Android)
1. Open app in Chrome
2. Install prompt appears automatically
3. Or tap menu → "Install app"

## Configuration

### API Endpoint
Edit `frontend/vite.config.ts`:
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

### App Manifest
Edit `frontend/vite.config.ts` manifest section for:
- App name and description
- Icons and splash screens
- Theme color
- Display mode

### Backend Settings
Edit `backend/main.py`:
- CORS origins
- Session storage
- Content management

## Development Workflow

1. **Frontend Development**
   ```bash
   cd frontend
   npm run dev
   ```
   Open `http://localhost:5173`

2. **Backend Development**
   ```bash
   cd backend
   python main.py
   ```
   Access docs at `http://localhost:8000/docs`

3. **Testing**
   - Browser DevTools for frontend
   - Postman/curl for backend API
   - Chrome Lighthouse for PWA

4. **Production Build**
   ```bash
   # Frontend
   cd frontend
   npm run build
   
   # Backend (use production server)
   # See backend README
   ```

## Performance Optimization

### Frontend
- Code splitting per module
- Lazy loading of routes
- Optimized CSS with media queries
- Service worker caching
- Asset compression

### Backend
- In-memory data storage (replaceable)
- CORS headers optimization
- Efficient JSON serialization
- Async request handling

## Future Roadmap

### Phase 2
- Sound library integration
- Enhanced analytics dashboard
- User session sync
- Cloud storage option

### Phase 3
- Mobile app (React Native)
- Advanced AI content generation
- Habit tracking
- Social features (optional)

### Phase 4
- Machine learning for adaptive difficulty
- Biometric integration
- Multi-language support
- Accessibility enhancements

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - See LICENSE file

## Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Check existing documentation
- Review API docs in Swagger UI

## Credits

Built with ❤️ for overstimulated users who need a moment of calm.

---

**Still** - Because focus is a gift you give yourself.
