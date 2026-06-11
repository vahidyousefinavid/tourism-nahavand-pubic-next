'use client';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import TourismTypewriter from './TourismTypewriter';
import Link from 'next/link';
import { MapPin, Calendar, ChevronDown, Mountain, Users, Compass } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();
  const { dir } = useDirection();

  const stats = [
    { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, value: t('cityInfo.population.value', '۱۲۰,۰۰۰+'), label: t('hero.statResident', 'ساکن') },
    { icon: <Mountain className="w-4 h-4 sm:w-5 sm:h-5" />, value: t('cityInfo.height.value', '۱,۷۴۰'), label: t('hero.statElevation', 'متر ارتفاع') },
    { icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, value: t('cityInfo.area.value', '۱,۵۲۴'), label: t('hero.statArea', 'کیلومتر مربع') },
    { icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5" />, value: '۱۸۰+', label: t('hero.statDestinations', 'مقصد گردشگری') },
  ];

  return (
    <div dir={dir} className="relative min-h-[calc(100vh-100px)] flex flex-col overflow-hidden">

      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/back2.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/85" />
      {/* Dot grid — desktop only */}
      <div
        className="absolute inset-0 opacity-[0.05] hidden md:block"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Center content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto flex-1 justify-center py-10 sm:py-14">

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0" />
            {t('hero.locationBadge', 'نهاوند · استان همدان · غرب ایران')}
          </span>
        </motion.div>

        {/* City name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-black text-white leading-none mb-3 select-none"
          style={{
            fontSize: 'clamp(64px, 17vw, 160px)',
            textShadow: '0 8px 48px rgba(0,0,0,0.7)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('hero.cityName', 'نهاوند')}
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-16 sm:w-24 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mb-4"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-white/70 text-sm sm:text-lg md:text-xl font-light mb-3"
        >
          {t('hero.tagline', 'نگین سبز غرب ایران')}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 sm:mb-10"
        >
          <TourismTypewriter className="text-emerald-300 text-xs sm:text-sm md:text-base text-center select-none min-h-[22px] sm:min-h-[28px]" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-xs sm:max-w-none"
        >
          <Link
            href="/locations"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-200 hover:scale-105 shadow-xl shadow-emerald-900/40"
          >
            <MapPin className="w-4 h-4 flex-shrink-0" />
            {t('hero.ctaLocations', 'کشف مکان‌ها')}
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-200 hover:scale-105"
          >
            <Calendar className="w-4 h-4 flex-shrink-0" />
            {t('hero.ctaEvents', 'رویدادهای پیش رو')}
          </Link>
        </motion.div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="relative z-10 w-full px-3 sm:px-4 pb-[128px] sm:pb-[120px]"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center text-white hover:bg-white/18 transition-colors duration-200"
            >
              <div className="text-emerald-400 flex justify-center mb-1 sm:mb-1.5">{stat.icon}</div>
              <div className="text-base sm:text-xl md:text-2xl font-black tabular-nums">{stat.value}</div>
              <div className="text-[9px] sm:text-[11px] text-white/55 mt-0.5 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
      
    </div>
  );
}
