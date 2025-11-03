#!/bin/bash

echo "🚀 Feedy 시작합니다..."
echo ""

# Node.js 확인
if ! command -v node &> /dev/null
then
    echo "❌ Node.js가 설치되어 있지 않습니다."
    echo "https://nodejs.org 에서 설치해주세요."
    exit 1
fi

echo "✅ Node.js 버전: $(node --version)"
echo ""

# node_modules 확인
if [ ! -d "node_modules" ]; then
    echo "📦 패키지 설치 중..."
    npm install
    echo ""
fi

echo "🌐 개발 서버 시작..."
echo "브라우저에서 http://localhost:3000 을 열어주세요!"
echo ""
echo "종료하려면 Ctrl+C 를 누르세요."
echo ""

npm run dev
