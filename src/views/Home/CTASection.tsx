'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { MapPin, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import Contour from './Contour';

export default function CTASection() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section dir={dir} className="relative overflow-hidden bg-[var(--nh-ink)]">
      {/* عکس واقعی شهر زیر پرده */}
      <div className="absolute inset-0">
        <Image
          src="/images/nahavand/city-clouds.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--nh-ink)]/85 via-[var(--nh-ink)]/75 to-[var(--nh-ink)]" />

      {/* منحنی تراز — همان امضای بخش قهرمان، اینجا بسته می‌شود */}
      <Contour
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 w-[min(70vw,820px)] text-[var(--nh-water)] opacity-[0.18] ${
          isRTL ? 'right-[-14%]' : 'left-[-14%]'
        }`}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 py-20 sm:py-28">
        <div className="max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="flex items-center gap-2.5 mb-5"
          >
            <span className="h-px w-8 bg-[var(--nh-gold)]" />
            <span className="font-data text-[var(--nh-gold)] text-[0.78rem] tracking-[0.13em]">
              {t('cta.badge', 'سفر به نهاوند')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.08 }}
            className="font-display text-white leading-[1.12] mb-5"
            style={{ fontSize: 'var(--nh-h2)' }}
          >
            {t('cta.title', 'یک روز برای نهاوند کم است')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.16 }}
            className="text-white/60 text-[1rem] sm:text-[1.1rem] leading-[2] mb-9 max-w-[46ch]"
          >
            {t(
              'cta.subtitle',
              'سراب‌ها، تپه‌های باستانی و بازار قدیم همه در فاصلهٔ کوتاهی از هم‌اند. از فهرست مکان‌ها شروع کنید و مسیر خودتان را بچینید.',
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/locations"
              className="inline-flex items-center justify-center gap-2.5 bg-[var(--nh-spring)] hover:bg-[var(--nh-spring-dk)] text-white px-7 py-4 rounded-full font-bold text-[0.95rem] sm:text-base transition-colors"
            >
              <MapPin className="w-[1.1rem] h-[1.1rem]" />
              {t('cta.locationsBtn', 'فهرست مکان‌های دیدنی')}
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/16 border border-white/20 text-white px-7 py-4 rounded-full font-bold text-[0.95rem] sm:text-base transition-colors"
            >
              {t('cta.aboutBtn', 'دربارهٔ نهاوند')}
            </Link>
          </motion.div>

          {/* نوار تماس */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.34 }}
            className="mt-12 pt-7 border-t border-white/12 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-white/45 text-[0.85rem]"
          >
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--nh-water)]" />
              {t('cta.contactOrg', 'سازمان گردشگری نهاوند')}
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <span>{t('cta.contactAddress', 'شهرستان نهاوند، استان همدان')}</span>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <Link
              href="/contact"
              className="text-[var(--nh-water)] hover:text-white transition-colors font-bold"
            >
              {t('cta.contactLink', 'تماس با ما')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
