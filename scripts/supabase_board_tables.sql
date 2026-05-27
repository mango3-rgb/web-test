-- =====================================================
-- 운세 플랫폼 전체 테이블 생성 스크립트 v3
-- Supabase SQL Editor 에서 실행하세요
-- =====================================================

-- ─── 0. 기존 깨진 트리거/함수 먼저 제거 ───────────────
DROP TRIGGER  IF EXISTS on_auth_user_created    ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user()        CASCADE;
DROP FUNCTION IF EXISTS check_user_status(UUID, TEXT) CASCADE;

-- ─── 1. user_profiles 테이블 ──────────────────────────
CREATE TABLE IF NOT EXISTS user_profiles (
  id               UUID         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email            TEXT         DEFAULT '',
  name             TEXT         DEFAULT '',
  display_name     TEXT         DEFAULT '',
  avatar_url       TEXT         DEFAULT '',
  phone            TEXT         DEFAULT '',
  provider         TEXT         DEFAULT 'email',
  role             TEXT         DEFAULT 'member',
  signup_domain    TEXT         DEFAULT '',
  visited_sites    TEXT[]       DEFAULT '{}',
  last_sign_in_at  TIMESTAMPTZ,
  updated_at       TIMESTAMPTZ  DEFAULT now(),
  created_at       TIMESTAMPTZ  DEFAULT now()
);

-- ─── 2. user_profiles RLS ─────────────────────────────
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read own profile"   ON user_profiles;
DROP POLICY IF EXISTS "users update own profile" ON user_profiles;
DROP POLICY IF EXISTS "service insert profile"   ON user_profiles;

CREATE POLICY "users read own profile"   ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "service insert profile"   ON user_profiles FOR INSERT WITH CHECK (true);

-- ─── 3. 신규 가입 자동 프로필 생성 트리거 ────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, name, display_name, provider, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.app_metadata->>'provider', 'email'),
    'member'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── 4. 계정 상태 확인 함수 ───────────────────────────
CREATE OR REPLACE FUNCTION check_user_status(target_user_id UUID, current_domain TEXT)
RETURNS JSON LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN json_build_object('status', 'active');
END;
$$;

-- ─── 5. 게시글 테이블 ─────────────────────────────────
CREATE TABLE IF NOT EXISTS mystic_posts (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  board         TEXT         NOT NULL,
  title         TEXT         NOT NULL,
  content       TEXT         NOT NULL,
  author        TEXT         NOT NULL,
  email         TEXT         DEFAULT '',
  created_at    TIMESTAMPTZ  DEFAULT now(),
  view_count    INT          DEFAULT 0,
  comment_count INT          DEFAULT 0
);

-- ─── 6. 댓글 테이블 ───────────────────────────────────
CREATE TABLE IF NOT EXISTS mystic_board_comments (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID         NOT NULL REFERENCES mystic_posts(id) ON DELETE CASCADE,
  author     TEXT         NOT NULL,
  content    TEXT         NOT NULL,
  created_at TIMESTAMPTZ  DEFAULT now()
);

-- ─── 7. 인덱스 ────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_posts_board      ON mystic_posts (board);
CREATE INDEX IF NOT EXISTS idx_posts_created    ON mystic_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON mystic_board_comments (post_id);

-- ─── 8. 게시판 RLS ────────────────────────────────────
ALTER TABLE mystic_posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE mystic_board_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read posts"      ON mystic_posts;
DROP POLICY IF EXISTS "public insert posts"    ON mystic_posts;
DROP POLICY IF EXISTS "public update posts"    ON mystic_posts;
DROP POLICY IF EXISTS "public read comments"   ON mystic_board_comments;
DROP POLICY IF EXISTS "public insert comments" ON mystic_board_comments;

CREATE POLICY "public read posts"      ON mystic_posts          FOR SELECT USING (true);
CREATE POLICY "public insert posts"    ON mystic_posts          FOR INSERT WITH CHECK (true);
CREATE POLICY "public update posts"    ON mystic_posts          FOR UPDATE USING (true);
CREATE POLICY "public read comments"   ON mystic_board_comments FOR SELECT USING (true);
CREATE POLICY "public insert comments" ON mystic_board_comments FOR INSERT WITH CHECK (true);

-- ─── 완료 확인 ────────────────────────────────────────
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('user_profiles','mystic_posts','mystic_board_comments')
ORDER BY table_name;
