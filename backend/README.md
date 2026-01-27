# Still App - Backend

A FastAPI-based backend for the Still mental reset and focus application.

## Setup

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/Scripts/activate  # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Server

```bash
python main.py
```

Or with auto-reload:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Health Check
- `GET /` - Root endpoint
- `GET /health` - Health check

### Content
- `GET /api/content/mindwarmup` - Get mind warm-up content
- `GET /api/content/mindwarmup/all` - Get all mind warm-up content
- `GET /api/sounds` - Get available sounds
- `GET /api/sounds/{sound_name}` - Get specific sound

### Sessions
- `POST /api/sessions/breathing` - Save breathing session
- `POST /api/sessions/eyes` - Save eye exercise session
- `POST /api/sessions/mindwarmup` - Save mind warm-up session
- `POST /api/sessions/declutter` - Save declutter session
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/history` - Get session history

### Analytics
- `GET /api/analytics/summary` - Get analytics summary

## Features

- **Content Management**: Serve adaptive content based on difficulty
- **Session Tracking**: Record and track user sessions
- **Analytics**: Provide insights on usage patterns
- **Background Sounds**: Manage audio assets
- **CORS Support**: Enable cross-origin requests

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- User authentication
- Advanced analytics
- AI-based content generation
- Cloud storage for audio files
