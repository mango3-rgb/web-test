import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const DiscussionBoard = (): ReactElement => (
  <>
    <SEOHead title="토론 게시판 | 운세 플랫폼" description="토론 게시판 — 준비 중입니다" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Discussion · 토론</div>
        <h2>토론 게시판</h2>
        <p>사주·별자리·MBTI에 대한 이야기를 나눠요</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>💬</div>
        <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy-800)', marginBottom: '12px' }}>준비 중입니다</h3>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          토론 게시판은 현재 개설 준비 중입니다.<br />
          사주·별자리·MBTI에 대한 자유로운 토론 공간을 곧 만들겠습니다.
        </p>
      </div>
    </section>
  </>
);

export default DiscussionBoard;
