import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type Dim = 'EI' | 'SN' | 'TF' | 'JP';

interface Question {
  id: number;
  dim: Dim;
  q: string;
  a: string;
  b: string;
}

const QUESTIONS: Question[] = [
  // E/I
  { id: 1,  dim: 'EI', q: '파티나 모임에 참석했을 때', a: '새로운 사람들과 대화하며 에너지가 충전된다', b: '어느 정도 시간이 지나면 혼자만의 시간이 필요해진다' },
  { id: 2,  dim: 'EI', q: '생각을 정리할 때', a: '다른 사람과 이야기하면서 정리한다', b: '혼자 조용히 생각을 정리한다' },
  { id: 3,  dim: 'EI', q: '친구 관계 스타일은', a: '여러 사람과 폭넓게 어울린다', b: '소수와 깊이 있는 관계를 유지한다' },
  { id: 4,  dim: 'EI', q: '쉬는 날 에너지를 채우는 방법은', a: '친구들과 밖에 나가는 것이 좋다', b: '집에서 조용히 쉬는 것이 좋다' },
  { id: 5,  dim: 'EI', q: '새 프로젝트를 시작할 때', a: '팀원들과 바로 아이디어를 공유한다', b: '혼자 충분히 생각한 후에 공유한다' },
  { id: 6,  dim: 'EI', q: '모르는 사람을 처음 만났을 때', a: '먼저 말을 건네는 편이다', b: '상대방이 먼저 말 걸기를 기다린다' },
  // S/N
  { id: 7,  dim: 'SN', q: '새로운 아이디어를 접했을 때', a: '현실적인 실현 가능성을 먼저 따진다', b: '새로운 가능성과 의미에 먼저 흥미를 느낀다' },
  { id: 8,  dim: 'SN', q: '문제를 해결할 때', a: '이미 검증된 방법을 활용한다', b: '새로운 접근법을 시도해본다' },
  { id: 9,  dim: 'SN', q: '자연스럽게 주목하는 것은', a: '구체적인 사실과 세부 사항', b: '전체적인 패턴과 연결 고리' },
  { id: 10, dim: 'SN', q: '미래 계획을 세울 때', a: '현실적이고 구체적인 단계로 계획한다', b: '큰 그림과 비전을 먼저 그린다' },
  { id: 11, dim: 'SN', q: '글이나 영화를 접할 때', a: '사실과 구체적인 정보에 집중한다', b: '숨겨진 의미와 상징에 집중한다' },
  { id: 12, dim: 'SN', q: '결정할 때 주로 의존하는 것은', a: '과거 경험과 검증된 사례', b: '직관과 영감' },
  // T/F
  { id: 13, dim: 'TF', q: '갈등 상황에서', a: '논리적으로 분석하고 해결책을 찾는다', b: '감정을 먼저 살피고 공감한다' },
  { id: 14, dim: 'TF', q: '상대방에게 피드백을 줄 때', a: '정확하고 직접적으로 말한다', b: '상대방 감정을 고려해 부드럽게 말한다' },
  { id: 15, dim: 'TF', q: '중요한 결정의 기준은', a: '논리와 원칙', b: '가치관과 감정' },
  { id: 16, dim: 'TF', q: '어려움을 겪는 친구에게', a: '실질적인 해결책을 제시한다', b: '공감하고 감정을 들어준다' },
  { id: 17, dim: 'TF', q: '논쟁할 때 중요시하는 것은', a: '논리적인 근거', b: '서로의 감정과 관계' },
  { id: 18, dim: 'TF', q: '더 가치 있다고 생각하는 것은', a: '정확한 평가와 피드백', b: '상대방의 기분을 좋게 만드는 말' },
  // J/P
  { id: 19, dim: 'JP', q: '여행을 계획할 때', a: '세부 일정을 미리 짜놓는다', b: '즉흥적으로 결정한다' },
  { id: 20, dim: 'JP', q: '마감 기한에 대한 나의 태도는', a: '여유 있게 미리 끝내는 편이다', b: '마감 직전 집중력이 가장 높아진다' },
  { id: 21, dim: 'JP', q: '일상 생활에서 선호하는 것은', a: '정해진 루틴을 따르는 것', b: '매일 다른 변화와 다양성' },
  { id: 22, dim: 'JP', q: '결정을 내릴 때', a: '빨리 결정하고 실행에 옮긴다', b: '충분히 고민하며 유연하게 바꾼다' },
  { id: 23, dim: 'JP', q: '공간을 사용할 때', a: '항상 깔끔하게 정리된 상태를 유지한다', b: '여러 가지를 펼쳐놓고 작업하는 것이 편하다' },
  { id: 24, dim: 'JP', q: '약속이나 규칙에 대해', a: '지키는 것이 매우 중요하다', b: '상황에 따라 유연하게 바꿀 수 있다' },
];

interface MbtiInfo {
  name: string;
  title: string;
  desc: string;
  traits: string[];
}

const MBTI_INFO: Record<string, MbtiInfo> = {
  ISTJ: { name: 'ISTJ', title: '청렴결백한 논리주의자', desc: '신중하고 원칙적이며 책임감이 강합니다. 철저한 계획과 꾸준한 실행으로 목표를 달성합니다.', traits: ['책임감', '신중함', '조직력', '꼼꼼함'] },
  ISFJ: { name: 'ISFJ', title: '용감한 수호자', desc: '따뜻하고 헌신적이며 주변 사람을 잘 돌봅니다. 실용적이고 세심한 배려로 신뢰를 얻습니다.', traits: ['헌신적', '배려심', '꼼꼼함', '충성심'] },
  INFJ: { name: 'INFJ', title: '선의의 옹호자', desc: '통찰력이 뛰어나고 이상적이며 깊은 공감 능력을 가집니다. 의미 있는 목적을 위해 헌신합니다.', traits: ['통찰력', '공감능력', '이상주의', '결단력'] },
  INTJ: { name: 'INTJ', title: '용의주도한 전략가', desc: '독창적이고 전략적 사고를 지닌 완벽주의자입니다. 높은 목표를 향해 체계적으로 나아갑니다.', traits: ['전략적', '독창적', '결단력', '완벽주의'] },
  ISTP: { name: 'ISTP', title: '만능 재주꾼', desc: '대담하고 현실적이며 실용적 문제 해결 능력이 뛰어납니다. 차분하게 상황을 분석합니다.', traits: ['실용적', '분석적', '논리적', '차분함'] },
  ISFP: { name: 'ISFP', title: '호기심 많은 예술가', desc: '유연하고 온화하며 현재를 즐깁니다. 아름다움을 추구하고 자신만의 방식을 소중히 여깁니다.', traits: ['예술적', '온화함', '유연성', '공감능력'] },
  INFP: { name: 'INFP', title: '열정적인 중재자', desc: '이상적이고 감수성이 풍부하며 진정성을 추구합니다. 자신의 가치관에 따라 행동합니다.', traits: ['이상주의', '감수성', '창의력', '공감능력'] },
  INTP: { name: 'INTP', title: '논리적인 사색가', desc: '혁신적이고 분석적인 사고를 즐깁니다. 복잡한 문제를 논리적으로 풀어나가는 것을 좋아합니다.', traits: ['분석적', '논리적', '혁신적', '독립적'] },
  ESTP: { name: 'ESTP', title: '모험을 즐기는 사업가', desc: '활동적이고 영리하며 즉흥적입니다. 현실적 문제를 빠르게 파악하고 행동으로 옮깁니다.', traits: ['행동력', '현실적', '유연성', '카리스마'] },
  ESFP: { name: 'ESFP', title: '자유로운 영혼의 연예인', desc: '자발적이고 열정적이며 사교적입니다. 현재를 즐기고 주변을 밝게 만드는 능력이 있습니다.', traits: ['사교적', '활발함', '자발적', '낙관적'] },
  ENFP: { name: 'ENFP', title: '재기발랄한 활동가', desc: '창의적이고 열정적이며 사람들에게 영감을 줍니다. 가능성을 보고 새로운 아이디어를 즐깁니다.', traits: ['창의적', '열정적', '사교적', '영감 제공'] },
  ENTP: { name: 'ENTP', title: '뜨거운 논쟁을 즐기는 변론가', desc: '영리하고 호기심이 많으며 논쟁을 즐깁니다. 틀에 얽매이지 않는 자유로운 사고를 합니다.', traits: ['영리함', '호기심', '논쟁적', '혁신적'] },
  ESTJ: { name: 'ESTJ', title: '엄격한 관리자', desc: '현실적이고 효율적이며 조직력이 탁월합니다. 규칙과 질서를 중시하고 책임감이 강합니다.', traits: ['조직력', '현실적', '책임감', '효율적'] },
  ESFJ: { name: 'ESFJ', title: '사교적인 외교관', desc: '친절하고 배려심이 넘치며 사람들과의 조화를 중시합니다. 헌신적으로 주변을 돌봅니다.', traits: ['친절함', '배려심', '사교적', '헌신적'] },
  ENFJ: { name: 'ENFJ', title: '정의로운 사회운동가', desc: '카리스마 있고 영감을 주며 타인의 잠재력을 이끌어냅니다. 이상을 향해 사람들과 함께 나아갑니다.', traits: ['카리스마', '공감능력', '리더십', '이상주의'] },
  ENTJ: { name: 'ENTJ', title: '대담한 통솔자', desc: '담대하고 창의적이며 강한 리더십을 발휘합니다. 목표를 향해 전략적으로 팀을 이끕니다.', traits: ['리더십', '전략적', '결단력', '효율적'] },
};

type Phase = 'intro' | 'test' | 'result';

const MbtiTest = (): ReactElement => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<('A' | 'B')[]>([]);
  const [result, setResult] = useState<string>('');

  const calcResult = (ans: ('A' | 'B')[]): string => {
    const scores: Record<Dim, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    QUESTIONS.forEach((q, i) => {
      if (ans[i] === 'A') scores[q.dim]++;
    });
    const e = scores.EI >= 3 ? 'E' : 'I';
    const s = scores.SN >= 3 ? 'S' : 'N';
    const t = scores.TF >= 3 ? 'T' : 'F';
    const j = scores.JP >= 3 ? 'J' : 'P';
    return `${e}${s}${t}${j}`;
  };

  const handleAnswer = (choice: 'A' | 'B') => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      const mbti = calcResult(newAnswers);
      setResult(mbti);
      setPhase('result');
    }
  };

  const reset = () => {
    setPhase('intro');
    setCurrent(0);
    setAnswers([]);
    setResult('');
  };

  const progress = phase === 'test' ? Math.round((current / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[current];
  const info = MBTI_INFO[result];

  return (
    <>
      <SEOHead title="MBTI 테스트 | Suyoung's Secret" description="24문항으로 알아보는 나의 MBTI 성격 유형 테스트" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">MBTI · 성격 유형 테스트</div>
          <h2>MBTI 테스트</h2>
          <p>24문항으로 알아보는 나의 성격 유형</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '640px', margin: '0 auto' }}>

          {/* Intro */}
          {phase === 'intro' && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🧠</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy-800)', marginBottom: '16px' }}>
                나의 MBTI 유형은?
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                E/I · S/N · T/F · J/P 4가지 축, 총 24문항으로<br />
                당신의 MBTI 성격 유형을 알아봅니다.<br />
                각 질문에 직관적으로 답해주세요.
              </p>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                {(['E/I', 'S/N', 'T/F', 'J/P'] as const).map((axis) => (
                  <div key={axis} style={{
                    padding: '12px 20px', background: 'var(--navy-50)',
                    borderRadius: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)',
                  }}>
                    {axis}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>{current + 1} / {QUESTIONS.length}</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gold)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
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
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  Q{String(current + 1).padStart(2, '0')} &nbsp;·&nbsp; {q.dim === 'EI' ? '에너지 방향' : q.dim === 'SN' ? '정보 수집' : q.dim === 'TF' ? '판단 기준' : '생활 방식'}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-800)', lineHeight: 1.4, marginBottom: '0' }}>
                  {q.q}
                </h3>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(['A', 'B'] as const).map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handleAnswer(choice)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '20px 24px',
                      background: 'var(--bg-white)',
                      border: '2px solid var(--line)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '15px',
                      color: 'var(--navy-800)',
                      fontWeight: 500,
                      lineHeight: 1.5,
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
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'var(--navy-50)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontWeight: 800, fontSize: '13px',
                      color: 'var(--gold)', flexShrink: 0,
                    }}>{choice}</span>
                    {choice === 'A' ? q.a : q.b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {phase === 'result' && info && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '12px' }}>
                  나의 MBTI 유형
                </div>
                <div style={{
                  fontSize: '72px', fontWeight: 900, color: 'var(--navy-800)',
                  lineHeight: 1, marginBottom: '8px', letterSpacing: '-2px',
                }}>
                  {result}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gold)' }}>{info.title}</div>
              </div>

              <div style={{
                padding: '28px 32px',
                background: 'var(--bg-white)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                marginBottom: '24px',
                textAlign: 'left',
              }}>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px', margin: '0 0 20px' }}>
                  {info.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {info.traits.map((t) => (
                    <span key={t} style={{
                      padding: '6px 14px',
                      background: 'var(--navy-50)',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--navy-800)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Score breakdown */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
                marginBottom: '32px',
              }}>
                {(['EI', 'SN', 'TF', 'JP'] as const).map((dim) => {
                  const count = QUESTIONS.filter(item => item.dim === dim).reduce((acc, item) => {
                    const qi = QUESTIONS.findIndex(x => x.id === item.id);
                    return acc + (answers[qi] === 'A' ? 1 : 0);
                  }, 0);
                  const total = 6;
                  const letter = dim === 'EI' ? (count >= 3 ? 'E' : 'I') : dim === 'SN' ? (count >= 3 ? 'S' : 'N') : dim === 'TF' ? (count >= 3 ? 'T' : 'F') : (count >= 3 ? 'J' : 'P');
                  const pct = Math.round((count >= 3 ? count : total - count) / total * 100);
                  return (
                    <div key={dim} style={{
                      padding: '14px 12px',
                      background: 'var(--bg-white)',
                      border: '1px solid var(--line)',
                      borderRadius: '10px',
                    }}>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--navy-800)' }}>{letter}</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gold)' }}>{pct}%</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{dim}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={reset}>다시 테스트하기</button>
                <Link className="btn btn-ghost" to="/mbti">MBTI 유형 보기</Link>
                <Link className="btn btn-ghost" to="/mbti/compatibility">MBTI 궁합 보기</Link>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default MbtiTest;
