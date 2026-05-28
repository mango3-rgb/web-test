import getSupabase from './supabase';

function getSessionId(): string {
  let id = localStorage.getItem('mystic_session');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('mystic_session', id);
  }
  return id;
}

export async function saveTestResult(
  testType: 'mbti' | 'bloodtype_mbti' | 'enneagram',
  result: string
): Promise<void> {
  const client = getSupabase();
  if (!client) return;
  try {
    await client.from('mystic_test_results').insert({
      session_id: getSessionId(),
      test_type: testType,
      result,
    });
  } catch {
    // 저장 실패해도 UI 흐름에 영향 없음
  }
}

export async function trackVisit(): Promise<void> {
  const client = getSupabase();
  if (!client) return;
  const today = new Date().toISOString().split('T')[0];
  const key = `mystic_visited_${today}`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, '1');
  try {
    await client.from('mystic_visits').insert({ visited_at: new Date().toISOString() });
  } catch {
    // 무시
  }
}
