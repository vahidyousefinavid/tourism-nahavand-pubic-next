'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ArrowLeft, ArrowRight, Layers, Hand } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { LocationModalContent } from '../Locations/LocationModalContent';
import { Location, AppLocale } from '@/types';
import SectionHeader from './SectionHeader';

/** اسپینری که تا آمدن چانک لیفلت نشان داده می‌شود.
 *  کامپوننت جداست چون متنش هم باید ترجمه شود و برای هوک به بدنهٔ کامپوننت نیاز دارد؛
 *  قبلاً «در حال بارگذاری نقشه...» ثابت فارسی بود و در هر چهار زبان فارسی می‌ماند. */
function MapLoading() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[var(--nh-spring)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">{t('tourismMap.loading', 'در حال بارگذاری نقشه...')}</p>
      </div>
    </div>
  );
}

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => <MapLoading />,
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
  // نقشه قفل شروع می‌شود: روی موبایل کشیدن انگشت را می‌گرفت و صفحه اسکرول نمی‌شد،
  // روی دسکتاپ هم چرخ ماوس به‌جای اسکرول صفحه زوم می‌کرد.
  const [mapUnlocked, setMapUnlocked] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const mapBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCoarsePointer(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // وقتی نقشه از دید خارج شد دوباره قفل شود، تا برگشتن به آن دوباره کاربر را گیر نیندازد.
  useEffect(() => {
    const el = mapBoxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (!e.isIntersecting) setMapUnlocked(false); },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
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
      className="relative bg-[var(--nh-paper-warm)] py-16 sm:py-24"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">

        {/* ── Header ── */}
        <SectionHeader
          eyebrow={t('tourismMap.badge', 'نقشهٔ گردشگری')}
          title={t('tourismMap.title', 'کجای شهر؟')}
          subtitle={t(
            'tourismMap.subtitle',
            'هر نشانه یک جاذبه است. رویش بزنید تا نشانی و مسیرش را ببینید.',
          )}
          href="/locations"
          linkLabel={t('locations.viewAll', 'فهرست مکان‌ها')}
        />

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
          ref={mapBoxRef}
          className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-[340px] sm:h-[440px] lg:h-[520px]"
        >
          {loading ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-400 text-sm">{t('tourismMap.loading', 'در حال بارگذاری...')}</p>
              </div>
            </div>
          ) : (
            <>
              <MapView
                locations={locations}
                locale={locale}
                activeCategory={activeCategory}
                selectedId={selectedLocation?.id ?? null}
                onSelectLocation={setSelectedLocation}
                interactive={mapUnlocked}
              />

              {/* کاور: تا وقتی کاربر عمداً بازش نکند، نقشه لمس و چرخ را نمی‌گیرد */}
              {!mapUnlocked && (
                <button
                  type="button"
                  onClick={() => setMapUnlocked(true)}
                  aria-label={t('tourismMap.unlockAria', 'فعال‌کردن نقشه')}
                  className="absolute inset-0 z-[500] flex items-end justify-center pb-6 sm:pb-8 bg-[var(--nh-ink)]/10 hover:bg-[var(--nh-ink)]/[0.06] transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2 bg-[var(--nh-ink)]/85 text-white text-[0.8rem] sm:text-sm font-bold px-4 py-2.5 rounded-full backdrop-blur-sm shadow-lg">
                    <Hand className="w-4 h-4 shrink-0" />
                    {coarsePointer
                      ? t('tourismMap.unlockTouch', 'برای کار با نقشه یک‌بار بزنید')
                      : t('tourismMap.unlockMouse', 'برای کار با نقشه کلیک کنید')}
                  </span>
                </button>
              )}
            </>
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
