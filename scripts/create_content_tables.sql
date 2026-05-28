-- ═══════════════════════════════════════════════════════════════════
-- Suyoung's Secret — 콘텐츠 DB 테이블 DDL
-- 대상: 타로카드, 에니어그램, 별자리, 띠, MBTI, 행운색, 주의사항
-- 실행: Supabase 대시보드 > SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────
-- 1. 타로카드 (22장 메이저 아르카나)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tarot_cards (
  id            SMALLINT PRIMARY KEY,          -- 0~21 (The Fool ~ The World)
  name          TEXT     NOT NULL,             -- 영문명 e.g. 'The Fool'
  name_ko       TEXT     NOT NULL,             -- 한글명 e.g. '바보'
  symbol        TEXT     NOT NULL,             -- 대표 이모지
  element       TEXT     NOT NULL,             -- 원소 e.g. '풍(風)'
  keyword       TEXT     NOT NULL,             -- 핵심 키워드
  upright       TEXT     NOT NULL,             -- 정방향 일반 해석
  reversed      TEXT     NOT NULL,             -- 역방향 일반 해석
  money_up      TEXT     NOT NULL,             -- 재물 정방향 메시지
  money_rev     TEXT     NOT NULL,             -- 재물 역방향 메시지
  love_up       TEXT     NOT NULL,             -- 사랑 정방향 메시지
  love_rev      TEXT     NOT NULL,             -- 사랑 역방향 메시지
  career_up     TEXT     NOT NULL,             -- 직업 정방향 메시지
  career_rev    TEXT     NOT NULL,             -- 직업 역방향 메시지
  health_up     TEXT     NOT NULL,             -- 건강 정방향 메시지
  health_rev    TEXT     NOT NULL,             -- 건강 역방향 메시지
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────────────────────────
-- 2. 에니어그램 질문 (18문항)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enneagram_questions (
  id            SMALLINT PRIMARY KEY,          -- 1~18
  question      TEXT     NOT NULL,
  ennea_type    SMALLINT NOT NULL CHECK (ennea_type BETWEEN 1 AND 9)
);

-- ───────────────────────────────────────────────────────────────────
-- 3. 에니어그램 유형 (9가지)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enneagram_types (
  type_no       SMALLINT PRIMARY KEY CHECK (type_no BETWEEN 1 AND 9),
  symbol        TEXT     NOT NULL,
  name          TEXT     NOT NULL,             -- e.g. '개혁가'
  keyword       TEXT     NOT NULL,             -- e.g. '원칙과 완벽'
  core          TEXT     NOT NULL              -- 핵심 성향 장문 텍스트
);

-- ───────────────────────────────────────────────────────────────────
-- 4. 별자리 기본정보 (12개)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS horoscope_signs (
  id            TEXT     PRIMARY KEY,          -- 'aries','taurus','gemini'...
  symbol        TEXT     NOT NULL,             -- '♈'
  name          TEXT     NOT NULL,             -- '양자리'
  dates         TEXT     NOT NULL,             -- '3.21~4.19'
  trait         TEXT     NOT NULL,             -- '열정적이고 개척적인'
  energy_money  SMALLINT NOT NULL DEFAULT 1,
  energy_love   SMALLINT NOT NULL DEFAULT 1,
  energy_career SMALLINT NOT NULL DEFAULT 1,
  energy_health SMALLINT NOT NULL DEFAULT 1,
  life_early    TEXT     NOT NULL DEFAULT '',  -- 초년기 설명
  life_middle   TEXT     NOT NULL DEFAULT '',  -- 중년기 설명
  life_late     TEXT     NOT NULL DEFAULT ''   -- 말년기 설명
);

-- ───────────────────────────────────────────────────────────────────
-- 5. 띠 / 지지 (12개)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fortune_jiji (
  id            TEXT     PRIMARY KEY,          -- 'ja','ch','in','myo'...
  name          TEXT     NOT NULL,             -- '子','丑','寅'...
  animal        TEXT     NOT NULL,             -- '🐭 쥐'
  trait         TEXT     NOT NULL,             -- '영리하고 적응력이 뛰어난'
  energy_money  SMALLINT NOT NULL DEFAULT 1,
  energy_love   SMALLINT NOT NULL DEFAULT 1,
  energy_career SMALLINT NOT NULL DEFAULT 1,
  energy_health SMALLINT NOT NULL DEFAULT 1,
  life_early    TEXT     NOT NULL DEFAULT '',
  life_middle   TEXT     NOT NULL DEFAULT '',
  life_late     TEXT     NOT NULL DEFAULT ''
);

-- ───────────────────────────────────────────────────────────────────
-- 6. MBTI 유형 (16개)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fortune_mbti_types (
  id            TEXT     PRIMARY KEY,          -- 'INTJ','INFP'...
  nick          TEXT     NOT NULL,             -- '전략가'
  trait         TEXT     NOT NULL,             -- '전략적이고 독립적인'
  energy_money  SMALLINT NOT NULL DEFAULT 1,
  energy_love   SMALLINT NOT NULL DEFAULT 1,
  energy_career SMALLINT NOT NULL DEFAULT 1,
  energy_health SMALLINT NOT NULL DEFAULT 1
);

-- ───────────────────────────────────────────────────────────────────
-- 7. 행운의 색 (12개)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fortune_lucky_colors (
  id            SMALLSERIAL PRIMARY KEY,
  name          TEXT     NOT NULL,             -- '크림슨 레드'
  hex           TEXT     NOT NULL,             -- '#DC2626'
  meaning       TEXT     NOT NULL              -- '강렬한 에너지로...'
);

-- ───────────────────────────────────────────────────────────────────
-- 8. 분야별 주의사항 (4분야 × 4개 = 16행)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fortune_cautions (
  id            SMALLSERIAL PRIMARY KEY,
  area          TEXT     NOT NULL CHECK (area IN ('money','love','career','health')),
  caution       TEXT     NOT NULL
);

-- ═══════════════════════════════════════════════════════════════════
-- RLS 설정
-- ═══════════════════════════════════════════════════════════════════
ALTER TABLE tarot_cards          ENABLE ROW LEVEL SECURITY;
ALTER TABLE enneagram_questions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE enneagram_types      ENABLE ROW LEVEL SECURITY;
ALTER TABLE horoscope_signs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE fortune_jiji         ENABLE ROW LEVEL SECURITY;
ALTER TABLE fortune_mbti_types   ENABLE ROW LEVEL SECURITY;
ALTER TABLE fortune_lucky_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE fortune_cautions     ENABLE ROW LEVEL SECURITY;

-- 전체 공개 읽기
CREATE POLICY "public read tarot_cards"          ON tarot_cards          FOR SELECT USING (true);
CREATE POLICY "public read enneagram_questions"  ON enneagram_questions  FOR SELECT USING (true);
CREATE POLICY "public read enneagram_types"      ON enneagram_types      FOR SELECT USING (true);
CREATE POLICY "public read horoscope_signs"      ON horoscope_signs      FOR SELECT USING (true);
CREATE POLICY "public read fortune_jiji"         ON fortune_jiji         FOR SELECT USING (true);
CREATE POLICY "public read fortune_mbti_types"   ON fortune_mbti_types   FOR SELECT USING (true);
CREATE POLICY "public read fortune_lucky_colors" ON fortune_lucky_colors FOR SELECT USING (true);
CREATE POLICY "public read fortune_cautions"     ON fortune_cautions     FOR SELECT USING (true);

-- 관리자만 쓰기 (is_admin() 함수는 setup_admin_role.sql 에서 생성됨)
CREATE POLICY "admin write tarot_cards"          ON tarot_cards          FOR ALL USING (is_admin());
CREATE POLICY "admin write enneagram_questions"  ON enneagram_questions  FOR ALL USING (is_admin());
CREATE POLICY "admin write enneagram_types"      ON enneagram_types      FOR ALL USING (is_admin());
CREATE POLICY "admin write horoscope_signs"      ON horoscope_signs      FOR ALL USING (is_admin());
CREATE POLICY "admin write fortune_jiji"         ON fortune_jiji         FOR ALL USING (is_admin());
CREATE POLICY "admin write fortune_mbti_types"   ON fortune_mbti_types   FOR ALL USING (is_admin());
CREATE POLICY "admin write fortune_lucky_colors" ON fortune_lucky_colors FOR ALL USING (is_admin());
CREATE POLICY "admin write fortune_cautions"     ON fortune_cautions     FOR ALL USING (is_admin());
