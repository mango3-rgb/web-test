import { useState } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const ENNEA_TYPES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ENNEA_NAMES: Record<number, string> = {
  1: '개혁가',
  2: '조력가',
  3: '성취자',
  4: '개인주의자',
  5: '탐구자',
  6: '충성가',
  7: '열정가',
  8: '도전자',
  9: '평화주의자',
};

interface ComboProfile {
  title: string;
  keywords: string[];
  traits: string;
  strengths: string[];
  relationship: string;
  growth: string;
  careers: string[];
}

type MbtiGroup = 'NT' | 'NF' | 'SJ' | 'SP';

function getMbtiGroup(mbti: string): MbtiGroup {
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(mbti)) return 'NT';
  if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(mbti)) return 'NF';
  if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(mbti)) return 'SJ';
  return 'SP';
}

const COMBO_DATA: Record<MbtiGroup, Record<number, ComboProfile>> = {
  NT: {
    1: {
      title: '완벽주의 전략가',
      keywords: ['비판적 사고', '원칙주의', '체계적 개혁'],
      traits:
        '높은 기준을 갖고 세상을 분석적으로 바라보며, 논리적 완벽함을 추구합니다. 단순한 이상에서 그치지 않고 실질적인 체계와 원칙으로 변화를 만들어내려는 강한 의지를 지닙니다. 오류와 모순을 즉각 포착하고, 이를 개선하는 데 에너지를 쏟습니다.',
      strengths: ['비판적 사고와 논리 분석', '원칙에 근거한 의사결정', '전략적 기획과 실행'],
      relationship:
        '파트너에게 높은 기준을 기대하는 경향이 있어, 때로는 비판적으로 보일 수 있습니다. 그러나 진심 어린 신뢰를 쌓으면 든든하고 지적인 동반자가 됩니다.',
      growth: '완벽하지 않아도 괜찮다는 것을 받아들이고, 타인의 다른 방식을 존중하는 유연함을 키워야 합니다.',
      careers: ['시스템 분석가', '법조인', '연구원'],
    },
    2: {
      title: '지식 멘토',
      keywords: ['교육 능력', '논리적 공감', '지식 나눔'],
      traits:
        '탁월한 분석력에 타인을 향한 따뜻한 돌봄이 더해져, 지식으로 사람들을 이끄는 리더십을 발휘합니다. 가르치고 나누는 행위에서 깊은 보람을 느끼며, 논리와 감성을 균형 있게 활용합니다. 복잡한 개념을 쉽게 풀어내는 탁월한 능력을 지닙니다.',
      strengths: ['체계적 교육 능력', '분석적 통찰', '공감 기반 소통'],
      relationship:
        '상대방의 성장을 진심으로 응원하며, 지식과 경험을 아낌없이 나눕니다. 관계에서 멘토 역할을 자연스럽게 맡게 됩니다.',
      growth: '타인을 돕는 것이 자신의 필요에서 비롯된 것인지 돌아보고, 자신의 감정도 충분히 돌볼 줄 알아야 합니다.',
      careers: ['교수', '컨설턴트', '코치'],
    },
    3: {
      title: '목표달성 전략가',
      keywords: ['목표 설정', '전략적 실행', '효율의 달인'],
      traits:
        '강한 성취욕과 날카로운 분석력이 결합하여 어떤 목표든 효율적으로 달성해냅니다. 결과 지향적이면서도 치밀한 계획을 세우고, 자원을 최적으로 배분하는 능력이 뛰어납니다. 성공에 대한 명확한 비전을 갖고 흔들림 없이 나아갑니다.',
      strengths: ['구체적 목표 설정', '전략적 사고와 계획', '강력한 실행력'],
      relationship:
        '목표를 공유하는 파트너와 강한 팀을 이룹니다. 관계에서도 성장과 발전을 중요하게 여깁니다.',
      growth: '성취에만 집중하다 보면 과정과 관계를 소홀히 할 수 있습니다. 결과 너머의 의미와 사람에게도 눈을 돌려야 합니다.',
      careers: ['CEO', '기업 전략가', '프로젝트 매니저'],
    },
    4: {
      title: '독창적 사상가',
      keywords: ['창의성', '지적 통찰', '독창적 철학'],
      traits:
        '깊은 감성과 탁월한 지적 능력이 어우러져 독창적인 세계관을 만들어냅니다. 남들이 보지 못하는 연결고리를 발견하고, 이를 철학적·예술적으로 표현하는 데 탁월합니다. 자신만의 관점과 미학을 끊임없이 탐구하며 깊이 있는 작품을 만들어냅니다.',
      strengths: ['창의적이고 독창적인 사고', '깊은 통찰력과 직관', '자기만의 독특한 표현 방식'],
      relationship:
        '깊이 있는 교류를 선호하며, 표면적인 관계에는 쉽게 흥미를 잃습니다. 진정으로 이해해주는 소수와 깊은 유대를 맺습니다.',
      growth: '자신의 감정에 지나치게 몰입하거나 고립될 수 있습니다. 현실과의 연결을 유지하며 생각을 행동으로 옮기는 훈련이 필요합니다.',
      careers: ['작가', '연구자', '철학자'],
    },
    5: {
      title: '지식의 달인',
      keywords: ['전문 지식', '독립적 사고', '탐구 극대화'],
      traits:
        '타고난 탐구욕과 분석력이 극대화되어 특정 분야의 최고 전문가로 성장합니다. 혼자서 깊이 파고드는 집중력이 탁월하며, 방대한 지식 체계를 구축하는 데 남다른 능력을 발휘합니다. 배움 그 자체에서 가장 큰 만족을 느끼는 지적 탐험가입니다.',
      strengths: ['폭넓고 깊은 전문 지식', '철저한 논리적 분석', '독립적이고 자율적인 사고'],
      relationship:
        '지적 대화를 나눌 수 있는 상대를 가장 소중하게 여깁니다. 혼자만의 공간과 시간을 필요로 하며, 이를 이해해주는 파트너와 잘 맞습니다.',
      growth: '지식을 쌓는 것에 집중한 나머지 행동과 관계를 회피하는 경향을 극복해야 합니다. 아는 것을 나누고 실천하는 용기가 필요합니다.',
      careers: ['과학자', '데이터 분석가', 'IT 전문가'],
    },
    6: {
      title: '신중한 전략가',
      keywords: ['예측 분석', '신중한 판단', '리스크 관리'],
      traits:
        '분석적 사고와 안전을 추구하는 성향이 결합하여 최고의 리스크 관리자가 됩니다. 잠재적 위험을 미리 파악하고 대비책을 마련하는 데 탁월하며, 신뢰할 수 있는 시스템과 원칙을 구축하는 것을 중요하게 생각합니다. 조직에서 없어서는 안 될 안전판 역할을 합니다.',
      strengths: ['정밀한 예측 및 분석', '신중하고 균형 잡힌 판단', '충성심과 신뢰성'],
      relationship:
        '한번 신뢰를 쌓으면 매우 헌신적이고 믿음직한 파트너가 됩니다. 그러나 새로운 관계에서는 상대를 면밀히 관찰하며 천천히 문을 엽니다.',
      growth: '지나친 불안과 의심이 행동을 막을 수 있습니다. 내면의 두려움과 마주하고, 불확실성을 받아들이는 연습이 필요합니다.',
      careers: ['리스크 관리자', '감사', '보안 전문가'],
    },
    7: {
      title: '창의적 혁신가',
      keywords: ['창의성', '다재다능', '아이디어 발전'],
      traits:
        '광범위한 관심사와 탐구욕이 결합하여 새로운 가능성을 끊임없이 발굴합니다. 기존의 틀을 깨는 혁신적인 아이디어를 쏟아내며, 다양한 분야를 넘나드는 연결 능력이 탁월합니다. 지루함을 거부하고 항상 새로운 자극을 추구하는 에너지 넘치는 혁신가입니다.',
      strengths: ['폭발적인 창의성과 상상력', '다분야에 걸친 다재다능함', '혁신적 아이디어 생성'],
      relationship:
        '관계에 활력과 신선함을 불어넣는 스타일입니다. 다만 깊이보다 넓이를 선호하는 경향 때문에 지속적인 헌신이 어려울 수 있습니다.',
      growth: '다양한 아이디어에 분산되어 하나를 끝까지 마무리하지 못하는 경향을 극복해야 합니다. 집중과 완수의 능력을 키워나가야 합니다.',
      careers: ['기업가', '연구개발 전문가', '크리에이터'],
    },
    8: {
      title: '카리스마 리더',
      keywords: ['강력한 리더십', '결단력', '전략적 지배력'],
      traits:
        '강한 의지력과 전략적 두뇌가 결합하여 압도적인 카리스마를 발휘합니다. 목표를 향한 돌진력과 거침없는 추진력으로 조직을 이끄는 타고난 지도자입니다. 불의에 맞서는 용기와 약자를 보호하려는 강인한 책임감도 지니고 있습니다.',
      strengths: ['강력하고 설득력 있는 리더십', '순간적인 결단력과 실행력', '빈틈없는 전략적 사고'],
      relationship:
        '강렬하고 직접적인 방식으로 관계를 맺으며, 자신이 신뢰하는 사람에게는 절대적인 보호와 헌신을 보냅니다.',
      growth: '통제 욕구와 대립적 성향이 관계를 해칠 수 있습니다. 취약함을 드러내는 용기와 타인에게 권한을 위임하는 법을 배워야 합니다.',
      careers: ['CEO', '정치인', '군사 전략가'],
    },
    9: {
      title: '조화로운 사상가',
      keywords: ['깊은 통찰', '포용력', '지혜로운 중재'],
      traits:
        '날카로운 지적 통찰과 넓은 포용력이 어우러져 다양한 시각을 아우르는 현명한 사상가입니다. 갈등을 분석적으로 이해하면서도 모든 입장을 공정하게 바라보는 능력이 탁월하며, 깊은 지혜로 주변 사람들에게 평화와 방향을 제시합니다.',
      strengths: ['복합적 상황을 꿰뚫는 통찰력', '다양한 관점을 아우르는 포용성', '갈등 속에서 조화를 만드는 능력'],
      relationship:
        '갈등을 피하면서도 깊은 이해를 바탕으로 관계를 조율합니다. 상대방이 편하게 자신을 표현할 수 있는 안전한 공간을 만들어줍니다.',
      growth: '과도한 타협으로 자신의 의견과 필요를 억누르는 경향이 있습니다. 자신의 목소리를 당당하게 내는 연습이 필요합니다.',
      careers: ['중재자', '철학자', '상담 전문가'],
    },
  },
  NF: {
    1: {
      title: '이상을 향한 개혁자',
      keywords: ['공감 능력', '비전 제시', '인류를 위한 원칙'],
      traits:
        '깊은 공감력과 원칙에 대한 강한 신념이 결합하여 세상을 더 나은 곳으로 만들려는 강렬한 사명감을 지닙니다. 인류의 고통에 민감하게 반응하며, 불의에 맞서 이상적인 세계를 향한 비전을 실천하려 합니다. 감성과 원칙이 함께 움직이는 변화의 촉진자입니다.',
      strengths: ['섬세하고 깊은 공감 능력', '확고한 원칙과 가치관', '감동을 주는 비전 제시력'],
      relationship:
        '상대방의 내면 깊은 곳까지 이해하려 하며, 진정성 있는 교류를 중시합니다. 관계에서 높은 이상을 기대하기 때문에 실망하기도 쉽습니다.',
      growth: '세상의 불완전함에 지나치게 좌절하지 않도록 자신을 보호해야 합니다. 완벽한 이상보다 지금 할 수 있는 것에 집중하는 균형이 필요합니다.',
      careers: ['사회 개혁가', 'NGO 활동가', '교육자'],
    },
    2: {
      title: '순수한 헌신가',
      keywords: ['이타적 사랑', '치유 능력', '무한 공감'],
      traits:
        '인간에 대한 깊은 사랑과 공감 능력이 극대화된 이타적 존재입니다. 상대방의 아픔을 자신의 것처럼 느끼며, 도움을 주는 것에서 삶의 의미를 찾습니다. 따뜻한 존재감만으로도 주변 사람들을 치유하는 힘을 지니고 있습니다.',
      strengths: ['타의 추종을 불허하는 공감 능력', '진심 어린 헌신과 봉사 정신', '상처받은 마음을 치유하는 능력'],
      relationship:
        '관계에서 아낌없이 주는 스타일이지만, 그만큼 인정과 감사를 바라는 마음도 있습니다. 주고받는 균형을 인식하는 것이 중요합니다.',
      growth: '지나친 자기희생으로 스스로를 소진할 위험이 있습니다. 자신의 필요도 소중하다는 것을 인식하고, 건강한 경계를 설정해야 합니다.',
      careers: ['상담사', '간호사', '사회복지사'],
    },
    3: {
      title: '영감을 주는 리더',
      keywords: ['감성적 카리스마', '동기 부여', '영감 전달'],
      traits:
        '풍부한 감성과 강한 성취욕이 결합하여 사람들에게 깊은 영감을 주는 리더십을 발휘합니다. 자신의 이야기와 비전으로 사람들의 마음을 움직이며, 공감과 설득을 통해 집단을 하나로 이끄는 탁월한 능력을 지닙니다. 무대 위에서 빛을 발하는 천생 스피커입니다.',
      strengths: ['사람의 마음을 움직이는 동기 부여 능력', '영감을 불어넣는 스토리텔링', '감성과 논리를 잇는 소통 능력'],
      relationship:
        '주변 사람들을 끌어당기는 매력이 있으며, 관계에서 활력과 목적의식을 불어넣습니다. 진정성 있는 감정 표현을 통해 깊은 신뢰를 쌓습니다.',
      growth: '이미지와 성취에 집착하다 보면 내면의 진짜 감정을 외면하게 됩니다. 성취 너머의 진정한 자아와 연결되는 시간을 가져야 합니다.',
      careers: ['강연가', '작가', '인플루언서'],
    },
    4: {
      title: '감성 예술가',
      keywords: ['깊은 감수성', '창의적 자기표현', '고유한 존재'],
      traits:
        '극도로 발달한 내면 세계와 창의성이 결합하여 독보적인 예술적 감수성을 지닙니다. 자신의 감정과 경험을 깊이 탐구하고, 이를 예술적 언어로 표현하는 데 탁월합니다. 평범함을 거부하고 세상에 단 하나뿐인 자신만의 작품과 관점을 창조합니다.',
      strengths: ['누구도 따라올 수 없는 창의성', '깊고 섬세한 감수성', '진정성 있는 자기표현'],
      relationship:
        '강렬하고 깊은 감정적 유대를 원하며, 상대방이 자신의 내면 세계를 진심으로 이해해주길 바랍니다. 오해받는다고 느낄 때 깊이 상처받습니다.',
      growth: '자신의 감정에 지나치게 몰입하여 현실과 단절되거나 비교와 질투에 갇힐 수 있습니다. 감정을 넘어 행동으로 나아가는 용기가 필요합니다.',
      careers: ['예술가', '작가', '심리 상담사'],
    },
    5: {
      title: '심오한 통찰가',
      keywords: ['영적 탐구', '감성과 지식의 융합', '깊은 통찰'],
      traits:
        '풍부한 감성과 지적 탐구욕이 하나로 합쳐져 인간 존재의 깊은 의미를 탐구합니다. 심리, 철학, 영성에 대한 깊은 관심을 바탕으로 남다른 통찰을 발휘하며, 복잡한 인간 감정을 학문적으로 이해하고 표현하는 능력이 탁월합니다.',
      strengths: ['인간 심리를 꿰뚫는 통찰력', '감성과 지성의 균형 잡힌 융합', '깊이 있는 학문적 탐구심'],
      relationship:
        '상대방의 무의식과 내면 동기까지 이해하려는 깊은 관심을 보입니다. 그러나 지나친 분석이 관계를 차갑게 만들 수 있음을 유의해야 합니다.',
      growth: '지식과 통찰을 쌓는 것에서 그치지 않고, 이를 타인과 나누고 실제 삶에 적용하는 적극성을 키워야 합니다.',
      careers: ['심리학자', '작가', '연구자'],
    },
    6: {
      title: '충성스러운 이상주의자',
      keywords: ['깊은 신뢰', '가치 기반 헌신', '충성스러운 동반자'],
      traits:
        '이상주의적 가치관과 강한 충성심이 결합하여 믿음직한 동반자로서의 삶을 살아갑니다. 자신이 믿는 가치와 공동체를 위해 헌신하며, 신뢰 관계를 무엇보다 소중하게 여깁니다. 불의에 맞서는 용기와 약자를 위한 따뜻한 지지를 동시에 지닌 존재입니다.',
      strengths: ['깊고 변하지 않는 충성심', '섬세한 공감과 배려', '강한 가치 기반의 신뢰감'],
      relationship:
        '한번 맺은 관계를 소중히 지키며, 파트너의 든든한 버팀목이 됩니다. 배신에 매우 민감하게 반응할 수 있습니다.',
      growth: '과도한 불안과 의존이 관계를 무겁게 만들 수 있습니다. 자신에 대한 믿음을 키우고, 홀로 서는 능력을 길러야 합니다.',
      careers: ['교사', '사회 운동가', '상담사'],
    },
    7: {
      title: '열정적 비전가',
      keywords: ['넘치는 영감', '열정과 창의', '이상적 에너지'],
      traits:
        '이상주의적 꿈과 열정적인 에너지가 합쳐져 주변을 밝히는 영감의 원천이 됩니다. 가능성을 어디서나 발견하고, 사람들에게 희망과 설렘을 불어넣는 타고난 에너지를 지닙니다. 제약보다는 가능성에 집중하며, 새로운 것을 배우고 경험하는 데서 끝없는 기쁨을 찾습니다.',
      strengths: ['강렬한 영감과 동기 부여 능력', '끝없이 솟아나는 열정과 창의력', '새로운 가능성을 발견하는 눈'],
      relationship:
        '관계에 생동감과 즐거움을 가져다주며, 파트너가 더 넓은 세상을 꿈꾸게 만드는 힘이 있습니다. 다만 깊은 헌신보다 새로운 자극을 쫓는 경향을 주의해야 합니다.',
      growth: '다양한 관심사로 분산되어 하나를 깊이 파고드는 것이 어렵습니다. 이상을 현실로 만드는 지속적인 실천력을 키워야 합니다.',
      careers: ['코치', '크리에이터', '교육 기업가'],
    },
    8: {
      title: '정의로운 투사',
      keywords: ['강인한 공감', '정의감', '약자를 위한 전사'],
      traits:
        '뜨거운 공감 능력과 강철 같은 의지가 결합하여 약자를 위해 싸우는 정의로운 전사로 살아갑니다. 불의를 목격하면 즉각 행동하며, 두려움 없이 권력에 맞서는 용기를 지닙니다. 강인함 뒤에 깊은 사랑이 숨어 있는, 힘 있는 이상주의자입니다.',
      strengths: ['불의에 맞서는 강한 정의감', '공감을 행동으로 이어지는 실천력', '두려움 없는 용기'],
      relationship:
        '깊이 사랑하는 사람들을 강하게 보호하며, 그들을 위해서라면 어떤 어려움도 감수합니다. 강렬한 감정 표현이 때로 압도감을 줄 수 있습니다.',
      growth: '분노와 통제 욕구를 건강하게 다스리는 법을 배워야 합니다. 강함 뒤의 취약함을 인정하고 표현하는 용기가 필요합니다.',
      careers: ['인권 변호사', '사회 활동가', '지도자'],
    },
    9: {
      title: '따뜻한 평화 중재자',
      keywords: ['깊은 포용', '공감과 조화', '치유의 존재'],
      traits:
        '섬세한 공감력과 평화를 사랑하는 마음이 합쳐져 주변의 갈등을 자연스럽게 녹이는 치유자가 됩니다. 모든 사람의 입장을 깊이 이해하며, 따뜻하고 넉넉한 품으로 지친 마음들을 감싸 안습니다. 말 한마디보다 존재 자체로 위로를 전하는 사람입니다.',
      strengths: ['모든 것을 품어내는 포용력', '상처받은 마음을 치유하는 공감 능력', '어디서든 조화를 만드는 능력'],
      relationship:
        '상대방이 충분히 안전하고 편안함을 느낄 수 있는 공간을 만들어줍니다. 갈등을 지나치게 회피하여 자신의 욕구를 억누르는 경향에 주의해야 합니다.',
      growth: '지나친 수동성에서 벗어나 자신이 원하는 것을 명확히 하고, 적극적으로 표현하고 추구하는 능력을 길러야 합니다.',
      careers: ['상담사', '중재자', '교육자'],
    },
  },
  SJ: {
    1: {
      title: '체계적 완벽주의자',
      keywords: ['체계적 책임감', '원칙 준수', '신뢰의 기둥'],
      traits:
        '철저한 원칙주의와 강한 책임감이 결합하여 조직의 신뢰받는 기둥이 됩니다. 어떤 상황에서도 규칙과 절차를 충실히 따르며, 높은 기준으로 자신과 타인을 관리합니다. 실수 없는 정확함을 추구하며 주변 사람들에게 안정감을 제공합니다.',
      strengths: ['빈틈없는 체계적 업무 처리', '원칙에 기반한 일관된 행동', '높은 수준의 책임감'],
      relationship:
        '믿을 수 있고 안정적인 파트너입니다. 다만 상대방에게도 높은 기준을 기대하는 경향이 있어 융통성이 부족하게 보일 수 있습니다.',
      growth: '완벽을 향한 집착이 자신과 타인에게 스트레스를 줄 수 있습니다. 충분히 좋은 것을 인정하고 너그러움을 실천해야 합니다.',
      careers: ['회계사', '관리자', '감사관'],
    },
    2: {
      title: '헌신적 지지자',
      keywords: ['믿음직한 책임감', '따뜻한 돌봄', '충성스러운 후원'],
      traits:
        '강한 책임감과 진심 어린 돌봄이 결합하여 주변 사람들의 든든한 버팀목이 됩니다. 약속을 반드시 지키고, 도움이 필요한 사람에게 먼저 손을 내밀며, 실질적인 지원을 아끼지 않습니다. 말보다 행동으로 사랑을 표현하는 신뢰받는 지지자입니다.',
      strengths: ['변함없는 책임감과 성실함', '실질적이고 따뜻한 돌봄', '깊고 변하지 않는 충성심'],
      relationship:
        '안정적이고 예측 가능한 관계를 만들어가며, 파트너의 필요를 세심하게 파악하고 채워줍니다. 감사 표현을 받지 못할 때 마음이 지칠 수 있습니다.',
      growth: '타인을 위한 헌신에 집중하다 자신의 필요를 간과하기 쉽습니다. 자신의 감정을 솔직하게 표현하는 연습이 필요합니다.',
      careers: ['간호사', '교사', '행정 관리자'],
    },
    3: {
      title: '목표달성형 관리자',
      keywords: ['체계적 목표 관리', '실행력', '조직적 성취'],
      traits:
        '강한 성취욕과 체계적인 관리 능력이 합쳐져 조직을 효율적으로 이끄는 관리자가 됩니다. 목표를 세우고, 자원을 조직하고, 계획대로 실행하는 능력이 탁월합니다. 결과에 대한 책임을 중요하게 여기며, 팀을 이끌어 목표를 달성하는 데 강점을 발휘합니다.',
      strengths: ['정밀한 목표 설정과 관리', '체계적인 계획 수립 및 실행', '팀을 이끄는 조직력'],
      relationship:
        '역할과 기대치를 명확히 하는 것을 좋아하며, 관계에서도 실용적이고 성실합니다. 감정적인 면보다 기능적인 면에서 관계를 바라보는 경향이 있습니다.',
      growth: '성취와 인정에 지나치게 집착하다 보면 진정성 있는 자아를 잃을 수 있습니다. 결과보다 과정과 관계에 의미를 두는 연습이 필요합니다.',
      careers: ['관리자', '행정가', '인사 담당자'],
    },
    4: {
      title: '전통 속의 개성',
      keywords: ['안정 속 독창성', '전통과 개성의 조화', '책임 있는 표현'],
      traits:
        '안정과 전통을 존중하는 성격 안에 독특한 감성과 개성이 숨어 있습니다. 겉으로는 신중하고 안정적으로 보이지만, 내면에는 풍부한 감수성과 독창적인 미적 감각을 지니고 있습니다. 책임감 있게 자신만의 독특한 색을 세상에 드러냅니다.',
      strengths: ['안정감과 독창성의 균형', '섬세한 감수성과 미적 감각', '책임감 있는 창의적 표현'],
      relationship:
        '겉보기에 차분하지만 내면에서 깊은 감정적 교류를 갈망합니다. 이해받는다고 느낄 때 훨씬 개방적인 모습을 보여줍니다.',
      growth: '안전함을 중시한 나머지 진정한 자기표현을 억누르기 쉽습니다. 자신의 독특함을 더욱 당당하게 드러내는 용기가 필요합니다.',
      careers: ['큐레이터', '디자이너', '작가'],
    },
    5: {
      title: '전문가형 학자',
      keywords: ['전문성', '체계적 지식', '신뢰할 수 있는 전문가'],
      traits:
        '체계적인 지식 탐구와 강한 책임감이 결합하여 자신의 분야에서 최고의 전문가로 성장합니다. 철저한 공부와 검증을 통해 신뢰할 수 있는 지식을 쌓으며, 이를 바탕으로 정확하고 권위 있는 판단을 내립니다. 책임감과 전문성이 신뢰를 만드는 학자형 인물입니다.',
      strengths: ['깊고 신뢰할 수 있는 전문 지식', '체계적이고 꼼꼼한 접근 방식', '책임감 있는 전문가적 태도'],
      relationship:
        '자신의 분야에 대한 자부심이 강하며, 지적 교류를 소중히 여깁니다. 관계에서도 신뢰와 전문성을 바탕으로 안정적인 유대를 쌓습니다.',
      growth: '지나친 완벽주의와 과도한 준비가 행동을 지연시킬 수 있습니다. 불완전하더라도 시작하고 시도하는 용기가 필요합니다.',
      careers: ['교수', '의사', '법률 전문가'],
    },
    6: {
      title: '안전 지향 보호자',
      keywords: ['충성과 신뢰', '안전 수호', '공동체 수호자'],
      traits:
        '강한 충성심과 안전에 대한 깊은 책임감이 결합하여 공동체를 지키는 든든한 수호자가 됩니다. 맡은 바를 철저히 수행하며, 규칙과 질서를 통해 모두가 안전할 수 있는 환경을 만듭니다. 예측 가능하고 믿음직한 행동으로 주변에 안정감을 줍니다.',
      strengths: ['강철 같은 충성심과 책임감', '안전과 질서를 만드는 능력', '신뢰받는 일관된 행동'],
      relationship:
        '헌신적이고 믿음직한 파트너로서, 어떤 상황에서도 함께하는 든든함을 제공합니다. 변화와 불확실성을 두려워하는 편입니다.',
      growth: '지나친 불안과 규칙에 대한 집착이 융통성을 저하시킬 수 있습니다. 변화를 위협이 아닌 성장의 기회로 바라보는 시각이 필요합니다.',
      careers: ['경찰', '군인', '공무원'],
    },
    7: {
      title: '즐거운 현실주의자',
      keywords: ['실용적 긍정성', '계획과 활력', '긍정적 관리자'],
      traits:
        '실용적인 관리 능력과 긍정적인 에너지가 결합하여 조직에 활력을 불어넣는 관리자입니다. 할 일을 즐겁게 만드는 능력이 있으며, 현실적인 계획 안에서 최대한의 즐거움을 찾아냅니다. 분위기를 밝게 만들면서도 책임감 있게 업무를 완수합니다.',
      strengths: ['긍정적이고 실용적인 실행력', '환경을 밝히는 활력과 에너지', '체계적이면서도 유연한 계획 능력'],
      relationship:
        '관계에 즐거움과 활력을 가져다주며, 함께 있으면 기분이 좋아집니다. 갈등이나 부정적인 감정을 회피하려는 경향을 주의해야 합니다.',
      growth: '즐거움을 쫓다가 책임져야 할 어려운 문제들을 미룰 수 있습니다. 불편한 것과 정면으로 마주하는 용기를 길러야 합니다.',
      careers: ['이벤트 기획자', '영업 관리자', '서비스 전문가'],
    },
    8: {
      title: '강인한 보호자',
      keywords: ['강한 보호 본능', '책임 있는 리더십', '믿음직한 방패'],
      traits:
        '강한 책임감과 불굴의 의지가 결합하여 공동체와 가족을 위한 강인한 보호자가 됩니다. 어떤 어려움에도 굴하지 않고 사랑하는 사람들을 지키며, 실질적인 행동으로 안전을 만들어냅니다. 강인함 뒤에는 깊은 책임과 사랑이 자리하고 있습니다.',
      strengths: ['흔들리지 않는 보호 본능', '어떤 상황에서도 발휘되는 리더십', '확고한 책임감과 실행력'],
      relationship:
        '사랑하는 사람을 위해서라면 어떤 것도 감수하며, 강한 보호와 헌신을 표현합니다. 지나친 통제가 관계를 억압할 수 있음을 주의해야 합니다.',
      growth: '힘으로 모든 것을 해결하려는 경향에서 벗어나, 취약함을 인정하고 타인의 도움을 받아들이는 법을 배워야 합니다.',
      careers: ['경영자', '군 지휘관', '소방관'],
    },
    9: {
      title: '안정적 평화주의자',
      keywords: ['안정과 조화', '든든한 기반', '신뢰받는 평화'],
      traits:
        '강한 책임감과 조화를 사랑하는 마음이 결합하여 어느 집단에서나 안정적인 기반이 됩니다. 갈등을 조용히 중재하고, 모두가 편안함을 느낄 수 있는 환경을 만드는 데 탁월합니다. 예측 가능하고 믿음직한 행동으로 공동체의 중심 역할을 합니다.',
      strengths: ['안정적이고 일관된 신뢰감', '갈등을 부드럽게 해소하는 능력', '모두를 포용하는 조화로운 성품'],
      relationship:
        '갈등 없는 평화로운 관계를 추구하며, 파트너에게 안정감과 편안함을 제공합니다. 자신의 필요를 지나치게 억누르는 경향을 주의해야 합니다.',
      growth: '갈등 회피로 인해 중요한 문제들이 쌓일 수 있습니다. 불편하더라도 자신의 생각과 필요를 표현하는 적극성이 필요합니다.',
      careers: ['상담사', '행정가', '교육자'],
    },
  },
  SP: {
    1: {
      title: '즉흥적 완벽주의자',
      keywords: ['즉각 대응', '현장 완벽주의', '실용적 탁월함'],
      traits:
        '현장에서 최선을 다하는 실용적인 완벽주의자입니다. 순간에 집중하며 눈앞의 상황을 완벽하게 처리하는 능력이 탁월하고, 추상적 이론보다 실제 결과로 보여주는 방식을 선호합니다. 손과 몸이 움직이면서 완벽함이 만들어집니다.',
      strengths: ['즉각적이고 정확한 현장 대응 능력', '실용적인 완벽함 추구', '몸으로 터득한 탁월한 기술'],
      relationship:
        '말보다 행동으로 관계에서 헌신을 표현합니다. 상대방의 필요를 즉각적으로 채워주는 실질적인 파트너입니다.',
      growth: '지나친 완벽주의가 스트레스와 자기비판으로 이어질 수 있습니다. 현재의 노력과 성과를 인정하고 스스로를 격려하는 습관이 필요합니다.',
      careers: ['장인', '스포츠 코치', '응급 의료인'],
    },
    2: {
      title: '활동적 조력가',
      keywords: ['행동하는 따뜻함', '실천적 돌봄', '활력 있는 봉사'],
      traits:
        '행동력과 따뜻한 돌봄이 결합하여 즉각적으로 도움의 손길을 내미는 활동적인 조력가가 됩니다. 생각보다 행동이 먼저 앞서며, 도움이 필요한 현장으로 즉시 달려가는 에너지를 지닙니다. 실질적인 방식으로 사랑을 표현하는 열정적인 봉사자입니다.',
      strengths: ['즉각적이고 실질적인 실행력', '진심 어린 돌봄과 활력', '현장에서 빛을 발하는 에너지'],
      relationship:
        '관계에 활기와 따뜻함을 불어넣으며, 상대방의 필요에 빠르게 반응합니다. 때로는 너무 앞서가서 상대가 숨막힘을 느낄 수 있습니다.',
      growth: '타인을 위한 행동에 집중하다 보면 자신의 필요를 돌아볼 여유를 잃기 쉽습니다. 자신을 충전하고 쉬어가는 시간도 허용해야 합니다.',
      careers: ['응급 구조사', '봉사 활동가', '영업 전문가'],
    },
    3: {
      title: '역동적 성취자',
      keywords: ['즉각적 실행력', '현장 승부사', '역동적 승부욕'],
      traits:
        '강한 승부욕과 즉각적인 행동력이 결합하여 현장에서 빛을 발하는 역동적인 성취자입니다. 기회를 보는 순간 즉시 행동하며, 어떤 상황에서도 최선의 결과를 이끌어내는 능력이 탁월합니다. 목표를 향한 질주에서 가장 큰 활력을 얻는 경쟁형 인물입니다.',
      strengths: ['기회를 잡는 빠른 판단과 실행력', '강렬한 승부욕과 집중력', '어떤 환경에서도 발휘되는 탁월한 적응력'],
      relationship:
        '관계에서도 목표와 성장을 중시하며, 함께 발전하는 파트너십을 원합니다. 경쟁심이 관계를 긴장시킬 수 있음을 주의해야 합니다.',
      growth: '결과를 향한 집착으로 인해 과정과 사람을 소홀히 할 수 있습니다. 승리보다 의미 있는 것이 무엇인지 돌아보는 시간이 필요합니다.',
      careers: ['영업 전문가', '운동선수', '기업가'],
    },
    4: {
      title: '감성적 탐험가',
      keywords: ['자유로운 영혼', '깊은 감성', '예술적 모험'],
      traits:
        '자유로운 영혼과 깊은 감수성이 결합하여 삶 자체를 예술적 모험으로 만드는 탐험가입니다. 새로운 경험과 감각에 민감하게 반응하며, 이를 독창적인 예술적 언어로 표현하는 능력이 탁월합니다. 어디에서든 아름다움을 발견하고 고유한 방식으로 세상을 담아냅니다.',
      strengths: ['독창적이고 자유로운 예술적 표현', '세상을 섬세하게 느끼는 감수성', '틀에 얽매이지 않는 창의적 사고'],
      relationship:
        '강렬하고 진정성 있는 감정적 교류를 원하며, 상대방이 자신의 독특함을 인정해줄 때 꽃을 피웁니다. 속박과 틀에 대한 거부감이 강합니다.',
      growth: '감정의 파도에 휩쓸려 안정성이 흔들릴 수 있습니다. 내면의 풍요로움을 현실 속에서 지속 가능한 방식으로 표현하는 법을 배워야 합니다.',
      careers: ['예술가', '여행 작가', '뮤지션'],
    },
    5: {
      title: '현장 전문가',
      keywords: ['실전 기술', '독립적 탐구', '도구의 달인'],
      traits:
        '실전 경험과 지적 탐구가 결합하여 자신의 분야에서 독보적인 현장 전문가로 성장합니다. 직접 분해하고 조립하며 배우는 방식을 선호하고, 자신의 손으로 완성한 것에서 가장 큰 만족을 느낍니다. 독립적으로 깊이 탐구하며 문제를 해결하는 능력이 탁월합니다.',
      strengths: ['몸으로 체득한 탁월한 기술력', '독립적이고 자율적인 문제 해결 능력', '이론과 실전을 잇는 분석력'],
      relationship:
        '독립성을 중시하며, 자신의 공간과 시간을 존중해주는 파트너를 원합니다. 말보다 행동으로 관심과 애정을 표현하는 편입니다.',
      growth: '혼자 해결하려는 경향이 너무 강해 타인과의 협력을 거부할 수 있습니다. 다른 사람의 관점과 도움을 받아들이는 개방성이 필요합니다.',
      careers: ['엔지니어', '기술자', '파일럿'],
    },
    6: {
      title: '행동하는 충성가',
      keywords: ['즉각적 충성', '팀 신뢰', '행동하는 헌신'],
      traits:
        '강한 충성심과 즉각적인 행동력이 결합하여 팀을 위해 몸을 던지는 실천적 충성가가 됩니다. 동료와 조직을 위해 주저 없이 행동하며, 위기 상황에서 특히 빛을 발하는 능력을 지닙니다. 말보다 행동으로 신뢰를 쌓아가는 든든한 동료입니다.',
      strengths: ['즉각적이고 실질적인 행동력', '팀을 향한 깊은 충성심', '위기 상황에서 발휘되는 실전 능력'],
      relationship:
        '팀과 조직에 대한 강한 소속감을 지니며, 동료들을 위해 헌신합니다. 신뢰하는 사람들을 위해서라면 어떤 희생도 감수합니다.',
      growth: '지나친 충성심이 맹목적인 복종으로 이어질 수 있습니다. 비판적 시각을 유지하고 스스로의 판단을 신뢰하는 용기가 필요합니다.',
      careers: ['소방관', '경찰', '군인'],
    },
    7: {
      title: '자유로운 모험가',
      keywords: ['즉흥적 자유', '모험과 열정', '삶의 탐험가'],
      traits:
        '즉흥성과 열정이 극대화되어 삶 자체가 끝없는 모험이 됩니다. 새로운 경험을 향한 끝없는 갈증과 에너지로 언제나 새로운 지평선을 향해 달려갑니다. 어디서든 즐거움을 발견하고 주변 사람들에게 활력과 설렘을 전염시키는 에너지의 원천입니다.',
      strengths: ['어디서든 즐거움을 발견하는 낙천적 에너지', '새로운 도전을 두려워하지 않는 모험심', '사람들에게 활력을 전하는 매력'],
      relationship:
        '관계에 신선함과 흥미를 끊임없이 불어넣으며, 함께 있으면 삶이 즐거워집니다. 깊은 헌신보다 새로운 자극을 쫓는 경향이 지속적인 관계를 어렵게 할 수 있습니다.',
      growth: '즐거움을 쫓다 책임과 깊이 있는 것들을 놓칠 수 있습니다. 한 곳에 머물며 깊이 있는 관계와 전문성을 쌓는 연습이 필요합니다.',
      careers: ['여행가', '크리에이터', '스포츠 선수'],
    },
    8: {
      title: '대담한 행동가',
      keywords: ['결단력', '무서운 실행력', '대담한 용기'],
      traits:
        '강인한 의지와 즉각적인 행동력이 결합하여 어떤 장벽도 뚫어내는 대담한 행동가가 됩니다. 두려움 없이 도전하고 즉시 실행하며, 결과로 말하는 강렬한 존재감을 지닙니다. 어려운 상황에서 오히려 더 큰 에너지를 발휘하는 위기의 사나이입니다.',
      strengths: ['눈 깜짝할 사이의 결단력과 행동력', '어떤 어려움도 이겨내는 용기', '강렬하고 압도적인 실행력'],
      relationship:
        '강렬한 방식으로 관계를 맺으며, 신뢰하는 사람에게는 강한 보호와 충성을 바칩니다. 압도적인 에너지가 상대방을 부담스럽게 만들 수 있습니다.',
      growth: '충동적인 행동이 불필요한 갈등을 만들 수 있습니다. 행동하기 전에 잠시 멈추고 결과를 고려하는 사고 습관을 길러야 합니다.',
      careers: ['기업가', '군 지휘관', '액션 전문 배우'],
    },
    9: {
      title: '여유로운 탐험가',
      keywords: ['편안한 자유', '여유로운 적응력', '조화로운 탐험'],
      traits:
        '자유를 사랑하는 영혼과 평화로운 성품이 결합하여 어디서든 편안하게 녹아드는 여유로운 탐험가가 됩니다. 새로운 환경과 사람들에 자연스럽게 적응하며, 갈등 없이 흐름을 타는 능력이 탁월합니다. 여유로운 존재감으로 주변에 평화로운 분위기를 만들어냅니다.',
      strengths: ['어떤 상황에도 자연스럽게 적응하는 유연함', '긴장을 풀어주는 여유롭고 편안한 존재감', '다양한 사람과 조화를 이루는 능력'],
      relationship:
        '갈등 없이 흘러가는 편안한 관계를 선호하며, 파트너에게 편안함과 자유를 줍니다. 지나친 수동성과 무관심이 관계를 무력하게 만들 수 있습니다.',
      growth: '흘러가는 대로 살다 보면 방향성과 목적의식을 잃기 쉽습니다. 자신이 진정으로 원하는 것을 파악하고 의도적으로 나아가는 힘을 길러야 합니다.',
      careers: ['예술가', '여행가', '상담사'],
    },
  },
};

function getComboProfile(mbti: string, ennea: number): ComboProfile {
  const group = getMbtiGroup(mbti);
  return COMBO_DATA[group][ennea];
}

const MbtiEnneagram = (): ReactElement => {
  const [selectedMbti, setSelectedMbti] = useState<string>('');
  const [selectedEnnea, setSelectedEnnea] = useState<number>(0);
  const [profile, setProfile] = useState<ComboProfile | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedMbti || !selectedEnnea) return;
    setProfile(getComboProfile(selectedMbti, selectedEnnea));
    setSubmitted(true);
  };

  const handleReset = () => {
    setProfile(null);
    setSubmitted(false);
  };

  const canSubmit = !!selectedMbti && !!selectedEnnea;

  return (
    <>
      <SEOHead
        title="MBTI+에니어그램 | Suyoung's Secret"
        description="MBTI 유형과 에니어그램 번호를 조합하여 나만의 성격 프로필을 알아보세요"
      />

      <section className="page-header-ed">
        <div className="container">
          <div className="eyebrow">MBTI × 에니어그램 · 조합 분석</div>
          <h2>MBTI + 에니어그램 조합</h2>
          <p>두 가지 성격 유형을 조합해 더 깊은 나를 발견하세요</p>
        </div>
      </section>

      <section className="section-ed">
        <div className="container">

          {/* WHY vs HOW 설명 박스 */}
          <div style={{
            background: 'var(--navy-50)',
            borderLeft: '4px solid var(--gold)',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            marginBottom: '20px',
            fontSize: '13px',
            lineHeight: 1.7,
          }}>
            <strong style={{ color: 'var(--navy-800)' }}>MBTI와 에니어그램의 차이</strong>
            <div style={{ marginTop: '6px', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 700 }}>MBTI</span>는 우리가 세상을 어떻게 <strong>처리하고 상호작용하는지</strong>(인지 기능, HOW)를 설명합니다.{' '}
              <span style={{ color: 'var(--gold)', fontWeight: 700 }}>에니어그램</span>은 우리가 <strong>왜</strong> 그렇게 행동하는지, 즉 핵심 동기와 두려움(WHY)을 드러냅니다.
              두 체계를 함께 보면 행동 방식과 내면 동기를 동시에 이해할 수 있습니다.
            </div>
          </div>

          {/* 선택 영역 */}
          {!submitted && (
            <div style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '16px',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px',
              }}>
                {/* MBTI 선택 */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '10px' }}>
                    MBTI 유형 선택
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {MBTI_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedMbti(type)}
                        style={{
                          padding: '8px 4px',
                          border: selectedMbti === type
                            ? '2px solid var(--gold)'
                            : '1px solid var(--line)',
                          borderRadius: '8px',
                          background: selectedMbti === type ? 'var(--gold)' : 'var(--navy-50)',
                          color: selectedMbti === type ? '#fff' : 'var(--navy-800)',
                          fontSize: '12px',
                          fontWeight: selectedMbti === type ? 800 : 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 에니어그램 선택 */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navy-800)', marginBottom: '10px' }}>
                    에니어그램 유형 선택
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                    {ENNEA_TYPES.map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelectedEnnea(n)}
                        style={{
                          padding: '10px 6px',
                          border: selectedEnnea === n
                            ? '2px solid var(--gold)'
                            : '1px solid var(--line)',
                          borderRadius: '8px',
                          background: selectedEnnea === n ? 'var(--gold)' : 'var(--navy-50)',
                          color: selectedEnnea === n ? '#fff' : 'var(--navy-800)',
                          fontSize: '12px',
                          fontWeight: selectedEnnea === n ? 800 : 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          textAlign: 'center',
                          lineHeight: 1.4,
                        }}
                      >
                        <div style={{ fontSize: '15px', fontWeight: 800 }}>{n}번</div>
                        <div style={{ fontSize: '10px', opacity: 0.85 }}>{ENNEA_NAMES[n]}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 선택 요약 */}
              {(selectedMbti || selectedEnnea > 0) && (
                <div style={{
                  background: 'var(--navy-50)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                  <span>
                    MBTI:{' '}
                    <strong style={{ color: selectedMbti ? 'var(--gold)' : 'var(--text-secondary)' }}>
                      {selectedMbti || '미선택'}
                    </strong>
                  </span>
                  <span style={{ color: 'var(--line)' }}>×</span>
                  <span>
                    에니어그램:{' '}
                    <strong style={{ color: selectedEnnea ? 'var(--gold)' : 'var(--text-secondary)' }}>
                      {selectedEnnea ? `${selectedEnnea}번 ${ENNEA_NAMES[selectedEnnea]}` : '미선택'}
                    </strong>
                  </span>
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  opacity: canSubmit ? 1 : 0.45,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                조합 보기
              </button>
            </div>
          )}

          {/* 결과 패널 */}
          {submitted && profile && (
            <div style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '16px',
            }}>
              {/* 조합 정보 헤더 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}>
                <div style={{
                  background: 'var(--gold)',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 800,
                  flexShrink: 0,
                }}>
                  {selectedMbti} × {selectedEnnea}번
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  background: 'var(--navy-50)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  flexShrink: 0,
                }}>
                  {getMbtiGroup(selectedMbti)}그룹 · {ENNEA_NAMES[selectedEnnea]}
                </div>
              </div>

              {/* 타이틀 */}
              <h3 style={{
                fontSize: '22px',
                fontWeight: 900,
                color: 'var(--navy-800)',
                margin: '0 0 14px',
                lineHeight: 1.3,
              }}>
                {profile.title}
              </h3>

              {/* 핵심 키워드 */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {profile.keywords.map((kw) => (
                  <span
                    key={kw}
                    style={{
                      background: 'var(--navy-50)',
                      border: '1px solid var(--gold)',
                      color: 'var(--gold)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* 성격 특성 */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  성격 특성
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {profile.traits}
                </p>
              </div>

              {/* 주요 강점 */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  주요 강점
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {profile.strengths.map((s) => (
                    <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--navy-800)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '16px', lineHeight: 1, marginTop: '1px', flexShrink: 0 }}>·</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 관계 패턴 */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  관계 패턴
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {profile.relationship}
                </p>
              </div>

              {/* 성장 과제 */}
              <div style={{
                background: 'var(--navy-50)',
                borderLeft: '3px solid var(--gold)',
                padding: '10px 14px',
                borderRadius: '0 8px 8px 0',
                marginBottom: '18px',
              }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  성장 과제
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {profile.growth}
                </p>
              </div>

              {/* 추천 직업 */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  추천 직업
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {profile.careers.map((c) => (
                    <span
                      key={c}
                      style={{
                        background: 'var(--navy-800)',
                        color: '#fff',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* 다시하기 버튼 */}
              <button
                className="btn btn-ghost"
                onClick={handleReset}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                다시 선택하기
              </button>
            </div>
          )}

          {/* 하단 링크 */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/mbti" className="btn btn-ghost">MBTI 유형 보기 →</Link>
            <Link to="/mbti/compatibility" className="btn btn-ghost">MBTI 궁합 →</Link>
            <Link to="/mbti/test" className="btn btn-ghost">MBTI 테스트 →</Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default MbtiEnneagram;
