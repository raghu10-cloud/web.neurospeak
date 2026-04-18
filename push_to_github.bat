@echo off
title Push to GitHub
color 0E
echo =========================================================
echo       PUSHING PROJECT TO GITHUB
echo =========================================================
echo.

echo [1/5] Initializing Git...
git init

echo [2/5] Deleting .gitignore...
if exist ".gitignore" del /f /q ".gitignore"

echo [3/5] Adding all files...
git add .

echo [4/5] Committing files...
git commit -m "Initial commit for NeuroSpeak Web"
git branch -M main

echo [5/5] Connecting to GitHub and pushing...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/raghu10-cloud/web.neurospeak.git
git push -u origin main --force

echo.
echo =========================================================
echo       DONE! Check your GitHub repository.
echo       (This script will now delete itself)
echo =========================================================
pause
(goto) 2>nul & del "%~f0"
