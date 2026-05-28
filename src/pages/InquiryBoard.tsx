import SEOHead from '../components/SEOHead';
import BoardPage from '../components/board/BoardPage';
import type { ReactElement } from 'react';

const InquiryBoard = (): ReactElement => (
  <>
    <SEOHead title="상담 게시판 | Suyoung's Secret" description="상담 내용을 남겨주세요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Consult · 상담</div>
        <h2>상담 게시판</h2>
        <p>상담 내용을 남겨주세요</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <BoardPage config={{ board: 'inquiry', showEmail: true, placeholder: '상담 내용을 자세히 입력해 주세요. 이메일을 남기시면 답변을 보내드립니다.' }} />
      </div>
    </section>
  </>
);

export default InquiryBoard;
