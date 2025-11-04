import { useState } from 'react'
import { analyzeFeedback } from '../utils/aiAnalyzer'

function Home() {
  const [activeTab, setActiveTab] = useState('학생')
  const [feedback, setFeedback] = useState('')
  const [feedbackDate, setFeedbackDate] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const tabs = ['학생', '강사', '기업', '임직원']

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
        date: feedbackDate || new Date().toISOString()
      })
      localStorage.setItem('feedbacks', JSON.stringify(existingFeedbacks))

      setIsAnalyzing(false)
      setFeedback('')
      setFeedbackDate('')
    }, 1500)
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">
        안녕하세요 수민님,<br />
        오늘의 피드백을 입력해주세요.
      </h2>

      <div className="flex gap-8">
        {/* 왼쪽: 입력 영역 (60%) */}
        <div className="w-[60%]">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* 탭 */}
            <div className="bg-gray-100 rounded-md p-1 mb-4 flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-2 rounded text-sm font-medium transition ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 날짜 입력 */}
            <input
              type="date"
              value={feedbackDate}
              onChange={(e) => setFeedbackDate(e.target.value)}
              placeholder="날짜를 입력해주세요."
              className="w-full h-10 px-3 mb-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />

            {/* 피드백 입력 */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="서비스에 대한 의견을 자유롭게 남겨주세요."
              className="w-full h-64 p-3 mb-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />

            {/* 제출 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={isAnalyzing}
              className="w-full bg-primary text-white py-3 rounded-md font-bold text-sm hover:bg-blue-600 transition disabled:bg-gray-300"
            >
              {isAnalyzing ? '분석 중...' : '제출하기'}
            </button>
          </div>

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
        </div>

        {/* 오른쪽: 카드 그리드 (40%) */}
        <div className="w-[40%]">
          <div className="grid grid-cols-2 gap-4">
            {/* 카드 */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800">카드</h3>
            </div>

            {/* Main Insight 카드 */}
            <div className="aspect-square bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center">
              <div className="text-xs mb-2 opacity-90">Main insight</div>
              <h3 className="text-base font-bold leading-relaxed">
                지금 가장 시급한 문제는 UI 복잡도이며, 튜토리얼 기능이 필요합니다.
              </h3>
            </div>

            {/* 목록 */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800">목록</h3>
            </div>

            {/* 설정 */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800">설정</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
