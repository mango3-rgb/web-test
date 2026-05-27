import SEOHead from '../components/SEOHead';
import BoardPage from '../components/board/BoardPage';
import type { ReactElement } from 'react';

const DiscussionBoard = (): ReactElement => (
  <>
    <SEOHead title="토론 게시판 | 운세 플랫폼" description="사주·별자리·MBTI에 대한 이야기를 나눠요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Discussion · 토론</div>
        <h2>토론 게시판</h2>
        <p>사주·별자리·MBTI에 대한 이야기를 나눠요</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <BoardPage config={{ board: 'discussion', showEmail: false, placeholder: '사주·별자리·MBTI에 대한 경험이나 의견을 자유롭게 나눠주세요.' }} />
      </div>
    </section>
  </>
);

export default DiscussionBoard;
