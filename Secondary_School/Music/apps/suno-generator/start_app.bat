@echo off
title Suno Generator Launcher
color 0b

echo ========================================================
echo   Starting Suno Generator App
echo ========================================================
echo.

:: Ensure we are in the script directory
cd /d "%~dp0"

echo [1/2] Launching Backend Service...
:: Start Backend in a new window. Checks for venv existence to auto-setup if needed.
start "Suno Backend" cmd /k "cd backend && if not exist venv (echo Setting up Python Environment... && python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt) else (call venv\Scripts\activate) && python main.py"

echo [2/2] Launching Frontend Interface...
:: Start Frontend in a new window. Checks for node_modules to auto-install if needed.
start "Suno Frontend" cmd /k "cd frontend && if not exist node_modules (echo Installing Node Dependencies... && npm install) && npm run dev"

echo.
echo Waiting for services to spin up (approx 5 seconds)...
timeout /t 5 >nul

echo.
echo Opening Application in default browser...
start http://localhost:5173

echo.
echo ========================================================
echo   System Running!
echo   * Keep the pop-up terminal windows OPEN.
echo   * Close them to stop the application.
echo ========================================================
echo.
exit
