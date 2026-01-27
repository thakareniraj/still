# Getting Started Guide

This guide will walk you through setting up and running the Still app locally.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Running the App](#running-the-app)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

## System Requirements

### Required
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (comes with Node.js)
- **Python**: v3.8 or higher
- **pip**: Python package manager (comes with Python)

### Recommended
- **VS Code**: For development
- **Postman**: For API testing
- **Git**: For version control

### Check Your Versions
```bash
node --version      # Should be v16+
npm --version       # Should be v7+
python --version    # Should be 3.8+
pip --version       # Should be present
```

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 18
- TypeScript 5
- Vite
- PWA plugin
- Other dev tools

Installation takes 2-5 minutes depending on your internet speed.

### Step 3: Start Development Server
```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Open in Browser
Open `http://localhost:5173` in your browser.

You should see:
- "Still" title
- Mental Reset & Focus subtitle
- 4 session options (Breathing, Eyes, Mind, Declutter)

### Verify Frontend is Working
- Click each session button to verify they load
- Check browser console (F12) for any errors
- Verify styles are applied (not plain HTML)

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create Virtual Environment
**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- FastAPI
- Uvicorn
- Pydantic
- python-multipart

Installation takes 1-2 minutes.

### Step 4: Start Backend Server
```bash
python main.py
```

You should see output like:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Step 5: Verify Backend is Working
Open `http://localhost:8000/docs` in your browser.

You should see:
- Swagger UI with all endpoints listed
- Try it out buttons for each endpoint
- Request/response examples

## Running the App

### From Terminal 1 (Frontend)
```bash
cd frontend
npm run dev
```

### From Terminal 2 (Backend)
```bash
cd backend
venv\Scripts\activate  # Windows
python main.py
```

### Access the App
1. Open `http://localhost:5173` in your browser
2. You should see the Still app home screen
3. Click any session to start

### Testing the API
1. Open `http://localhost:8000/docs`
2. Try the GET `/health` endpoint
3. Try other endpoints in the Swagger UI

## Stopping the Servers

### Frontend
In Terminal 1, press `Ctrl+C`

### Backend
In Terminal 2, press `Ctrl+C`

## Development Workflow

### Making Changes to Frontend

1. Edit files in `frontend/src/`
2. Vite automatically reloads the browser
3. Check the browser console for errors

Example: Edit `frontend/src/components/HomeScreen.tsx`
- Change button text
- Add new module
- Modify styles

### Making Changes to Backend

1. Edit files in `backend/`
2. Backend will auto-reload (thanks to `--reload`)
3. Check terminal for errors

Example: Edit `backend/main.py`
- Add new endpoint
- Change response format
- Modify session handling

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

Creates `frontend/dist/` folder with optimized files.

### Backend
For production, don't use `python main.py`. Instead use:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Testing

### Frontend Testing

1. **Manual Testing**
   - Test each session type
   - Verify animations work smoothly
   - Check dark mode toggle
   - Test on mobile browser (F12 device mode)

2. **Browser Checks**
   - Open DevTools (F12)
   - Check Console for errors (should be none)
   - Check Network tab for API calls
   - Check Application tab for Service Worker

### Backend Testing

1. **Health Check**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Using Swagger UI**
   - Go to `http://localhost:8000/docs`
   - Try each endpoint
   - Check responses

3. **Using curl**
   ```bash
   # Get sounds
   curl http://localhost:8000/api/sounds
   
   # Get content
   curl http://localhost:8000/api/content/mindwarmup
   
   # Check analytics
   curl http://localhost:8000/api/analytics/summary
   ```

## Troubleshooting

### Frontend Issues

**Problem: Port 5173 already in use**
```bash
# Kill the process
# Windows: netstat -ano | findstr :5173
# macOS/Linux: lsof -i :5173
```

**Problem: npm install fails**
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem: Blank white page**
- Check browser console (F12)
- Check network requests
- Hard refresh (Ctrl+Shift+R)

**Problem: Styles not loading**
- Check that Vite server is running
- Check browser console for CSS errors
- Verify CSS files exist in src/styles/

### Backend Issues

**Problem: Port 8000 already in use**
```bash
# Kill process on port 8000
# Windows: netstat -ano | findstr :8000
```

**Problem: Module not found error**
```bash
# Deactivate and reactivate venv
deactivate
venv\Scripts\activate
pip install -r requirements.txt
```

**Problem: Connection refused when frontend tries to call backend**
- Make sure backend is running on localhost:8000
- Check CORS settings in `main.py`
- Check browser console for CORS errors
- Verify API endpoint in `vite.config.ts`

**Problem: "python: command not found"**
- Make sure Python is installed
- Windows: Add Python to PATH
- Use `python3` instead of `python`

### Network Issues

**Frontend can't reach backend**
1. Check both servers are running
2. Check ports: 5173 (frontend), 8000 (backend)
3. Check firewall settings
4. Verify API URL in frontend: `http://localhost:8000`

**CORS errors in console**
- Normal for localhost development
- Backend CORS is configured for `*`
- Should work fine

## Next Steps

### Learning More
- Read `frontend/README.md` for frontend details
- Read `backend/README.md` for backend details
- Check component code in `frontend/src/modules/`

### Customization
- Change app name: Update `frontend/vite.config.ts` manifest
- Change colors: Edit `frontend/src/styles/global.css`
- Change API content: Edit `backend/main.py`

### Deployment
- Frontend: Deploy to Vercel, Netlify, or GitHub Pages
- Backend: Deploy to Heroku, Railway, or your server

## Getting Help

1. Check this guide first
2. Read error messages carefully
3. Check browser console (F12)
4. Check terminal output
5. Review README.md files
6. Check code comments

## Summary

You now have:
- ✅ Frontend running on http://localhost:5173
- ✅ Backend running on http://localhost:8000
- ✅ API docs at http://localhost:8000/docs
- ✅ Full development environment

You're ready to start developing!

---

Happy coding! 🚀
