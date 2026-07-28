from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import json
import shutil
import requests
from typing import Optional, List
from suno_client import SunoClient

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SETTINGS_FILE = "settings.json"
PUBLIC_PLAYER_DIR = "../public_player"
SONGS_DIR = os.path.join(PUBLIC_PLAYER_DIR, "songs")

# Ensure directories exist
os.makedirs(SONGS_DIR, exist_ok=True)

class Settings(BaseModel):
    cookie: str

class GenerateRequest(BaseModel):
    prompt: str
    is_instrumental: bool = False
    tags: str = ""
    title: str = ""

def load_settings():
    if os.path.exists(SETTINGS_FILE):
        with open(SETTINGS_FILE, "r") as f:
            return json.load(f)
    return {"cookie": ""}

def save_settings(settings: dict):
    with open(SETTINGS_FILE, "w") as f:
        json.dump(settings, f)

def get_client():
    settings = load_settings()
    if not settings.get("cookie"):
        return None
    return SunoClient(settings["cookie"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Suno Generator Backend Running"}

@app.get("/api/settings")
def get_settings_endpoint():
    return load_settings()

@app.post("/api/settings")
def update_settings(settings: Settings):
    save_settings(settings.dict())
    return {"status": "success"}

@app.post("/api/generate")
def generate_song(req: GenerateRequest):
    client = get_client()
    if not client:
        raise HTTPException(status_code=400, detail="Cookie not set. Please update settings.")
    
    result = client.generate(req.prompt, req.is_instrumental, req.tags, req.title)
    return result

@app.get("/api/songs")
def get_songs():
    client = get_client()
    if not client:
        # If no client, return empty or error? Return what we have locally maybe?
        # For now, require client to fetch from Suno
        return []
    
    # Fetch from Suno Feed
    try:
        feed = client.get_feed()
        return feed
    except Exception as e:
        print(f"Error fetching songs: {e}")
        return []

@app.post("/api/deploy")
def deploy_song(request: dict = Body(...)):
    # Expects { "audio_url": "...", "title": "...", "id": "..." }
    audio_url = request.get("audio_url")
    title = request.get("title")
    song_id = request.get("id")
    
    if not audio_url or not song_id:
        raise HTTPException(status_code=400, detail="Missing audio_url or id")

    # Download MP3
    try:
        response = requests.get(audio_url, stream=True)
        filename = f"{song_id}.mp3"
        filepath = os.path.join(SONGS_DIR, filename)
        
        with open(filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        # Update public_player/songs.json
        json_path = os.path.join(PUBLIC_PLAYER_DIR, "songs.json")
        songs_list = []
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                songs_list = json.load(f)
        
        # Check if exists
        if not any(s['id'] == song_id for s in songs_list):
            songs_list.insert(0, { # Add to top
                "id": song_id,
                "title": title,
                "file": f"songs/{filename}",
                "date": request.get("created_at", ""),
                "lyrics": request.get("lyrics", "")
            })
            
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(songs_list, f, ensure_ascii=False, indent=2)
                
        return {"status": "deployed", "path": filepath}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
