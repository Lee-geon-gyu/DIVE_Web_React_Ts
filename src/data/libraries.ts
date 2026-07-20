export interface LibraryItem {
  id: string
  name: string
  category: string
  purpose: string
  description: string
  useCases: string[]
  environment: string
  considerations: string[]
  sourceType: string
  to: string
}

export const libraries: LibraryItem[] = [
  {
    id: 'gsap-animation',
    name: 'GSAP',
    category: 'Animation',
    purpose: '여러 요소가 연결되는 애니메이션과 장면 전환 구성',
    description:
      '시간 순서와 상태 변화가 복잡한 인터랙션을 하나의 흐름으로 관리하고, transform과 opacity 중심의 모션을 구성할 때 활용할 수 있습니다.',
    useCases: ['타임라인 애니메이션', '페이지 전환', '다단계 장면 구성'],
    environment: 'JavaScript 환경',
    considerations: ['초기화와 해제 로직 관리', '모션 감소 환경 대응'],
    sourceType: 'JavaScript Library',
    to: '/libraries',
  },
  {
    id: 'scrolltrigger-interaction',
    name: 'ScrollTrigger',
    category: 'Scroll',
    purpose: '스크롤 위치와 진행도에 연결된 인터랙션 구성',
    description:
      '콘텐츠가 특정 지점에 도달하거나 스크롤이 진행되는 상황에 맞춰 애니메이션과 화면 상태를 제어할 때 참고할 수 있습니다.',
    useCases: ['스크롤 장면 전환', 'Pin 구간', '진행도 기반 모션'],
    environment: 'GSAP 연동 환경',
    considerations: ['반응형 재계산 시점 확인', '모바일 스크롤 부담 검토'],
    sourceType: 'Animation Plugin',
    to: '/libraries',
  },
  {
    id: 'lenis-smooth-scroll',
    name: 'Lenis',
    category: 'Scroll',
    purpose: '페이지 전반의 부드러운 스크롤 경험 구성',
    description:
      '스크롤 입력과 화면 이동의 감각을 조정하면서 다른 스크롤 기반 인터랙션과 일관된 흐름을 만들 때 활용할 수 있습니다.',
    useCases: ['부드러운 페이지 이동', '스크롤 감각 조정', '모션 흐름 연동'],
    environment: '프레임워크 연동 가능',
    considerations: ['기존 스크롤 로직과 충돌 여부 확인', '접근성 설정과 해제 처리'],
    sourceType: 'JavaScript Library',
    to: '/libraries',
  },
  {
    id: 'swiper-carousel',
    name: 'Swiper',
    category: 'Slider',
    purpose: '슬라이드와 캐러셀 형태의 콘텐츠 탐색 구현',
    description:
      '여러 콘텐츠를 제한된 공간에서 순차적으로 탐색하도록 구성하고 터치, 내비게이션과 페이지 상태를 함께 다룰 때 활용할 수 있습니다.',
    useCases: ['콘텐츠 슬라이더', '터치 캐러셀', '갤러리 탐색'],
    environment: 'JavaScript·컴포넌트 환경',
    considerations: ['키보드 조작과 이름 제공 검토', '필요한 기능 범위만 구성'],
    sourceType: 'JavaScript Library',
    to: '/libraries',
  },
  {
    id: 'aos-scroll-reveal',
    name: 'AOS',
    category: 'Animation',
    purpose: '스크롤 진입 시 간단한 콘텐츠 등장 효과 적용',
    description:
      '콘텐츠가 화면에 들어오는 시점에 짧은 이동이나 투명도 변화를 더해 정보 흐름을 보조하는 용도로 살펴볼 수 있습니다.',
    useCases: ['섹션 등장', '카드 노출', '간단한 스크롤 피드백'],
    environment: 'CSS와 함께 사용',
    considerations: ['반복 효과의 필요성 검토', '모션 감소 환경 대응'],
    sourceType: 'Animation Library',
    to: '/libraries',
  },
  {
    id: 'splittype-text',
    name: 'SplitType',
    category: 'Animation',
    purpose: '텍스트를 글자와 단어 단위로 나누어 모션 준비',
    description:
      '제목이나 짧은 문구를 제어 가능한 단위로 분리해 순차 애니메이션을 구성할 때 보조 도구로 활용할 수 있습니다.',
    useCases: ['글자별 등장', '단어별 전환', '타이포그래피 연출'],
    environment: 'JavaScript 환경',
    considerations: ['분할 전후 문서 구조 복구', '스크린 리더 읽기 흐름 확인'],
    sourceType: 'Text Utility',
    to: '/libraries',
  },
  {
    id: 'motion-interaction',
    name: 'Motion',
    category: 'Interaction',
    purpose: 'UI 상태 전환과 드래그·제스처 인터랙션 구성',
    description:
      '컴포넌트 상태에 따른 움직임과 직접 조작 피드백을 연결해 인터페이스의 변화 과정을 표현할 때 활용할 수 있습니다.',
    useCases: ['상태 전환', '드래그 인터랙션', '레이아웃 변화 표현'],
    environment: '컴포넌트 기반 환경',
    considerations: ['입력 방식별 대체 조작 검토', '실제 사용 범위와 구성 크기 비교'],
    sourceType: 'Animation Library',
    to: '/libraries',
  },
  {
    id: 'radix-ui-primitives',
    name: 'Radix UI',
    category: 'UI',
    purpose: '접근성을 고려한 UI 동작과 상태 구조의 기반 마련',
    description:
      '대화상자, 메뉴와 같은 인터랙티브 UI를 구성할 때 키보드 조작과 상태 전달을 포함한 기본 동작을 검토하는 데 활용할 수 있습니다.',
    useCases: ['대화상자 구성', '메뉴와 팝오버', '상태 기반 UI'],
    environment: 'React 기반 환경',
    considerations: ['프로젝트 스타일 체계와 결합 방식 확인', '컴포넌트별 접근성 요구 검토'],
    sourceType: 'UI Primitive',
    to: '/libraries',
  },
]
