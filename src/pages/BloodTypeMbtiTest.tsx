import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type BloodType = 'A' | 'B' | 'O' | 'AB';
type Dim = 'EI' | 'SN' | 'TF' | 'JP';

interface Q {
  id: number;
  q: string;
  a: string;
  b: string;
  dim: Dim;
  aIsFirst: boolean;
}

const QUESTIONS: Q[] = [
  { id:  1, q: '처음 만나는 자리에서 나는?',               a: '먼저 말을 걸고 분위기를 만든다',        b: '상대가 먼저 다가올 때까지 기다린다',     dim: 'EI', aIsFirst: true },
  { id:  2, q: '계획을 세울 때 나는?',                     a: '세세한 일정까지 미리 짜두어야 한다',     b: '큰 방향만 잡고 상황에 따라 움직인다',   dim: 'JP', aIsFirst: true },
  { id:  3, q: '친구가 고민을 털어놓을 때 나는?',          a: '해결책과 조언을 먼저 생각한다',         b: '일단 충분히 들어주는 것이 중요하다',    dim: 'TF', aIsFirst: true },
  { id:  4, q: '새로운 정보를 받아들일 때 나는?',          a: '구체적인 사실과 데이터를 중시한다',      b: '큰 그림과 가능성에 더 끌린다',         dim: 'SN', aIsFirst: true },
  { id:  5, q: '쉬는 날 에너지를 충전하는 방법은?',        a: '사람들과 어울리며 활동하는 것',          b: '혼자 조용히 시간을 보내는 것',         dim: 'EI', aIsFirst: true },
  { id:  6, q: '일이나 과제를 처리할 때 나는?',            a: '마감 전에 미리 끝내두는 편이다',         b: '마감이 다가올수록 집중력이 올라간다',   dim: 'JP', aIsFirst: true },
  { id:  7, q: '의견 충돌이 생겼을 때 나는?',             a: '논리적으로 내 입장을 명확하게 밝힌다',   b: '상대 감정을 먼저 배려하며 조율한다',   dim: 'TF', aIsFirst: true },
  { id:  8, q: '여행지를 고를 때 나는?',                  a: '가본 사람이 많고 검증된 곳이 좋다',      b: '남들이 잘 안 가는 독특한 곳에 끌린다', dim: 'SN', aIsFirst: true },
  { id:  9, q: '모임에서 오래 있으면?',                   a: '시간이 빨리 가고 더 있고 싶어진다',      b: '어느 순간부터 혼자 있고 싶어진다',     dim: 'EI', aIsFirst: true },
  { id: 10, q: '집이나 책상 정리 스타일은?',              a: '물건마다 자리가 있어야 직성이 풀린다',   b: '대충 쓸 수 있을 정도면 충분하다',      dim: 'JP', aIsFirst: true },
  { id: 11, q: '중요한 결정을 내릴 때 기준은?',           a: '객관적인 득실 분석이 우선이다',          b: '관계와 감정을 무시할 수 없다',         dim: 'TF', aIsFirst: true },
  { id: 12, q: '책이나 영화를 고를 때 나는?',             a: '현실적이고 실용적인 내용이 좋다',        b: '상상력을 자극하는 판타지·SF에 끌린다', dim: 'SN', aIsFirst: true },
];

const MBTI_LABELS: Record<string, string> = {
  INTJ: '전략가', INTP: '논리술사', ENTJ: '통솔자', ENTP: '변론가',
  INFJ: '옹호자', INFP: '중재자',  ENFJ: '선도자', ENFP: '활동가',
  ISTJ: '현실주의자', ISFJ: '수호자', ESTJ: '경영자', ESFJ: '집정관',
  ISTP: '장인',  ISFP: '모험가',  ESTP: '사업가', ESFP: '연예인',
};

const BLOOD_INFO: Record<BloodType, { symbol: string; traits: string[]; core: string }> = {
  A:  { symbol: '🅰️', traits: ['꼼꼼함', '계획적', '책임감', '완벽주의'], core: '원칙을 중시하고 세심하게 챙기는 성실형' },
  B:  { symbol: '🅱️', traits: ['자유분방', '개성강함', '직관적', '창의적'], core: '틀에 얽매이지 않고 자신만의 길을 가는 자유형' },
  O:  { symbol: '🅾️', traits: ['리더십', '대담함', '사교적', '추진력'], core: '목표를 향해 과감히 나아가는 행동파 리더형' },
  AB: { symbol: '🆎', traits: ['합리적', '독창적', '냉철함', '예측불가'], core: '상반된 면을 함께 가진 복잡미묘한 예술가형' },
};

const COMBO_DESC: Partial<Record<string, string>> = {
  'A-ISTJ': '원칙과 체계를 사랑하는 완벽한 현실주의자',
  'A-ISFJ': '헌신과 배려로 주변을 지키는 조용한 수호자',
  'A-INFJ': '깊은 통찰력으로 세상을 바꾸려는 이상주의자',
  'A-INTJ': '정밀한 계획과 전략으로 목표를 달성하는 설계자',
  'B-ENFP': '에너지 넘치고 아이디어가 폭발하는 창의적 자유인',
  'B-ENTP': '도전을 즐기고 논쟁에서 빛나는 아이디어 뱅크',
  'B-ISTP': '독립적이고 실용적인 쿨한 장인형 자유인',
  'B-INFP': '자신만의 세계에서 깊이 있는 감성을 표현하는 몽상가',
  'O-ENTJ': '카리스마와 추진력으로 조직을 이끄는 타고난 리더',
  'O-ESTJ': '규칙과 효율로 목표를 달성하는 강력한 실행가',
  'O-ENFJ': '사람의 마음을 움직이는 따뜻한 리더십의 소유자',
  'O-ESTP': '순간의 기회를 잡는 본능적인 행동파 사업가',
  'AB-INTP': '세상 모든 것에 의문을 품는 독립적인 분석가',
  'AB-INFJ': '직관과 이성 사이에서 깊이 고민하는 신비로운 예언자',
  'AB-ENTP': '예측불가한 발상으로 틀을 깨는 혁신적 실험가',
  'AB-ENFP': '무한한 상상력과 공감 능력을 가진 카멜레온형 인간',
};

type Phase = 'bloodtype' | 'test' | 'result';

const BloodTypeMbtiTest = (): ReactElement => {
  const [phase, setPhase] = useState<Phase>('bloodtype');
  const [bloodType, setBloodType] = useState<BloodType | null>(null);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Dim, number>>({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const [mbtiResult, setMbtiResult] = useState('');
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);

  const calcMbti = (s: Record<Dim, number>): string => {
    const counts: Record<Dim, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    QUESTIONS.forEach((q) => { counts[q.dim]++; });
    return [
      s.EI >= counts.EI / 2 ? 'E' : 'I',
      s.SN >= counts.SN / 2 ? 'S' : 'N',
      s.TF >= counts.TF / 2 ? 'T' : 'F',
      s.JP >= counts.JP / 2 ? 'J' : 'P',
    ].join('');
  };

  const handleAnswer = (choice: 'A' | 'B') => {
    setSelected(choice);
    setTimeout(() => {
      const q = QUESTIONS[current];
      const newScores = { ...scores };
      if ((choice === 'A' && q.aIsFirst) || (choice === 'B' && !q.aIsFirst)) {
        newScores[q.dim]++;
      }
      setScores(newScores);
      setSelected(null);
      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        setMbtiResult(calcMbti(newScores));
        setPhase('result');
      }
    }, 260);
  };

  const reset = () => {
    setPhase('bloodtype');
    setBloodType(null);
    setCurrent(0);
    setScores({ EI: 0, SN: 0, TF: 0, JP: 0 });
    setMbtiResult('');
    setSelected(null);
  };

  const progress = phase === 'test' ? Math.round((current / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[current];
  const bInfo = bloodType ? BLOOD_INFO[bloodType] : null;
  const comboKey = bloodType && mbtiResult ? `${bloodType}-${mbtiResult}` : null;
  const comboDesc = comboKey ? (COMBO_DESC[comboKey] || `${bloodType}형의 감성과 ${mbtiResult} 성격이 어우러진 독특한 조합`) : '';

  const cardStyle = (choice: 'A' | 'B'): React.CSSProperties => ({
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
      <SEOHead title="혈액형+MBTI 테스트 | Suyoung's Secret" description="혈액형과 MBTI를 함께 알아보는 성격 테스트" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">혈액형 · MBTI · 성격 분석</div>
          <h2>혈액형+MBTI 테스트</h2>
          <p>혈액형과 MBTI로 나의 성격을 더 입체적으로 알아보세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '620px', margin: '0 auto' }}>

          {phase === 'bloodtype' && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>🩸</div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                먼저 혈액형을 선택해 주세요
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.7 }}>
                혈액형을 고른 후 12문항 MBTI 테스트를 진행합니다
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                {(['A', 'B', 'O', 'AB'] as BloodType[]).map((bt) => {
                  const info = BLOOD_INFO[bt];
                  return (
                    <button
                      key={bt}
                      onClick={() => setBloodType(bt)}
                      style={{
                        padding: '24px 16px',
                        background: bloodType === bt ? 'var(--bg-medium-gray)' : 'var(--bg-white)',
                        border: `2px solid ${bloodType === bt ? 'var(--gold)' : 'var(--line)'}`,
                        borderRadius: '16px', cursor: 'pointer',
                        transition: 'all 0.15s', fontFamily: 'inherit',
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{info.symbol}</div>
                      <div style={{ fontSize: '18px', fontWeight: 900, color: bloodType === bt ? 'var(--gold)' : 'var(--text-primary)', marginBottom: '6px' }}>
                        {bt}형
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {info.traits.slice(0, 2).join(' · ')}
                      </div>
                    </button>
                  );
                })}
              </div>
              {bloodType && (
                <button
                  className="btn btn-primary"
                  onClick={() => setPhase('test')}
                  style={{ fontSize: '16px', padding: '14px 40px', marginTop: '12px' }}
                >
                  {bloodType}형으로 테스트 시작 →
                </button>
              )}
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
                  <button key={choice} onClick={() => !selected && handleAnswer(choice)}
                    style={cardStyle(choice)} disabled={!!selected}>
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

          {phase === 'result' && bInfo && (
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.15em', textAlign: 'center', marginBottom: '20px' }}>
                나의 혈액형+MBTI 유형
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '24px 16px', background: 'var(--bg-white)', border: '2px solid var(--gold)', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{bInfo.symbol}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '4px' }}>혈액형</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>{bloodType}형</div>
                </div>
                <div style={{ padding: '24px 16px', background: 'var(--bg-white)', border: '2px solid var(--gold)', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>🧠</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '4px' }}>MBTI</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>{mbtiResult}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{MBTI_LABELS[mbtiResult] || ''}</div>
                </div>
              </div>

              <div style={{ padding: '24px 28px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>조합 성격</div>
                <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
                  {comboDesc}
                </p>
              </div>

              <div style={{ padding: '20px 24px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>혈액형 핵심 성향</div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>{bInfo.core}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {bInfo.traits.map((tr) => (
                    <span key={tr} style={{
                      padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                      background: 'var(--bg-medium-gray)', color: 'var(--text-secondary)',
                      border: '1px solid var(--line)',
                    }}>{tr}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={reset}>다시 테스트</button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default BloodTypeMbtiTest;
