import { type ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Saju from '../pages/Saju';
import SajuDaily from '../pages/SajuDaily';
import SajuCompatibility from '../pages/SajuCompatibility';
import Horoscope from '../pages/Horoscope';
import HoroscopeCompatibility from '../pages/HoroscopeCompatibility';
import Mbti from '../pages/Mbti';
import MbtiCompatibility from '../pages/MbtiCompatibility';
import About from '../pages/About';
import Consult from '../pages/Consult';
import InquiryBoard from '../pages/InquiryBoard';
import DiscussionBoard from '../pages/DiscussionBoard';
import MbtiTest from '../pages/MbtiTest';
import FortuneReading from '../pages/FortuneReading';
import TaroReading from '../pages/TaroReading';
import EnneagramTest from '../pages/EnneagramTest';
import BloodTypeMbtiTest from '../pages/BloodTypeMbtiTest';
import PersonalityComboTest from '../pages/PersonalityComboTest';
import AdminPage from '../pages/AdminPage';
import ConsultChat from '../pages/ConsultChat';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import MyPage from '../pages/MyPage';
import OrderHistory from '../pages/OrderHistory';

const PublicLayout = (): ReactElement => (
  <>
    <Navbar />
    <main>
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

        <Route path="/board/inquiry" element={<InquiryBoard />} />
        <Route path="/board/discussion" element={<DiscussionBoard />} />
        <Route path="/board/consult" element={<ConsultChat />} />

        <Route path="/mbti/test" element={<MbtiTest />} />
        <Route path="/mbti/bloodtype" element={<BloodTypeMbtiTest />} />
        <Route path="/mbti/enneagram-test" element={<EnneagramTest />} />
        <Route path="/mbti/enneagram" element={<PersonalityComboTest />} />

        <Route path="/fortune" element={<FortuneReading />} />
        <Route path="/taro" element={<TaroReading />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/orders" element={<OrderHistory />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </>
);

export default PublicLayout;
