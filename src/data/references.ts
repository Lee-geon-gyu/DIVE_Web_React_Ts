export interface ReferenceItem {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  sourceType: string
  to: string
}

export const references: ReferenceItem[] = [
  {
    id: 'content-focused-web-layout',
    title: '콘텐츠 중심 웹사이트 레이아웃',
    description:
      '정보의 우선순위를 명확히 하고 탐색 흐름을 단순하게 만드는 웹 레이아웃 구성 기준을 살펴봅니다.',
    category: '웹사이트 레이아웃',
    tags: ['정보 위계', 'Grid', 'Navigation'],
    sourceType: '구조 참고자료',
    to: '/reference',
  },
  {
    id: 'mobile-task-flow',
    title: '모바일 핵심 작업 흐름 설계',
    description:
      '제한된 화면에서 중요한 행동을 우선 배치하고 터치 환경에 맞게 UI를 구성하는 방법을 다룹니다.',
    category: '모바일 UI',
    tags: ['Touch', 'Task Flow', 'Priority'],
    sourceType: 'UI 패턴',
    to: '/reference',
  },
  {
    id: 'dashboard-information-hierarchy',
    title: '대시보드 정보 계층 구성',
    description:
      '여러 지표와 상태를 한 화면에 표현할 때 비교와 확인이 쉬운 정보 구조를 만드는 기준을 정리합니다.',
    category: '대시보드',
    tags: ['Data UI', 'Hierarchy', 'Status'],
    sourceType: '화면 구성 가이드',
    to: '/reference',
  },
  {
    id: 'landing-page-message-flow',
    title: '랜딩페이지 메시지 흐름',
    description:
      '사용자가 핵심 내용을 순서대로 이해하고 다음 행동으로 이동하도록 섹션과 메시지를 구성합니다.',
    category: '랜딩페이지',
    tags: ['Content Flow', 'CTA', 'Section'],
    sourceType: '구성 참고자료',
    to: '/reference',
  },
  {
    id: 'interaction-feedback-pattern',
    title: '상태를 전달하는 인터랙션 피드백',
    description:
      '클릭과 입력 결과를 명확하게 전달하면서 사용을 방해하지 않는 상태 변화와 피드백을 살펴봅니다.',
    category: '인터랙션',
    tags: ['Feedback', 'Motion', 'State'],
    sourceType: '인터랙션 패턴',
    to: '/reference',
  },
  {
    id: 'readable-typography-system',
    title: '읽기 흐름을 고려한 Typography',
    description:
      '크기, 굵기, 행간과 여백을 함께 사용해 긴 정보도 쉽게 읽히는 텍스트 위계를 구성합니다.',
    category: '타이포그래피',
    tags: ['Scale', 'Readability', 'Hierarchy'],
    sourceType: '스타일 가이드',
    to: '/reference',
  },
  {
    id: 'design-system-foundation',
    title: '일관된 디자인 시스템의 기초',
    description:
      '토큰과 공통 컴포넌트를 기준으로 반복되는 UI를 일관되게 관리하는 기본 구조를 알아봅니다.',
    category: '디자인 시스템',
    tags: ['Token', 'Component', 'Consistency'],
    sourceType: '시스템 가이드',
    to: '/reference',
  },
  {
    id: 'accessible-information-architecture',
    title: '접근 가능한 정보구조 점검',
    description:
      '시맨틱 구조와 키보드 탐색을 고려해 다양한 사용자가 정보를 이해하고 이동할 수 있게 구성합니다.',
    category: '접근성·정보구조',
    tags: ['Semantic', 'Keyboard', 'Structure'],
    sourceType: '접근성 체크 가이드',
    to: '/reference',
  },
]
