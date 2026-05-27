import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const SERVICES = [
  { area: '사주팔자', detail: '천간·지지·오행을 바탕으로 타고난 기질과 운명의 흐름을 풀이합니다.', icon: 'fa-yin-yang' },
  { area: '12별자리', detail: '서양 점성술의 태양 별자리로 성격과 대인관계, 연애운을 분석합니다.', icon: 'fa-star' },
  { area: 'MBTI 분석', detail: '16가지 성격 유형으로 자신을 이해하고 대인관계를 탐색합니다.', icon: 'fa-brain' },
  { area: '궁합 상담', detail: '사주·별자리·MBTI 세 가지 관점에서 종합적인 궁합을 분석합니다.', icon: 'fa-heart' },
];

const About = (): ReactElement => {
  return (
    <>
      <SEOHead title="황수영 소개 | 황수영 운세" description="황수영의 운세 플랫폼 소개 및 서비스 안내" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">About · 소개</div>
          <h2>황수영 소개</h2>
          <p>사주·별자리·MBTI 운세 플랫폼</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">
          {/* 프로필 카드 */}
          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr', gap: '36px',
            marginBottom: '48px', padding: '36px',
            background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '16px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '160px', height: '160px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--ink-surface), var(--ink-surface-hover))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', fontSize: '56px', fontWeight: 800,
              }}>
                황
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-800)' }}>황수영</div>
                <div style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, marginTop: '2px' }}>운세 플랫폼 운영자</div>
              </div>
            </div>
            <div>
              <div style={{
                background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)',
                padding: '20px 24px', borderRadius: '0 12px 12px 0',
                marginBottom: '24px', fontSize: '14px', lineHeight: 1.8,
              }}>
                사주팔자, 별자리, MBTI의 세 가지 관점에서 운명과 성격을 탐구합니다.
                동양 철학의 깊이와 현대 심리학의 통찰을 접목하여 누구나 쉽게 이해할 수 있도록 안내해드립니다.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  ['주요 분야', '사주·별자리·MBTI'],
                  ['문의', 'mango3_sy@kdn.com'],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: '8px 12px', background: 'var(--navy-50)', borderRadius: '6px', fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{k}</span>
                    <span style={{ marginLeft: '8px', color: 'var(--navy-800)', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 제공 서비스 */}
          <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '20px' }}>제공 서비스</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '48px' }}>
            {SERVICES.map((e) => (
              <div key={e.area} style={{
                display: 'flex', gap: '16px', padding: '20px',
                background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: 'var(--radius)',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px', background: 'var(--navy-50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <i className={`fa-solid ${e.icon}`} style={{ color: 'var(--gold)', fontSize: '18px' }} />
                </div>
                <div>
                  <strong style={{ color: 'var(--navy-800)', fontSize: '15px' }}>{e.area}</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{e.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 링크 */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/about/consult" className="btn btn-primary">상담 안내 보기 →</Link>
            <Link to="/" className="btn btn-ghost">운세 홈으로</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
