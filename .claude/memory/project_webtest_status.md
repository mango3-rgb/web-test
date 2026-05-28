---
name: project-webtest-status
description: web-test 프로젝트 현재 구현 완료 기능 목록 및 Supabase 설정 정보
metadata: 
  node_type: memory
  type: project
  originSessionId: 6da9a101-cb04-49cd-baaf-653530bd57a6
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

## 구현 완료 기능
- Google OAuth 로그인 (Supabase 연동)
- Kakao OAuth 로그인 (REST API Key 사용, account_email 스코프 제거)
- 이메일 회원가입/로그인
- 상담 챗봇 (`/board/consult`) — Supabase Edge Function `openai-chat` 통해 GPT-4o-mini 연동
- MBTI / 혈액형+MBTI / 에니어그램 테스트 결과 Supabase 저장 (`mystic_test_results`)
- 방문자 카운트 추적 (`mystic_visits`, 하루 1회 세션 기반)
- 관리자 페이지 통계 섹션 (방문 통계 + 테스트 결과 분포 바 차트)

## Supabase 테이블
- `mystic_test_results` — session_id, test_type, result, created_at
- `mystic_visits` — visited_at
- `user_profiles` — 회원 프로필 (fix_user_profiles.sql로 생성 필요할 수 있음)

## Edge Function
- `openai-chat` — OpenAI API 프록시, OPENAI_API_KEY는 Supabase Secret으로 저장

## 주요 파일
- `src/utils/testStorage.ts` — 테스트 결과/방문 저장 유틸
- `src/pages/ConsultChat.tsx` — 상담 챗봇 UI
- `src/pages/AdminPage.tsx` — 관리자 통계 포함
- `src/config/site.ts` — features.auth: true
- `src/utils/auth.ts` — OAuth/이메일 인증 헬퍼

## 알려진 이슈 (미해결)
- 회원가입 시 "Database error saving new user" → `fix_user_profiles.sql` (D:\mango3\web-test\) Supabase SQL Editor에서 실행하면 해결

## git push 패턴
원격 충돌 시: `git pull --rebase origin main` → `git checkout --theirs docs/index.html` → `git add docs/index.html` → `git rebase --continue` → `git push origin main`
