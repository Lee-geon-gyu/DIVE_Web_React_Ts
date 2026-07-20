# AGENTS.md

## 1. 문서 목적과 적용 우선순위

이 문서는 프로젝트의 디자인, 개발, 반응형, 인터랙션, 이미지, 접근성, 성능 및 외부 자료 사용에 관한 최상위 기준이다.

모든 설계, 구현, 수정, 리팩터링 작업은 프로젝트 루트의 `AGENTS.md`를 가장 먼저 확인한 뒤 진행한다.

문서 우선순위는 다음과 같다.

1. `AGENTS.md`
2. `Project-Manager` 폴더 안의 기획 관련 Markdown 문서
3. `Project-Manager` 폴더 안의 외부 자료, 로고, 저작권 관련 Markdown 문서
4. `README.md`
5. 현재 코드베이스의 기존 구현 방식

문서 간 충돌이 발생하면 임의로 판단하여 구현하지 않는다. 충돌 항목, 영향 범위, 가능한 해결 방향을 먼저 보고한 뒤 사용자 확인을 받는다.

문서에 없는 기능, 페이지, 외부 정보, 가격, 로고 사용 조건, 라이선스 조건을 임의로 만들어내지 않는다.

---

## 2. 프로젝트 방향

이 프로젝트는 UI/UX 디자이너와 웹 퍼블리셔가 디자인 및 개발 리소스를 쉽고 직관적으로 탐색할 수 있도록 돕는 정보 중심 플랫폼이다.

프로젝트는 다음 수준을 목표로 한다.

- 포트폴리오 대표 프로젝트로 활용 가능한 완성도
- 명확한 정보 구조
- 직관적인 탐색 경험
- 일관된 디자인 시스템
- 안정적인 반응형 구현
- 접근성과 성능을 고려한 인터랙션
- 외부 자료와 저작권 조건이 검증된 콘텐츠 구성

프로젝트의 정확한 페이지, 기능, 콘텐츠 및 MVP 범위는 `Project-Manager` 폴더 안의 문서를 기준으로 확정한다.

---

## 3. 디자인 방향

전체 디자인은 Toss, NAVER, ChatGPT의 장점을 조합해 프로젝트 목적에 맞게 재해석한다.

### Toss에서 참고할 요소

- 밝고 신뢰감 있는 UI
- 카드 중심의 정보 표현
- 직관적인 정보 전달
- 부드러운 인터랙션
- 친근한 색상과 충분한 여백

### NAVER에서 참고할 요소

- 많은 콘텐츠를 효율적으로 정리하는 구조
- 명확한 카테고리 탐색
- 콘텐츠 중심의 정보 구조
- 초록색을 활용한 보조 컬러 시스템

### ChatGPT에서 참고할 요소

- 정보 중심의 간결한 화면
- 넓은 여백
- 무채색 기반의 차분한 구조
- 사용자가 기능과 콘텐츠에 집중할 수 있는 인터페이스

특정 서비스의 실제 화면, 레이아웃, 컴포넌트 또는 브랜딩을 그대로 복제하지 않는다.

전체 분위기는 다음을 유지한다.

- 밝음
- 부드러움
- 친근함
- 미니멀함
- 정보 우선
- 충분한 여백
- 일관된 UI 언어

---

## 4. 확정 색상 시스템

Primary Color는 Toss 계열의 파랑, Secondary Color는 NAVER 계열의 초록을 사용한다.

화면 대부분은 흰색, 검정, 회색 계열의 Neutral Color로 구성한다.

```css
:root {
  --color-primary: #3182f6;
  --color-primary-hover: #1b64da;
  --color-primary-active: #1957c2;
  --color-primary-soft: #e8f3ff;

  --color-secondary: #03c75a;
  --color-secondary-hover: #02ad4e;
  --color-secondary-active: #029843;
  --color-secondary-soft: #e8f8ee;

  --color-black: #191f28;
  --color-white: #ffffff;

  --color-gray-50: #f9fafb;
  --color-gray-100: #f2f4f6;
  --color-gray-200: #e5e8eb;
  --color-gray-300: #d1d6db;
  --color-gray-400: #8b95a1;
  --color-gray-500: #6b7684;
  --color-gray-600: #4e5968;
  --color-gray-700: #3b4654;
  --color-gray-800: #333d4b;
  --color-gray-900: #191f28;

  --color-success: #00a86b;
  --color-warning: #f59f00;
  --color-error: #e5484d;
}
```

색상 사용 원칙:

- Primary는 핵심 버튼, 주요 링크, 선택 상태, 주요 인터랙션에 사용한다.
- Secondary는 카테고리 강조, 보조 배지, 일부 상태와 보조 인터랙션에 사용한다.
- Primary와 Secondary를 같은 비중으로 과도하게 경쟁시키지 않는다.
- 상태 색상은 브랜드 색상과 역할이 혼동되지 않게 구분한다.
- 모든 색상은 CSS Variable 또는 디자인 토큰으로 관리한다.
- 컴포넌트 내부에 동일 색상값을 반복 하드코딩하지 않는다.
- 색상 대비는 WCAG 접근성 기준을 고려한다.

---

## 5. Normalize 및 Reset

별도의 Normalize 라이브러리를 설치하지 않는다.

SWEATIE와 JW 프로젝트에서 사용한 Reset 방식을 참고하되, 이번 프로젝트에 맞춘 하나의 공통 Reset을 유지한다.

기본 Reset은 다음 원칙을 따른다.

```css
html {
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: hidden;
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
figure {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}

body {
  min-width: 320px;
  min-height: 100dvh;
  max-width: 100%;
  position: relative;
  overflow-x: hidden;
  line-height: 1.5;
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  word-break: keep-all;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section {
  display: block;
}

header,
main,
footer {
  width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font: inherit;
}

button {
  padding: 0;
  border: 0;
  background: none;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

img {
  height: auto;
  border-style: none;
}
```

다음 방식은 이번 프로젝트에서 사용하지 않는다.

```css
html {
  font-size: max(6px, 0.52083333vw);
}
```

기본 HTML font-size는 `16px`로 유지한다.

반응형 크기는 `rem`, `px`, `%`, `vw`, `clamp()`와 디자인 토큰을 목적에 맞게 조합하여 관리한다.

---

## 6. Typography

기본 폰트는 Pretendard를 사용한다.

폰트 파일을 직접 포함해야 할 경우 프로젝트에 필요한 굵기만 최소한으로 제공한다.

기본 텍스트 색상은 검정 또는 흰색을 중심으로 사용하며, 배경과의 명확한 대비를 우선한다.

타이포그래피 원칙:

- 모바일 보조 텍스트는 10px 미만으로 사용하지 않는다.
- 8px 이하의 텍스트는 사용하지 않는다.
- 일반 UI 텍스트는 가능하면 12px 이상을 유지한다.
- 주요 본문과 버튼 텍스트는 14px 이상을 권장한다.
- 데스크톱의 일반적인 최대 타이틀 크기는 64px 이내를 기준으로 한다.
- 예외적인 대형 비주얼 타이틀은 콘텐츠와 반응형 안정성을 검토한 뒤 사용한다.
- 행간은 가독성을 우선한다.
- 가벼운 굵기의 Pretendard 자간을 좁힐 때 고정된 `-2px`을 전체 적용하지 않는다.
- 필요한 텍스트에만 `em` 단위의 비례 자간을 적용한다.
- 텍스트 위계는 크기뿐 아니라 굵기, 색상, 간격을 함께 사용한다.

---

## 7. 반응형 기준

모바일 디자인 기준 폭은 `375px`이다.

`320px` 환경에서도 다음 문제가 발생하지 않아야 한다.

- 콘텐츠 잘림
- 요소 겹침
- 텍스트 오버플로우
- 의도하지 않은 페이지 전체 가로 스크롤
- 클릭 영역 축소
- 이미지 왜곡
- 헤더 및 내비게이션 파손

기본 반응형 구간:

- Mobile: `0px–767px`
- Tablet: `768px–1279px`
- Desktop: `1280px 이상`

콘텐츠가 실제로 깨지는 지점에는 컴포넌트별 보조 브레이크포인트를 허용한다.

반응형은 단순 축소가 아니라 콘텐츠 우선순위와 사용자 행동을 기준으로 재배치한다.

`320px` 화면에서는 페이지 전체 가로 스크롤을 금지한다.

표, 코드 블록, 비교 UI 등 명시적으로 필요한 요소만 내부 컨테이너에서 가로 스크롤을 허용한다.

---

## 8. 페이지 및 컨테이너 구조

Full Width Layout을 기본으로 사용한다.

배경과 섹션은 브라우저 전체 폭을 사용할 수 있다.

실제 콘텐츠는 브라우저 가장자리에 직접 붙지 않게 공통 좌우 여백을 적용한다.

데스크톱 최대 좌우 패딩은 약 `120px`을 기준으로 한다.

```css
:root {
  --page-padding: clamp(20px, 6.25vw, 120px);
  --content-max-width: 1600px;
}
```

컨테이너 역할은 다음처럼 분리한다.

- `page-container`: 좌우 padding 담당
- `content-container`: max-width 및 중앙 정렬 담당

```css
.page-container {
  width: 100%;
  padding-inline: var(--page-padding);
}

.content-container {
  width: min(100%, var(--content-max-width));
  margin-inline: auto;
}
```

두 컨테이너에 좌우 패딩을 중복 적용하지 않는다.

레이아웃 구조에 따라 한 단계만 필요한 경우 불필요하게 두 컨테이너를 모두 사용하지 않는다.

---

## 9. 디자인 토큰

다음 공통값은 CSS Variable 또는 디자인 토큰으로 관리한다.

- 브랜드 색상
- Neutral 색상
- 상태 색상
- Page Padding
- Content Max Width
- Header Height
- Border Radius
- Shadow
- Transition
- Z-index
- Typography Scale
- Spacing Scale
- Object Fit
- Breakpoint 기준
- Overlay
- Divider
- Focus Ring

예시:

```css
:root {
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;

  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;

  --shadow-card: 0 10px 30px rgba(25, 31, 40, 0.08);
  --shadow-floating: 0 14px 40px rgba(25, 31, 40, 0.12);

  --header-height-desktop: 80px;
  --header-height-mobile: 64px;

  --z-header: 100;
  --z-dropdown: 90;
  --z-overlay: 80;
  --z-modal: 200;
}
```

동일 숫자와 색상을 여러 파일에 반복 작성하지 않는다.

사용하지 않는 토큰을 과도하게 미리 생성하지 않는다.

---

## 10. Border Radius

일반적인 카드, 박스, 이미지, 입력 UI에는 `12px–24px` 범위의 radius를 사용한다.

완전한 pill 형태의 버튼, 태그, 필터에는 `9999px`을 사용할 수 있다.

모든 요소를 무분별하게 둥글게 만들지 않는다.

정보 구조와 요소 역할에 따라 radius를 구분한다.

---

## 11. 레이아웃 및 정렬

박스 내부 자식 정렬은 필요할 경우 Flexbox를 우선 검토한다.

Hero 또는 Banner의 기본 콘텐츠 순서:

1. 제목
2. 설명
3. 버튼

```css
display: flex;
flex-direction: column;
```

간격은 불필요한 margin 중첩보다 `gap`을 우선 검토한다.

카드 목록, 갤러리, 비교 구조에는 CSS Grid가 더 적합하면 Grid를 사용한다.

Flexbox를 무조건 강제하지 않고 콘텐츠 구조에 적합한 방법을 선택한다.

---

## 12. Header 구조

Header는 전체 폭을 사용하며, 내부 콘텐츠는 공통 페이지 컨테이너 규칙을 따른다.

기본 구조:

- 왼쪽: 프로젝트 로고
- 오른쪽: Navigation

```css
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

Header는 상단 고정을 기본으로 한다.

Header 내부 구조는 시맨틱 요소를 사용한다.

- `header`
- `nav`
- `ul`
- `li`
- `a`
- 필요한 경우 `button`

로고는 홈으로 이동하는 링크로 구현한다.

---

## 13. Header 2차 메뉴

2차 메뉴는 실제 하위 콘텐츠가 필요한 1차 메뉴에만 구현한다.

개별 메뉴 아래에 작은 Dropdown이 각각 뜨는 방식보다, Header 아래에 하나의 전체 폭 패널이 열리는 Full-width Dropdown 구조를 우선 사용한다.

동작 원칙:

- 데스크톱 마우스 환경: 1차 메뉴에 hover하면 관련 2차 메뉴 노출
- 키보드 환경: 1차 메뉴에 focus가 들어오면 관련 메뉴 접근 가능
- 터치 환경: 탭으로 열고 닫기
- 메뉴 외부 클릭 또는 Escape 키로 닫기
- 다른 1차 메뉴로 이동하면 해당 메뉴 내용으로 전환
- 2차 메뉴가 열리는 동안 Header가 자동으로 숨겨지지 않게 처리

2차 메뉴는 Header 아래 방향으로 짧고 부드럽게 열리는 Slide, Clip 또는 Height 기반 전환을 사용할 수 있다.

단순 열림과 닫힘은 CSS Transition을 우선 사용한다.

복잡한 시퀀스가 필요한 경우에만 GSAP을 사용한다.

Hover만으로 기능 접근이 제한되지 않게 한다.

---

## 14. Header 스크롤 동작

Header는 페이지 최상단에서 항상 보인다.

사용자가 아래로 일정 거리 이상 스크롤하면 Header가 위로 이동하며 숨겨진다.

사용자가 위로 스크롤하면 Header가 아래로 이동하며 다시 나타난다.

구현 원칙:

- `transform: translateY()` 사용
- `top`, `height` 등 Layout 속성을 매 프레임 변경하지 않기
- 작은 스크롤 변화로 Header가 떨리지 않도록 최소 임계값 적용
- 2차 메뉴가 열린 상태에서는 자동 숨김 중지
- Header 내부에 키보드 focus가 있는 동안 자동 숨김 중지
- 모바일 메뉴가 열린 동안 자동 숨김 중지
- 최상단으로 돌아오면 즉시 노출
- 스크롤 방향 감지는 과도한 이벤트 호출을 피하도록 최적화

---

## 15. Hover 및 터치 피드백

Hover 디자인 언어는 데스크톱과 모바일에서 모두 유지한다.

Hover 스타일 전체를 다음 조건 안으로만 제한하지 않는다.

```css
@media (hover: hover) and (pointer: fine);
```

마우스 환경에서는 `:hover`로 시각적 피드백을 제공한다.

터치 환경에서는 `:active`, `:focus-visible`, 선택 상태 또는 필요한 경우 탭 상태로 유사한 피드백을 제공한다.

모바일에서 hover 상태가 의도하지 않게 고정되어 다음 터치를 방해하지 않도록 구현한다.

단순 상태 변화는 CSS Transition으로 처리한다.

기본 Transition 시간은 `0.3s`를 사용한다.

---

## 16. Cursor 규칙

사용자가 조작할 수 있는 요소에는 항상 `cursor: pointer`를 사용한다.

적용 대상:

- 링크
- 버튼
- 클릭 가능한 카드
- 탭
- 아코디언
- 드롭다운 트리거
- Swiper Navigation
- 페이지네이션
- 클릭 가능한 이미지
- 메뉴 버튼
- 북마크 버튼
- 검색 결과 항목
- 라벨과 연결된 클릭 가능한 컨트롤

다음 요소는 `cursor: default`를 유지한다.

- 일반 텍스트
- 일반 이미지
- 장식 요소
- 레이아웃 박스
- 클릭 기능이 없는 카드
- 설명용 아이콘
- 비활성화된 요소

클릭할 수 없는 요소에 시각적 이유만으로 `cursor: pointer`를 적용하지 않는다.

---

## 17. 버튼 및 인터랙션 컴포넌트

모든 버튼은 다음 상태를 고려한다.

- Default
- Hover
- Active
- Focus-visible
- Disabled
- Loading

버튼과 주요 터치 요소는 모바일에서 최소 `44px`의 터치 영역을 확보한다.

버튼 스타일은 페이지마다 새로 만들지 않고 공통 컴포넌트와 Variant를 사용한다.

링크와 버튼의 역할을 구분한다.

- 페이지 이동 또는 외부 URL 이동: `a`
- 상태 변경 또는 기능 실행: `button`

클릭 가능한 `div` 사용을 지양한다.

---

## 18. GSAP, ScrollTrigger 및 Lenis

프로젝트의 주요 인터랙션에는 GSAP, ScrollTrigger, Lenis를 적극적으로 검토한다.

적극 활용은 모든 요소에 GSAP을 적용한다는 뜻이 아니다.

GSAP 우선 사용 대상:

- 스크롤 기반 시퀀스
- Pin Section
- Horizontal Scroll
- Storytelling Section
- 다단계 장면 전환
- SVG Path Animation
- 복잡한 등장 및 퇴장 시퀀스
- 페이지 전환
- 여러 요소가 연결되는 Timeline

CSS 우선 사용 대상:

- Hover
- 색상 변화
- Focus
- 단순 opacity
- 짧은 transform
- 간단한 버튼 상태
- 단순 Dropdown

ScrollTrigger의 pin은 정보 전달 또는 스토리텔링에 실질적으로 도움이 되는 경우에만 사용한다.

모든 섹션에 pin을 적용하지 않는다.

모바일에서는 긴 pin, 무거운 scrub, 복잡한 가로 스크롤, 과도한 스크롤 연출을 제거하거나 단순화할 수 있다.

React 컴포넌트 해제 시 다음을 반드시 정리한다.

- GSAP Timeline
- ScrollTrigger Instance
- 이벤트 리스너
- ResizeObserver
- requestAnimationFrame
- Lenis 연결
- Timer

가능하면 `gsap.context()` 또는 적절한 cleanup 방식을 사용한다.

ScrollTrigger 생성 후 반응형 이미지, 폰트, 레이아웃 변화가 영향을 줄 경우 필요한 시점에 `ScrollTrigger.refresh()`를 호출한다.

---

## 19. 모션 감소 환경

`prefers-reduced-motion: reduce`를 반드시 지원한다.

단순히 CSS Transition 시간을 줄이는 방식으로 끝내지 않는다.

모션 감소 환경에서 제거 또는 즉시 완료 상태로 전환할 대상:

- Lenis Smooth Scroll
- 긴 scrub
- ScrollTrigger Pin
- 복잡한 페이지 전환
- 자동 재생 애니메이션
- 큰 이동 거리의 등장 효과
- 장시간 반복 애니메이션

모션을 제거해도 콘텐츠가 누락되거나 접근 불가능한 상태가 되지 않아야 한다.

---

## 20. 이미지 기본 규칙

사진, 배너, Hero 이미지, 카드 썸네일에는 기본적으로 `object-fit: cover`를 사용한다.

다음 요소에는 기본적으로 `object-fit: contain`을 사용한다.

- 로고
- UI 스크린샷
- 다이어그램
- 인포그래픽
- 잘리면 안 되는 일러스트
- 제품 전체 형태
- 텍스트가 포함된 이미지

`cover` 사용 시 핵심 피사체가 잘리지 않게 `object-position`을 조정한다.

동일한 역할의 이미지는 동일한 `aspect-ratio`를 유지한다.

이미지와 미디어에는 width, height 또는 aspect-ratio를 지정해 레이아웃 이동을 방지한다.

---

## 21. 이미지 비율 및 반응형 이미지

권장 비율 예시:

- Hero/Banner: `16 / 9`, `21 / 9`
- 일반 카드: `4 / 3`, `3 / 2`
- 정사각형 썸네일: `1 / 1`
- 세로형 카드: `3 / 4`, `4 / 5`

필요한 경우 다음을 사용한다.

- `srcset`
- `sizes`
- `<picture>`
- 모바일 전용 이미지
- 반응형 `object-position`

첫 화면 핵심 이미지는 lazy loading하지 않는다.

하단 콘텐츠 이미지는 `loading="lazy"`를 사용할 수 있다.

이미지는 WebP 또는 AVIF를 우선 사용한다.

아이콘과 단순 그래픽은 가능한 경우 SVG를 사용한다.

원본 이미지가 필요 이상으로 큰 상태로 배포되지 않게 한다.

---

## 22. 이미지 접근성 및 가독성

의미 있는 이미지에는 구체적인 `alt`를 작성한다.

장식 목적 이미지는 `alt=""`로 처리한다.

파일명을 그대로 alt로 사용하지 않는다.

이미지 위에 텍스트를 배치할 경우 필요한 방식 사용:

- Overlay
- Gradient
- 배경 명도 조정
- 미세한 text-shadow
- 별도 텍스트 영역

텍스트와 이미지 사이에 충분한 대비를 확보한다.

텍스트가 이미지 핵심 피사체를 가리지 않게 한다.

---

## 23. 이미지 Hover

이미지 카드에 Hover 확대 효과가 필요한 경우 `transform`을 사용한다.

```css
.card-image {
  transition: transform 0.3s ease;
}

.card:hover .card-image,
.card:focus-within .card-image {
  transform: scale(1.04);
}
```

width와 height를 직접 애니메이션하지 않는다.

이미지가 부모 박스를 벗어나지 않게 필요한 경우 `overflow: hidden`을 적용한다.

효과를 과도하게 확대하거나 콘텐츠 탐색을 방해하지 않는다.

---

## 24. 이미지 Fallback

이미지 오류 처리는 재사용 가능한 이미지 컴포넌트로 통합한다.

Fallback 이미지는 1회만 적용한다.

Fallback 자체가 실패했을 때 무한 반복 호출이 발생하지 않아야 한다.

재사용 이미지 컴포넌트는 필요한 경우 다음 속성을 지원한다.

- `src`
- `alt`
- `objectFit`
- `objectPosition`
- `aspectRatio`
- `loading`
- `decoding`
- `fallbackSrc`
- `className`

Fallback 적용 후에도 실패하면 장식용 배경 또는 빈 상태 UI를 표시하고 반복 요청하지 않는다.

---

## 25. 이미지 폴더 및 파일명

권장 폴더 구조:

```text
public/images/
├─ common/
├─ hero/
├─ resources/
├─ guides/
├─ thumbnails/
├─ icons/
├─ decorative/
└─ fallbacks/
```

빌드 과정에서 import가 필요한 파일은 `src/assets/`에 둘 수 있다.

파일명은 의미를 알 수 있는 영문 kebab-case를 사용한다.

좋은 예:

- `hero-design-resources.webp`
- `ai-tools-thumbnail.webp`
- `responsive-guide-card.webp`

피할 예:

- `img1.png`
- `final-final.png`
- `새 폴더 복사본.png`

---

## 26. 외부 이미지, 로고 및 저작권

다음 경로에서 무단으로 이미지를 가져오지 않는다.

- Google Images
- Pinterest
- 출처가 불분명한 블로그
- 재배포 조건을 확인할 수 없는 사이트

외부 이미지, 로고, 아이콘 또는 콘텐츠 사용 전 확인 항목:

- 원본 출처
- 저작자
- 라이선스
- 상업적 이용 가능 여부
- 수정 가능 여부
- 출처 표기 조건
- 로고 사용 가이드
- 스크린샷 사용 가능 여부

확인할 수 없는 정보는 임의로 추정하거나 만들어내지 않는다.

라이선스가 불분명하면 다음으로 대체한다.

- Placeholder
- 자체 제작 그래픽
- 사용 조건이 명확한 아이콘
- 직접 제작한 도형
- 공개 라이선스가 검증된 이미지

관련 세부 규칙은 `Project-Manager` 폴더 안의 외부 자료 및 로고 사용 규칙 문서를 우선 확인한다.

---

## 27. 컴포넌트 규칙

새로운 UI를 만들기 전에 기존 컴포넌트를 재사용할 수 있는지 확인한다.

반복되는 UI는 공통 컴포넌트로 분리한다.

단 한 번만 사용하는 단순한 UI까지 무조건 공통 컴포넌트로 분리하지 않는다.

공통 컴포넌트는 역할과 책임이 명확해야 한다.

페이지 전용 데이터와 공통 UI 로직을 불필요하게 한 컴포넌트에 섞지 않는다.

Props가 지나치게 많아지면 컴포넌트 역할을 재검토한다.

---

## 28. React 및 TypeScript

기술 스택은 React + Vite + TypeScript를 사용한다.

원칙:

- TypeScript strict 모드 유지
- `any` 타입 지양
- Props와 공통 데이터 구조에 명확한 타입 작성
- 중복 코드 최소화
- 컴포넌트가 지나치게 커지면 역할별 분리
- 필요하지 않은 추상화 금지
- 실제 필요 전까지 과도한 폴더 생성 금지
- 이벤트와 브라우저 API 타입을 정확히 지정
- 외부 라이브러리 타입을 확인한 뒤 사용
- 타입 오류를 무시하기 위한 강제 캐스팅 남용 금지

---

## 29. 폴더 구조

프로젝트 초기에는 실제로 필요한 폴더만 만든다.

기본 방향:

```text
WORK_VIBE_1/
├─ public/
│  └─ images/
│     ├─ common/
│     ├─ hero/
│     ├─ resources/
│     ├─ guides/
│     ├─ thumbnails/
│     ├─ icons/
│     └─ fallbacks/
├─ src/
│  ├─ app/
│  ├─ assets/
│  ├─ components/
│  │  ├─ common/
│  │  ├─ layout/
│  │  ├─ navigation/
│  │  └─ media/
│  ├─ pages/
│  ├─ sections/
│  ├─ hooks/
│  ├─ lib/
│  │  ├─ animation/
│  │  └─ accessibility/
│  ├─ styles/
│  │  ├─ tokens.css
│  │  ├─ reset.css
│  │  ├─ typography.css
│  │  ├─ utilities.css
│  │  └─ globals.css
│  └─ main.tsx
├─ Project-Manager/
├─ AGENTS.md
├─ CODEX_START_PROMPT.md
└─ README.md
```

`features`, `providers`, `types` 등은 실제 필요성이 생긴 뒤 추가한다.

기존 프로젝트 구조가 이미 있다면 무조건 위 구조로 재편하지 말고, 현재 구조와의 차이와 변경 필요성을 먼저 보고한다.

---

## 30. 접근성

모든 버튼과 링크는 키보드로 접근할 수 있어야 한다.

`focus-visible` 상태를 제공한다.

색상만으로 정보를 구분하지 않는다.

아이콘만 있는 버튼에는 접근 가능한 이름을 제공한다.

가능하면 의미에 맞는 시맨틱 요소를 사용한다.

Modal, Dropdown, Mobile Menu 구현 시 다음을 고려한다.

- Escape 키 닫기
- 적절한 포커스 이동
- 열림 상태 전달
- 배경 콘텐츠 접근 제한이 필요한지 검토
- 스크린리더용 이름
- 키보드 탐색 순서

페이지 전환 중에도 키보드 탐색과 입력 상태를 불필요하게 방해하지 않는다.

---

## 31. 성능

애니메이션은 `transform`과 `opacity`를 우선 사용한다.

불필요한 Layout Thrashing을 피한다.

대용량 이미지, 중복 라이브러리, 사용하지 않는 패키지를 추가하지 않는다.

동일 기능 라이브러리를 중복 설치하지 않는다.

점검 항목:

- 첫 화면 로딩
- 이미지 용량
- 누적 레이아웃 이동
- ScrollTrigger 수
- 이벤트 리스너 정리
- 불필요한 리렌더링
- 긴 메인 스레드 작업
- 모바일 애니메이션 성능
- 번들 크기

최적화는 실제 병목을 확인한 뒤 진행하며, 가독성을 해치는 과도한 조기 최적화를 피한다.

---

## 32. 페이지 전환

페이지 전환은 짧고 자연스럽게 유지한다.

전환 효과가 콘텐츠 접근을 지연시키지 않게 한다.

전환 중에도 가능한 한 접근 가능한 탐색 및 입력 상태를 보존한다.

페이지 전환에 GSAP을 사용할 경우:

- 라우팅 완료 시 cleanup
- 빠른 연속 이동 처리
- 새 페이지 스크롤 위치 정책 명확화
- reduced-motion 환경 비활성화
- 전환 중 포커스 처리
- 브라우저 뒤로 가기 대응

을 고려한다.

---

## 33. 페이지 목록과 MVP

페이지 목록은 사이트 안에서 독립된 화면 또는 URL로 구현할 페이지 목록을 의미한다.

MVP는 첫 번째 완성본에서 반드시 구현할 최소한의 페이지와 기능 범위를 의미한다.

페이지 목록과 MVP는 임의로 확정하지 않는다.

`Project-Manager` 폴더 안의 기획 문서를 읽은 뒤 다음과 같이 분류한다.

- 문서에 명시된 페이지
- 문서에 명시된 기능
- 첫 버전에 반드시 필요한 항목
- 추후 확장 가능한 항목
- 문서에는 없지만 구현상 필요한 추가 제안

추가 제안은 반드시 문서 기반 요구사항과 구분해 표시한다.

---

## 34. 구현 전 필수 확인

기능 구현 전 다음을 확인한다.

1. `AGENTS.md` 규칙과 일치하는가
2. `Project-Manager` 기획 요구사항과 일치하는가
3. 외부 자료 및 로고 사용 조건을 위반하지 않는가
4. 기존 컴포넌트로 해결 가능한가
5. 기존 디자인 토큰을 사용할 수 있는가
6. 모바일 375px과 최소 320px에서 문제가 없는가
7. 키보드 및 focus 접근성을 만족하는가
8. 모션 감소 환경을 고려했는가
9. 이미지 저작권과 라이선스가 확인되었는가
10. 성능을 과도하게 저하시키지 않는가
11. cleanup이 필요한 이벤트와 애니메이션을 정리했는가
12. 문서에 없는 요구사항을 임의로 추가하지 않았는가

기준을 충족하지 못하면 임의로 구현하지 않고 문제와 개선 방향을 먼저 보고한다.

---

## 35. 작업 방식

한 번에 전체 프로젝트를 무리하게 구현하지 않는다.

큰 작업은 다음 순서로 나눈다.

1. 문서 분석
2. 페이지 및 MVP 확정
3. 정보 구조
4. 프로젝트 기반 설정
5. 디자인 토큰과 Reset
6. 공통 Layout
7. Header와 Footer
8. 공통 컴포넌트
9. 정적 페이지
10. 검색, 필터 등 기능
11. CSS 상태 인터랙션
12. GSAP 스크롤 연출
13. 접근성 점검
14. 반응형 점검
15. 성능 최적화
16. 배포 준비

각 단계가 끝나면 다음 내용을 보고한다.

- 변경한 파일
- 구현한 내용
- 아직 남은 내용
- 확인이 필요한 항목
- 테스트 결과
- 다음 추천 작업

사용자가 명시적으로 전체 구현을 요청하지 않는 한, 단계 완료 후 사용자 확인을 받고 다음 단계로 넘어간다.

---

## 36. DIVE 서비스 목적 및 콘텐츠 설계 기준

### 프로젝트명과 브랜드 의미

프로젝트명은 `DIVE`다.

DIVE는 디자인과 웹 제작에 필요한 내용을 깊이 탐색한다는 의미를 가진다.

브랜드 방향은 다음 문장으로 정의한다.

> Dive into better digital experiences.

사용자가 디자인과 퍼블리싱 지식을 깊이 탐색하고 더 나은 디지털 경험을 설계하고 구현하도록 돕는다는 의미다.

### 서비스 목적

DIVE는 UI/UX 디자이너와 웹 퍼블리셔가 실무에 필요한 지식, 지침, 도구, 레퍼런스를 한곳에서 탐색하고 활용할 수 있도록 제공하는 다목적 웹 플랫폼이다.

단순한 외부 링크 모음이나 개인 블로그가 아니라, 사용자가 각 주제를 이해하고 실제 작업에 적용할 수 있도록 구조화된 실무 지침을 제공한다.

### 핵심 사용자

- UI/UX 디자인을 학습하거나 실무에서 활용하는 디자이너
- HTML, CSS, JavaScript 등을 사용하는 웹 퍼블리셔
- 디자인과 퍼블리싱을 함께 다루는 웹디자이너
- 실무 레퍼런스와 제작 기준이 필요한 입문자 및 주니어 실무자

초보자도 이해할 수 있는 설명을 제공하되 실무자에게도 유용한 깊이를 유지한다.

### 주요 Route와 콘텐츠 목적

- `/reference`
  - UI/UX 원칙
  - 사용자 경험 설계
  - 디자인 시스템
  - 접근성
  - 실무 UI 패턴과 레퍼런스
- `/ai`
  - 디자인과 웹 제작에 활용할 수 있는 AI 도구
  - 도구별 특징과 활용 목적
  - 실무 활용 방법과 주의점
- `/resources`
  - 폰트, 아이콘, 이미지, 목업 등의 디자인 리소스
  - 리소스의 용도와 사용 기준
- `/responsive-web`
  - 반응형 웹 설계 원칙
  - Breakpoint, Layout, Typography, Image 대응
  - Desktop, Tablet, Mobile 환경별 실무 지침
- `/libraries`
  - 웹 제작에 활용할 수 있는 라이브러리
  - 라이브러리의 목적, 사용 상황, 장단점과 주의점
  - 필요에 따라 React, GSAP, Swiper 등으로 확장 가능한 정보
- `/publishing-guide`
  - Semantic HTML
  - CSS 구조와 네이밍
  - JavaScript 작성 기준
  - 웹 접근성
  - 성능, SEO, 유지보수를 고려한 퍼블리싱 지침

### 콘텐츠 작성 원칙

콘텐츠는 단순히 무엇을 사용하는지만 나열하지 않는다.

가능한 경우 다음 흐름으로 구성한다.

1. 무엇인지
2. 왜 필요한지
3. 언제 사용하는지
4. 어떻게 사용하는지
5. 실무에서 권장되는 방식
6. 자주 발생하는 실수와 주의점
7. 관련 예시 또는 참고 자료

내용이 짧거나 성격이 다른 경우 모든 단계를 억지로 적용하지 않는다. 사용자가 필요한 정보를 빠르게 이해하는 데 도움이 되는 순서와 깊이를 우선한다.

외부 자료를 다룰 때는 이 문서의 외부 자료 규칙과 `Project-Manager/EXTERNAL_RESOURCE_AND_LOGO_RULES.md`를 함께 적용한다.

### UX 및 디자인 원칙

- 사용자가 원하는 정보에 빠르게 도달할 수 있게 한다.
- 정보 구조와 콘텐츠 우선순위를 명확히 한다.
- 장식보다 가독성과 탐색 효율을 우선한다.
- 정보량이 많아져도 여백과 계층 구조로 쉽게 읽히게 한다.
- 지나치게 딱딱한 기업 사이트나 과도하게 밀집된 개발 문서처럼 보이지 않게 한다.
- 동일한 정보와 UI를 페이지마다 중복 구현하지 않는다.
- 반복 패턴은 재사용 가능한 컴포넌트와 데이터 구조로 관리한다.
- 카드 전체가 클릭 가능하면 클릭 영역과 시각적 피드백을 명확히 한다.
- 접근성, 키보드 탐색, `focus-visible`, `prefers-reduced-motion` 지원을 유지한다.
- 일반 텍스트는 `cursor: default`, 실제 클릭 요소만 `cursor: pointer`, 편집 가능한 입력만 `cursor: text`를 사용한다.
- 모바일은 축소된 데스크톱이 아니라 콘텐츠 우선순위에 따라 재구성한다.
- 시각 효과는 정보 탐색과 이해에 도움이 되는 경우에만 사용한다.
- 과도한 장식, 불필요한 애니메이션, 의미 없는 Hover 효과를 사용하지 않는다.
- 기존 디자인 토큰과 반응형 기준을 우선하며 페이지별 임의 색상, 간격, Breakpoint를 만들지 않는다.

### 개발 및 작업 범위 원칙

- React, TypeScript, React Router 기반의 기존 구조를 유지한다.
- `AppLayout`과 `Outlet` 구조를 유지한다.
- Header, Footer, 전역 스타일은 명확한 필요 없이 수정하지 않는다.
- 공통 UI와 데이터는 재사용 가능한 구조로 분리한다.
- 한 단계에서 요청받은 범위만 구현한다.
- 승인받지 않은 다음 단계까지 진행하지 않는다.
- 새 라이브러리는 명확한 필요성이 생기기 전까지 설치하지 않는다.
- 애니메이션 구현 단계 전까지 GSAP을 설치하지 않는다.
- TypeScript strict, ESLint, 프로덕션 빌드 검사를 유지한다.
- 기존 기능을 변경할 때 변경 범위와 이유를 보고한다.

## 37. 마우스 포인터 규칙

- Default cursor: default
- Clickable elements: pointer
- Text cursor: input, textarea, contenteditable only
- Do not use text cursor on headings, paragraphs, spans, or general content.

---

## 38. 전역 모션 및 Route 전환 원칙

- 클릭, 키보드 입력, 포커스, Route 변경 등 사용자 입력과 기능적 반응을 의도적으로 지연하지 않는다.
- Hover, Focus, 메뉴, 상태 변화 등 시각적 전환은 기본 `300ms` 이상을 사용한다.
- 같은 유형의 인터랙션은 동일한 Duration과 Easing을 사용한다.
- 과도한 Bounce, 회전, 확대, Glow 효과를 사용하지 않는다.
- `prefers-reduced-motion: reduce` 환경에서는 이동과 긴 전환을 제거하거나 즉시 완료 상태로 처리한다.
- 페이지 전환은 콘텐츠 이용을 방해하지 않는 짧고 절제된 Fade와 작은 이동 범위로 구현한다.
- 페이지별로 전환 로직을 반복하지 않고 `Outlet` 주변의 공통 전환 구조에서 관리한다.
- 전환 대상 CSS 속성만 명시하며 `transition: all`을 사용하지 않는다.
