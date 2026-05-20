@echo off
setlocal

cd /d "%~dp0"

set "HTTP_PROXY=http://127.0.0.1:7897"
set "HTTPS_PROXY=http://127.0.0.1:7897"
set "http_proxy=http://127.0.0.1:7897"
set "https_proxy=http://127.0.0.1:7897"

echo.
echo ========================================
echo  Feiyi Zaowu - Upload to GitHub
echo ========================================
echo.
echo Proxy:
echo http://127.0.0.1:7897
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git was not found. Please install Git first.
  echo.
  pause
  exit /b 1
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm.cmd was not found. Please install Node.js first.
  echo.
  pause
  exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo [ERROR] This folder is not a Git repository.
  echo.
  pause
  exit /b 1
)

echo [1/7] Checking GitHub login status through proxy...
where gh >nul 2>nul
if errorlevel 1 (
  echo GitHub CLI was not found. Continuing with normal Git credentials.
) else (
  gh auth status >nul 2>nul
  if errorlevel 1 (
    echo.
    echo [WARNING] GitHub CLI login is missing or invalid.
    echo.
    echo This project uses your proxy. Please log in with:
    echo.
    echo   set "HTTP_PROXY=http://127.0.0.1:7897"
    echo   set "HTTPS_PROXY=http://127.0.0.1:7897"
    echo   gh auth login -h github.com
    echo.
    set /p LOGIN_NOW=Open GitHub login now in this window? Type y to login, or anything else to cancel upload: 
    if /i not "%LOGIN_NOW%"=="y" (
      echo.
      echo Upload cancelled.
      echo.
      pause
      exit /b 0
    )
    gh auth login -h github.com
    if errorlevel 1 (
      echo.
      echo [ERROR] GitHub login failed. Upload stopped.
      echo Please confirm your VPN/proxy is running, then try again.
      echo.
      pause
      exit /b 1
    )
  )
)

echo.
echo [2/7] Current changed files:
git status --short
echo.

echo [3/7] Change summary:
git diff --stat
echo.

echo Please check the list above carefully.
echo This script will upload all current Git changes after confirmation.
echo.
set /p CONTINUE_CHECK=Type y and press Enter to continue, or anything else to cancel: 
if /i not "%CONTINUE_CHECK%"=="y" (
  echo.
  echo Upload cancelled.
  echo.
  pause
  exit /b 0
)

echo.
echo [4/7] Running build check...
npm.cmd run build
if errorlevel 1 (
  echo.
  echo [ERROR] Build failed. Upload stopped.
  echo Please fix the website first, then run this file again.
  echo.
  pause
  exit /b 1
)

echo.
echo [5/7] Creating Git commit...
git add -A

git diff --cached --quiet
if errorlevel 1 (
  echo.
  set /p COMMIT_MSG=Commit message. Press Enter to use "Update website": 
  if "%COMMIT_MSG%"=="" set "COMMIT_MSG=Update website"
  git commit -m "%COMMIT_MSG%"
  if errorlevel 1 (
    echo.
    echo [ERROR] Git commit failed. Upload stopped.
    echo.
    pause
    exit /b 1
  )
) else (
  echo No staged changes to commit.
)

echo.
echo [6/7] Confirming remote repository...
git remote -v
echo.

echo [7/7] Pushing to GitHub through proxy...
git push
if errorlevel 1 (
  echo.
  echo [ERROR] GitHub upload failed.
  echo.
  echo Common fixes:
  echo 1. Make sure your VPN/proxy is running at 127.0.0.1:7897.
  echo 2. If credentials are invalid, run this while proxy is active:
  echo    set "HTTP_PROXY=http://127.0.0.1:7897"
  echo    set "HTTPS_PROXY=http://127.0.0.1:7897"
  echo    gh auth login -h github.com
  echo 3. Then run this file again.
  echo.
  pause
  exit /b 1
)

echo.
echo ========================================
echo  Upload complete. Vercel will deploy automatically.
echo ========================================
echo.
pause
