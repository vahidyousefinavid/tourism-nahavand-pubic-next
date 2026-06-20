'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Route, Moon, Sun, RefreshCw } from 'lucide-react';
import { FallbackImage } from '@/components/ui/FallbackImage';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

const NatureMapView = dynamic(() => import('./NatureMapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

// ── Types ─────────────────────────────────────────────────────────────────────

type ML = { fa?: string; en?: string; ar?: string; zh?: string } | string | null | undefined;

const ml = (v: ML, lang: string): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v[lang as keyof typeof v] || v.fa || v.en || '';
};

export interface NaturalPlace {
  id: string;
  name: ML;
  category: 'waterfall' | 'river' | 'mountain' | 'forest' | 'valley' | 'lake' | 'plain' | 'spring';
  lat: number;
  lng: number;
  bestSeason: 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
  distanceKm: number;
  elevationM: number;
  desc?: ML;
  difficulty: 'easy' | 'medium' | 'hard';
  trailOrder: number;
  imageUrl?: string;
  isActive: boolean;
}

// ── Config ────────────────────────────────────────────────────────────────────

const CAT_CFG = {
  waterfall: { color: '#0891b2', emoji: '💧' },
  river:     { color: '#2563eb', emoji: '🌊' },
  mountain:  { color: '#7c3aed', emoji: '⛰' },
  forest:    { color: '#16a34a', emoji: '🌲' },
  valley:    { color: '#65a30d', emoji: '🏔' },
  lake:      { color: '#0284c7', emoji: '🏞' },
  plain:     { color: '#ca8a04', emoji: '🌾' },
  spring:    { color: '#059669', emoji: '💦' },
} as const;

const SEASON_CFG = {
  all:    { icon: '🗓',  active: 'bg-gray-700 text-white' },
  spring: { icon: '🌸',  active: 'bg-green-600 text-white' },
  summer: { icon: '☀️', active: 'bg-amber-500 text-white' },
  autumn: { icon: '🍂',  active: 'bg-orange-600 text-white' },
  winter: { icon: '❄️', active: 'bg-blue-600 text-white' },
} as const;

const DIFF_CFG = {
  easy:   { cls: 'text-green-700 bg-green-50 border-green-200' },
  medium: { cls: 'text-amber-700 bg-amber-50 border-amber-200' },
  hard:   { cls: 'text-red-700   bg-red-50   border-red-200'   },
} as const;

type Season = keyof typeof SEASON_CFG;

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NaturePage() {
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const locale = i18n.language;

  const [places, setPlaces]     = useState<NaturalPlace[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCat, setActiveCat]   = useState<string | null>(null);
  const [activeSeason, setActiveSeason] = useState<Season>('all');
  const [showTrail, setShowTrail]   = useState(false);
  const [darkMap, setDarkMap]       = useState(false);
  const [search, setSearch]         = useState('');
  const [mobileTab, setMobileTab]   = useState<'map' | 'list'>('map');

  useEffect(() => {
    fetch('/api/nature-places/active')
      .then(r => r.json())
      .then((data: NaturalPlace[]) => setPlaces(Array.isArray(data) ? data : []))
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false));
  }, []);

  const selectedPlace = useMemo(() => places.find(p => p.id === selectedId) ?? null, [places, selectedId]);

  const filteredPlaces = useMemo(() => places.filter(p => {
    if (activeCat && p.category !== activeCat) return false;
    if (activeSeason !== 'all' && p.bestSeason !== 'all' && p.bestSeason !== activeSeason) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return ml(p.name, locale).toLowerCase().includes(s) || ml(p.desc, locale).toLowerCase().includes(s);
    }
    return true;
  }), [places, activeCat, activeSeason, search, locale]);

  const categories = useMemo(() => {
    const c: Record<string, number> = {};
    places.forEach(p => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return Object.entries(c);
  }, [places]);

  const trailPath = useMemo((): [number, number][] =>
    [...places].sort((a, b) => a.trailOrder - b.trailOrder).map(p => [p.lat, p.lng])
  , [places]);

  const hav = (a: [number, number], b: [number, number]) => {
    const R = 6371, dLat = (b[0]-a[0])*Math.PI/180, dLng = (b[1]-a[1])*Math.PI/180;
    const h = Math.sin(dLat/2)**2 + Math.cos(a[0]*Math.PI/180)*Math.cos(b[0]*Math.PI/180)*Math.sin(dLng/2)**2;
    return R*2*Math.asin(Math.sqrt(h));
  };

  const trailKm = useMemo(() =>
    Math.round(trailPath.reduce((s, p, i) => i === 0 ? 0 : s + hav(trailPath[i-1], p), 0))
  , [trailPath]);

  const toggle = (id: string) => setSelectedId(prev => prev === id ? null : id);

  return (
    <div dir={dir} style={{ height: 'calc(100vh - 100px)' }} className="flex flex-col overflow-hidden">

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-gradient-to-l from-emerald-950 via-green-900 to-teal-900 text-white px-5 sm:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl sm:text-2xl font-black">{t('nature.title')}</h1>
            <p className="text-emerald-400 text-xs mt-0.5">{t('nature.subtitle')}</p>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex gap-5">
              {loading ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
              ) : [
                { n: places.length, lbl: t('nature.statPlaces') },
                { n: categories.length, lbl: t('nature.statCategories') },
                { n: trailKm, lbl: t('nature.statKm') },
              ].map(({ n, lbl }) => (
                <div key={lbl} className="text-center">
                  <div className="text-xl font-black text-emerald-300">{n}</div>
                  <div className="text-[11px] text-emerald-500">{lbl}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowTrail(v => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border-2 transition-all ${
                showTrail
                  ? 'bg-emerald-400 border-emerald-400 text-emerald-950 shadow-lg shadow-emerald-500/30'
                  : 'border-emerald-600 text-emerald-300 hover:border-emerald-400 hover:text-white'
              }`}
            >
              <Route size={15} />
              {showTrail ? t('nature.trailOff') : t('nature.trailOn')}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Season Tabs ───────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 sm:px-8 py-2 flex items-center gap-2 overflow-x-auto">
        {(Object.entries(SEASON_CFG) as [Season, (typeof SEASON_CFG)[Season]][]).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setActiveSeason(key)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSeason === key ? cfg.active : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{cfg.icon}</span>
            <span>{t(`nature.season.${key}`)}</span>
            {key !== 'all' && (
              <span className="opacity-60 text-[10px]">
                ({places.filter(p => p.bestSeason === key || p.bestSeason === 'all').length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ─── Mobile Tab Toggle ─────────────────────────────────────────────── */}
      <div className="sm:hidden flex-shrink-0 flex border-b border-gray-200 bg-white">
        {(['map', 'list'] as const).map(v => (
          <button key={v} onClick={() => setMobileTab(v)}
            className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
              mobileTab === v ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-gray-400'
            }`}
          >
            {v === 'map' ? `🗺 ${t('nature.mapView')}` : `📋 ${t('nature.listView')}`}
          </button>
        ))}
      </div>

      {/* ─── Body ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className={`${mobileTab === 'list' ? 'flex' : 'hidden'} sm:flex w-full sm:w-[360px] flex-shrink-0 flex-col bg-white border-l border-gray-100 shadow-sm`}>

          <div className="p-3 border-b border-gray-100">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('nature.search')}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-300 focus:bg-white transition-all"
            />
          </div>

          <div className="p-3 border-b border-gray-100 flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCat(null)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${!activeCat ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t('nature.allCats')} ({places.length})
            </button>
            {categories.map(([cat, count]) => {
              const cfg = CAT_CFG[cat as keyof typeof CAT_CFG];
              if (!cfg) return null;
              const active = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(active ? null : cat)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all"
                  style={active
                    ? { backgroundColor: cfg.color, borderColor: cfg.color, color: 'white' }
                    : { backgroundColor: cfg.color + '15', borderColor: cfg.color + '40', color: cfg.color }
                  }
                >
                  <span>{cfg.emoji}</span>
                  <span>{t(`nature.category.${cat}`)}</span>
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
              </div>
            ) : (
              <AnimatePresence>
                {filteredPlaces.length === 0 ? (
                  <p className="text-center text-gray-400 py-12 text-sm">{t('nature.noResults')}</p>
                ) : filteredPlaces.map(place => {
                  const cfg = CAT_CFG[place.category];
                  const active = selectedId === place.id;
                  const dimmed = activeSeason !== 'all' && place.bestSeason !== 'all' && place.bestSeason !== activeSeason;
                  const placeName = ml(place.name, locale);
                  const placeDesc = ml(place.desc, locale);
                  return (
                    <motion.button
                      key={place.id}
                      layout
                      initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                      animate={{ opacity: dimmed ? 0.35 : 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => { toggle(place.id); setMobileTab('map'); }}
                      className={`w-full text-right p-3 rounded-xl border-2 transition-all ${
                        active
                          ? 'border-emerald-400 bg-emerald-50 shadow-sm'
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FallbackImage src={place.imageUrl ? `${API_URL}${place.imageUrl}` : null} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0 shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-gray-900 truncate">{placeName}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold border"
                              style={{ color: cfg?.color, borderColor: cfg?.color + '50', background: cfg?.color + '15' }}>
                              {t(`nature.category.${place.category}`)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                            <span>📍 {place.distanceKm} {t('nature.km')}</span>
                            <span>⛰ {place.elevationM.toLocaleString(locale)} {t('nature.m')}</span>
                          </div>
                          {active && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{placeDesc}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${DIFF_CFG[place.difficulty]?.cls}`}>
                                  {t(`nature.difficulty.${place.difficulty}`)}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {t(`nature.season.${place.bestSeason}`)}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          <AnimatePresence>
            {showTrail && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Route size={15} className="text-emerald-600" />
                    <span className="font-bold text-sm text-emerald-800">{t('nature.trailTitle')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white rounded-xl py-2 shadow-sm">
                      <div className="text-lg font-black text-emerald-700">{trailKm}</div>
                      <div className="text-[10px] text-emerald-500">{t('nature.trailKmLabel')}</div>
                    </div>
                    <div className="bg-white rounded-xl py-2 shadow-sm">
                      <div className="text-lg font-black text-emerald-700">{places.length}</div>
                      <div className="text-[10px] text-emerald-500">{t('nature.trailStops')}</div>
                    </div>
                    <div className="bg-white rounded-xl py-2 shadow-sm">
                      <div className="text-lg font-black text-emerald-700">۲~</div>
                      <div className="text-[10px] text-emerald-500">{t('nature.trailDays')}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Map */}
        <div className={`${mobileTab === 'map' ? 'flex' : 'hidden'} sm:flex flex-1 relative overflow-hidden`}>
          <NatureMapView
            places={filteredPlaces}
            allPlaces={places}
            selectedId={selectedId}
            onSelect={toggle}
            showTrail={showTrail}
            trailPath={trailPath}
            darkMap={darkMap}
          />
          <button
            onClick={() => setDarkMap(v => !v)}
            title={darkMap ? t('nature.lightMap') : t('nature.darkMap')}
            className={`absolute bottom-5 ${isRTL ? 'right-5' : 'left-5'} z-[1000] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
              darkMap ? 'bg-gray-900 text-yellow-400' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {darkMap ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <AnimatePresence>
            {selectedPlace && mobileTab === 'map' && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                className="sm:hidden absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-2xl shadow-2xl p-4 border-t border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <FallbackImage src={selectedPlace.imageUrl ? `${API_URL}${selectedPlace.imageUrl}` : null} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{ml(selectedPlace.name, locale)}</div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ml(selectedPlace.desc, locale)}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] text-gray-400">📍 {selectedPlace.distanceKm} {t('nature.km')}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${DIFF_CFG[selectedPlace.difficulty]?.cls}`}>
                        {t(`nature.difficulty.${selectedPlace.difficulty}`)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedId(null)} className="text-gray-400 text-lg leading-none">✕</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
