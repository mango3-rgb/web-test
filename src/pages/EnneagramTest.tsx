import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type EnneaType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Dim = 'EI' | 'SN' | 'TF' | 'JP';

interface CombinedQ {
  id: number;
  q: string;
  a: string;
  b: string;
  mbti: { dim: Dim; aIsFirst: boolean }; // aIsFirst: true면 A=E/S/T/J
  aEnneagram: EnneaType[];
  bEnneagram: EnneaType[];
}

const QUESTIONS: CombinedQ[] = [
  {
    id: 1, q: '깊은 밤, 생각이 꽉 찰 때 나는?',
    a: '친구에게 메시지를 보내거나 SNS에 올린다',
    b: '혼자 일기를 쓰거나 생각 속에 잠긴다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [3, 7, 2], bEnneagram: [4, 5, 9],
  },
  {
    id: 2, q: '소중한 친구가 분명히 잘못된 선택을 하려 할 때',
    a: '논리적 문제점을 명확하게 짚어준다',
    b: '감정을 먼저 받아주고 조심스럽게 이야기한다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 5, 8], bEnneagram: [2, 4, 9],
  },
  {
    id: 3, q: '내일 자유 시간이 생겼다. 지금 하는 일은?',
    a: '하고 싶은 것들을 리스트로 만들어 계획을 세운다',
    b: '내일 일어나면 그때 기분 따라 결정하려 한다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 3, 6], bEnneagram: [7, 4, 9],
  },
  {
    id: 4, q: '낯선 도시 시장에서 처음 맡는 향기. 내가 먼저 하는 것은?',
    a: '어디서 나는 냄새인지 눈으로 직접 찾아본다',
    b: '그 향기가 불러오는 기억이나 이미지에 잠긴다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [1, 6, 8], bEnneagram: [4, 5, 7],
  },
  {
    id: 5, q: '오랜 친구 생일 파티, 아는 사람은 나 포함 셋뿐이다',
    a: '새로 온 사람들과 먼저 대화를 시작한다',
    b: '아는 셋과 더 깊은 대화를 이어간다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [2, 3, 7], bEnneagram: [5, 4, 6],
  },
  {
    id: 6, q: '팀 프로젝트에서 내가 훨씬 많은 일을 하고 있다는 걸 알았다',
    a: '역할 분담이 잘못됐다고 명확하게 말한다',
    b: '이번엔 그냥 하고, 다음에 관계를 고려해 조율한다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 8, 3], bEnneagram: [2, 9, 6],
  },
  {
    id: 7, q: '마감이 3일 남았다. 나의 상태는?',
    a: '이미 70% 이상 완성해 마무리 중이다',
    b: '이제부터 집중하면 충분하다고 생각한다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 6, 3], bEnneagram: [7, 8, 5],
  },
  {
    id: 8, q: '처음 가는 카페에서 메뉴를 고를 때',
    a: '평점 높고 가장 많이 팔린 것을 선택한다',
    b: '이름도 조합도 낯선 신메뉴에 도전한다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [6, 1, 9], bEnneagram: [7, 4, 5],
  },
  {
    id: 9, q: '중요한 발표 하루 전날 컨디션을 올리는 방법은?',
    a: '친구들을 만나거나 유쾌한 영상으로 기분을 올린다',
    b: '일찍 잠자리에 들며 혼자 정신을 가다듬는다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [7, 3, 2], bEnneagram: [5, 1, 6],
  },
  {
    id: 10, q: '중요한 결정을 내릴 때 가장 중요한 기준은?',
    a: '논리적으로 가장 합리적인 선택인가',
    b: '관련된 모든 사람이 수용할 수 있는 선택인가',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 5, 3], bEnneagram: [2, 9, 6],
  },
  {
    id: 11, q: '갑자기 예상치 못한 일정이 생겼을 때 나는?',
    a: '기존 계획이 흐트러져 당혹스럽다',
    b: '오히려 새로운 흐름에 유연하게 올라탄다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 6, 3], bEnneagram: [7, 8, 4],
  },
  {
    id: 12, q: '누군가의 이야기를 들을 때 나는?',
    a: '사실과 구체적 상황에 집중하며 듣는다',
    b: '그 이면의 감정이나 숨겨진 의미를 먼저 파악한다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [5, 6, 1], bEnneagram: [4, 2, 9],
  },
  {
    id: 13, q: '아이디어가 가장 잘 나오는 상황은?',
    a: '여러 사람과 대화하면서 자극받을 때',
    b: '혼자 조용히 생각에 잠겨있을 때',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [7, 3, 2], bEnneagram: [5, 4, 9],
  },
  {
    id: 14, q: '책상이나 작업 공간이 어수선할 때',
    a: '일하기 전에 먼저 정리해야 집중이 된다',
    b: '일하다 보면 자연스럽게 정리된다, 크게 신경 안 쓴다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 5, 6], bEnneagram: [7, 4, 8],
  },
  {
    id: 15, q: '5년 후 나의 미래를 생각할 때 더 자주 드는 생각은?',
    a: '그때쯤 어떤 직책·수입·성과를 갖고 싶다',
    b: '어떤 사람이 되어 있을지, 어떤 삶의 의미를 갖고 살지',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [3, 1, 6], bEnneagram: [4, 9, 2],
  },
  {
    id: 16, q: '오랜 혼자만의 시간 이후 나는?',
    a: '뭔가 놓친 것 같아 사람들을 만나고 싶어진다',
    b: '더 오래 혼자 있어도 괜찮을 것 같다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [2, 7, 3], bEnneagram: [5, 4, 9],
  },
  {
    id: 17, q: '누군가 나에 대해 틀린 소문을 퍼뜨리고 있다면?',
    a: '사실과 다르다는 것을 직접 명확하게 바로잡는다',
    b: '주변에 상황을 알리고 공감을 먼저 구한다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 8, 3], bEnneagram: [2, 6, 9],
  },
  {
    id: 18, q: '드라마나 책을 볼 때 나는?',
    a: '결말을 먼저 확인하고 싶어서 검색하는 편이다',
    b: '스포일러를 철저히 피하고 흐름 그대로 즐긴다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [3, 6, 1], bEnneagram: [4, 7, 9],
  },
  {
    id: 19, q: '지도 없이 새로운 동네를 걸을 때',
    a: '길을 잃지 않도록 방향 감각을 유지하며 걷는다',
    b: '어디로 가는지 몰라도 골목 탐험 자체가 즐겁다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [1, 6, 8], bEnneagram: [4, 7, 5],
  },
  {
    id: 20, q: '긴 회의가 끝난 직후 나의 상태는?',
    a: '활발한 토론으로 에너지가 충전된 느낌이다',
    b: '많은 자극이 있어 혼자 조용히 쉬고 싶다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [3, 7, 8], bEnneagram: [5, 4, 9],
  },
  {
    id: 21, q: '"강한 사람"이란 어떤 사람인가?',
    a: '어떤 상황에서도 감정에 흔들리지 않는 사람',
    b: '상처받으면서도 사람을 계속 사랑할 수 있는 사람',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [8, 1, 5], bEnneagram: [2, 4, 9],
  },
  {
    id: 22, q: '여행에서 가장 기억에 남는 순간은?',
    a: '계획한 대로 완벽하게 이루어졌을 때',
    b: '예상치 못한 우연이 만든 특별한 경험',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 3, 6], bEnneagram: [7, 4, 8],
  },
  {
    id: 23, q: '어떤 사람의 이야기를 들을 때 먼저 눈에 띄는 것은?',
    a: '그 사람이 한 행동과 실제로 일어난 사실들',
    b: '그 사람이 미처 말하지 못한 감정이나 내면',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [5, 6, 1], bEnneagram: [4, 2, 9],
  },
  {
    id: 24, q: '나를 가장 잘 나타내는 한 문장은?',
    a: '나는 목표를 정하고, 그것을 반드시 이뤄낸다',
    b: '나는 내가 느끼는 것을 소중히 여기며 산다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [3, 1, 8], bEnneagram: [4, 2, 9],
  },
];

const MBTI_LABELS: Record<string, string> = {
  INTJ: '전략가', INTP: '논리술사', ENTJ: '통솔자', ENTP: '변론가',
  INFJ: '옹호자', INFP: '중재자', ENFJ: '선도자', ENFP: '활동가',
  ISTJ: '현실주의자', ISFJ: '수호자', ESTJ: '경영자', ESFJ: '집정관',
  ISTP: '장인', ISFP: '모험가', ESTP: '사업가', ESFP: '연예인',
};

const ENNEA_INFO: Record<EnneaType, { symbol: string; name: string; core: string }> = {
  1: { symbol: '⚖️', name: '개혁가', core: '옳고 그름을 중요하게 여기는 원칙주의자' },
  2: { symbol: '💝', name: '조력가', core: '사랑을 주고 받으며 살아가는 헌신형' },
  3: { symbol: '🏆', name: '성취자', core: '성공과 인정을 향해 달려가는 추진형' },
  4: { symbol: '🎨', name: '개인주의자', core: '자신만의 감성과 정체성을 추구하는 독창형' },
  5: { symbol: '🔍', name: '탐구자', core: '지식과 이해를 통해 세상을 파악하는 분석형' },
  6: { symbol: '🛡️', name: '충성가', core: '신뢰와 안전을 중시하는 헌신적인 동반자형' },
  7: { symbol: '🌈', name: '열정가', core: '새로운 경험과 자유를 갈망하는 탐험형' },
  8: { symbol: '⚡', name: '도전자', core: '강한 의지와 결단력으로 세상에 맞서는 리더형' },
  9: { symbol: '☯️', name: '평화주의자', core: '모두를 포용하며 조화를 이끄는 중재형' },
};

type Phase = 'intro' | 'test' | 'result';

const EnneagramTest = (): ReactElement => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [mbtiScores, setMbtiScores] = useState<Record<Dim, number>>({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const [ennScores, setEnnScores] = useState<Record<EnneaType, number>>({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
  const [mbtiResult, setMbtiResult] = useState('');
  const [ennResult, setEnnResult] = useState<EnneaType | null>(null);
  const [selected, setSelected] = useState<'A'|'B'|null>(null);

  const calcMbti = (scores: Record<Dim, number>): string => {
    const dimCounts: Record<Dim, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    QUESTIONS.forEach((q) => { dimCounts[q.mbti.dim]++; });
    const e = scores.EI >= dimCounts.EI / 2 ? 'E' : 'I';
    const s = scores.SN >= dimCounts.SN / 2 ? 'S' : 'N';
    const t = scores.TF >= dimCounts.TF / 2 ? 'T' : 'F';
    const j = scores.JP >= dimCounts.JP / 2 ? 'J' : 'P';
    return `${e}${s}${t}${j}`;
  };

  const calcEnn = (scores: Record<EnneaType, number>): EnneaType => {
    let best: EnneaType = 1;
    (Object.keys(scores) as unknown as EnneaType[]).forEach((k) => {
      const key = Number(k) as EnneaType;
      if (scores[key] > scores[best]) best = key;
    });
    return best;
  };

  const handleAnswer = (choice: 'A' | 'B') => {
    setSelected(choice);
    setTimeout(() => {
      const q = QUESTIONS[current];
      const newMbti = { ...mbtiScores };
      if ((choice === 'A' && q.mbti.aIsFirst) || (choice === 'B' && !q.mbti.aIsFirst)) {
        newMbti[q.mbti.dim]++;
      }
      const newEnn = { ...ennScores };
      const types = choice === 'A' ? q.aEnneagram : q.bEnneagram;
      types.forEach((t) => { newEnn[t] += 2; });

      setMbtiScores(newMbti);
      setEnnScores(newEnn);
      setSelected(null);

      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        setMbtiResult(calcMbti(newMbti));
        setEnnResult(calcEnn(newEnn));
        setPhase('result');
      }
    }, 280);
  };

  const reset = () => {
    setPhase('intro');
    setCurrent(0);
    setMbtiScores({ EI: 0, SN: 0, TF: 0, JP: 0 });
    setEnnScores({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
    setMbtiResult('');
    setEnnResult(null);
    setSelected(null);
  };

  const progress = phase === 'test' ? Math.round(((current) / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[current];
  const ennInfo = ennResult ? ENNEA_INFO[ennResult] : null;

  const cardStyle = (choice: 'A'|'B'): React.CSSProperties => ({
    display: 'flex', alignItems: 'flex-start', gap: '14px',
    padding: '18px 20px',
    background: selected === choice ? 'var(--bg-medium-gray)' : 'var(--bg-white)',
    border: `2px solid ${selected === choice ? 'var(--gold)' : 'var(--line)'}`,
    borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
    fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500,
    lineHeight: 1.5, transition: 'all 0.15s', fontFamily: 'inherit', width: '100%',
    opacity: selected && selected !== choice ? 0.4 : 1,
  });

  return (
    <>
      <SEOHead title="통합 성격 테스트 | Suyoung's Secret" description="MBTI와 에니어그램을 한 번에 측정하는 24문항 통합 성격 테스트" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">MBTI · 에니어그램 · 통합 테스트</div>
          <h2>통합 성격 테스트</h2>
          <p>24문항으로 MBTI와 에니어그램을 동시에 알아보세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '660px', margin: '0 auto' }}>

          {phase === 'intro' && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>🧬</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                나는 어떤 사람인가?
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                24개의 유니크한 질문을 통해<br />
                <strong style={{ color: 'var(--gold)' }}>MBTI 4글자</strong>와 <strong style={{ color: 'var(--gold)' }}>에니어그램 유형</strong>을<br />
                동시에 측정합니다. 정답은 없습니다.<br />
                가장 솔직한 반응이 가장 정확한 결과입니다.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                {(['MBTI 16가지 유형', '에니어그램 9가지 유형', '24문항', '약 5분'] as const).map((badge) => (
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
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                  {q.q}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(['A', 'B'] as const).map((choice) => (
                  <button key={choice} onClick={() => !selected && handleAnswer(choice)} style={cardStyle(choice)}
                    disabled={!!selected}>
                    <span style={{
                      minWidth: '28px', height: '28px', borderRadius: '50%',
                      background: selected === choice ? 'var(--gold)' : 'var(--bg-medium-gray)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '12px',
                      color: selected === choice ? 'var(--bg-white)' : 'var(--text-secondary)',
                      flexShrink: 0, transition: 'all 0.15s',
                    }}>{choice}</span>
                    {choice === 'A' ? q.a : q.b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'result' && ennInfo && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '24px' }}>
                  나의 통합 성격 유형
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    padding: '28px 20px', background: 'var(--bg-white)',
                    border: '2px solid var(--gold)', borderRadius: '16px',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>MBTI</div>
                    <div style={{ fontSize: '40px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '8px' }}>{mbtiResult}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>{MBTI_LABELS[mbtiResult] || ''}</div>
                  </div>
                  <div style={{
                    padding: '28px 20px', background: 'var(--bg-white)',
                    border: '2px solid var(--gold)', borderRadius: '16px',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>에니어그램</div>
                    <div style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px' }}>{ennInfo.symbol}</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>유형 {ennResult}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{ennInfo.name}</div>
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
                  {ennInfo.core}
                </p>
              </div>

              <div style={{
                padding: '20px 24px', background: 'var(--bg-medium-gray)',
                border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '28px',
                fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7,
              }}>
                💡 <strong style={{ color: 'var(--text-primary)' }}>MBTI+에니어그램 조합 분석</strong>에서 두 유형이 만날 때 어떤 독특한 성격이 나타나는지 자세히 확인해보세요.
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={reset}>다시 테스트</button>
                <Link className="btn btn-outline" to="/mbti/enneagram">
                  {mbtiResult}+에니어그램{ennResult} 조합 보기
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default EnneagramTest;
