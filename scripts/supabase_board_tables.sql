-- =====================================================
-- 운세 플랫폼 게시판 테이블 생성 스크립트
-- Supabase SQL Editor 에서 실행하세요
-- =====================================================

-- 1. 게시글 테이블
CREATE TABLE IF NOT EXISTS mystic_posts (
  id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  board        TEXT         NOT NULL,
  title        TEXT         NOT NULL,
  content      TEXT         NOT NULL,
  author       TEXT         NOT NULL,
  email        TEXT         DEFAULT '',
  created_at   TIMESTAMPTZ  DEFAULT now(),
  view_count   INT          DEFAULT 0,
  comment_count INT         DEFAULT 0
);

-- 2. 댓글 테이블
CREATE TABLE IF NOT EXISTS mystic_board_comments (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID         NOT NULL REFERENCES mystic_posts(id) ON DELETE CASCADE,
  author     TEXT         NOT NULL,
  content    TEXT         NOT NULL,
  created_at TIMESTAMPTZ  DEFAULT now()
);

-- 3. 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_board       ON mystic_posts (board);
CREATE INDEX IF NOT EXISTS idx_posts_created_at  ON mystic_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id  ON mystic_board_comments (post_id);

-- 4. Row Level Security 활성화
ALTER TABLE mystic_posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE mystic_board_comments  ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 (비회원 공개 게시판)
CREATE POLICY "public read posts"    ON mystic_posts          FOR SELECT USING (true);
CREATE POLICY "public insert posts"  ON mystic_posts          FOR INSERT WITH CHECK (true);
CREATE POLICY "public update posts"  ON mystic_posts          FOR UPDATE USING (true);

CREATE POLICY "public read comments"   ON mystic_board_comments FOR SELECT USING (true);
CREATE POLICY "public insert comments" ON mystic_board_comments FOR INSERT WITH CHECK (true);

-- =====================================================
-- 완료 확인
-- =====================================================
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('mystic_posts', 'mystic_board_comments');
