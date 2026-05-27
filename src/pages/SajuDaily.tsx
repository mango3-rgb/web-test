import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const JIJI_FORTUNE = [
  { gan: '子(쥐)', year: '1960, 1972, 1984, 1996, 2008, 2020', fortune: '오늘은 새로운 시작에 좋은 날입니다. 주변의 도움을 받아 계획을 구체화하세요.' },
  { gan: '丑(소)', year: '1961, 1973, 1985, 1997, 2009, 2021', fortune: '인내가 필요한 하루입니다. 서두르지 말고 착실하게 한 걸음씩 나아가세요.' },
  { gan: '寅(호랑이)', year: '1962, 1974, 1986, 1998, 2010, 2022', fortune: '대담한 행동이 좋은 결과를 가져옵니다. 망설이지 말고 도전해보세요.' },
  { gan: '卯(토끼)', year: '1963, 1975, 1987, 1999, 2011, 2023', fortune: '인간관계에서 행운이 찾아옵니다. 좋아하는 사람에게 먼저 연락해보세요.' },
  { gan: '辰(용)', year: '1964, 1976, 1988, 2000, 2012, 2024', fortune: '큰 기회가 눈앞에 있습니다. 자신감을 갖고 앞으로 나아가세요.' },
  { gan: '巳(뱀)', year: '1965, 1977, 1989, 2001, 2013, 2025', fortune: '직관이 강하게 작동하는 날입니다. 내면의 목소리에 귀 기울여보세요.' },
  { gan: '午(말)', year: '1966, 1978, 1990, 2002, 2014', fortune: '활동적인 하루가 됩니다. 야외 활동이나 운동이 에너지를 높여줄 것입니다.' },
  { gan: '未(양)', year: '1967, 1979, 1991, 2003, 2015', fortune: '창의력이 빛나는 날입니다. 예술·디자인 관련 활동을 시도해보세요.' },
  { gan: '申(원숭이)', year: '1968, 1980, 1992, 2004, 2016', fortune: '재치와 유머로 주변을 밝게 만드는 하루입니다. 소통에 집중해보세요.' },
  { gan: '酉(닭)', year: '1969, 1981, 1993, 2005, 2017', fortune: '꼼꼼함이 빛을 발합니다. 마무리 짓지 못한 일을 정리하기 좋은 날입니다.' },
  { gan: '戌(개)', year: '1970, 1982, 1994, 2006, 2018', fortune: '신뢰와 의리가 강조되는 날입니다. 소중한 사람들과 함께하는 시간을 가지세요.' },
  { gan: '亥(돼지)', year: '1971, 1983, 1995, 2007, 2019', fortune: '풍요와 여유가 느껴지는 하루입니다. 긍정적인 마음으로 하루를 시작하세요.' },
];

const SajuDaily = (): ReactElement => {
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <>
      <SEOHead title="오늘의 운세 | 황수영 운세" description="12간지별 오늘의 운세를 확인해보세요" />
      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">Daily Fortune · 오늘의 운세</div>
          <h2>오늘의 운세</h2>
          <p>{dateStr} · 12간지별 운세</p>
        </div>
      </section>
      <section className="section-ed">
        <div className="container">
          <div style={{ background: 'var(--navy-50)', borderLeft: '4px solid var(--gold)', padding: '20px 28px', borderRadius: '0 12px 12px 0', marginBottom: '40px', lineHeight: 1.8 }}>
            태어난 해의 <strong>지지(地支)</strong>를 찾아 오늘의 운세를 확인해보세요. 운세는 참고용이며, 최종 판단은 본인의 직관과 노력에 달려 있습니다.
          </div>
          <div style={{ display: 'grid', gap: '14px' }}>
            {JIJI_FORTUNE.map((j) => (
              <div key={j.gan} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '20px', padding: '20px 24px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gold)' }}>{j.gan}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>{j.year}</div>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.7 }}>{j.fortune}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SajuDaily;
