@echo off
title NeuroSpeak System Architecture Info
color 0A
echo =========================================================
echo       NEUROSPEAK PORT ^& IP DIAGNOSTICS
echo =========================================================
echo.
echo [FRONTEND - React/Vite PWA]
echo Local URL:        http://localhost:5173
echo Network URL:      Vite dynamically assigns (usually http://[YOUR-IP]:5173)
echo Configuration:    Can be hosted remotely on Vercel. Use Settings tab to set Backend IP.
echo.
echo [BACKEND - Python/FastAPI Edge Node]
echo Local URL:        http://localhost:8000
echo Role:             Provides HTTP JSON data and WebSockets (Socket.IO) to Frontend.
echo Remote Access:    Run 'ngrok http 8000' or 'npx localtunnel --port 8000' to expose this globally!
echo.
echo [HARDWARE - ESP32 TCP Stream]
echo TCP Port:         9000
echo Role:             Raw string pipeline from Microcontroller to Python Memory.
echo.
echo [CLOUD - Firebase (Optional)]
echo Database:         https://neurotech-89e25-default-rtdb.firebaseio.com/secret.json
echo Scripts:          firebase_dummy_sender.py (Python), jerry_controller.html (Web)
echo.
echo =========================================================
echo Press any key to exit...
pause >nul
