export interface FeaturedGuide {
  id: string
  title: string
  description: string
  category: string
  readingTime: string
  to: string
}

export const featuredGuides: FeaturedGuide[] = [
  {
    id: 'ui-pattern-checklist',
    title: '실무 UI 패턴을 검토하는 기준',
    description:
      '익숙한 UI 패턴을 그대로 적용하기 전에 사용자 목적과 화면 맥락을 점검하는 방법을 살펴봅니다.',
    category: 'UI/UX',
    readingTime: '약 6분',
    to: '/reference',
  },
  {
    id: 'ai-tool-selection',
    title: '작업 목적에 맞는 AI 도구 선택하기',
    description:
      '기능 목록보다 실제 작업 과정과 검토 기준을 중심으로 AI 도구를 선택하는 방법을 알아봅니다.',
    category: 'AI 도구',
    readingTime: '약 7분',
    to: '/ai',
  },
  {
    id: 'resource-license-basics',
    title: '디자인 리소스 라이선스 확인하기',
    description:
      '폰트와 아이콘을 프로젝트에 사용하기 전에 확인해야 할 이용 범위와 출처 조건을 정리합니다.',
    category: '디자인 리소스',
    readingTime: '약 5분',
    to: '/resources',
  },
  {
    id: 'responsive-typography',
    title: '반응형 Typography 설계 원칙',
    description:
      '화면 폭만 줄이는 방식에서 벗어나 가독성과 콘텐츠 위계를 유지하는 글자 크기 체계를 다룹니다.',
    category: '반응형 웹',
    readingTime: '약 8분',
    to: '/responsive-web',
  },
  {
    id: 'gsap-getting-started',
    title: 'GSAP을 사용하기 전에 확인할 것',
    description:
      'CSS로 충분한 효과와 GSAP이 필요한 상호작용을 구분하고 적용 전 고려사항을 살펴봅니다.',
    category: '웹 라이브러리',
    readingTime: '약 6분',
    to: '/libraries',
  },
  {
    id: 'semantic-html-guide',
    title: 'Semantic HTML 작성 가이드',
    description:
      '콘텐츠의 의미에 맞는 요소를 선택해 접근성과 유지보수성을 높이는 작성 기준을 알아봅니다.',
    category: '퍼블리싱',
    readingTime: '약 7분',
    to: '/publishing-guide',
  },
]
