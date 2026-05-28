-- 방문자 카운트 테이블
CREATE TABLE IF NOT EXISTS public.mystic_visits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  visited_at timestamptz NOT NULL DEFAULT now()
);

-- 테스트 결과 저장 테이블
CREATE TABLE IF NOT EXISTS public.mystic_test_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL,
  test_type text NOT NULL,
  result text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS 활성화
ALTER TABLE public.mystic_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mystic_test_results ENABLE ROW LEVEL SECURITY;

-- 누구나 insert 가능 (익명 방문자/테스트 결과 저장)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mystic_visits' AND policyname = 'allow insert visits'
  ) THEN
    CREATE POLICY "allow insert visits"
      ON public.mystic_visits FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mystic_visits' AND policyname = 'allow select visits'
  ) THEN
    CREATE POLICY "allow select visits"
      ON public.mystic_visits FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mystic_test_results' AND policyname = 'allow insert results'
  ) THEN
    CREATE POLICY "allow insert results"
      ON public.mystic_test_results FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'mystic_test_results' AND policyname = 'allow select results'
  ) THEN
    CREATE POLICY "allow select results"
      ON public.mystic_test_results FOR SELECT USING (true);
  END IF;
END $$;
