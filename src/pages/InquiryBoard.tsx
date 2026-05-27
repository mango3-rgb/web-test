import SEOHead from '../components/SEOHead';
import BoardPage from '../components/board/BoardPage';
import type { ReactElement } from 'react';

const InquiryBoard = (): ReactElement => (
  <>
    <SEOHead title="문의 게시판 | 운세 플랫폼" description="궁금한 점을 남겨주세요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Inquiry · 문의</div>
        <h2>문의 게시판</h2>
        <p>궁금한 점을 남겨주세요</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <BoardPage config={{ board: 'inquiry', showEmail: true, placeholder: '문의 내용을 자세히 입력해 주세요. 이메일을 남기시면 답변을 보내드립니다.' }} />
      </div>
    </section>
  </>
);

export default InquiryBoard;
