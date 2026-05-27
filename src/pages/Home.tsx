import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import type { ReactElement } from 'react';

const SERVICES = [
  {
    key: 'saju',
    label: '사주·운세',
    sub: 'SAJU',
    icon: '☯',
    desc: '연·월·일·시 四柱八字로 타고난 기질과 운명의 흐름을 읽습니다.',
    path: '/saju',
  },
  {
    key: 'horoscope',
    label: '별자리',
    sub: 'HOROSCOPE',
    icon: '★',
    desc: '12별자리 태양 위치로 성격과 연애운, 대인관계를 살핍니다.',
    path: '/horoscope',
  },
  {
    key: 'mbti',
    label: 'MBTI',
    sub: 'PERSONALITY',
    icon: '◈',
    desc: '16가지 성격 유형으로 자신을 이해하고 궁합을 탐색합니다.',
    path: '/mbti',
  },
];

const Home = (): ReactElement => (
  <>
    <SEOHead title={`${site.name} | ${site.nameKo}`} description={site.description} />

    <section style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      padding: '40px 0',
    }}>
      <div className="container" style={{ width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="eyebrow" style={{ marginBottom: '16px', letterSpacing: '0.15em' }}>
            사주 · 별자리 · MBTI
          </div>
          <h1 className="hero-title-ed" style={{ marginBottom: '16px', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1 }}>
            운명을 읽는<br />
            <span className="accent">운세 플랫폼</span>
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.75,
          }}>
            동양의 사주팔자, 서양의 별자리, 현대 심리학의 MBTI로<br />
            나 자신과 운명을 깊이 탐구합니다.
          </p>
        </div>

        {/* Service Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '36px',
        }}>
          {SERVICES.map((s) => (
            <Link
              key={s.key}
              to={s.path}
              style={{
                display: 'block',
                padding: '28px 24px',
                background: 'var(--bg-white)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{
                fontSize: '28px',
                marginBottom: '12px',
                color: 'var(--gold)',
              }}>{s.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.12em', marginBottom: '6px' }}>{s.sub}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy-800)', marginBottom: '10px', margin: '0 0 10px' }}>{s.label}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to="/saju">
            사주 풀이 보기
            <svg style={{ marginLeft: '6px', width: '14px', height: '14px', verticalAlign: 'middle' }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <Link className="btn btn-ghost" to="/mbti/test">MBTI 테스트 해보기</Link>
          <Link
            to="/about/consult"
            style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', padding: '8px 4px' }}
          >
            개인 상담 문의 →
          </Link>
        </div>

      </div>
    </section>
  </>
);

export default Home;
