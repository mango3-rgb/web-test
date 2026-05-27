import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import site from '../../config/site';
import type { ReactElement, ChangeEvent } from 'react';

const Footer = (): ReactElement => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-mark">황수영 운세</div>
            <p className="footer-tag">
              사주팔자, 별자리, MBTI로 당신의 운명과 성격을 탐구하는 운세 플랫폼.
              황수영이 운영합니다.
            </p>
            <div className="company-info">
              <p><strong>{site.company.name}</strong></p>
              {site.company.email && <p>이메일: {site.company.email}</p>}
              {site.company.businessHours && <p>{site.company.businessHours}</p>}
            </div>
          </div>
          <div>
            <h5>{t('footer.quickLinks')}</h5>
            <ul>
              {site.footerLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path}>{t(link.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>운세</h5>
            <ul>
              <li><a href={site.url + '/saju'}>사주·운세</a></li>
              <li><a href={site.url + '/horoscope'}>별자리</a></li>
              <li><a href={site.url + '/mbti'}>MBTI</a></li>
            </ul>
          </div>
          <div>
            <h5>문의</h5>
            <ul>
              <li>{site.company.email}</li>
              <li>{site.company.phone}</li>
              {site.company.businessHours && <li className="footer-muted">{site.company.businessHours}</li>}
            </ul>
            <div className="footer-family">
              <select
                defaultValue=""
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  if (e.target.value) window.open(e.target.value, '_blank');
                  e.target.value = '';
                }}
              >
                <option value="" disabled>Family Site</option>
                <option value={site.parentSite.url}>{site.parentSite.name} (본사이트)</option>
                {site.familySites.map((s, i) => (
                  <option key={i} value={s.url}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2025 &mdash; {new Date().getFullYear()} 황수영 &middot; All rights reserved</span>
          <span className="footer-version">v.2026.04 &middot; Editorial</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
