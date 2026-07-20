export interface AiToolItem {
  id: string
  name: string
  category: string
  purpose: string
  summary: string
  useCases: string[]
  recommendedFor: string
  accessType: string
  to: string
}

export const aiTools: AiToolItem[] = [
  {
    id: 'chatgpt-writing',
    name: 'ChatGPT',
    category: '아이디어 및 문서 작성',
    purpose: '아이디어를 구체화하고 작업 문서를 정리할 때 활용',
    summary:
      '초기 생각을 질문과 답변으로 발전시키고, 기획 초안이나 작업 기준을 읽기 쉬운 구조로 정리하는 데 참고할 수 있습니다.',
    useCases: ['아이디어 확장', '기획 초안 작성', '문서 구조 정리'],
    recommendedFor: '기획자, 디자이너, 웹 퍼블리셔',
    accessType: '웹 기반',
    to: '/ai',
  },
  {
    id: 'figma-ai-ui-design',
    name: 'Figma AI',
    category: 'UI 디자인',
    purpose: 'UI 작업의 초안을 만들고 디자인 탐색 과정을 보조',
    summary:
      '디자인 도구 안에서 화면 구성의 출발점을 마련하고, 반복되는 편집 작업을 정리하는 보조 수단으로 활용할 수 있습니다.',
    useCases: ['화면 초안 탐색', '콘텐츠 정리', '반복 작업 보조'],
    recommendedFor: 'UI/UX 디자이너, 프로덕트 디자이너',
    accessType: '디자인 도구 연동',
    to: '/ai',
  },
  {
    id: 'adobe-firefly-image',
    name: 'Adobe Firefly',
    category: '이미지 생성',
    purpose: '시각 자료의 방향을 탐색하고 이미지 편집을 보조',
    summary:
      '콘셉트에 맞는 시각적 아이디어를 빠르게 비교하고, 제작 중인 이미지의 일부 편집 과정을 보조하는 데 활용할 수 있습니다.',
    useCases: ['콘셉트 이미지 탐색', '배경 표현 실험', '이미지 편집 보조'],
    recommendedFor: '그래픽 디자이너, 콘텐츠 디자이너',
    accessType: '웹·데스크톱 연동',
    to: '/ai',
  },
  {
    id: 'github-copilot-code',
    name: 'GitHub Copilot',
    category: '코드 작성',
    purpose: '개발 환경에서 코드 작성과 반복 구현을 보조',
    summary:
      '작성 중인 코드의 맥락을 바탕으로 구현 아이디어를 검토하고, 반복적인 코드 작성을 줄이는 보조 도구로 활용할 수 있습니다.',
    useCases: ['코드 초안 작성', '반복 코드 보조', '구현 방식 탐색'],
    recommendedFor: '프론트엔드 개발자, 웹 퍼블리셔',
    accessType: '개발 환경 연동',
    to: '/ai',
  },
  {
    id: 'claude-code-review',
    name: 'Claude',
    category: '코드 설명 및 리뷰',
    purpose: '코드의 흐름을 이해하고 검토 관점을 정리',
    summary:
      '코드와 관련 문맥을 함께 살펴보며 동작을 설명하거나, 수정 전에 확인할 항목과 잠재적인 문제를 정리하는 데 활용할 수 있습니다.',
    useCases: ['코드 흐름 설명', '리뷰 항목 정리', '개선 방향 검토'],
    recommendedFor: '개발 입문자, 개발자, 웹 퍼블리셔',
    accessType: '웹 기반',
    to: '/ai',
  },
  {
    id: 'notion-ai-research',
    name: 'Notion AI',
    category: '리서치 정리',
    purpose: '수집한 조사 내용과 팀 문서를 구조화',
    summary:
      '작업 공간에 모인 메모와 자료를 주제별로 정돈하고, 조사 결과에서 다음 작업에 필요한 핵심 내용을 추리는 데 활용할 수 있습니다.',
    useCases: ['리서치 요약', '회의 내용 정리', '작업 문서 구조화'],
    recommendedFor: 'UX 리서처, 기획자, 프로젝트 팀',
    accessType: '업무 도구 연동',
    to: '/ai',
  },
  {
    id: 'gamma-presentation',
    name: 'Gamma',
    category: '프레젠테이션 제작',
    purpose: '전달할 내용을 프레젠테이션 흐름으로 구성',
    summary:
      '정리된 메시지를 발표 순서와 화면 단위로 나누고, 문서의 정보 계층을 시각적인 발표 자료로 발전시키는 데 참고할 수 있습니다.',
    useCases: ['발표 목차 구성', '내용 흐름 정리', '초안 시각화'],
    recommendedFor: '기획자, 디자이너, 발표 자료 작성자',
    accessType: '웹 기반',
    to: '/ai',
  },
  {
    id: 'framer-ai-prototyping',
    name: 'Framer AI',
    category: '프로토타이핑 및 자동화',
    purpose: '웹 화면 아이디어를 빠르게 구성하고 검증',
    summary:
      '콘텐츠와 레이아웃 아이디어를 실제 화면에 가까운 형태로 구성하여 초기 방향과 사용자 흐름을 확인하는 데 활용할 수 있습니다.',
    useCases: ['웹 화면 초안', '레이아웃 탐색', '프로토타입 검토'],
    recommendedFor: '웹디자이너, 프로덕트 디자이너',
    accessType: '웹 제작 도구 연동',
    to: '/ai',
  },
]
