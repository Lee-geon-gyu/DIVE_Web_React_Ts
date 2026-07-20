export interface PublishingGuideItem {
  id: string
  title: string
  category: string
  description: string
  keyChecks: string[]
  workStage: string
  difficulty: string
  sourceType: string
  to: string
}

export const publishingGuides: PublishingGuideItem[] = [
  {
    id: 'semantic-html-structure',
    title: '의미와 읽기 순서를 고려한 HTML 구조 설계',
    category: 'HTML',
    description:
      '콘텐츠의 역할과 문서 흐름을 먼저 파악하고, 브라우저와 보조 기술이 구조를 이해할 수 있는 마크업 기준을 살펴봅니다.',
    keyChecks: [
      '제목과 영역의 의미에 맞는 태그를 사용했는지 확인',
      '시각적 배치와 관계없이 읽기 순서가 자연스러운지 검토',
      '동작 목적에 맞게 링크와 버튼을 구분했는지 확인',
    ],
    workStage: '구조 설계',
    difficulty: '기본',
    sourceType: '설계 가이드',
    to: '/publishing-guide',
  },
  {
    id: 'css-structure-selectors',
    title: '예측 가능한 CSS 구조와 선택자 관리',
    category: 'CSS',
    description:
      '스타일의 적용 범위와 우선순위를 명확하게 유지하고, 컴포넌트 수정이 다른 화면에 불필요하게 번지지 않는 작성 방식을 다룹니다.',
    keyChecks: [
      '지나치게 깊은 선택자 의존 구조를 피했는지 검토',
      '반복되는 값이 기존 디자인 토큰으로 관리되는지 확인',
      '상태별 스타일의 적용 범위가 명확한지 점검',
    ],
    workStage: '스타일 작성',
    difficulty: '중급',
    sourceType: '구현 가이드',
    to: '/publishing-guide',
  },
  {
    id: 'responsive-layout-implementation',
    title: '콘텐츠 변화를 기준으로 한 반응형 레이아웃 구현',
    category: 'Responsive',
    description:
      '화면을 단순히 축소하지 않고 콘텐츠 우선순위와 실제 레이아웃이 깨지는 지점을 기준으로 재배치하는 방법을 정리합니다.',
    keyChecks: [
      '최소 화면 폭에서 가로 overflow가 발생하지 않는지 확인',
      '화면별 콘텐츠 순서와 조작 흐름이 유지되는지 검토',
      '불필요한 보조 breakpoint가 늘어나지 않았는지 점검',
    ],
    workStage: '반응형 구현',
    difficulty: '중급',
    sourceType: '구현 가이드',
    to: '/publishing-guide',
  },
  {
    id: 'media-font-optimization',
    title: '레이아웃 안정성을 고려한 이미지와 폰트 최적화',
    category: 'Performance',
    description:
      '이미지의 비율과 로딩 시점, 필요한 폰트 범위를 조정해 콘텐츠 표시가 흔들리거나 불필요하게 지연되지 않도록 점검합니다.',
    keyChecks: [
      '이미지 크기나 비율로 표시 영역을 미리 확보했는지 확인',
      '화면 역할에 맞는 이미지 맞춤 방식을 사용했는지 검토',
      '사용하지 않는 폰트 굵기와 미디어가 포함되지 않았는지 확인',
    ],
    workStage: '품질 검수',
    difficulty: '실무 적용',
    sourceType: '최적화 체크리스트',
    to: '/publishing-guide',
  },
  {
    id: 'accessibility-keyboard',
    title: '웹 접근성과 키보드 탐색 점검',
    category: 'Accessibility',
    description:
      '시맨틱 구조와 접근 가능한 이름, 포커스 흐름을 함께 확인해 다양한 입력 방식에서도 주요 콘텐츠와 기능을 사용할 수 있도록 합니다.',
    keyChecks: [
      '키보드만으로 주요 기능을 사용할 수 있는지 확인',
      'focus-visible 상태가 명확하게 표시되는지 점검',
      '색상 외의 방법으로 상태와 의미를 전달하는지 검토',
    ],
    workStage: '품질 검수',
    difficulty: '실무 적용',
    sourceType: '접근성 체크리스트',
    to: '/publishing-guide',
  },
  {
    id: 'cross-environment-qa',
    title: '다양한 브라우저와 화면 환경 검수',
    category: 'QA',
    description:
      '입력 방식과 화면 크기, 콘텐츠 길이가 달라지는 조건에서 레이아웃과 기능이 의도한 흐름을 유지하는지 확인합니다.',
    keyChecks: [
      '주요 브라우저 환경에서 구조와 기능을 직접 확인했는지 점검',
      '긴 텍스트와 빈 상태에서도 레이아웃이 유지되는지 검토',
      '터치와 키보드 입력에서 동일한 기능에 접근 가능한지 확인',
    ],
    workStage: '품질 검수',
    difficulty: '중급',
    sourceType: '검수 가이드',
    to: '/publishing-guide',
  },
  {
    id: 'interaction-cleanup',
    title: '인터랙션 초기화와 해제 로직 관리',
    category: 'Interaction',
    description:
      '페이지 이동과 컴포넌트 생명주기에 맞춰 애니메이션, 이벤트와 관찰 객체를 생성하고 정리하는 기준을 다룹니다.',
    keyChecks: [
      '컴포넌트 해제 시 이벤트와 인스턴스를 정리하는지 검토',
      '개발 환경에서 초기화가 중복 실행되지 않는지 확인',
      '모션 감소 환경에서도 콘텐츠 접근이 가능한지 점검',
    ],
    workStage: '기능 구현',
    difficulty: '실무 적용',
    sourceType: '구현 체크리스트',
    to: '/publishing-guide',
  },
  {
    id: 'release-maintenance',
    title: '배포 전 최종 점검과 유지보수 준비',
    category: 'Maintenance',
    description:
      '배포에 필요한 설정과 검사 결과를 확인하고, 이후 변경 시에도 구조와 기준을 이해할 수 있도록 작업 상태를 정리합니다.',
    keyChecks: [
      '타입 검사와 정적 분석 및 프로덕션 빌드를 확인했는지 점검',
      '사용하지 않는 코드와 의존성이 남아 있지 않은지 검토',
      '공통 구조와 변경 이유가 일관되게 기록되었는지 확인',
    ],
    workStage: '배포 준비',
    difficulty: '실무 적용',
    sourceType: '운영 가이드',
    to: '/publishing-guide',
  },
]
