import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const COMPAT = [
  { pair: 'INFJ × ENTP', level: 5, desc: '깊은 통찰과 창의적 아이디어의 만남. 서로를 가장 잘 이해하는 소울메이트.' },
  { pair: 'INTJ × ENFP', level: 5, desc: '전략과 열정의 조화. 서로의 부족한 면을 완벽하게 보완합니다.' },
  { pair: 'INFP × ENTJ', level: 4, desc: '이상과 현실의 균형. 갈등도 있지만 서로에게 큰 자극을 줍니다.' },
  { pair: 'ISFJ × ESTP', level: 4, desc: '안정과 모험의 결합. 서로 다른 매력으로 끌리는 관계.' },
  { pair: 'ENFJ × INFP', level: 5, desc: '따뜻한 이상주의자들의 만남. 감정적으로 깊이 연결됩니다.' },
  { pair: 'ESTJ × ISFP', level: 3, desc: '원칙과 자유의 충돌. 서로 존중하는 방법을 배워가는 관계.' },
  { pair: 'ISTJ × ESFP', level: 3, desc: '책임감과 즉흥성의 대조. 다름을 인정하면 균형 있는 관계 가능.' },
  { pair: 'INTP × ENFJ', level: 5, desc: '논리와 공감의 만남. 서로의 세계를 넓혀주는 특별한 조합.' },
];

const Stars = ({ level }: { level: number }) => (
  <span style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
    {[1,2,3,4,5].map((n) => (
      <span key={n} style={{ width: '8px', height: '8px', borderRadius: '50%', background: n <= level ? 'var(--gold)' : 'var(--line)', display: 'inline-block' }} />
    ))}
  </span>
);

const MbtiCompatibility = (): ReactElement => (
  <>
    <SEOHead title="MBTI 궁합 | 운세 플랫폼" description="MBTI 유형별 궁합 분석" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">MBTI Match · MBTI 궁합</div>
        <h2>MBTI 궁합</h2>
        <p>성격 유형으로 알아보는 관계 궁합</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', padding: '10px 16px', borderRadius: '0 8px 8px 0', marginBottom: '12px', fontSize: '13px', lineHeight: 1.6 }}>
          MBTI 궁합은 절대적이지 않습니다. 어떤 유형이든 <strong>이해와 배려</strong>가 있다면 좋은 관계를 유지할 수 있습니다.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {COMPAT.map((c, i) => (
            <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '14px' }}>{c.pair}</span>
                <span style={{ marginLeft: 'auto' }}><Stars level={c.level} /></span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default MbtiCompatibility;
