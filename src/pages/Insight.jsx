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
        description: `가장 시급한 문제는 실습 중 질문 접근성 부족이며, 실시간 Q&A 플랫폼과 AI 챗봇 도우미 개발을 추천합니다.`,
        priority: 'high',
        icon: '🚨'
      },
      problems: [
        {
          id: 1,
          title: '실습 중 질문 접근성 부족',
          description: '학생들이 실습 중 막힐 때 강사에게 질문하기 어렵고, 질문 기회가 제한적입니다. 수업 분위기상 질문하기 부담스러워하는 학생이 많습니다.',
          severity: 'high',
          affectedUsers: '68%',
          icon: '🙋'
        },
        {
          id: 2,
          title: '실습 진도 차이로 인한 학습 격차',
          description: '같은 반 내에서도 학생들의 실습 진도가 크게 차이나며, 빠른 학생은 기다려야 하고 느린 학생은 따라가기 힘들어합니다.',
          severity: 'high',
          affectedUsers: '73%',
          icon: '📊'
        },
        {
          id: 3,
          title: '실습 자료 접근성 문제',
          description: '실습 자료가 여러 곳에 흩어져 있어 찾기 어렵고, 복습할 때 필요한 자료를 못 찾는 경우가 많습니다.',
          severity: 'medium',
          affectedUsers: '52%',
          icon: '📚'
        }
      ],
      solutions: [
        {
          id: 1,
          title: '실시간 Q&A 플랫폼',
          description: '실습 중 익명으로 질문을 올리고, 강사나 다른 학생들이 답변할 수 있는 실시간 질문 게시판을 제공합니다. 질문 부담을 낮추고 즉각적인 도움을 받을 수 있습니다.',
          impact: 'high',
          effort: 'medium',
          expectedResult: '학생 질문률 85% 증가, 막힘 해소 시간 60% 단축',
          icon: '💬',
          tags: ['질문', '소통', '실시간']
        },
        {
          id: 2,
          title: 'AI 학습 도우미 챗봇',
          description: '실습 중 간단한 질문에 AI가 즉시 답변하고, 에러 메시지 해석 및 해결 방법을 제시합니다. 24/7 학습 지원이 가능합니다.',
          impact: 'high',
          effort: 'high',
          expectedResult: '즉각 응답률 90%, 반복 질문 50% 감소',
          icon: '🤖',
          tags: ['AI', '자동화', '학습지원']
        },
        {
          id: 3,
          title: '개인별 맞춤 진도 시스템',
          description: '각 학생의 진도를 추적하고, 수준에 맞는 추가 문제나 심화 과제를 자동으로 제공합니다. 빠른 학생에게는 챌린지를, 느린 학생에게는 보충 자료를 제공합니다.',
          impact: 'high',
          effort: 'medium',
          expectedResult: '학습 만족도 70% 향상, 학습 격차 40% 감소',
          icon: '🎯',
          tags: ['개인화', '적응학습', 'AI']
        },
        {
          id: 4,
          title: '통합 실습 자료 허브',
          description: '모든 실습 자료를 한 곳에 모아 검색 가능하게 하고, 수업별/주제별로 정리된 자료 라이브러리를 제공합니다. 북마크와 메모 기능으로 개인 학습을 지원합니다.',
          impact: 'medium',
          effort: 'low',
          expectedResult: '자료 찾기 시간 80% 단축, 복습 효율 65% 향상',
          icon: '📦',
          tags: ['자료관리', 'UX', '검색']
        },
        {
          id: 5,
          title: '피어 러닝 매칭 시스템',
          description: '비슷한 진도의 학생들을 자동으로 그룹화하여 함께 학습하고 서로 도울 수 있게 합니다. 강사 부담을 줄이고 협력 학습을 촉진합니다.',
          impact: 'medium',
          effort: 'medium',
          expectedResult: '학습 참여도 55% 증가, 강사 질문 부담 35% 감소',
          icon: '👥',
          tags: ['협업', '소셜러닝', '그룹화']
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
