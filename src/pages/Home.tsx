import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import type { ReactElement } from 'react';

const Home = (): ReactElement => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <SEOHead title={`${site.name} | ${site.nameKo}`} description={site.description} />

      <section style={{
        height: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg-white)',
      }}>
        <div style={{ textAlign: 'center', padding: '0 24px', width: '100%', maxWidth: '720px' }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--gold)',
            background: 'var(--navy-50)',
            border: '1px solid var(--line)',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '24px',
          }}>
            사주 · 별자리 · MBTI
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 900,
            color: 'var(--navy-800)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}>
            운명을 읽는<br />
            <span style={{ color: 'var(--gold)' }}>운세 플랫폼</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '480px',
            margin: '0 auto 36px',
          }}>
            동양의 사주팔자, 서양의 별자리, 현대 심리학의 MBTI로<br />
            나 자신과 운명을 깊이 탐구합니다.
          </p>

          {/* Service Links */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}>
            {[
              { label: '☯ 사주·운세', path: '/saju' },
              { label: '★ 별자리', path: '/horoscope' },
              { label: '◈ MBTI', path: '/mbti' },
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 24px',
                  background: 'var(--navy-50)',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--navy-800)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, background 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <Link className="btn btn-primary" to="/saju">
              사주 풀이 보기
              <svg style={{ marginLeft: '6px', width: '14px', height: '14px', verticalAlign: 'middle' }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link className="btn btn-ghost" to="/mbti/test">MBTI 테스트</Link>
            <Link
              to="/about/consult"
              style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              상담 문의 →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
