import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type BloodType = 'A' | 'B' | 'O' | 'AB';

const BLOOD_INFO: Record<BloodType, { symbol: string; traits: string[]; desc: string }> = {
  A:  { symbol: '🅰️', traits: ['꼼꼼함', '계획적', '책임감', '완벽주의'], desc: '원칙을 중시하고 세심하게 챙기는 성실형' },
  B:  { symbol: '🅱️', traits: ['자유분방', '개성강함', '창의적', '독립적'], desc: '틀에 얽매이지 않고 자신만의 길을 가는 자유형' },
  O:  { symbol: '🅾️', traits: ['리더십', '대담함', '사교적', '추진력'], desc: '목표를 향해 과감히 나아가는 행동파 리더형' },
  AB: { symbol: '🆎', traits: ['합리적', '독창적', '이중성', '냉철함'], desc: '이성과 감성을 함께 가진 복잡미묘한 예술가형' },
};

const MBTI_LIST = [
  'INTJ','INTP','ENTJ','ENTP',
  'INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ',
  'ISTP','ISFP','ESTP','ESFP',
] as const;
type MbtiType = typeof MBTI_LIST[number];

const MBTI_NAMES: Record<MbtiType, string> = {
  INTJ: '전략가', INTP: '논리술사', ENTJ: '통솔자', ENTP: '변론가',
  INFJ: '옹호자', INFP: '중재자',  ENFJ: '선도자', ENFP: '활동가',
  ISTJ: '현실주의자', ISFJ: '수호자', ESTJ: '경영자', ESFJ: '집정관',
  ISTP: '장인',  ISFP: '모험가',  ESTP: '사업가', ESFP: '연예인',
};

const COMBO: Record<string, string> = {
  'A-INTJ': '완벽한 계획과 냉철한 전략으로 목표를 달성하는 정밀 설계자. 한 치의 오차도 허용하지 않는다.',
  'A-INTP': '모든 것을 분석하고 최적의 해답을 찾을 때까지 멈추지 않는 완벽주의 논리술사.',
  'A-ENTJ': '꼼꼼한 전략과 강한 추진력을 겸비한 완벽주의 리더. 팀을 정확하게 이끈다.',
  'A-ENTP': '치밀한 준비로 도전을 즐기는 변론가. 철저한 논리로 상대를 압도한다.',
  'A-INFJ': '섬세한 통찰력으로 타인을 이해하고 이상적인 세상을 꿈꾸는 옹호자.',
  'A-INFP': '깊은 감수성과 강한 책임감이 공존하는 조용한 이상주의자.',
  'A-ENFJ': '세심한 배려와 리더십을 겸비한 헌신적인 멘토. 주변 사람을 세심히 이끈다.',
  'A-ENFP': '꼼꼼함과 열정이 공존하는 활동가. 아이디어가 넘치면서도 완성도를 중시한다.',
  'A-ISTJ': '규칙과 책임을 철저히 지키며 신뢰를 쌓아가는 완벽한 현실주의자.',
  'A-ISFJ': '조용하지만 헌신적이고 세심한 수호자. 주변을 꼼꼼하게 챙기는 든든한 존재.',
  'A-ESTJ': '체계와 규율로 조직을 관리하는 완벽주의 경영자. 효율과 정확성을 동시에 추구한다.',
  'A-ESFJ': '따뜻하고 세심한 배려로 모든 사람을 챙기는 완벽한 집정관형.',
  'A-ISTP': '꼼꼼한 관찰과 실용적인 문제 해결 능력을 갖춘 조용한 전문가.',
  'A-ISFP': '섬세한 감성과 책임감을 가진 조용한 예술가형. 자신만의 완성도를 추구한다.',
  'A-ESTP': '철저한 준비로 기회를 잡는 행동파. 꼼꼼함과 대담함이 공존한다.',
  'A-ESFP': '세심한 배려와 밝은 에너지를 동시에 가진 완벽주의 엔터테이너형.',

  'B-INTJ': '독창적인 비전을 가진 아웃사이더형 전략가. 아무도 생각 못한 방식으로 성공한다.',
  'B-INTP': '틀에 얽매이지 않는 자유로운 논리술사. 독창적인 이론으로 세상을 분석한다.',
  'B-ENTJ': '자신만의 방식으로 조직을 이끄는 카리스마 넘치는 리더. 독창성이 강점이다.',
  'B-ENTP': '아이디어가 끊임없이 샘솟는 자유로운 변론가. 예측불가한 방식으로 문제를 푼다.',
  'B-INFJ': '독특한 직관력으로 깊은 통찰을 얻는 신비로운 예언자형.',
  'B-INFP': '자신만의 세계에서 독창적인 감성을 표현하는 자유로운 몽상가.',
  'B-ENFJ': '개성 넘치면서도 사람을 끌어당기는 매력적인 선도자.',
  'B-ENFP': '에너지와 창의성이 폭발하는 자유로운 영혼. 어디서나 주목받는 활동가.',
  'B-ISTJ': '독립적이고 자기 방식을 고수하는 현실주의자. 자신의 기준에 철저히 충실하다.',
  'B-ISFJ': '자신만의 방식으로 주변을 챙기는 독특한 수호자형.',
  'B-ESTJ': '자신의 규칙으로 조직을 이끄는 개성파 경영자. 기존 틀을 자주 깬다.',
  'B-ESFJ': '활발하고 개성 넘치는 방식으로 사람들과 어울리는 사교형.',
  'B-ISTP': '독립적이고 자유로운 쿨한 전문가. 묵묵히 자신만의 기술을 쌓아간다.',
  'B-ISFP': '자유로운 감성과 독창적인 예술성을 가진 개성 있는 모험가.',
  'B-ESTP': '본능적인 직관과 행동력으로 기회를 잡는 개성파 사업가.',
  'B-ESFP': '에너지 넘치고 개성 강한 자유로운 엔터테이너형.',

  'O-INTJ': '강한 의지와 전략적 사고로 비전을 실현하는 냉철한 리더.',
  'O-INTP': '논리와 추진력을 겸비한 독창적 분석가. 이론을 행동으로 옮긴다.',
  'O-ENTJ': '타고난 카리스마와 전략으로 조직을 이끄는 최강 리더형.',
  'O-ENTP': '도전적이고 설득력 있는 아이디어로 변화를 만드는 추진력 있는 혁신가.',
  'O-INFJ': '깊은 통찰과 강한 신념으로 사람들을 이끄는 열정적인 옹호자.',
  'O-INFP': '행동하는 이상주의자. 세상을 바꾸고 싶은 마음을 직접 실천한다.',
  'O-ENFJ': '사람의 마음을 움직이는 따뜻하고 강력한 리더십의 소유자.',
  'O-ENFP': '넘치는 에너지와 사교성으로 모든 공간을 활기차게 만드는 활동가.',
  'O-ISTJ': '책임감과 행동력을 겸비한 믿음직한 실행가형 현실주의자.',
  'O-ISFJ': '헌신적인 행동으로 주변을 든든하게 지키는 적극적인 수호자.',
  'O-ESTJ': '규칙과 추진력으로 조직을 완벽하게 관리하는 강력한 경영자.',
  'O-ESFJ': '활발하고 따뜻한 사교성으로 모든 사람을 이어주는 집정관형.',
  'O-ISTP': '냉철하고 실용적인 행동파. 말보다 행동으로 결과를 만든다.',
  'O-ISFP': '자연스러운 리더십과 따뜻한 감성을 가진 행동하는 모험가.',
  'O-ESTP': '본능과 결단력으로 기회를 잡는 타고난 사업가형 행동파.',
  'O-ESFP': '폭발적인 에너지와 사교성으로 모든 자리를 빛내는 연예인형.',

  'AB-INTJ': '천재적인 전략가. 남들이 이해 못하는 방식으로 세상을 설계한다.',
  'AB-INTP': '복잡하고 독창적인 이론을 만드는 분석의 달인. 예측불가한 결론에 도달한다.',
  'AB-ENTJ': '합리적이고 독창적인 방식으로 조직을 이끄는 혁신적 리더.',
  'AB-ENTP': '예측불가한 발상과 논리로 틀을 깨는 천재적 혁신가.',
  'AB-INFJ': '직관과 이성 사이에서 깊이 고민하는 신비로운 예언자.',
  'AB-INFP': '복잡한 내면과 독창적인 감성을 가진 신비로운 이상주의자.',
  'AB-ENFJ': '카리스마와 독창성이 결합된 복잡미묘한 리더. 사람들을 매혹시킨다.',
  'AB-ENFP': '무한한 상상력과 공감 능력을 가진 예측불가 카멜레온형.',
  'AB-ISTJ': '합리적이고 체계적이지만 독창적인 방식을 추구하는 이중적 현실주의자.',
  'AB-ISFJ': '냉철함과 따뜻함이 공존하는 복잡한 수호자형.',
  'AB-ESTJ': '합리적 판단과 실행력으로 조직을 혁신하는 독창적 경영자.',
  'AB-ESFJ': '이성과 감성을 동시에 활용하는 복잡한 집정관형.',
  'AB-ISTP': '냉철하고 독창적인 분석으로 문제를 해결하는 희귀한 전문가형.',
  'AB-ISFP': '합리성과 감성이 공존하는 복잡하고 독창적인 예술가형.',
  'AB-ESTP': '합리적 판단과 대담한 행동력을 겸비한 예측불가 사업가형.',
  'AB-ESFP': '이성과 감성, 자유로움이 공존하는 매력적인 카멜레온형 연예인.',
};

const BloodTypeMbtiTest = (): ReactElement => {
  const [bloodType, setBloodType] = useState<BloodType | null>(null);
  const [mbti, setMbti] = useState<MbtiType | null>(null);

  const comboKey = bloodType && mbti ? `${bloodType}-${mbti}` : null;
  const comboDesc = comboKey ? COMBO[comboKey] : null;
  const bInfo = bloodType ? BLOOD_INFO[bloodType] : null;

  return (
    <>
      <SEOHead title="혈액형+MBTI 성격 분석 | Suyoung's Secret" description="혈액형과 MBTI 유형을 직접 선택해 나만의 성격 조합을 알아보세요" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">혈액형 · MBTI · 성격 분석</div>
          <h2>혈액형+MBTI 성격 분석</h2>
          <p>혈액형과 MBTI를 선택하면 조합 분석 결과를 바로 확인할 수 있어요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>

          {/* Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>

            {/* Blood Type */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: '12px' }}>
                혈액형 선택
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {(['A', 'B', 'O', 'AB'] as BloodType[]).map((bt) => {
                  const active = bloodType === bt;
                  return (
                    <button
                      key={bt}
                      onClick={() => setBloodType(bt)}
                      style={{
                        padding: '16px 8px',
                        background: active ? 'var(--bg-medium-gray)' : 'var(--bg-white)',
                        border: `2px solid ${active ? 'var(--gold)' : 'var(--line)'}`,
                        borderRadius: '12px', cursor: 'pointer',
                        transition: 'all 0.15s', fontFamily: 'inherit',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '22px', marginBottom: '4px' }}>{BLOOD_INFO[bt].symbol}</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: active ? 'var(--gold)' : 'var(--text-primary)' }}>
                        {bt}형
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MBTI */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: '12px' }}>
                MBTI 선택
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {MBTI_LIST.map((m) => {
                  const active = mbti === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setMbti(m)}
                      style={{
                        padding: '8px 4px',
                        background: active ? 'var(--bg-medium-gray)' : 'var(--bg-white)',
                        border: `2px solid ${active ? 'var(--gold)' : 'var(--line)'}`,
                        borderRadius: '8px', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 700,
                        color: active ? 'var(--gold)' : 'var(--text-primary)',
                        transition: 'all 0.15s', fontFamily: 'inherit',
                      }}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result */}
          {comboDesc && bInfo && mbti ? (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', textAlign: 'center', marginBottom: '20px' }}>
                분석 결과
              </div>

              {/* Type badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  padding: '20px 16px', background: 'var(--bg-white)',
                  border: '2px solid var(--gold)', borderRadius: '16px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>{bInfo.symbol}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '4px' }}>혈액형</div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)' }}>{bloodType}형</div>
                </div>
                <div style={{
                  padding: '20px 16px', background: 'var(--bg-white)',
                  border: '2px solid var(--gold)', borderRadius: '16px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>🧠</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '4px' }}>MBTI</div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)' }}>{mbti}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>{MBTI_NAMES[mbti]}</div>
                </div>
              </div>

              {/* Combo description */}
              <div style={{
                padding: '24px 28px', background: 'var(--bg-white)',
                border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '14px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>
                  {bloodType}형 × {mbti} 조합 성격
                </div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
                  {comboDesc}
                </p>
              </div>

              {/* Blood type traits */}
              <div style={{
                padding: '20px 24px', background: 'var(--bg-white)',
                border: '1px solid var(--line)', borderRadius: '14px', marginBottom: '28px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>
                  {bloodType}형 기본 성향
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>
                  {bInfo.desc}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {bInfo.traits.map((tr) => (
                    <span key={tr} style={{
                      padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                      background: 'var(--bg-medium-gray)', color: 'var(--text-secondary)',
                      border: '1px solid var(--line)',
                    }}>{tr}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '48px 24px',
              background: 'var(--bg-white)', border: '1px dashed var(--line)', borderRadius: '16px',
              color: 'var(--text-light)', fontSize: '15px', lineHeight: 1.8,
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🩸 × 🧠</div>
              위에서 <strong style={{ color: 'var(--text-secondary)' }}>혈액형</strong>과{' '}
              <strong style={{ color: 'var(--text-secondary)' }}>MBTI</strong>를 선택하면<br />
              조합 성격 분석 결과가 여기에 나타납니다
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default BloodTypeMbtiTest;
