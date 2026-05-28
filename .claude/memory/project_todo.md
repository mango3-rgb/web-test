---
name: project-todo
description: "Suyoung's Secret (web-test) 차후 개발 TO_DO 목록 — 우선순위 및 구현 방향 포함"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6a2ab548-1a50-4c45-895a-80d39fb1ab2f
---

# TO_DO 리스트 (Suyoung's Secret)

**Why:** 세션이 바뀌어도 개발 예정 항목을 놓치지 않기 위함  
**How to apply:** 작업 요청 시 이 목록을 참고해 맥락을 이어서 제안

---

## 🔑 운영 도구

### 1. API 키 관리 기능 (관리자 페이지)
- **내용:** OpenAI API 키(텍스트 생성용 + 챗봇용)를 관리자 웹 UI에서 직접 입력·변경
- **구현 방향:** Supabase Vault에 암호화 저장 → Edge Function이 Vault에서 읽기 (키가 클라이언트에 절대 내려오지 않음)
- **주의사항:** DB 평문 저장 금지, 저장 후 입력란 `****` 마스킹 필수
- **관련 파일:** `src/pages/AdminPage.tsx`, `supabase/functions/generate-fortune-texts/index.ts`, `supabase/functions/openai-chat/index.ts`

---

## 🗄️ 콘텐츠 DB 전환

### 2. 각 운세 페이지 DB 연동 전환
- **내용:** 현재 하드코딩된 데이터를 지난 세션에 생성한 콘텐츠 테이블에서 읽어오도록 전환
- **대상 테이블 → 페이지:**
  - `tarot_cards` → `TaroReading.tsx`
  - `enneagram_questions` + `enneagram_types` → `EnneagramTest.tsx`, `MbtiEnneagram.tsx`
  - `horoscope_signs` → `Horoscope.tsx`
  - `fortune_jiji` → `Saju.tsx`, `SajuDaily.tsx`
  - `fortune_mbti_types` → `Mbti.tsx`
  - `fortune_lucky_colors` + `fortune_cautions` → `FortuneReading.tsx`
- **선행 조건:** 관리자 페이지 "전체 이식" 버튼으로 데이터 먼저 삽입 필요
- **예상 소요:** 페이지당 1~2시간, 전체 약 8~10시간

---

## 📋 게시판

### 3. 문의 게시판 오픈
- **내용:** `/board/inquiry` 현재 "준비중" 페이지 → 실제 게시판 기능 오픈
- **구현 방향:** Supabase `inquiry_posts` 테이블, RLS로 본인 글만 수정·삭제

### 4. 토론 게시판 오픈
- **내용:** `/board/discussion` 현재 "준비중" 페이지 → 커뮤니티 게시판
- **구현 방향:** 댓글 기능 포함, 좋아요/신고 등 기본 기능

---

## 🛒 2차 개발 — 쇼핑/결제 계열
- `Cart.tsx`, `Checkout.tsx`, `OrderConfirmation.tsx`, `OrderHistory.tsx`
- 파일 존재, 라우팅 미연결 상태
- 결제 연동 필요 (PortOne 등)

## 🎓 2차 개발 — 강의/커리큘럼 계열
- `Curriculum.tsx` 계열, `Lecture.tsx` 계열, `InstructorIntro.tsx`, `CompanyIntro.tsx`
- 파일 존재, 라우팅 미연결 상태

## 👤 2차 개발 — 회원 계열
- `MyPage.tsx` — 프로필 편집, 저장된 운세 결과 조회
- `ForgotPassword.tsx` — 비밀번호 재설정 플로우

---

관련 메모리: [[project_webtest_status]] [[project_webtest_future]] [[project_board_plan]]
