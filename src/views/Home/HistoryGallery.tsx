'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDirection } from '@/hooks/useDirection';
import SectionHeader from './SectionHeader';

/**
 * گالری — هر قاب یک جای واقعی در نهاوند است و اسمش را می‌گوید.
 *
 * تصاویر قبلی سه بار آبشار سلیالندسفوس ایسلند بودند. این‌ها همه از ویکی‌مدیا کامنز
 * و همه واقعاً نهاوندند (فهرست کامل و مجوزها در public/images/nahavand/CREDITS.md).
 *
 * چیدمان موزائیکی است نه اسلایدر: عکس‌ها ثابت‌اند و کاربر همه را یکجا می‌بیند.
 */
const GALLERY = [
  {
    src: '/images/nahavand/sarab-giyan.webp',
    key: 'sarabGiyan',
    title: 'سراب گیان',
    sub: 'چشمه‌ای که از پای تپهٔ گیان می‌جوشد',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: '/images/nahavand/faresban.webp',
    key: 'faresban',
    title: 'سراب فارسبان',
    sub: 'آب سرد کوهستان',
    span: '',
  },
  {
    src: '/images/nahavand/mosque.webp',
    key: 'mosque',
    title: 'مسجد حاج‌خدارحم',
    sub: 'کاشی‌کاری دورهٔ قاجار',
    span: '',
  },
  {
    src: '/images/nahavand/bam-spring.webp',
    key: 'bamSpring',
    title: 'بام نهاوند در بهار',
    sub: 'صخره‌های سرخ بالای دریاچه',
    span: 'sm:col-span-2',
  },
  {
    src: '/images/nahavand/meadow.webp',
    key: 'meadow',
    title: 'دشت‌های گرین',
    sub: 'چراگاه‌های بهاری زیر برف کوه',
    span: '',
  },
  {
    src: '/images/nahavand/kayserye.webp',
    key: 'kayserye',
    title: 'قیصریهٔ نهاوند',
    sub: 'آجرکاری بازار قدیم',
    span: '',
  },
];

export default function HistoryGallery() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section dir={dir} className="relative bg-[var(--nh-ink)] py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
        <SectionHeader
          tone="dark"
          eyebrow={t('historyGallery.sectionTag', 'گالری تصاویر')}
          title={t('historyGallery.title', 'نهاوند، قاب به قاب')}
          subtitle={t(
            'historyGallery.subtitle',
            'همهٔ عکس‌ها از خود نهاوند است — با نام همان جایی که در تصویر می‌بینید.',
          )}
          href="/history"
          linkLabel={t('historyGallery.viewHistory', 'تاریخ شهر')}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] gap-2.5 sm:gap-4">
          {GALLERY.map((item, i) => (
            <motion.figure
              key={item.key}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.06 }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl ${item.span}`}
            >
              <Image
                src={item.src}
                alt={t(`historyGallery.items.${item.key}`, item.title)}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <figcaption
                className={`absolute inset-x-0 bottom-0 p-3.5 sm:p-5 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                <p className="font-display text-white text-[0.95rem] sm:text-xl leading-tight">
                  {t(`historyGallery.items.${item.key}`, item.title)}
                </p>
                <p className="text-white/55 text-[0.68rem] sm:text-[0.82rem] mt-0.5 leading-snug">
                  {t(`historyGallery.items.${item.key}Sub`, item.sub)}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="font-data text-white/30 text-[0.66rem] sm:text-[0.72rem] mt-5">
          {t(
            'historyGallery.credit',
            'تصاویر: ویکی‌مدیا کامنز — CC BY-SA / CC BY / CC0',
          )}
        </p>

        <div className="mt-8 sm:hidden">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-full text-sm font-bold"
          >
            {t('historyGallery.viewHistory', 'تاریخ شهر')}
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
