import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const SIGNS = [
  { symbol: '♈', name: '양자리', en: 'Aries', dates: '3.21~4.19', element: '불', trait: '용감하고 개척정신이 강하며 열정적입니다.' },
  { symbol: '♉', name: '황소자리', en: 'Taurus', dates: '4.20~5.20', element: '흙', trait: '안정적이고 인내심이 강하며 현실적입니다.' },
  { symbol: '♊', name: '쌍둥이자리', en: 'Gemini', dates: '5.21~6.20', element: '바람', trait: '호기심이 많고 재치 있으며 다재다능합니다.' },
  { symbol: '♋', name: '게자리', en: 'Cancer', dates: '6.21~7.22', element: '물', trait: '감수성이 풍부하고 가족을 소중히 여깁니다.' },
  { symbol: '♌', name: '사자자리', en: 'Leo', dates: '7.23~8.22', element: '불', trait: '카리스마 있고 리더십이 강하며 창의적입니다.' },
  { symbol: '♍', name: '처녀자리', en: 'Virgo', dates: '8.23~9.22', element: '흙', trait: '꼼꼼하고 분석적이며 완벽주의 성향을 가집니다.' },
  { symbol: '♎', name: '천칭자리', en: 'Libra', dates: '9.23~10.22', element: '바람', trait: '균형을 추구하고 공정하며 사교적입니다.' },
  { symbol: '♏', name: '전갈자리', en: 'Scorpio', dates: '10.23~11.21', element: '물', trait: '강렬하고 직관적이며 깊은 집중력을 가집니다.' },
  { symbol: '♐', name: '사수자리', en: 'Sagittarius', dates: '11.22~12.21', element: '불', trait: '자유롭고 모험을 좋아하며 낙관적입니다.' },
  { symbol: '♑', name: '염소자리', en: 'Capricorn', dates: '12.22~1.19', element: '흙', trait: '야망 있고 책임감이 강하며 인내심이 뛰어납니다.' },
  { symbol: '♒', name: '물병자리', en: 'Aquarius', dates: '1.20~2.18', element: '바람', trait: '독창적이고 인도주의적이며 미래지향적입니다.' },
  { symbol: '♓', name: '물고기자리', en: 'Pisces', dates: '2.19~3.20', element: '물', trait: '공감 능력이 뛰어나고 예술적이며 직관적입니다.' },
];

const ELEMENT_COLOR: Record<string, string> = {
  '불': '#C8102E', '흙': '#D4760A', '바람': '#00855A', '물': '#1B2A4A',
};

const Horoscope = (): ReactElement => (
  <>
    <SEOHead title="12별자리 | 황수영 운세" description="12별자리의 특성과 원소별 분류를 알아보세요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Horoscope · 별자리</div>
        <h2>12 별자리</h2>
        <p>태양 별자리로 알아보는 성격과 운세</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', padding: '20px 28px', borderRadius: '0 12px 12px 0', marginBottom: '40px', lineHeight: 1.8 }}>
          서양 점성술에서 <strong>태양 별자리</strong>는 태어난 날 태양이 위치한 별자리를 말합니다.
          4가지 원소(불·흙·바람·물)로 분류되며, 각 원소별로 비슷한 성향을 공유합니다.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {SIGNS.map((s) => (
            <div key={s.name} style={{ padding: '24px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px', lineHeight: 1 }}>{s.symbol}</span>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy-800)' }}>{s.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.en} · {s.dates}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: '#fff', background: ELEMENT_COLOR[s.element], padding: '3px 8px', borderRadius: '20px' }}>{s.element}</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.trait}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/horoscope/compatibility" className="btn btn-primary">별자리 궁합 보기 →</Link>
        </div>
      </div>
    </section>
  </>
);

export default Horoscope;
