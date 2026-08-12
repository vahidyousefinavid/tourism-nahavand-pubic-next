'use client';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MapPin, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import NahavandGlobe from './NahavandGlobe';

/* ارقام واقعی شهر */
const FACTS = [
  { key: 'elevation', value: '۱٬۷۴۰', unit: 'متر', label: 'ارتفاع از دریا' },
  { key: 'population', value: '۱۲۰', unit: 'هزار نفر', label: 'جمعیت شهر' },
  { key: 'springs', value: '۳', unit: 'سراب بزرگ', label: 'گیان، فارسبان، گاماسیاب' },
  { key: 'settled', value: '۷٬۰۰۰', unit: 'سال', label: 'سکونت پیوسته از تپه گیان' },
];

/** کره باید با عرض صفحه بزرگ و کوچک شود، ولی کانواس به عدد پیکسلی نیاز دارد. */
function useGlobeSize() {
  const [size, setSize] = useState(420);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) return Math.min(w * 0.78, 330);
      if (w < 1024) return 400;
      return Math.min(w * 0.34, 560);
    };
    const apply = () => setSize(Math.round(calc()));
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);
  return size;
}

export default function HeroSection() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const globeSize = useGlobeSize();

  return (
    <section
      dir={dir}
      /* منفی‌کردن پدینگ ۱۰۰ پیکسلی لِی‌اوت تا بخش واقعاً تمام‌قد باشد */
      className="relative -mt-[100px] min-h-[100svh] flex flex-col overflow-hidden bg-[var(--nh-ink)]"
    >
      {/* ── زمینه: بدون عکس. یک تابش ملایم که کره را از دل آن بیرون می‌آورد ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 8%, #1b2f27 0%, #16241d 42%, var(--nh-ink) 78%)',
        }}
      />
      {/* شبکهٔ نقطه‌ای بسیار محو — بافت، نه تزئین */}
      <div
        className="absolute inset-0 opacity-[0.05] hidden sm:block"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(143,192,182,0.9) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />

      {/* ══ محتوا ══ */}
      <div className="relative z-10 flex-1 flex items-center px-5 sm:px-8 lg:px-14 pt-[124px] pb-10">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-10 lg:gap-14 items-center">

            {/* ── متن ── */}
            <div className="max-w-[660px] text-start order-2 lg:order-1">
              {/* ابرو */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2.5 mb-6"
              >
                <span className="h-px w-9 bg-[var(--nh-gold)]" />
                <span className="font-data text-[var(--nh-gold)] text-[0.78rem] sm:text-sm font-medium tracking-[0.14em]">
                  {t('hero.locationBadge', 'استان همدان · غرب ایران')}
                </span>
              </motion.div>

              {/* نام شهر */}
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-white leading-[0.88] mb-6 select-none"
                style={{ fontSize: 'var(--nh-display)' }}
              >
                {t('hero.cityName', 'نهاوند')}
              </motion.h1>

              {/* جملهٔ معرفی */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="text-white/75 text-[1.02rem] sm:text-xl lg:text-[1.28rem] leading-[1.9] mb-9 max-w-[38ch]"
              >
                {t(
                  'hero.lead',
                  'شهری بر بلندای ۱٬۷۴۰ متر، در کاسه‌ای از زاگرس؛ جایی که سرچشمه‌های گاماسیاب از دل سنگ بیرون می‌زنند و تپهٔ گیان هفت هزار سال زندگی را زیر خاک نگه داشته است.',
                )}
              </motion.p>

              {/* دو کنش اصلی */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  href="/locations"
                  className="group inline-flex items-center justify-center gap-2.5 bg-[var(--nh-spring)] hover:bg-[var(--nh-spring-dk)] text-white ps-7 pe-6 py-4 rounded-full font-bold text-[0.95rem] sm:text-base transition-colors shadow-[0_14px_40px_-12px_rgba(14,107,88,0.9)]"
                >
                  <MapPin className="w-[1.15rem] h-[1.15rem] shrink-0" />
                  {t('hero.ctaLocations', 'مکان‌های دیدنی نهاوند')}
                  <Arrow className="w-4 h-4 shrink-0 transition-transform rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/8 hover:bg-white/16 border border-white/20 text-white px-7 py-4 rounded-full font-bold text-[0.95rem] sm:text-base transition-colors"
                >
                  <Calendar className="w-[1.15rem] h-[1.15rem] shrink-0" />
                  {t('hero.ctaEvents', 'رویدادهای پیش رو')}
                </Link>
              </motion.div>
            </div>

            {/* ── کره ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2 justify-self-center shrink-0"
            >
              <NahavandGlobe
                size={globeSize}
                label={t('hero.globeAlt', 'کرهٔ زمین؛ ایران مشخص شده و نهاوند روی آن علامت خورده است')}
              />
              {/* کره یک کار مشخص می‌کند: نشان می‌دهد نهاوند کجای زمین است.
                  پس مختصات را زیرش می‌نویسیم تا تصویر ادعایش را کامل کند. */}
              <p className="font-data text-center text-[var(--nh-water)]/50 text-[0.7rem] sm:text-[0.76rem] tracking-wide mt-3">
                {t('hero.coords', '۳۴°۱۱′ شمالی · ۴۸°۲۲′ شرقی')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ نوار ارقام ══ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 border-t border-white/12"
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px">
            {FACTS.map((f) => (
              <div key={f.key} className="py-5 sm:py-6 px-1 sm:px-5 lg:px-6">
                <dd className="flex items-baseline gap-1.5 mb-1 flex-wrap">
                  <span className="font-data font-black text-white text-[1.6rem] sm:text-[2.1rem] leading-none">
                    {t(`hero.facts.${f.key}.value`, f.value)}
                  </span>
                  <span className="text-white/55 text-[0.72rem] sm:text-sm">
                    {t(`hero.facts.${f.key}.unit`, f.unit)}
                  </span>
                </dd>
                <dt className="text-white/40 text-[0.7rem] sm:text-[0.8rem] leading-snug">
                  {t(`hero.facts.${f.key}.label`, f.label)}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
