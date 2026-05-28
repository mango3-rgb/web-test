import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import SEOHead from '../components/SEOHead';

interface TaroCard {
  id: number;
  name: string;
  nameKo: string;
  symbol: string;
  element: string;
  keyword: string;
  upright: string;
  reversed: string;
  areaMsg: Record<string, { up: string; rev: string }>;
}

const AREAS = [
  { key: 'money',  icon: '💰', label: '재물운', color: '#D4760A' },
  { key: 'love',   icon: '💕', label: '사랑운', color: '#C8102E' },
  { key: 'career', icon: '📈', label: '직업운', color: '#1B2A4A' },
  { key: 'health', icon: '💪', label: '건강운', color: '#00855A' },
] as const;
type AreaKey = typeof AREAS[number]['key'];

const CARDS: TaroCard[] = [
  { id:0,  name:'The Fool',         nameKo:'바보',              symbol:'🌟', element:'풍(風)', keyword:'새로운 시작',
    upright:'새로운 여정이 시작됩니다. 두려움 없이 앞으로 나아가세요.',
    reversed:'무모한 결정을 경계하세요. 준비 없는 시작은 혼란을 부릅니다.',
    areaMsg: {
      money:  { up:'예상치 못한 수입의 기회가 열립니다. 두려움 없이 도전하세요.', rev:'준비 없는 투자는 손실로 이어질 수 있습니다.' },
      love:   { up:'설레는 새 인연의 기운이 감돌고 있습니다.', rev:'충동적인 감정 표현을 자제하세요.' },
      career: { up:'새로운 도전으로 커리어의 전환점이 옵니다.', rev:'무계획적인 이직이나 변화는 피하세요.' },
      health: { up:'활력이 넘칩니다. 새로운 운동이나 취미를 시작하기 좋은 때입니다.', rev:'무리한 활동은 몸에 무리를 줍니다.' },
    }},
  { id:1,  name:'The Magician',     nameKo:'마법사',            symbol:'✨', element:'화(火)', keyword:'의지와 능력',
    upright:'당신 안에 모든 능력이 있습니다. 집중력과 의지로 목표를 이룰 때입니다.',
    reversed:'능력을 남용하거나 의욕 부진으로 기회를 놓치고 있습니다.',
    areaMsg: {
      money:  { up:'재능을 활용해 수익을 창출할 타이밍입니다.', rev:'자원을 낭비하고 있지 않은지 점검하세요.' },
      love:   { up:'매력이 넘칩니다. 적극적으로 표현하면 좋은 결과가 옵니다.', rev:'관계에서 진정성이 부족해지고 있습니다.' },
      career: { up:'모든 능력을 집중시키면 큰 성과를 낼 수 있습니다.', rev:'집중력이 흩어져 있습니다. 우선순위를 정하세요.' },
      health: { up:'몸과 마음이 활력으로 가득합니다.', rev:'과로로 인한 번아웃을 조심하세요.' },
    }},
  { id:2,  name:'The High Priestess', nameKo:'여사제',          symbol:'🌙', element:'수(水)', keyword:'직관과 신비',
    upright:'내면의 목소리에 귀 기울이세요. 직관이 올바른 길로 인도합니다.',
    reversed:'비밀이 숨겨져 있습니다. 내면과 소통하세요.',
    areaMsg: {
      money:  { up:'직관을 믿고 움직이세요. 숨겨진 기회가 보입니다.', rev:'정보가 불완전합니다. 성급한 결정을 피하세요.' },
      love:   { up:'상대의 감정을 섬세하게 읽을 수 있는 때입니다.', rev:'감정을 억누르지 말고 솔직하게 표현하세요.' },
      career: { up:'논리보다 직감이 중요한 결정을 앞두고 있습니다.', rev:'숨겨진 정보나 속임수를 조심하세요.' },
      health: { up:'몸의 신호에 귀 기울이세요. 마음의 안정이 건강을 지킵니다.', rev:'스트레스를 외면하지 말고 직면하세요.' },
    }},
  { id:3,  name:'The Empress',      nameKo:'여황제',            symbol:'🌸', element:'지(地)', keyword:'풍요와 창조',
    upright:'풍요로움과 창조의 에너지가 넘칩니다. 사랑과 아름다움이 삶에 가득합니다.',
    reversed:'창의성이 막혀 있거나 과잉 의존이 문제가 됩니다.',
    areaMsg: {
      money:  { up:'풍요의 기운이 흐릅니다. 투자한 것들이 결실을 맺습니다.', rev:'과소비나 물질에 대한 집착을 경계하세요.' },
      love:   { up:'깊은 애정과 풍요로운 사랑이 찾아옵니다.', rev:'의존적인 관계 패턴을 벗어나야 할 때입니다.' },
      career: { up:'창의적 프로젝트에서 뛰어난 성과를 낼 수 있습니다.', rev:'창작 에너지가 막혀 있습니다. 자연에서 영감을 찾으세요.' },
      health: { up:'자연 치유력이 높아지는 시기입니다. 몸을 잘 돌봐주세요.', rev:'자기 돌봄이 부족합니다. 쉬는 시간을 늘리세요.' },
    }},
  { id:4,  name:'The Emperor',      nameKo:'황제',              symbol:'👑', element:'화(火)', keyword:'권위와 안정',
    upright:'강인한 리더십을 발휘할 때입니다. 구조와 규율로 안정적인 기반을 쌓으세요.',
    reversed:'권위주의적 태도나 통제 욕구를 내려놓을 필요가 있습니다.',
    areaMsg: {
      money:  { up:'체계적인 재정 관리가 큰 결실을 맺습니다.', rev:'지나친 통제로 유연성을 잃고 있습니다.' },
      love:   { up:'안정적이고 믿음직한 관계를 만들어가고 있습니다.', rev:'지배적인 태도가 관계에 긴장을 줍니다.' },
      career: { up:'리더십을 발휘하여 팀을 이끌 때입니다.', rev:'독단적인 결정보다 협력을 선택하세요.' },
      health: { up:'규칙적인 생활 습관이 건강을 지켜줍니다.', rev:'무리한 통제보다 몸의 리듬을 따르세요.' },
    }},
  { id:5,  name:'The Hierophant',   nameKo:'교황',              symbol:'⛪', element:'지(地)', keyword:'전통과 가르침',
    upright:'전통적인 방식이 지금 상황에 맞습니다. 멘토의 조언을 구하세요.',
    reversed:'기존 규칙에 의문을 품고 새로운 길을 개척해야 할 때입니다.',
    areaMsg: {
      money:  { up:'검증된 방식과 전문가의 조언이 도움이 됩니다.', rev:'관습에 얽매이지 말고 새로운 재테크를 고려하세요.' },
      love:   { up:'전통적이고 헌신적인 사랑이 찾아옵니다.', rev:'형식보다 진정한 감정에 집중하세요.' },
      career: { up:'멘토나 선배의 가르침이 큰 도움이 됩니다.', rev:'관행을 벗어난 창의적 접근이 돌파구가 됩니다.' },
      health: { up:'검증된 치료법과 전문의의 조언을 따르세요.', rev:'대체 요법이나 새로운 건강법에도 열린 마음을 가지세요.' },
    }},
  { id:6,  name:'The Lovers',       nameKo:'연인',              symbol:'💑', element:'풍(風)', keyword:'선택과 사랑',
    upright:'중요한 선택의 기로에 서 있습니다. 마음이 이끄는 대로 따르세요.',
    reversed:'관계의 불균형이나 잘못된 선택을 경계하세요.',
    areaMsg: {
      money:  { up:'두 가지 재정 선택지 앞에 서 있습니다. 가슴의 소리를 들으세요.', rev:'성급한 재정 결정은 후회를 부를 수 있습니다.' },
      love:   { up:'깊은 감정적 연결과 진정한 사랑의 기운이 강합니다.', rev:'관계에서 솔직하지 못한 부분이 있습니다.' },
      career: { up:'직업적 결정의 순간입니다. 열정을 따르세요.', rev:'가치관과 맞지 않는 선택을 강요받고 있을 수 있습니다.' },
      health: { up:'몸과 마음의 조화가 건강의 비결입니다.', rev:'내면의 갈등이 건강에 영향을 주고 있습니다.' },
    }},
  { id:7,  name:'The Chariot',      nameKo:'전차',              symbol:'🏆', element:'수(水)', keyword:'승리와 추진력',
    upright:'강한 의지로 앞으로 나아가세요. 승리가 가까이 있습니다.',
    reversed:'방향을 잃거나 통제력을 잃고 있습니다.',
    areaMsg: {
      money:  { up:'강한 추진력으로 재물을 끌어당기는 시기입니다.', rev:'조급함이 재정 판단을 흐리게 합니다.' },
      love:   { up:'적극적으로 나아가면 사랑을 쟁취할 수 있습니다.', rev:'상대를 너무 몰아붙이고 있지는 않나요.' },
      career: { up:'목표를 향해 전력 질주하세요. 승리가 눈앞에 있습니다.', rev:'여러 방향으로 에너지가 분산되어 있습니다.' },
      health: { up:'강한 체력과 활력이 넘칩니다. 도전적인 운동을 시작해보세요.', rev:'과도한 경쟁심이 몸을 혹사시키고 있습니다.' },
    }},
  { id:8,  name:'Strength',         nameKo:'힘',                symbol:'🦁', element:'화(火)', keyword:'내면의 용기',
    upright:'부드러운 용기로 어려움을 극복하세요. 내면의 힘이 빛을 발합니다.',
    reversed:'자기 의심이나 두려움이 앞을 가로막고 있습니다.',
    areaMsg: {
      money:  { up:'인내와 꾸준함으로 재물을 쌓아가는 시기입니다.', rev:'자신감 부족이 재정 기회를 놓치게 만들고 있습니다.' },
      love:   { up:'온화한 힘으로 관계를 이끌어가세요.', rev:'두려움 때문에 감정 표현을 억누르고 있습니다.' },
      career: { up:'어려운 상황에서도 흔들리지 않는 내면의 힘이 있습니다.', rev:'두려움을 극복해야 진짜 역량이 드러납니다.' },
      health: { up:'정신적 강인함이 몸의 치유를 돕고 있습니다.', rev:'내면의 불안이 면역력을 약화시키고 있습니다.' },
    }},
  { id:9,  name:'The Hermit',       nameKo:'은둔자',            symbol:'🔦', element:'지(地)', keyword:'내면 탐구',
    upright:'혼자만의 시간이 필요합니다. 내면의 지혜를 탐구하세요.',
    reversed:'고립에서 벗어나 세상으로 나올 때입니다.',
    areaMsg: {
      money:  { up:'신중하게 조사하고 분석한 후 재정 결정을 내리세요.', rev:'지나친 소극함으로 기회를 놓치고 있습니다.' },
      love:   { up:'혼자만의 성찰이 관계를 더 깊게 만들어줍니다.', rev:'고독에 갇혀 새로운 인연을 차단하고 있습니다.' },
      career: { up:'전문성을 깊이 쌓는 시간입니다. 혼자 집중하세요.', rev:'고립된 업무 방식에서 협력으로 전환이 필요합니다.' },
      health: { up:'충분한 휴식과 성찰이 건강 회복에 도움이 됩니다.', rev:'지나친 고립은 정신 건강에 좋지 않습니다.' },
    }},
  { id:10, name:'Wheel of Fortune', nameKo:'운명의 수레바퀴',   symbol:'🎡', element:'화(火)', keyword:'운명의 전환',
    upright:'운명의 바퀴가 돌고 있습니다. 변화의 흐름을 받아들이세요.',
    reversed:'예상치 못한 변화에 저항하고 있습니다.',
    areaMsg: {
      money:  { up:'재물운이 상승하는 사이클에 접어들었습니다.', rev:'재물의 변동이 큰 시기입니다. 유동성을 확보하세요.' },
      love:   { up:'인연의 바퀴가 돌고 있습니다. 새로운 만남이 기다립니다.', rev:'관계에서 예상치 못한 변화가 올 수 있습니다.' },
      career: { up:'직업 운의 전환점입니다. 기회를 잡으세요.', rev:'경력에서 예상치 못한 변화가 있을 수 있습니다.' },
      health: { up:'건강 상태가 호전되는 흐름이 시작됩니다.', rev:'건강의 변동이 있을 수 있습니다. 주의가 필요합니다.' },
    }},
  { id:11, name:'Justice',          nameKo:'정의',              symbol:'⚖️', element:'풍(風)', keyword:'균형과 진실',
    upright:'공정한 결과가 기다립니다. 진실과 균형이 모든 것을 바로잡습니다.',
    reversed:'불공평한 상황에 처할 수 있습니다.',
    areaMsg: {
      money:  { up:'공정한 거래와 계약에서 좋은 결과가 옵니다.', rev:'불공평한 재정 상황을 바로잡을 필요가 있습니다.' },
      love:   { up:'균형 잡힌 관계가 깊어지는 시기입니다.', rev:'관계의 불균형을 솔직하게 이야기하세요.' },
      career: { up:'능력에 걸맞은 공정한 평가와 보상이 옵니다.', rev:'직장 내 불공정한 대우에 맞서야 할 때입니다.' },
      health: { up:'규칙적이고 균형 잡힌 생활이 건강을 지켜줍니다.', rev:'생활 균형이 무너져 건강에 영향을 주고 있습니다.' },
    }},
  { id:12, name:'The Hanged Man',   nameKo:'매달린 남자',       symbol:'🔄', element:'수(Water)', keyword:'희생과 통찰',
    upright:'잠시 멈추고 관점을 바꾸세요. 기다림 속에 통찰이 있습니다.',
    reversed:'희생을 거부하거나 변화에 저항하고 있습니다.',
    areaMsg: {
      money:  { up:'지금은 기다리는 것이 최선입니다. 서두르지 마세요.', rev:'기다리기를 포기하고 잘못된 결정을 내리고 있습니다.' },
      love:   { up:'새로운 시각으로 관계를 바라보면 해답이 보입니다.', rev:'관계에서 희생을 거부하고 있습니다.' },
      career: { up:'잠시 멈추고 전략을 재검토하세요. 새로운 관점이 돌파구입니다.', rev:'불필요한 희생을 강요받고 있습니다. 경계를 설정하세요.' },
      health: { up:'회복을 위해 충분한 휴식이 필요합니다.', rev:'무리하게 버티고 있습니다. 전문가의 도움을 구하세요.' },
    }},
  { id:13, name:'Death',            nameKo:'죽음',              symbol:'🦋', element:'수(水)', keyword:'변화와 재생',
    upright:'끝은 새로운 시작입니다. 과거를 내려놓고 변화를 받아들이세요.',
    reversed:'변화를 거부하여 정체되어 있습니다.',
    areaMsg: {
      money:  { up:'낡은 재정 패턴을 청산하고 새롭게 시작하세요.', rev:'변화가 두려워 재정 혁신을 미루고 있습니다.' },
      love:   { up:'관계의 변화가 새로운 장으로 이어집니다. 두려워하지 마세요.', rev:'끝내야 할 관계를 붙잡고 있습니다.' },
      career: { up:'커리어의 전환이 더 큰 성장을 가져옵니다.', rev:'변화를 두려워해 성장 기회를 놓치고 있습니다.' },
      health: { up:'나쁜 습관을 완전히 버리고 새 건강 루틴을 시작하세요.', rev:'오랜 나쁜 습관을 바꾸기를 계속 미루고 있습니다.' },
    }},
  { id:14, name:'Temperance',       nameKo:'절제',              symbol:'⚗️', element:'화(火)', keyword:'조화와 균형',
    upright:'균형과 조화가 필요합니다. 인내심을 가지고 천천히 나아가세요.',
    reversed:'극단적인 행동이나 과잉 상태를 조절해야 합니다.',
    areaMsg: {
      money:  { up:'균형 잡힌 재테크가 장기적으로 큰 결실을 맺습니다.', rev:'극단적인 소비나 투자 행동을 자제하세요.' },
      love:   { up:'인내와 조화로움이 관계를 더욱 깊게 합니다.', rev:'관계에서 극단적인 행동을 조심하세요.' },
      career: { up:'꾸준히 균형을 유지하며 나아가면 목표에 도달합니다.', rev:'업무와 휴식의 균형이 무너지고 있습니다.' },
      health: { up:'식이, 운동, 휴식의 균형이 건강의 열쇠입니다.', rev:'한쪽으로 치우친 생활이 건강을 해치고 있습니다.' },
    }},
  { id:15, name:'The Devil',        nameKo:'악마',              symbol:'⛓️', element:'지(地)', keyword:'집착과 해방',
    upright:'당신을 옥죄는 것들을 인식하세요. 집착에서 벗어날 힘이 있습니다.',
    reversed:'오랜 굴레에서 해방될 조짐이 보입니다.',
    areaMsg: {
      money:  { up:'물질에 대한 집착이 더 큰 자유를 방해하고 있습니다.', rev:'재정적 속박에서 서서히 벗어나고 있습니다.' },
      love:   { up:'관계에서 집착이나 의존 패턴을 점검하세요.', rev:'불건전한 관계 패턴에서 벗어날 용기가 생기고 있습니다.' },
      career: { up:'불만족스러운 일에 묶여 있다고 느끼시나요? 선택권이 있습니다.', rev:'억압적인 직장 환경에서 해방될 기회가 옵니다.' },
      health: { up:'중독성 있는 습관이나 행동 패턴을 점검하세요.', rev:'건강을 해치던 습관에서 벗어나는 힘이 생기고 있습니다.' },
    }},
  { id:16, name:'The Tower',        nameKo:'탑',                symbol:'⚡', element:'화(火)', keyword:'급변과 각성',
    upright:'예상치 못한 충격이 있을 수 있으나 이것은 필요한 변화입니다.',
    reversed:'재앙을 피했거나 변화가 지연되고 있습니다.',
    areaMsg: {
      money:  { up:'재정적 충격이 있을 수 있습니다. 비상금을 마련해두세요.', rev:'큰 재정 위기를 간신히 피했거나 아직 앞에 있습니다.' },
      love:   { up:'관계의 갑작스러운 변화가 올 수 있습니다. 솔직하게 소통하세요.', rev:'관계 위기가 표면화되지 않고 잠복해 있습니다.' },
      career: { up:'직업적 변화가 갑자기 찾아올 수 있습니다. 유연성을 키우세요.', rev:'직업적 위기가 서서히 다가오고 있습니다.' },
      health: { up:'건강에 갑작스러운 변화가 있을 수 있습니다. 정기검진을 받으세요.', rev:'건강 경고 신호를 더 이상 무시하지 마세요.' },
    }},
  { id:17, name:'The Star',         nameKo:'별',                symbol:'⭐', element:'풍(風)', keyword:'희망과 치유',
    upright:'희망과 치유의 에너지가 가득합니다. 미래에 대한 믿음을 가지세요.',
    reversed:'자신감 부족이나 절망이 앞을 가리고 있습니다.',
    areaMsg: {
      money:  { up:'희망적인 재물 흐름이 시작됩니다. 믿음을 가지고 나아가세요.', rev:'재정에 대한 불안감이 더 큰 기회를 가리고 있습니다.' },
      love:   { up:'치유와 희망의 에너지가 관계를 밝게 비춥니다.', rev:'상처 받은 감정이 새로운 인연을 막고 있습니다.' },
      career: { up:'미래에 대한 희망이 성장을 이끕니다. 꿈을 포기하지 마세요.', rev:'커리어에 대한 자신감을 회복할 시간이 필요합니다.' },
      health: { up:'회복의 기운이 가득합니다. 치유가 시작되고 있습니다.', rev:'건강 회복에 대한 희망을 잃지 마세요.' },
    }},
  { id:18, name:'The Moon',         nameKo:'달',                symbol:'🌕', element:'수(Water)', keyword:'환상과 불안',
    upright:'직관을 믿되 환상을 경계하세요. 숨겨진 진실이 드러날 것입니다.',
    reversed:'두려움과 환상에서 점차 벗어나고 있습니다.',
    areaMsg: {
      money:  { up:'재정 관련 정보가 불분명합니다. 신중하게 확인하세요.', rev:'재정에 관한 혼란이 서서히 정리되고 있습니다.' },
      love:   { up:'관계에서 불확실함이 느껴집니다. 직접 소통으로 해소하세요.', rev:'관계에 대한 불안감이 조금씩 해소되고 있습니다.' },
      career: { up:'직장 상황이 불명확합니다. 성급한 결정보다 관찰이 필요합니다.', rev:'직업적 혼란이 명확해지기 시작합니다.' },
      health: { up:'심리적 불안이 신체 건강에 영향을 주고 있습니다.', rev:'건강에 대한 불안이 줄어들고 있습니다.' },
    }},
  { id:19, name:'The Sun',          nameKo:'태양',              symbol:'☀️', element:'화(火)', keyword:'성공과 기쁨',
    upright:'밝고 긍정적인 에너지가 가득합니다. 성공과 행복이 찾아옵니다.',
    reversed:'낙관주의가 지나쳐 현실을 직시하지 못하고 있습니다.',
    areaMsg: {
      money:  { up:'재물운이 최고조에 달합니다. 밝은 전망이 펼쳐집니다.', rev:'지나친 낙관으로 재정 위험을 과소평가하고 있습니다.' },
      love:   { up:'사랑과 기쁨이 가득한 행복한 시간입니다.', rev:'감정이 너무 앞서 현실적인 부분을 놓치고 있습니다.' },
      career: { up:'커리어에서 빛나는 성공이 찾아옵니다.', rev:'성급한 자신감이 실수를 유발할 수 있습니다.' },
      health: { up:'최상의 건강 상태입니다. 활기차고 생동감 넘치는 날입니다.', rev:'과도한 활동으로 에너지를 소진하지 않도록 주의하세요.' },
    }},
  { id:20, name:'Judgement',        nameKo:'심판',              symbol:'🎺', element:'화(火)', keyword:'각성과 부활',
    upright:'중요한 깨달음의 시간입니다. 과거를 정산하고 새롭게 태어나세요.',
    reversed:'자기 비판이 과도하거나 부름에 응답하지 않고 있습니다.',
    areaMsg: {
      money:  { up:'과거의 재정 실수를 정산하고 새로운 시작을 할 때입니다.', rev:'재정적 과거를 놓아주지 못해 앞으로 나아가지 못하고 있습니다.' },
      love:   { up:'관계를 돌아보고 새로운 차원으로 발전시킬 기회입니다.', rev:'과거의 상처가 현재 관계를 방해하고 있습니다.' },
      career: { up:'커리어에서 중요한 소명을 발견하게 됩니다.', rev:'능력에 대한 지나친 자기 비판이 성장을 막고 있습니다.' },
      health: { up:'건강에 대한 새로운 각성이 삶을 변화시킵니다.', rev:'건강 관리의 부름을 더 이상 무시하지 마세요.' },
    }},
  { id:21, name:'The World',        nameKo:'세계',              symbol:'🌍', element:'지(地)', keyword:'완성과 성취',
    upright:'완성과 성취의 순간입니다. 모든 노력이 결실을 맺습니다.',
    reversed:'목표를 향해 아직 갈 길이 남아 있습니다.',
    areaMsg: {
      money:  { up:'재물운이 완성에 달합니다. 오랜 노력의 결실을 맺습니다.', rev:'재정 목표 달성이 아직 완전하지 않습니다. 계속 나아가세요.' },
      love:   { up:'완전하고 성취감 있는 사랑이 찾아옵니다.', rev:'관계에서 완성을 위한 마지막 퍼즐 조각이 남아 있습니다.' },
      career: { up:'커리어의 정점에 도달합니다. 축하할 시간입니다.', rev:'성공이 아직 완결되지 않았습니다. 마지막 한 걸음이 필요합니다.' },
      health: { up:'건강이 완전하게 회복되거나 최상의 상태에 이릅니다.', rev:'건강 목표를 향해 꾸준히 나아가고 있습니다.' },
    }},
];

/* ── seed utils ─────────────────────────────── */
const djb2 = (s: string): number => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0;
  return h;
};

const drawCard = (area: string, seedSuffix: string) => {
  const seed = seedSuffix || new Date().toISOString().slice(0, 10);
  const idx = djb2(seed + area) % CARDS.length;
  const rev = (djb2(seed + area + 'rev') % 2) === 1;
  return { card: CARDS[idx], reversed: rev };
};

/* ── card back SVG ──────────────────────────── */
const CardBack = () => (
  <svg viewBox="0 0 120 200" style={{ width: '100%', height: '100%' }}>
    <rect width="120" height="200" rx="8" fill="#1B2A4A" />
    <rect x="8" y="8" width="104" height="184" rx="6" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
    <circle cx="60" cy="100" r="32" fill="none" stroke="#C9A84C" strokeWidth="1" />
    <polygon points="60,72 67,92 88,92 72,104 78,124 60,112 42,124 48,104 32,92 53,92" fill="none" stroke="#C9A84C" strokeWidth="1" />
    <circle cx="60" cy="100" r="5" fill="#C9A84C" opacity="0.6" />
  </svg>
);

/* ── single area card ───────────────────────── */
interface AreaCardProps {
  areaInfo: typeof AREAS[number];
  drawn: { card: TaroCard; reversed: boolean } | null;
  flipping: boolean;
  onClick: () => void;
  delay: number;
}

const AreaCard = ({ areaInfo, drawn, flipping, onClick, delay }: AreaCardProps): ReactElement => {
  const msg = drawn
    ? (drawn.reversed
        ? drawn.card.areaMsg[areaInfo.key]?.rev ?? drawn.card.reversed
        : drawn.card.areaMsg[areaInfo.key]?.up ?? drawn.card.upright)
    : null;

  return (
    <div className="taro-area-wrapper" style={{ animationDelay: `${delay}ms` }}>
      <div
        className="taro-area-label"
        style={{ background: areaInfo.color }}
      >
        <span>{areaInfo.icon}</span>
        <span>{areaInfo.label}</span>
      </div>

      {drawn ? (
        <div className={`taro-card-face ${drawn.reversed ? 'reversed' : ''}`} style={{ animationDelay: `${delay}ms` }}>
          <div className="taro-card-symbol">{drawn.card.symbol}</div>
          <div className="taro-card-number">
            {drawn.reversed ? '역방향' : '정방향'} · {drawn.card.element}
          </div>
          <div className="taro-card-name-ko">{drawn.card.nameKo}</div>
          <div className="taro-card-name-en">{drawn.card.name}</div>
          <div className="taro-card-keyword">{drawn.card.keyword}</div>
        </div>
      ) : (
        <div
          className={`taro-card-back taro-area-back ${flipping ? 'flipping' : ''}`}
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        >
          <CardBack />
        </div>
      )}

      {msg && (
        <p className="taro-card-meaning">{msg}</p>
      )}
    </div>
  );
};

/* ── main component ─────────────────────────── */
const TaroReading = (): ReactElement => {
  const [drawn, setDrawn] = useState<Record<AreaKey, { card: TaroCard; reversed: boolean } | null>>({
    money: null, love: null, career: null, health: null,
  });
  const [flipping, setFlipping] = useState<AreaKey | 'all' | null>(null);
  const [seed, setSeed] = useState<string>(() => Date.now().toString());
  const allDrawn = AREAS.every(a => drawn[a.key] !== null);

  const revealArea = useCallback((key: AreaKey) => {
    if (drawn[key] || flipping) return;
    setFlipping(key);
    setTimeout(() => {
      setDrawn(prev => ({ ...prev, [key]: drawCard(key, seed) }));
      setFlipping(null);
    }, 500);
  }, [drawn, flipping, seed]);

  const revealAll = useCallback(() => {
    if (flipping) return;
    setFlipping('all');
    setTimeout(() => {
      const newDrawn = {} as typeof drawn;
      AREAS.forEach(a => { newDrawn[a.key] = drawCard(a.key, seed); });
      setDrawn(newDrawn);
      setFlipping(null);
    }, 600);
  }, [flipping, seed]);

  const reset = () => {
    const newSeed = Date.now().toString();
    setSeed(newSeed);
    setDrawn({ money: null, love: null, career: null, health: null });
    setFlipping(null);
  };

  return (
    <>
      <SEOHead
        title="타로카드 운세 | Suyoung's Secret"
        description="22장의 메이저 아르카나로 재물·사랑·직업·건강 4가지 분야의 운세를 확인하세요."
      />

      <div className="page-header">
        <div className="container">
          <h2>🃏 타로카드 운세</h2>
          <p>4개의 카드가 당신의 재물·사랑·직업·건강을 속삭입니다</p>
        </div>
      </div>

      <section className="section taro-section">
        <div className="container taro-container">

          {!allDrawn && (
            <div className="taro-deck-area">
              <p className="taro-instruction">
                마음을 가라앉히고 집중하세요. 카드를 직접 클릭하거나 한 번에 뽑을 수 있습니다.
              </p>
              <button
                className="taro-draw-btn"
                onClick={revealAll}
                disabled={flipping !== null}
              >
                {flipping ? '카드를 뽑는 중...' : '✨ 4장 한번에 뽑기'}
              </button>
              <div className="taro-area-grid">
                {AREAS.map((a, i) => (
                  <AreaCard
                    key={a.key}
                    areaInfo={a}
                    drawn={drawn[a.key]}
                    flipping={flipping === a.key || flipping === 'all'}
                    onClick={() => revealArea(a.key)}
                    delay={i * 80}
                  />
                ))}
              </div>
            </div>
          )}

          {allDrawn && (
            <div className="taro-results">
              <h3 className="taro-results-title">4가지 분야의 타로 메시지</h3>
              <div className="taro-area-grid">
                {AREAS.map((a, i) => (
                  <AreaCard
                    key={a.key}
                    areaInfo={a}
                    drawn={drawn[a.key]}
                    flipping={false}
                    onClick={() => {}}
                    delay={i * 100}
                  />
                ))}
              </div>

              <div className="taro-summary">
                <h4>종합 메시지</h4>
                <p>
                  {AREAS.map(a => drawn[a.key]!.card.nameKo).join(', ')} 카드가 함께 전하는 오늘의 메시지 —
                  {drawn.money!.reversed || drawn.career!.reversed
                    ? ' 도전이 있는 시기이지만 그 안에 성장의 씨앗이 있습니다. 신중하게 한 걸음씩 나아가세요.'
                    : ' 긍정적인 에너지가 흐릅니다. 자신감을 가지고 적극적으로 행동할 때입니다.'}
                </p>
              </div>

              <button className="taro-reset-btn" onClick={reset}>
                🔄 새로운 카드 뽑기
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default TaroReading;
