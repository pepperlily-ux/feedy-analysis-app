import { useState } from 'react'
import { analyzeFeedback } from '../utils/aiAnalyzer'

function Home() {
  const [activeTab, setActiveTab] = useState('학생')
  const [feedback, setFeedback] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  
  const tabs = ['학생', '강사', '기업', '입직원']
  
  const handleSubmit = async () => {
    if (!feedback.trim()) return
    
    setIsAnalyzing(true)
    
    // AI 분석 실행 (시뮬레이션)
    setTimeout(() => {
      const result = analyzeFeedback(feedback, activeTab)
      setAnalysis(result)
      
      // 로컬 스토리지에 저장
      const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
      existingFeedbacks.push({
        id: Date.now(),
        category: activeTab,
        content: feedback,
        analysis: result,
        date: new Date().toISOString()
      })
      localStorage.setItem('feedbacks', JSON.stringify(existingFeedbacks))
      
      setIsAnalyzing(false)
      setFeedback('')
    }, 1500)
  }
  
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-6xl font-bold mb-12" style={{ fontFamily: 'cursive' }}>
        Feedy
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 입력 영역 */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4">
            안녕하세요 수민님,<br />
            오늘의 피드백을 입력해주세요.
          </h2>
          
          {/* 탭 */}
          <div className="flex gap-2 mb-4">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* 입력 필드 */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="날짜를 입력해주세요."
            className="w-full h-32 p-4 border border-gray-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          <textarea
            placeholder="서비스에 대한 의견을 자유롭게 남겨주세요."
            className="w-full h-32 p-4 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          <button
            onClick={handleSubmit}
            disabled={isAnalyzing}
            className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-blue-600 transition disabled:bg-gray-300"
          >
            {isAnalyzing ? '분석 중...' : '제출하기'}
          </button>
          
          {/* 분석 결과 */}
          {analysis && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-green-800">✅ 분석 완료!</h3>
              <p className="text-gray-700 mb-4">{analysis.summary}</p>
              <div className="text-sm text-gray-600">
                Cards 페이지에서 전체 피드백을 확인하세요.
              </div>
            </div>
          )}
          
          {/* 하단 섹션 */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">인사이트 분석</h3>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">피드백 목록</h3>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">환경 설정</h3>
            </div>
          </div>
        </div>
        
        {/* 오른쪽: Main Insight */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg sticky top-8">
            <div className="text-sm mb-3 opacity-90">Main Insight</div>
            <h3 className="text-xl font-bold leading-relaxed">
              지금 가장 시급한 문제는 UI 복잡도이며, 튜토리얼 기능이 필요합니다.
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
