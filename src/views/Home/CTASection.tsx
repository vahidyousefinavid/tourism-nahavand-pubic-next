'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { MapPin, Phone, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section dir={dir} className="relative overflow-hidden bg-gray-950">
      {/* bg photo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/images/back1.jpg')" }}
      />
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-gray-950/70 to-teal-950/80" />
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* glow blobs */}
      <div className="absolute -top-24 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20 sm:py-28">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
        >
          {t('cta.badge', 'سفر به نهاوند')}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight"
        >
          {t('cta.title', 'آماده کشف نهاوند هستید؟')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t('cta.subtitle', 'با ما همراه شوید و بهترین تجربه سفر را داشته باشید')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
        >
          <Link
            href="/locations"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-200 hover:scale-105 shadow-xl shadow-emerald-900/40"
          >
            <MapPin className="w-4 h-4" />
            {t('cta.locationsBtn', 'مکان‌های گردشگری')}
            <ArrowIcon className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-200 hover:scale-105"
          >
            {t('cta.aboutBtn', 'درباره ما')}
          </Link>
        </motion.div>

        {/* contact strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40 text-sm"
        >
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-500" />
            {t('cta.contactOrg', 'سازمان گردشگری نهاوند')}
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span>{t('cta.contactAddress', 'شهرستان نهاوند، استان همدان')}</span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            {t('cta.contactLink', 'تماس با ما')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
