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
echo A separate server window will stay open while previewing the site.
echo Close that server window or press Ctrl+C inside it to stop previewing.
echo.

where node.exe >nul 2>nul
if errorlevel 1 (
  echo [ERROR] node.exe was not found. Please install Node.js first.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\next\dist\bin\next" (
  echo [ERROR] Next.js was not found in node_modules.
  echo Please run npm.cmd install first.
  echo.
  pause
  exit /b 1
)

start "Feiyi Zaowu Dev Server" /D "%~dp0" cmd /k "node.exe node_modules\next\dist\bin\next dev --hostname 127.0.0.1 --port 3000"
ping 127.0.0.1 -n 6 >nul
start "" "http://localhost:3000/"

echo.
echo Preview opened: http://localhost:3000/
echo You can close this helper window now.
ping 127.0.0.1 -n 3 >nul
