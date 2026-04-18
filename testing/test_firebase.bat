@echo off
title Firebase Dummy Sender
color 0A
echo =========================================================
echo       FIREBASE DUMMY DATA SENDER
echo =========================================================
echo.
echo Activating virtual environment...
cd ..
call backend\venv\Scripts\activate.bat

echo Starting dummy sender script...
echo.
python firebase_dummy_sender.py

pause
