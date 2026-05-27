import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type EnneaType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface EnneaQ {
  id: number;
  q: string;
  type: EnneaType;
}

const QUESTIONS: EnneaQ[] = [
  { id: 1,  q: '잘못된 것을 보면 참지 못하고 바로잡으려 한다',                     type: 1 },
  { id: 2,  q: '주변 사람이 힘들 때 내가 먼저 나서서 도와주고 싶다',              type: 2 },
  { id: 3,  q: '맡은 일은 반드시 성과를 내야 한다고 생각한다',                    type: 3 },
  { id: 4,  q: '나만의 독특한 감성과 취향을 소중히 여긴다',                       type: 4 },
  { id: 5,  q: '무언가를 이해할 때까지 깊이 파고드는 편이다',                     type: 5 },
  { id: 6,  q: '불확실한 상황에서는 철저히 준비해두어야 안심된다',                 type: 6 },
  { id: 7,  q: '새로운 경험과 자극을 끊임없이 추구하는 편이다',                   type: 7 },
  { id: 8,  q: '강하게 의사를 표현하고 상황을 주도하는 편이다',                   type: 8 },
  { id: 9,  q: '갈등보다는 조화를 택하고 모두가 편한 것이 더 중요하다',           type: 9 },
  { id: 10, q: '규칙이나 기준을 어기는 상황이 불편하게 느껴진다',                 type: 1 },
  { id: 11, q: '누군가에게 필요한 존재가 되는 것이 중요하다',                     type: 2 },
  { id: 12, q: '남들에게 유능하고 성공적인 사람으로 보이고 싶다',                 type: 3 },
  { id: 13, q: '평범한 삶보다 특별하고 의미 있는 삶을 원한다',                   type: 4 },
  { id: 14, q: '혼자 생각하고 분석하는 시간이 꼭 필요하다',                      type: 5 },
  { id: 15, q: '믿을 수 있는 사람이나 원칙에 의존하는 경향이 있다',              type: 6 },
  { id: 16, q: '한 가지에 오래 매이기보다 다양한 것을 즐기고 싶다',              type: 7 },
  { id: 17, q: '통제받거나 약하게 보이는 것을 극도로 싫어한다',                  type: 8 },
  { id: 18, q: '자신의 의견을 내세우기보다 상대방의 편안함을 우선시한다',         type: 9 },
];

const CHOICES = [
  { label: '완전 나', score: 4 },
  { label: '그런 편', score: 3 },
  { label: '아닌 편', score: 2 },
  { label: '전혀 아님', score: 1 },
];

const ENNEA_INFO: Record<EnneaType, { symbol: string; name: string; keyword: string; core: string }> = {
  1: { symbol: '⚖️', name: '개혁가', keyword: '원칙과 완벽', core:
    '옳고 그름을 중요하게 여기며 세상을 더 나은 곳으로 만들려는 원칙주의자다. ' +
    '강한 내적 기준이 있어 맡은 일은 끝까지 완벽하게 처리하며, 윤리적 행동에 있어 자신과 타인 모두에게 높은 잣대를 적용한다. ' +
    '책임감이 강하고 성실하며, 약속한 것은 반드시 지키는 신뢰받는 사람이다. ' +
    '불의에 맞서는 용기가 있으며, 사소한 문제도 그냥 넘기지 못하는 정의로운 면을 가지고 있다. ' +
    '그러나 완벽주의적 성향으로 인해 작은 실수에도 과도한 자책을 하는 경향이 있다. ' +
    '타인에게도 자신과 같은 기준을 적용해 지나치게 비판적으로 보이거나 관계에서 갈등을 만들 수 있다. ' +
    '내면에 억누른 분노가 쌓이기 쉬우며, 이것이 참다가 갑자기 폭발하는 방식으로 나타나 본인도 당황할 수 있다. ' +
    '조심해야 할 것은 자신의 방식만이 옳다는 생각에 빠져 타인의 다른 접근 방식을 인정하지 못하는 경직성이다. ' +
    '완벽하지 않아도 된다는 것을 받아들이지 못할 때 만성적인 스트레스와 번아웃으로 이어질 수 있다. ' +
    '성장의 방향은 자기 자신에게 보다 관대해지고, 완벽함보다 충분히 좋음을 수용하는 유연성을 기르는 것이다.',
  },
  2: { symbol: '💝', name: '조력가', keyword: '사랑과 헌신', core:
    '타인을 사랑하고 도움으로써 자신의 의미를 찾는 헌신형이다. ' +
    '주변 사람의 필요를 누구보다 먼저 파악하고 자발적으로 나서는 따뜻한 공감 능력을 가지고 있다. ' +
    '사람들 사이에서 관계의 다리 역할을 하며, 자신의 존재가 타인에게 필요하다는 것에서 깊은 보람을 느낀다. ' +
    '진심 어린 헌신은 주변 사람들에게 큰 힘과 안정감을 주며, 자연스럽게 신뢰를 얻는다. ' +
    '그러나 자신의 필요를 지속적으로 무시하다 보면 몸과 마음이 소진될 위험이 크다. ' +
    '도움에 대한 감사나 인정을 받지 못할 때 강한 배신감이나 억울함을 느끼며 관계에서 상처를 입기 쉽다. ' +
    '타인의 인정과 감사에 지나치게 의존하게 되면 자신의 감정과 욕구를 표현하는 능력이 약해질 수 있다. ' +
    '조심해야 할 것은 상대가 원하지 않는 도움을 강요하거나, 베푼 것에 대한 보상을 은근히 기대하는 패턴이다. ' +
    '인정받고 싶은 욕구가 지나쳐 의도치 않게 상대를 조종하는 방식으로 행동하지 않도록 주의가 필요하다. ' +
    '성장의 방향은 타인을 돕는 것만큼 자신을 사랑하고 자신의 필요를 솔직하게 표현하는 것을 배우는 것이다.',
  },
  3: { symbol: '🏆', name: '성취자', keyword: '성공과 인정', core:
    '목표를 향해 에너지를 집중하며 성공과 인정을 갈망하는 추진형이다. ' +
    '어떤 일이든 빠르게 파악하고 효율적으로 실행하는 능력이 탁월하며, 목표 달성을 위해 끊임없이 노력한다. ' +
    '자기 관리 능력이 뛰어나고 성과를 내는 방법을 직관적으로 알고 있어 다양한 분야에서 두각을 나타낸다. ' +
    '자신감 있는 모습으로 주변 사람들에게 자연스럽게 롤모델이 되는 경우가 많다. ' +
    '그러나 성공 이미지에 과도하게 집착해 실제 자신의 감정과 욕구를 무시하는 경향이 있다. ' +
    '실패나 비판에 매우 취약하며, 자신의 가치가 성과에 달려 있다는 믿음으로 인해 늘 결과에 압박을 느낀다. ' +
    '관계에서도 역할과 이미지를 유지하려 하기 때문에 진정성 있는 깊은 관계를 맺는 데 어려움을 겪을 수 있다. ' +
    '조심해야 할 것은 목표 달성을 위해 수단과 방법을 가리지 않는 방식이 타인의 신뢰를 잃게 만들 수 있다는 점이다. ' +
    '자신을 성과로만 정의하게 되면 번아웃이 오거나 성공해도 공허함을 느끼게 될 수 있다. ' +
    '성장의 방향은 성과 없이도 자신이 가치 있는 존재임을 인식하고, 진정성 있는 감정 표현을 연습하는 것이다.',
  },
  4: { symbol: '🎨', name: '개인주의자', keyword: '감성과 독창성', core:
    '자신만의 감성과 정체성을 소중히 여기며 깊이 있는 경험을 추구하는 독창형이다. ' +
    '평범함을 거부하고 독창적인 시각과 감성을 통해 세상과 소통하며 예술적 표현 능력이 뛰어나다. ' +
    '인간의 복잡한 감정을 탐구하는 것을 즐기며, 그 깊이가 타인에게 깊은 공명을 일으키는 표현으로 이어진다. ' +
    '소수의 사람과 깊이 있는 진정한 연결을 원하며, 표면적인 관계보다 진심이 통하는 관계를 훨씬 소중히 여긴다. ' +
    '그러나 감정 기복이 심한 편이어서 작은 일에도 크게 상처받거나 슬픔에 오랫동안 머무르는 경향이 있다. ' +
    '자신이 결핍되어 있다는 생각, 또는 남들과 근본적으로 다르다는 고립감에 자주 사로잡힐 수 있다. ' +
    '현재 가진 것보다 갖지 못한 것에 더 집중하는 경향이 있어 만족감을 느끼기 어렵다. ' +
    '조심해야 할 것은 자기 연민에 빠져 현실적인 행동을 미루거나 관계에서 상대에게 과도한 감정적 요구를 하는 것이다. ' +
    '독특함을 유지하고 싶은 욕구가 지나쳐 의도적으로 사람들과 거리를 두거나 소속감을 거부하는 방향으로 흐를 수 있다. ' +
    '성장의 방향은 감정의 파도를 타면서도 현실에 단단히 발을 딛고, 지금 이 순간의 충분함을 알아차리는 연습이다.',
  },
  5: { symbol: '🔍', name: '탐구자', keyword: '지식과 분석', core:
    '지식과 이해를 통해 세상을 파악하고 독립적으로 사고하는 분석형이다. ' +
    '어떤 주제든 깊이 파고들어 핵심을 이해하는 집중력이 있으며, 전문성을 쌓는 것에서 큰 보람을 느낀다. ' +
    '논리적이고 객관적인 분석 능력이 뛰어나며, 감정에 휘둘리지 않고 냉철하게 문제를 바라보는 장점이 있다. ' +
    '자원과 에너지를 효율적으로 관리하며, 혼자만의 시간이 충분할 때 최고의 사고력과 창의성을 발휘한다. ' +
    '그러나 감정적 연결을 불필요하다고 여겨 타인과의 관계에서 거리를 두거나 냉정하게 보일 수 있다. ' +
    '필요 이상으로 에너지를 사용하지 않으려는 경향 때문에 중요한 관계에서도 소극적으로 참여하는 경우가 생긴다. ' +
    '정보와 지식을 충분히 쌓을 때까지 행동을 미루는 경향이 있어 기회를 놓치거나 삶이 지나치게 이론적으로 흐를 수 있다. ' +
    '조심해야 할 것은 고립된 채로 자신만의 세계에 너무 깊이 빠져 현실적인 삶과 인간관계를 점점 멀리하는 것이다. ' +
    '에너지를 지나치게 아끼다 보면 정작 중요한 순간에도 충분히 함께하지 못해 관계가 소원해질 수 있다. ' +
    '성장의 방향은 지식을 행동과 연결하고, 완전히 준비되지 않아도 현실에 참여하며 관계에 감정적으로 투자하는 용기를 기르는 것이다.',
  },
  6: { symbol: '🛡️', name: '충성가', keyword: '안전과 신뢰', core:
    '신뢰와 안전을 중시하며 헌신적으로 책임을 다하는 동반자형이다. ' +
    '믿을 수 있는 사람과 원칙에 기반해 행동하며, 한 번 신뢰를 주면 끝까지 함께하는 강한 충성심을 가지고 있다. ' +
    '책임감이 강하고 성실하며, 팀이나 조직 내에서 없어서는 안 될 신뢰의 기반이 된다. ' +
    '위험을 사전에 파악하고 대비하는 능력이 뛰어나며, 위기 상황에서도 침착하게 대처하는 실용적인 지혜를 가지고 있다. ' +
    '그러나 과도한 불안과 걱정이 일상을 지배할 수 있으며, 아직 일어나지 않은 일에 대해 지나치게 에너지를 소모한다. ' +
    '권위나 리더십에 양가적인 태도를 보일 수 있어, 어떤 때는 맹목적으로 따르다가 어떤 때는 과도하게 의심하기도 한다. ' +
    '믿었던 사람에게 배신당할 것에 대한 두려움이 커서 신뢰 관계를 형성하는 데 시간이 오래 걸린다. ' +
    '조심해야 할 것은 최악의 시나리오를 상상하는 데 몰두해 현실을 왜곡하거나 불필요한 갈등을 만드는 것이다. ' +
    '불안을 줄이기 위해 타인의 확인과 지지에 지나치게 의존하면 자율성이 약해지고 관계에서도 부담을 줄 수 있다. ' +
    '성장의 방향은 자신의 내면에서 안정감의 근원을 찾고, 두려움을 인정하면서도 그것에 지배당하지 않는 자신감을 키우는 것이다.',
  },
  7: { symbol: '🌈', name: '열정가', keyword: '자유와 탐험', core:
    '새로운 경험과 즐거움을 끊임없이 추구하는 자유로운 탐험형이다. ' +
    '넘치는 에너지와 낙관적인 사고로 어떤 상황에서도 가능성을 발견하며, 주변 사람들에게 활력과 영감을 준다. ' +
    '다양한 분야에 대한 폭넓은 호기심이 있으며, 새로운 아이디어와 경험을 빠르게 연결하는 창의적 능력이 탁월하다. ' +
    '어떤 환경에서도 즐거움을 찾아내는 긍정적인 에너지가 있어 자연스럽게 사람들을 끌어당기는 매력이 있다. ' +
    '그러나 지루함이나 고통스러운 감정을 피하려는 경향이 강해 중요한 일도 금세 흥미를 잃고 다음으로 넘어가는 패턴을 반복한다. ' +
    '여러 가지를 동시에 시작하지만 완료하지 못하는 경우가 많아 실질적인 성과로 이어지지 않는 경우가 생긴다. ' +
    '즐거움과 자유에 대한 집착이 강해 책임이나 의무를 회피하는 방향으로 흐를 수 있다. ' +
    '조심해야 할 것은 불편한 감정이나 상황을 계속 회피하다 보면 자신의 진짜 내면 문제를 장기간 외면하게 된다는 점이다. ' +
    '충동적인 결정과 과도한 다양성 추구가 관계와 경력에서 깊이와 안정을 빼앗아 갈 수 있다. ' +
    '성장의 방향은 즐거움만을 쫓는 대신 불편함도 기꺼이 받아들이고 한 가지에 깊이 헌신하는 능력을 기르는 것이다.',
  },
  8: { symbol: '⚡', name: '도전자', keyword: '힘과 결단', core:
    '강한 의지와 결단력으로 세상에 맞서며 자신과 타인을 보호하는 리더형이다. ' +
    '불의와 약자를 대하는 태도에 있어 강한 보호 본능이 있으며, 상황을 장악하고 통제하는 능력이 뛰어나다. ' +
    '두려움 없이 자신의 생각을 직접적으로 표현하며, 어떤 어려운 상황에서도 흔들리지 않는 강인함으로 주변에 신뢰를 심어준다. ' +
    '목표를 향해 과감하게 행동하며, 큰 그림을 그리는 전략적 사고와 강력한 실행력을 동시에 갖추고 있다. ' +
    '그러나 통제권을 빼앗기는 것에 강한 저항감을 가지고 있어 협업에서 독단적으로 행동하는 경향이 있다. ' +
    '감정, 특히 취약함을 드러내는 것을 약함으로 여겨 억누르다 보면 내면에 분노와 긴장이 쌓일 수 있다. ' +
    '강한 주도성이 타인에게 억압적으로 느껴질 수 있어 의도치 않게 관계에서 갈등을 만들어내는 경우가 있다. ' +
    '조심해야 할 것은 자신의 방식으로만 상황을 통제하려는 욕구가 팀의 자율성과 신뢰를 해칠 수 있다는 점이다. ' +
    '취약함을 인정하지 않는 태도가 진정한 친밀감을 형성하는 데 큰 걸림돌이 될 수 있다. ' +
    '성장의 방향은 힘을 내려놓고 타인을 신뢰하는 법을 배우며, 취약함을 드러내는 것이 진정한 강함임을 받아들이는 것이다.',
  },
  9: { symbol: '☯️', name: '평화주의자', keyword: '조화와 평화', core:
    '모두를 포용하고 갈등을 줄이며 조화를 이끄는 중재형이다. ' +
    '어떤 상황에서도 여러 관점을 동시에 이해하고 공감하는 능력이 있어 자연스럽게 중재자 역할을 하게 된다. ' +
    '온화하고 수용적인 태도 덕분에 사람들이 편안하게 자신을 표현할 수 있도록 만드는 분위기를 형성한다. ' +
    '갈등을 최소화하면서도 모든 사람이 만족하는 해결책을 찾으려는 끈기 있는 노력이 집단의 화합을 이끈다. ' +
    '그러나 갈등을 피하려는 욕구 때문에 자신의 의견이나 감정을 억누르는 경우가 많아 진정한 자신의 필요가 무엇인지 모르게 되기도 한다. ' +
    '중요한 결정에 있어 우유부단한 경향이 있으며, 선택을 미루거나 타인의 결정에 따라가는 방식을 선택하기 쉽다. ' +
    '타인의 감정과 요구에 지나치게 동화되다 보면 자신의 에너지와 정체성이 점점 희미해질 수 있다. ' +
    '조심해야 할 것은 갈등을 피하기 위해 문제를 덮어두면 결국 더 큰 갈등으로 이어질 수 있다는 점이다. ' +
    '자신의 필요를 무시하고 타인에게 맞추는 것이 습관화되면 오랫동안 쌓인 불만이 갑작스럽게 터지거나 심한 무기력증으로 나타날 수 있다. ' +
    '성장의 방향은 자신의 존재와 의견이 소중함을 인식하고, 갈등을 두려워하지 않으면서 자신을 먼저 챙기는 용기를 기르는 것이다.',
  },
};

type Phase = 'intro' | 'test' | 'result';

const EnneagramTest = (): ReactElement => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<EnneaType, number>>({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
  const [result, setResult] = useState<EnneaType | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const calcResult = (s: Record<EnneaType, number>): EnneaType => {
    let best: EnneaType = 1;
    (Object.keys(s) as unknown as EnneaType[]).forEach((k) => {
      const key = Number(k) as EnneaType;
      if (s[key] > s[best]) best = key;
    });
    return best;
  };

  const handleAnswer = (score: number) => {
    setSelected(score);
    setTimeout(() => {
      const q = QUESTIONS[current];
      const newScores = { ...scores };
      newScores[q.type] += score;
      setScores(newScores);
      setSelected(null);
      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        setResult(calcResult(newScores));
        setPhase('result');
      }
    }, 250);
  };

  const reset = () => {
    setPhase('intro');
    setCurrent(0);
    setScores({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
    setResult(null);
    setSelected(null);
  };

  const progress = phase === 'test' ? Math.round((current / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[current];
  const info = result ? ENNEA_INFO[result] : null;

  return (
    <>
      <SEOHead title="에니어그램 테스트 | Suyoung's Secret" description="18문항으로 알아보는 에니어그램 성격 유형 테스트" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">에니어그램 · 9가지 유형</div>
          <h2>에니어그램 테스트</h2>
          <p>18문항으로 나의 에니어그램 유형을 알아보세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '620px', margin: '0 auto' }}>

          {phase === 'intro' && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>☯️</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                나의 에니어그램 유형은?
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                각 문항을 읽고 나와 얼마나 잘 맞는지 솔직하게 선택해 주세요.<br />
                정답은 없습니다. 가장 솔직한 반응이 가장 정확한 결과입니다.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                {(['9가지 에니어그램 유형', '18문항', '약 3분'] as const).map((badge) => (
                  <span key={badge} style={{
                    padding: '6px 14px', background: 'var(--bg-medium-gray)',
                    borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                    color: 'var(--text-secondary)', border: '1px solid var(--line)',
                  }}>{badge}</span>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => setPhase('test')}
                style={{ fontSize: '16px', padding: '14px 40px' }}>
                테스트 시작하기 →
              </button>
            </div>
          )}

          {phase === 'test' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>Q{current + 1} / {QUESTIONS.length}</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gold)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
                </div>
              </div>

              <div style={{
                padding: '32px 28px', background: 'var(--bg-white)',
                border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '20px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '14px' }}>
                  Q{String(current + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                  {q.q}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {CHOICES.map((c) => (
                  <button
                    key={c.score}
                    onClick={() => !selected && handleAnswer(c.score)}
                    disabled={!!selected}
                    style={{
                      padding: '16px 12px',
                      background: selected === c.score ? 'var(--bg-medium-gray)' : 'var(--bg-white)',
                      border: `2px solid ${selected === c.score ? 'var(--gold)' : 'var(--line)'}`,
                      borderRadius: '12px', cursor: 'pointer',
                      fontSize: '14px', fontWeight: 600,
                      color: selected === c.score ? 'var(--gold)' : 'var(--text-primary)',
                      transition: 'all 0.15s', fontFamily: 'inherit',
                      opacity: selected && selected !== c.score ? 0.4 : 1,
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'result' && info && result && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '16px' }}>
                  나의 에니어그램 유형
                </div>
                <div style={{
                  padding: '36px 28px', background: 'var(--bg-white)',
                  border: '2px solid var(--gold)', borderRadius: '20px', marginBottom: '20px',
                }}>
                  <div style={{ fontSize: '52px', marginBottom: '12px' }}>{info.symbol}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    유형 {result}
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {info.name}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {info.keyword}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '24px 28px', background: 'var(--bg-white)',
                border: '1px solid var(--line)', borderRadius: '16px', marginBottom: '16px',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  핵심 성향
                </div>
                <div style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {info.core.split('. ').filter(Boolean).map((sentence, i) => (
                    <p key={i} style={{ margin: '0 0 10px' }}>
                      {sentence.endsWith('.') ? sentence : sentence + '.'}
                    </p>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '20px 24px', background: 'var(--bg-medium-gray)',
                border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '28px',
              }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>9가지 에니어그램 유형 점수</strong>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {(Object.entries(scores) as [string, number][]).sort((a, b) => b[1] - a[1]).map(([t, s]) => {
                    const typeNum = Number(t) as EnneaType;
                    const isTop = typeNum === result;
                    return (
                      <span key={t} style={{
                        padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                        background: isTop ? 'var(--gold)' : 'var(--bg-white)',
                        color: isTop ? 'var(--bg-white)' : 'var(--text-secondary)',
                        border: `1px solid ${isTop ? 'var(--gold)' : 'var(--line)'}`,
                      }}>
                        {ENNEA_INFO[typeNum].name} {s}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={reset}>다시 테스트</button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default EnneagramTest;
