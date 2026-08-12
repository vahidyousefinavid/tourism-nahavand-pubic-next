import HeroSection from '@/views/Home/HeroSection';
import IndexRail from '@/views/Home/IndexRail';
import TourismMap from '@/views/Home/TourismMap';
import EventSwipperV2 from '@/views/Home/EventSwipperV2';
import InvestmentSection from '@/views/Home/InvestmentSection';
import CityInfo from '@/views/Home/CityInfo';
import HistoryGallery from '@/views/Home/HistoryGallery';
import CTASection from '@/views/Home/CTASection';

/**
 * ترتیب صفحه از منطق سفر می‌آید، نه از فهرست منو:
 * شهر را ببین → از کجا شروع کنم → کجای نقشه → کِی بروم → این روزها چه خبر →
 * قاب‌های شهر → سرمایه‌گذاری (مخاطب متفاوت، پس پایین‌تر) → دعوت پایانی.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--nh-paper)]">
      <HeroSection />
      <IndexRail />
      <TourismMap />
      <CityInfo />
      <EventSwipperV2 />
      <HistoryGallery />
      <InvestmentSection />
      <CTASection />
    </div>
  );
}
