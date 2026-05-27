import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const CHUNGKAN = ['甲(갑)', '乙(을)', '丙(병)', '丁(정)', '戊(무)', '己(기)', '庚(경)', '辛(신)', '壬(임)', '癸(계)'];
const JIJI = ['子(자)', '丑(축)', '寅(인)', '卯(묘)', '辰(진)', '巳(사)', '午(오)', '未(미)', '申(신)', '酉(유)', '戌(술)', '亥(해)'];
const OHAENG = [
  { name: '木(목)', desc: '봄 · 동쪽 · 청색\n간·담', char: '木' },
  { name: '火(화)', desc: '여름 · 남쪽 · 적색\n심장·소장', char: '火' },
  { name: '土(토)', desc: '환절기 · 중앙 · 황색\n비장·위장', char: '土' },
  { name: '金(금)', desc: '가을 · 서쪽 · 백색\n폐·대장', char: '金' },
  { name: '水(수)', desc: '겨울 · 북쪽 · 흑색\n신장·방광', char: '水' },
];

const Saju = (): ReactElement => (
  <>
    <SEOHead title="사주 풀이 | 운세 플랫폼" description="태어난 연·월·일·시 네 기둥으로 타고난 기질과 운명의 흐름을 알아보세요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Saju · 四柱</div>
        <h2>사주·운세</h2>
        <p>태어난 연·월·일·시 四柱八字로 읽는 운명</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', padding: '28px 32px', borderRadius: '0 12px 12px 0', marginBottom: '48px', lineHeight: 1.8 }}>
          <strong style={{ fontSize: '17px', color: 'var(--navy-800)', display: 'block', marginBottom: '12px' }}>사주팔자(四柱八字)란?</strong>
          <p style={{ margin: '0 0 12px' }}>
            사람이 태어난 연(年)·월(月)·일(日)·시(時)의 네 기둥(四柱)과 여덟 글자(八字)로 구성됩니다.
            각 기둥은 천간(天干)과 지지(地支) 한 쌍으로 이루어지며, 이 여덟 글자가 오행(五行)의 조화를 통해
            한 사람의 기질과 운명의 흐름을 나타냅니다.
          </p>
          <p style={{ margin: 0 }}>60가지 간지(甲子~癸亥)의 순환으로 60년이 한 주기를 이루며, 이를 육십갑자(六十甲子)라 합니다.</p>
        </div>

        <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '16px' }}>천간(天干) 10개</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '40px' }}>
          {CHUNGKAN.map((c) => (
            <div key={c} style={{ padding: '16px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: 'var(--navy-800)' }}>{c}</div>
          ))}
        </div>

        <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '16px' }}>지지(地支) 12개</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '40px' }}>
          {JIJI.map((j) => (
            <div key={j} style={{ padding: '16px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: 'var(--navy-800)' }}>{j}</div>
          ))}
        </div>

        <h3 style={{ fontSize: '20px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '16px' }}>오행(五行)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {OHAENG.map((o) => (
            <div key={o.name} style={{ padding: '20px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--gold)', marginBottom: '8px' }}>{o.char}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '4px' }}>{o.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/saju/daily" className="btn btn-primary">오늘의 운세 보기 →</Link>
          <Link to="/saju/compatibility" className="btn btn-ghost">사주 궁합 보기 →</Link>
        </div>
      </div>
    </section>
  </>
);

export default Saju;
