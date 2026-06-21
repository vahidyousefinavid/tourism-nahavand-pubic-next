'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { MapPin, ArrowRight, ArrowLeft, Layers, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvestmentOpportunity } from '@/types/investment';
import InvestmentModal from '@/components/Modals/InvestmentModal';
import i18n from '@/lib/i18n';
import { AppLocale } from '@/types';
import L from 'leaflet';

const BaseMap = dynamic(() => import('@/components/Map/BaseMap'), { ssr: false });
const Marker  = dynamic(() => import('react-leaflet').then(m => m.Marker),  { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

const NAHAVAND: [number, number] = [34.183, 48.355];

const CATEGORY_CFG: Record<string, { color: string; emoji: string; labelFa: string; labelEn: string; labelAr: string; labelZh: string }> = {
  'real-estate': { color: '#7C3AED', emoji: '🏢', labelFa: 'ملکی',        labelEn: 'Real Estate', labelAr: 'العقارات',      labelZh: '房地产' },
  agriculture:   { color: '#059669', emoji: '🌾', labelFa: 'کشاورزی',     labelEn: 'Agriculture', labelAr: 'الزراعة',       labelZh: '农业'   },
  tourism:       { color: '#2563EB', emoji: '🏛',  labelFa: 'گردشگری',     labelEn: 'Tourism',     labelAr: 'السياحة',       labelZh: '旅游业' },
  handicrafts:   { color: '#D97706', emoji: '🎨', labelFa: 'صنایع دستی',  labelEn: 'Handicrafts', labelAr: 'الحرف اليدوية', labelZh: '手工艺' },
  industry:      { color: '#DC2626', emoji: '🏭', labelFa: 'صنعت',        labelEn: 'Industry',    labelAr: 'الصناعة',       labelZh: '工业'   },
  technology:    { color: '#0891B2', emoji: '💻', labelFa: 'فناوری',      labelEn: 'Technology',  labelAr: 'التكنولوجيا',   labelZh: '科技'   },
};

function getCategoryLabel(cat: string, lang: string): string {
  const cfg = CATEGORY_CFG[cat];
  if (!cfg) return cat;
  const key = `label${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof cfg;
  return (cfg[key] as string) || cfg.labelFa;
}

function createInvestmentIcon(category: string, isActive = false) {
  const cfg = CATEGORY_CFG[category] ?? { color: '#4B5563', emoji: '💰' };
  const size = isActive ? 48 : 38;
  const fontSize = isActive ? 22 : 17;
  const totalH = size + 10;
  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
      <div style="width:${size}px;height:${size}px;background:${cfg.color};border-radius:50%;
        border:${isActive ? '3px' : '2px'} solid white;
        box-shadow:0 ${isActive ? '4px 20px rgba(0,0,0,0.4)' : '2px 10px rgba(0,0,0,0.25)'};
        display:flex;align-items:center;justify-content:center;font-size:${fontSize}px;
        ${isActive ? 'transform:scale(1.15);' : ''}">${cfg.emoji}</div>
      <div style="width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;
        border-top:10px solid ${cfg.color};margin-top:-1px;filter:drop-shadow(0 2px 2px rgba(0,0,0,0.15));"></div>
    </div>`;
  return L.divIcon({ className: '', html, iconSize: [size, totalH], iconAnchor: [size / 2, totalH], tooltipAnchor: [0, -(totalH + 4)] });
}

export default function InvestmentAtlasPage() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const locale = i18n.language as AppLocale;

  const [investments, setInvestments] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<InvestmentOpportunity | null>(null);

  useEffect(() => {
    axios.get('/api/investments', { params: { limit: 200 } })
      .then(res => {
        const raw = res.data?.data ?? res.data;
        setInvestments(Array.isArray(raw) ? raw.filter((i: any) => i.latlng) : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory ? investments.filter(i => i.category === activeCategory) : investments;
  const categories = Array.from(new Set(investments.map(i => i.category)));

  // Stats per category
  const catStats = categories.map(cat => ({
    cat,
    cfg: CATEGORY_CFG[cat],
    count: investments.filter(i => i.category === cat).length,
    label: getCategoryLabel(cat, locale),
  }));

  return (
    <div dir={dir} className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-3"
            >
              <MapPin className="w-3.5 h-3.5" />
              {t('investmentAtlas.badge')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-black text-gray-900"
            >
              {t('investmentAtlas.title')}
            </motion.h1>
            <p className="text-gray-500 text-sm mt-1">{t('investmentAtlas.subtitle')}</p>
          </div>
          <a href="/investment/opportunities"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm border border-emerald-200 hover:border-emerald-400 px-5 py-2.5 rounded-full transition-all hover:bg-emerald-50 whitespace-nowrap self-start sm:self-auto"
          >
            {t('investmentAtlas.cardView')}
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Overview stats (category breakdown) */}
        {!loading && catStats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
            {catStats.map(({ cat, cfg, count, label }) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(p => p === cat ? null : cat)}
                className={`rounded-xl border p-3 text-center transition-all ${activeCategory === cat ? 'border-transparent shadow-md' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                style={activeCategory === cat ? { background: cfg?.color + '18', borderColor: cfg?.color + '60' } : {}}
              >
                <div className="text-2xl mb-1">{cfg?.emoji}</div>
                <div className="text-lg font-black text-gray-900">{count}</div>
                <div className="text-xs text-gray-500 leading-tight">{label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <Layers className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === null ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
          >
            {t('investmentAtlas.allFilter')} ({investments.length})
          </button>
          {categories.map(cat => {
            const cfg = CATEGORY_CFG[cat];
            const count = investments.filter(i => i.category === cat).length;
            return (
              <button key={cat}
                onClick={() => setActiveCategory(p => p === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === cat ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                style={activeCategory === cat ? { background: cfg?.color, borderColor: cfg?.color } : {}}
              >
                {cfg?.emoji} {getCategoryLabel(cat, locale)} ({count})
              </button>
            );
          })}
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ height: '580px' }}>
          {loading ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-400 text-sm">{t('investmentAtlas.loading')}</p>
              </div>
            </div>
          ) : (
            <BaseMap center={NAHAVAND} zoom={12} preferCanvas>
              {filtered.map(inv => {
                if (!inv.latlng) return null;
                const isActive = selected?.id === inv.id;
                const icon = createInvestmentIcon(inv.category, isActive);
                const name = (inv.title as any)?.[locale] || (inv.title as any)?.fa || '';
                return (
                  <Marker
                    key={inv.id}
                    position={[inv.latlng.lat, inv.latlng.lng]}
                    icon={icon}
                    zIndexOffset={isActive ? 1000 : 0}
                    eventHandlers={{ click: () => setSelected(inv) }}
                  >
                    <Tooltip direction="top" opacity={0.95}>
                      <span style={{ fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>
                        {name}
                      </span>
                    </Tooltip>
                  </Marker>
                );
              })}
            </BaseMap>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={filtered.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-3 text-xs text-gray-400"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>{filtered.length} {t('investmentAtlas.shown')}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <InvestmentModal
        opportunity={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        locale={locale}
      />
    </div>
  );
}
