# Suno Generator & Music Player Setup

This application consists of two parts:

1.  **AI Music Generator**: A local tool to generate songs using your Suno account.
2.  **Music Gallery**: A static web page to display and play the deployed songs.

## 🚀 Quick Start (Windows)

Simply double-click **`start_app.bat`** in this directory!

This will:

1.  Install all Python/Node dependencies automatically.
2.  Start the Backend Server.
3.  Start the Frontend Interface.
4.  Open the App in your browser.

## 📦 Manual Setup

### 1. Start the Backend (API)

The backend handles communication with Suno and file management.

1.  Open a terminal in `apps/suno-generator/backend`.
2.  Activate the virtual environment:
    ```powershell
    .\venv\Scripts\Activate
    ```
3.  Run the server:
    ```powershell
    python main.py
    ```
    _The server will start at http://localhost:8000_

### 2. Start the Frontend (Generator UI)

The interface for generating songs.

1.  Open a NEW terminal in `apps/suno-generator/frontend`.
2.  Run the development server:
    ```powershell
    npm run dev
    ```
3.  Open the link shown (usually http://localhost:5173).

---

## 🎵 Usage Guide

1.  **Get your Suno Cookie**:

    - Go to [suno.com](https://suno.com) and log in.
    - Open Developer Tools (F12) -> Network tab.
    - Refresh the page.
    - Click on any request (e.g., `me` or `feed`).
    - Scroll down to "Request Headers" and copy the entire `Cookie` value.

2.  **Configure App**:

    - In the Generator App, go to the **Settings** tab.
    - Paste your cookie and click **Save Credentials**.

3.  **Generate**:

    - Go to **Generate** tab.
    - Enter a prompt (e.g., "A powerful rock anthem about physics").
    - Click Generate.

4.  **Deploy**:

    - Once a song is generated (Wait for it to appear in the list), click **Deploy**.
    - The song will be downloaded and added to the **Music Gallery**.

5.  **View Gallery**:
    - Open `apps/suno-generator/public_player/index.html` in your browser.
    - Your new song should be there!
