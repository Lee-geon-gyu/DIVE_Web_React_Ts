import type { ResourceCardData } from '../components/common/ResourceCard'

export const homeResources: ResourceCardData[] = [
  {
    id: 'design-resource-usage',
    title: '디자인 리소스 선택과 사용 기준',
    description:
      '폰트, 아이콘, 이미지와 목업을 작업 목적에 맞게 선택하고 사용 조건을 확인하는 기준을 살펴봅니다.',
    category: '디자인 리소스',
    resourceType: '선택·활용 지침',
    to: '/resources',
  },
  {
    id: 'responsive-layout-reference',
    title: '반응형 레이아웃 설계 참고자료',
    description:
      '화면 크기에 따라 콘텐츠 우선순위와 레이아웃을 재구성할 때 필요한 원칙을 확인합니다.',
    category: '반응형 웹',
    resourceType: '설계 참고자료',
    to: '/responsive-web',
  },
  {
    id: 'web-library-selection',
    title: '웹 라이브러리 도입 검토 가이드',
    description:
      '구현 목적과 유지보수 조건을 기준으로 라이브러리의 필요성과 적용 범위를 검토합니다.',
    category: '웹 라이브러리',
    resourceType: '도구 선택 가이드',
    to: '/libraries',
  },
  {
    id: 'publishing-practice-guide',
    title: '유지보수를 고려한 퍼블리싱 지침',
    description:
      '시맨틱 구조, 접근성, CSS 작성과 성능을 함께 고려하는 실무 제작 기준을 정리합니다.',
    category: '퍼블리싱 가이드',
    resourceType: '실무 작성 지침',
    to: '/publishing-guide',
  },
]
