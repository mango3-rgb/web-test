import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const COMPATIBILITY = [
  { pair: '子·申·辰', element: '水·金', desc: '삼합(三合) — 水局. 깊은 유대감과 상호 지원. 매우 좋은 궁합.', level: 5 },
  { pair: '寅·午·戌', element: '木·火', desc: '삼합(三合) — 火局. 열정적이고 역동적인 관계. 매우 좋은 궁합.', level: 5 },
  { pair: '巳·酉·丑', element: '火·金', desc: '삼합(三合) — 金局. 현실적이고 안정적인 관계. 매우 좋은 궁합.', level: 5 },
  { pair: '亥·卯·未', element: '水·木', desc: '삼합(三合) — 木局. 창의적이고 성장하는 관계. 매우 좋은 궁합.', level: 5 },
  { pair: '子·午', element: '水·火', desc: '충(沖) — 서로를 자극하며 갈등이 생기기 쉬움. 노력이 필요합니다.', level: 2 },
  { pair: '卯·酉', element: '木·金', desc: '충(沖) — 의견 충돌이 잦을 수 있음. 서로의 배려가 중요합니다.', level: 2 },
  { pair: '辰·戌', element: '土·土', desc: '충(沖) — 같은 土이지만 방향이 달라 갈등 발생. 대화가 필요합니다.', level: 2 },
  { pair: '丑·未', element: '土·土', desc: '충(沖) — 인내심이 강한 두 기운의 충돌. 존중하며 보완할 수 있습니다.', level: 3 },
];

const Stars = ({ level }: { level: number }) => (
  <span style={{ display: 'flex', gap: '3px' }}>
    {[1,2,3,4,5].map((n) => (
      <span key={n} style={{ width: '10px', height: '10px', borderRadius: '50%', background: n <= level ? 'var(--gold)' : 'var(--line)', display: 'inline-block' }} />
    ))}
  </span>
);

const SajuCompatibility = (): ReactElement => (
  <>
    <SEOHead title="사주 궁합 | 운세 플랫폼" description="음양오행으로 보는 사주 궁합 안내" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Compatibility · 궁합</div>
        <h2>사주 궁합</h2>
        <p>음양오행(陰陽五行)으로 보는 궁합의 원리</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', padding: '28px 32px', borderRadius: '0 12px 12px 0', marginBottom: '48px', lineHeight: 1.8 }}>
          <strong style={{ fontSize: '16px', color: 'var(--navy-800)', display: 'block', marginBottom: '10px' }}>사주 궁합의 원리</strong>
          사주 궁합은 두 사람의 오행(五行)이 서로 생(生)하고 극(剋)하는 관계를 살펴봅니다.
          목생화·화생토·토생금·금생수·수생목의 <strong>상생(相生)</strong> 관계는 좋은 궁합을,
          목극토·토극수·수극화·화극금·금극목의 <strong>상극(相剋)</strong> 관계는 갈등을 나타냅니다.
        </div>
        <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>삼합(三合) · 충(沖) 궁합</h3>
        <div style={{ display: 'grid', gap: '14px' }}>
          {COMPATIBILITY.map((c) => (
            <div key={c.pair} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '20px', padding: '20px 24px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gold)' }}>{c.pair}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{c.element}</div>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>{c.desc}</p>
              <Stars level={c.level} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default SajuCompatibility;
