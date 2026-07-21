export interface HomeCategory {
  title: string
  description: string
  to: string
}

export const homeCategories: HomeCategory[] = [
  {
    title: 'UI/UX 레퍼런스',
    description:
      '사용자 경험 설계 원칙과 실무 UI 패턴을 살펴보고 프로젝트에 적용할 기준을 찾습니다.',
    to: '/reference',
  },
  {
    title: '디자인 리소스',
    description:
      '폰트, 아이콘, 이미지와 목업을 용도에 맞게 선택하고 안전하게 사용하는 기준을 알아봅니다.',
    to: '/resources',
  },
  {
    title: '반응형 웹',
    description:
      '화면 환경에 따라 레이아웃, 타이포그래피와 이미지를 설계하는 실무 원칙을 학습합니다.',
    to: '/responsive-web',
  },
  {
    title: '웹 라이브러리',
    description:
      '라이브러리의 목적과 적절한 사용 상황, 장단점을 비교해 구현에 필요한 도구를 선택합니다.',
    to: '/libraries',
  },
]
