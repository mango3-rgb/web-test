import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const InquiryBoard = (): ReactElement => (
  <>
    <SEOHead title="문의 게시판 | 운세 플랫폼" description="문의 게시판 — 준비 중입니다" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Inquiry · 문의</div>
        <h2>문의 게시판</h2>
        <p>궁금한 점을 남겨주세요</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔧</div>
        <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy-800)', marginBottom: '12px' }}>준비 중입니다</h3>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
          문의 게시판은 현재 개설 준비 중입니다.<br />
          급한 문의는 이메일로 연락해 주세요.
        </p>
        <a
          href="mailto:mango3_sy@kdn.com"
          style={{ display: 'inline-block', padding: '13px 32px', background: 'var(--ink-surface)', color: '#fff', borderRadius: '8px', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}
        >
          이메일 문의 →
        </a>
      </div>
    </section>
  </>
);

export default InquiryBoard;
