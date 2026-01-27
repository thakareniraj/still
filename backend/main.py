# pyright: ignore[reportMissingImports]
from fastapi import FastAPI  # pyright: ignore[reportMissingImports]
from fastapi.middleware.cors import CORSMiddleware  # pyright: ignore[reportMissingImports]
from fastapi.responses import JSONResponse  # pyright: ignore[reportMissingImports]
from typing import List, Optional
from pydantic import BaseModel  # pyright: ignore[reportMissingImports]
from datetime import datetime
import json

# Initialize FastAPI app
app = FastAPI(
    title="Still App API",
    description="Backend API for the Still mental reset and focus app",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# MODELS
# ============================================================================

class BreathingSession(BaseModel):
    """Model for breathing session data."""
    pattern: str
    cycles: int
    total_duration: int
    timestamp: datetime


class EyeExerciseSession(BaseModel):
    """Model for eye exercise session data."""
    look_away_time: int
    peripheral_time: int
    total_duration: int
    timestamp: datetime


class MindWarmUpSession(BaseModel):
    """Model for mind warm-up session data."""
    paragraph: str
    answers: List[str]
    difficulty: str
    total_duration: int
    timestamp: datetime


class DeclutterSession(BaseModel):
    """Model for mental declutter session data."""
    thoughts_dump: str
    intention: str
    total_duration: int
    timestamp: datetime


class SessionHistory(BaseModel):
    """Model for session history."""
    sessions: List[str]
    total_sessions: int
    last_session: Optional[datetime]


class ContentRequest(BaseModel):
    """Model for requesting content."""
    difficulty: str = "medium"
    category: Optional[str] = None


class ContentResponse(BaseModel):
    """Model for content response."""
    content: str
    metadata: dict


# ============================================================================
# IN-MEMORY STORAGE (replace with database in production)
# ============================================================================

user_sessions = []
mind_warmup_content = [
    {
        "paragraph": "The morning light filtered through the trees, creating patterns on the forest floor. Each beam carried the promise of a new beginning.",
        "questions": ["What season does this remind you of?", "How does this scene make you feel?"],
        "difficulty": "easy"
    },
    {
        "paragraph": "Innovation often comes from unexpected connections between different ideas. When we allow our minds to wander and make new associations, we unlock creative potential.",
        "questions": ["What ideas have you connected recently?", "How can you encourage more creative thinking?"],
        "difficulty": "medium"
    },
    {
        "paragraph": "The concept of 'kairos' refers to the opportune moment—not just any moment, but the right moment when conditions align perfectly for action. Many cultures recognize this principle.",
        "questions": ["What is your current kairos moment?", "Are you ready to seize it?"],
        "difficulty": "hard"
    }
]

background_sounds = [
    {
        "name": "rain",
        "displayName": "Rain",
        "duration": 300,
        "file": "/sounds/rain.mp3"
    },
    {
        "name": "white_noise",
        "displayName": "White Noise",
        "duration": 300,
        "file": "/sounds/white_noise.mp3"
    },
    {
        "name": "brown_noise",
        "displayName": "Brown Noise",
        "duration": 300,
        "file": "/sounds/brown_noise.mp3"
    },
    {
        "name": "fan",
        "displayName": "Fan",
        "duration": 300,
        "file": "/sounds/fan.mp3"
    },
    {
        "name": "cafe",
        "displayName": "Cafe Ambience",
        "duration": 300,
        "file": "/sounds/cafe.mp3"
    },
    {
        "name": "forest",
        "displayName": "Forest",
        "duration": 300,
        "file": "/sounds/forest.mp3"
    }
]

# ============================================================================
# ROUTES
# ============================================================================

@app.get("/")
async def read_root():
    """Root endpoint."""
    return {"message": "Still App API", "version": "0.1.0"}


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


# Content Endpoints
@app.get("/api/content/mindwarmup")
async def get_mind_warmup_content(difficulty: str = "medium"):
    """Get mind warm-up content based on difficulty."""
    contents = [c for c in mind_warmup_content if c["difficulty"] == difficulty]
    if not contents:
        contents = [c for c in mind_warmup_content if c["difficulty"] == "medium"]
    
    if contents:
        return {"content": contents[0]}
    return {"error": "No content found"}, 404


@app.get("/api/content/mindwarmup/all")
async def get_all_mind_warmup_content():
    """Get all mind warm-up content."""
    return {"contents": mind_warmup_content}


# Sounds Endpoints
@app.get("/api/sounds")
async def get_sounds():
    """Get available background sounds."""
    return {"sounds": background_sounds}


@app.get("/api/sounds/{sound_name}")
async def get_sound(sound_name: str):
    """Get a specific sound."""
    sound = next((s for s in background_sounds if s["name"] == sound_name), None)
    if sound:
        return sound
    return {"error": "Sound not found"}, 404


# Session Endpoints
@app.post("/api/sessions/breathing")
async def save_breathing_session(session: BreathingSession):
    """Save a breathing session."""
    session_data = {
        "type": "breathing",
        "data": session.dict(),
        "saved_at": datetime.now().isoformat()
    }
    user_sessions.append(session_data)
    return {"success": True, "message": "Breathing session saved"}


@app.post("/api/sessions/eyes")
async def save_eye_session(session: EyeExerciseSession):
    """Save an eye exercise session."""
    session_data = {
        "type": "eyes",
        "data": session.dict(),
        "saved_at": datetime.now().isoformat()
    }
    user_sessions.append(session_data)
    return {"success": True, "message": "Eye exercise session saved"}


@app.post("/api/sessions/mindwarmup")
async def save_mindwarmup_session(session: MindWarmUpSession):
    """Save a mind warm-up session."""
    session_data = {
        "type": "mindwarmup",
        "data": session.dict(),
        "saved_at": datetime.now().isoformat()
    }
    user_sessions.append(session_data)
    return {"success": True, "message": "Mind warm-up session saved"}


@app.post("/api/sessions/declutter")
async def save_declutter_session(session: DeclutterSession):
    """Save a mental declutter session."""
    session_data = {
        "type": "declutter",
        "data": session.dict(),
        "saved_at": datetime.now().isoformat()
    }
    user_sessions.append(session_data)
    return {"success": True, "message": "Declutter session saved"}


@app.get("/api/sessions")
async def get_sessions():
    """Get all sessions."""
    return {
        "total_sessions": len(user_sessions),
        "sessions": user_sessions
    }


@app.get("/api/sessions/history")
async def get_session_history():
    """Get session history."""
    last_session = max([s["saved_at"] for s in user_sessions], default=None)
    return {
        "total_sessions": len(user_sessions),
        "last_session": last_session,
        "sessions_by_type": {
            "breathing": len([s for s in user_sessions if s["type"] == "breathing"]),
            "eyes": len([s for s in user_sessions if s["type"] == "eyes"]),
            "mindwarmup": len([s for s in user_sessions if s["type"] == "mindwarmup"]),
            "declutter": len([s for s in user_sessions if s["type"] == "declutter"])
        }
    }


# Analytics Endpoints
@app.get("/api/analytics/summary")
async def get_analytics_summary():
    """Get analytics summary."""
    if not user_sessions:
        return {
            "total_sessions": 0,
            "total_time_minutes": 0,
            "sessions_by_type": {}
        }
    
    total_time = sum([s["data"].get("total_duration", 0) for s in user_sessions])
    return {
        "total_sessions": len(user_sessions),
        "total_time_minutes": total_time / 60,
        "sessions_by_type": {
            "breathing": len([s for s in user_sessions if s["type"] == "breathing"]),
            "eyes": len([s for s in user_sessions if s["type"] == "eyes"]),
            "mindwarmup": len([s for s in user_sessions if s["type"] == "mindwarmup"]),
            "declutter": len([s for s in user_sessions if s["type"] == "declutter"])
        }
    }


@app.delete("/api/sessions/clear")
async def clear_sessions():
    """Clear all sessions (for testing)."""
    global user_sessions
    user_sessions = []
    return {"success": True, "message": "All sessions cleared"}


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handle general exceptions."""
    return JSONResponse(
        status_code=500,
        content={"error": str(exc), "message": "An unexpected error occurred"}
    )


if __name__ == "__main__":
    import uvicorn  # pyright: ignore[reportMissingImports]
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
