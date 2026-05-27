import { lazy, Suspense, type ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Saju = lazy(() => import('../pages/Saju'));
const SajuDaily = lazy(() => import('../pages/SajuDaily'));
const SajuCompatibility = lazy(() => import('../pages/SajuCompatibility'));

const Horoscope = lazy(() => import('../pages/Horoscope'));
const HoroscopeCompatibility = lazy(() => import('../pages/HoroscopeCompatibility'));

const Mbti = lazy(() => import('../pages/Mbti'));
const MbtiCompatibility = lazy(() => import('../pages/MbtiCompatibility'));

const About = lazy(() => import('../pages/About'));
const Consult = lazy(() => import('../pages/Consult'));

const Loading = (): ReactElement => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="loading-spinner"></div>
  </div>
);

const PublicLayout = (): ReactElement => (
  <>
    <Navbar />
    <main>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/saju" element={<Saju />} />
          <Route path="/saju/daily" element={<SajuDaily />} />
          <Route path="/saju/compatibility" element={<SajuCompatibility />} />

          <Route path="/horoscope" element={<Horoscope />} />
          <Route path="/horoscope/compatibility" element={<HoroscopeCompatibility />} />

          <Route path="/mbti" element={<Mbti />} />
          <Route path="/mbti/compatibility" element={<MbtiCompatibility />} />

          <Route path="/about" element={<About />} />
          <Route path="/about/consult" element={<Consult />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </>
);

export default PublicLayout;
