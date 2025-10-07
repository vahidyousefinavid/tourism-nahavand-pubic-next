'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Clock, DollarSign, Star, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Location } from '@/types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation as SwiperNavigation } from 'swiper/modules';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface LocationModalContentProps {
  location: Location;
  openInMaps: (coordinates: [number, number]) => void;
}

export function LocationModalContent({ location, openInMaps }: LocationModalContentProps) {
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setSlideIndex(index);
    setOpen(true);
  };

  const slides = location.images.map((src) => ({
    src: process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL + src
      : src,
  }));

  return (
    <div className="space-y-6">
      {/* Swiper Image Gallery */}
      <Swiper
        modules={[SwiperNavigation]}
        navigation
        slidesPerView={1}
        spaceBetween={10}
        className="rounded-lg overflow-hidden"
      >
        {location.images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-64 md:h-80 cursor-zoom-in"
              onClick={() => handleOpenLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenLightbox(index);
                }
              }}
              aria-label={`باز کردن تصویر ${index + 1}`}
            >
              <img
                src={
                  process.env.NEXT_PUBLIC_API_URL
                    ? process.env.NEXT_PUBLIC_API_URL + image
                    : image
                }
                alt={`${location.name['fa']} - تصویر ${index + 1}`}
                // fill
                className="object-cover rounded-lg"
                // priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={slideIndex}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{
          container: { zIndex: 1050 },
        }}
      />

      {/* Description */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">توضیحات</h3>
        <p className="text-gray-600 leading-relaxed">
          {location.description['fa']}
        </p>
      </section>

      {/* Details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">اطلاعات کلی</h3>
          <div className="space-y-2">
            <div className="flex gap-2 items-center space-x-2 space-x-reverse">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                ساعات بازدید: {location.openingHours['fa']}
              </span>
            </div>
            <div className="flex gap-2 items-center space-x-2 space-x-reverse">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                هزینه ورودی: {location.entryFee['fa']}
              </span>
            </div>
            <div className="flex gap-2 items-center space-x-2 space-x-reverse">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-gray-600">
                امتیاز: {location.rating} از 5
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">امکانات</h3>
          <div className="flex flex-wrap gap-2">
            {location.facilities?.['fa']?.map((facility, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Navigation */}
      {location.latlng && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">موقعیت مکانی</h3>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 mb-4">
              مختصات: {location.latlng.lat}, {location.latlng.lng}
            </p>
            <Button
              onClick={() =>
                openInMaps([location?.latlng?.lat, location.latlng?.lng])
              }
              className="flex items-center space-x-2 space-x-reverse mx-auto"
            >
              <Navigation className="w-4 h-4" />
              <span>مشاهده در نقشه</span>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
