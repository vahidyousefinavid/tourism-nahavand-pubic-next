'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import {
  Palette, Music, Utensils, Cpu, GraduationCap, Pen, Building, Star,
  Users, Zap, ChevronLeft, ChevronRight, RefreshCw,
} from 'lucide-react';

const INITIATIVES_PREVIEW_COUNT = 6;

interface Initiative {
  id: string;
  title: string;
  description?: string;
  sector: string;
  status: 'active' | 'ongoing' | 'planned' | 'completed';
  activityLevel: number;
  participantsCount: number;
  startYear?: string;
  imageUrl?: string;
}

const SECTOR_META: Record<string, {
  icon: React.ElementType; gradient: string;
  bg: string; border: string; text: string;
}> = {
  handicrafts:  { icon: Palette,      gradient: 'from-amber-500 to-orange-500',   bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-700' },
  music:        { icon: Music,        gradient: 'from-blue-500 to-cyan-500',       bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700' },
  gastronomy:   { icon: Utensils,     gradient: 'from-rose-500 to-pink-500',       bg: 'bg-rose-50',   border: 'border-rose-200',   text: 'text-rose-700' },
  tech:         { icon: Cpu,          gradient: 'from-violet-500 to-purple-500',   bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' },
  education:    { icon: GraduationCap,gradient: 'from-emerald-500 to-teal-500',    bg: 'bg-emerald-50',border: 'border-emerald-200',text: 'text-emerald-700' },
  literature:   { icon: Pen,          gradient: 'from-indigo-500 to-blue-600',     bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  architecture: { icon: Building,     gradient: 'from-slate-600 to-gray-700',      bg: 'bg-slate-50',  border: 'border-slate-200',  text: 'text-slate-700' },
  visualArts:   { icon: Star,         gradient: 'from-fuchsia-500 to-purple-600',  bg: 'bg-fuchsia-50',border: 'border-fuchsia-200',text: 'text-fuchsia-700' },
};

const STATUS_CFG: Record<string, { cls: string }> = {
  active:    { cls: 'bg-emerald-100 text-emerald-700' },
  ongoing:   { cls: 'bg-blue-100 text-blue-700' },
  planned:   { cls: 'bg-amber-100 text-amber-700' },
  completed: { cls: 'bg-gray-100 text-gray-600' },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

type ML = string | { fa?: string; en?: string; ar?: string; zh?: string } | null | undefined;
const mlText = (v: ML, lang: string): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v[lang as keyof typeof v] || v.fa || v.en || '';
};

export default function InCityPage() {
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const locale = i18n.language;

  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSector, setActiveSector] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/creative-city-initiatives/active')
      .then(r => r.json())
      .then((data: Initiative[]) => setInitiatives(Array.isArray(data) ? data : []))
      .catch(() => setInitiatives([]))
      .finally(() => setLoading(false));
  }, []);

  // آمار per-sector از داده‌های واقعی
  const sectorStats = useMemo(() => {
    const stats: Record<string, { count: number; level: number }> = {};
    for (const key of Object.keys(SECTOR_META)) {
      const sItems = initiatives.filter(i => i.sector === key);
      stats[key] = {
        count: sItems.length,
        level: sItems.length > 0 ? Math.round(sItems.reduce((a, i) => a + i.activityLevel, 0) / sItems.length) : 0,
      };
    }
    return stats;
  }, [initiatives]);

  const sectorFiltered = useMemo(() => {
    if (!activeSector) return initiatives;
    return initiatives.filter(i => i.sector === activeSector);
  }, [initiatives, activeSector]);

  const totalParticipants = initiatives.reduce((a, i) => a + i.participantsCount, 0);

  return (
    <div dir={dir} className={`min-h-screen bg-gray-50 ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-fuchsia-900 via-purple-800 to-violet-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {['#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444', '#10b981'].map((c, i) => (
            <div key={i}
              className="absolute rounded-full opacity-15 blur-3xl animate-pulse"
              style={{
                background: c, width: `${200 + i * 80}px`, height: `${200 + i * 80}px`,
                top: `${[10, 60, 30, 70, 15][i]}%`, left: `${[5, 70, 40, 20, 85][i]}%`,
                animationDelay: `${i * 0.8}s`, animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-purple-200">{t('inCity.tag')}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl font-black mb-4"
          >
            {t('inCity.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-purple-200 text-lg max-w-2xl leading-relaxed"
          >
            {t('inCity.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="flex items-center gap-6 mt-10"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-300">{loading ? '…' : initiatives.length}</div>
              <div className="text-xs text-purple-300 mt-1">{t('inCity.statInitiatives')}</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-300">
                {loading ? '…' : totalParticipants > 1000 ? `${(totalParticipants / 1000).toFixed(1)}k+` : totalParticipants}
              </div>
              <div className="text-xs text-purple-300 mt-1">{t('inCity.statParticipants')}</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-300">{Object.keys(SECTOR_META).length}</div>
              <div className="text-xs text-purple-300 mt-1">{t('inCity.statSectors')}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-900">{t('inCity.sectorsTitle')}</h2>
          <p className="text-gray-500 text-sm mt-2">{t('inCity.sectorsSubtitle')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(SECTOR_META).map(([key, meta], i) => {
            const Icon = meta.icon;
            const stats = sectorStats[key] ?? { count: 0, level: 0 };
            const isActive = activeSector === key;
            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveSector(isActive ? null : key)}
                className={`relative p-5 rounded-2xl border-2 text-right transition-all group ${
                  isActive
                    ? `${meta.border} ${meta.bg} shadow-md scale-[1.02]`
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className={`w-11 h-11 bg-gradient-to-br ${meta.gradient} rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">{t(`inCity.sector.${key}`)}</div>
                <div className={`text-xs font-semibold ${meta.text} mb-3`}>{stats.count} {t('inCity.initiative')}</div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stats.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.06 }}
                    className={`h-full bg-gradient-to-l ${meta.gradient} rounded-full`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Initiatives Preview */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">{t('inCity.initiativesTitle')}</h2>
              {!loading && sectorFiltered.length > 0 && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {sectorFiltered.length} {t('inCity.initiative')}
                  {activeSector && ` ${t('inCity.in')} ${t(`inCity.sector.${activeSector}`)}`}
                </p>
              )}
            </div>
            {sectorFiltered.length > INITIATIVES_PREVIEW_COUNT && (
              <a
                href="/creative-city/initiatives"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-all"
              >
                {t('inCity.viewAll')}
                {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </a>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-400" />
            </div>
          ) : initiatives.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
              <Zap className="w-14 h-14 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-semibold">{t('inCity.emptyNoInitiatives')}</p>
              <p className="text-gray-400 text-sm mt-1">{t('inCity.emptyNoInitiativesSub')}</p>
            </div>
          ) : sectorFiltered.length === 0 ? (
            <div className="text-center py-16">
              <Zap className="w-14 h-14 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">{t('inCity.emptyNoSector')}</p>
              <button
                onClick={() => setActiveSector(null)}
                className="mt-3 text-xs text-purple-600 hover:underline"
              >
                {t('inCity.viewAllSectors')}
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {sectorFiltered.slice(0, INITIATIVES_PREVIEW_COUNT).map((item, i) => {
                    const meta = SECTOR_META[item.sector] ?? SECTOR_META.handicrafts;
                    const SectorIcon = meta.icon;
                    const stCfg = STATUS_CFG[item.status] ?? STATUS_CFG.active;
                    const imgSrc = item.imageUrl
                      ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}${item.imageUrl}`)
                      : null;
                    return (
                      <motion.a
                        key={item.id}
                        href="/creative-city/initiatives"
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: Math.min(i * 0.04, 0.3) }}
                        className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col"
                      >
                        {/* تصویر یا gradient header */}
                        <div className="relative h-36 flex-shrink-0 overflow-hidden">
                          {imgSrc ? (
                            <img src={imgSrc} alt={mlText(item.title as any, locale)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
                              <SectorIcon className="w-12 h-12 text-white/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          <span className={`absolute top-2.5 right-2.5 text-[10px] px-2.5 py-0.5 rounded-full font-bold ${stCfg.cls}`}>
                            {t(`initiativesPage.status.${item.status}`)}
                          </span>
                          <div className={`absolute top-2.5 left-2.5 w-7 h-7 bg-gradient-to-br ${meta.gradient} rounded-lg flex items-center justify-center`}>
                            <SectorIcon className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <span className="text-[10px] font-semibold text-gray-400 mb-1">{t(`inCity.sector.${item.sector}`)}</span>
                          <h3 className="font-bold text-gray-900 text-sm mb-1.5 line-clamp-2 leading-snug">{mlText(item.title as any, locale)}</h3>
                          {mlText(item.description as any, locale) && (
                            <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-grow">{mlText(item.description as any, locale)}</p>
                          )}
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                              <span>{t('inCity.progress')}</span><span>{item.activityLevel}%</span>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-l ${meta.gradient} rounded-full`} style={{ width: `${item.activityLevel}%` }} />
                            </div>
                          </div>
                          {item.participantsCount > 0 && (
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Users className="w-3 h-3" />{item.participantsCount.toLocaleString('fa-IR')} {t('inCity.people')}
                            </div>
                          )}
                        </div>
                      </motion.a>
                    );
                  })}
                </AnimatePresence>
              </div>

              {sectorFiltered.length > INITIATIVES_PREVIEW_COUNT && (
                <div className="text-center mt-8">
                  <a
                    href="/creative-city/initiatives"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-sm hover:shadow-md"
                  >
                    {t('inCity.viewAllInitiatives')}
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-l from-violet-600 to-purple-700 rounded-3xl p-10 text-white text-center"
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #f59e0b, transparent 60%)' }} />
          <div className="relative">
            <h2 className="text-2xl font-black mb-3">{t('inCity.ctaTitle')}</h2>
            <p className="text-purple-200 text-sm mb-6">{t('inCity.ctaBody')}</p>
            <a href="/creative-city/you"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm"
            >
              {t('inCity.ctaBtn')}
              {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
