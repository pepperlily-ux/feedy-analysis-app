# Feedy - AI 기반 피드백 분석 및 기능 추천 서비스

사용자 피드백을 입력하면 AI가 분석하여 다음에 개발할 기능을 추천해주는 웹 서비스입니다.

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
cd feedy
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속!

## 📁 프로젝트 구조

```
feedy/
├── src/
│   ├── pages/
│   │   ├── Home.jsx      # 피드백 입력 페이지
│   │   ├── Cards.jsx     # 피드백 카드 뷰
│   │   └── List.jsx      # 인사이트 & 기능 추천
│   ├── utils/
│   │   └── aiAnalyzer.js # AI 분석 로직
│   ├── App.jsx           # 메인 앱
│   └── main.jsx          # 진입점
├── package.json
└── README.md
```

## 🎯 주요 기능

### 1️⃣ 피드백 입력 (Home)
- 4가지 카테고리 선택 (학생/강사/기업/임직원)
- 자유 형식 피드백 입력
- 실시간 AI 분석

### 2️⃣ 피드백 관리 (Cards)
- 카드 형태로 피드백 조회
- 카테고리별 필터링
- 날짜별 정렬

### 3️⃣ 인사이트 & 추천 (List)
- AI가 분석한 핵심 인사이트
- 우선순위별 기능 추천
- 백로그 추가 기능

## 💾 데이터 저장

현재는 브라우저의 `localStorage`에 저장됩니다.
- 피드백 데이터
- 분석 결과
- 추천 기능

## 🔧 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **React Router** - 라우팅
- **localStorage** - 로컬 데이터 저장

## 📝 TODO (향후 개선사항)

- [ ] 실제 AI API 연동 (Claude/GPT)
- [ ] 백엔드 서버 구축
- [ ] 데이터베이스 연동
- [ ] 사용자 인증
- [ ] 기능 백로그 관리
- [ ] 엑셀/CSV 내보내기
- [ ] 차트 및 통계

## 🌐 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드된 파일은 dist/ 폴더에 생성됩니다
```

Vercel, Netlify 등에 바로 배포 가능합니다!

## 📞 문의

문제가 있거나 제안사항이 있으면 이슈를 남겨주세요!
