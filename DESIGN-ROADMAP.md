# DESIGN-ROADMAP.md — Art Hub 4.2 추가 디자인 작업 기획

## 0. 이 문서의 역할

`DESIGN.md`는 **규범**이다. "무엇이 옳은가"를 정의하고, 판단이 갈릴 때 근거가 된다.
이 문서는 **실행 계획**이다. "무엇을, 어떤 순서로, 어디까지 하면 끝인가"를 정의한다.

두 문서는 역할이 다르므로 합치지 않는다.

- 새 비주얼 원칙이 생기면 → `DESIGN.md`에 추가
- 새 작업 단위가 생기면 → 이 문서에 트랙 카드로 추가
- 트랙이 끝나면 → 이 문서에서 완료 처리, 규범이 바뀌었으면 `DESIGN.md`에 반영

---

## 1. 기획 구성 원칙

### 1.1 레이어 순서를 지킨다

디자인 작업은 아래에서 위로 쌓는다. 순서를 뒤집으면 같은 화면을 두 번 만진다.

```
Layer 2  품질 · 접근성 · 구조 정리
Layer 1  시즌 시스템 (DESIGN.md §9 구현 우선순위)
Layer 0  토큰 · 앱 셸  ← 여기가 안 잡히면 위 작업이 전부 재작업된다
```

지금까지의 커밋 이력(`design: 전체 톤 밝기 조정`, `design: 클래시컬 골드 시스템 완성`)은
Layer 0가 없는 상태에서 화면별로 값을 직접 고친 결과다. 그래서 배경색 하나를 바꾸는 데
8개 파일을 만져야 하고, 바꾼 뒤에도 값이 어긋난다.

### 1.2 트랙 단위로 쪼갠다

작업 단위는 "페이지"나 "예쁘게"가 아니라 **트랙**이다. 트랙 하나는 5개 요소를 갖는다.

| 요소 | 설명 |
|---|---|
| **문제** | 측정 가능한 현상. "어색하다"가 아니라 "배경색이 4개 값으로 갈려 있다" |
| **완료 정의(DoD)** | 무엇이 참이 되면 끝인지. 검증 가능한 문장으로 |
| **영향 범위** | 손대는 파일/폴더 |
| **검증** | 빌드·린트 + 회귀를 잡을 grep 한 줄 |
| **크기 / 선행** | S(반나절) · M(1~2일) · L(3일+) / 먼저 끝나야 하는 트랙 |

### 1.3 "톤 조정"은 트랙이 아니다

값을 직접 만지는 커밋은 트랙이 될 수 없다. 토큰을 바꾸는 것만 트랙이 된다.
`design:` 커밋이 컴포넌트 파일을 5개 이상 건드리고 있으면, 그건 Layer 0 부채 신호다.

---

## 2. 현재 상태 진단

측정 시점: `ba5a62b` (feat: refine archive experience and add genre guide)

### 2.1 토큰이 단일 소스가 아니다

배경색 하나가 네 곳에서 다른 값을 갖는다.

| 위치 | 값 | 실제 적용 여부 |
|---|---|---|
| `DESIGN.md` Canvas | `#0F0F0D` | 규범값 |
| `tailwind.config.ts` `canvas.DEFAULT` | `#0A0A0A` | `layout.tsx`의 `bg-canvas`로 body에 적용 |
| `globals.css` `--background` | `#0F0F0F` | body에서 `bg-canvas`에 덮여 **사실상 죽은 값** |
| 각 페이지 루트 | `bg-[#0F0F0F]` ×6, `bg-[#141414]` ×1 | 실제로 보이는 값 |

그 외:

- `#C9A96E` 하드코딩 **190회**. `gold` 토큰이 있는데도 쓰이지 않는다.
- `paper` `oxide` `ink` `mist`는 Tailwind 토큰에 **없다**. `text-[#5E7A73]` 같은 임의 값으로 흩어져 있다.
- 중성 회색은 브랜드 Mist Text(`#A29A8B`) 대신 Tailwind 기본 `zinc`를 **153회** 사용한다.
- `BackgroundGlow`가 `sky-800` `indigo-700` `emerald-700` 등 브랜드 밖 팔레트를 쓴다.
  `DESIGN.md`의 "Avoid purple-led glows and generic neon gradients"와 정면으로 어긋난다.

### 2.2 앱 셸이 페이지마다 다르다

| | 네비게이션 | 푸터 |
|---|---|---|
| `/` | `HomeNav` | `HomeFooter` |
| `/guide`, `/guide/[genre]` | `Navigation` | 없음 |
| `/exhibitions`, `/exhibitions/[id]`, `/about`, `/bookmarks`, 404 | **없음** | 없음 |

`components/Footer.tsx`는 **어디에서도 import되지 않는 데드코드**다.
그 안의 "Spring 2026 Edition"과 `HeroSection`의 "Spring-Summer 2026"이 서로 다르다.

### 2.3 `DESIGN.md` §9 구현 우선순위 4개 중 완료 0개

1. Season identity system → 시즌 문자열이 11개 파일에 흩어져 있고 데이터 소스가 없다
2. Sticky chapter rail → `HomeNav`가 홈 스크롤만 추적, chapter 개념 없음
3. Seasonal archive / editions index → `/editions` 라우트 없음
4. CTA 문법 통일 → "Enter Season" "Browse Season" "Full Season Index" "Season Archive"
   "Return to Archive" "Back to Index" "Resonance Index"가 혼용

### 2.4 접근성 · 구조

- `framer-motion` 사용 컴포넌트 **16개가 reduced-motion 미처리**.
  `DESIGN.md` §7 "Motion must reduce gracefully" 위반.
- `ExhibitionTabs.tsx` **904줄**. 전시 상세의 대부분이 한 파일에 있어 디자인 수정 시 충돌 위험이 크다.

---

## 3. 트랙

### Layer 0 — 기반

#### T1. 디자인 토큰 단일화 · `M` · 선행 없음

- **문제** — 2.1. 배경 4중 불일치, gold 190회 하드코딩, paper/oxide/ink/mist 미토큰화,
  중성색 zinc 153회, glow가 브랜드 밖 팔레트 사용.
- **DoD**
  - `tailwind.config.ts`가 `DESIGN.md` §3 색상 8종을 전부 토큰으로 노출한다
    (`canvas` `ink` `gold` `gold-soft` `oxide` `paper` `paper-shadow` `mist`).
  - `globals.css`의 CSS 변수와 Tailwind 토큰이 **같은 값**을 가리킨다.
  - `layout.tsx`가 배경을 한 번만 선언하고, 페이지 루트에서 `bg-[#...]`가 사라진다.
  - `BackgroundGlow`가 `gold | oxide | ink` 세 가지 브랜드 프리셋만 받는다.
  - `src/**` 내 `#C9A96E` 하드코딩 0건.
- **영향** — `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`,
  `src/components/BackgroundGlow.tsx`, 페이지 루트 7개
- **검증**
  ```bash
  grep -rn "#C9A96E" src | wc -l              # → 0
  grep -rn 'bg-\[#' src/app --include=page.tsx | wc -l   # → 0
  npm run lint && npm run build
  ```

#### T2. 앱 셸 통일 · `M` · 선행 T1

- **문제** — 2.2. Nav 2종 + 미적용 5페이지, 미사용 Footer 데드코드, 시즌 문자열 불일치.
- **DoD**
  - `SiteHeader` / `SiteFooter` 각 1개로 통합. 홈은 챕터 추적을 prop으로 켠다.
  - 7개 라우트 전부 동일 셸을 쓴다(404 포함).
  - `components/Footer.tsx` 삭제.
  - 셸이 `bg-canvas`를 상속하고 자체 배경을 선언하지 않는다.
- **영향** — `src/components/Navigation.tsx`, `src/components/home/HomeNav.tsx`,
  `src/components/home/HomeFooter.tsx`, `src/components/Footer.tsx`, 라우트 7개
- **검증** — 각 라우트에서 헤더/푸터 렌더 확인, `grep -rn "HomeNav\|Navigation" src | wc -l` 감소

### Layer 1 — 시즌 시스템 (`DESIGN.md` §9)

#### T3. 시즌 아이덴티티 데이터화 · `S` · 선행 T2 · **§9 우선순위 1**

- **문제** — 시즌 문자열이 11개 파일에 하드코딩돼 있고, "Spring 2026" / "Spring-Summer 2026"처럼 값이 서로 다르다.
- **DoD**
  - `src/lib/season.ts`가 `{ id, title, subtitle, period, chapters[] }`를 단일 소스로 제공한다.
  - 시즌 문자열을 쓰는 모든 컴포넌트가 이 모듈만 참조한다.
  - 시즌을 하나 추가할 때 컴포넌트를 수정할 필요가 없다.
- **영향** — `src/lib/season.ts`(신규), `home/*` 5개, `SiteFooter`
- **검증** — `grep -rn "Spring" src --include=*.tsx | wc -l` → 0

#### T4. 챕터 레일 · `M` · 선행 T3 · **§9 우선순위 2**

- **문제** — 현재 nav가 일반적인 앵커 목록이라 "챕터로 구성된 에디션" 느낌이 없다.
- **DoD**
  - 챕터 목록을 `season.ts`에서 받아 렌더한다(하드코딩 배열 제거).
  - 스크롤 진행 표시가 있고, 모바일에서 가로 스크롤 레일로 접힌다.
  - 키보드 이동과 `:focus-visible`이 동작한다.
- **영향** — `SiteHeader`, `src/app/page.tsx`, `src/lib/season.ts`

#### T5. Editions 인덱스 · `L` · 선행 T3 · **§9 우선순위 3**

- **문제** — `/editions` 라우트가 없다. 과거 시즌을 "표지/권"처럼 볼 방법이 없다.
- **DoD**
  - `/editions`가 시즌 목록을, `/editions/[id]`가 시즌 상세를 렌더한다.
  - `DESIGN.md` §4 "Archive Section"의 paper 톤을 따른다(hero보다 따뜻하게).
  - 홈 `ArchiveSection`의 "Full Season Index"가 여기로 연결된다.
- **영향** — `src/app/editions/**`(신규), `home/ArchiveSection.tsx`, `src/lib/season.ts`

#### T6. CTA 문법 통일 · `S` · 선행 T3 · **§9 우선순위 4**

- **문제** — 2.3. 같은 동작에 7가지 표현이 쓰인다.
- **DoD**
  - `DESIGN.md` §5 어휘를 기준으로 동사 세트를 확정한다
    (예: `Enter` 진입 · `Browse` 탐색 · `Save` 저장 · `Reserve` 예약 · `Return` 복귀).
  - 문구를 `src/lib/copy.ts`에 모으고 컴포넌트는 상수만 참조한다.
  - `DESIGN.md` §5에 확정된 동사 세트를 역기록한다.
- **영향** — `src/lib/copy.ts`(신규), CTA를 가진 전 컴포넌트

### Layer 2 — 품질 · 구조

#### T7. 모션 · 접근성 규격화 · `M` · 선행 T1

- **문제** — 2.4. 모션 컴포넌트 16개가 reduced-motion을 무시한다.
- **DoD**
  - `useMotionSafe()` 훅 하나로 처리를 통일하고 16개 컴포넌트에 적용한다.
  - `DESIGN.md` §3 Motion의 150–300ms 규격을 트랜지션 토큰으로 고정한다.
  - hover 전용 동작이 없다(§7 "No feature should depend on hover alone").
  - 모든 인터랙티브 요소에 `:focus-visible`이 보인다.
- **영향** — `src/hooks/useMotionSafe.ts`(신규), 모션 컴포넌트 16개

#### T8. 전시 상세 구조 정리 · `L` · 선행 T2

- **문제** — `ExhibitionTabs.tsx` 904줄. 디자인 수정 시 충돌·회귀 위험.
- **DoD**
  - 탭별 컴포넌트로 분해, 각 파일 250줄 이하.
  - `components/guide/` 와 같은 폴더 규약(`index.ts` + `types.ts`)을 따른다.
  - 시각적 결과는 변경 없음(순수 리팩터링).
- **영향** — `src/components/ExhibitionTabs.tsx` → `src/components/exhibition/**`

---

## 4. 배치

| 회차 | 트랙 | 목표 |
|---|---|---|
| **1 — 기반** | T1, T2 | 색·셸을 한 곳에서 바꿀 수 있는 상태 |
| **2 — 시즌** | T3, T6, T4 | 시즌이 데이터가 되고 문구가 일관됨 |
| **3 — 확장** | T5, T7, T8 | 에디션 인덱스 · 접근성 · 구조 부채 정리 |

회차 1을 건너뛰고 2로 가지 않는다. T3~T6은 전부 색과 셸을 만지므로, T1·T2 없이 진행하면
같은 파일을 두 번 수정하게 된다.

---

## 5. 트랙 카드 템플릿

새 작업을 추가할 때 이 형식을 복사한다.

```markdown
#### T{n}. {제목} · `S|M|L` · 선행 {트랙 또는 없음}

- **문제** — 측정 가능한 현상. 수치나 파일 수로 쓴다.
- **DoD**
  - 검증 가능한 문장 3~5개
- **영향** — 파일/폴더
- **검증** — grep 한 줄 + `npm run lint && npm run build`
```

---

## 6. 리뷰 체크리스트

트랙을 닫기 전에 확인한다.

- [ ] `npm run lint` · `npm run build` 통과
- [ ] 트랙의 검증 grep이 기대값을 반환
- [ ] `DESIGN.md` §8 성공 기준 통과 — "아트 단어를 붙인 SaaS 랜딩"처럼 보이지 않는가
- [ ] 모바일에서 가로 스크롤이 생기지 않는가 (§4)
- [ ] reduced-motion에서 화면이 정상 동작하는가 (§7)
- [ ] 새 하드코딩 색상을 추가하지 않았는가
- [ ] 규범이 바뀌었다면 `DESIGN.md`에 반영했는가
