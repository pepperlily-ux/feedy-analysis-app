import { useState, useEffect } from 'react'

function Insight() {
  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    byCategory: {}
  })
  const [insights, setInsights] = useState(null)

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

    // AI 인사이트 목업 생성
    if (stored.length > 0) {
      generateMockInsights(stored, categoryCount)
    }
  }, [])

  const generateMockInsights = (feedbacks, categoryCount) => {
    // 가장 많은 피드백을 받은 카테고리 찾기
    const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]

    const mockInsights = {
      mainIssue: {
        title: '가장 시급한 문제',
        category: topCategory[0],
        description: `${topCategory[0]} 카테고리에서 ${topCategory[1]}건의 피드백이 집중되어 있습니다. 이 영역의 개선이 가장 시급합니다.`,
        priority: 'high',
        icon: '🚨'
      },
      problems: [
        {
          id: 1,
          title: 'UI 복잡도 문제',
          description: '사용자들이 인터페이스가 복잡하다고 느끼고 있습니다. 핵심 기능을 찾기 어렵다는 의견이 다수입니다.',
          severity: 'high',
          affectedUsers: '62%',
          icon: '⚠️'
        },
        {
          id: 2,
          title: '온보딩 경험 부족',
          description: '처음 사용하는 사용자들이 서비스 사용법을 이해하는데 어려움을 겪고 있습니다.',
          severity: 'medium',
          affectedUsers: '45%',
          icon: '📚'
        },
        {
          id: 3,
          title: '응답 속도 개선 필요',
          description: '일부 기능에서 로딩 시간이 길다는 피드백이 있습니다.',
          severity: 'medium',
          affectedUsers: '28%',
          icon: '⏱️'
        }
      ],
      solutions: [
        {
          id: 1,
          title: '인터랙티브 온보딩 튜토리얼',
          description: '첫 사용자에게 단계별 가이드를 제공하여 5분 안에 핵심 기능을 경험할 수 있게 합니다.',
          impact: 'high',
          effort: 'medium',
          expectedResult: '신규 사용자 이탈률 40% 감소 예상',
          icon: '🎯',
          tags: ['UX', '온보딩', '사용성']
        },
        {
          id: 2,
          title: 'UI 간소화 및 재설계',
          description: '핵심 기능을 우선순위에 따라 배치하고, 고급 기능은 접을 수 있는 메뉴로 정리합니다.',
          impact: 'high',
          effort: 'high',
          expectedResult: '작업 완료 시간 30% 단축',
          icon: '✨',
          tags: ['UI/UX', '디자인', '효율성']
        },
        {
          id: 3,
          title: '성능 최적화',
          description: '이미지 레이지 로딩과 캐싱 전략을 도입하여 로딩 속도를 개선합니다.',
          impact: 'medium',
          effort: 'low',
          expectedResult: '페이지 로딩 속도 50% 개선',
          icon: '⚡',
          tags: ['성능', '최적화', '기술']
        },
        {
          id: 4,
          title: '퀵 액션 메뉴',
          description: '자주 사용하는 기능에 빠르게 접근할 수 있는 단축키와 플로팅 버튼을 제공합니다.',
          impact: 'medium',
          effort: 'low',
          expectedResult: '반복 작업 시간 60% 단축',
          icon: '🚀',
          tags: ['생산성', 'UX', '편의성']
        }
      ]
    }

    setInsights(mockInsights)
  }

  const categories = ['학생', '강사', '기업', '임직원']

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">AI 인사이트</h2>

      {feedbacks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">아직 피드백이 없습니다</h3>
          <p className="text-gray-500">홈 페이지에서 피드백을 입력하면 AI가 자동으로 인사이트를 생성합니다!</p>
        </div>
      ) : (
        <>
          {/* 전체 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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

          {insights && (
            <>
              {/* 메인 이슈 카드 */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 mb-12 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{insights.mainIssue.icon}</span>
                  <div>
                    <div className="text-sm mb-1 opacity-90">{insights.mainIssue.title}</div>
                    <h3 className="text-2xl font-bold">{insights.mainIssue.description}</h3>
                  </div>
                </div>
              </div>

              {/* 문제점 분석 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🔍</span>
                  발견된 문제점
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {insights.problems.map(problem => (
                    <div key={problem.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-400 transition shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-3xl">{problem.icon}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          problem.severity === 'high'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {problem.severity === 'high' ? '높음' : '보통'}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold mb-2 text-gray-800">{problem.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{problem.description}</p>

                      <div className="pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">영향받는 사용자</div>
                        <div className="text-2xl font-bold text-orange-600">{problem.affectedUsers}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 해결 방안 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>💡</span>
                  AI 추천 해결방안
                </h3>

                <div className="space-y-6">
                  {insights.solutions.map((solution, index) => (
                    <div key={solution.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                            {solution.icon}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-xl font-bold text-gray-800">{solution.title}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  solution.impact === 'high'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {solution.impact === 'high' ? '높은 효과' : '중간 효과'}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-3">{solution.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 mb-4">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">구현 난이도</div>
                              <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                  <div
                                    key={i}
                                    className={`w-8 h-2 rounded-full ${
                                      (solution.effort === 'low' && i <= 1) ||
                                      (solution.effort === 'medium' && i <= 2) ||
                                      (solution.effort === 'high' && i <= 3)
                                        ? 'bg-purple-500'
                                        : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">예상 효과</div>
                              <div className="text-sm font-semibold text-green-600">{solution.expectedResult}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {solution.tags.map((tag, i) => (
                              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition font-semibold text-sm">
                            백로그에 추가
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 최근 피드백 */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>📝</span>
                  최근 피드백
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedbacks.slice(0, 6).map((fb) => (
                    <div key={fb.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                          {fb.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(fb.date).toLocaleDateString('ko-KR')}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm line-clamp-2">
                        {fb.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Insight
