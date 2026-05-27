import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type EnneaType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Question {
  id: number;
  type: EnneaType;
  q: string;
}

const QUESTIONS: Question[] = [
  // Type 1
  { id: 1,  type: 1, q: '잘못된 것을 보면 즉시 바로잡아야 한다는 충동을 느낍니다.' },
  { id: 2,  type: 1, q: '자신과 타인에게 높은 기준을 세우고 지키려 노력합니다.' },
  // Type 2
  { id: 3,  type: 2, q: '다른 사람들을 돕는 것에서 가장 큰 보람을 느낍니다.' },
  { id: 4,  type: 2, q: '주변 사람들이 나를 필요로 할 때 기쁩니다.' },
  // Type 3
  { id: 5,  type: 3, q: '목표를 달성하고 성공한 모습을 보여주는 것이 중요합니다.' },
  { id: 6,  type: 3, q: '다른 사람들에게 유능하고 인정받는 사람으로 보이고 싶습니다.' },
  // Type 4
  { id: 7,  type: 4, q: '나는 남들과 다른 독특한 존재라는 것을 자주 의식합니다.' },
  { id: 8,  type: 4, q: '깊은 감정을 경험하고 진정성 있게 표현하는 것이 중요합니다.' },
  // Type 5
  { id: 9,  type: 5, q: '관심 있는 주제를 혼자 깊이 파고드는 것을 즐깁니다.' },
  { id: 10, type: 5, q: '사람들과 어울리는 것보다 혼자만의 시간이 더 편안합니다.' },
  // Type 6
  { id: 11, type: 6, q: '불확실한 상황에서는 안전하고 신뢰할 수 있는 것을 찾게 됩니다.' },
  { id: 12, type: 6, q: '믿을 수 있는 사람들과의 깊은 유대가 매우 중요합니다.' },
  // Type 7
  { id: 13, type: 7, q: '새로운 경험과 모험을 끊임없이 찾아다닙니다.' },
  { id: 14, type: 7, q: '지루하거나 단조로운 상황을 참기 어렵습니다.' },
  // Type 8
  { id: 15, type: 8, q: '강한 의지와 리더십으로 상황을 주도하는 편입니다.' },
  { id: 16, type: 8, q: '부당한 일에는 당당히 맞서고 약자를 보호하려 합니다.' },
  // Type 9
  { id: 17, type: 9, q: '갈등보다는 조화를 선호하고 모두가 행복하기를 바랍니다.' },
  { id: 18, type: 9, q: '자신의 의견을 강하게 주장하는 것보다 화합을 중요시합니다.' },
];

const CHOICES: { label: string; value: number }[] = [
  { label: '완전 나', value: 2 },
  { label: '그런 편', value: 1 },
  { label: '아닌 편', value: 0 },
  { label: '전혀 아님', value: -1 },
];

interface TypeInfo {
  type: EnneaType;
  symbol: string;
  name: string;
  subtitle: string;
  coreDesire: string;
  desc: string;
  strengths: string[];
  challenge: string;
  wings: [EnneaType, EnneaType];
}

const TYPE_INFO: Record<EnneaType, TypeInfo> = {
  1: {
    type: 1,
    symbol: '⚖️',
    name: '개혁가',
    subtitle: '원칙적이고 완벽을 추구하는 타입',
    coreDesire: '선하고 올바른 사람이 되고 싶음',
    desc: '에니어그램 1번 유형은 강한 도덕적 기준과 원칙을 바탕으로 세상을 더 나은 곳으로 만들고자 합니다. 올바름과 정의를 중시하며 잘못된 것을 보면 바로잡으려는 강한 충동을 느낍니다. 높은 이상을 향해 끊임없이 자신을 단련하는 완벽주의자입니다.',
    strengths: ['도덕적 원칙과 강한 책임감', '꼼꼼하고 철저한 완성도', '세상을 개선하려는 열정'],
    challenge: '자신과 타인에게 지나치게 엄격한 기준을 적용해 비판적이 될 수 있습니다.',
    wings: [9, 2],
  },
  2: {
    type: 2,
    symbol: '💝',
    name: '조력가',
    subtitle: '타인을 돕고 사랑을 주는 타입',
    coreDesire: '사랑받고 필요한 존재가 되고 싶음',
    desc: '에니어그램 2번 유형은 따뜻한 마음으로 주변 사람들을 돌보고 헌신하는 것을 삶의 보람으로 삼습니다. 인간관계와 헌신을 중시하며 다른 사람의 필요를 본능적으로 파악합니다. 깊은 공감 능력과 사랑으로 주변을 밝히는 존재입니다.',
    strengths: ['뛰어난 공감 능력과 따뜻함', '타인을 세심하게 배려하는 능력', '깊고 헌신적인 인간관계'],
    challenge: '자신의 필요보다 타인을 우선시하다 보면 감정적 소진과 의존성이 생길 수 있습니다.',
    wings: [1, 3],
  },
  3: {
    type: 3,
    symbol: '🏆',
    name: '성취자',
    subtitle: '목표지향적이고 성공을 추구하는 타입',
    coreDesire: '가치 있고 성공한 사람이 되고 싶음',
    desc: '에니어그램 3번 유형은 높은 목표를 향해 끊임없이 달려가며 성공을 통해 자신의 가치를 증명하려 합니다. 효율과 인정을 중시하며 어떤 상황에서도 능력 있는 모습을 보여주고자 합니다. 타고난 리더십과 추진력으로 뛰어난 성과를 만들어냅니다.',
    strengths: ['강한 추진력과 실행 능력', '목표 달성을 위한 집중력', '자기 계발에 대한 열정'],
    challenge: '성과와 이미지에 지나치게 집착하다 보면 진정한 자아와 멀어질 수 있습니다.',
    wings: [2, 4],
  },
  4: {
    type: 4,
    symbol: '🎨',
    name: '개인주의자',
    subtitle: '독창적이고 감성적인 타입',
    coreDesire: '자신만의 정체성을 갖고 싶음',
    desc: '에니어그램 4번 유형은 깊은 감수성과 창의력으로 자신만의 독특한 세계를 구축합니다. 자기표현과 진정성을 중시하며 평범함에 만족하지 않고 특별하고 의미 있는 것을 추구합니다. 아름다움과 감정의 깊이를 누구보다 잘 느끼고 표현합니다.',
    strengths: ['풍부한 감수성과 창의적 표현력', '깊이 있는 자기 이해와 진정성', '아름다움과 의미를 발견하는 감각'],
    challenge: '자신이 결핍되어 있다는 느낌에 사로잡혀 지나친 자기 몰입과 감정 기복을 겪을 수 있습니다.',
    wings: [3, 5],
  },
  5: {
    type: 5,
    symbol: '🔍',
    name: '탐구자',
    subtitle: '지식을 탐구하고 분석하는 타입',
    coreDesire: '유능하고 지식을 갖추고 싶음',
    desc: '에니어그램 5번 유형은 지식과 이해를 통해 세상을 파악하려는 강한 지적 호기심을 가지고 있습니다. 이해와 독립을 중시하며 관심 분야에 대해 깊이 파고드는 것을 즐깁니다. 독립적이고 분석적인 사고로 독창적인 통찰을 만들어냅니다.',
    strengths: ['깊은 지적 탐구와 분석 능력', '독립적이고 객관적인 사고', '전문성과 통찰력'],
    challenge: '감정과 인간관계를 회피하고 지나치게 고립되거나 인색해질 수 있습니다.',
    wings: [4, 6],
  },
  6: {
    type: 6,
    symbol: '🛡️',
    name: '충성가',
    subtitle: '안전과 신뢰를 추구하는 타입',
    coreDesire: '안전하고 믿을 수 있는 존재가 되고 싶음',
    desc: '에니어그램 6번 유형은 믿음직한 관계와 안전한 환경을 만드는 것을 가장 중요시합니다. 소속감과 안정을 중시하며 신뢰하는 사람들에게 깊은 충성심을 보입니다. 위험을 미리 감지하는 능력과 책임감으로 공동체의 든든한 버팀목이 됩니다.',
    strengths: ['깊은 충성심과 헌신', '위험을 예측하는 통찰력', '신뢰를 구축하는 능력'],
    challenge: '불안과 의심이 과도해지면 결정을 내리기 어렵고 지나친 경계심으로 관계가 복잡해질 수 있습니다.',
    wings: [5, 7],
  },
  7: {
    type: 7,
    symbol: '🌈',
    name: '열정가',
    subtitle: '즐거움과 모험을 추구하는 타입',
    coreDesire: '행복하고 만족스러운 삶을 원함',
    desc: '에니어그램 7번 유형은 넘치는 에너지와 긍정적 마인드로 삶의 모든 가능성을 탐험합니다. 자유와 다양성을 중시하며 새로운 경험과 아이디어에 강한 매력을 느낍니다. 낙천적인 시각과 재치 있는 유머로 주변 사람들에게 활기를 불어넣습니다.',
    strengths: ['낙천적인 에너지와 유머 감각', '다양한 경험과 아이디어 탐색', '창의적이고 유연한 사고'],
    challenge: '불편함이나 고통을 회피하려다 보면 지속성이 떨어지고 깊은 관계 형성이 어려울 수 있습니다.',
    wings: [6, 8],
  },
  8: {
    type: 8,
    symbol: '⚡',
    name: '도전자',
    subtitle: '강인하고 리더십이 강한 타입',
    coreDesire: '자신을 보호하고 강한 존재가 되고 싶음',
    desc: '에니어그램 8번 유형은 강인한 의지와 결단력으로 자신과 주변을 지키며 세상에 맞섭니다. 통제와 자율을 중시하며 부당함에 맞서 약자를 보호하는 것을 사명으로 여깁니다. 강력한 존재감과 추진력으로 사람들을 이끌고 변화를 만들어냅니다.',
    strengths: ['강인한 의지와 결단력', '부당함에 맞서는 용기', '자연스러운 리더십과 보호 본능'],
    challenge: '지나친 통제욕과 강함에 대한 집착이 타인과의 관계에서 갈등을 만들 수 있습니다.',
    wings: [7, 9],
  },
  9: {
    type: 9,
    symbol: '☯️',
    name: '평화주의자',
    subtitle: '조화와 평화를 추구하는 타입',
    coreDesire: '내면의 평화와 화합을 원함',
    desc: '에니어그램 9번 유형은 모든 사람과 상황을 포용하는 넉넉한 마음으로 갈등 없는 조화를 이루려 합니다. 안정과 수용을 중시하며 다양한 관점을 이해하고 연결하는 자연스러운 중재자 역할을 합니다. 평온하고 온화한 에너지로 주변에 안정감을 줍니다.',
    strengths: ['뛰어난 공감과 포용력', '다양한 관점을 연결하는 능력', '평온하고 안정적인 에너지'],
    challenge: '갈등을 피하려다 보면 자신의 의견이나 필요를 무시하고 수동적이 될 수 있습니다.',
    wings: [8, 1],
  },
};

type Phase = 'intro' | 'test' | 'result';

const EnneagramTest = (): ReactElement => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<EnneaType, number>>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
  });
  const [resultType, setResultType] = useState<EnneaType | null>(null);

  const calcResult = (finalScores: Record<EnneaType, number>): EnneaType => {
    let best: EnneaType = 1;
    let bestScore = finalScores[1];
    (Object.keys(finalScores) as unknown as EnneaType[]).forEach((t) => {
      const key = Number(t) as EnneaType;
      if (finalScores[key] > bestScore) {
        bestScore = finalScores[key];
        best = key;
      }
    });
    return best;
  };

  const handleAnswer = (value: number) => {
    const q = QUESTIONS[current];
    const newScores = { ...scores, [q.type]: scores[q.type] + value };
    setScores(newScores);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      const winner = calcResult(newScores);
      setResultType(winner);
      setPhase('result');
    }
  };

  const reset = () => {
    setPhase('intro');
    setCurrent(0);
    setScores({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
    setResultType(null);
  };

  const progress = phase === 'test' ? Math.round((current / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[current];
  const info = resultType ? TYPE_INFO[resultType] : null;

  return (
    <>
      <SEOHead title="에니어그램 테스트 | Suyoung's Secret" description="18문항으로 알아보는 나의 에니어그램 성격 유형 테스트" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">에니어그램 · 성격 유형 테스트</div>
          <h2>에니어그램 테스트</h2>
          <p>18문항으로 알아보는 나의 에니어그램 유형</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '640px', margin: '0 auto' }}>

          {/* Intro */}
          {phase === 'intro' && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔯</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy-800)', marginBottom: '16px' }}>
                나의 에니어그램 유형은?
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                9가지 성격 유형, 총 18문항으로<br />
                당신의 핵심 동기와 성격 유형을 알아봅니다.<br />
                각 문항에 솔직하게 답해주세요.
              </p>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px',
                marginBottom: '40px',
              }}>
                {(Object.values(TYPE_INFO) as TypeInfo[]).map((t) => (
                  <div key={t.type} style={{
                    padding: '10px 8px',
                    background: 'var(--navy-50)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--navy-800)',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{t.symbol}</div>
                    <div>유형 {t.type}</div>
                    <div style={{ fontWeight: 400, color: 'var(--text-secondary)', fontSize: '12px' }}>{t.name}</div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setPhase('test')}
                style={{ fontSize: '16px', padding: '14px 40px' }}
              >
                테스트 시작하기 →
              </button>
            </div>
          )}

          {/* Test */}
          {phase === 'test' && (
            <div>
              {/* Progress */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)',
                }}>
                  <span>{current + 1} / {QUESTIONS.length}</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${progress}%`,
                    background: 'var(--gold)', borderRadius: '2px',
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>

              {/* Question */}
              <div style={{
                padding: '36px 32px',
                background: 'var(--bg-white)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                marginBottom: '20px',
              }}>
                <div style={{
                  fontSize: '12px', fontWeight: 700, color: 'var(--gold)',
                  letterSpacing: '0.1em', marginBottom: '16px',
                }}>
                  Q{String(current + 1).padStart(2, '0')} &nbsp;·&nbsp; 유형 {q.type} — {TYPE_INFO[q.type].name} {TYPE_INFO[q.type].symbol}
                </div>
                <h3 style={{
                  fontSize: '19px', fontWeight: 800, color: 'var(--navy-800)',
                  lineHeight: 1.5, margin: 0,
                }}>
                  {q.q}
                </h3>
              </div>

              {/* Choices */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {CHOICES.map((choice) => (
                  <button
                    key={choice.label}
                    onClick={() => handleAnswer(choice.value)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '18px 24px',
                      background: 'var(--bg-white)',
                      border: '2px solid var(--line)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: 'var(--navy-800)',
                      fontWeight: 500,
                      lineHeight: 1.4,
                      transition: 'border-color 0.15s, background 0.15s',
                      fontFamily: 'inherit',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold)';
                      e.currentTarget.style.background = 'var(--navy-50)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--line)';
                      e.currentTarget.style.background = 'var(--bg-white)';
                    }}
                  >
                    <span style={{
                      minWidth: '56px', height: '32px', borderRadius: '16px',
                      background: 'var(--navy-50)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontWeight: 700, fontSize: '12px',
                      color: 'var(--gold)', flexShrink: 0, padding: '0 8px',
                    }}>
                      {choice.value > 0 ? `+${choice.value}` : choice.value === 0 ? '0' : `${choice.value}`}
                    </span>
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {phase === 'result' && info && (
            <div style={{ textAlign: 'center' }}>
              {/* Header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  fontSize: '14px', fontWeight: 700, color: 'var(--gold)',
                  letterSpacing: '0.15em', marginBottom: '12px',
                }}>
                  나의 에니어그램 유형
                </div>
                <div style={{ fontSize: '72px', marginBottom: '8px', lineHeight: 1 }}>
                  {info.symbol}
                </div>
                <div style={{
                  fontSize: '48px', fontWeight: 900, color: 'var(--navy-800)',
                  lineHeight: 1, marginBottom: '8px',
                }}>
                  유형 {info.type}
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>
                  {info.name}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {info.subtitle}
                </div>
              </div>

              {/* Core Desire */}
              <div style={{
                padding: '16px 24px',
                background: 'var(--navy-50)',
                borderRadius: '10px',
                marginBottom: '20px',
                fontSize: '14px',
                color: 'var(--navy-800)',
                fontWeight: 600,
              }}>
                핵심 욕구: {info.coreDesire}
              </div>

              {/* Description */}
              <div style={{
                padding: '28px 32px',
                background: 'var(--bg-white)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                marginBottom: '16px',
                textAlign: 'left',
              }}>
                <p style={{
                  fontSize: '15px', color: 'var(--text-secondary)',
                  lineHeight: 1.8, margin: 0,
                }}>
                  {info.desc}
                </p>
              </div>

              {/* Strengths */}
              <div style={{
                padding: '24px 28px',
                background: 'var(--bg-white)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                marginBottom: '16px',
                textAlign: 'left',
              }}>
                <div style={{
                  fontSize: '12px', fontWeight: 700, color: 'var(--gold)',
                  letterSpacing: '0.1em', marginBottom: '14px',
                }}>
                  핵심 강점
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {info.strengths.map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: 'var(--gold)', flexShrink: 0, marginTop: '7px',
                      }} />
                      <span style={{ fontSize: '14px', color: 'var(--navy-800)', fontWeight: 500 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Challenge */}
              <div style={{
                padding: '20px 28px',
                background: 'var(--bg-white)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                marginBottom: '16px',
                textAlign: 'left',
              }}>
                <div style={{
                  fontSize: '12px', fontWeight: 700, color: 'var(--gold)',
                  letterSpacing: '0.1em', marginBottom: '10px',
                }}>
                  성장 과제
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {info.challenge}
                </p>
              </div>

              {/* Wing Types */}
              <div style={{
                padding: '20px 28px',
                background: 'var(--bg-white)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                marginBottom: '32px',
                textAlign: 'left',
              }}>
                <div style={{
                  fontSize: '12px', fontWeight: 700, color: 'var(--gold)',
                  letterSpacing: '0.1em', marginBottom: '14px',
                }}>
                  날개 유형 (Wing Types)
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {info.wings.map((w) => (
                    <div key={w} style={{
                      flex: 1, padding: '14px 16px',
                      background: 'var(--navy-50)',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '22px', marginBottom: '4px' }}>{TYPE_INFO[w].symbol}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)' }}>
                        유형 {w}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {TYPE_INFO[w].name}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{
                  fontSize: '12px', color: 'var(--text-secondary)',
                  marginTop: '12px', marginBottom: 0, lineHeight: 1.6,
                }}>
                  날개 유형은 인접한 유형으로, 유형 {info.type}의 성격에 영향을 줄 수 있습니다.
                </p>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={reset}>다시 테스트</button>
                <Link className="btn btn-ghost" to="/mbti/enneagram">MBTI+에니어그램 조합 보기</Link>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default EnneagramTest;
