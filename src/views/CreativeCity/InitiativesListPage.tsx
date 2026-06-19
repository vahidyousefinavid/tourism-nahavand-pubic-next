'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Palette, Music, Utensils, Cpu, GraduationCap, Pen, Building, Star,
  Users, Zap, Search, X, RefreshCw, ChevronRight, ChevronLeft,
} from 'lucide-react';

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

const SECTOR_META: Record<string, { icon: React.ElementType; gradient: string }> = {
  handicrafts:  { icon: Palette,       gradient: 'from-amber-500 to-orange-500' },
  music:        { icon: Music,         gradient: 'from-blue-500 to-cyan-500' },
  gastronomy:   { icon: Utensils,      gradient: 'from-rose-500 to-pink-500' },
  tech:         { icon: Cpu,           gradient: 'from-violet-500 to-purple-500' },
  education:    { icon: GraduationCap, gradient: 'from-emerald-500 to-teal-500' },
  literature:   { icon: Pen,           gradient: 'from-indigo-500 to-blue-600' },
  architecture: { icon: Building,      gradient: 'from-slate-600 to-gray-700' },
  visualArts:   { icon: Star,          gradient: 'from-fuchsia-500 to-purple-600' },
};

const STATUS_CLS: Record<string, string> = {
  active:    'bg-emerald-100 text-emerald-700',
  ongoing:   'bg-blue-100 text-blue-700',
  planned:   'bg-amber-100 text-amber-700',
  completed: 'bg-gray-100 text-gray-600',
};

type ML = string | { fa?: string; en?: string; ar?: string; zh?: string } | null | undefined;
const ml = (v: ML, lang: string): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v[lang as keyof typeof v] || v.fa || v.en || '';
};

const SECTORS = Object.keys(SECTOR_META);
const STATUSES = ['active', 'ongoing', 'planned'] as const;

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function InitiativeCard({ item, onClick, t, locale }: { item: Initiative; onClick: () => void; t: (k: string) => string; locale: string }) {
  const meta = SECTOR_META[item.sector] ?? SECTOR_META.handicrafts;
  const Icon = meta.icon;
  const imgSrc = item.imageUrl
    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}${item.imageUrl}`)
    : null;
  const title = ml(item.title as any, locale);
  const description = ml(item.description as any, locale);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
            <Icon className="w-16 h-16 text-white/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_CLS[item.status] ?? STATUS_CLS.active} backdrop-blur-sm`}>
          {t(`initiativesPage.status.${item.status}`)}
        </span>
        <div className={`absolute top-3 left-3 w-8 h-8 bg-gradient-to-br ${meta.gradient} rounded-xl flex items-center justify-center shadow-sm`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] font-semibold text-gray-400 mb-1">{t(`initiativesPage.sectors.${item.sector}`)}</span>
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 leading-snug">{title}</h3>
        {description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-grow mb-3">{description}</p>
        )}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>{t('initiativesPage.progress')}</span><span>{item.activityLevel}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-l ${meta.gradient} rounded-full`} style={{ width: `${item.activityLevel}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          {item.participantsCount > 0 && (
            <div className="flex items-center gap-1"><Users className="w-3 h-3" />{item.participantsCount.toLocaleString()} {t('initiativesPage.participants')}</div>
          )}
          {item.startYear && <span className="mr-auto">{item.startYear}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function InitiativeModal({ item, onClose, t, locale }: { item: Initiative; onClose: () => void; t: (k: string) => string; locale: string }) {
  const meta = SECTOR_META[item.sector] ?? SECTOR_META.handicrafts;
  const Icon = meta.icon;
  const imgSrc = item.imageUrl
    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}${item.imageUrl}`)
    : null;
  const title = ml(item.title as any, locale);
  const description = ml(item.description as any, locale);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <div className="relative h-52 rounded-t-3xl overflow-hidden">
          {imgSrc ? (
            <img src={imgSrc} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
              <Icon className="w-24 h-24 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-7">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className={`w-9 h-9 bg-gradient-to-br ${meta.gradient} rounded-xl flex items-center justify-center`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-600">{t(`initiativesPage.sectors.${item.sector}`)}</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_CLS[item.status] ?? STATUS_CLS.active}`}>
              {t(`initiativesPage.status.${item.status}`)}
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-3 leading-relaxed">{title}</h2>
          {description && <p className="text-gray-600 text-sm leading-relaxed mb-5">{description}</p>}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>{t('initiativesPage.progress')}</span>
                <span className="font-bold text-gray-700">{item.activityLevel}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-l ${meta.gradient} rounded-full`} style={{ width: `${item.activityLevel}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
              {item.participantsCount > 0 && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{item.participantsCount.toLocaleString()} {t('initiativesPage.participants')}</span>
                </div>
              )}
              {item.startYear && (
                <div className="text-gray-500">{t('initiativesPage.startYear')}: {item.startYear}</div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function InitiativesListPage() {
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const locale = i18n.language;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Initiative | null>(null);

  useEffect(() => {
    fetch('/api/creative-city-initiatives/active')
      .then(r => r.json())
      .then((data: Initiative[]) => setInitiatives(Array.isArray(data) ? data : []))
      .catch(() => setInitiatives([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && initiatives.length > 0) {
      const found = initiatives.find(i => i.id === id);
      if (found) setSelected(found);
    }
  }, [searchParams, initiatives]);

  const handleOpen = (item: Initiative) => {
    setSelected(item);
    router.push(`/creative-city/initiatives?id=${item.id}`, { scroll: false });
  };

  const handleClose = () => {
    setSelected(null);
    router.push('/creative-city/initiatives', { scroll: false });
  };

  const filtered = useMemo(() => {
    return initiatives.filter(i => {
      if (sectorFilter !== 'all' && i.sector !== sectorFilter) return false;
      if (statusFilter !== 'all' && i.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return ml(i.title as any, locale).toLowerCase().includes(q) ||
               ml(i.description as any, locale).toLowerCase().includes(q);
      }
      return true;
    });
  }, [initiatives, sectorFilter, statusFilter, search, locale]);

  const hasFilter = search || sectorFilter !== 'all' || statusFilter !== 'all';

  return (
    <div dir={dir} className={`min-h-screen bg-gray-50 ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* Hero */}
      <section className="bg-gradient-to-bl from-fuchsia-900 via-purple-800 to-violet-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5"
          >
            <Zap className="w-7 h-7 text-yellow-300" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.02 }}
            className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            {t('initiativesPage.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-black mb-3"
          >
            {t('initiativesPage.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-purple-200 text-base max-w-xl mx-auto"
          >
            {t('initiativesPage.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
          {/* search */}
          <div className="relative flex-1 min-w-[160px] max-w-xs">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('initiativesPage.searchPlaceholder')}
              className="w-full pr-9 pl-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          {/* sector chips */}
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setSectorFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${sectorFilter === 'all' ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'}`}
            >
              {t('initiativesPage.all')}
            </button>
            {SECTORS.map(k => (
              <button
                key={k}
                onClick={() => setSectorFilter(k)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${sectorFilter === k ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'}`}
              >
                {t(`initiativesPage.sectors.${k}`)}
              </button>
            ))}
          </div>
          {/* status select */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-purple-300 bg-white"
          >
            <option value="all">{t('initiativesPage.allStatuses')}</option>
            {STATUSES.map(s => (
              <option key={s} value={s}>{t(`initiativesPage.status.${s}`)}</option>
            ))}
          </select>
          {hasFilter && (
            <button
              onClick={() => { setSearch(''); setSectorFilter('all'); setStatusFilter('all'); }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-3 h-3" /> {t('initiativesPage.clearFilter')}
            </button>
          )}
          <span className="text-xs text-gray-400 mr-auto">{filtered.length} {t('initiativesPage.resultLabel')}</span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Zap className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">{t('initiativesPage.noResults')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(item => (
                <InitiativeCard key={item.id} item={item} onClick={() => handleOpen(item)} t={t} locale={locale} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Back */}
      <div className="max-w-5xl mx-auto px-6 pb-10">
        <a href="/creative-city/in-city"
          className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors"
        >
          {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {t('initiativesPage.backLink')}
        </a>
      </div>

      <AnimatePresence>
        {selected && <InitiativeModal item={selected} onClose={handleClose} t={t} locale={locale} />}
      </AnimatePresence>
    </div>
  );
}
