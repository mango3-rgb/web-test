import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import type { ReactElement } from 'react';

const SERVICES = [
  {
    key: 'saju',
    tag: 'SAJU / 01',
    num: '01',
    title: '사주·운세',
    desc: '태어난 연·월·일·시 네 기둥(四柱)으로 타고난 기질과 운명의 흐름을 풀어드립니다.',
    meta: ['천간·지지', '오행(五行)', '궁합'],
    cta: '사주 풀이 보기',
    path: '/saju',
    featured: true,
  },
  {
    key: 'horoscope',
    tag: 'HOROSCOPE / 02',
    num: '02',
    title: '별자리 운세',
    desc: '태어난 날의 태양 별자리로 성격과 대인관계, 연애운을 알아보세요.',
    meta: ['12별자리', '원소별 분류', '별자리 궁합'],
    cta: '별자리 보기',
    path: '/horoscope',
    featured: false,
  },
  {
    key: 'mbti',
    tag: 'MBTI / 03',
    num: '03',
    title: 'MBTI 유형',
    desc: '16가지 성격 유형으로 자신을 이해하고 다양한 관계에서의 궁합을 탐색합니다.',
    meta: ['16가지 유형', 'E/I·S/N·T/F·J/P', '궁합 분석'],
    cta: 'MBTI 보기',
    path: '/mbti',
    featured: false,
  },
];

const PILLARS = [
  { n: '/01', t: '동양 철학 기반', d: '수천 년의 역사를 가진 사주명리학과 오행 이론을 바탕으로 운명의 흐름을 해석합니다.' },
  { n: '/02', t: '현대 심리학 접목', d: '별자리와 MBTI를 통해 성격 유형을 파악하고 현대적 시각에서 자신을 이해합니다.' },
  { n: '/03', t: '쉽고 친근한 설명', d: '어려운 한자와 이론을 누구나 쉽게 이해할 수 있도록 풀어서 안내합니다.' },
];

const MARQUEE = '사주팔자 · 천간·지지 · 오행 · 12별자리 · MBTI · 궁합 · 운명 · 성격 유형 · 오늘의 운세';

type TabKey = 'saju' | 'horoscope' | 'mbti';
type TabPoint = string | { p: boolean; t: string };

interface TabContent {
  title: string;
  sub: string;
  items: TabPoint[];
}

const TAB_CONTENT: Record<TabKey, TabContent> = {
  saju: {
    title: '사주팔자(四柱八字)',
    sub: '네 기둥, 여덟 글자로 읽는 운명',
    items: [
      '연주(年柱): 태어난 해의 천간·지지',
      '월주(月柱): 태어난 달의 천간·지지',
      '일주(日柱): 태어난 날의 천간·지지',
      '시주(時柱): 태어난 시간의 천간·지지',
      { p: true, t: '천간 10개 + 지지 12개 = 60갑자(甲子)의 순환' },
    ],
  },
  horoscope: {
    title: '서양 점성술 12별자리',
    sub: '태양의 위치로 읽는 성격과 운세',
    items: [
      '양자리(3.21~4.19) · 황소자리(4.20~5.20)',
      '쌍둥이자리(5.21~6.20) · 게자리(6.21~7.22)',
      '사자자리(7.23~8.22) · 처녀자리(8.23~9.22)',
      '천칭자리(9.23~10.22) · 전갈자리(10.23~11.21)',
      { p: true, t: '4원소: 불(♈♌♐) · 흙(♉♍♑) · 바람(♊♎♒) · 물(♋♏♓)' },
    ],
  },
  mbti: {
    title: 'MBTI 16가지 유형',
    sub: '4가지 지표로 나누는 성격 유형',
    items: [
      'E(외향) / I(내향): 에너지 방향',
      'S(감각) / N(직관): 정보 수집 방식',
      'T(사고) / F(감정): 판단 기준',
      'J(판단) / P(인식): 생활 방식',
      { p: true, t: 'INFJ · INTJ · INFP · INTP · ENFJ · ENTJ · ENFP · ENTP 외 8개' },
    ],
  },
};

const Home = (): ReactElement => {
  const [tab, setTab] = useState<TabKey>('saju');
  const content = TAB_CONTENT[tab];

  return (
    <>
      <SEOHead title={`${site.name} | ${site.nameKo}`} description={site.description} />

      {/* Hero */}
      <section className="hero-editorial">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span>황수영 · 사주 · 별자리 · MBTI</span>
              </div>
              <h1 className="hero-title-ed">
                운명을 읽는<br />
                <span className="accent">사주·별자리</span><br />
                <span className="accent">MBTI 운세</span>
              </h1>
              <p className="hero-lead">
                동양의 사주팔자부터 서양의 별자리, 현대 심리학의 MBTI까지.
                황수영이 안내하는 운세 플랫폼에서 나 자신을 더 깊이 이해해보세요.
              </p>
              <div className="hero-actions-ed">
                <Link className="btn btn-primary" to="/saju">
                  사주 풀이 보기
                  <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <Link className="btn btn-ghost" to="/mbti">
                  MBTI 확인하기
                </Link>
              </div>
            </div>

            <div className="hero-side">
              <div className="metric-stack">
                <div className="metric">
                  <div className="metric-num"><span className="accent">4</span></div>
                  <div className="metric-label">사주 四柱</div>
                </div>
                <div className="metric">
                  <div className="metric-num">12</div>
                  <div className="metric-label">별자리</div>
                </div>
                <div className="metric">
                  <div className="metric-num">16</div>
                  <div className="metric-label">MBTI 유형</div>
                </div>
                <div className="metric">
                  <div className="metric-num"><span className="accent">60</span></div>
                  <div className="metric-label">갑자(甲子)</div>
                </div>
              </div>

              <div className="hero-card">
                <div className="hero-card-eyebrow">황수영 운세 · 3가지 서비스</div>
                <div className="hero-card-title">운세 안내</div>
                <ul className="hero-card-list">
                  <li>사주 — 연·월·일·시 四柱八字</li>
                  <li>별자리 — 12별자리·원소·궁합</li>
                  <li>MBTI — 16가지 성격 유형·궁합</li>
                  <li>상담 — 이메일 개인 상담 안내</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track">
          <span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                {MARQUEE.split(' · ').map((w, j) => (
                  <span key={`${i}-${j}`}>{w}<span className="dot">&#10022;</span></span>
                ))}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Services */}
      <section className="section-ed" id="services">
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 01 / Services</div>
            <h2 className="section-title-ed">3가지 <span className="accent">운세</span></h2>
            <div className="section-meta">사주 · 별자리 · MBTI</div>
          </div>
          <div className="courses">
            {SERVICES.map((s) => (
              <Link key={s.key} className={`course${s.featured ? ' featured' : ''}`} to={s.path}>
                <div className="course-row">
                  <span className="course-tag">{s.tag}</span>
                </div>
                <div className="course-num"><span className="slash">/</span>{s.num}</div>
                <h3 className="course-title">{s.title}</h3>
                <p className="course-desc">{s.desc}</p>
                <div className="course-meta-row">
                  {s.meta.map((m) => <span key={m}>{m}</span>)}
                </div>
                <span className="course-cta">
                  {s.cta}
                  <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Detail tabs */}
      <section className="section-ed" id="detail" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 02 / Guide</div>
            <h2 className="section-title-ed"><span className="accent">운세</span> 안내</h2>
            <div className="section-meta">{tab === 'saju' ? '사주팔자' : tab === 'horoscope' ? '12별자리' : 'MBTI 유형'}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {(['saju', 'horoscope', 'mbti'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setTab(d)}
                  style={{
                    padding: '8px 24px', borderRadius: '20px',
                    border: tab === d ? '2px solid var(--ink-surface)' : '1px solid var(--line)',
                    background: tab === d ? 'var(--ink-surface)' : 'var(--bg-white)',
                    color: tab === d ? '#fff' : 'var(--text-secondary)',
                    fontSize: '13px', fontWeight: tab === d ? 700 : 500,
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
                  }}
                >
                  {d === 'saju' ? '사주' : d === 'horoscope' ? '별자리' : 'MBTI'}
                </button>
              ))}
            </div>
          </div>

          <div className="curriculum-ed">
            <aside className="curr-aside">
              <h3>{content.title}</h3>
              <p>{content.sub}</p>
              <div className="curr-tabs">
                <button className={`curr-tab${tab === 'saju' ? ' active' : ''}`} onClick={() => setTab('saju')}>사주</button>
                <button className={`curr-tab${tab === 'horoscope' ? ' active' : ''}`} onClick={() => setTab('horoscope')}>별자리</button>
                <button className={`curr-tab${tab === 'mbti' ? ' active' : ''}`} onClick={() => setTab('mbti')}>MBTI</button>
              </div>
            </aside>
            <div className="timeline">
              <div className="tl-item">
                <div>
                  <div className="tl-num">01<span>/{String(content.items.length).padStart(2, '0')}</span></div>
                </div>
                <div className="tl-body">
                  <h4>{content.title}</h4>
                  <ul>
                    {content.items.map((p, i) =>
                      typeof p === 'string'
                        ? <li key={i}>{p}</li>
                        : <li key={i} className="practice">{p.t}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-ed" id="approach" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div className="section-num">&mdash; 03 / Approach</div>
            <h2 className="section-title-ed">황수영이 <span className="accent">안내하는 방식</span></h2>
            <div className="section-meta">3 principles</div>
          </div>
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <div className="pillar" key={i}>
                <div className="pillar-num">{p.n}</div>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-ed">
        <div className="container">
          <div className="cta-inner">
            <div>
              <div className="cta-eyebrow">&mdash; 운세 상담</div>
              <h2 className="cta-title-ed">
                당신의 운명이<br />
                <span className="accent">궁금하신가요?</span>
              </h2>
            </div>
            <div className="cta-side">
              <p>
                사주팔자, 별자리, MBTI 세 가지 관점에서 당신을 깊이 이해해보세요.
                개인 상담이 필요하시다면 이메일로 문의주세요.
              </p>
              <Link className="btn btn-cta" to="/about/consult">
                상담 안내 보기
                <svg className="btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
