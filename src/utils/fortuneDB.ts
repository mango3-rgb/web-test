import getSupabase from './supabase';

/** key: `${area}-${period}-${stars}` → texts array */
export type TextPool = Map<string, string[]>;

let _cache: TextPool | null = null;
let _inflight: Promise<TextPool> | null = null;

export async function loadFortunePool(): Promise<TextPool> {
  if (_cache) return _cache;
  if (_inflight) return _inflight;

  _inflight = (async (): Promise<TextPool> => {
    const client = getSupabase();
    const pool: TextPool = new Map();
    if (!client) return pool;

    const { data } = await client
      .from('mystic_fortune_texts')
      .select('area, period, stars, text_ko')
      .order('sort_order', { ascending: true });

    for (const row of data ?? []) {
      const k = `${row.area}-${row.period}-${row.stars}`;
      if (!pool.has(k)) pool.set(k, []);
      pool.get(k)!.push(row.text_ko as string);
    }
    _cache = pool;
    return pool;
  })();

  return _inflight;
}

export function getCachedPool(): TextPool | null {
  return _cache;
}
