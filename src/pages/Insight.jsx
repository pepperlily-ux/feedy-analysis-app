import { useState, useEffect } from 'react'

function Insight() {
  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    byCategory: {}
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('feedbacks') || '[]')
    setFeedbacks(stored)

    // 통계 계산
    const categoryCount = {}
    stored.forEach(fb => {
      categoryCount[fb.category] = (categoryCount[fb.category] || 0) + 1
    })

    setStats({
      total: stored.length,
      byCategory: categoryCount
    })
  }, [])

  const categories = ['학생', '강사', '기업', '임직원']

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">인사이트</h2>

      {/* 전체 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="text-sm text-gray-500 mb-2">전체 피드백</div>
          <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
        </div>

        {categories.map(cat => (
          <div key={cat} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-sm text-gray-500 mb-2">{cat}</div>
            <div className="text-3xl font-bold text-gray-800">{stats.byCategory[cat] || 0}</div>
          </div>
        ))}
      </div>

      {/* 메인 인사이트 카드 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 mb-12 shadow-lg">
        <div className="text-sm mb-2 opacity-90">핵심 인사이트</div>
        <h3 className="text-2xl font-bold leading-relaxed">
          {stats.total > 0
            ? `총 ${stats.total}개의 피드백이 수집되었습니다. 카테고리별로 의견을 확인해보세요.`
            : '피드백을 수집하여 인사이트를 생성합니다.'
          }
        </h3>
      </div>

      {/* 최근 피드백 */}
      <div>
        <h3 className="text-2xl font-bold mb-6">최근 피드백</h3>

        <div className="space-y-4">
          {feedbacks.slice(0, 5).map((fb, index) => (
            <div key={fb.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                    {fb.category}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(fb.date).toLocaleDateString('ko-KR')}
                </span>
              </div>

              <p className="text-gray-700 line-clamp-2">
                {fb.content}
              </p>
            </div>
          ))}

          {feedbacks.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">아직 피드백이 없습니다</h3>
              <p className="text-gray-500">홈 페이지에서 피드백을 입력하면 인사이트를 확인할 수 있습니다!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Insight
