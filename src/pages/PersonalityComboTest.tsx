import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

type EnneaType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Dim = 'EI' | 'SN' | 'TF' | 'JP';

interface CombinedQ {
  id: number;
  q: string;
  a: string;
  b: string;
  mbti: { dim: Dim; aIsFirst: boolean }; // aIsFirst: true면 A=E/S/T/J
  aEnneagram: EnneaType[];
  bEnneagram: EnneaType[];
}

const QUESTIONS: CombinedQ[] = [
  {
    id: 1, q: '깊은 밤, 생각이 꽉 찰 때 나는?',
    a: '친구에게 메시지를 보내거나 SNS에 올린다',
    b: '혼자 일기를 쓰거나 생각 속에 잠긴다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [3, 7, 2], bEnneagram: [4, 5, 9],
  },
  {
    id: 2, q: '소중한 친구가 분명히 잘못된 선택을 하려 할 때',
    a: '논리적 문제점을 명확하게 짚어준다',
    b: '감정을 먼저 받아주고 조심스럽게 이야기한다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 5, 8], bEnneagram: [2, 4, 9],
  },
  {
    id: 3, q: '내일 자유 시간이 생겼다. 지금 하는 일은?',
    a: '하고 싶은 것들을 리스트로 만들어 계획을 세운다',
    b: '내일 일어나면 그때 기분 따라 결정하려 한다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 3, 6], bEnneagram: [7, 4, 9],
  },
  {
    id: 4, q: '낯선 도시 시장에서 처음 맡는 향기. 내가 먼저 하는 것은?',
    a: '어디서 나는 냄새인지 눈으로 직접 찾아본다',
    b: '그 향기가 불러오는 기억이나 이미지에 잠긴다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [1, 6, 8], bEnneagram: [4, 5, 7],
  },
  {
    id: 5, q: '오랜 친구 생일 파티, 아는 사람은 나 포함 셋뿐이다',
    a: '새로 온 사람들과 먼저 대화를 시작한다',
    b: '아는 셋과 더 깊은 대화를 이어간다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [2, 3, 7], bEnneagram: [5, 4, 6],
  },
  {
    id: 6, q: '팀 프로젝트에서 내가 훨씬 많은 일을 하고 있다는 걸 알았다',
    a: '역할 분담이 잘못됐다고 명확하게 말한다',
    b: '이번엔 그냥 하고, 다음에 관계를 고려해 조율한다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 8, 3], bEnneagram: [2, 9, 6],
  },
  {
    id: 7, q: '마감이 3일 남았다. 나의 상태는?',
    a: '이미 70% 이상 완성해 마무리 중이다',
    b: '이제부터 집중하면 충분하다고 생각한다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 6, 3], bEnneagram: [7, 8, 5],
  },
  {
    id: 8, q: '처음 가는 카페에서 메뉴를 고를 때',
    a: '평점 높고 가장 많이 팔린 것을 선택한다',
    b: '이름도 조합도 낯선 신메뉴에 도전한다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [6, 1, 9], bEnneagram: [7, 4, 5],
  },
  {
    id: 9, q: '중요한 발표 하루 전날 컨디션을 올리는 방법은?',
    a: '친구들을 만나거나 유쾌한 영상으로 기분을 올린다',
    b: '일찍 잠자리에 들며 혼자 정신을 가다듬는다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [7, 3, 2], bEnneagram: [5, 1, 6],
  },
  {
    id: 10, q: '중요한 결정을 내릴 때 가장 중요한 기준은?',
    a: '논리적으로 가장 합리적인 선택인가',
    b: '관련된 모든 사람이 수용할 수 있는 선택인가',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 5, 3], bEnneagram: [2, 9, 6],
  },
  {
    id: 11, q: '갑자기 예상치 못한 일정이 생겼을 때 나는?',
    a: '기존 계획이 흐트러져 당혹스럽다',
    b: '오히려 새로운 흐름에 유연하게 올라탄다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 6, 3], bEnneagram: [7, 8, 4],
  },
  {
    id: 12, q: '누군가의 이야기를 들을 때 나는?',
    a: '사실과 구체적 상황에 집중하며 듣는다',
    b: '그 이면의 감정이나 숨겨진 의미를 먼저 파악한다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [5, 6, 1], bEnneagram: [4, 2, 9],
  },
  {
    id: 13, q: '아이디어가 가장 잘 나오는 상황은?',
    a: '여러 사람과 대화하면서 자극받을 때',
    b: '혼자 조용히 생각에 잠겨있을 때',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [7, 3, 2], bEnneagram: [5, 4, 9],
  },
  {
    id: 14, q: '책상이나 작업 공간이 어수선할 때',
    a: '일하기 전에 먼저 정리해야 집중이 된다',
    b: '일하다 보면 자연스럽게 정리된다, 크게 신경 안 쓴다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 5, 6], bEnneagram: [7, 4, 8],
  },
  {
    id: 15, q: '5년 후 나의 미래를 생각할 때 더 자주 드는 생각은?',
    a: '그때쯤 어떤 직책·수입·성과를 갖고 싶다',
    b: '어떤 사람이 되어 있을지, 어떤 삶의 의미를 갖고 살지',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [3, 1, 6], bEnneagram: [4, 9, 2],
  },
  {
    id: 16, q: '오랜 혼자만의 시간 이후 나는?',
    a: '뭔가 놓친 것 같아 사람들을 만나고 싶어진다',
    b: '더 오래 혼자 있어도 괜찮을 것 같다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [2, 7, 3], bEnneagram: [5, 4, 9],
  },
  {
    id: 17, q: '누군가 나에 대해 틀린 소문을 퍼뜨리고 있다면?',
    a: '사실과 다르다는 것을 직접 명확하게 바로잡는다',
    b: '주변에 상황을 알리고 공감을 먼저 구한다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [1, 8, 3], bEnneagram: [2, 6, 9],
  },
  {
    id: 18, q: '드라마나 책을 볼 때 나는?',
    a: '결말을 먼저 확인하고 싶어서 검색하는 편이다',
    b: '스포일러를 철저히 피하고 흐름 그대로 즐긴다',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [3, 6, 1], bEnneagram: [4, 7, 9],
  },
  {
    id: 19, q: '지도 없이 새로운 동네를 걸을 때',
    a: '길을 잃지 않도록 방향 감각을 유지하며 걷는다',
    b: '어디로 가는지 몰라도 골목 탐험 자체가 즐겁다',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [1, 6, 8], bEnneagram: [4, 7, 5],
  },
  {
    id: 20, q: '긴 회의가 끝난 직후 나의 상태는?',
    a: '활발한 토론으로 에너지가 충전된 느낌이다',
    b: '많은 자극이 있어 혼자 조용히 쉬고 싶다',
    mbti: { dim: 'EI', aIsFirst: true },
    aEnneagram: [3, 7, 8], bEnneagram: [5, 4, 9],
  },
  {
    id: 21, q: '"강한 사람"이란 어떤 사람인가?',
    a: '어떤 상황에서도 감정에 흔들리지 않는 사람',
    b: '상처받으면서도 사람을 계속 사랑할 수 있는 사람',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [8, 1, 5], bEnneagram: [2, 4, 9],
  },
  {
    id: 22, q: '여행에서 가장 기억에 남는 순간은?',
    a: '계획한 대로 완벽하게 이루어졌을 때',
    b: '예상치 못한 우연이 만든 특별한 경험',
    mbti: { dim: 'JP', aIsFirst: true },
    aEnneagram: [1, 3, 6], bEnneagram: [7, 4, 8],
  },
  {
    id: 23, q: '어떤 사람의 이야기를 들을 때 먼저 눈에 띄는 것은?',
    a: '그 사람이 한 행동과 실제로 일어난 사실들',
    b: '그 사람이 미처 말하지 못한 감정이나 내면',
    mbti: { dim: 'SN', aIsFirst: true },
    aEnneagram: [5, 6, 1], bEnneagram: [4, 2, 9],
  },
  {
    id: 24, q: '나를 가장 잘 나타내는 한 문장은?',
    a: '나는 목표를 정하고, 그것을 반드시 이뤄낸다',
    b: '나는 내가 느끼는 것을 소중히 여기며 산다',
    mbti: { dim: 'TF', aIsFirst: true },
    aEnneagram: [3, 1, 8], bEnneagram: [4, 2, 9],
  },
];

const MBTI_LABELS: Record<string, string> = {
  INTJ: '전략가', INTP: '논리술사', ENTJ: '통솔자', ENTP: '변론가',
  INFJ: '옹호자', INFP: '중재자', ENFJ: '선도자', ENFP: '활동가',
  ISTJ: '현실주의자', ISFJ: '수호자', ESTJ: '경영자', ESFJ: '집정관',
  ISTP: '장인', ISFP: '모험가', ESTP: '사업가', ESFP: '연예인',
};

const ENNEA_INFO: Record<EnneaType, { symbol: string; name: string; core: string }> = {
  1: { symbol: '⚖️', name: '개혁가', core:
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
  2: { symbol: '💝', name: '조력가', core:
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
  3: { symbol: '🏆', name: '성취자', core:
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
  4: { symbol: '🎨', name: '개인주의자', core:
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
  5: { symbol: '🔍', name: '탐구자', core:
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
  6: { symbol: '🛡️', name: '충성가', core:
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
  7: { symbol: '🌈', name: '열정가', core:
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
  8: { symbol: '⚡', name: '도전자', core:
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
  9: { symbol: '☯️', name: '평화주의자', core:
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

const PersonalityComboTest = (): ReactElement => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [mbtiScores, setMbtiScores] = useState<Record<Dim, number>>({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const [ennScores, setEnnScores] = useState<Record<EnneaType, number>>({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
  const [mbtiResult, setMbtiResult] = useState('');
  const [ennResult, setEnnResult] = useState<EnneaType | null>(null);
  const [selected, setSelected] = useState<'A'|'B'|null>(null);

  const calcMbti = (scores: Record<Dim, number>): string => {
    const dimCounts: Record<Dim, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    QUESTIONS.forEach((q) => { dimCounts[q.mbti.dim]++; });
    const e = scores.EI >= dimCounts.EI / 2 ? 'E' : 'I';
    const s = scores.SN >= dimCounts.SN / 2 ? 'S' : 'N';
    const t = scores.TF >= dimCounts.TF / 2 ? 'T' : 'F';
    const j = scores.JP >= dimCounts.JP / 2 ? 'J' : 'P';
    return `${e}${s}${t}${j}`;
  };

  const calcEnn = (scores: Record<EnneaType, number>): EnneaType => {
    let best: EnneaType = 1;
    (Object.keys(scores) as unknown as EnneaType[]).forEach((k) => {
      const key = Number(k) as EnneaType;
      if (scores[key] > scores[best]) best = key;
    });
    return best;
  };

  const handleAnswer = (choice: 'A' | 'B') => {
    setSelected(choice);
    setTimeout(() => {
      const q = QUESTIONS[current];
      const newMbti = { ...mbtiScores };
      if ((choice === 'A' && q.mbti.aIsFirst) || (choice === 'B' && !q.mbti.aIsFirst)) {
        newMbti[q.mbti.dim]++;
      }
      const newEnn = { ...ennScores };
      const types = choice === 'A' ? q.aEnneagram : q.bEnneagram;
      types.forEach((t) => { newEnn[t] += 2; });

      setMbtiScores(newMbti);
      setEnnScores(newEnn);
      setSelected(null);

      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        setMbtiResult(calcMbti(newMbti));
        setEnnResult(calcEnn(newEnn));
        setPhase('result');
      }
    }, 280);
  };

  const reset = () => {
    setPhase('intro');
    setCurrent(0);
    setMbtiScores({ EI: 0, SN: 0, TF: 0, JP: 0 });
    setEnnScores({ 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 });
    setMbtiResult('');
    setEnnResult(null);
    setSelected(null);
  };

  const progress = phase === 'test' ? Math.round(((current) / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[current];
  const ennInfo = ennResult ? ENNEA_INFO[ennResult] : null;

  const cardStyle = (choice: 'A'|'B'): React.CSSProperties => ({
    display: 'flex', alignItems: 'flex-start', gap: '14px',
    padding: '18px 20px',
    background: selected === choice ? 'var(--bg-medium-gray)' : 'var(--bg-white)',
    border: `2px solid ${selected === choice ? 'var(--gold)' : 'var(--line)'}`,
    borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
    fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500,
    lineHeight: 1.5, transition: 'all 0.15s', fontFamily: 'inherit', width: '100%',
    opacity: selected && selected !== choice ? 0.4 : 1,
  });

  return (
    <>
      <SEOHead title="통합 성격 테스트 | Suyoung's Secret" description="MBTI와 에니어그램을 한 번에 측정하는 24문항 통합 성격 테스트" />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">MBTI · 에니어그램 · 통합 테스트</div>
          <h2>통합 성격 테스트</h2>
          <p>24문항으로 MBTI와 에니어그램을 동시에 알아보세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container" style={{ maxWidth: '660px', margin: '0 auto' }}>

          {phase === 'intro' && (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>🧬</div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                나는 어떤 사람인가?
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                24개의 유니크한 질문을 통해<br />
                <strong style={{ color: 'var(--gold)' }}>MBTI 4글자</strong>와 <strong style={{ color: 'var(--gold)' }}>에니어그램 유형</strong>을<br />
                동시에 측정합니다. 정답은 없습니다.<br />
                가장 솔직한 반응이 가장 정확한 결과입니다.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                {(['MBTI 16가지 유형', '에니어그램 9가지 유형', '24문항', '약 5분'] as const).map((badge) => (
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
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                  {q.q}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(['A', 'B'] as const).map((choice) => (
                  <button key={choice} onClick={() => !selected && handleAnswer(choice)} style={cardStyle(choice)}
                    disabled={!!selected}>
                    <span style={{
                      minWidth: '28px', height: '28px', borderRadius: '50%',
                      background: selected === choice ? 'var(--gold)' : 'var(--bg-medium-gray)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '12px',
                      color: selected === choice ? 'var(--bg-white)' : 'var(--text-secondary)',
                      flexShrink: 0, transition: 'all 0.15s',
                    }}>{choice}</span>
                    {choice === 'A' ? q.a : q.b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'result' && ennInfo && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '24px' }}>
                  나의 통합 성격 유형
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    padding: '28px 20px', background: 'var(--bg-white)',
                    border: '2px solid var(--gold)', borderRadius: '16px',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>MBTI</div>
                    <div style={{ fontSize: '40px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '8px' }}>{mbtiResult}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>{MBTI_LABELS[mbtiResult] || ''}</div>
                  </div>
                  <div style={{
                    padding: '28px 20px', background: 'var(--bg-white)',
                    border: '2px solid var(--gold)', borderRadius: '16px',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '10px' }}>에니어그램</div>
                    <div style={{ fontSize: '36px', lineHeight: 1, marginBottom: '6px' }}>{ennInfo.symbol}</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>유형 {ennResult}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{ennInfo.name}</div>
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
                  {ennInfo.core.split('. ').filter(Boolean).map((sentence, i) => (
                    <p key={i} style={{ margin: '0 0 10px' }}>
                      {sentence.endsWith('.') ? sentence : sentence + '.'}
                    </p>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '20px 24px', background: 'var(--bg-medium-gray)',
                border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '28px',
                fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7,
              }}>
                💡 <strong style={{ color: 'var(--text-primary)' }}>MBTI+에니어그램 조합 분석</strong>에서 두 유형이 만날 때 어떤 독특한 성격이 나타나는지 자세히 확인해보세요.
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={reset}>다시 테스트</button>
                <Link className="btn btn-outline" to="/mbti/enneagram">
                  {mbtiResult}+에니어그램{ennResult} 조합 보기
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default PersonalityComboTest;
