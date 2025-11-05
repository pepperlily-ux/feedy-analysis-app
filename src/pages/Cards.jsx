import { useState, useEffect } from 'react'

function Cards() {
  const [feedbacks, setFeedbacks] = useState([])
  const [activeCategory, setActiveCategory] = useState('전체')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    setFeedbacks(stored.reverse()) // 최신순
  }, [])

  const categories = ['전체', '강사', '학생', '기업', '임직원']

  const filteredFeedbacks = activeCategory === '전체'
    ? feedbacks
    : feedbacks.filter(fb => fb.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">피드백 카드</h2>

      {/* 카테고리 필터 */}
      <div className="mb-6 flex gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeedbacks.map(fb => (
          <div key={fb.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                {fb.category}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(fb.date).toLocaleDateString('ko-KR')}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {fb.content}
            </p>
          </div>
        ))}

        {filteredFeedbacks.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            피드백이 없습니다. 홈에서 피드백을 입력해주세요!
          </div>
        )}
      </div>
    </div>
  )
}

export default Cards
