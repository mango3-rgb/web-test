import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';
import {
  PERIODS, PERIOD_LABELS, FAREAS, IS_LIFE,
  areaStars, areaText, overviewText, totalStars,
} from '../utils/fortuneEngine';
import type { Period } from '../utils/fortuneEngine';
import { useFortunePool } from '../hooks/useFortunePool';

const SIGNS = [
  { id: 'aries',  symbol: '♈', name: '양자리',    dates: '3.21~4.19',   trait: '열정적이고 개척적인',
    life: { early: '넘치는 열정과 용기로 어릴 때부터 도전 정신을 발휘합니다. 경쟁적인 환경에서 두각을 나타내며 선두에 서려는 강한 기질이 성장의 원동력이 됩니다.', middle: '리더십이 빛을 발하는 전성기입니다. 개척 정신으로 새로운 길을 만들어 나가며 직업적 성공과 함께 사회적 인정을 받습니다.', late: '활발하고 독립적인 노년을 보냅니다. 항상 새로운 도전을 즐기며 활기찬 여생 속에서 후배들에게 용기를 나눠줍니다.' } },
  { id: 'taurus', symbol: '♉', name: '황소자리',   dates: '4.20~5.20',   trait: '안정적이고 현실적인',
    life: { early: '안정적이고 현실적인 기질로 착실하게 성장합니다. 인내심이 강하여 목표를 향해 꾸준히 나아가며 물질적 안정에 대한 뚜렷한 감각이 있습니다.', middle: '성실한 노력의 결실이 나타나는 시기입니다. 안정적인 경제 기반과 편안한 가정을 이루며 삶의 여유를 즐깁니다.', late: '물질적·정신적으로 풍요로운 노년을 보냅니다. 여유롭고 안락한 삶 속에서 삶의 진정한 즐거움을 발견합니다.' } },
  { id: 'gemini', symbol: '♊', name: '쌍둥이자리', dates: '5.21~6.20',   trait: '다재다능하고 재치 있는',
    life: { early: '다재다능하고 재치 있는 기질로 다양한 분야에 관심을 보입니다. 지적 호기심이 왕성하여 폭넓은 지식과 경험을 쌓습니다.', middle: '뛰어난 소통 능력과 지적 재능으로 다양한 분야에서 성공합니다. 변화에 유연하게 적응하는 능력이 강점이 됩니다.', late: '활발한 지적 활동으로 끊임없이 배우며 성장하는 노년을 보냅니다. 다양한 사람들과의 교류 속에서 활기를 유지합니다.' } },
  { id: 'cancer', symbol: '♋', name: '게자리',     dates: '6.21~7.22',   trait: '감수성 풍부하고 따뜻한',
    life: { early: '감수성이 풍부하고 가족 중심적인 어린 시절을 보냅니다. 직관력이 뛰어나며 주변 사람들의 감정에 공감하는 능력이 탁월합니다.', middle: '강한 직관과 돌봄의 정신으로 가정과 직업 모두에서 안정을 이룹니다. 가족을 위한 헌신이 삶의 가장 큰 행복이 됩니다.', late: '가족에게 둘러싸여 따뜻하고 평화로운 노년을 보냅니다. 깊은 감성과 지혜로 주변에 위안을 줍니다.' } },
  { id: 'leo',    symbol: '♌', name: '사자자리',   dates: '7.23~8.22',   trait: '카리스마 있고 창의적인',
    life: { early: '카리스마와 자신감이 넘치는 어린 시절을 보냅니다. 창의적인 재능이 이른 나이에 발현되며 자연스럽게 주목을 받습니다.', middle: '리더십과 창의성이 빛을 발하는 전성기입니다. 중요한 직책에서 큰 성과를 거두며 명예와 재물이 동시에 따릅니다.', late: '위엄 있고 풍요로운 노년을 보냅니다. 오랫동안 쌓아온 명성과 존경을 받으며 만족스러운 여생을 누립니다.' } },
  { id: 'virgo',  symbol: '♍', name: '처녀자리',   dates: '8.23~9.22',   trait: '꼼꼼하고 분석적인',
    life: { early: '꼼꼼하고 분석적인 기질로 학업에서 뛰어난 성취를 보입니다. 완벽주의적 성향이 강하여 높은 수준을 추구하며 세심한 능력이 강점입니다.', middle: '전문성과 분석력으로 직업적 성공을 이룹니다. 체계적인 관리 능력으로 안정적인 삶의 기반을 마련하고 전문가로 인정받습니다.', late: '건강하고 체계적인 생활로 활기찬 노년을 보냅니다. 전문적인 지식을 나누며 후배들에게 존경받습니다.' } },
  { id: 'libra',  symbol: '♎', name: '천칭자리',   dates: '9.23~10.22',  trait: '균형감 있고 사교적인',
    life: { early: '균형 감각과 사교적인 기질로 주변에서 사랑받습니다. 공정함과 아름다움을 추구하는 성향이 이른 나이에 나타나며 폭넓은 인간관계를 형성합니다.', middle: '뛰어난 대인관계 능력으로 다양한 분야에서 성공합니다. 파트너십과 협력에서 강점을 발휘하며 균형 잡힌 삶을 이룹니다.', late: '우아하고 조화로운 노년을 보냅니다. 좋은 인간관계 속에서 평화롭고 행복한 여생을 누립니다.' } },
  { id: 'scorp',  symbol: '♏', name: '전갈자리',   dates: '10.23~11.21', trait: '강렬하고 직관적인',
    life: { early: '강렬한 직관력과 통찰력이 어릴 때부터 두드러집니다. 깊이 있는 사고와 신비로운 매력으로 독특한 존재감을 발휘합니다.', middle: '강한 의지력과 통찰력으로 큰 성취를 이루는 시기입니다. 변혁과 재생의 힘으로 어려운 상황도 극복하며 성장합니다.', late: '깊은 지혜와 내면의 강인함으로 의미 있는 노년을 보냅니다. 주변에서 깊이 있는 조언자로 존경받습니다.' } },
  { id: 'sagit',  symbol: '♐', name: '사수자리',   dates: '11.22~12.21', trait: '자유롭고 낙관적인',
    life: { early: '자유롭고 낙관적인 기질로 넓은 세상을 향한 꿈을 키웁니다. 지적 호기심이 왕성하여 다양한 경험을 추구하며 모험을 즐깁니다.', middle: '철학적 사고와 모험 정신으로 넓은 세계에서 활약합니다. 자유로운 영혼이 가장 빛나는 시기로 다양한 성취를 이룹니다.', late: '풍부한 경험과 지혜를 나누는 활동적인 노년을 보냅니다. 여행과 배움을 즐기며 활기찬 여생을 이어갑니다.' } },
  { id: 'capri',  symbol: '♑', name: '염소자리',   dates: '12.22~1.19',  trait: '야망 있고 책임감 강한',
    life: { early: '야망 있고 책임감 강한 기질로 어릴 때부터 목표를 향해 차근차근 나아갑니다. 성실함과 인내심이 남달라 주변의 신뢰를 얻습니다.', middle: '오랜 노력의 결실이 나타나는 전성기입니다. 사회적 지위와 경제적 안정을 동시에 성취하며 책임 있는 삶을 살아갑니다.', late: '평생 쌓아온 성취와 존경 속에서 풍요로운 노년을 보냅니다. 원숙한 지혜로 주변에서 존중받습니다.' } },
  { id: 'aqua',   symbol: '♒', name: '물병자리',   dates: '1.20~2.18',   trait: '독창적이고 미래지향적인',
    life: { early: '독창적이고 미래 지향적인 기질로 어릴 때부터 남다른 개성을 보입니다. 혁신적인 아이디어로 주목을 받으며 자신만의 세계를 구축합니다.', middle: '독특한 시각과 혁신적 사고로 시대를 앞서가는 중년을 보냅니다. 인도주의적 가치를 추구하며 의미 있는 일에서 성취감을 찾습니다.', late: '독창적이고 의미 있는 노년을 보냅니다. 새로운 기술과 변화에 열린 자세로 활기찬 여생을 즐깁니다.' } },
  { id: 'pisces', symbol: '♓', name: '물고기자리', dates: '2.19~3.20',   trait: '공감 능력이 뛰어난',
    life: { early: '공감 능력이 뛰어나고 예술적인 기질이 어릴 때부터 나타납니다. 상상력이 풍부하며 깊은 감수성으로 주변 사람들과 강한 정서적 유대를 형성합니다.', middle: '예술적 재능과 뛰어난 공감 능력으로 치유와 창작 분야에서 성공합니다. 따뜻한 인간관계 속에서 삶의 의미를 찾습니다.', late: '영적으로 풍요롭고 평화로운 노년을 보냅니다. 예술과 명상으로 내면의 행복을 찾으며 주변에 위안과 영감을 줍니다.' } },
];

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

const Horoscope = (): ReactElement => {
  const pool = useFortunePool();
  const [sel, setSel] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('daily');
  const sign = SIGNS.find(s => s.id === sel);

  return (
    <>
      <SEOHead title="별자리 운세 | Suyoung's Secret" description="12별자리 일·월·년·초년·중년·말년 운세" />
      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Horoscope · 별자리 운세</div>
          <h2>별자리 운세</h2>
          <p>나의 별자리를 선택하고 기간별 운세를 확인하세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* 별자리 선택 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginBottom: '14px' }}>
            {SIGNS.map(s => (
              <button key={s.id} onClick={() => { setSel(s.id); setPeriod('daily'); }}
                style={{ padding: '9px 4px', border: `2px solid ${sel === s.id ? 'var(--gold)' : 'var(--line)'}`, borderRadius: '10px', background: sel === s.id ? 'var(--navy-50)' : 'var(--bg-white)', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', marginBottom: '1px' }}>{s.symbol}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: sel === s.id ? 'var(--gold)' : 'var(--navy-800)' }}>{s.name}</div>
              </button>
            ))}
          </div>

          {!sign ? (
            <>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', padding: '8px 0 16px' }}>
                위에서 자신의 별자리를 선택하면 기간별 운세를 확인할 수 있습니다.
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Link to="/horoscope/compatibility" className="btn btn-ghost">별자리 궁합 →</Link>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '9px 14px', background: 'var(--navy-50)', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>{sign.symbol}</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold)' }}>{sign.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{sign.dates}</span>
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-secondary)' }}>{sign.trait}</span>
              </div>

              <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', marginBottom: '14px', overflowX: 'auto' }}>
                {PERIODS.map(p => <button key={p} style={tabSt(period === p)} onClick={() => setPeriod(p)}>{PERIOD_LABELS[p]}</button>)}
              </div>

              {!IS_LIFE(period) ? (() => {
                const total = totalStars(sign.id, period);
                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(sign.id, period, key);
                        return (
                          <div key={key} style={{ padding: '12px 14px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                              <span style={{ fontSize: '16px' }}>{icon}</span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars n={s} /></span>
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{areaText(key, s, period, pool, sign.id)}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ padding: '10px 14px', background: 'var(--navy-50)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', fontSize: '13px', color: 'var(--navy-800)' }}>
                      {overviewText(period, total, pool, sign.id)}
                    </div>
                  </>
                );
              })() : (() => {
                const lk = period as 'early' | 'middle' | 'late';
                const lifeLabel = { early: '초년 (출생~30세)', middle: '중년 (31~60세)', late: '말년 (61세 이후)' }[lk];
                return (
                  <>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>{lifeLabel}</div>
                    <div style={{ padding: '16px 20px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '10px' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--navy-800)', lineHeight: 1.9 }}>{sign.life[lk]}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(sign.id, period, key);
                        return (
                          <div key={key} style={{ padding: '10px 12px', background: 'var(--navy-50)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <span>{icon}</span>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars n={s} /></span>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{areaText(key, s, period, pool, sign.id)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Horoscope;
