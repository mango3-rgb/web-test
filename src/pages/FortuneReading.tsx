import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';
import {
  PERIODS, PERIOD_LABELS, FAREAS, IS_LIFE,
  areaStars, areaText, overviewText, totalStars,
} from '../utils/fortuneEngine';
import type { Period } from '../utils/fortuneEngine';
import { useFortunePool } from '../hooks/useFortunePool';

type Energy = { money: number; love: number; career: number; health: number };

const JIJI: { id: string; name: string; animal: string; trait: string; e: Energy }[] = [
  { id: 'ja',   name: '子',  animal: '🐭 쥐',    trait: '영리하고 적응력이 뛰어난', e: { money: 2, love: 1, career: 1, health: 1 } },
  { id: 'ch',   name: '丑',  animal: '🐮 소',    trait: '인내심 강하고 성실한',     e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'in',   name: '寅',  animal: '🐯 호랑이', trait: '용감하고 패기 넘치는',    e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'myo',  name: '卯',  animal: '🐰 토끼',  trait: '섬세하고 온화한',         e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'jin',  name: '辰',  animal: '🐲 용',    trait: '카리스마 넘치는',          e: { money: 2, love: 1, career: 2, health: 1 } },
  { id: 'sa',   name: '巳',  animal: '🐍 뱀',    trait: '직관이 날카롭고 신비로운',  e: { money: 2, love: 1, career: 1, health: 1 } },
  { id: 'o',    name: '午',  animal: '🐴 말',    trait: '활발하고 정열적인',         e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'mi',   name: '未',  animal: '🐑 양',    trait: '예술적 감수성이 풍부한',    e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'sin',  name: '申',  animal: '🐵 원숭이', trait: '재치 있고 영리한',          e: { money: 2, love: 1, career: 2, health: 1 } },
  { id: 'yu',   name: '酉',  animal: '🐔 닭',    trait: '꼼꼼하고 부지런한',         e: { money: 1, love: 1, career: 2, health: 2 } },
  { id: 'sul',  name: '戌',  animal: '🐶 개',    trait: '의리 있고 충직한',           e: { money: 1, love: 2, career: 1, health: 2 } },
  { id: 'hae',  name: '亥',  animal: '🐷 돼지',  trait: '낙천적이고 풍요로운',        e: { money: 2, love: 2, career: 1, health: 1 } },
];

/* 태어난 해 → 띠 인덱스: 2020(子)%12=4 기준 */
const yearToJiji = (year: number) => JIJI[(((year % 12) - 4 + 12) % 12)];

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

interface FortuneResult {
  jiji: typeof JIJI[0];
  sign: typeof SIGNS[0];
  mbti: typeof MBTI_LIST[0];
  birthYear: number;
  money: number; love: number; career: number; health: number; total: number;
}

const Stars = ({ count }: { count: number }) => (
  <span style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map((n) => (
      <span key={n} style={{ fontSize: '14px', color: n <= count ? 'var(--gold)' : 'var(--line)' }}>★</span>
    ))}
  </span>
);

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
  width: '100%',
} as const;

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  color: 'var(--gold)',
  letterSpacing: '0.1em',
  marginBottom: '6px',
} as const;

const tabSt = (active: boolean): React.CSSProperties => ({
  padding: '7px 14px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer',
  borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
  background: 'none', color: active ? 'var(--gold)' : 'var(--text-secondary)', whiteSpace: 'nowrap',
});

const JIJI_LIFE: Record<string, { early: string; middle: string; late: string }> = {
  ja:  { early: '총명하고 재치 있는 성격으로 어린 시절부터 두각을 나타냅니다.', middle: '날카로운 판단력과 추진력으로 직업적 성과와 재물운이 좋습니다.', late: '지혜롭고 원만한 성품으로 주변의 존경을 받으며 만족스러운 여생을 보냅니다.' },
  ch:  { early: '성실하고 인내심 강한 성격으로 신뢰받는 인물로 성장합니다.', middle: '성실함의 결실로 안정적인 직업과 경제력을 갖춥니다.', late: '평생 쌓아온 신뢰와 덕망으로 건강하고 평화로운 말년을 보냅니다.' },
  in:  { early: '용감하고 패기 넘치는 에너지로 도전을 두려워하지 않습니다.', middle: '과감한 결단력으로 재물과 명예 모두 상승하는 전성기입니다.', late: '강인한 체력으로 활동적인 노년을 보내며 후배들에게 용기를 나눠줍니다.' },
  myo: { early: '섬세하고 감수성 풍부한 성격으로 예술적 재능이 발현됩니다.', middle: '온화한 성품으로 협력과 네트워크에서 강점을 발휘합니다.', late: '우아하고 품위 있는 노년에 자녀들로부터 깊은 사랑을 받습니다.' },
  jin: { early: '카리스마와 자신감으로 일찍부터 주목받으며 성장합니다.', middle: '강력한 리더십으로 직업적 정점에 서며 재물과 명예가 따릅니다.', late: '풍요롭고 위엄 있는 말년에 자손들에게 큰 유산을 남깁니다.' },
  sa:  { early: '직관력이 뛰어나고 신중한 성격으로 학문적 성취를 이룹니다.', middle: '날카로운 통찰력으로 전문 분야에서 깊은 전문성을 쌓습니다.', late: '내면의 평화와 지혜로 주변에서 존경받는 인생 선배가 됩니다.' },
  o:   { early: '활발하고 정열적인 에너지로 친구들의 중심이 됩니다.', middle: '열정적인 추진력으로 자신만의 길을 개척하며 성공합니다.', late: '활동적이고 건강한 노년에 여행과 취미로 활기찬 여생을 즐깁니다.' },
  mi:  { early: '예술적 감수성과 창의성으로 재능을 발휘합니다.', middle: '배려심으로 가정과 직업 모두 화목한 중년을 보냅니다.', late: '평화롭고 예술적인 노년에 가족들의 사랑을 받습니다.' },
  sin: { early: '재치와 영리함으로 다양한 분야에서 능력을 발휘합니다.', middle: '유연한 사고로 변화하는 환경에서도 성공적으로 적응합니다.', late: '풍부한 경험과 지식으로 존경받는 활동적인 노년을 보냅니다.' },
  yu:  { early: '꼼꼼하고 부지런한 성격으로 높은 성취를 이룹니다.', middle: '전문성으로 직업적 정점에 서며 안정적인 경제 기반을 마련합니다.', late: '전문성과 성실함으로 인정받으며 체계적인 활기찬 노년을 삽니다.' },
  sul: { early: '의리 있고 정직한 성품으로 신뢰를 쌓아갑니다.', middle: '강한 의리와 책임감으로 가정과 직업 모두에서 안정을 이룹니다.', late: '신뢰와 덕망으로 가족과 함께하는 행복한 노년을 보냅니다.' },
  hae: { early: '낙천적이고 관대한 성격으로 주변에서 사랑받습니다.', middle: '풍요로운 재물운과 넓은 인간관계로 풍성한 중년을 보냅니다.', late: '풍요롭고 여유로운 노년에 가족들에게 둘러싸여 행복하게 삽니다.' },
};

const FortuneReading = (): ReactElement => {
  const pool = useFortunePool();
  const [birthYear, setBirthYear] = useState('');
  const [sign, setSign] = useState('');
  const [mbti, setMbti] = useState('');
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [period, setPeriod] = useState<Period>('daily');

  const yearNum = parseInt(birthYear, 10);
  const validYear = birthYear.length === 4 && !isNaN(yearNum) && yearNum >= 1900 && yearNum <= 2099;
  const jijiObj = validYear ? yearToJiji(yearNum) : null;
  const canSubmit = validYear && sign && mbti;

  const handleSubmit = () => {
    if (!jijiObj) return;
    const j = jijiObj;
    const s = SIGNS.find(x => x.id === sign)!;
    const m = MBTI_LIST.find(x => x.id === mbti)!;
    const money  = j.e.money  + s.e.money  + m.e.money;
    const love   = j.e.love   + s.e.love   + m.e.love;
    const career = j.e.career + s.e.career + m.e.career;
    const health = j.e.health + s.e.health + m.e.health;
    setResult({ jiji: j, sign: s, mbti: m, birthYear: yearNum, money, love, career, health, total: money + love + career + health });
  };

  const reset = () => { setResult(null); setBirthYear(''); setSign(''); setMbti(''); };

  return (
    <>
      <SEOHead title="나의 운세 | Suyoung's Secret" description="띠·별자리·MBTI 종합 운세 측정" />
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
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7, textAlign: 'center' }}>
                세 가지 정보를 입력하면 사주·별자리·MBTI가 어우러진 나만의 종합 운세를 확인할 수 있습니다.
              </p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>

                {/* 생년 입력 → 자동 띠 계산 */}
                <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                  <label style={labelStyle}>생년 (태어난 해)</label>
                  <input
                    type="number"
                    value={birthYear}
                    onChange={e => setBirthYear(e.target.value.slice(0, 4))}
                    placeholder="예) 1990"
                    min={1900}
                    max={2099}
                    style={{ ...selectStyle, appearance: 'textfield' as const }}
                  />
                  {birthYear.length === 4 && (
                    <div style={{ marginTop: '6px', fontSize: '13px', fontWeight: 700, color: validYear ? 'var(--gold)' : '#e55', padding: '4px 10px', background: 'var(--navy-50)', borderRadius: '6px', display: 'inline-block' }}>
                      {validYear && jijiObj ? `${jijiObj.name}년 ${jijiObj.animal}띠` : '유효하지 않은 연도'}
                    </div>
                  )}
                </div>

                {/* 별자리 */}
                <div style={{ flex: '1 1 180px', minWidth: 0 }}>
                  <label style={labelStyle}>별자리</label>
                  <select value={sign} onChange={e => setSign(e.target.value)} style={selectStyle}>
                    <option value="">별자리 선택</option>
                    {SIGNS.map(s => (
                      <option key={s.id} value={s.id}>{s.symbol} {s.name} ({s.dates})</option>
                    ))}
                  </select>
                </div>

                {/* MBTI */}
                <div style={{ flex: '1 1 160px', minWidth: 0 }}>
                  <label style={labelStyle}>MBTI</label>
                  <select value={mbti} onChange={e => setMbti(e.target.value)} style={selectStyle}>
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
            <div>
              {/* Input summary */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                {[
                  `${result.birthYear}년 ${result.jiji.name}${result.jiji.animal}띠`,
                  `${result.sign.symbol} ${result.sign.name}`,
                  `${result.mbti.id} (${result.mbti.nick})`,
                ].map((label) => (
                  <span key={label} style={{ padding: '4px 12px', background: 'var(--navy-50)', border: '1px solid var(--line)', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)' }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Period tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', marginBottom: '14px', overflowX: 'auto' }}>
                {PERIODS.map(p => <button key={p} style={tabSt(period === p)} onClick={() => setPeriod(p)}>{PERIOD_LABELS[p]}</button>)}
              </div>

              {/* Time-based fortune (일/월/년) */}
              {!IS_LIFE(period) ? (() => {
                const baseKey = `${result.jiji.id}-${result.sign.id}-${result.mbti.id}`;
                const total = totalStars(baseKey, period);
                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(baseKey, period, key);
                        return (
                          <div key={key} style={{ padding: '14px 16px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span style={{ fontSize: '18px' }}>{icon}</span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars count={s} /></span>
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{areaText(key, s, period, pool, baseKey)}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ padding: '10px 16px', background: 'var(--navy-50)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', marginBottom: '14px', fontSize: '13px', color: 'var(--navy-800)' }}>
                      {overviewText(period, total, pool, baseKey)}
                    </div>
                  </>
                );
              })() : (() => {
                /* Life period (초년/중년/말년) */
                const lk = period as 'early' | 'middle' | 'late';
                const lifeLabel = { early: '초년 (출생~30세)', middle: '중년 (31~60세)', late: '말년 (61세 이후)' }[lk];
                const lifeText = JIJI_LIFE[result.jiji.id]?.[lk] ?? '';
                const baseKey = `${result.jiji.id}-${result.sign.id}-${result.mbti.id}`;
                return (
                  <>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>{lifeLabel}</div>
                    <div style={{ padding: '14px 18px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '10px' }}>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--navy-800)', lineHeight: 1.9 }}>
                        {lifeText} {result.sign.name}의 <strong>{result.sign.trait}</strong> 기질과 {result.mbti.id}({result.mbti.nick})의 성격이 더해져 독특한 인생 흐름을 만들어냅니다.
                      </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(baseKey, period, key);
                        return (
                          <div key={key} style={{ padding: '10px 12px', background: 'var(--navy-50)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <span>{icon}</span>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars count={s} /></span>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{areaText(key, s, period, pool, baseKey)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <button className="btn btn-ghost" onClick={reset}>다시 측정하기</button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default FortuneReading;
