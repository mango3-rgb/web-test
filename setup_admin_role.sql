-- ============================================================
-- setup_admin_role.sql
-- Supabase SQL Editor에서 전체 실행하세요
-- DB 수준 관리자 권한 적용
-- ============================================================

-- 1. is_admin() 헬퍼 함수
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. mango3migz2@gmail.com → role = 'admin' 설정
UPDATE public.user_profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'mango3migz2@gmail.com');

-- 3. mystic_visits — SELECT를 관리자 전용으로 교체
DROP POLICY IF EXISTS "allow select visits" ON public.mystic_visits;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mystic_visits' AND policyname = 'admins can select visits'
  ) THEN
    CREATE POLICY "admins can select visits"
      ON public.mystic_visits FOR SELECT
      USING (public.is_admin());
  END IF;
END $$;

-- 4. mystic_test_results — SELECT를 관리자 전용으로 교체
DROP POLICY IF EXISTS "allow select results" ON public.mystic_test_results;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mystic_test_results' AND policyname = 'admins can select results'
  ) THEN
    CREATE POLICY "admins can select results"
      ON public.mystic_test_results FOR SELECT
      USING (public.is_admin());
  END IF;
END $$;

-- 5. mystic_fortune_texts — 관리자 전용 SELECT (없으면 생성)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'mystic_fortune_texts'
  ) THEN
    ALTER TABLE public.mystic_fortune_texts ENABLE ROW LEVEL SECURITY;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE tablename = 'mystic_fortune_texts' AND policyname = 'admins can select fortune texts'
    ) THEN
      EXECUTE 'CREATE POLICY "admins can select fortune texts"
        ON public.mystic_fortune_texts FOR SELECT
        USING (public.is_admin())';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE tablename = 'mystic_fortune_texts' AND policyname = 'admins can insert fortune texts'
    ) THEN
      EXECUTE 'CREATE POLICY "admins can insert fortune texts"
        ON public.mystic_fortune_texts FOR INSERT
        WITH CHECK (public.is_admin())';
    END IF;
  END IF;
END $$;

-- 6. user_profiles — 관리자는 모든 프로필 조회 가능
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_profiles' AND policyname = 'admins can select all profiles'
  ) THEN
    CREATE POLICY "admins can select all profiles"
      ON public.user_profiles FOR SELECT
      USING (public.is_admin());
  END IF;
END $$;
