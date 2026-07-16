# 🛍️ ShopMall — React 쇼핑몰 프로젝트

Fake Store API와 Firebase Authentication을 활용한 React 기반 쇼핑몰 프로젝트입니다.

---

## 📸 주요 화면

| 화면 | 설명 |
|---|---|
| 홈 / 상품 목록 | Fake Store API에서 상품 20개를 카드 형태로 표시 |
| 상품 상세 | 이미지, 설명, 평점, 장바구니 담기 |
| 장바구니 | 수량 조절, 삭제, 총액 계산 (로그인 필요) |
| 로그인 | Firebase Google 로그인 팝업 |

---

## ⚙️ 기술 스택

| 분류 | 기술 |
|---|---|
| UI | React 18, Vite |
| 전역 상태 | Redux Toolkit (RTK), React-Redux |
| 라우팅 | React Router DOM v6 |
| 인증 | Firebase Authentication (Google 로그인) |
| 상품 데이터 | Fake Store API (https://fakestoreapi.com) |

---

## 🗂️ 상태 관리 구조

### Redux Store

```
{
  cart:     { items: [] }                          // cartSlice
  auth:     { user, loading, error }               // authSlice
  products: { items, selectedItem, categories,     // productSlice
              filterCategory, status, error }
}
```

### product 필드 매핑 (Fake Store API → 내부)

| API 필드 | 내부 필드 | 타입 |
|---|---|---|
| `id` | `id` | number |
| `title` | `title` | string |
| `price` | `price` | number |
| `image` | `image` | string (URL) |
| `category` | `category` | string |

### cartItem 구조

```js
{ id: number, title: string, price: number, image: string, quantity: number }
```

### authUser 구조

```js
{ uid: string, displayName: string, email: string, photoURL: string }
```

### 주요 selector

| selector | 반환값 |
|---|---|
| `selectCartItems` | 장바구니 상품 배열 |
| `selectCartTotalCount` | 전체 수량 합계 |
| `selectCartTotalPrice` | 전체 금액 합계 |
| `selectFilteredProducts` | 카테고리 필터 적용된 상품 목록 |
| `selectIsLoggedIn` | 로그인 여부 (boolean) |
| `selectAuthLoading` | Firebase 초기화 로딩 상태 |

---

## 🔐 Firebase 인증

- **로그인**: `signInWithPopup` + `GoogleAuthProvider`
- **로그아웃**: `signOut(auth)`
- **상태 유지**: `onAuthStateChanged` (App.jsx에서 앱 전체 구독, 언마운트 시 `unsubscribe()` 정리)
- **초기 로딩 분리**: `auth.loading: true`로 시작 → 인증 확인 완료 후 `false`
- **인증 오류**: `setError(error.message)` → LoginPage에서 안내 문구 표시
- **ProtectedRoute**: `auth.loading` 중에는 렌더링 보류, 비로그인 시 `/login`으로 리다이렉트

---

## 🌐 API 정보

- **엔드포인트**: `https://fakestoreapi.com`
- 전체 상품: `GET /products`
- 단일 상품: `GET /products/:id`
- 카테고리: `GET /products/categories`
- `createAsyncThunk` + `extraReducers`로 `pending / fulfilled / rejected` 상태 처리

---

## 🚀 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env
# .env 파일에 Firebase 설정값 입력

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 🔑 환경 변수

`.env.example`을 복사해 `.env` 파일을 만들고 Firebase 콘솔에서 발급받은 값을 입력하세요.

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 🤖 AI 활용 기록

- **사용 AI**: Claude (Anthropic)
- **제안 구조**: 폴더 구조, 슬라이스 설계, 컴포넌트 분리, API 연동 패턴
- **채택 부분**: Redux Toolkit 슬라이스 전체, Firebase onAuthStateChanged 패턴, ProtectedRoute 구현
- **수정 내용**: Firebase 실제 config 값 교체, 이미지 fallback UI 추가

---

## 🐛 오류 해결 기록

| 영역 | 상황 | 원인 | 수정 |
|---|---|---|---|
| Firebase | 로그인 팝업 차단 | 브라우저 팝업 차단 설정 | 브라우저 팝업 허용 후 재시도 |
| Vite | 포트 5173 충돌 | 다른 Vite 서버 실행 중 | 자동으로 5174 포트 사용 |

---

## 🔒 보안 및 개인정보

- Firebase 웹 API 키는 클라이언트 공개 키로 브라우저에 노출됩니다 (의도된 설계)
- Firebase Console → Authentication → 승인된 도메인 설정으로 무단 사용 방지
- 실제 서비스 배포 시 `.env` 파일은 `.gitignore`에 추가 필요
- 개인정보(이메일, UID 등)는 Redux에만 저장되며 외부 전송 없음

---

## ✅ 기능 체크리스트

- [x] 상품 목록 조회 (Fake Store API)
- [x] 카테고리 필터링
- [x] 상품 상세 페이지
- [x] 장바구니 담기 / 수량 조절 / 삭제
- [x] 장바구니 총액 계산 (selector)
- [x] Firebase Google 로그인 / 로그아웃
- [x] 로그인 상태 유지 (onAuthStateChanged)
- [x] 장바구니 페이지 인증 보호 (ProtectedRoute)
- [x] 로딩 / 에러 / 빈 데이터 상태 처리
- [x] 이미지 로드 실패 대체 UI

---

## 📌 한계 및 다음 개선 사항

- 장바구니 localStorage 영속성 (새로고침 시 초기화됨)
- TypeScript 미사용
- 결제 / 주문 / 배송 기능 미포함 (범위 외)
- 반응형 모바일 UI 개선 필요
