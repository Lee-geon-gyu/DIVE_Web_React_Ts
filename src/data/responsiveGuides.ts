export interface ResponsiveGuideItem {
  id: string
  title: string
  category: string
  description: string
  keyPoints: string[]
  targetViewport: string
  difficulty: string
  sourceType: string
  to: string
}

export const responsiveGuides: ResponsiveGuideItem[] = [
  {
    id: 'fluid-grid-layout',
    title: '콘텐츠 폭에 유연하게 대응하는 Grid 설계',
    category: '유동형 Grid 설계',
    description:
      '고정된 화면 폭에 의존하지 않고 콘텐츠와 컨테이너가 사용 가능한 공간에 맞춰 변화하도록 구성하는 기준을 살펴봅니다.',
    keyPoints: ['유동 단위 선택', '최소·최대 너비 설정', '열 재배치 기준'],
    targetViewport: '전체 화면 범위',
    difficulty: '중급',
    sourceType: '레이아웃 가이드',
    to: '/responsive-web',
  },
  {
    id: 'content-breakpoint',
    title: '콘텐츠 변화에 근거한 Breakpoint 설정',
    category: 'Breakpoint 기준 설정',
    description:
      '특정 기기 크기를 그대로 따르기보다 레이아웃과 콘텐츠가 실제로 불안정해지는 지점을 기준으로 전환 구간을 정리합니다.',
    keyPoints: ['콘텐츠 기반 판단', '전환 구간 점검', '보조 구간 최소화'],
    targetViewport: 'Tablet 전환 구간',
    difficulty: '기본',
    sourceType: '설계 원칙',
    to: '/responsive-web',
  },
  {
    id: 'responsive-typography',
    title: '화면과 읽기 흐름을 고려한 반응형 타이포그래피',
    category: '반응형 타이포그래피',
    description:
      '제목과 본문의 크기, 행간, 한 줄 길이를 화면에 맞게 조정하면서 정보 위계와 가독성을 유지하는 방법을 다룹니다.',
    keyPoints: ['유동형 글자 크기', '본문 줄 길이', '행간과 위계 유지'],
    targetViewport: '전체 화면 범위',
    difficulty: '중급',
    sourceType: '타이포그래피 가이드',
    to: '/responsive-web',
  },
  {
    id: 'mobile-navigation',
    title: '탐색 우선순위를 반영한 모바일 내비게이션',
    category: '모바일 내비게이션',
    description:
      '좁은 화면에서 주요 이동 경로를 유지하고, 메뉴의 열림과 닫힘 및 키보드 접근까지 함께 고려하는 구조를 살펴봅니다.',
    keyPoints: ['메뉴 우선순위', '열림 상태 전달', '포커스 흐름'],
    targetViewport: 'Mobile 중심',
    difficulty: '실무 적용',
    sourceType: '탐색 구조 가이드',
    to: '/responsive-web',
  },
  {
    id: 'responsive-media',
    title: '내용을 보존하는 이미지와 미디어 처리',
    category: '이미지 및 미디어 처리',
    description:
      '화면 크기가 달라져도 핵심 내용이 잘리거나 왜곡되지 않도록 비율, 맞춤 방식과 로딩 범위를 선택하는 기준을 정리합니다.',
    keyPoints: ['비율 유지', '맞춤 방식 선택', '레이아웃 이동 방지'],
    targetViewport: '전체 화면 범위',
    difficulty: '기본',
    sourceType: '미디어 처리 지침',
    to: '/responsive-web',
  },
  {
    id: 'responsive-card-layout',
    title: '정보 계층을 유지하는 카드 레이아웃 재배치',
    category: '카드 레이아웃 재배치',
    description:
      '카드 수와 정보량에 따라 열 개수와 내부 정렬을 바꾸면서 제목, 설명, 행동 요소의 순서를 안정적으로 유지합니다.',
    keyPoints: ['열 개수 조정', '카드 높이 대응', '내부 정보 순서'],
    targetViewport: 'Desktop·Tablet',
    difficulty: '중급',
    sourceType: '컴포넌트 가이드',
    to: '/responsive-web',
  },
  {
    id: 'content-priority',
    title: '화면별 콘텐츠 우선순위와 숨김 기준',
    category: '콘텐츠 우선순위',
    description:
      '모바일을 축소된 데스크톱으로 처리하지 않고 사용 목적에 따라 정보를 재배치하며, 숨김이 필요한 경우의 판단 기준을 다룹니다.',
    keyPoints: ['핵심 정보 식별', '읽기 순서 재구성', '숨김 영향 검토'],
    targetViewport: 'Mobile 중심',
    difficulty: '실무 적용',
    sourceType: '콘텐츠 전략 자료',
    to: '/responsive-web',
  },
  {
    id: 'accessible-touch',
    title: '접근 가능한 터치 인터랙션 설계',
    category: '접근성과 터치 인터랙션',
    description:
      '터치 환경에서도 조작 대상을 명확하게 인식하고 안정적으로 선택할 수 있도록 크기, 간격과 상태 피드백을 확인합니다.',
    keyPoints: ['조작 영역 확보', '요소 간 간격', '상태 피드백 제공'],
    targetViewport: '터치 환경',
    difficulty: '실무 적용',
    sourceType: '접근성 점검 자료',
    to: '/responsive-web',
  },
]
