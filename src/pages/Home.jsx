import { useState } from 'react'

function Home() {
  const [activeTab, setActiveTab] = useState('학생')
  const [feedback, setFeedback] = useState('')
  const [feedbackDate, setFeedbackDate] = useState('')

  const tabs = ['학생', '강사', '기업', '임직원']

  const handleSubmit = () => {
    if (!feedback.trim()) return

    // 로컬 스토리지에 저장
    const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    existingFeedbacks.push({
      id: Date.now(),
      category: activeTab,
      content: feedback,
      date: feedbackDate || new Date().toISOString()
    })
    localStorage.setItem('feedbacks', JSON.stringify(existingFeedbacks))

    alert('✅ 피드백이 저장되었습니다!')
    setFeedback('')
    setFeedbackDate('')
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-[40px] leading-[1.5] font-bold mb-6 text-gray-800">
        안녕하세요 수민님,<br />
        오늘의 피드백을 입력해주세요.
      </h2>

      <div className="flex gap-8">
        {/* 왼쪽: 입력 영역 (50%) */}
        <div className="w-[50%]">
          <div className="bg-white rounded-2xl shadow-[0px_1.32px_2.64px_-1.32px_rgba(0,0,0,0.10)] p-4">
            {/* 탭 */}
            <div className="bg-[#F0F2F5] rounded-[2.64px] p-[2.64px] mb-[10.58px] flex">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-[3.97px] text-xs font-normal transition ${
                    activeTab === tab
                      ? 'bg-[#198AFC] text-white'
                      : 'text-[#60758A] hover:text-gray-900'
                  }`}
                  style={{ lineHeight: '16px' }}
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
              className="w-full h-[35.70px] px-3 mb-[10.58px] bg-[#F5F7F8] border border-[#E5E7EB] rounded-[2.64px] text-sm text-[#60758A] focus:outline-none focus:ring-1 focus:ring-[#198AFC] focus:border-[#198AFC]"
              style={{ fontSize: '14px', lineHeight: '16px' }}
            />

            {/* 피드백 입력 */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="서비스에 대한 의견을 자유롭게 남겨주세요."
              className="w-full h-[409px] p-3 mb-[10.58px] bg-[#F5F7F8] border border-[#E5E7EB] rounded-[2.64px] text-sm text-[#60758A] resize-none focus:outline-none focus:ring-1 focus:ring-[#198AFC] focus:border-[#198AFC]"
              style={{ fontSize: '14px', lineHeight: '16px' }}
            />

            {/* 제출 버튼 */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#198AFC] text-white h-[54px] rounded-[2.64px] font-bold text-sm hover:bg-blue-600 transition"
              style={{ fontSize: '14px', lineHeight: '16px' }}
            >
              제출하기
            </button>
          </div>
        </div>

        {/* 오른쪽: 카드 그리드 (50%) */}
        <div className="w-[50%]">
          <div className="grid grid-cols-2 gap-4">
            {/* 카드 */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800">카드</h3>
            </div>

            {/* Main Insight 카드 */}
            <div className="aspect-square bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-center">
              <div className="text-xs mb-2 opacity-90">Main insight</div>
              <h3 className="text-base font-bold leading-relaxed">
                피드백을 수집하여 인사이트를 생성합니다.
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
