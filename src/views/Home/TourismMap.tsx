'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { LocationModalContent } from '../Locations/LocationModalContent';
import { Location, AppLocale } from '@/types';

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">در حال بارگذاری نقشه...</p>
      </div>
    </div>
  ),
});

const CATEGORY_CONFIG = {
  historical: { labelKey: 'tourismMap.categories.historical', defaultLabel: 'تاریخی',   color: 'bg-purple-100 text-purple-700 border-purple-200',  active: 'bg-purple-600 text-white border-purple-600' },
  natural:    { labelKey: 'tourismMap.categories.natural',    defaultLabel: 'طبیعی',    color: 'bg-emerald-100 text-emerald-700 border-emerald-200', active: 'bg-emerald-600 text-white border-emerald-600' },
  cultural:   { labelKey: 'tourismMap.categories.cultural',   defaultLabel: 'فرهنگی',   color: 'bg-blue-100 text-blue-700 border-blue-200',         active: 'bg-blue-600 text-white border-blue-600' },
  religious:  { labelKey: 'tourismMap.categories.religious',  defaultLabel: 'مذهبی',   color: 'bg-amber-100 text-amber-700 border-amber-200',       active: 'bg-amber-600 text-white border-amber-600' },
} as const;

export default function TourismMap() {
  const { t, i18n } = useTranslation();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const locale = i18n.language as AppLocale;
  const isRTL = i18n.dir() === 'rtl';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    axios
      .get('/api/locations')
      .then(res => {
        const raw = res.data?.data ?? res.data;
        setLocations(Array.isArray(raw) ? raw.filter((l: Location) => l.latlng) : []);
      })
      .catch(() =>
        // fallback: top views
        axios.get('/api/locations/top/views').then(res => {
          const raw = res.data?.data ?? res.data;
          setLocations(Array.isArray(raw) ? raw.filter((l: Location) => l.latlng) : []);
        }).catch(() => {})
      )
      .finally(() => setLoading(false));
  }, []);

  const openInMaps = ([lat, lng]: [number, number]) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  const displayedCount = activeCategory
    ? locations.filter(l => l.category === activeCategory).length
    : locations.length;

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative bg-gray-50 pt-12 sm:pt-16 pb-10 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-3"
            >
              <MapPin className="w-3.5 h-3.5" />
              {t('tourismMap.badge', 'نقشه گردشگری')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900"
            >
              {t('tourismMap.title', 'کشف نهاوند روی نقشه')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-gray-500 text-sm mt-1"
            >
              {t('tourismMap.subtitle', 'جاذبه‌های گردشگری نهاوند را روی نقشه کشف و بازدید کنید')}
            </motion.p>
          </div>

          <a
            href="/locations"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm border border-emerald-200 hover:border-emerald-400 px-5 py-2.5 rounded-full transition-all hover:bg-emerald-50 whitespace-nowrap self-start sm:self-auto"
          >
            {t('locations.viewAll', 'مشاهده همه')}
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        {/* ── Category Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 flex-wrap mb-4"
        >
          <div className="flex items-center gap-1 text-gray-400 text-xs ml-1">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeCategory === null
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            {t('tourismMap.categories.all', 'همه')}
            <span className="opacity-70 font-normal">({locations.length})</span>
          </button>

          {(Object.entries(CATEGORY_CONFIG) as [string, typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG]][]).map(([key, cfg]) => {
            const count = locations.filter(l => l.category === key).length;
            if (count === 0) return null;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(prev => prev === key ? null : key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === key ? cfg.active : cfg.color + ' hover:opacity-80'
                }`}
              >
                {t(cfg.labelKey, cfg.defaultLabel)}
                <span className="opacity-70 font-normal">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Map Container ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
          style={{ height: '520px' }}
        >
          {loading ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-400 text-sm">{t('tourismMap.loading', 'در حال بارگذاری...')}</p>
              </div>
            </div>
          ) : (
            <MapView
              locations={locations}
              locale={locale}
              activeCategory={activeCategory}
              selectedId={selectedLocation?.id ?? null}
              onSelectLocation={setSelectedLocation}
            />
          )}
        </motion.div>

        {/* ── Stats bar ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayedCount}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-3 text-xs text-gray-400"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {displayedCount}{' '}
              {t('tourismMap.locationsShown', 'مکان گردشگری نمایش داده شده')}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Details Modal ── */}
      <Modal
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        title={
          selectedLocation?.name?.[locale] ||
          selectedLocation?.name?.fa ||
          ''
        }
      >
        {selectedLocation && (
          <LocationModalContent
            location={selectedLocation}
            openInMaps={openInMaps}
            locale={locale}
          />
        )}
      </Modal>
    </section>
  );
}
