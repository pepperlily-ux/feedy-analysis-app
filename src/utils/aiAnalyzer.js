// AI 분석 시뮬레이션 (나중에 실제 API로 교체)

export function analyzeFeedback(content, category) {
  // 간단한 키워드 기반 분석
  const keywords = {
    느리다: '성능',
    복잡하다: 'UX',
    어렵다: '진입장벽',
    불편하다: '편의성',
    좋다: '만족도',
    빠르다: '성능'
  }
  
  let detectedIssue = 'UX 개선'
  
  for (const [keyword, issue] of Object.entries(keywords)) {
    if (content.includes(keyword)) {
      detectedIssue = issue
      break
    }
  }
  
  return {
    summary: `${category} 피드백이 접수되었습니다. ${detectedIssue} 관련 내용이 감지되었습니다.`,
    category,
    issue: detectedIssue,
    sentiment: content.includes('좋다') || content.includes('빠르다') ? '긍정' : '부정'
  }
}

export function getMainInsight(feedbacks) {
  if (feedbacks.length === 0) {
    return '피드백을 입력하면 AI가 인사이트를 생성합니다.'
  }
  
  // 가장 많이 언급된 이슈 찾기
  const issues = feedbacks.map(fb => fb.analysis?.issue || 'UX 개선')
  const issueCounts = {}
  
  issues.forEach(issue => {
    issueCounts[issue] = (issueCounts[issue] || 0) + 1
  })
  
  const topIssue = Object.entries(issueCounts).sort((a, b) => b[1] - a[1])[0]
  
  const insightTemplates = {
    '성능': '지금 가장 시급한 문제는 성능 최적화이며, 로딩 속도 개선이 필요합니다.',
    'UX': '지금 가장 시급한 문제는 UI 복잡도이며, 튜토리얼 기능이 필요합니다.',
    '진입장벽': '지금 가장 시급한 문제는 진입장벽이며, 온보딩 개선이 필요합니다.',
    '편의성': '지금 가장 시급한 문제는 사용 편의성이며, 단축키와 자동화가 필요합니다.',
    '만족도': '전반적인 만족도가 높습니다. 현재 기능을 유지하면서 확장하는 것이 좋습니다.'
  }
  
  return insightTemplates[topIssue[0]] || insightTemplates['UX']
}

export function getFeatureRecommendations(feedbacks) {
  if (feedbacks.length === 0) return []
  
  const mainInsight = getMainInsight(feedbacks)
  
  // 인사이트 기반 기능 추천
  const recommendationMap = {
    '성능': [
      {
        id: 1,
        title: '이미지 레이지 로딩',
        description: '화면에 보이는 이미지만 먼저 로드하여 초기 로딩 속도를 개선합니다.',
        reason: '성능 개선 피드백이 많아, 페이지 로딩 속도가 우선 과제입니다.',
        priority: 'high'
      },
      {
        id: 2,
        title: '캐싱 전략 개선',
        description: '자주 사용하는 데이터를 로컬에 저장하여 반응 속도를 높입니다.',
        reason: '반복적인 데이터 로딩으로 인한 지연을 줄일 수 있습니다.',
        priority: 'medium'
      }
    ],
    'UX': [
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
    ],
    '진입장벽': [
      {
        id: 1,
        title: '빠른 시작 가이드',
        description: '5분 안에 핵심 기능을 경험할 수 있는 퀵스타트를 제공합니다.',
        reason: '초보자가 쉽게 포기하지 않도록 즉각적인 성과를 보여줘야 합니다.',
        priority: 'high'
      },
      {
        id: 2,
        title: '예제 템플릿 제공',
        description: '자주 사용하는 패턴의 템플릿을 제공하여 빈 화면의 부담을 줄입니다.',
        reason: '처음 시작할 때 막막함을 해소할 수 있습니다.',
        priority: 'medium'
      }
    ],
    '편의성': [
      {
        id: 1,
        title: '키보드 단축키',
        description: '자주 사용하는 기능에 단축키를 제공하여 빠른 작업이 가능하게 합니다.',
        reason: '반복 작업이 많다는 피드백을 해결할 수 있습니다.',
        priority: 'high'
      },
      {
        id: 2,
        title: '일괄 작업 기능',
        description: '여러 항목을 한 번에 처리할 수 있는 벌크 기능을 제공합니다.',
        reason: '하나씩 처리하는 불편함을 해소할 수 있습니다.',
        priority: 'medium'
      }
    ]
  }
  
  // 인사이트에서 키워드 추출
  for (const [key, recs] of Object.entries(recommendationMap)) {
    if (mainInsight.includes(key) || mainInsight.includes(recs[0].title)) {
      return recs
    }
  }
  
  // 기본값
  return recommendationMap['UX']
}
