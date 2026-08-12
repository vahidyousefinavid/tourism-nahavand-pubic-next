'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * راهنمای ورودی سایت.
 *
 * قبلاً پنج کاشی خیلی ریز شناور روی عکس بودند و برچسب‌هاشان روی موبایل ۹ پیکسل
 * و عملاً ناخوانا بود. حالا هر مقصد یک کارت با عکس واقعی همان موضوع است.
 */
const ENTRIES = [
  {
    href: '/locations',
    key: 'places',
    img: '/images/nahavand/sarab-giyan.webp',
    label: 'مکان‌های دیدنی',
    note: 'سراب‌ها، تپه‌ها و بناهای تاریخی',
  },
  {
    href: '/nature',
    key: 'nature',
    img: '/images/nahavand/meadow.webp',
    label: 'طبیعت‌گردی',
    note: 'دشت‌های گرین و مسیرهای کوهستان',
  },
  {
    href: '/history',
    key: 'history',
    img: '/images/nahavand/castle-archive.webp',
    label: 'تاریخ و فرهنگ',
    note: 'از تپه گیان تا امروز',
  },
  {
    href: '/events',
    key: 'events',
    img: '/images/nahavand/city-park.webp',
    label: 'رویدادها',
    note: 'جشن‌ها و برنامه‌های شهر',
  },
  {
    href: '/investment',
    key: 'investment',
    img: '/images/nahavand/bam-spring.webp',
    label: 'سرمایه‌گذاری',
    note: 'فرصت‌های گردشگری و صنعت',
  },
  {
    href: '/creative-city/secretariat',
    key: 'creativeCity',
    img: '/images/nahavand/mosque.webp',
    label: 'شهر خلاق',
    note: 'دبیرخانهٔ شهر خلاق نهاوند',
  },
];

export default function IndexRail() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section dir={dir} className="bg-[var(--nh-paper)] py-14 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {ENTRIES.map((e, i) => (
            <motion.div
              key={e.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.06 }}
            >
              <Link
                href={e.href}
                className="group relative flex items-end overflow-hidden rounded-2xl aspect-[5/3] sm:aspect-[16/9] bg-[var(--nh-ink)]"
              >
                <Image
                  src={e.img}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--nh-ink)] via-[var(--nh-ink)]/55 to-[var(--nh-ink)]/10" />

                <div className="relative w-full p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-white text-[1.05rem] sm:text-2xl leading-tight">
                      {t(`hero.quickLinks.${e.key}`, e.label)}
                    </h3>
                    <span className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/12 border border-white/25 flex items-center justify-center transition-colors group-hover:bg-[var(--nh-spring)] group-hover:border-[var(--nh-spring)]">
                      <Arrow className="w-4 h-4 text-white" />
                    </span>
                  </div>
                  <p className="text-white/55 text-[0.72rem] sm:text-sm mt-1.5 leading-snug">
                    {t(`indexRail.${e.key}`, e.note)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
