---
name: project-webtest-future
description: mango3-rgb.github.io/web-test 프로젝트에서 파일은 존재하지만 아직 라우팅 미연결된 페이지들 — 차후 개발 예정
metadata: 
  node_type: memory
  type: project
  originSessionId: eadf7fb1-fc33-4ba1-aa00-3eabb88833fa
---

GitHub: mango3-rgb/web-test (Suyoung's Secret | 사주·별자리·MBTI·타로카드)
확인일: 2026-05-27

## 차후 개발 예정 페이지 (파일 존재, 라우팅 미연결)

### 강의/커리큘럼 계열
- `Curriculum.tsx`
- `CurriculumBasic.tsx`
- `CurriculumIntermediate.tsx`
- `CurriculumAdvanced.tsx`
- `Lecture.tsx`
- `LectureBasic.tsx`
- `LectureIntermediate.tsx`
- `LectureAdvanced.tsx`
- `LectureSetup.tsx`
- `InstructorIntro.tsx`
- `CompanyIntro.tsx`

### 쇼핑/결제 계열
- `Cart.tsx`
- `Checkout.tsx`
- `OrderConfirmation.tsx`
- `OrderHistory.tsx`

### 회원 계열
- `Login.tsx`
- `Register.tsx`
- `ForgotPassword.tsx`
- `MyPage.tsx`

### 기타
- `Practice.tsx`
- `VibePractice.tsx`
- `RecommendedSites.tsx`
- `PromptLearning.tsx`
- `PromptCases.tsx`

**Why:** 사용자가 차후 디벨롭 예정이라고 명시. 현재는 src/pages에 파일만 있고 PublicLayout.tsx의 라우팅에 미연결 상태.
**How to apply:** 이 페이지들 관련 작업 요청 시 기존 파일 존재함을 인지하고, 라우팅 연결 및 기능 구현 방향으로 안내.

## 현재 활성 라우팅 요약 (2026-05-27 기준)
- `/`, `/saju`, `/saju/daily`, `/saju/compatibility`
- `/horoscope`, `/horoscope/compatibility`
- `/mbti`, `/mbti/compatibility`, `/mbti/test`, `/mbti/enneagram-test`, `/mbti/enneagram`
- `/fortune`, `/taro`
- `/board/inquiry`, `/board/discussion`
- `/about`, `/about/consult`
- `/admin`

관련 메모리: [[project_board_plan]]
