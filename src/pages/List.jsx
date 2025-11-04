import { useState, useEffect } from 'react'
import { getMainInsight, getFeatureRecommendations } from '../utils/aiAnalyzer'

function List() {
  const [insight, setInsight] = useState('')
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')

    if (feedbacks.length > 0) {
      // 전체 피드백 기반으로 메인 인사이트 생성
      const mainInsight = getMainInsight(feedbacks)
      setInsight(mainInsight)

      // 기능 추천 생성
      const recs = getFeatureRecommendations(feedbacks)
      setRecommendations(recs)
    } else {
      setInsight('지금 가장 시급한 문제는 UI 복잡도이며, 튜토리얼 기능이 필요합니다.')
      setRecommendations([
        {
          id: 1,
          title: '인터랙티브 온보딩 가이드',
          description: '첫 사용자에게 단계별 가이드를 제공하여 빠르게 서비스를 이해할 수 있게 합니다.',
          reason: 'UI가 복잡하다는 피드백이 많아, 초기 진입장벽을 낮추는 것이 우선입니다.',
          priority: 'high'
        },
        {
          id: 2,
          title: 'UI 간소화 모드',
          description: '고급 기능을 숨기고 핵심 기능만 보여주는 심플 모드를 제공합니다.',
          reason: '복잡도 문제를 근본적으로 해결하기 위해 뷰 옵션이 필요합니다.',
          priority: 'medium'
        }
      ])
    }
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* 메인 인사이트 카드 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 mb-12 shadow-lg">
        <div className="text-sm mb-2 opacity-90">핵심 인사이트</div>
        <h2 className="text-2xl font-bold leading-relaxed">
          {insight}
        </h2>
      </div>
      
      {/* 기능 추천 카드 */}
      <div>
        <h3 className="text-2xl font-bold mb-6">🧠 AI 기능 추천</h3>
        
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div 
              key={rec.id} 
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {index === 0 ? '🪄' : '⚡'}
                    </span>
                    <h4 className="text-xl font-bold">{rec.title}</h4>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    rec.priority === 'high' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {rec.priority === 'high' ? '높은 우선순위' : '중간 우선순위'}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">기능 설명</p>
                <p className="text-gray-700">{rec.description}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">추천 이유</p>
                <p className="text-gray-700">{rec.reason}</p>
              </div>
              
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                  백로그에 추가
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {recommendations.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          홈에서 피드백을 입력하면 AI가 기능을 추천해드립니다!
        </div>
      )}
    </div>
  )
}

export default List
