import { useState, useEffect } from 'react'

function List() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    setFeedbacks(stored.reverse()) // 최신순
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">피드백 히스토리</h1>
        <p className="text-gray-600">지금까지 입력한 모든 피드백을 확인할 수 있습니다.</p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700">총 {feedbacks.length}개의 피드백</p>
      </div>

      <div className="space-y-4">
        {feedbacks.map((fb, index) => (
          <div key={fb.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-400">#{feedbacks.length - index}</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                  {fb.category}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(fb.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {fb.content}
            </p>
          </div>
        ))}

        {feedbacks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">아직 피드백이 없습니다</h3>
            <p className="text-gray-500">홈 페이지에서 첫 피드백을 입력해보세요!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
