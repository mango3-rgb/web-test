import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type Energy = { money: number; love: number; career: number; health: number };

const JIJI: { id: string; name: string; years: string; trait: string; e: Energy }[] = [
  { id: 'ja',   name: '子 쥐',    years: '1960·1972·1984·1996·2008·2020', trait: '영리하고 적응력이 뛰어난', e: { money: 2, love: 1, career: 1, health: 1 } },
  { id: 'ch',   name: '丑 소',    years: '1961·1973·1985·1997·2009·2021', trait: '인내심 강하고 성실한',     e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'in',   name: '寅 호랑이', years: '1962·1974·1986·1998·2010·2022', trait: '용감하고 패기 넘치는',    e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'myo',  name: '卯 토끼',  years: '1963·1975·1987·1999·2011·2023', trait: '섬세하고 온화한',         e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'jin',  name: '辰 용',    years: '1964·1976·1988·2000·2012·2024', trait: '카리스마 넘치는',          e: { money: 2, love: 1, career: 2, health: 1 } },
  { id: 'sa',   name: '巳 뱀',    years: '1965·1977·1989·2001·2013·2025', trait: '직관이 날카롭고 신비로운',  e: { money: 2, love: 1, career: 1, health: 1 } },
  { id: 'o',    name: '午 말',    years: '1966·1978·1990·2002·2014',      trait: '활발하고 정열적인',         e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'mi',   name: '未 양',    years: '1967·1979·1991·2003·2015',      trait: '예술적 감수성이 풍부한',    e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'sin',  name: '申 원숭이', years: '1968·1980·1992·2004·2016',      trait: '재치 있고 영리한',          e: { money: 2, love: 1, career: 2, health: 1 } },
  { id: 'yu',   name: '酉 닭',    years: '1969·1981·1993·2005·2017',      trait: '꼼꼼하고 부지런한',         e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'sul',  name: '戌 개',    years: '1970·1982·1994·2006·2018',      trait: '의리 있고 충직한',           e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'hae',  name: '亥 돼지',  years: '1971·1983·1995·2007·2019',      trait: '낙천적이고 풍요로운',        e: { money: 2, love: 2, career: 1, health: 1 } },
];

const SIGNS: { id: string; symbol: string; name: string; dates: string; trait: string; e: Energy }[] = [
  { id: 'aries',  symbol: '♈', name: '양자리',    dates: '3.21~4.19',   trait: '열정적이고 개척적인',   e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'taurus', symbol: '♉', name: '황소자리',   dates: '4.20~5.20',   trait: '안정적이고 현실적인',   e: { money: 2, love: 1, career: 1, health: 2 } },
  { id: 'gemini', symbol: '♊', name: '쌍둥이자리', dates: '5.21~6.20',   trait: '다재다능하고 재치 있는', e: { money: 1, love: 1, career: 2, health: 1 } },
  { id: 'cancer', symbol: '♋', name: '게자리',     dates: '6.21~7.22',   trait: '감수성 풍부하고 따뜻한', e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'leo',    symbol: '♌', name: '사자자리',   dates: '7.23~8.22',   trait: '카리스마 있고 창의적인', e: { money: 1, love: 2, career: 2, health: 1 } },
  { id: 'virgo',  symbol: '♍', name: '처녀자리',   dates: '8.23~9.22',   trait: '꼼꼼하고 분석적인',     e: { money: 2, love: 1, career: 2, health: 1 } },
  { id: 'libra',  symbol: '♎', name: '천칭자리',   dates: '9.23~10.22',  trait: '균형감 있고 사교적인',   e: { money: 1, love: 2, career: 1, health: 1 } },
  { id: 'scorp',  symbol: '♏', name: '전갈자리',   dates: '10.23~11.21', trait: '강렬하고 직관적인',      e: { money: 2, love: 1, career: 1, health: 2 } },
  { id: 'sagit',  symbol: '♐', name: '사수자리',   dates: '11.22~12.21', trait: '자유롭고 낙관적인',      e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'capri',  symbol: '♑', name: '염소자리',   dates: '12.22~1.19',  trait: '야망 있고 책임감 강한',  e: { money: 2, love: 1, career: 2, health: 1 } },
  { id: 'aqua',   symbol: '♒', name: '물병자리',   dates: '1.20~2.18',   trait: '독창적이고 미래지향적인', e: { money: 1, love: 1, career: 2, health: 1 } },
  { id: 'pisces', symbol: '♓', name: '물고기자리', dates: '2.19~3.20',   trait: '공감 능력이 뛰어난',     e: { money: 1, love: 2, career: 1, health: 2 } },
];

const MBTI_LIST: { id: string; nick: string; trait: string; e: Energy }[] = [
  { id: 'INTJ', nick: '전략가',    trait: '전략적이고 독립적인',   e: { money: 1, love: 0, career: 2, health: 1 } },
  { id: 'INTP', nick: '논리학자',  trait: '혁신적이고 분석적인',   e: { money: 1, love: 0, career: 2, health: 0 } },
  { id: 'ENTJ', nick: '통솔자',    trait: '대담하고 리더십 있는',  e: { money: 2, love: 0, career: 2, health: 1 } },
  { id: 'ENTP', nick: '변론가',    trait: '창의적이고 논쟁적인',   e: { money: 1, love: 0, career: 2, health: 1 } },
  { id: 'INFJ', nick: '옹호자',    trait: '통찰력 있고 공감하는',  e: { money: 0, love: 2, career: 1, health: 1 } },
  { id: 'INFP', nick: '중재자',    trait: '이상적이고 감수성 있는', e: { money: 0, love: 2, career: 1, health: 1 } },
  { id: 'ENFJ', nick: '선도자',    trait: '카리스마 있고 따뜻한',  e: { money: 1, love: 2, career: 2, health: 1 } },
  { id: 'ENFP', nick: '활동가',    trait: '열정적이고 사교적인',   e: { money: 1, love: 2, career: 1, health: 1 } },
  { id: 'ISTJ', nick: '현실주의자', trait: '신중하고 책임감 있는',  e: { money: 2, love: 0, career: 2, health: 1 } },
  { id: 'ISFJ', nick: '수호자',    trait: '헌신적이고 배려하는',   e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'ESTJ', nick: '경영자',    trait: '조직적이고 결단력 있는', e: { money: 2, love: 0, career: 2, health: 1 } },
  { id: 'ESFJ', nick: '집정관',    trait: '사교적이고 조화로운',   e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'ISTP', nick: '장인',      trait: '실용적이고 독립적인',   e: { money: 1, love: 0, career: 2, health: 2 } },
  { id: 'ISFP', nick: '모험가',    trait: '예술적이고 감각적인',   e: { money: 0, love: 2, career: 1, health: 2 } },
  { id: 'ESTP', nick: '사업가',    trait: '대담하고 행동적인',     e: { money: 2, love: 1, career: 1, health: 2 } },
  { id: 'ESFP', nick: '연예인',    trait: '즐거움을 추구하는',     e: { money: 1, love: 2, career: 1, health: 2 } },
];

const toStars = (score: number): number => {
  if (score <= 1) return 2;
  if (score <= 3) return 3;
  if (score <= 4) return 4;
  return 5;
};

const STAR_TEXTS: Record<string, Record<number, string>> = {
  money: {
    5: '투자와 새로운 수익 기회가 열립니다. 과감하게 도전하세요.',
    4: '꾸준한 노력이 재정적 성과로 이어집니다. 저축도 병행하세요.',
    3: '안정적인 재물 흐름입니다. 무리한 지출은 자제하세요.',
    2: '재물 관리에 신중하세요. 큰 지출이나 투자는 미루세요.',
  },
  love: {
    5: '인연의 기운이 강합니다. 마음을 표현할 절호의 시기입니다.',
    4: '따뜻한 인간관계가 풍성해집니다. 소중한 사람에게 먼저 다가가세요.',
    3: '평온한 관계가 유지됩니다. 작은 배려 한마디가 큰 힘이 됩니다.',
    2: '감정 표현에 주의하세요. 오해가 생기지 않도록 소통하세요.',
  },
  career: {
    5: '커리어에 큰 도약의 기회가 옵니다. 새로운 도전을 두려워 마세요.',
    4: '능력을 인정받는 시기입니다. 자신감 있게 의견을 표현하세요.',
    3: '안정적인 업무 흐름이 이어집니다. 꾸준함이 최고의 전략입니다.',
    2: '직업적 변화는 신중히. 기반을 다지는 데 집중하세요.',
  },
  health: {
    5: '활력이 넘치는 시기입니다. 새로운 운동 루틴을 시작하세요.',
    4: '건강 상태가 양호합니다. 규칙적인 생활 습관을 유지하세요.',
    3: '건강 관리에 관심을 기울이세요. 충분한 수면이 중요합니다.',
    2: '과로를 피하고 충분히 쉬세요. 스트레스 관리가 필요합니다.',
  },
};

const OVERALL_TEXT = [
  '이번 시기는 여러 면에서 조심스럽게 행동하고 내실을 다지는 것이 현명합니다.',
  '몇 가지 영역에서 주의가 필요하지만 전반적으로 안정적인 흐름입니다.',
  '전반적으로 안정된 운기 속에 있습니다. 꾸준한 노력이 결실을 맺습니다.',
  '이번 시기는 전반적으로 좋은 운기가 흐릅니다. 적극적으로 나아가세요.',
  '매우 강한 운기가 집중됩니다. 중요한 결정을 내리기에 최적의 시기입니다.',
];

interface FortuneResult {
  jiji: typeof JIJI[0];
  sign: typeof SIGNS[0];
  mbti: typeof MBTI_LIST[0];
  money: number;
  love: number;
  career: number;
  health: number;
  total: number;
}

const Stars = ({ count }: { count: number }) => (
  <span style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map((n) => (
      <span key={n} style={{ fontSize: '14px', color: n <= count ? 'var(--gold)' : 'var(--line)' }}>★</span>
    ))}
  </span>
);

const AREAS = [
  { key: 'money',  icon: '💰', label: '재물운' },
  { key: 'love',   icon: '💕', label: '사랑운' },
  { key: 'career', icon: '📈', label: '직업운' },
  { key: 'health', icon: '💪', label: '건강운' },
] as const;

type AreaKey = 'money' | 'love' | 'career' | 'health';

const FortuneReading = (): ReactElement => {
  const [sel, setSel] = useState({ jiji: '', sign: '', mbti: '' });
  const [result, setResult] = useState<FortuneResult | null>(null);

  const canSubmit = sel.jiji && sel.sign && sel.mbti;

  const handleSubmit = () => {
    const j = JIJI.find(x => x.id === sel.jiji)!;
    const s = SIGNS.find(x => x.id === sel.sign)!;
    const m = MBTI_LIST.find(x => x.id === sel.mbti)!;
    const money = j.e.money + s.e.money + m.e.money;
    const love = j.e.love + s.e.love + m.e.love;
    const career = j.e.career + s.e.career + m.e.career;
    const health = j.e.health + s.e.health + m.e.health;
    setResult({ jiji: j, sign: s, mbti: m, money, love, career, health, total: money + love + career + health });
  };

  const selectStyle = {
    padding: '10px 14px',
    border: '1px solid var(--line)',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--navy-800)',
    background: 'var(--bg-white)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    outline: 'none',
    flex: 1,
    minWidth: 0,
  };

  return (
    <>
      <SEOHead title="나의 운세 | 운세 플랫폼" description="띠·별자리·MBTI 종합 운세 측정" />
      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Fortune · 종합 운세</div>
          <h2>나의 운세</h2>
          <p>띠 · 별자리 · MBTI를 입력하면 맞춤 운세를 알려드립니다</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>

          {!result ? (
            /* ── Input Form ── */
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7, textAlign: 'center' }}>
                세 가지 정보를 선택하면 사주·별자리·MBTI가 어우러진 나만의 종합 운세를 확인할 수 있습니다.
              </p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {/* 띠 */}
                <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    띠 (지지)
                  </label>
                  <select
                    value={sel.jiji}
                    onChange={e => setSel(p => ({ ...p, jiji: e.target.value }))}
                    style={selectStyle}
                  >
                    <option value="">띠 선택</option>
                    {JIJI.map(j => (
                      <option key={j.id} value={j.id}>{j.name} — {j.years}</option>
                    ))}
                  </select>
                </div>

                {/* 별자리 */}
                <div style={{ flex: '1 1 180px', minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    별자리
                  </label>
                  <select
                    value={sel.sign}
                    onChange={e => setSel(p => ({ ...p, sign: e.target.value }))}
                    style={selectStyle}
                  >
                    <option value="">별자리 선택</option>
                    {SIGNS.map(s => (
                      <option key={s.id} value={s.id}>{s.symbol} {s.name} ({s.dates})</option>
                    ))}
                  </select>
                </div>

                {/* MBTI */}
                <div style={{ flex: '1 1 160px', minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                    MBTI
                  </label>
                  <select
                    value={sel.mbti}
                    onChange={e => setSel(p => ({ ...p, mbti: e.target.value }))}
                    style={selectStyle}
                  >
                    <option value="">MBTI 선택</option>
                    {MBTI_LIST.map(m => (
                      <option key={m.id} value={m.id}>{m.id} ({m.nick})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '28px' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  style={{ fontSize: '15px', padding: '13px 48px', opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
                >
                  운세 측정하기 ✦
                </button>
              </div>
            </div>

          ) : (
            /* ── Result ── */
            <div>
              {/* Input summary */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
                {[
                  result.jiji.name,
                  `${result.sign.symbol} ${result.sign.name}`,
                  `${result.mbti.id} (${result.mbti.nick})`,
                ].map((label) => (
                  <span key={label} style={{ padding: '5px 14px', background: 'var(--navy-50)', border: '1px solid var(--line)', borderRadius: '20px', fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)' }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Fortune areas 2×2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {AREAS.map(({ key, icon, label }) => {
                  const score = result[key as AreaKey];
                  const stars = toStars(score);
                  return (
                    <div key={key} style={{ padding: '16px 20px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{icon}</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--navy-800)' }}>{label}</span>
                        <span style={{ marginLeft: 'auto' }}><Stars count={stars} /></span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        {STAR_TEXTS[key][stars]}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Narrative */}
              <div style={{ padding: '16px 20px', background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', borderRadius: '0 10px 10px 0', marginBottom: '20px', fontSize: '13px', lineHeight: 1.75, color: 'var(--navy-800)' }}>
                <strong>{result.jiji.trait}</strong> {result.jiji.name}띠가{' '}
                <strong>{result.sign.trait}</strong> {result.sign.name}의 에너지를 만나고,{' '}
                {result.mbti.id}({result.mbti.nick})의 성격이 더해져 독특한 운의 흐름을 만들어냅니다.{' '}
                {OVERALL_TEXT[Math.min(4, Math.floor(result.total / 5))]}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => { setResult(null); setSel({ jiji: '', sign: '', mbti: '' }); }}
                >
                  다시 측정하기
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default FortuneReading;
