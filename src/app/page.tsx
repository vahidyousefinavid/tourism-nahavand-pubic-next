import HeroSection from '@/views/Home/HeroSection';
import LocationSwipperV2 from '@/views/Home/LocationSwipperV2';
import EventSwipperV2 from '@/views/Home/EventSwipperV2';
import InvestmentSection from '@/views/Home/InvestmentSection';
import CityInfo from '@/views/Home/CityInfo';
import HistoryGallery from '@/views/Home/HistoryGallery';
import CTASection from '@/views/Home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── Hero – dark bg, wave into gray-50 ── */}
      <HeroSection />

      {/* ── Locations – bg-gray-50, wave into white ── */}
      <LocationSwipperV2 />

      {/* ── Events – bg-white, wave into amber-50 ── */}
      <EventSwipperV2 />

      {/* ── Investments – bg amber-50→white ── */}
      <InvestmentSection />

      {/* ── City stats – bg-white ── */}
      <CityInfo />

      {/* ── Photo gallery – dark, top wave from white ── */}
      <HistoryGallery />

      {/* ── CTA – dark ── */}
      <CTASection />
    </div>
  );
}
