import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'mystic',

  name: '운세 플랫폼',
  nameKo: '사주·별자리·MBTI 운세',
  description: '사주팔자, 별자리, MBTI로 당신의 운명과 성격을 알아보세요. 사주·별자리·MBTI 운세 플랫폼.',
  url: 'https://mango3-rgb.github.io/web-test',

  dbPrefix: 'mystic_',

  parentSite: {
    name: '운세 플랫폼',
    url: 'https://mango3-rgb.github.io/web-test'
  },

  brand: {
    parts: [
      { text: '운세', className: 'brand-dream' },
      { text: ' 플랫폼', className: 'brand-it' },
    ]
  },

  themeColor: '#1B2A4A',

  company: {
    name: '운세 플랫폼',
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
    auth: false,
    license: false,
  },

  colors: [
    { name: 'blue', color: '#1B2A4A' },
    { name: 'purple', color: '#5B2C8B' },
    { name: 'red', color: '#C8102E' },
    { name: 'green', color: '#00855A' },
    { name: 'orange', color: '#D4760A' },
  ],

  menuItems: [
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
      labelKey: 'site.nav.mbti',
      path: '/mbti',
      activePath: '/mbti',
      dropdown: [
        { path: '/mbti', labelKey: 'site.nav.mbtiTypes' },
        { path: '/mbti/compatibility', labelKey: 'site.nav.mbtiCompatibility' },
        { path: '/mbti/test', labelKey: 'site.nav.mbtiTest' },
      ]
    },
    {
      labelKey: 'site.nav.board',
      path: '/board/inquiry',
      activePath: '/board',
      dropdown: [
        { path: '/board/inquiry', labelKey: 'site.nav.boardInquiry' },
        { path: '/board/discussion', labelKey: 'site.nav.boardDiscussion' },
      ]
    },
    {
      labelKey: 'site.nav.fortune',
      path: '/fortune',
      activePath: '/fortune',
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
