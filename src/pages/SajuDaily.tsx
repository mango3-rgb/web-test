import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';
import {
  PERIODS, PERIOD_LABELS, FAREAS, IS_LIFE,
  areaStars, areaText, overviewText, totalStars,
} from '../utils/fortuneEngine';
import type { Period } from '../utils/fortuneEngine';
import { useFortunePool } from '../hooks/useFortunePool';

const GAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const GAN_KO = ['갑','을','병','정','무','기','경','신','임','계'];
const JI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const JI_KO = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
const JI_ANIMAL = ['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];
const JI_EMOJI = ['🐭','🐮','🐯','🐰','🐲','🐍','🐴','🐑','🐵','🐔','🐶','🐷'];
const OHG = ['목','목','화','화','토','토','금','금','수','수'];
const OHJ = ['수','토','목','목','토','화','화','토','금','금','토','수'];

const SIJIN = [
  { v: 23, label: '자시(子時)', time: '23:00~01:00' },
  { v: 1,  label: '축시(丑時)', time: '01:00~03:00' },
  { v: 3,  label: '인시(寅時)', time: '03:00~05:00' },
  { v: 5,  label: '묘시(卯時)', time: '05:00~07:00' },
  { v: 7,  label: '진시(辰時)', time: '07:00~09:00' },
  { v: 9,  label: '사시(巳時)', time: '09:00~11:00' },
  { v: 11, label: '오시(午時)', time: '11:00~13:00' },
  { v: 13, label: '미시(未時)', time: '13:00~15:00' },
  { v: 15, label: '신시(申時)', time: '15:00~17:00' },
  { v: 17, label: '유시(酉時)', time: '17:00~19:00' },
  { v: 19, label: '술시(戌時)', time: '19:00~21:00' },
  { v: 21, label: '해시(亥時)', time: '21:00~23:00' },
];

interface Pillar {
  gan: string; ganKo: string; ganOh: string;
  ji: string; jiKo: string; jiAnimal: string; jiEmoji: string; jiOh: string;
  ganIdx: number; jiIdx: number;
}

interface SajuResult {
  yp: Pillar; mp: Pillar; dp: Pillar; hp: Pillar | null;
  year: number; month: number; day: number; sijinV: number | null;
}

const mkPillar = (gi: number, ji: number): Pillar => {
  const g = ((gi % 10) + 10) % 10;
  const j = ((ji % 12) + 12) % 12;
  return { gan: GAN[g], ganKo: GAN_KO[g], ganOh: OHG[g], ji: JI[j], jiKo: JI_KO[j], jiAnimal: JI_ANIMAL[j], jiEmoji: JI_EMOJI[j], jiOh: OHJ[j], ganIdx: g, jiIdx: j };
};

const jdn = (y: number, m: number, d: number): number => {
  const a = Math.floor((14 - m) / 12);
  const yr = y + 4800 - a;
  const mo = m + 12 * a - 3;
  return d + Math.floor((153 * mo + 2) / 5) + 365 * yr + Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045;
};

const calcSaju = (year: number, month: number, day: number, sijinV: number | null) => {
  const yg = (year - 4) % 10, yj = (year - 4) % 12;
  const yp = mkPillar(yg, yj);
  const mj = (month + 1) % 12;
  const mgs = [2, 4, 6, 8, 0][((yg % 5) + 5) % 5];
  const mp = mkPillar((mgs + month - 1) % 10, mj);
  const jd = jdn(year, month, day);
  const dg = ((jd + 9) % 10 + 10) % 10;
  const dj = ((jd + 1) % 12 + 12) % 12;
  const dp = mkPillar(dg, dj);
  let hp: Pillar | null = null;
  if (sijinV !== null) {
    const hj = sijinV === 23 ? 0 : Math.floor((sijinV + 1) / 2);
    hp = mkPillar(([0, 2, 4, 6, 8][dg % 5] + hj) % 10, hj);
  }
  return { yp, mp, dp, hp };
};

const LIFE_TEXTS: Record<number, { early: string; middle: string; late: string }> = {
  0:  { early: '총명하고 재치 있는 성격으로 어린 시절부터 두각을 나타냅니다. 빠른 적응력과 다재다능한 능력으로 폭넓은 경험을 쌓습니다.', middle: '날카로운 판단력과 추진력으로 직업적 성과를 거두며 재물운이 강해 안정적인 경제 기반을 마련합니다.', late: '지혜롭고 원만한 성품으로 주변의 존경을 받으며 자녀들의 성공 속에서 만족스러운 여생을 보냅니다.' },
  1:  { early: '성실하고 인내심 강한 성격이 이른 시기부터 나타나며 차근차근 실력을 쌓아 신뢰받는 인물로 성장합니다.', middle: '성실함의 결실로 안정적인 직업과 경제력을 갖추고 단란한 가정을 이룹니다.', late: '평생 쌓아온 신뢰와 덕망으로 건강하고 평화로운 말년을 보냅니다.' },
  2:  { early: '용감하고 활기 넘치는 에너지로 어릴 때부터 리더십을 발휘하며 새로운 도전을 두려워하지 않습니다.', middle: '과감한 결단력으로 직업에서 두각을 나타내며 재물과 명예 모두 상승하는 전성기를 맞습니다.', late: '강인한 체력으로 활동적인 노년을 보내며 후배들에게 용기와 지혜를 나눠줍니다.' },
  3:  { early: '섬세하고 감수성이 풍부하여 예술적 재능이 이른 나이에 발현되고 부드러운 성품으로 사랑받습니다.', middle: '뛰어난 대인관계 능력으로 협력과 네트워크에서 강점을 발휘하며 행복한 중년을 보냅니다.', late: '우아하고 품위 있는 노년에 자녀와 손자들로부터 깊은 사랑을 받습니다.' },
  4:  { early: '카리스마와 자신감이 넘쳐 일찍부터 주목을 받으며 높은 목표를 향해 꾸준히 나아갑니다.', middle: '강력한 리더십으로 직업적 정점에 서며 재물과 명예가 동시에 따르는 전성기를 맞습니다.', late: '풍요롭고 위엄 있는 말년에 한평생의 성취를 돌아보며 자손들에게 큰 유산을 남깁니다.' },
  5:  { early: '직관력이 뛰어나고 신중한 성격으로 학문적 성취를 이루며 신비로운 매력으로 주변을 끌어당깁니다.', middle: '날카로운 통찰력으로 전문 분야에서 깊은 전문성을 쌓고 지혜로운 조언자로 인정받습니다.', late: '내면의 평화와 지혜로 주변에서 존경받는 인생 선배로 살아갑니다.' },
  6:  { early: '활발하고 정열적인 에너지로 스포츠와 활동에서 두각을 나타내며 친구들의 중심이 됩니다.', middle: '열정적인 추진력으로 자신만의 길을 개척하며 풍요로운 인간관계를 유지합니다.', late: '활동적이고 건강한 노년에 여행과 취미로 활기찬 여생을 즐깁니다.' },
  7:  { early: '예술적 감수성이 풍부하고 창의적인 활동에서 재능을 발휘하며 조화로운 관계를 형성합니다.', middle: '전문 분야에서 인정받으며 화목한 가정과 안정적인 경제 기반을 마련합니다.', late: '평화롭고 예술적인 노년에 취미와 창작으로 행복한 여생을 보냅니다.' },
  8:  { early: '재치와 영리함으로 어릴 때부터 주목받으며 다양한 분야에서 다재다능한 능력을 발휘합니다.', middle: '유연한 사고로 변화하는 환경에서도 성공적으로 적응하며 재물운도 좋습니다.', late: '풍부한 경험과 지식으로 존경받으며 건강하고 활동적인 여생을 즐깁니다.' },
  9:  { early: '꼼꼼하고 부지런한 성격으로 높은 성취를 이루며 완벽주의적 성향이 강점이 됩니다.', middle: '전문성으로 직업적 정점에 서고 체계적인 재정 관리로 안정적인 기반을 마련합니다.', late: '성실함과 전문성으로 인정받으며 활기찬 체계적인 노년을 보냅니다.' },
  10: { early: '의리 있고 정직한 성품으로 신뢰받는 존재로 자라며 충직한 성격으로 사랑받습니다.', middle: '강한 의리와 책임감으로 가정과 직업 모두 안정을 이루고 중요한 위치에서 인정받습니다.', late: '신뢰와 덕망으로 존경받으며 가족과 함께하는 행복한 노년을 보냅니다.' },
  11: { early: '낙천적이고 관대한 성격으로 주변에서 사랑받으며 즐거운 어린 시절을 보냅니다.', middle: '풍요로운 재물운과 넓은 인간관계로 풍성한 중년을 보내며 가정도 화목합니다.', late: '풍요롭고 여유로운 노년에 가족들에게 둘러싸여 행복하게 삽니다.' },
};

const Stars = ({ n }: { n: number }) => (
  <span style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: '13px', color: i <= n ? 'var(--gold)' : 'var(--line)' }}>★</span>)}
  </span>
);

const tabSt = (active: boolean): React.CSSProperties => ({
  padding: '7px 14px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer',
  borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
  background: 'none', color: active ? 'var(--gold)' : 'var(--text-secondary)', whiteSpace: 'nowrap',
});

const inputSt = {
  padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '10px',
  fontSize: '14px', fontWeight: 600, color: 'var(--navy-800)', background: 'var(--bg-white)',
  cursor: 'pointer', fontFamily: 'inherit', outline: 'none', width: '100%',
} as const;

const labelSt = {
  display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--gold)',
  letterSpacing: '0.1em', marginBottom: '6px',
} as const;

const SajuDaily = (): ReactElement => {
  const pool = useFortunePool();
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [sijin, setSijin] = useState('');
  const [result, setResult] = useState<SajuResult | null>(null);
  const [period, setPeriod] = useState<Period>('daily');

  const yNum = parseInt(year, 10);
  const mNum = parseInt(month, 10);
  const dNum = parseInt(day, 10);
  const okY = year.length === 4 && !isNaN(yNum) && yNum >= 1900 && yNum <= 2099;
  const okM = mNum >= 1 && mNum <= 12;
  const okD = dNum >= 1 && dNum <= 31;
  const canGo = okY && okM && okD;

  const go = () => {
    if (!canGo) return;
    const sv = sijin !== '' ? parseInt(sijin, 10) : null;
    const s = calcSaju(yNum, mNum, dNum, sv);
    setResult({ ...s, year: yNum, month: mNum, day: dNum, sijinV: sv });
    setPeriod('daily');
  };

  const reset = () => { setResult(null); setYear(''); setMonth(''); setDay(''); setSijin(''); };

  const baseKey = result ? `${result.yp.ganKo}${result.yp.jiKo}-${result.dp.ganKo}${result.dp.jiKo}` : '';

  const pillars = result ? [
    { p: result.yp, label: '年柱 (년주)', sub: `${result.year}년` },
    { p: result.mp, label: '月柱 (월주)', sub: `${result.month}월` },
    { p: result.dp, label: '日柱 (일주)', sub: `${result.day}일` },
    ...(result.hp ? [{ p: result.hp, label: '時柱 (시주)', sub: SIJIN.find(s => s.v === result.sijinV)?.label ?? '' }] : []),
  ] : [];

  return (
    <>
      <SEOHead title="사주팔자 운세 | 운세 플랫폼" description="생년월일시로 사주팔자를 계산하고 기간별 운세를 확인하세요" />
      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Saju · 사주 운세</div>
          <h2>사주팔자 운세</h2>
          <p>생년월일시를 입력하고 나만의 사주팔자를 확인하세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>

          {!result ? (
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7, textAlign: 'center' }}>
                생년월일과 태어난 시간을 입력하면 사주팔자(四柱八字)를 계산하여 기간별 운세를 알려드립니다.
              </p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '2 1 120px', minWidth: 0 }}>
                  <label style={labelSt}>생년 (년)</label>
                  <input
                    type="number" value={year}
                    onChange={e => setYear(e.target.value.slice(0, 4))}
                    placeholder="예) 1990" min={1900} max={2099}
                    style={{ ...inputSt, appearance: 'textfield' as const }}
                  />
                  {year.length === 4 && (
                    <div style={{ marginTop: '6px', fontSize: '12px', fontWeight: 700, color: okY ? 'var(--gold)' : '#e55', padding: '3px 8px', background: 'var(--navy-50)', borderRadius: '6px', display: 'inline-block' }}>
                      {okY ? `${GAN[((yNum-4)%10+10)%10]}${JI[((yNum-4)%12+12)%12]}년 ${JI_EMOJI[((yNum-4)%12+12)%12]}${JI_ANIMAL[((yNum-4)%12+12)%12]}띠` : '유효하지 않은 연도'}
                    </div>
                  )}
                </div>
                <div style={{ flex: '1 1 80px', minWidth: 0 }}>
                  <label style={labelSt}>생월 (월)</label>
                  <select value={month} onChange={e => setMonth(e.target.value)} style={inputSt}>
                    <option value="">월 선택</option>
                    {Array.from({ length: 12 }, (_, i) => <option key={i+1} value={i+1}>{i+1}월</option>)}
                  </select>
                </div>
                <div style={{ flex: '1 1 80px', minWidth: 0 }}>
                  <label style={labelSt}>생일 (일)</label>
                  <select value={day} onChange={e => setDay(e.target.value)} style={inputSt}>
                    <option value="">일 선택</option>
                    {Array.from({ length: 31 }, (_, i) => <option key={i+1} value={i+1}>{i+1}일</option>)}
                  </select>
                </div>
                <div style={{ flex: '2 1 180px', minWidth: 0 }}>
                  <label style={labelSt}>태어난 시간 (시진)</label>
                  <select value={sijin} onChange={e => setSijin(e.target.value)} style={inputSt}>
                    <option value="">모름</option>
                    {SIJIN.map(s => <option key={s.v} value={s.v}>{s.label} {s.time}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '28px' }}>
                <button
                  className="btn btn-primary" onClick={go} disabled={!canGo}
                  style={{ fontSize: '15px', padding: '13px 48px', opacity: canGo ? 1 : 0.45, cursor: canGo ? 'pointer' : 'not-allowed' }}
                >
                  사주 보기 ✦
                </button>
              </div>
              <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px' }}>
                ※ 월주는 양력 월 기준(절기 미적용)으로 계산됩니다.
              </p>
            </div>

          ) : (
            <div>
              {/* 사주팔자 */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '10px' }}>
                  {result.year}년 {result.month}월 {result.day}일
                  {result.sijinV !== null && ` · ${SIJIN.find(s => s.v === result.sijinV)?.label}`} 생
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${pillars.length}, 1fr)`, gap: '8px' }}>
                  {pillars.map(({ p, label, sub }) => (
                    <div key={label} style={{ textAlign: 'center', padding: '14px 6px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}</div>
                      <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--gold)', lineHeight: 1.1 }}>{p.gan}</div>
                      <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--navy-800)', lineHeight: 1.1 }}>{p.ji}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginTop: '6px' }}>{p.ganKo}{p.jiKo}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>{p.ganOh} · {p.jiOh}</div>
                      <div style={{ fontSize: '12px', marginTop: '2px' }}>{p.jiEmoji}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 기간 탭 */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', marginBottom: '14px', overflowX: 'auto' }}>
                {PERIODS.map(p => <button key={p} style={tabSt(period === p)} onClick={() => setPeriod(p)}>{PERIOD_LABELS[p]}</button>)}
              </div>

              {!IS_LIFE(period) ? (() => {
                const total = totalStars(baseKey, period);
                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(baseKey, period, key);
                        return (
                          <div key={key} style={{ padding: '12px 14px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                              <span style={{ fontSize: '16px' }}>{icon}</span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars n={s} /></span>
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{areaText(key, s, period, pool, baseKey)}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ padding: '10px 14px', background: 'var(--navy-50)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', fontSize: '13px', color: 'var(--navy-800)' }}>
                      {overviewText(period, total, pool, baseKey)}
                    </div>
                  </>
                );
              })() : (() => {
                const lk = period as 'early' | 'middle' | 'late';
                const lifeLabel = { early: '초년 (출생~30세)', middle: '중년 (31~60세)', late: '말년 (61세 이후)' }[lk];
                const lifeText = LIFE_TEXTS[result.yp.jiIdx]?.[lk] ?? '';
                return (
                  <>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>{lifeLabel}</div>
                    <div style={{ padding: '16px 20px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '18px' }}>{result.yp.jiEmoji}</span>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold)' }}>{result.yp.gan}{result.yp.ji}년 ({result.yp.jiAnimal}띠)</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>일주 {result.dp.gan}{result.dp.ji}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--navy-800)', lineHeight: 1.9 }}>{lifeText}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(baseKey, period, key);
                        return (
                          <div key={key} style={{ padding: '10px 12px', background: 'var(--navy-50)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <span>{icon}</span>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars n={s} /></span>
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
                <button className="btn btn-ghost" onClick={reset}>다시 입력하기</button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default SajuDaily;
