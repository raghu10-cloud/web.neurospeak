@echo off
title NeuroSpeak Unified Launcher
color 0B
echo =========================================================
echo       NEUROSPEAK ONE-CLICK LAUNCHER
echo =========================================================
echo.

:: 1. Add Windows Firewall Rules automatically (so ESP can connect)
echo [1/5] Configuring Windows Firewall...
netsh advfirewall firewall delete rule name="NeuroSpeak TCP 9000" >nul 2>&1
netsh advfirewall firewall add rule name="NeuroSpeak TCP 9000" dir=in action=allow protocol=TCP localport=9000 >nul 2>&1
netsh advfirewall firewall delete rule name="NeuroSpeak HTTP 8000" >nul 2>&1
netsh advfirewall firewall add rule name="NeuroSpeak HTTP 8000" dir=in action=allow protocol=TCP localport=8000 >nul 2>&1
echo Done.
echo.

:: 2. Backend Setup
echo [2/5] Setting up Backend Environment...
cd backend
if not exist "venv" (
    echo - Creating virtual environment...
    python -m venv venv
)
echo - Activating and verifying missing dependencies (fastapi, pydantic, etc)...
call venv\Scripts\activate.bat
pip install -r requirements.txt --quiet
echo Done.
echo.

:: 3. Start Backend Server
echo [3/5] Starting Backend (Port 8000 & TCP 9000)...
start "NeuroSpeak Backend Terminal" cmd /k "title NeuroSpeak Backend && call venv\Scripts\activate.bat && python main.py"
cd ..
echo Done.
echo.

:: 4. Dashboard Setup
echo [4/5] Setting up Dashboard (React/Vite)...
cd dashboard
if not exist "node_modules" (
    echo - Installing React dependencies (this takes a moment)...
    call npm install
)
echo Done.
echo.

:: 5. Start Dashboard Server
echo [5/5] Starting Dashboard and opening Browser...
start "NeuroSpeak Dashboard Terminal" cmd /k "title NeuroSpeak Dashboard && npm run dev"
cd ..

:: Wait a few seconds for servers to boot, then open browser
timeout /t 5 /nobreak > NUL
echo Opening Dashboard in Google Chrome...
start chrome "http://localhost:5173" || start http://localhost:5173

echo =========================================================
echo       SUCCESS! Everything is running.
echo       Check the two new terminal windows for logs.
echo =========================================================
pause
