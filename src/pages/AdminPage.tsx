import { useState, useEffect, useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import getSupabase from '../utils/supabase';

const EDGE_FN_URL =
  'https://mlesrunnldasvqgqblss.supabase.co/functions/v1/generate-fortune-texts';

const AREAS = [
  { value: 'money',    label: '재물운' },
  { value: 'love',     label: '사랑운' },
  { value: 'career',   label: '직업운' },
  { value: 'health',   label: '건강운' },
  { value: 'overview', label: '종합운세' },
];

const PERIODS = [
  { value: 'daily',   label: '오늘' },
  { value: 'monthly', label: '이번 달' },
  { value: 'yearly',  label: '올해' },
  { value: 'early',   label: '초년' },
  { value: 'middle',  label: '중년' },
  { value: 'late',    label: '말년' },
];

const STARS_OPTIONS = [1, 2, 3, 4, 5];
const COUNT_OPTIONS  = [1, 2, 3, 5, 10];

interface LogEntry {
  id: number;
  area: string;
  period: string;
  stars: number;
  count: number;
  inserted: number;
  ts: string;
}

const AdminPage = (): ReactElement => {
  const { isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // — redirect —
  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, isLoggedIn, navigate]);

  // — stats —
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const fetchTotal = useCallback(async () => {
    const client = getSupabase();
    if (!client) return;
    const { count } = await client
      .from('mystic_fortune_texts')
      .select('*', { count: 'exact', head: true });
    setTotalCount(count ?? 0);
  }, []);

  useEffect(() => {
    fetchTotal();
  }, [fetchTotal]);

  // — form state —
  const [area,   setArea]   = useState('money');
  const [period, setPeriod] = useState('daily');
  const [stars,  setStars]  = useState(3);
  const [count,  setCount]  = useState(3);

  // — status & log —
  const [loading,  setLoading]  = useState(false);
  const [status,   setStatus]   = useState<{ ok: boolean; msg: string } | null>(null);
  const [log,      setLog]      = useState<LogEntry[]>([]);

  // — bulk state —
  const [bulkRunning,  setBulkRunning]  = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ done: 0, total: 0 });
  const [bulkStatus,   setBulkStatus]   = useState<{ ok: boolean; msg: string } | null>(null);

  const getToken = async (): Promise<string | null> => {
    const client = getSupabase();
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const callEdgeFn = async (
    token: string,
    payload: { area: string; period: string; stars: number; count: number }
  ): Promise<{ ok: boolean; inserted?: number; texts?: string[]; error?: string }> => {
    const res = await fetch(EDGE_FN_URL, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  // — single generation —
  const handleGenerate = async () => {
    setLoading(true);
    setStatus(null);

    const token = await getToken();
    if (!token) {
      setStatus({ ok: false, msg: '로그인 세션을 가져올 수 없습니다.' });
      setLoading(false);
      return;
    }

    try {
      const result = await callEdgeFn(token, { area, period, stars, count });

      if (result.ok) {
        const areaLabel   = AREAS.find(a => a.value === area)?.label   ?? area;
        const periodLabel = PERIODS.find(p => p.value === period)?.label ?? period;
        setStatus({
          ok:  true,
          msg: `${result.inserted}개 텍스트가 성공적으로 생성되었습니다.`,
        });
        setLog(prev => [
          {
            id:       Date.now(),
            area:     areaLabel,
            period:   periodLabel,
            stars,
            count,
            inserted: result.inserted ?? 0,
            ts:       new Date().toLocaleTimeString('ko-KR'),
          },
          ...prev,
        ]);
        await fetchTotal();
      } else {
        setStatus({ ok: false, msg: result.error ?? '생성 중 오류가 발생했습니다.' });
      }
    } catch (err) {
      setStatus({ ok: false, msg: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  // — bulk generation —
  const handleBulkGenerate = async () => {
    setBulkRunning(true);
    setBulkStatus(null);

    const token = await getToken();
    if (!token) {
      setBulkStatus({ ok: false, msg: '로그인 세션을 가져올 수 없습니다.' });
      setBulkRunning(false);
      return;
    }

    const combinations: { area: string; period: string; stars: number }[] = [];
    for (const a of AREAS) {
      for (const p of PERIODS) {
        for (const s of STARS_OPTIONS) {
          combinations.push({ area: a.value, period: p.value, stars: s });
        }
      }
    }

    const total = combinations.length;
    setBulkProgress({ done: 0, total });

    let successCount = 0;
    let errorCount   = 0;

    for (let i = 0; i < combinations.length; i++) {
      const combo = combinations[i];
      try {
        const result = await callEdgeFn(token, { ...combo, count: 3 });
        if (result.ok) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch {
        errorCount++;
      }
      setBulkProgress({ done: i + 1, total });
    }

    await fetchTotal();
    setBulkStatus({
      ok:  errorCount === 0,
      msg: `완료: ${successCount}개 조합 성공${errorCount > 0 ? `, ${errorCount}개 실패` : ''}`,
    });
    setBulkRunning(false);
  };

  // — early return after hooks (redirect will fire) —
  if (!isAdmin) return <></>;

  return (
    <>
      <SEOHead title="관리자" path="/admin" noindex />

      {/* Page header */}
      <section className="page-header-ed">
        <div className="container">
          <p className="eyebrow">Admin</p>
          <h2>운세 텍스트 관리</h2>
          <p>AI로 운세 텍스트를 생성하고 데이터베이스에 저장합니다.</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: 720 }}>

          {/* Stats */}
          <div style={styles.statsPanel}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>
                {totalCount === null ? '…' : totalCount.toLocaleString()}
              </span>
              <span style={styles.statLabel}>저장된 운세 텍스트</span>
            </div>
          </div>

          {/* Generation form */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>단건 생성</h3>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>분야</label>
                <select
                  style={styles.select}
                  value={area}
                  onChange={e => setArea(e.target.value)}
                >
                  {AREAS.map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>시기</label>
                <select
                  style={styles.select}
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                >
                  {PERIODS.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>별점</label>
                <select
                  style={styles.select}
                  value={stars}
                  onChange={e => setStars(Number(e.target.value))}
                >
                  {STARS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}★</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>생성 수</label>
                <select
                  style={styles.select}
                  value={count}
                  onChange={e => setCount(Number(e.target.value))}
                >
                  {COUNT_OPTIONS.map(c => (
                    <option key={c} value={c}>{c}개</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ marginTop: 8 }}
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? '생성 중…' : '텍스트 생성하기 ✦'}
            </button>

            {status && (
              <p style={{ ...styles.statusMsg, color: status.ok ? '#16a34a' : '#dc2626' }}>
                {status.ok ? '✓ ' : '✗ '}{status.msg}
              </p>
            )}
          </div>

          {/* Generation log */}
          {log.length > 0 && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>이번 세션 생성 로그</h3>
              <div style={styles.logTable}>
                <div style={styles.logHeader}>
                  <span>시각</span>
                  <span>분야</span>
                  <span>시기</span>
                  <span>별점</span>
                  <span>생성</span>
                </div>
                {log.map(entry => (
                  <div key={entry.id} style={styles.logRow}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{entry.ts}</span>
                    <span>{entry.area}</span>
                    <span>{entry.period}</span>
                    <span>{'★'.repeat(entry.stars)}</span>
                    <span style={{ color: '#16a34a', fontWeight: 600 }}>{entry.inserted}개</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bulk generation */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>일괄 생성</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
              모든 분야({AREAS.length}) × 모든 시기({PERIODS.length}) × 모든 별점({STARS_OPTIONS.length}) 조합으로
              각 3개씩 텍스트를 자동 생성합니다.&nbsp;
              총 <strong>{AREAS.length * PERIODS.length * STARS_OPTIONS.length}회</strong> API 호출이 발생합니다.
            </p>

            {bulkRunning && (
              <div style={styles.progressWrapper}>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${Math.round((bulkProgress.done / bulkProgress.total) * 100)}%`,
                    }}
                  />
                </div>
                <p style={styles.progressText}>
                  {bulkProgress.done} / {bulkProgress.total} 완료
                  &nbsp;({Math.round((bulkProgress.done / bulkProgress.total) * 100)}%)
                </p>
              </div>
            )}

            <button
              className="btn btn-ghost"
              onClick={handleBulkGenerate}
              disabled={bulkRunning}
            >
              {bulkRunning
                ? `일괄 생성 중… (${bulkProgress.done}/${bulkProgress.total})`
                : '일괄 생성 시작'}
            </button>

            {bulkStatus && (
              <p style={{ ...styles.statusMsg, color: bulkStatus.ok ? '#16a34a' : '#dc2626' }}>
                {bulkStatus.ok ? '✓ ' : '✗ '}{bulkStatus.msg}
              </p>
            )}
          </div>

          {/* API Key setup guide */}
          <div style={styles.guideCard}>
            <h3 style={{ ...styles.cardTitle, marginBottom: 12 }}>
              ANTHROPIC_API_KEY 설정 안내
            </h3>
            <ol style={styles.guideList}>
              <li>
                <a
                  href="https://supabase.com/dashboard/project/mlesrunnldasvqgqblss/functions"
                  target="_blank"
                  rel="noreferrer"
                  style={styles.guideLink}
                >
                  Supabase 대시보드 &gt; Edge Functions
                </a>
                으로 이동합니다.
              </li>
              <li>
                좌측 사이드바에서 <strong>Secrets</strong> 탭을 클릭합니다.
              </li>
              <li>
                <strong>Add new secret</strong> 버튼을 클릭합니다.
              </li>
              <li>
                <strong>Name</strong>: <code style={styles.code}>ANTHROPIC_API_KEY</code>
              </li>
              <li>
                <strong>Value</strong>: Anthropic Console에서 발급받은 API 키를 붙여넣습니다.
                (<code style={styles.code}>sk-ant-...</code>)
              </li>
              <li>
                <strong>Save</strong> 버튼을 눌러 저장합니다.
              </li>
              <li>
                Edge Function을 재배포하면 키가 적용됩니다.
              </li>
            </ol>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 12 }}>
              API 키는{' '}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noreferrer"
                style={styles.guideLink}
              >
                Anthropic Console
              </a>
              에서 발급받을 수 있습니다.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  statsPanel: {
    display:        'flex',
    gap:            16,
    marginBottom:   28,
    padding:        '20px 24px',
    background:     'var(--navy-50)',
    borderRadius:   12,
    border:         '1px solid var(--line)',
  },
  statItem: {
    display:        'flex',
    flexDirection:  'column',
    gap:            4,
  },
  statNumber: {
    fontSize:   32,
    fontWeight: 700,
    color:      'var(--gold)',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 13,
    color:    'var(--text-secondary)',
  },
  card: {
    background:   'var(--bg-white)',
    border:       '1px solid var(--line)',
    borderRadius: 12,
    padding:      '24px',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize:     16,
    fontWeight:   700,
    color:        'var(--navy-800)',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: '1px solid var(--line)',
  },
  formGrid: {
    display:             'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap:                 12,
    marginBottom:        16,
  },
  formGroup: {
    display:       'flex',
    flexDirection: 'column',
    gap:           6,
  },
  label: {
    fontSize:   13,
    fontWeight: 600,
    color:      'var(--navy-800)',
  },
  select: {
    padding:      '8px 10px',
    borderRadius: 8,
    border:       '1px solid var(--line)',
    background:   'var(--bg-white)',
    color:        'var(--navy-800)',
    fontSize:     14,
    cursor:       'pointer',
  },
  statusMsg: {
    marginTop:  12,
    fontSize:   14,
    fontWeight: 600,
  },
  logTable: {
    display:  'flex',
    flexDirection: 'column',
    gap:      6,
    fontSize: 13,
  },
  logHeader: {
    display:             'grid',
    gridTemplateColumns: '80px 1fr 1fr 80px 60px',
    gap:                 8,
    fontWeight:          700,
    color:               'var(--text-secondary)',
    paddingBottom:       6,
    borderBottom:        '1px solid var(--line)',
    fontSize:            12,
  },
  logRow: {
    display:             'grid',
    gridTemplateColumns: '80px 1fr 1fr 80px 60px',
    gap:                 8,
    padding:             '4px 0',
    borderBottom:        '1px solid var(--line)',
    alignItems:          'center',
  },
  progressWrapper: {
    marginBottom: 14,
  },
  progressBar: {
    height:       10,
    background:   'var(--navy-50)',
    borderRadius: 99,
    overflow:     'hidden',
    border:       '1px solid var(--line)',
    marginBottom: 6,
  },
  progressFill: {
    height:     '100%',
    background: 'var(--gold)',
    borderRadius: 99,
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: 13,
    color:    'var(--text-secondary)',
  },
  guideCard: {
    background:   'var(--navy-50)',
    border:       '1px solid var(--line)',
    borderRadius: 12,
    padding:      '24px',
    marginBottom: 20,
  },
  guideList: {
    paddingLeft: 20,
    display:     'flex',
    flexDirection: 'column',
    gap:          8,
    fontSize:     14,
    color:        'var(--navy-800)',
    lineHeight:   1.7,
  },
  guideLink: {
    color:          'var(--gold)',
    textDecoration: 'underline',
  },
  code: {
    background:   'var(--line)',
    padding:      '1px 5px',
    borderRadius: 4,
    fontSize:     12,
    fontFamily:   'monospace',
  },
};

export default AdminPage;
