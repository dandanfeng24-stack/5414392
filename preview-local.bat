@echo off
setlocal

cd /d "%~dp0"

echo.
echo ========================================
echo  Feiyi Zaowu - Local Preview
echo ========================================
echo.
echo Preview URL:
echo http://localhost:3000/
echo.
echo Starting local dev server...
echo Keep this window open while previewing the site.
echo Press Ctrl+C in this window to stop the server.
echo.

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm.cmd was not found. Please install Node.js first.
  echo.
  pause
  exit /b 1
)

start "" "http://localhost:3000/"
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000

echo.
echo Local preview server stopped.
echo.
pause
