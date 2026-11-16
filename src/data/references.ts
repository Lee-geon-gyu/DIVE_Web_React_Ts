export interface ReferenceItem {
  id: string
  name: string
  category: string
  access: string
  purpose: string
  description: string
  useCases: string[]
  tips: string[]
  aliases: string[]
  recommendedStage: string
}

export const references: ReferenceItem[] = [
  {
    id: 'behance',
    name: 'Behance',
    category: '포트폴리오',
    access: '기본 이용 무료',
    purpose: '완성된 프로젝트의 콘셉트와 표현 방식 살펴보기',
    description: '브랜딩, 그래픽, UI/UX 작업을 분야별로 찾아볼 수 있는 Adobe의 포트폴리오 플랫폼입니다. 프로젝트를 열면 작업물과 함께 창작자가 정리한 제작 과정을 볼 수 있습니다.',
    useCases: ['프로젝트 사례 조사', '브랜딩', 'UI/UX 포트폴리오'],
    tips: ['같은 분야의 프로젝트를 골라 문제 정의와 결과물을 보여주는 순서를 비교해보세요.'],
    aliases: ['비핸스', '비헨스', 'adobe'],
    recommendedStage: '유사 프로젝트 조사',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    category: '무드보드',
    access: '무료 계정',
    purpose: '색감, 소재, 타이포그래피 아이디어 수집',
    description: '이미지와 영상 아이디어를 키워드로 찾고, 마음에 드는 핀을 보드에 모아 시각 방향을 정리할 수 있습니다.',
    useCases: ['무드보드', '색상 조합', '아트 디렉션'],
    tips: ['같은 주제의 핀을 묶어 색감과 분위기가 어떻게 다른지 비교해보세요.'],
    aliases: ['핀터레스트', '핀터'],
    recommendedStage: '초기 시각 방향 정리',
  },
  {
    id: 'notefolio',
    name: 'Notefolio',
    category: '포트폴리오',
    access: '작품 갤러리',
    purpose: '국내 디자이너와 창작자의 작업 탐색',
    description: '국내 창작자가 작품과 포트폴리오를 공유하는 플랫폼입니다. 한국어 프로젝트 소개를 읽으며 국내 디자인 사례와 작업 표현 방식을 함께 살펴볼 수 있습니다.',
    useCases: ['국내 포트폴리오', '편집 디자인', '브랜드 디자인'],
    tips: ['프로젝트의 제작 의도와 결과물이 어떻게 연결되는지 정리해보세요.'],
    aliases: ['노트폴리오', '노폴', 'norefolio'],
    recommendedStage: '국내 프로젝트 사례 조사',
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    category: '포트폴리오',
    access: '공개 갤러리',
    purpose: '시각 스타일이나 특정 화면 구성 빠르게 비교',
    description: '디자이너가 올린 짧은 작업 예시인 Shots를 모아볼 수 있습니다. 제품 디자인, 웹, 모바일, 타이포그래피처럼 필요한 분야에 집중하기 좋습니다.',
    useCases: ['컴포넌트 표현', '대시보드 시안', 'UI 스타일'],
    tips: ['단일 화면을 참고할 때는 실제 서비스의 앞뒤 흐름도 따로 확인해보세요.'],
    aliases: ['드리블', '드리블 디자인', 'shots'],
    recommendedStage: '화면 스타일 탐색',
  },
  {
    id: 'mobbin',
    name: 'Mobbin',
    category: '앱·웹 UI',
    access: '일부 무료 · 유료 플랜',
    purpose: '실제 출시된 앱과 웹의 화면 흐름 조사',
    description: '서비스에서 실제로 사용하는 화면과 사용자 흐름을 모은 라이브러리입니다. 같은 작업을 서로 다른 제품이 어떻게 구성했는지 비교해볼 수 있습니다.',
    useCases: ['온보딩', '결제 흐름', '설정 화면'],
    tips: ['로그인이나 구매처럼 같은 작업을 골라 단계 수와 버튼의 위치를 비교해보세요.'],
    aliases: ['모빈', '모빈 디자인', '모바일 UI', 'UX 흐름'],
    recommendedStage: '사용 흐름 설계',
  },
  {
    id: 'css-design-awards',
    name: 'CSS Design Awards',
    category: '웹 디자인',
    access: '공개 갤러리',
    purpose: '인터랙션과 시각 연출을 활용한 웹사이트 찾기',
    description: '웹 디자인 수상작과 후보작을 모아볼 수 있는 갤러리입니다. 사이트마다 다른 스크롤 연출이나 작업 전시 방식을 비교할 때 참고할 수 있습니다.',
    useCases: ['웹 인터랙션', '크리에이티브 웹', '수상작 탐색'],
    tips: ['원본 사이트를 열어 데스크톱과 모바일에서 핵심 콘텐츠를 찾는 흐름을 비교해보세요.'],
    aliases: ['cssda', 'css 디자인 어워드'],
    recommendedStage: '인터랙션 연출 구상',
  },
  {
    id: 'siteinspire',
    name: 'Siteinspire',
    category: '웹 디자인',
    access: '공개 갤러리',
    purpose: '스타일과 사이트 유형으로 웹 디자인 사례 좁히기',
    description: '큐레이션된 웹사이트를 스타일, 유형, 주제별로 찾아볼 수 있습니다. 포트폴리오나 스튜디오처럼 만들려는 사이트의 성격에 맞춰 사례를 찾기 좋습니다.',
    useCases: ['웹 레이아웃', '포트폴리오 사이트', '타이포그래피'],
    tips: ['사이트 유형을 먼저 고른 뒤 헤더, 콘텐츠 구획, 내비게이션의 공통점을 살펴보세요.'],
    aliases: ['사이트인스파이어', '사이트 인스파이어'],
    recommendedStage: '사이트 레이아웃 비교',
  },
  {
    id: 'lapa-ninja',
    name: 'Lapa Ninja',
    category: '웹 디자인',
    access: '공개 갤러리',
    purpose: '랜딩페이지의 첫 화면과 메시지 흐름 비교',
    description: '제품, SaaS, 쇼핑몰 등 여러 유형의 랜딩페이지를 모아볼 수 있습니다. 첫 화면에서 제품을 설명하고 다음 행동을 안내하는 방식에 집중하기 좋습니다.',
    useCases: ['랜딩페이지', '히어로 구성', '전환 버튼'],
    tips: ['같은 업종의 페이지에서 제목, 제품 이미지, 첫 버튼을 어떤 순서로 배치했는지 비교해보세요.'],
    aliases: ['라파닌자', '라파 닌자', 'landing page'],
    recommendedStage: '랜딩페이지 구성',
  },
  {
    id: 'its-nice-that',
    name: 'It’s Nice That',
    category: '디자인 매거진',
    access: '공개 기사',
    purpose: '그래픽과 편집 디자인의 배경 이야기 읽기',
    description: '그래픽 디자인, 타이포그래피, 일러스트레이션 등 창작 작업과 인터뷰를 소개하는 매거진입니다. 결과물과 함께 작업의 콘셉트와 제작 배경을 읽을 수 있습니다.',
    useCases: ['편집 디자인', '타이포그래피', '창작자 인터뷰'],
    tips: ['작품에 사용된 서체나 이미지가 기사에서 설명한 메시지와 어떻게 연결되는지 살펴보세요.'],
    aliases: ["it's nice that", 'its nice that', '잇츠 나이스 댓'],
    recommendedStage: '그래픽 콘셉트 연구',
  },
]
