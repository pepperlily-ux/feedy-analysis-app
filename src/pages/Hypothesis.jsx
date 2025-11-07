import { useState, useRef } from 'react'

// Mock data - AI에서 추출한 문제점 + 아이디어 카드들
const initialHypotheses = {
  backlog: [
    {
      id: 1,
      problem: '사용자들이 피드백 작성 시 날짜 입력을 번거로워함',
      idea: '날짜를 오늘로 자동 설정하고 필요시에만 수정 가능하게',
      source: 'Cards 데이터 분석',
      relatedFeedbacks: 12
    },
    {
      id: 2,
      problem: '강사들이 학생별 피드백을 비교하기 어려움',
      idea: '학생별 필터링 및 비교 대시보드 추가',
      source: 'Cards 데이터 분석',
      relatedFeedbacks: 8
    },
    {
      id: 3,
      problem: '피드백 작성 후 수정이 불가능해서 불편함',
      idea: '피드백 수정 및 삭제 기능 추가',
      source: 'Cards 데이터 분석',
      relatedFeedbacks: 15
    }
  ],
  inProgress: [
    {
      id: 4,
      problem: '사용자가 이전 피드백을 찾기 어려움',
      idea: '검색 및 필터링 기능 강화',
      source: 'Cards 데이터 분석',
      relatedFeedbacks: 20,
      startedAt: '2024-11-01'
    }
  ],
  validated: [
    {
      id: 5,
      problem: '모바일에서 텍스트 입력이 불편함',
      idea: '반응형 UI 개선 및 모바일 최적화',
      source: 'Cards 데이터 분석',
      relatedFeedbacks: 25,
      result: true,
      validatedAt: '2024-10-28',
      note: '모바일 사용자 만족도 35% 증가'
    },
    {
      id: 6,
      problem: '익명 피드백 기능이 필요함',
      idea: '익명 제출 옵션 추가',
      source: 'Cards 데이터 분석',
      relatedFeedbacks: 18,
      result: false,
      validatedAt: '2024-10-25',
      note: '익명 피드백 품질 저하로 보류'
    }
  ]
}

function HypothesisCard({ hypothesis, showResult, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, hypothesis)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-move"
    >
      {/* 문제점 */}
      <div className="mb-3">
        <div className="text-xs text-red-600 font-semibold mb-1">문제점</div>
        <div className="text-sm font-medium text-gray-800">{hypothesis.problem}</div>
      </div>

      {/* 아이디어 */}
      <div className="mb-3">
        <div className="text-xs text-blue-600 font-semibold mb-1">아이디어</div>
        <div className="text-sm text-gray-700">{hypothesis.idea}</div>
      </div>

      {/* 메타 정보 */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>📊 관련 피드백 {hypothesis.relatedFeedbacks}개</span>
      </div>

      {/* 검증 결과 (검증완료 컬럼에만 표시) */}
      {showResult && hypothesis.result !== undefined && (
        <div className={`mt-3 p-2 rounded ${hypothesis.result ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold ${hypothesis.result ? 'text-green-700' : 'text-red-700'}`}>
              {hypothesis.result ? '✓ TRUE' : '✗ FALSE'}
            </span>
          </div>
          {hypothesis.note && (
            <div className="text-xs text-gray-600">{hypothesis.note}</div>
          )}
        </div>
      )}
    </div>
  )
}

function Hypothesis() {
  const [hypotheses, setHypotheses] = useState(initialHypotheses)
  const [validationModal, setValidationModal] = useState(null)
  const draggedItem = useRef(null)
  const draggedFromColumn = useRef(null)

  const handleDragStart = (e, hypothesis) => {
    draggedItem.current = hypothesis

    // 어느 컬럼에서 왔는지 찾기
    if (hypotheses.backlog.find(h => h.id === hypothesis.id)) {
      draggedFromColumn.current = 'backlog'
    } else if (hypotheses.inProgress.find(h => h.id === hypothesis.id)) {
      draggedFromColumn.current = 'inProgress'
    } else if (hypotheses.validated.find(h => h.id === hypothesis.id)) {
      draggedFromColumn.current = 'validated'
    }

    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetColumn) => {
    e.preventDefault()

    if (!draggedItem.current || !draggedFromColumn.current) return

    // 같은 컬럼에 드롭하면 무시
    if (draggedFromColumn.current === targetColumn) {
      draggedItem.current = null
      draggedFromColumn.current = null
      return
    }

    // 검증완료로 이동할 때는 모달 띄우기
    if (targetColumn === 'validated') {
      setValidationModal({
        hypothesis: draggedItem.current,
        sourceColumn: draggedFromColumn.current
      })
      return
    }

    // 일반 이동
    moveHypothesis(draggedItem.current.id, targetColumn)
    draggedItem.current = null
    draggedFromColumn.current = null
  }

  const moveHypothesis = (id, targetColumn) => {
    setHypotheses(prev => {
      const newState = { ...prev }
      let movedItem = null

      // 원본 컬럼에서 제거
      for (const column of ['backlog', 'inProgress', 'validated']) {
        const index = newState[column].findIndex(h => h.id === id)
        if (index !== -1) {
          movedItem = newState[column][index]
          newState[column] = newState[column].filter(h => h.id !== id)
          break
        }
      }

      // 타겟 컬럼에 추가
      if (movedItem) {
        newState[targetColumn] = [...newState[targetColumn], movedItem]
      }

      return newState
    })
  }

  const completeValidation = (result, note) => {
    if (!validationModal) return

    setHypotheses(prev => {
      const newState = { ...prev }
      const { hypothesis, sourceColumn } = validationModal

      // 원본 컬럼에서 제거
      newState[sourceColumn] = newState[sourceColumn].filter(h => h.id !== hypothesis.id)

      // 검증 결과 추가하여 validated 컬럼에 추가
      newState.validated = [
        ...newState.validated,
        {
          ...hypothesis,
          result,
          validatedAt: new Date().toISOString().split('T')[0],
          note
        }
      ]

      return newState
    })

    setValidationModal(null)
    draggedItem.current = null
    draggedFromColumn.current = null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">가설 검증</h1>
          <p className="text-gray-600">AI 인사이트에서 추출한 문제점과 아이디어를 관리하고 검증하세요</p>
        </div>

        {/* 칸반 보드 */}
        <div className="grid grid-cols-3 gap-6">
          {/* 백로그 */}
          <div
            className="bg-gray-100 p-4 rounded-lg min-h-[500px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'backlog')}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">백로그</h2>
              <span className="text-sm text-gray-600">{hypotheses.backlog.length}</span>
            </div>
            <div className="space-y-3">
              {hypotheses.backlog.map(hypothesis => (
                <HypothesisCard
                  key={hypothesis.id}
                  hypothesis={hypothesis}
                  onDragStart={handleDragStart}
                  showResult={false}
                />
              ))}
            </div>
          </div>

          {/* 검증중 */}
          <div
            className="bg-blue-50 p-4 rounded-lg min-h-[500px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'inProgress')}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">검증중</h2>
              <span className="text-sm text-gray-600">{hypotheses.inProgress.length}</span>
            </div>
            <div className="space-y-3">
              {hypotheses.inProgress.map(hypothesis => (
                <HypothesisCard
                  key={hypothesis.id}
                  hypothesis={hypothesis}
                  onDragStart={handleDragStart}
                  showResult={false}
                />
              ))}
            </div>
          </div>

          {/* 검증완료 */}
          <div
            className="bg-green-50 p-4 rounded-lg min-h-[500px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'validated')}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">검증완료</h2>
              <span className="text-sm text-gray-600">{hypotheses.validated.length}</span>
            </div>
            <div className="space-y-3">
              {hypotheses.validated.map(hypothesis => (
                <HypothesisCard
                  key={hypothesis.id}
                  hypothesis={hypothesis}
                  onDragStart={handleDragStart}
                  showResult={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 검증 완료 모달 */}
      {validationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">가설 검증 결과</h3>

            <div className="mb-4 p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-600 mb-1">문제점</div>
              <div className="text-sm font-medium mb-2">{validationModal.hypothesis.problem}</div>
              <div className="text-xs text-gray-600 mb-1">아이디어</div>
              <div className="text-sm">{validationModal.hypothesis.idea}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">검증 결과</label>
              <textarea
                placeholder="검증 결과 및 메모를 입력하세요..."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                rows="3"
                id="validation-note"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const note = document.getElementById('validation-note').value
                  completeValidation(true, note)
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition"
              >
                ✓ TRUE
              </button>
              <button
                onClick={() => {
                  const note = document.getElementById('validation-note').value
                  completeValidation(false, note)
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition"
              >
                ✗ FALSE
              </button>
              <button
                onClick={() => setValidationModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hypothesis
