import { useState, useEffect } from 'react'

function Insight() {
  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    byCategory: {}
  })
  const [insights, setInsights] = useState(null)
  const [selectedProblem, setSelectedProblem] = useState(null)

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
      setSelectedProblem(1) // 첫 번째 문제를 기본 선택
    }
  }, [])

  const generateMockInsights = (feedbacks, categoryCount) => {
    // 가장 많은 피드백을 받은 카테고리 찾기
    const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]

    const mockInsights = {
      mainIssue: {
        title: '가장 시급한 문제',
        category: topCategory[0],
        description: `가장 시급한 문제는 실습 중 질문 접근성 부족이며, 실시간 Q&A 플랫폼 개발을 추천합니다.`,
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
          icon: '🙋',
          relatedFeedbacks: feedbacks.slice(0, 3), // 근거가 되는 피드백
          solution: {
            title: '실시간 Q&A 플랫폼',
            description: '실습 중 익명으로 질문을 올리고, 강사나 다른 학생들이 답변할 수 있는 실시간 질문 게시판을 제공합니다.',
            details: '질문 부담을 낮추고 즉각적인 도움을 받을 수 있습니다. 학생들은 수업 중 언제든 질문을 올릴 수 있고, 강사와 다른 학생들이 실시간으로 답변합니다.',
            impact: 'high',
            effort: 'medium',
            expectedResult: '학생 질문률 85% 증가, 막힘 해소 시간 60% 단축',
            icon: '💬',
            tags: ['질문', '소통', '실시간'],
            sketchImage: 'https://via.placeholder.com/800x500/667eea/ffffff?text=Q%26A+Platform+Sketch'
          }
        },
        {
          id: 2,
          title: '실습 진도 차이로 인한 학습 격차',
          description: '같은 반 내에서도 학생들의 실습 진도가 크게 차이나며, 빠른 학생은 기다려야 하고 느린 학생은 따라가기 힘들어합니다.',
          severity: 'high',
          affectedUsers: '73%',
          icon: '📊',
          relatedFeedbacks: feedbacks.slice(0, 2),
          solution: {
            title: '개인별 맞춤 진도 시스템',
            description: '각 학생의 진도를 추적하고, 수준에 맞는 추가 문제나 심화 과제를 자동으로 제공합니다.',
            details: '빠른 학생에게는 챌린지 과제를, 느린 학생에게는 보충 자료와 추가 설명을 제공합니다. AI가 학습 패턴을 분석하여 최적의 학습 경로를 제안합니다.',
            impact: 'high',
            effort: 'medium',
            expectedResult: '학습 만족도 70% 향상, 학습 격차 40% 감소',
            icon: '🎯',
            tags: ['개인화', '적응학습', 'AI'],
            sketchImage: 'https://via.placeholder.com/800x500/f093fb/ffffff?text=Adaptive+Learning+System'
          }
        },
        {
          id: 3,
          title: '실습 자료 접근성 문제',
          description: '실습 자료가 여러 곳에 흩어져 있어 찾기 어렵고, 복습할 때 필요한 자료를 못 찾는 경우가 많습니다.',
          severity: 'medium',
          affectedUsers: '52%',
          icon: '📚',
          relatedFeedbacks: feedbacks.slice(0, 2),
          solution: {
            title: '통합 실습 자료 허브',
            description: '모든 실습 자료를 한 곳에 모아 검색 가능하게 하고, 수업별/주제별로 정리된 자료 라이브러리를 제공합니다.',
            details: '북마크와 메모 기능으로 개인 학습을 지원하고, AI 검색으로 원하는 자료를 빠르게 찾을 수 있습니다. 자료 간 연관성도 시각화하여 학습 흐름을 파악할 수 있습니다.',
            impact: 'medium',
            effort: 'low',
            expectedResult: '자료 찾기 시간 80% 단축, 복습 효율 65% 향상',
            icon: '📦',
            tags: ['자료관리', 'UX', '검색'],
            sketchImage: 'https://via.placeholder.com/800x500/4facfe/ffffff?text=Resource+Hub+Design'
          }
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

              {/* 문제점 분석 - 탭 형태 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🔍</span>
                  발견된 문제점
                </h3>

                {/* 문제점 탭 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {insights.problems.map(problem => (
                    <button
                      key={problem.id}
                      onClick={() => setSelectedProblem(problem.id)}
                      className={`bg-white border-2 rounded-xl p-6 transition shadow-sm text-left ${
                        selectedProblem === problem.id
                          ? 'border-orange-500 shadow-lg'
                          : 'border-gray-200 hover:border-orange-400'
                      }`}
                    >
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
                    </button>
                  ))}
                </div>

                {/* 선택된 문제점의 상세 내용 */}
                {selectedProblem && insights.problems.find(p => p.id === selectedProblem) && (
                  <div className="bg-gray-50 rounded-2xl p-8">
                    {(() => {
                      const problem = insights.problems.find(p => p.id === selectedProblem)
                      return (
                        <>
                          {/* 근거 피드백 목록 */}
                          <div className="mb-8">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                              <span>📝</span>
                              근거 피드백
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {problem.relatedFeedbacks && problem.relatedFeedbacks.length > 0 ? (
                                problem.relatedFeedbacks.map((fb) => (
                                  <div key={fb.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                      <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                                        {fb.category}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {new Date(fb.date).toLocaleDateString('ko-KR')}
                                      </span>
                                    </div>

                                    <p className="text-gray-700 text-sm">
                                      {fb.content}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <div className="col-span-full text-center py-8 text-gray-400">
                                  관련 피드백이 없습니다.
                                </div>
                              )}
                            </div>
                          </div>

                          {/* AI 추천 해결방안 */}
                          <div>
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                              <span>💡</span>
                              AI 추천 해결방안
                            </h4>

                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                              <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                                    {problem.solution.icon}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h5 className="text-2xl font-bold text-gray-800">{problem.solution.title}</h5>
                                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                                      problem.solution.impact === 'high'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                    }`}>
                                      {problem.solution.impact === 'high' ? '높은 효과' : '중간 효과'}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 text-lg mb-2">{problem.solution.description}</p>
                                  <p className="text-gray-600 text-sm">{problem.solution.details}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                                <div>
                                  <div className="text-sm text-gray-500 mb-2">구현 난이도</div>
                                  <div className="flex gap-1">
                                    {[1, 2, 3].map(i => (
                                      <div
                                        key={i}
                                        className={`w-10 h-3 rounded-full ${
                                          (problem.solution.effort === 'low' && i <= 1) ||
                                          (problem.solution.effort === 'medium' && i <= 2) ||
                                          (problem.solution.effort === 'high' && i <= 3)
                                            ? 'bg-purple-500'
                                            : 'bg-gray-200'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <div className="text-sm text-gray-500 mb-2">예상 효과</div>
                                  <div className="text-base font-semibold text-green-600">{problem.solution.expectedResult}</div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-6">
                                {problem.solution.tags.map((tag, i) => (
                                  <span key={i} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* 프로덕트 아이디어 스케치 */}
                              <div>
                                <h6 className="text-sm font-bold text-gray-700 mb-3">프로덕트 아이디어 스케치</h6>
                                <div className="rounded-xl overflow-hidden border border-gray-200">
                                  <img
                                    src={problem.solution.sketchImage}
                                    alt={`${problem.solution.title} sketch`}
                                    className="w-full h-auto"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Insight
