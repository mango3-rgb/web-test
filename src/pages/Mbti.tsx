import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const AXES = [
  { label: 'E / I', desc: '에너지 방향\n외향 / 내향' },
  { label: 'S / N', desc: '정보 수집\n감각 / 직관' },
  { label: 'T / F', desc: '판단 기준\n사고 / 감정' },
  { label: 'J / P', desc: '생활 방식\n판단 / 인식' },
];

const TYPES = [
  { type: 'INTJ', nick: '전략가', desc: '전략적이고 독립적인 사상가.' },
  { type: 'INTP', nick: '논리학자', desc: '혁신적인 발명가, 지식 탐구를 즐깁니다.' },
  { type: 'ENTJ', nick: '통솔자', desc: '대담하고 상상력 풍부한 리더.' },
  { type: 'ENTP', nick: '변론가', desc: '논쟁을 즐기는 영리한 사상가.' },
  { type: 'INFJ', nick: '옹호자', desc: '고요하고 신비로운 이상주의자.' },
  { type: 'INFP', nick: '중재자', desc: '시적이고 친절한 이타주의자.' },
  { type: 'ENFJ', nick: '선도자', desc: '카리스마 있는 영감을 주는 리더.' },
  { type: 'ENFP', nick: '활동가', desc: '자유로운 영혼, 창의적이고 사교적.' },
  { type: 'ISTJ', nick: '현실주의자', desc: '사실 기반의 신뢰할 수 있는 사람.' },
  { type: 'ISFJ', nick: '수호자', desc: '헌신적이고 따뜻한 보호자.' },
  { type: 'ESTJ', nick: '경영자', desc: '원칙을 중시하는 탁월한 관리자.' },
  { type: 'ESFJ', nick: '집정관', desc: '배려심 깊고 사교적인 조화로운 사람.' },
  { type: 'ISTP', nick: '장인', desc: '대담하고 실용적인 실험정신.' },
  { type: 'ISFP', nick: '모험가', desc: '유연하고 매력적인 예술가.' },
  { type: 'ESTP', nick: '사업가', desc: '영리하고 에너지 넘치는 행동파.' },
  { type: 'ESFP', nick: '연예인', desc: '즉흥적이고 에너지 넘치는 퍼포머.' },
];

const Mbti = (): ReactElement => (
  <>
    <SEOHead title="MBTI 16가지 유형 | Suyoung's Secret" description="MBTI 16가지 성격 유형과 특성을 알아보세요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">MBTI · 성격 유형</div>
        <h2>MBTI 16가지 유형</h2>
        <p>나의 성격 유형을 알고 더 깊이 이해하기</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
          {AXES.map((a) => (
            <div key={a.label} style={{ padding: '14px 12px', background: 'var(--navy-50)', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gold)', marginBottom: '4px' }}>{a.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{a.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', marginBottom: '14px' }}>
          {TYPES.map((t) => (
            <div key={t.type} style={{ padding: '12px 14px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '10px' }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--gold)', marginBottom: '1px' }}>{t.type}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '4px' }}>({t.nick})</div>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/mbti/compatibility" className="btn btn-primary">MBTI 궁합 →</Link>
          <Link to="/mbti/test" className="btn btn-ghost">MBTI 테스트 →</Link>
        </div>
      </div>
    </section>
  </>
);

export default Mbti;
