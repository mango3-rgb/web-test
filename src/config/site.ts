import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'mystic',

  name: "Suyoung's Secret",
  nameKo: '사주·별자리·MBTI 운세',
  description: "사주팔자, 별자리, MBTI로 당신의 운명과 성격을 알아보세요. Suyoung's Secret.",
  url: 'https://mango3-rgb.github.io/web-test',

  dbPrefix: 'mystic_',

  parentSite: {
    name: "Suyoung's Secret",
    url: 'https://mango3-rgb.github.io/web-test'
  },

  brand: {
    parts: [
      { text: "Suyoung's", className: 'brand-dream' },
      { text: ' Secret', className: 'brand-it' },
    ]
  },

  themeColor: '#1B2A4A',

  company: {
    name: "Suyoung's Secret",
    ceo: '운영자',
    bizNumber: '',
    address: '',
    email: 'mango3_sy@kdn.com',
    phone: '',
    businessHours: '이메일 문의를 이용해 주세요',
  },

  features: {
    shop: false,
    community: true,
    search: false,
    auth: true,
    license: false,
  },

  colors: [
    { name: 'arctic', color: '#00CFFF' },
    { name: 'autumn', color: '#D4960A' },
  ],

  menuItems: [
    {
      labelKey: 'site.nav.fortune',
      path: '/fortune',
      activePath: '/fortune',
    },
    {
      labelKey: 'site.nav.saju',
      path: '/saju',
      activePath: '/saju',
      dropdown: [
        { path: '/saju', labelKey: 'site.nav.sajuReading' },
        { path: '/saju/daily', labelKey: 'site.nav.sajuDaily' },
        { path: '/saju/compatibility', labelKey: 'site.nav.sajuCompatibility' },
      ]
    },
    {
      labelKey: 'site.nav.horoscope',
      path: '/horoscope',
      activePath: '/horoscope',
      dropdown: [
        { path: '/horoscope', labelKey: 'site.nav.horoscopeSign' },
        { path: '/horoscope/compatibility', labelKey: 'site.nav.horoscopeCompatibility' },
      ]
    },
    {
      labelKey: 'site.nav.taro',
      path: '/taro',
      activePath: '/taro',
    },
    {
      labelKey: 'site.nav.mbti',
      path: '/mbti',
      activePath: '/mbti',
      dropdown: [
        { path: '/mbti', labelKey: 'site.nav.mbtiTypes' },
        { path: '/mbti/compatibility', labelKey: 'site.nav.mbtiCompatibility' },
        { path: '/mbti/test', labelKey: 'site.nav.mbtiTest' },
        { path: '/mbti/bloodtype', labelKey: 'site.nav.bloodtypeMbti' },
        { path: '/mbti/enneagram-test', labelKey: 'site.nav.enneagramTest' },
        { path: '/mbti/enneagram', labelKey: 'site.nav.comboTest' },
      ]
    },
    {
      labelKey: 'site.nav.board',
      path: '/board/inquiry',
      activePath: '/board',
      dropdown: [
        { path: '/board/inquiry', labelKey: 'site.nav.boardInquiry' },
        { path: '/board/consult', labelKey: 'site.nav.boardConsult' },
      ]
    },
  ],

  footerLinks: [
    { path: '/saju', labelKey: 'site.nav.saju' },
    { path: '/horoscope', labelKey: 'site.nav.horoscope' },
    { path: '/mbti', labelKey: 'site.nav.mbti' },
  ],

  familySites: [],
};

export default site;
