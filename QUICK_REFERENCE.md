# Quick Reference Guide

## File Structure at a Glance

```
attention_reset_app/
├── frontend/                 # React PWA app
│   ├── src/
│   │   ├── components/      # UI components (HomeScreen)
│   │   ├── modules/         # Feature modules (4 modules)
│   │   ├── styles/          # Global CSS
│   │   ├── utils/           # Helper functions
│   │   ├── App.tsx          # Main component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── README.md
│
├── backend/                  # FastAPI server
│   ├── main.py              # All endpoints & logic
│   ├── requirements.txt
│   └── README.md
│
├── README.md                # Project overview
├── SETUP.md                 # Installation guide
└── PROJECT_SUMMARY.md       # This build summary
```

## Quick Start (2 terminals)

### Terminal 1: Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Terminal 2: Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
# API at http://localhost:8000/docs
```

## Key Directories & What's Inside

### Frontend Source (`frontend/src/`)
| File | Purpose |
|------|---------|
| `App.tsx` | Main app, routes between modules |
| `types.ts` | TypeScript types and interfaces |
| `components/` | Reusable UI components |
| `modules/` | 4 feature modules (Breathing, Eyes, Mind, Declutter) |
| `styles/` | Global CSS and variables |
| `utils/` | Service worker and IndexedDB functions |

### Frontend Config (`frontend/`)
| File | Purpose |
|------|---------|
| `vite.config.ts` | Build config, PWA setup, API proxy |
| `tsconfig.json` | TypeScript settings |
| `package.json` | Dependencies and scripts |
| `index.html` | HTML template |

### Backend (`backend/`)
| File | Purpose |
|------|---------|
| `main.py` | All API endpoints (150+ lines) |
| `requirements.txt` | Python dependencies |

## Key Scripts

### Frontend
```bash
npm install      # Install dependencies (first time)
npm run dev      # Start dev server (auto-reload)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
python main.py              # Start dev server
uvicorn main:app --reload   # Alternative (same thing)
```

## The 4 Modules Explained

### 1. Breathing Module
- **File**: `frontend/src/modules/BreathingModule.tsx`
- **Duration**: ~76 seconds (4 cycles of 4-7-8 pattern)
- **Flow**: Instructions → Animated breathing circle → Completion
- **Key Features**: Timer, cycle counter, progress bar

### 2. Eye Exercises Module
- **File**: `frontend/src/modules/EyeExercisesModule.tsx`
- **Duration**: ~50 seconds (20s look away + 30s peripheral)
- **Flow**: Instructions → Look away → Peripheral vision → Completion
- **Key Features**: 20-20-20 rule, center dot, timer

### 3. Mind Warm-Up Module
- **File**: `frontend/src/modules/MindWarmUpModule.tsx`
- **Duration**: 2-3 minutes
- **Flow**: Instructions → Read paragraph → Answer questions → Completion
- **Key Features**: Adaptive difficulty, free-form responses, progress

### 4. Mental Declutter Module
- **File**: `frontend/src/modules/MentalDeclutterModule.tsx`
- **Duration**: 2-3 minutes
- **Flow**: Instructions → Brain dump (60s) → Set intention → Completion
- **Key Features**: Auto-timer, text input, intention display

## API Endpoints Summary

### Content
```
GET  /api/content/mindwarmup?difficulty=medium
GET  /api/content/mindwarmup/all
GET  /api/sounds
GET  /api/sounds/{name}
```

### Sessions
```
POST /api/sessions/breathing
POST /api/sessions/eyes
POST /api/sessions/mindwarmup
POST /api/sessions/declutter
GET  /api/sessions
GET  /api/sessions/history
```

### Analytics
```
GET  /api/analytics/summary
```

### Health
```
GET  /
GET  /health
```

## Component Props

### HomeScreen
```typescript
interface HomeScreenProps {
  onSelectSession: (type: SessionType) => void;
}
```

### All Modules
```typescript
interface ModuleProps {
  onComplete: () => void;
}
```

## Key Types

```typescript
type SessionType = 'breathing' | 'eyes' | 'mindwarmup' | 'declutter';

interface BreathingPattern {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
}

interface MindWarmUpContent {
  paragraph: string;
  questions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}
```

## CSS Variables (Global)

```css
--primary-color: #4a9eff;      /* Blue */
--secondary-color: #7c3aed;    /* Purple */
--accent-color: #e74c3c;       /* Red */
--text-primary: #1a1a1a;       /* Dark text */
--text-secondary: #666;        /* Medium text */
--background-main: #ffffff;    /* White background */
```

## Common Tasks

### Change App Title
File: `frontend/vite.config.ts`
```typescript
manifest: {
  name: 'Your App Name', // Change here
  short_name: 'App Name', // And here
}
```

### Change Colors
File: `frontend/src/styles/global.css`
```css
--primary-color: #your-color;
--accent-color: #your-color;
```

### Add New Content
File: `backend/main.py`
```python
mind_warmup_content = [
  # Add new items here
]
```

### Add New Endpoint
File: `backend/main.py`
```python
@app.get("/api/your-endpoint")
async def your_endpoint():
    return {"data": "response"}
```

## Debugging

### Frontend
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls
- Check Application tab for Service Worker

### Backend
- Check terminal output
- Use Swagger UI at http://localhost:8000/docs
- Use curl commands to test
- Check `print()` statements in code

## Browser Support

**Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
**Mobile**: iOS 14+, Android Chrome latest

## Storage

**Frontend**: IndexedDB (via utils/serviceWorker.ts)
**Backend**: In-memory (replace with database for production)

## Performance Tips

1. **Frontend**: Vite handles code splitting automatically
2. **Backend**: FastAPI is async-first (efficient)
3. **PWA**: Service Worker caches assets automatically
4. **Mobile**: Fullscreen prevents address bar, saves space

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| Port 5173 in use | Change port in vite.config.ts or kill process |
| Port 8000 in use | Change port in main.py or kill process |
| npm install fails | Clear cache: `npm cache clean --force` |
| Module not found | Install dependencies: `npm install` |
| API returns 404 | Check endpoint spelling in code |
| CORS error | Backend CORS is enabled for development |
| Blank page | Check browser console for errors |

## File Sizes (Approximate)

- Frontend bundle: ~150KB (gzipped)
- Backend: ~15KB
- Total source code: ~500KB

## Deployment Checklist

### Before Production
- [ ] Change API endpoint from localhost
- [ ] Update app name and description
- [ ] Add custom icons
- [ ] Change color scheme
- [ ] Review all content
- [ ] Test on real mobile device
- [ ] Check performance (Lighthouse)
- [ ] Enable HTTPS

### Frontend Deployment
- Vercel (recommended - easiest)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend Deployment
- Heroku (free tier available)
- Railway
- DigitalOcean
- AWS Elastic Beanstalk

## Resources

### Documentation
- `README.md` - Full overview
- `SETUP.md` - Installation guide
- `PROJECT_SUMMARY.md` - What was built
- `frontend/README.md` - Frontend details
- `backend/README.md` - Backend details

### API Docs
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### React/TypeScript
- React docs: https://react.dev
- TypeScript docs: https://www.typescriptlang.org
- Vite docs: https://vitejs.dev

### FastAPI
- FastAPI docs: https://fastapi.tiangolo.com
- Pydantic docs: https://docs.pydantic.dev

---

**That's it!** You have everything needed to run, modify, and deploy Still.

For detailed instructions, see SETUP.md
For complete information, see PROJECT_SUMMARY.md
