'use client';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import Image from 'next/image';
import { Sun, Route, Mountain, CalendarRange } from 'lucide-react';
import SectionHeader from './SectionHeader';

/**
 * «پیش از سفر» — اطلاعات کاربردی برنامه‌ریزی سفر.
 *
 * قبلاً این بخش همان چهار عدد نوار قهرمان را دوباره نشان می‌داد (جمعیت، ارتفاع، مساحت).
 * حالا که آن ارقام بالای صفحه هستند، اینجا چیزی می‌گوید که مسافر واقعاً لازم دارد:
 * کی برود، چطور برسد، و چه انتظاری از هوا داشته باشد.
 */
export default function CityInfo() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  const practical = [
    {
      icon: <CalendarRange className="w-5 h-5" />,
      label: t('cityInfo.practical.season.label', 'بهترین فصل'),
      value: t('cityInfo.practical.season.value', 'اردیبهشت تا مهر'),
      note: t('cityInfo.practical.season.note', 'سراب‌ها پرآب و دشت‌ها سبزند'),
    },
    {
      icon: <Route className="w-5 h-5" />,
      label: t('cityInfo.practical.access.label', 'دسترسی'),
      value: t('cityInfo.practical.access.value', '۹۰ کیلومتر تا همدان'),
      note: t('cityInfo.practical.access.note', 'حدود ۴۰۰ کیلومتر تا تهران'),
    },
    {
      icon: <Mountain className="w-5 h-5" />,
      label: t('cityInfo.practical.terrain.label', 'ناهمواری'),
      value: t('cityInfo.practical.terrain.value', 'کوهستانی'),
      note: t('cityInfo.practical.terrain.note', 'شهر ۱٬۷۴۰ م، گرین تا ۳٬۶۲۳ م'),
    },
    {
      icon: <Sun className="w-5 h-5" />,
      label: t('cityInfo.practical.climate.label', 'آب‌وهوا'),
      value: t('cityInfo.practical.climate.value', 'تابستان معتدل'),
      note: t('cityInfo.practical.climate.note', 'زمستان سرد و برفی'),
    },
  ];

  return (
    <section dir={dir} className="bg-[var(--nh-paper-warm)] py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
        <SectionHeader
          eyebrow={t('cityInfo.sectionTag', 'پیش از سفر')}
          title={t('cityInfo.title', 'چه وقت، و از کدام راه')}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* متن + جدول اطلاعات */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-[var(--nh-ink)]/75 text-[1rem] sm:text-[1.08rem] leading-[2.05] mb-9"
            >
              {t(
                'cityInfo.description',
                'نهاوند در جنوبی‌ترین گوشهٔ استان همدان، میان کوه گرین و دشت گاماسیاب نشسته است. ارتفاع زیاد تابستان‌ها را خنک نگه می‌دارد و برف زمستان همان چیزی است که سراب‌ها را سال بعد پرآب می‌کند. بیشتر جاذبه‌ها در فاصلهٔ کوتاهی از مرکز شهرند و در یک روز می‌شود چندتاشان را دید.',
              )}
            </motion.p>

            <dl className="border-t border-[var(--nh-line)]">
              {practical.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-4 sm:gap-6 py-4 border-b border-[var(--nh-line)]"
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-[var(--nh-spring)]/10 text-[var(--nh-spring)] flex items-center justify-center">
                    {p.icon}
                  </span>
                  <dt className="font-data text-[var(--nh-ink)]/45 text-[0.76rem] sm:text-[0.84rem] w-[5.5rem] sm:w-28 shrink-0">
                    {p.label}
                  </dt>
                  <dd className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="font-bold text-[var(--nh-ink)] text-[0.92rem] sm:text-base leading-tight">
                      {p.value}
                    </p>
                    <p className="text-[var(--nh-ink)]/50 text-[0.75rem] sm:text-[0.82rem] mt-0.5">
                      {p.note}
                    </p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          {/* عکس */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/10] lg:aspect-[5/6]"
          >
            <Image
              src="/images/nahavand/giyan-spring.webp"
              alt={t('cityInfo.photoAlt', 'سراب گیان در نهاوند')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <figcaption
              className={`absolute inset-x-0 bottom-0 p-5 sm:p-7 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              <p className="font-display text-white text-xl sm:text-2xl">
                {t('cityInfo.photoTitle', 'سراب گیان')}
              </p>
              <p className="text-white/60 text-[0.8rem] sm:text-sm mt-1">
                {t('cityInfo.photoNote', 'یکی از سرچشمه‌های گاماسیاب، ۱۵ دقیقه از مرکز شهر')}
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
