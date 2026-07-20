import type { AiToolCardData } from '../components/common/AiToolCard'

export const homeAiTools: AiToolCardData[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: '아이디어 및 문서 작성',
    purpose: '정보 구조와 작업 아이디어 정리',
    summary:
      '초기 아이디어를 구체화하고 문서의 흐름이나 검토 항목을 정리하는 보조 도구로 활용할 수 있습니다.',
    audience: '기획·디자인·퍼블리싱',
    to: '/ai',
  },
  {
    id: 'figma-ai',
    name: 'Figma AI',
    category: 'UI 초안 및 디자인 보조',
    purpose: '디자인 작업의 초기 탐색 보조',
    summary:
      'UI 아이디어를 빠르게 탐색하고 반복 작업을 정리할 때, 결과를 직접 검토하는 전제로 활용합니다.',
    audience: 'UI/UX 디자이너',
    to: '/ai',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: '코드 작성 및 분석',
    purpose: '코드 초안 작성과 검토 과정 보조',
    summary:
      '구현 아이디어를 코드로 옮기거나 기존 코드를 이해할 때 활용하고, 결과는 프로젝트 기준에 맞게 검증합니다.',
    audience: '개발·웹 퍼블리싱',
    to: '/ai',
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    category: '이미지 생성 및 편집',
    purpose: '시각 자료의 방향 탐색과 편집 보조',
    summary:
      '이미지 아이디어와 표현 방향을 탐색할 때 사용하며, 실제 적용 전 결과물의 사용 조건을 확인합니다.',
    audience: '그래픽·콘텐츠 디자인',
    to: '/ai',
  },
]
