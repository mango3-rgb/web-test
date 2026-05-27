import { useState, useEffect } from 'react';
import { loadFortunePool, getCachedPool, type TextPool } from '../utils/fortuneDB';

export function useFortunePool(): TextPool | undefined {
  const [pool, setPool] = useState<TextPool | undefined>(getCachedPool() ?? undefined);

  useEffect(() => {
    if (pool) return;
    loadFortunePool()
      .then(setPool)
      .catch(() => { /* DB 미설정 시 하드코딩 fallback 사용 */ });
  }, [pool]);

  return pool;
}
