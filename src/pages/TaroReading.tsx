import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import SEOHead from '../components/SEOHead';

interface TaroCard {
  id: number;
  name: string;
  nameKo: string;
  symbol: string;
  upright: string;
  reversed: string;
  element: string;
  keyword: string;
}

const MAJOR_ARCANA: TaroCard[] = [
  { id: 0,  name: 'The Fool',        nameKo: '바보',         symbol: '🌟', element: '풍(風)', keyword: '새로운 시작', upright: '새로운 여정이 시작됩니다. 두려움 없이 앞으로 나아가세요. 무한한 가능성이 당신 앞에 펼쳐져 있습니다.', reversed: '무모한 결정을 경계하세요. 준비 없는 시작은 혼란을 부를 수 있습니다.' },
  { id: 1,  name: 'The Magician',    nameKo: '마법사',       symbol: '✨', element: '화(火)', keyword: '의지와 능력', upright: '당신 안에 모든 능력이 있습니다. 집중력과 의지로 목표를 이룰 때입니다.', reversed: '능력을 남용하거나 의욕 부진으로 기회를 놓치고 있습니다.' },
  { id: 2,  name: 'The High Priestess', nameKo: '여사제',    symbol: '🌙', element: '수(水)', keyword: '직관과 신비', upright: '내면의 목소리에 귀 기울이세요. 직관이 당신을 올바른 길로 인도합니다.', reversed: '비밀이 숨겨져 있거나 직관을 무시하고 있습니다. 내면과 소통하세요.' },
  { id: 3,  name: 'The Empress',     nameKo: '여황제',       symbol: '🌸', element: '지(地)', keyword: '풍요와 창조', upright: '풍요로움과 창조의 에너지가 넘칩니다. 사랑과 아름다움이 삶에 가득합니다.', reversed: '창의성이 막혀 있거나 과잉 의존이 문제가 됩니다.' },
  { id: 4,  name: 'The Emperor',     nameKo: '황제',         symbol: '👑', element: '화(火)', keyword: '권위와 안정', upright: '강인한 리더십을 발휘할 때입니다. 구조와 규율로 안정적인 기반을 쌓으세요.', reversed: '권위주의적 태도나 통제 욕구를 내려놓을 필요가 있습니다.' },
  { id: 5,  name: 'The Hierophant', nameKo: '교황',          symbol: '⛪', element: '지(地)', keyword: '전통과 가르침', upright: '전통적인 방식이 지금 상황에 맞습니다. 멘토의 조언을 구하세요.', reversed: '기존 규칙에 의문을 품고 새로운 길을 개척해야 할 때입니다.' },
  { id: 6,  name: 'The Lovers',      nameKo: '연인',         symbol: '💑', element: '풍(風)', keyword: '선택과 사랑', upright: '중요한 선택의 기로에 서 있습니다. 마음이 이끄는 대로 따르세요.', reversed: '관계의 불균형이나 잘못된 선택을 경계하세요.' },
  { id: 7,  name: 'The Chariot',     nameKo: '전차',         symbol: '🏆', element: '수(水)', keyword: '승리와 추진력', upright: '강한 의지로 앞으로 나아가세요. 승리가 가까이 있습니다.', reversed: '방향을 잃거나 통제력을 잃고 있습니다. 집중력을 회복하세요.' },
  { id: 8,  name: 'Strength',        nameKo: '힘',           symbol: '🦁', element: '화(火)', keyword: '내면의 용기', upright: '부드러운 용기로 어려움을 극복하세요. 내면의 힘이 빛을 발합니다.', reversed: '자기 의심이나 두려움이 앞을 가로막고 있습니다.' },
  { id: 9,  name: 'The Hermit',      nameKo: '은둔자',       symbol: '🔦', element: '지(地)', keyword: '내면 탐구', upright: '혼자만의 시간이 필요합니다. 내면의 지혜를 탐구하세요.', reversed: '고립이나 거절에서 벗어나 세상으로 나올 때입니다.' },
  { id: 10, name: 'Wheel of Fortune', nameKo: '운명의 수레바퀴', symbol: '🎡', element: '화(火)', keyword: '운명의 전환', upright: '운명의 바퀴가 돌고 있습니다. 변화의 흐름을 받아들이세요.', reversed: '예상치 못한 변화에 저항하고 있습니다. 흐름에 맡기세요.' },
  { id: 11, name: 'Justice',          nameKo: '정의',        symbol: '⚖️', element: '풍(風)', keyword: '균형과 진실', upright: '공정한 결과가 기다립니다. 진실과 균형이 모든 것을 바로잡습니다.', reversed: '불공평한 결과에 직면할 수 있습니다. 정직함을 유지하세요.' },
  { id: 12, name: 'The Hanged Man',  nameKo: '매달린 남자',  symbol: '🔄', element: '수(水)', keyword: '희생과 통찰', upright: '잠시 멈추고 관점을 바꾸세요. 기다림 속에 통찰이 있습니다.', reversed: '희생을 거부하거나 변화에 저항하고 있습니다.' },
  { id: 13, name: 'Death',            nameKo: '죽음',        symbol: '🦋', element: '수(水)', keyword: '변화와 재생', upright: '끝은 새로운 시작입니다. 과거를 내려놓고 변화를 받아들이세요.', reversed: '변화를 거부하여 정체되어 있습니다. 용기를 내어 놓아주세요.' },
  { id: 14, name: 'Temperance',       nameKo: '절제',        symbol: '⚗️', element: '화(火)', keyword: '조화와 균형', upright: '균형과 조화가 필요합니다. 인내심을 가지고 천천히 나아가세요.', reversed: '극단적인 행동이나 과잉 상태를 조절해야 합니다.' },
  { id: 15, name: 'The Devil',        nameKo: '악마',        symbol: '⛓️', element: '지(地)', keyword: '집착과 해방', upright: '당신을 옥죄는 것들을 인식하세요. 집착에서 벗어날 힘이 있습니다.', reversed: '오랜 굴레에서 해방될 조짐이 보입니다. 용기를 내세요.' },
  { id: 16, name: 'The Tower',        nameKo: '탑',          symbol: '⚡', element: '화(火)', keyword: '급변과 각성', upright: '예상치 못한 충격이 있을 수 있으나 이것은 필요한 변화입니다.', reversed: '재앙을 피했거나 변화가 지연되고 있습니다.' },
  { id: 17, name: 'The Star',         nameKo: '별',          symbol: '⭐', element: '풍(風)', keyword: '희망과 치유', upright: '희망과 치유의 에너지가 가득합니다. 미래에 대한 믿음을 가지세요.', reversed: '자신감 부족이나 절망이 앞을 가리고 있습니다.' },
  { id: 18, name: 'The Moon',         nameKo: '달',          symbol: '🌕', element: '수(Water)', keyword: '환상과 불안', upright: '직관을 믿되 환상을 경계하세요. 숨겨진 진실이 드러날 것입니다.', reversed: '두려움과 환상에서 점차 벗어나고 있습니다.' },
  { id: 19, name: 'The Sun',          nameKo: '태양',        symbol: '☀️', element: '화(火)', keyword: '성공과 기쁨', upright: '밝고 긍정적인 에너지가 가득합니다. 성공과 행복이 찾아옵니다.', reversed: '낙관주의가 지나쳐 현실을 직시하지 못하고 있습니다.' },
  { id: 20, name: 'Judgement',        nameKo: '심판',        symbol: '🎺', element: '화(火)', keyword: '각성과 부활', upright: '중요한 깨달음의 시간입니다. 과거를 정산하고 새롭게 태어나세요.', reversed: '자기 비판이 과도하거나 부름에 응답하지 않고 있습니다.' },
  { id: 21, name: 'The World',        nameKo: '세계',        symbol: '🌍', element: '지(地)', keyword: '완성과 성취', upright: '완성과 성취의 순간입니다. 모든 노력이 결실을 맺습니다.', reversed: '목표를 향해 아직 갈 길이 남아 있습니다. 포기하지 마세요.' },
];

const SPREADS = [
  { id: 'single', name: '한 장 뽑기', desc: '오늘의 메시지', count: 1 },
  { id: 'three',  name: '세 장 전개', desc: '과거 · 현재 · 미래', count: 3 },
  { id: 'cross',  name: '다섯 장 십자', desc: '상황 · 도전 · 조언 · 기반 · 결과', count: 5 },
];

const POSITIONS_3 = ['과거', '현재', '미래'];
const POSITIONS_5 = ['현재 상황', '도전', '조언', '기반', '결과'];

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function drawCards(count: number, seed: number): { card: TaroCard; reversed: boolean }[] {
  const rand = seededRand(seed);
  const deck = [...MAJOR_ARCANA];
  const result: { card: TaroCard; reversed: boolean }[] = [];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  for (let i = 0; i < count; i++) {
    result.push({ card: deck[i], reversed: rand() > 0.6 });
  }
  return result;
}

const cardBack = (
  <svg viewBox="0 0 120 200" style={{ width: '100%', height: '100%' }}>
    <rect width="120" height="200" rx="8" fill="#1B2A4A" />
    <rect x="8" y="8" width="104" height="184" rx="6" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
    <rect x="14" y="14" width="92" height="172" rx="4" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
    <circle cx="60" cy="100" r="32" fill="none" stroke="#C9A84C" strokeWidth="1" />
    <polygon points="60,72 67,92 88,92 72,104 78,124 60,112 42,124 48,104 32,92 53,92" fill="none" stroke="#C9A84C" strokeWidth="1" />
    <circle cx="60" cy="100" r="5" fill="#C9A84C" opacity="0.6" />
    {[0,45,90,135,180,225,270,315].map((a,i) => (
      <circle key={i} cx={60+38*Math.cos(a*Math.PI/180)} cy={100+38*Math.sin(a*Math.PI/180)} r="2" fill="#C9A84C" opacity="0.4" />
    ))}
  </svg>
);

interface CardDisplayProps {
  item: { card: TaroCard; reversed: boolean };
  position?: string;
  delay?: number;
}

const CardDisplay = ({ item, position, delay = 0 }: CardDisplayProps): ReactElement => {
  const { card, reversed } = item;
  const meaning = reversed ? card.reversed : card.upright;

  return (
    <div className="taro-card-result" style={{ animationDelay: `${delay}ms` }}>
      {position && <div className="taro-position-label">{position}</div>}
      <div className={`taro-card-face ${reversed ? 'reversed' : ''}`}>
        <div className="taro-card-symbol">{card.symbol}</div>
        <div className="taro-card-number">
          {reversed ? '역방향' : '정방향'} · {card.element}
        </div>
        <div className="taro-card-name-ko">{card.nameKo}</div>
        <div className="taro-card-name-en">{card.name}</div>
        <div className="taro-card-keyword">{card.keyword}</div>
      </div>
      <p className="taro-card-meaning">{meaning}</p>
    </div>
  );
};

const TaroReading = (): ReactElement => {
  const [spreadId, setSpreadId] = useState<string>('three');
  const [revealed, setRevealed] = useState<{ card: TaroCard; reversed: boolean }[] | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [, setSeed] = useState<number>(() => Date.now());

  const spread = SPREADS.find(s => s.id === spreadId)!;
  const positions = spread.count === 3 ? POSITIONS_3 : spread.count === 5 ? POSITIONS_5 : [''];

  const handleDraw = useCallback(() => {
    setFlipping(true);
    const newSeed = Date.now();
    setSeed(newSeed);
    setTimeout(() => {
      setRevealed(drawCards(spread.count, newSeed));
      setFlipping(false);
    }, 600);
  }, [spread.count]);

  const handleReset = () => {
    setRevealed(null);
    setSeed(Date.now());
  };

  return (
    <>
      <SEOHead
        title="타로카드 운세 | 운세 플랫폼"
        description="22장의 메이저 아르카나 타로카드로 당신의 운명을 읽어보세요."
      />

      <div className="page-header">
        <div className="container">
          <h2>🃏 타로카드 운세</h2>
          <p>22장의 메이저 아르카나가 당신의 운명을 속삭입니다</p>
        </div>
      </div>

      <section className="section taro-section">
        <div className="container taro-container">

          {!revealed ? (
            <>
              <div className="taro-spread-selector">
                <h3 className="taro-section-title">전개 방식 선택</h3>
                <div className="taro-spread-grid">
                  {SPREADS.map(s => (
                    <button
                      key={s.id}
                      className={`taro-spread-btn ${spreadId === s.id ? 'active' : ''}`}
                      onClick={() => setSpreadId(s.id)}
                    >
                      <span className="taro-spread-name">{s.name}</span>
                      <span className="taro-spread-desc">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="taro-deck-area">
                <p className="taro-instruction">마음을 가라앉히고 질문을 떠올린 뒤, 카드를 뽑으세요</p>
                <div className={`taro-deck ${flipping ? 'flipping' : ''}`}>
                  {[...Array(spread.count)].map((_, i) => (
                    <div key={i} className="taro-card-back" style={{ transform: `translate(${i * 3}px, ${i * -3}px)` }}>
                      {cardBack}
                    </div>
                  ))}
                </div>
                <button className="taro-draw-btn" onClick={handleDraw} disabled={flipping}>
                  {flipping ? '카드를 뽑는 중...' : `✨ ${spread.name}`}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="taro-results">
                <h3 className="taro-results-title">카드가 전하는 메시지</h3>
                <div className={`taro-cards-grid count-${spread.count}`}>
                  {revealed.map((item, i) => (
                    <CardDisplay
                      key={i}
                      item={item}
                      position={spread.count > 1 ? positions[i] : undefined}
                      delay={i * 150}
                    />
                  ))}
                </div>

                {spread.count >= 3 && (
                  <div className="taro-summary">
                    <h4>종합 해석</h4>
                    <p>
                      {revealed[0].card.keyword}의 에너지를 바탕으로,
                      현재 {revealed[1].reversed ? '역방향의 ' : ''}{revealed[1].card.keyword}의 흐름 속에 있으며,
                      앞으로 {revealed[revealed.length - 1].card.nameKo} 카드가 암시하는 {revealed[revealed.length - 1].card.keyword}의 방향으로 나아가게 됩니다.
                      {revealed.every(r => !r.reversed)
                        ? ' 전체적으로 긍정적인 에너지가 가득합니다.'
                        : ' 일부 도전이 있으나 이를 통해 성장할 수 있습니다.'}
                    </p>
                  </div>
                )}

                <button className="taro-reset-btn" onClick={handleReset}>
                  🔄 다시 뽑기
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TaroReading;
