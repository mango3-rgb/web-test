import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const AXES = [
  { label: 'E / I', desc: '에너지 방향\n외향(Extraversion)\n내향(Introversion)' },
  { label: 'S / N', desc: '정보 수집\n감각(Sensing)\n직관(iNtuition)' },
  { label: 'T / F', desc: '판단 기준\n사고(Thinking)\n감정(Feeling)' },
  { label: 'J / P', desc: '생활 방식\n판단(Judging)\n인식(Perceiving)' },
];

const TYPES = [
  { type: 'INTJ', nick: '전략가', desc: '전략적이고 독립적인 사상가. 목표를 향해 체계적으로 나아갑니다.' },
  { type: 'INTP', nick: '논리학자', desc: '혁신적인 발명가. 지식 탐구를 즐기며 독창적인 해결책을 찾습니다.' },
  { type: 'ENTJ', nick: '통솔자', desc: '대담하고 상상력이 풍부한 리더. 도전을 두려워하지 않습니다.' },
  { type: 'ENTP', nick: '변론가', desc: '논쟁을 즐기는 영리한 사상가. 새로운 아이디어를 탐구합니다.' },
  { type: 'INFJ', nick: '옹호자', desc: '고요하고 신비로운 이상주의자. 깊은 공감과 통찰력을 가집니다.' },
  { type: 'INFP', nick: '중재자', desc: '시적이고 친절한 이타주의자. 내면 가치를 중시합니다.' },
  { type: 'ENFJ', nick: '선도자', desc: '카리스마 있는 영감을 주는 리더. 타인의 성장을 돕습니다.' },
  { type: 'ENFP', nick: '활동가', desc: '자유로운 영혼. 창의적이고 사교적이며 항상 가능성을 봅니다.' },
  { type: 'ISTJ', nick: '현실주의자', desc: '사실에 기반한 신뢰할 수 있는 사람. 책임감이 강합니다.' },
  { type: 'ISFJ', nick: '수호자', desc: '헌신적이고 따뜻한 보호자. 소중한 사람들을 지킵니다.' },
  { type: 'ESTJ', nick: '경영자', desc: '원칙을 중시하는 탁월한 관리자. 질서와 규칙을 지킵니다.' },
  { type: 'ESFJ', nick: '집정관', desc: '배려심 깊고 사교적인 조화로운 사람. 공동체를 소중히 합니다.' },
  { type: 'ISTP', nick: '장인', desc: '대담하고 실용적인 실험정신의 소유자. 손재주가 뛰어납니다.' },
  { type: 'ISFP', nick: '모험가', desc: '유연하고 매력적인 예술가. 순간에 충실하게 살아갑니다.' },
  { type: 'ESTP', nick: '사업가', desc: '영리하고 에너지 넘치는 인식자. 즉흥적이고 행동적입니다.' },
  { type: 'ESFP', nick: '연예인', desc: '즉흥적이고 에너지 넘치는 퍼포머. 주변을 즐겁게 합니다.' },
];

const Mbti = (): ReactElement => (
  <>
    <SEOHead title="MBTI 16가지 유형 | 운세 플랫폼" description="MBTI 16가지 성격 유형과 특성을 알아보세요" />
    <section className="page-header-ed">
      <div className="container">
        <div className="eyebrow">MBTI · 성격 유형</div>
        <h2>MBTI 16가지 유형</h2>
        <p>나의 성격 유형을 알고 더 깊이 이해하기</p>
      </div>
    </section>
    <section className="section-ed">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '40px' }}>
          {AXES.map((a) => (
            <div key={a.label} style={{ padding: '20px', background: 'var(--navy-50)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--gold)', marginBottom: '8px' }}>{a.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{a.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '40px' }}>
          {TYPES.map((t) => (
            <div key={t.type} style={{ padding: '20px', background: 'var(--bg-white)', border: '1px solid var(--line)', borderRadius: '12px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gold)', marginBottom: '2px' }}>{t.type}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '8px' }}>({t.nick})</div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/mbti/compatibility" className="btn btn-primary">MBTI 궁합 보기 →</Link>
        </div>
      </div>
    </section>
  </>
);

export default Mbti;
