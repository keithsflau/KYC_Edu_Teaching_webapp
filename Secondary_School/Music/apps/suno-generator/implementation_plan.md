# Suno Music Generator & Player - Implementation Plan

## Goal

Create a web application that:

1.  Connects to Suno AI using user credentials (cookie).
2.  Generates songs based on prompts.
3.  Allows immediate deployment of generated songs to a "Music Player".

## Architecture

- **Frontend**: React + Vite + Tailwind CSS.
  - Modern, dark-themed UI (Glassmorphism).
  - Tabs: "Generate", "Library", "Player".
- **Backend**: Python (FastAPI).
  - Handles communication with Suno (via unofficial API/requests).
  - Manages file downloads and storage.
- **Storage**: Local file system.

## Setup Steps

1.  **Project Initialization**

    - Create `frontend` (Vite) and `backend` (Python) directories.
    - Initialize `frontend` with React/Tailwind.
    - Initialize `backend` with `venv` and requirements.

2.  **Backend Development**

    - Install dependencies: `fastapi`, `uvicorn`, `requests`, `python-multipart`.
    - Implement `suno_client.py`: A wrapper to handle Suno API calls (generate, get_status, download).
      - _Note_: Since Suno does not have an official API, we will use a reverse-engineered approach requiring the user's `cookie`.
    - Implement `main.py`: API endpoints.
      - `POST /api/settings`: Save/Update credentials.
      - `POST /api/generate`: Trigger generation.
      - `GET /api/songs`: List generated songs.
      - `POST /api/deploy`: Copy song to the "Public Player" folder.

3.  **Frontend Development**

    - **Design System**: Pink/Purple gradients (Suno brand colors).
    - **Components**:
      - `SettingsModal`: To input `cookie` (sess-token).
      - `GeneratorForm`: Prompt input, Instrumental toggle, Style tags.
      - `SongList`: Display generating/completed songs with progress.
      - `AudioPlayer`: Custom player with waveform (visualizer if possible).
      - `DeployButton`: "Add to Playlist".

4.  **Integration & "Music Player"**

    - The "Music Player" can be a public standalone page `public_player/index.html` that reads from a `songs.json`.
    - When "Deploy" is clicked, the backend copies the MP3 to `public_player/songs/` and updates `public_player/songs.json`.

5.  **Deployment**
    - Ensure the app can be run locally (`npm run dev` + `uvicorn main:app`).

## Tech Stack

- **Frontend**: React, TailwindCSS, Lucide React (Icons).
- **Backend**: Python 3.11, FastAPI.
- **Tools**: `axios` for API calls.

## User Inputs

- **Suno Cookie**: The user needs to get this from their browser (Account logic).
- **Prompt**: Description of the song.

## Deliverables

- `apps/suno-generator/frontend`
- `apps/suno-generator/backend`
- `apps/suno-generator/public_player` (The lightweight player)
