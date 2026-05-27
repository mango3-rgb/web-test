import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const SECTIONS = [
  {
    n: '01', title: '사주 상담 문의 시 필요 정보',
    items: ['성함', '양력 생년월일 (예: 1990년 5월 15일)', '태어난 시간 (모르시는 경우 생략 가능)', '주요 고민 또는 궁금한 내용'],
  },
  {
    n: '02', title: '별자리 상담 문의 시 필요 정보',
    items: ['성함', '생년월일', '태어난 시각 및 장소 (상승 별자리 계산 시 필요)', '궁금한 영역 (연애·직업·인간관계 등)'],
  },
  {
    n: '03', title: 'MBTI 상담 문의 시 필요 정보',
    items: ['성함', 'MBTI 유형 (모르시는 경우 생략 가능)', '상대방 MBTI (궁합 상담 시)', '주요 고민 또는 궁금한 내용'],
  },
];

const Consult = (): ReactElement => (
  <>
    <SEOHead title="상담 안내 | 황수영 운세" description="황수영 운세 이메일 상담 안내" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Consultation · 상담</div>
        <h2>상담 안내</h2>
        <p>사주·별자리·MBTI 개인 상담 문의</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', padding: '28px 32px', borderRadius: '0 12px 12px 0', marginBottom: '40px', lineHeight: 1.8 }}>
          <strong style={{ fontSize: '16px', color: 'var(--navy-800)', display: 'block', marginBottom: '10px' }}>이메일 상담 안내</strong>
          아래 내용을 포함하여 이메일로 문의해 주시면 빠르게 답변드리겠습니다. 상담은 개인 정보 보호를 위해 이메일로만 진행됩니다.
        </div>

        {SECTIONS.map((s) => (
          <div key={s.n} style={{ marginBottom: '32px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '17px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', background: 'var(--navy-50)', padding: '4px 10px', borderRadius: '20px' }}>{s.n}</span>
              {s.title}
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '8px' }}>
              {s.items.map((item) => (
                <li key={item} style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div style={{ padding: '32px', background: 'var(--ink-surface)', borderRadius: '16px', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', marginBottom: '12px', letterSpacing: '0.08em' }}>CONTACT</div>
          <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>이메일 문의</div>
          <a href="mailto:mango3_sy@kdn.com" style={{ fontSize: '16px', color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
            mango3_sy@kdn.com
          </a>
          <p style={{ margin: '12px 0 0', fontSize: '13px', opacity: 0.7 }}>영업일 기준 1~2일 내 답변드립니다.</p>
        </div>
      </div>
    </section>
  </>
);

export default Consult;
