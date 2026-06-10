'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import { useDirection } from '@/hooks/useDirection';


const gallery = [
  { src: '/images/back32.jpg', caption: 'مسجد جامع نهاوند', sub: 'یادگاری از معماری اسلامی ایران' },
  { src: '/images/back31.jpg', caption: 'سراب گیان', sub: 'چشمه‌ای کهن در دل طبیعت نهاوند' },
  { src: '/images/back3.jpg',  caption: 'طبیعت بکر نهاوند', sub: 'کوه‌های باشکوه و دشت‌های سرسبز' },
  { src: '/images/back4.jpg',  caption: 'چشم‌اندازهای شهر', sub: 'نهاوند، شهری در آغوش طبیعت' },
  { src: '/images/back1.jpg',  caption: 'مناظر زیبا', sub: 'هر گوشه‌ای از این شهر داستانی دارد' },
];

export default function HistoryGallery() {
  const { i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section dir={dir} className="relative overflow-hidden bg-gray-950">

      {/* Section header */}
      <div className="relative z-10 px-4 pt-4 pb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white/75 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-4"
        >
          <Camera className="w-3.5 h-3.5" />
          گالری تصاویر
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2"
        >
          نهاوند از نگاه دوربین
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-sm"
        >
          لحظاتی ناب از طبیعت، تاریخ و فرهنگ این شهر
        </motion.p>
      </div>

      {/* Swiper */}
      <div className="px-3 sm:px-6 pb-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          loop
          centeredSlides
          slidesPerView={1}
          breakpoints={{
            640:  { slidesPerView: 1.15, spaceBetween: 16 },
            1024: { slidesPerView: 1.4,  spaceBetween: 24 },
          }}
          spaceBetween={10}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          speed={900}
          dir={i18n.dir()}
          className="!pb-2"
        >
          {gallery.map((item, index) => (
            <SwiperSlide key={index} className="rounded-2xl overflow-hidden">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl group">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-white font-bold text-base sm:text-xl mb-0.5">{item.caption}</p>
                  <p className="text-white/55 text-xs sm:text-sm">{item.sub}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer link */}
      <div className="pb-12 sm:pb-16 flex justify-center px-4">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
        >
          مشاهده تاریخ شهر
          <ArrowIcon className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
