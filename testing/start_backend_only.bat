@echo off
title NeuroSpeak Backend Launcher
echo ==================================================
echo   NeuroSpeak Backend Launcher (Testing)
echo ==================================================
echo.
cd ..\backend

:: Activate venv
if not exist "venv" (
    echo [Backend] Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
echo [Backend] Checking and installing requirements...
pip install -r requirements.txt

echo.
echo [Backend] Starting NeuroSpeak backend...
echo [Backend] HTTP/WebSocket: http://0.0.0.0:8000
echo [Backend] TCP Listener:   tcp://0.0.0.0:9000
echo [Backend] ESP32 should connect to 192.168.137.1:9000
echo.
python main.py

pause
