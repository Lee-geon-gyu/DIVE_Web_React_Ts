export interface ResourceItem {
  id: string
  title: string
  category: string
  description: string
  useCases: string[]
  format: string
  recommendedFor: string
  sourceType: string
  to: string
}

export const resources: ResourceItem[] = [
  {
    id: 'interface-ui-kit',
    title: '인터페이스 설계를 위한 UI 키트',
    category: 'UI 키트',
    description:
      '화면을 구성하는 기본 요소와 상태를 일관된 기준으로 검토하고 빠르게 조합할 때 활용할 수 있습니다.',
    useCases: ['화면 초안 구성', '컴포넌트 상태 검토', '프로젝트 규칙 정리'],
    format: '디자인 도구 파일',
    recommendedFor: 'UI/UX 디자이너, 프로덕트 디자이너',
    sourceType: '구성 요소 모음',
    to: '/resources',
  },
  {
    id: 'interface-icon-set',
    title: '의미와 사용 맥락을 고려한 아이콘 모음',
    category: '아이콘',
    description:
      '기능과 상태를 짧고 명확하게 전달하며, 인터페이스 전반의 시각 언어를 통일할 때 참고할 수 있습니다.',
    useCases: ['내비게이션 표현', '상태 안내', '기능 버튼 구성'],
    format: '다운로드 파일',
    recommendedFor: 'UI 디자이너, 웹 퍼블리셔',
    sourceType: '그래픽 리소스',
    to: '/resources',
  },
  {
    id: 'typography-reference',
    title: '읽기 흐름을 설계하는 타이포그래피 자료',
    category: '폰트 및 타이포그래피',
    description:
      '콘텐츠의 위계와 가독성을 고려해 글꼴, 크기, 행간과 자간을 선택하는 기준을 확인할 수 있습니다.',
    useCases: ['본문 가독성 검토', '제목 위계 설계', '반응형 활자 조정'],
    format: '문서형 자료',
    recommendedFor: '브랜드 디자이너, UI 디자이너, 웹 퍼블리셔',
    sourceType: '설계 참고자료',
    to: '/resources',
  },
  {
    id: 'color-system-guide',
    title: '역할과 상태에 따른 컬러 시스템 가이드',
    category: '컬러 시스템',
    description:
      '브랜드 색상과 중립색, 상태 색상의 역할을 구분하고 접근 가능한 조합을 설계할 때 활용할 수 있습니다.',
    useCases: ['색상 역할 정의', '상태 표현 구성', '색상 대비 검토'],
    format: '웹 기반',
    recommendedFor: 'UI 디자이너, 디자인 시스템 담당자',
    sourceType: '색상 설계 도구',
    to: '/resources',
  },
  {
    id: 'presentation-mockup',
    title: '결과물 표현을 위한 디바이스 목업',
    category: '목업',
    description:
      '완성한 화면이 실제 사용 환경에서 어떻게 보이는지 전달하고 결과물의 맥락을 설명할 때 활용할 수 있습니다.',
    useCases: ['포트폴리오 구성', '화면 시안 공유', '사용 환경 표현'],
    format: '템플릿',
    recommendedFor: '웹디자이너, 포트폴리오 제작자',
    sourceType: '프레젠테이션 리소스',
    to: '/resources',
  },
  {
    id: 'design-system-template',
    title: '재사용 구조를 위한 디자인 시스템 템플릿',
    category: '디자인 시스템 템플릿',
    description:
      '토큰과 컴포넌트, 사용 원칙을 한 흐름으로 정리해 팀이 공유할 디자인 기준의 출발점을 마련할 수 있습니다.',
    useCases: ['토큰 구조 정리', '컴포넌트 문서화', '팀 규칙 공유'],
    format: '템플릿',
    recommendedFor: '디자인 시스템 담당자, 제품 개발 팀',
    sourceType: '시스템 구성 자료',
    to: '/resources',
  },
  {
    id: 'prototype-planning',
    title: '사용자 흐름 검증을 위한 프로토타이핑 자료',
    category: '프로토타이핑 자료',
    description:
      '핵심 화면과 상호작용을 연결해 사용자 흐름을 점검하고 구현 전 개선 지점을 찾을 때 참고할 수 있습니다.',
    useCases: ['화면 흐름 연결', '상호작용 검토', '사용성 확인 준비'],
    format: '디자인 도구 파일',
    recommendedFor: 'UX 디자이너, 기획자, 제품 팀',
    sourceType: '검증용 자료',
    to: '/resources',
  },
  {
    id: 'accessibility-checklist',
    title: '제작 단계별 접근성 점검 자료',
    category: '접근성 점검 자료',
    description:
      '정보 구조와 키보드 탐색, 색상 대비 등 제작 과정에서 놓치기 쉬운 접근성 항목을 단계별로 확인할 수 있습니다.',
    useCases: ['키보드 접근 점검', '콘텐츠 구조 확인', '색상 대비 검토'],
    format: '문서형 자료',
    recommendedFor: '디자이너, 웹 퍼블리셔, 프론트엔드 개발자',
    sourceType: '실무 체크리스트',
    to: '/resources',
  },
]
