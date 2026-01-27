# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Still App - React + TypeScript PWA              │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │        App.tsx (Main Component)               │   │  │
│  │  │  - State management                           │   │  │
│  │  │  - Session routing                            │   │  │
│  │  │  - Session history tracking                   │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                         ↓                                │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │  Feature Modules (Selectable)                 │   │  │
│  │  ├─────────────────────────────────────────────────┤   │  │
│  │  │ • HomeScreen - Session selector               │   │  │
│  │  │ • BreathingModule - Guided breathing (4-7-8) │   │  │
│  │  │ • EyeExercisesModule - 20-20-20 rule          │   │  │
│  │  │ • MindWarmUpModule - Adaptive reading         │   │  │
│  │  │ • MentalDeclutterModule - Brain dump          │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                         ↓                                │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │         Global Styles & Theme                 │   │  │
│  │  │  - CSS variables for colors                   │   │  │
│  │  │  - Responsive design (mobile-first)           │   │  │
│  │  │  - Dark mode support                          │   │  │
│  │  │  - Smooth animations                          │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                         ↓                                │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │      Utilities & Storage                      │   │  │
│  │  │  - Service Worker registration                │   │  │
│  │  │  - IndexedDB for session history              │   │  │
│  │  │  - API communication helpers                  │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Service Worker (PWA)                       │  │
│  │  - Asset caching                                        │  │
│  │  - Offline support                                      │  │
│  │  - Background sync                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         IndexedDB (Client-side Database)               │  │
│  │  - Session history storage                             │  │
│  │  - Offline data persistence                            │  │
│  │  - User preferences (future)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │                                          │
         │ HTTP/HTTPS (with CORS)                  │ Offline Mode
         │                                          │
         ↓                                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND                              │
│                   (Port: 8000)                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         API Routes (FastAPI)                           │  │
│  │  - REST endpoints                                       │  │
│  │  - Request validation (Pydantic)                        │  │
│  │  - Response serialization                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Endpoint Groups:                                      │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ Health & Root (/health, /)                     │   │  │
│  │  ├─────────────────────────────────────────────────┤   │  │
│  │  │ Content (/api/content/*, /api/sounds/*)        │   │  │
│  │  ├─────────────────────────────────────────────────┤   │  │
│  │  │ Sessions (/api/sessions/*)                     │   │  │
│  │  ├─────────────────────────────────────────────────┤   │  │
│  │  │ Analytics (/api/analytics/*)                   │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                         ↓                                │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │  Data Management                              │   │  │
│  │  │  - Session tracking (in-memory)               │   │  │
│  │  │  - Content management                         │   │  │
│  │  │  - Sound library                              │   │  │
│  │  │  - Analytics calculation                      │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   Middleware & Features                               │  │
│  │  - CORS (for cross-origin requests)                    │  │
│  │  - Error handling                                       │  │
│  │  - Logging                                              │  │
│  │  - Request/response serialization                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Session Start Flow
```
User clicks session button
       ↓
HomeScreen calls onSelectSession()
       ↓
App.tsx sets currentSession state
       ↓
Corresponding module component renders
       ↓
Module displays instructions/content
```

### 2. Session Completion Flow
```
Module completes (timer/user action)
       ↓
Module calls onComplete() callback
       ↓
App.tsx clears currentSession
       ↓
Session added to sessionHistory[]
       ↓
Returns to HomeScreen
       ↓
[Optional] Save to backend API
       ↓
[Optional] Store in IndexedDB
```

### 3. API Communication Flow
```
Frontend action (e.g., session complete)
       ↓
Create request with session data
       ↓
POST to /api/sessions/[type]
       ↓
Backend validates with Pydantic
       ↓
Store in memory/database
       ↓
Return success response
       ↓
Frontend updates local state
```

## Component Hierarchy

```
App (root)
├── HomeScreen
│   ├── SessionButton (×4)
│   │   ├── Icon
│   │   ├── Title
│   │   └── Description
│   └── Footer hint
│
├── BreathingModule
│   ├── InstructionScreen (conditional)
│   │   ├── Icon
│   │   ├── Title
│   │   ├── Pattern details
│   │   └── Start button
│   ├── SessionScreen (conditional)
│   │   ├── Breathing circle (animated)
│   │   ├── Phase label
│   │   ├── Timer
│   │   ├── Progress bar
│   │   └── Cycle counter
│   └── CompletionScreen (conditional)
│
├── EyeExercisesModule
│   ├── InstructionScreen
│   ├── LookAwayScreen
│   ├── PeripheralVisionScreen
│   └── CompletionScreen
│
├── MindWarmUpModule
│   ├── InstructionScreen
│   ├── ReadingScreen
│   ├── QuestionScreen
│   └── CompletionScreen
│
└── MentalDeclutterModule
    ├── InstructionScreen
    ├── DumpingScreen
    ├── IntentionScreen
    └── CompletionScreen
```

## State Management

### App-level State
```typescript
currentSession: SessionType | null  // Which module is active
sessionHistory: SessionType[]        // Completed sessions
```

### Module-level State
```typescript
// Breathing
phase: 'inhale' | 'hold' | 'exhale'
remainingTime: number
cycleCount: number
isActive: boolean

// Eyes
phase: 'instruction' | 'looking-away' | 'peripheral' | 'complete'
remainingTime: number
isActive: boolean

// Mind Warm-Up
phase: 'instruction' | 'reading' | 'question' | 'complete'
contentIndex: number
questionIndex: number
readingTime: number

// Declutter
phase: 'instruction' | 'dumping' | 'intention' | 'complete'
thoughtsDump: string
intention: string
dumpTime: number
isActive: boolean
```

## Styling Architecture

### CSS Cascade
```
Global Styles (global.css)
    ↓ (CSS Variables)
    ├── HomeScreen.css
    ├── BreathingModule.css
    ├── EyeExercisesModule.css
    ├── MindWarmUpModule.css
    └── MentalDeclutterModule.css
        ↓ (Media Queries)
        ├── @media (prefers-color-scheme: dark)
        ├── @media (max-width: 768px)
        └── @media (max-width: 480px)
```

### Color System
```
Light Mode:
├── Primary: #4a9eff (Blue)
├── Secondary: #7c3aed (Purple)
├── Accent: #e74c3c (Red)
├── Text: #1a1a1a (Dark gray)
├── Background: #ffffff (White)
└── Border: #ddd (Light gray)

Dark Mode (prefers-color-scheme: dark):
├── Primary: #2a7edb
├── Secondary: #6d28d9
├── Accent: #c0392b
├── Text: #ffffff (White)
├── Background: #1a1a1a (Dark)
└── Border: #444 (Dark gray)
```

## API Response Patterns

### Success Response
```json
{
  "data": { /* response data */ },
  "success": true,
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400
}
```

### List Response
```json
{
  "items": [ /* array of items */ ],
  "count": 10,
  "total": 100
}
```

## Performance Optimization Points

### Frontend
1. **Code Splitting**: Each module can be lazy-loaded
2. **CSS**: Minified and vendor-prefixed
3. **Images**: None (uses CSS for icons)
4. **Fonts**: System fonts (no downloads)
5. **Service Worker**: Caches entire app

### Backend
1. **Async/await**: Non-blocking I/O
2. **In-memory cache**: Fast content delivery
3. **Pydantic validation**: Single pass validation
4. **CORS caching**: Browser caches preflight

## Scalability Considerations

### Current (Single Server)
- Handles thousands of concurrent users
- All data in memory
- Per-request processing
- No database overhead

### Future (Production Scale)
- Database instead of in-memory storage
- Load balancer for multiple servers
- Cache layer (Redis)
- CDN for static assets
- Authentication/user management
- Analytics database

## Security Layers

### Frontend
- React escaping (XSS prevention)
- No sensitive data in local storage
- Service Worker scope limitation
- HTTPS requirement (production)

### Backend
- CORS validation
- Pydantic input validation
- Error message sanitization
- Rate limiting (recommended)
- HTTPS requirement (production)

### PWA
- Service Worker scope
- Manifest validation
- Install prompts

## Browser APIs Used

### Frontend
- **Fetch API** - API communication
- **Service Workers** - Offline support
- **IndexedDB** - Client-side storage
- **LocalStorage** - Small data storage
- **requestAnimationFrame** - Smooth animations
- **setTimeout** - Timers
- **Web Manifest** - App metadata

### Backend
- **Python asyncio** - Async operations
- **Uvicorn ASGI** - Web server protocol

## Deployment Architecture

```
┌──────────────────┐
│   Git Repository │
└────────┬─────────┘
         │ push
         ↓
┌────────────────────────────────────────┐
│  CI/CD Pipeline (GitHub Actions)      │
│  - Lint & type check                   │
│  - Run tests                           │
│  - Build frontend                      │
│  - Deploy to CDN                       │
└────────────────────────────────────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌─────────┐  ┌──────────────────┐
│   CDN   │  │ Backend Server   │
│ (Static)│  │ (FastAPI)        │
│  Files  │  │ (Uvicorn)        │
└─────────┘  └──────────────────┘
    ↓         ↓
    └────┬────┘
         ↓
   ┌──────────────┐
   │ User Browser │
   └──────────────┘
```

## Development Workflow

```
Developer makes changes
    ↓
Git commit & push
    ↓
CI/CD runs tests
    ↓
Builds frontend (Vite)
    ↓
Builds backend (Python)
    ↓
Deploys to staging
    ↓
Runs integration tests
    ↓
Deploys to production
    ↓
Monitors health endpoints
```

---

This architecture is designed to be:
- **Simple** - Easy to understand and modify
- **Scalable** - Ready for growth
- **Maintainable** - Clear separation of concerns
- **Offline-capable** - Works without internet
- **Mobile-friendly** - Optimized for small screens
- **Accessible** - Inclusive for all users
