import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const COMPAT = [
  { a: '불 (♈♌♐)', b: '바람 (♊♎♒)', level: 5, desc: '불은 바람을 만나 더욱 활활 타오릅니다. 서로의 열정과 아이디어를 증폭시켜 주는 최고의 조합.' },
  { a: '흙 (♉♍♑)', b: '물 (♋♏♓)', level: 5, desc: '흙은 물로 촉촉하게 가꿔집니다. 안정과 감성이 조화를 이루어 깊은 유대를 형성합니다.' },
  { a: '불 (♈♌♐)', b: '불 (♈♌♐)', level: 4, desc: '같은 원소끼리 열정과 에너지가 넘칩니다. 경쟁과 성장이 공존하는 역동적인 관계.' },
  { a: '흙 (♉♍♑)', b: '흙 (♉♍♑)', level: 4, desc: '현실적이고 안정적인 기반 위에 구축되는 관계. 실용적이고 믿음직한 파트너십.' },
  { a: '바람 (♊♎♒)', b: '바람 (♊♎♒)', level: 4, desc: '소통과 아이디어가 풍부한 관계. 지적인 자극이 끊이지 않는 활발한 조합.' },
  { a: '물 (♋♏♓)', b: '물 (♋♏♓)', level: 4, desc: '깊은 감정적 유대와 공감 능력이 빛납니다. 서로의 내면을 깊이 이해하는 관계.' },
  { a: '불 (♈♌♐)', b: '물 (♋♏♓)', level: 2, desc: '불과 물은 서로를 약화시킵니다. 충돌과 오해가 생기기 쉬우나 서로 배울 점이 많습니다.' },
  { a: '흙 (♉♍♑)', b: '바람 (♊♎♒)', level: 2, desc: '현실과 이상의 충돌. 실용성과 자유 사이에서 갈등이 발생할 수 있습니다.' },
];

const Stars = ({ level }: { level: number }) => (
  <span style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
    {[1,2,3,4,5].map((n) => (
      <span key={n} style={{ width: '10px', height: '10px', borderRadius: '50%', background: n <= level ? 'var(--gold)' : 'var(--line)', display: 'inline-block' }} />
    ))}
  </span>
);

const HoroscopeCompatibility = (): ReactElement => (
  <>
    <SEOHead title="별자리 궁합 | 운세 플랫폼" description="4가지 원소별 별자리 궁합 안내" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Star Match · 별자리 궁합</div>
        <h2>별자리 궁합</h2>
        <p>4원소(불·흙·바람·물)로 보는 궁합</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ display: 'grid', gap: '14px' }}>
          {COMPAT.map((c, i) => (
            <div key={i} style={{ padding: '24px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--navy-800)', fontSize: '15px' }}>{c.a}</span>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>×</span>
                <span style={{ fontWeight: 700, color: 'var(--navy-800)', fontSize: '15px' }}>{c.b}</span>
                <span style={{ marginLeft: 'auto' }}><Stars level={c.level} /></span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default HoroscopeCompatibility;
