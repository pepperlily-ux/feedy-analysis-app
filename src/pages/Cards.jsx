import { useState, useEffect } from 'react'

function Cards() {
  const [feedbacks, setFeedbacks] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    emotion: [],
    autoTag: []
  })
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    setFeedbacks(stored.reverse()) // 최신순
  }, [])

  const categories = ['강사', '학생', '기업', '임직원']
  const emotions = ['긍정', '부정']
  const autoTags = ['강사', '강사', '린트드']

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => {
      const current = prev[type]
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter(v => v !== value) }
      } else {
        return { ...prev, [type]: [...current, value] }
      }
    })
  }

  const filteredFeedbacks = feedbacks.filter(fb => {
    if (activeFilters.category.length > 0 && !activeFilters.category.includes(fb.category)) {
      return false
    }

    // 날짜 필터링
    if (dateRange.start || dateRange.end) {
      const fbDate = new Date(fb.date).toISOString().split('T')[0]
      if (dateRange.start && fbDate < dateRange.start) return false
      if (dateRange.end && fbDate > dateRange.end) return false
    }

    return true
  })

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex gap-8">
        {/* 왼쪽: 필터 */}
        <div className="w-64 flex-shrink-0">
          <div className="mb-8">
            <h3 className="font-bold mb-3">구분</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleFilter('category', cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeFilters.category.includes(cat)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-bold mb-3">감정</h3>
            <div className="flex flex-wrap gap-2">
              {emotions.map(emotion => (
                <button
                  key={emotion}
                  onClick={() => toggleFilter('emotion', emotion)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeFilters.emotion.includes(emotion)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-bold mb-3">날짜</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">시작일</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">종료일</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {(dateRange.start || dateRange.end) && (
                <button
                  onClick={() => setDateRange({ start: '', end: '' })}
                  className="w-full px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition"
                >
                  초기화
                </button>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-bold mb-3">자동태그</h3>
            <div className="flex flex-wrap gap-2">
              {autoTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleFilter('autoTag', tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeFilters.autoTag.includes(tag)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 오른쪽: 카드 그리드 */}
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">총 {filteredFeedbacks.length}개</h2>
          </div>
          
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
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {fb.content}
                </p>
                
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <span className="text-xl">😊</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    긍정
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {fb.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    린트드
                  </span>
                </div>
              </div>
            ))}
            
            {filteredFeedbacks.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400">
                피드백이 없습니다. 홈에서 피드백을 입력해주세요!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
