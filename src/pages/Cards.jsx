import { useState, useEffect } from 'react'

function Cards() {
  const [cards, setCards] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    autoTag: [],
    practiceType: []
  })
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  useEffect(() => {
    // 항상 8개 더미 카드 표시
    setCards(getDummyCards())
  }, [])

  // 피드백에서 핵심 문장 추출 및 카드 생성
  const extractKeyInsights = (feedbacks) => {
    const cards = []

    feedbacks.forEach((fb) => {
      // 피드백 내용을 문장으로 분리
      const sentences = fb.content.split(/[.!?]\s+/).filter(s => s.trim().length > 10)

      // 각 피드백에서 최대 2개의 중요 문장 추출
      sentences.slice(0, 2).forEach((sentence, sentenceIndex) => {
        const autoTags = generateAutoTags(sentence)

        cards.push({
          id: `${fb.id}-${sentenceIndex}`,
          category: fb.category,
          content: sentence.trim(),
          date: fb.date,
          autoTags: autoTags
        })
      })
    })

    return cards.slice(0, 8) // 최대 8개만 표시
  }

  // 더미 카드 데이터
  const getDummyCards = () => {
    const practiceTypes = ['제품팀 정기 실습', '지피터스 18기 스터디 실습', 'SKT B2B 실습']

    return [
      {
        id: 1,
        category: '학생',
        content: '실습 중 막힐 때 질문하기 어려워요',
        date: new Date().toISOString(),
        autoTags: ['질문'],
        practiceType: practiceTypes[0]
      },
      {
        id: 2,
        category: '학생',
        content: '진도가 너무 빨라서 따라가기 힘들어요',
        date: new Date().toISOString(),
        autoTags: ['진도'],
        practiceType: practiceTypes[1]
      },
      {
        id: 3,
        category: '강사',
        content: '학생들의 이해도를 실시간으로 파악하기 어렵습니다',
        date: new Date().toISOString(),
        autoTags: ['이해도'],
        practiceType: practiceTypes[2]
      },
      {
        id: 4,
        category: '학생',
        content: '실습 자료를 찾기가 너무 어려워요',
        date: new Date().toISOString(),
        autoTags: ['자료'],
        practiceType: practiceTypes[0]
      },
      {
        id: 5,
        category: '기업',
        content: '수강생들의 실력 편차가 너무 큽니다',
        date: new Date().toISOString(),
        autoTags: ['수준차이'],
        practiceType: practiceTypes[1]
      },
      {
        id: 6,
        category: '강사',
        content: '같은 질문이 반복되어 시간이 많이 소요됩니다',
        date: new Date().toISOString(),
        autoTags: ['FAQ'],
        practiceType: practiceTypes[2]
      },
      {
        id: 7,
        category: '학생',
        content: '혼자 복습할 때 막히는 부분이 많아요',
        date: new Date().toISOString(),
        autoTags: ['복습'],
        practiceType: practiceTypes[0]
      },
      {
        id: 8,
        category: '임직원',
        content: '학습 진행 상황을 체계적으로 관리하기 어렵습니다',
        date: new Date().toISOString(),
        autoTags: ['진도관리'],
        practiceType: practiceTypes[1]
      }
    ]
  }

  // 문장 내용 기반으로 자동 태그 생성
  const generateAutoTags = (sentence) => {
    const tags = []
    const lowerSentence = sentence.toLowerCase()

    // 키워드 기반 태그 매핑
    const tagMap = {
      '질문': ['질문', '소통'],
      '어려': ['난이도', '학습지원'],
      '막히': ['질문', '학습지원'],
      '진도': ['진도', '학습속도'],
      '자료': ['자료', '접근성'],
      '찾': ['검색', '접근성'],
      '이해': ['이해도', '학습'],
      '반복': ['FAQ', '효율성'],
      '편차': ['수준차이', '맞춤학습'],
      '복습': ['복습', '자습'],
      '관리': ['진도관리', '분석']
    }

    // 키워드 매칭으로 태그 추가
    Object.entries(tagMap).forEach(([keyword, relatedTags]) => {
      if (lowerSentence.includes(keyword)) {
        tags.push(...relatedTags)
      }
    })

    // 중복 제거 및 1개만 반환
    return [...new Set(tags)].slice(0, 1)
  }

  const categories = ['강사', '학생', '기업', '임직원']
  const practiceTypes = ['제품팀 정기 실습', '지피터스 18기 스터디 실습', 'SKT B2B 실습']

  // 모든 카드에서 자동태그 추출
  const allAutoTags = [...new Set(cards.flatMap(card => card.autoTags))]

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

  const filteredCards = cards.filter(card => {
    // 카테고리 필터
    if (activeFilters.category.length > 0 && !activeFilters.category.includes(card.category)) {
      return false
    }

    // 자동태그 필터
    if (activeFilters.autoTag.length > 0) {
      const hasMatchingTag = card.autoTags.some(tag => activeFilters.autoTag.includes(tag))
      if (!hasMatchingTag) return false
    }

    // 실습 종류 필터
    if (activeFilters.practiceType.length > 0 && !activeFilters.practiceType.includes(card.practiceType)) {
      return false
    }

    // 날짜 필터링
    if (dateRange.start || dateRange.end) {
      const cardDate = new Date(card.date).toISOString().split('T')[0]
      if (dateRange.start && cardDate < dateRange.start) return false
      if (dateRange.end && cardDate > dateRange.end) return false
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
            <h3 className="font-bold mb-3">실습 종류</h3>
            <div className="flex flex-wrap gap-2">
              {practiceTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter('practiceType', type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    activeFilters.practiceType.includes(type)
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold mb-3">자동태그</h3>
            <div className="flex flex-wrap gap-2">
              {allAutoTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleFilter('autoTag', tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    activeFilters.autoTag.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {tag}
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
        </div>

        {/* 오른쪽: 카드 그리드 */}
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">총 {filteredCards.length}개</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map(card => (
              <div key={card.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                {/* 구분과 실습 종류를 한 줄에 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                    {card.category}
                  </span>
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
                    {card.practiceType}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {card.content}
                </p>

                {/* 자동 태그 */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 mb-3">
                  {card.autoTags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 날짜를 아래에 */}
                <div className="text-xs text-gray-400">
                  {new Date(card.date).toLocaleDateString('ko-KR')}
                </div>
              </div>
            ))}

            {filteredCards.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400">
                필터 조건에 맞는 카드가 없습니다!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
