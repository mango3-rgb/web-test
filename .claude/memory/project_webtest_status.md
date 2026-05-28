---
name: project-webtest-status
description: web-test 프로젝트 현재 구현 완료 기능 목록 및 Supabase 설정 정보
metadata: 
  node_type: memory
  type: project
  originSessionId: 6a2ab548-1a50-4c45-895a-80d39fb1ab2f
---

# web-test (Suyoung's Secret) 구현 현황

**Why:** 이전 대화가 길어져 컨텍스트 초기화 후에도 작업 맥락을 유지하기 위함  
**How to apply:** 새 대화에서 web-test 작업 요청 시 참고

## 프로젝트 기본 정보
- GitHub Pages: https://mango3-rgb.github.io/web-test
- repo: `D:\mango3\web-test`
- docs/ 폴더 = 빌드 산출물 (GitHub Pages 소스)
- Supabase project ref: `mlesrunnldasvqgqblss`
- 사이트 이름: **Suyoung's Secret** (사주/별자리/MBTI 운세 사이트)
- 브라우저 탭 favicon: S (파란 배경 흰 글자)

## 구현 완료 기능
- Google OAuth 로그인 (Supabase 연동)
- Kakao OAuth 로그인 (REST API Key 사용, account_email 스코프 제거)
- 이메일 회원가입/로그인
- 상담 챗봇 (`/board/consult`) — Supabase Edge Function `openai-chat` 통해 GPT-4o-mini 연동
- MBTI / 혈액형+MBTI / 에니어그램 테스트 결과 Supabase 저장 (`mystic_test_results`)
- 방문자 카운트 추적 (`mystic_visits`, 하루 1회 세션 기반)
- 관리자 페이지 통계 섹션 (방문 통계 + 테스트 결과 분포 바 차트)
- 운세 텍스트 AI 생성 — Edge Function `generate-fortune-texts` (GPT-4o-mini → `mystic_fortune_texts` 저장)
- 관리자 페이지 콘텐츠 DB 이식 UI (8개 테이블 seed 버튼)

## Supabase 테이블
### 운영 테이블
- `mystic_test_results` — session_id, test_type, result, created_at
- `mystic_visits` — visited_at
- `mystic_fortune_texts` — area, period, stars, text_ko, sort_order
- `user_profiles` — 회원 프로필

### 콘텐츠 테이블 (DDL 실행 완료, 데이터 이식 예정)
- `tarot_cards` (22장), `enneagram_questions` (18문항), `enneagram_types` (9가지)
- `horoscope_signs` (12개), `fortune_jiji` (12개), `fortune_mbti_types` (16개)
- `fortune_lucky_colors` (12개), `fortune_cautions` (16개)
- DDL 파일: `scripts/create_content_tables.sql`
- Seed 데이터: `src/data/contentSeedData.ts`

## Edge Functions
- `openai-chat` — 챗봇 API 프록시, OPENAI_API_KEY는 Supabase Secret
- `generate-fortune-texts` — 운세 텍스트 AI 생성, OPENAI_API_KEY는 Supabase Secret
  - 호출 방식: `supabase.functions.invoke()` (apikey 헤더 자동 처리, fetch 직접 호출 시 401 발생)

## 주요 파일
- `src/utils/testStorage.ts` — 테스트 결과/방문 저장 유틸
- `src/pages/ConsultChat.tsx` — 상담 챗봇 UI
- `src/pages/AdminPage.tsx` — 관리자 통계 + 텍스트 생성 + 콘텐츠 이식
- `src/pages/TaroReading.tsx` — 타로 카드 (시드: Date.now(), 매 접속 다른 카드)
- `src/utils/fortuneEngine.ts` — 운세 엔진 (날짜+생년월일 해시, 의도적 설계)
- `src/config/site.ts` — features.auth: true
- `src/utils/auth.ts` — OAuth/이메일 인증 헬퍼

## 알려진 이슈 (미해결)
- 회원가입 시 "Database error saving new user" → `fix_user_profiles.sql` Supabase SQL Editor에서 실행하면 해결

## git push 패턴
원격 충돌 시: `git pull --rebase origin main` → `git checkout --theirs docs/index.html` → `git add docs/index.html` → `GIT_EDITOR=true git rebase --continue` → `git push origin main`

관련 메모리: [[project_todo]] [[project_webtest_future]] [[project_board_plan]]
