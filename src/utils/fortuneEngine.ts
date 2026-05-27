export type Period = 'daily' | 'monthly' | 'yearly' | 'early' | 'middle' | 'late';
export type FArea = 'money' | 'love' | 'career' | 'health';

export const PERIOD_LABELS: Record<Period, string> = {
  daily: '일운', monthly: '월운', yearly: '년운',
  early: '초년운', middle: '중년운', late: '말년운',
};
export const PERIODS: Period[] = ['daily', 'monthly', 'yearly', 'early', 'middle', 'late'];
export const IS_LIFE = (p: Period) => p === 'early' || p === 'middle' || p === 'late';

export const FAREAS: { key: FArea; icon: string; label: string }[] = [
  { key: 'money',  icon: '💰', label: '재물운' },
  { key: 'love',   icon: '💕', label: '사랑운' },
  { key: 'career', icon: '📈', label: '직업운' },
  { key: 'health', icon: '💪', label: '건강운' },
];

/* ── Deterministic hash (DJB2) ── */
const djb2 = (s: string): number => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0;
  return h;
};

const dateSeed = (p: Period): string => {
  const d = new Date();
  if (p === 'daily')   return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  if (p === 'monthly') return `${d.getFullYear()}-${d.getMonth() + 1}`;
  if (p === 'yearly')  return `${d.getFullYear()}`;
  return p; // early/middle/late → fixed per baseKey
};

/** 2~5 stars, deterministic */
export const areaStars = (baseKey: string, p: Period, a: FArea): number =>
  2 + (djb2(`${dateSeed(p)}|${baseKey}|${a}`) % 4);

export const totalStars = (baseKey: string, p: Period): number =>
  FAREAS.reduce((s, { key }) => s + areaStars(baseKey, p, key), 0);

/* ── Star texts ── */
const TEXTS: Record<FArea, Record<number, string>> = {
  money: {
    2: '지출이 늘어나는 시기입니다. 불필요한 소비를 줄이고 재정 관리에 집중하세요.',
    3: '수입과 지출이 균형을 이루는 안정적인 흐름입니다.',
    4: '재물운이 상승합니다. 새로운 수익 기회를 적극 탐색해 보세요.',
    5: '큰 재물이 들어오는 시기입니다. 과감하게 도전해도 좋습니다.',
  },
  love: {
    2: '감정 표현에 주의하세요. 오해가 생기지 않도록 소통에 힘쓰세요.',
    3: '평온한 관계가 유지됩니다. 작은 배려 한마디가 큰 힘이 됩니다.',
    4: '따뜻한 인연이 찾아옵니다. 먼저 마음을 열고 다가가세요.',
    5: '인연의 기운이 강합니다. 마음을 표현할 절호의 시기입니다.',
  },
  career: {
    2: '업무적 도전이 있을 수 있습니다. 차분히 기반을 다지는 데 집중하세요.',
    3: '안정적인 업무 흐름입니다. 꾸준함이 최고의 전략입니다.',
    4: '능력을 인정받는 시기입니다. 자신감 있게 나아가세요.',
    5: '커리어에 큰 도약의 기회가 옵니다. 두려움 없이 도전하세요.',
  },
  health: {
    2: '건강에 주의가 필요합니다. 과로를 피하고 충분히 쉬세요.',
    3: '건강 관리에 꾸준히 신경 쓰세요. 규칙적인 생활이 중요합니다.',
    4: '건강 상태가 양호합니다. 활력이 넘치는 좋은 시기입니다.',
    5: '최고의 컨디션입니다. 새로운 도전을 시작하기 좋은 때입니다.',
  },
};
export const areaText = (a: FArea, stars: number): string => TEXTS[a][stars];

/* ── Overview sentences for time periods ── */
const OVR: Record<string, string[]> = {
  daily: [
    '오늘은 내실을 다지고 차분하게 행동하는 것이 좋습니다.',
    '오늘은 신중히 행동하면 좋은 결과를 얻을 수 있습니다.',
    '평온한 에너지 속에서 꾸준히 나아가는 하루입니다.',
    '긍정적인 기운이 흐릅니다. 적극적으로 행동하세요.',
    '강한 운기가 함께합니다. 중요한 일을 추진하기 최적의 날입니다.',
  ],
  monthly: [
    '이번 달은 무리한 계획보다 현실적인 목표에 집중하세요.',
    '안정을 유지하며 다음 단계를 준비하는 시기입니다.',
    '꾸준한 노력이 서서히 결실을 맺는 시기입니다.',
    '전반적으로 좋은 흐름이 이어집니다.',
    '뛰어난 운기로 중요한 성과를 거둘 수 있는 달입니다.',
  ],
  yearly: [
    '올해는 내실을 다지는 준비의 한 해로 삼으세요.',
    '신중하게 행동하면 안정적인 한 해를 보낼 수 있습니다.',
    '꾸준한 노력이 결실을 맺는 의미 있는 한 해입니다.',
    '전반적으로 좋은 운기가 흐르는 한 해입니다.',
    '큰 도약과 성취가 기대되는 최고의 한 해입니다.',
  ],
};

export const overviewText = (p: Period, total: number): string => {
  const arr = OVR[p];
  if (!arr) return '';
  return arr[Math.min(4, Math.max(0, total - 8))];
};
