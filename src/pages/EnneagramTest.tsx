import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type EnneaType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface EnneaQ {
  id: number;
  q: string;
  type: EnneaType;
}

const QUESTIONS: EnneaQ[] = [
  { id: 1,  q: '잘못된 것을 보면 참지 못하고 바로잡으려 한다',                     type: 1 },
  { id: 2,  q: '주변 사람이 힘들 때 내가 먼저 나서서 도와주고 싶다',              type: 2 },
  { id: 3,  q: '맡은 일은 반드시 성과를 내야 한다고 생각한다',                    type: 3 },
  { id: 4,  q: '나만의 독특한 감성과 취향을 소중히 여긴다',                       type: 4 },
  { id: 5,  q: '무언가를 이해할 때까지 깊이 파고드는 편이다',                     type: 5 },
  { id: 6,  q: '불확실한 상황에서는 철저히 준비해두어야 안심된다',                 type: 6 },
  { id: 7,  q: '새로운 경험과 자극을 끊임없이 추구하는 편이다',                   type: 7 },
  { id: 8,  q: '강하게 의사를 표현하고 상황을 주도하는 편이다',                   type: 8 },
  { id: 9,  q: '갈등보다는 조화를 택하고 모두가 편한 것이 더 중요하다',           type: 9 },
  { id: 10, q: '규칙이나 기준을 어기는 상황이 불편하게 느껴진다',                 type: 1 },
  { id: 11, q: '누군가에게 필요한 존재가 되는 것이 중요하다',                     type: 2 },
  { id: 12, q: '남들에게 유능하고 성공적인 사람으로 보이고 싶다',                 type: 3 },
  { id: 13, q: '평범한 삶보다 특별하고 의미 있는 삶을 원한다',                   type: 4 },
  { id: 14, q: '혼자 생각하고 분석하는 시간이 꼭 필요하다',                      type: 5 },
  { id: 15, q: '믿을 수 있는 사람이나 원칙에 의존하는 경향이 있다',              type: 6 },
  { id: 16, q: '한 가지에 오래 매이기보다 다양한 것을 즐기고 싶다',              type: 7 },
  { id: 17, q: '통제받거나 약하게 보이는 것을 극도로 싫어한다',                  type: 8 },
  { id: 18, q: '자신의 의견을 내세우기보다 상대방의 편안함을 우선시한다',         type: 9 },
];

const CHOICES = [
  { label: '완전 나', score: 4 },
  { label: '그런 편', score: 3 },
  { label: '아닌 편', score: 2 },
  { label: '전혀 아님', score: 1 },
];

const ENNEA_INFO: Record<EnneaType, { symbol: string; name: string; keyword: string; core: string }> = {
  1: { symbol: '⚖️', name: '개혁가',       keyword: '원칙과 완벽',     core: '옳고 그름을 중요하게 여기며 세상을 더 나은 곳으로 만들려는 원칙주의자' },
  2: { symbol: '💝', name: '조력가',       keyword: '사랑과 헌신',     core: '타인을 사랑하고 도움으로써 자신의 의미를 찾는 헌신형' },
  3: { symbol: '🏆', name: '성취자',       keyword: '성공과 인정',     core: '목표를 향해 에너지를 집중하며 성공과 인정을 갈망하는 추진형' },
  4: { symbol: '🎨', name: '개인주의자',   keyword: '감성과 독창성',   core: '자신만의 감성과 정체성을 소중히 여기며 깊이 있는 경험을 추구하는 독창형' },
  5: { symbol: '🔍', name: '탐구자',       keyword: '지식과 분석',     core: '지식과 이해를 통해 세상을 파악하고 독립적으로 사고하는 분석형' },
  6: { symbol: '🛡️', name: '충성가',      keyword: '안전과 신뢰',     core: '신뢰와 안전을 중시하며 헌신적으로 책임을 다하는 동반자형' },
  7: { symbol: '🌈', name: '열정가',       keyword: '자유와 탐험',     core: '새로운 경험과 즐거움을 끊임없이 추구하는 자유로운 탐험형' },
  8: { symbol: '⚡', name: '도전자',       keyword: '힘과 결단',       core: '강한 의지와 결단력으로 세상에 맞서며 자신과 타인을 보호하는 리더형' },
  9: { symbol: '☯️', name: '평화주의자',  keyword: '조화와 평화',     core: '모두를 포용하고 갈등을 줄이며 조화를 이끄는 중재형' },
};

type Phase = 'intro' | 'test' | 'result';

const EnneagramTest = (): ReactElement => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<EnneaType, number>>({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
  const [result, setResult] = useState<EnneaType | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const calcResult = (s: Record<EnneaType, number>): EnneaType => {
    let best: EnneaType = 1;
    (Object.keys(s) as unknown as EnneaType[]).forEach((k) => {
      const key = Number(k) as EnneaType;
      if (s[key] > s[best]) best = key;
    });
    return best;
  };

  const handleAnswer = (score: number) => {
    setSelected(score);
    setTimeout(() => {
      const q = QUESTIONS[current];
      const newScores = { ...scores };
      newScores[q.type] += score;
      setScores(newScores);
      setSelected(null);
      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        setResult(calcResult(newScores));
        setPhase('result');
      }
    }, 250);
  };

  const reset = () => {
    setPhase('intro');
    setCurrent(0);
    setScores({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
    setResult(null);
    setSelected(null);
  };

  const progress = phase === 'test' ? Math.round((current / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[current];
  const info = result ? ENNEA_INFO[result] : null;

  return (
    <>
      <SEOHead title="에니어그램 테스트 | Suyoung's Secret" description="18문항으로 알아보는 에니어그램 성격 유형 테스트" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">에니어그램 · 9가지 유형</div>
          <h2>에니어그램 테스트</h2>
          <p>18문항으로 나의 에니어그램 유형을 알아보세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '620px', margin: '0 auto' }}>

          {phase === 'intro' && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>☯️</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                나의 에니어그램 유형은?
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                각 문항을 읽고 나와 얼마나 잘 맞는지 솔직하게 선택해 주세요.<br />
                정답은 없습니다. 가장 솔직한 반응이 가장 정확한 결과입니다.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                {(['9가지 에니어그램 유형', '18문항', '약 3분'] as const).map((badge) => (
                  <span key={badge} style={{
                    padding: '6px 14px', background: 'var(--bg-medium-gray)',
                    borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                    color: 'var(--text-secondary)', border: '1px solid var(--line)',
                  }}>{badge}</span>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => setPhase('test')}
                style={{ fontSize: '16px', padding: '14px 40px' }}>
                테스트 시작하기 →
              </button>
            </div>
          )}

          {phase === 'test' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>Q{current + 1} / {QUESTIONS.length}</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gold)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              <div style={{
                padding: '32px 28px', background: 'var(--bg-white)',
                border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '20px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '14px' }}>
                  Q{String(current + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                  {q.q}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {CHOICES.map((c) => (
                  <button
                    key={c.score}
                    onClick={() => !selected && handleAnswer(c.score)}
                    disabled={!!selected}
                    style={{
                      padding: '16px 12px',
                      background: selected === c.score ? 'var(--bg-medium-gray)' : 'var(--bg-white)',
                      border: `2px solid ${selected === c.score ? 'var(--gold)' : 'var(--line)'}`,
                      borderRadius: '12px', cursor: 'pointer',
                      fontSize: '14px', fontWeight: 600,
                      color: selected === c.score ? 'var(--gold)' : 'var(--text-primary)',
                      transition: 'all 0.15s', fontFamily: 'inherit',
                      opacity: selected && selected !== c.score ? 0.4 : 1,
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'result' && info && result && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '16px' }}>
                  나의 에니어그램 유형
                </div>
                <div style={{
                  padding: '36px 28px', background: 'var(--bg-white)',
                  border: '2px solid var(--gold)', borderRadius: '20px', marginBottom: '20px',
                }}>
                  <div style={{ fontSize: '52px', marginBottom: '12px' }}>{info.symbol}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    유형 {result}
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {info.name}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {info.keyword}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '24px 28px', background: 'var(--bg-white)',
                border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '16px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  핵심 성향
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                  {info.core}
                </p>
              </div>

              <div style={{
                padding: '20px 24px', background: 'var(--bg-medium-gray)',
                border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '28px',
              }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>9가지 에니어그램 유형 점수</strong>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {(Object.entries(scores) as [string, number][]).sort((a, b) => b[1] - a[1]).map(([t, s]) => {
                    const typeNum = Number(t) as EnneaType;
                    const isTop = typeNum === result;
                    return (
                      <span key={t} style={{
                        padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                        background: isTop ? 'var(--gold)' : 'var(--bg-white)',
                        color: isTop ? 'var(--bg-white)' : 'var(--text-secondary)',
                        border: `1px solid ${isTop ? 'var(--gold)' : 'var(--line)'}`,
                      }}>
                        {ENNEA_INFO[typeNum].name} {s}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={reset}>다시 테스트</button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default EnneagramTest;
