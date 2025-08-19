import LocationSwipperV2 from '@/views/Home/LocationSwipperV2';
import TourismTypewriter from '@/views/Home/TourismTypewriter';
import EventSwipperV2 from '@/views/Home/EventSwipperV2';
import CityInfo from '@/views/Home/CityInfo';
import HistoryGallery from '@/views/Home/HistoryGallery';
import CTASection from '@/views/Home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center pt-[80px] sm:pt-[40px]  relative">
        <img
          src="/images/m.png"
          alt="background"
          className="max-w-[80%] max-h-[80vh] rounded-xl object-contain"
        />
      </div>
      {/* <SwitcherCard /> */}
      <TourismTypewriter />
      {/* Featured Locations */}
      <LocationSwipperV2 />
      {/* Upcoming Events */}
      <EventSwipperV2 />
      <CityInfo />
      <HistoryGallery />
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}