import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const CHUNGKAN = ['甲(갑)', '乙(을)', '丙(병)', '丁(정)', '戊(무)', '己(기)', '庚(경)', '辛(신)', '壬(임)', '癸(계)'];
const JIJI = ['子(자)', '丑(축)', '寅(인)', '卯(묘)', '辰(진)', '巳(사)', '午(오)', '未(미)', '申(신)', '酉(유)', '戌(술)', '亥(해)'];
const OHAENG = [
  { name: '木(목)', desc: '봄·동쪽\n청색·간·담', char: '木' },
  { name: '火(화)', desc: '여름·남쪽\n적색·심장', char: '火' },
  { name: '土(토)', desc: '환절기·중앙\n황색·비위', char: '土' },
  { name: '金(금)', desc: '가을·서쪽\n백색·폐장', char: '金' },
  { name: '水(수)', desc: '겨울·북쪽\n흑색·신장', char: '水' },
];

const Saju = (): ReactElement => (
  <>
    <SEOHead title="사주 풀이 | Suyoung's Secret" description="태어난 연·월·일·시 네 기둥으로 타고난 기질과 운명의 흐름을 알아보세요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">Saju · 四柱</div>
        <h2>사주·운세</h2>
        <p>태어난 연·월·일·시 四柱八字로 읽는 운명</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', padding: '12px 20px', borderRadius: '0 10px 10px 0', marginBottom: '16px', lineHeight: 1.7, fontSize: '13px' }}>
          <strong style={{ fontSize: '14px', color: 'var(--navy-800)', display: 'block', marginBottom: '6px' }}>사주팔자(四柱八字)란?</strong>
          연(年)·월(月)·일(日)·시(時)의 네 기둥과 여덟 글자로, 천간(天干)·지지(地支) 한 쌍씩 이루어집니다.
          이 여덟 글자가 오행(五行)의 조화를 통해 기질과 운명의 흐름을 나타내며, 60갑자의 순환으로 60년이 한 주기입니다.
        </div>

        <h3 style={{ fontSize: '15px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '8px' }}>천간(天干) 10개</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {CHUNGKAN.map((c) => (
            <div key={c} style={{ padding: '10px 8px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '8px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)' }}>{c}</div>
          ))}
        </div>

        <h3 style={{ fontSize: '15px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '8px' }}>지지(地支) 12개</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {JIJI.map((j) => (
            <div key={j} style={{ padding: '10px 8px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '8px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)' }}>{j}</div>
          ))}
        </div>

        <h3 style={{ fontSize: '15px', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '8px' }}>오행(五行)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {OHAENG.map((o) => (
            <div key={o.name} style={{ padding: '14px 10px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--gold)', marginBottom: '4px' }}>{o.char}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '2px' }}>{o.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/saju/daily" className="btn btn-primary">오늘의 운세 →</Link>
          <Link to="/saju/compatibility" className="btn btn-ghost">사주 궁합 →</Link>
        </div>
      </div>
    </section>
  </>
);

export default Saju;
