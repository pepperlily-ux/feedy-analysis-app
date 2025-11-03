@echo off
chcp 65001 >nul
echo 🚀 Feedy 시작합니다...
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js가 설치되어 있지 않습니다.
    echo https://nodejs.org 에서 설치해주세요.
    pause
    exit /b 1
)

echo ✅ Node.js가 설치되어 있습니다.
echo.

if not exist "node_modules" (
    echo 📦 패키지 설치 중...
    call npm install
    echo.
)

echo 🌐 개발 서버 시작...
echo 브라우저에서 http://localhost:3000 을 열어주세요!
echo.
echo 종료하려면 Ctrl+C 를 누르세요.
echo.

call npm run dev
