import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';
import {
  PERIODS, PERIOD_LABELS, FAREAS, IS_LIFE,
  areaStars, areaText, overviewText, totalStars,
} from '../utils/fortuneEngine';
import type { Period } from '../utils/fortuneEngine';

const JIJI = [
  { id: 'ja',  name: '子', animal: '🐭 쥐',     years: '1960·72·84·96·2008·20', trait: '영리하고 적응력이 뛰어난',
    life: { early: '총명하고 재치 있는 성격으로 어린 시절부터 두각을 나타냅니다. 빠른 적응력과 다재다능한 능력으로 폭넓은 경험을 쌓으며 사교적인 인간관계로 넓은 인맥을 형성합니다.', middle: '날카로운 판단력과 추진력으로 직업적 성과를 거둡니다. 재물운이 강하여 안정적인 경제 기반을 마련하며 가정과 일의 균형 속에 풍요로운 삶을 누립니다.', late: '지혜롭고 원만한 성품으로 주변의 존경을 받습니다. 건강 관리에 유의하면 장수할 수 있으며 자녀들의 성공 속에서 만족스러운 여생을 보냅니다.' } },
  { id: 'ch',  name: '丑', animal: '🐮 소',     years: '1961·73·85·97·2009·21', trait: '인내심 강하고 성실한',
    life: { early: '성실하고 인내심 강한 성격이 이른 시기부터 나타납니다. 차근차근 실력을 쌓아가며 신뢰받는 인물로 성장하고 꾸준히 나아가는 힘이 큰 강점입니다.', middle: '성실함의 결실이 나타나는 시기입니다. 안정적인 직업과 경제력을 갖추게 되며 가정적으로도 단란한 삶을 이룹니다.', late: '평생 쌓아온 신뢰와 덕망으로 존경받는 어른으로 자리매김합니다. 건강하고 평화로운 말년을 보내며 자손들의 번영을 지켜봅니다.' } },
  { id: 'in',  name: '寅', animal: '🐯 호랑이', years: '1962·74·86·98·2010·22', trait: '용감하고 패기 넘치는',
    life: { early: '용감하고 활기 넘치는 에너지로 어릴 때부터 리더십을 발휘합니다. 도전 정신이 강하여 새로운 경험을 두려워하지 않으며 패기 있는 성격으로 주목을 받습니다.', middle: '과감한 결단력으로 중요한 시기에 큰 성과를 거둡니다. 사업이나 직업에서 두각을 나타내며 재물과 명예 모두 상승하는 전성기를 맞습니다.', late: '강인한 체력과 넘치는 에너지로 활동적인 노년을 보냅니다. 지나온 삶에 대한 자부심이 강하며 후배들에게 용기와 지혜를 나눠줍니다.' } },
  { id: 'myo', name: '卯', animal: '🐰 토끼',   years: '1963·75·87·99·2011·23', trait: '섬세하고 온화한',
    life: { early: '섬세하고 감수성이 풍부한 어린 시절을 보냅니다. 예술적 재능이 이른 나이에 발현되며 부드러운 성품으로 주위에서 사랑받습니다.', middle: '뛰어난 대인관계 능력으로 다양한 분야에서 성공합니다. 온화한 성품 덕분에 협력과 네트워크에서 강점을 발휘하며 가정적으로도 행복한 중년을 보냅니다.', late: '우아하고 품위 있는 노년을 보냅니다. 건강에 신경 쓰면 장수할 수 있으며 자녀와 손자들로부터 깊은 사랑을 받습니다.' } },
  { id: 'jin', name: '辰', animal: '🐲 용',     years: '1964·76·88·2000·12·24', trait: '카리스마 넘치는',
    life: { early: '카리스마와 자신감이 넘치는 어린 시절을 보냅니다. 재능이 다방면에 걸쳐 있어 일찍부터 주목을 받으며 높은 목표를 향해 꾸준히 나아갑니다.', middle: '강력한 리더십으로 직업적 정점에 서게 됩니다. 재물과 명예가 동시에 따르는 전성기를 맞이하며 큰 그림을 실현하는 능력이 빛을 발합니다.', late: '풍요롭고 위엄 있는 말년을 보냅니다. 한평생의 성취를 돌아보며 만족스러운 여생을 누리고 자손들에게 큰 유산을 남깁니다.' } },
  { id: 'sa',  name: '巳', animal: '🐍 뱀',     years: '1965·77·89·2001·13·25', trait: '직관이 날카롭고 신비로운',
    life: { early: '직관력이 뛰어나고 신중한 성격이 어릴 때부터 나타납니다. 깊이 사고하는 습관으로 학문적 성취를 이루며 신비로운 매력으로 주변을 끌어당깁니다.', middle: '날카로운 통찰력으로 중요한 결정에서 탁월한 판단을 내립니다. 재정적 안정을 이루며 전문 분야에서 깊은 전문성을 쌓아 지혜로운 조언자로 인정받습니다.', late: '내면의 평화와 지혜가 넘치는 노년을 보냅니다. 풍부한 경험을 나누며 주변에서 존경받는 인생 선배로 살아갑니다.' } },
  { id: 'o',   name: '午', animal: '🐴 말',     years: '1966·78·90·2002·14·26', trait: '활발하고 정열적인',
    life: { early: '활발하고 정열적인 에너지로 가득한 어린 시절을 보냅니다. 스포츠나 활동적인 취미에서 두각을 나타내며 밝은 성격으로 친구들의 중심이 됩니다.', middle: '열정적인 추진력으로 직업적 성공을 이루어 나갑니다. 자유롭고 독립적인 기질로 자신만의 길을 개척하며 활발한 사교 생활로 풍요로운 인간관계를 유지합니다.', late: '활동적이고 건강한 노년을 보냅니다. 여행과 취미 생활로 활기찬 여생을 즐기며 따뜻한 인간관계 속에서 행복을 찾습니다.' } },
  { id: 'mi',  name: '未', animal: '🐑 양',     years: '1967·79·91·2003·15·27', trait: '예술적 감수성이 풍부한',
    life: { early: '예술적 감수성이 풍부하고 온화한 성품의 어린 시절을 보냅니다. 창의적인 활동에서 재능을 발휘하며 조화로운 인간관계를 형성합니다.', middle: '예술적 재능이나 전문 분야에서 인정받는 중년을 보냅니다. 가정적으로 화목하며 안정적인 경제 기반을 마련하고 배려심으로 주변을 따뜻하게 합니다.', late: '평화롭고 예술적인 노년을 보냅니다. 취미와 창작 활동으로 행복한 여생을 보내며 가족들의 사랑을 받습니다.' } },
  { id: 'sin', name: '申', animal: '🐵 원숭이', years: '1968·80·92·2004·16·28', trait: '재치 있고 영리한',
    life: { early: '재치와 영리함으로 어릴 때부터 눈에 띄는 존재입니다. 배우는 속도가 빠르고 다재다능하여 다양한 분야에서 능력을 발휘합니다.', middle: '뛰어난 두뇌와 유연한 사고로 변화하는 환경에서도 성공적으로 적응합니다. 재물운이 좋아 안정적인 경제력을 갖추며 인간관계도 풍성합니다.', late: '풍부한 경험과 지식으로 주변에서 존경받는 노년을 보냅니다. 건강하고 활동적인 여생을 즐기며 자손들의 번영을 지켜봅니다.' } },
  { id: 'yu',  name: '酉', animal: '🐔 닭',     years: '1969·81·93·2005·17·29', trait: '꼼꼼하고 부지런한',
    life: { early: '꼼꼼하고 부지런한 성격이 어릴 때부터 나타납니다. 완벽주의적 성향으로 맡은 일을 철저히 마무리하며 높은 성취를 이룹니다.', middle: '성실함과 전문성으로 직업적 정점에 서게 됩니다. 체계적인 재정 관리로 안정적인 경제 기반을 마련하며 가정적으로도 모범적인 삶을 삽니다.', late: '평생 쌓아온 전문성과 성실함으로 인정받는 노년을 보냅니다. 건강하고 체계적인 생활로 활기찬 여생을 즐깁니다.' } },
  { id: 'sul', name: '戌', animal: '🐶 개',     years: '1970·82·94·2006·18·30', trait: '의리 있고 충직한',
    life: { early: '의리 있고 정직한 성품이 어릴 때부터 나타납니다. 친구들에게 믿음직스러운 존재로 사랑받으며 충직한 성격으로 신뢰를 쌓아갑니다.', middle: '강한 의리와 책임감으로 중요한 위치에서 인정받습니다. 가정에 대한 헌신이 강하며 안정적인 삶의 기반을 탄탄히 다집니다.', late: '평생 쌓아온 신뢰와 덕망으로 주변의 존경을 받습니다. 가족과 함께하는 행복한 노년을 보내며 의미 있는 여생을 누립니다.' } },
  { id: 'hae', name: '亥', animal: '🐷 돼지',   years: '1971·83·95·2007·19·31', trait: '낙천적이고 풍요로운',
    life: { early: '낙천적이고 풍요로운 기질이 어릴 때부터 나타납니다. 관대하고 따뜻한 성격으로 주변에서 사랑받으며 즐거운 어린 시절을 보냅니다.', middle: '풍요로운 재물운과 넓은 인간관계로 풍성한 중년을 보냅니다. 가정적으로 화목하며 사람들과 함께하는 즐거움 속에서 삶의 행복을 찾습니다.', late: '풍요롭고 여유로운 노년을 보냅니다. 가족들에게 둘러싸여 행복한 여생을 보내며 건강과 재물 모두 안정적입니다.' } },
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

const SajuDaily = (): ReactElement => {
  const [sel, setSel] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('daily');
  const jiji = JIJI.find(j => j.id === sel);

  return (
    <>
      <SEOHead title="사주·띠 운세 | 운세 플랫폼" description="12띠별 일·월·년·초년·중년·말년 운세" />
      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Saju · 사주 운세</div>
          <h2>사주·띠 운세</h2>
          <p>나의 띠를 선택하고 기간별 운세를 확인하세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* 띠 선택 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginBottom: '14px' }}>
            {JIJI.map(j => (
              <button key={j.id} onClick={() => { setSel(j.id); setPeriod('daily'); }}
                style={{ padding: '9px 4px', border: `2px solid ${sel === j.id ? 'var(--gold)' : 'var(--line)'}`, borderRadius: '10px', background: sel === j.id ? 'var(--navy-50)' : 'var(--bg-white)', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', marginBottom: '1px' }}>{j.animal.split(' ')[0]}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: sel === j.id ? 'var(--gold)' : 'var(--navy-800)' }}>{j.animal.split(' ')[1]}</div>
              </button>
            ))}
          </div>

          {!jiji ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', padding: '24px 0' }}>
              위에서 자신의 띠를 선택하면 기간별 운세를 확인할 수 있습니다.
            </p>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '9px 14px', background: 'var(--navy-50)', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>{jiji.animal.split(' ')[0]}</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold)' }}>{jiji.name}년 {jiji.animal} 띠</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>({jiji.years}년생)</span>
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-secondary)' }}>{jiji.trait}</span>
              </div>

              <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', marginBottom: '14px', overflowX: 'auto' }}>
                {PERIODS.map(p => <button key={p} style={tabSt(period === p)} onClick={() => setPeriod(p)}>{PERIOD_LABELS[p]}</button>)}
              </div>

              {!IS_LIFE(period) ? (() => {
                const total = totalStars(jiji.id, period);
                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(jiji.id, period, key);
                        return (
                          <div key={key} style={{ padding: '12px 14px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                              <span style={{ fontSize: '16px' }}>{icon}</span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars n={s} /></span>
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{areaText(key, s)}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ padding: '10px 14px', background: 'var(--navy-50)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', fontSize: '13px', color: 'var(--navy-800)' }}>
                      {overviewText(period, total)}
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
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--navy-800)', lineHeight: 1.9 }}>{jiji.life[lk]}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {FAREAS.map(({ key, icon, label }) => {
                        const s = areaStars(jiji.id, period, key);
                        return (
                          <div key={key} style={{ padding: '10px 12px', background: 'var(--navy-50)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <span>{icon}</span>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)' }}>{label}</span>
                              <span style={{ marginLeft: 'auto' }}><Stars n={s} /></span>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{areaText(key, s)}</p>
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

export default SajuDaily;
