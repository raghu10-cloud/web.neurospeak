@echo off
title NeuroSpeak Dashboard Launcher
echo ==================================================
echo   NeuroSpeak Dashboard Launcher (Testing)
echo ==================================================
echo.
cd ..\dashboard

if not exist "node_modules" (
    echo [Dashboard] Installing React dependencies...
    call npm install
)

echo.
echo [Dashboard] Starting Vite Development Server...
echo [Dashboard] URL: http://localhost:5173
echo.
call npm run dev

pause
