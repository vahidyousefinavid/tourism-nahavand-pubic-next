'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { useSearchParams, useRouter } from 'next/navigation';
import { Calendar, Search, X, RefreshCw, Newspaper, ChevronRight, ChevronLeft } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  publishedAt?: string;
  createdAt: string;
}

type ML = string | { fa?: string; en?: string; ar?: string; zh?: string } | null | undefined;
const ml = (v: ML, lang: string): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v[lang as keyof typeof v] || v.fa || v.en || '';
};

const CATEGORY_COLORS: Record<string, string> = {
  event:        'bg-blue-500/90 text-white',
  announcement: 'bg-amber-500/90 text-white',
  program:      'bg-emerald-500/90 text-white',
  achievement:  'bg-purple-500/90 text-white',
};

const CATEGORIES = ['event', 'announcement', 'program', 'achievement'] as const;

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function formatDate(dateStr: string, locale: string) {
  try {
    return new Date(dateStr).toLocaleDateString(
      locale === 'fa' ? 'fa-IR' : locale === 'ar' ? 'ar-SA' : locale === 'zh' ? 'zh-CN' : 'de' ? 'de-DE' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  } catch { return dateStr; }
}

function NewsCard({ item, onClick, t, locale }: { item: NewsItem; onClick: () => void; t: (k: string) => string; locale: string }) {
  const imgSrc = item.imageUrl
    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}${item.imageUrl}`)
    : null;
  const catColor = item.category ? (CATEGORY_COLORS[item.category] ?? 'bg-gray-600/90 text-white') : null;
  const catLabel = item.category ? t(`newsPage.categories.${item.category}`) : null;
  const title = ml(item.title as any, locale);
  const summary = ml(item.summary as any, locale);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-48 flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Newspaper className="w-16 h-16 text-purple-200" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {catColor && catLabel && (
          <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${catColor} backdrop-blur-sm`}>
            {catLabel}
          </span>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white/90 text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(item.publishedAt ?? item.createdAt, locale)}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 leading-snug">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-grow">{summary}</p>
        <button className="mt-4 w-full py-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold text-sm transition-colors">
          {t('newsPage.readMore')}
        </button>
      </div>
    </motion.div>
  );
}

function NewsModal({ item, onClose, t, locale }: { item: NewsItem; onClose: () => void; t: (k: string) => string; locale: string }) {
  const imgSrc = item.imageUrl
    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}${item.imageUrl}`)
    : null;
  const title = ml(item.title as any, locale);
  const summary = ml(item.summary as any, locale);
  const content = ml(item.content as any, locale);

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
        {imgSrc && (
          <div className="h-56 overflow-hidden rounded-t-3xl">
            <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <button onClick={onClose} className="absolute top-4 left-4 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="p-7">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {item.category && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[item.category] ?? 'bg-gray-100 text-gray-700'}`}>
                {t(`newsPage.categories.${item.category}`)}
              </span>
            )}
            <span className="text-xs text-gray-400">{formatDate(item.publishedAt ?? item.createdAt, locale)}</span>
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-4 leading-relaxed">{title}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{summary}</p>
          {content && (
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line border-t border-gray-100 pt-4">
              {content}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function NewsListPage() {
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = i18n.language;

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch('/api/creative-city-news/published?limit=100')
      .then(r => r.json())
      .then((data: NewsItem[]) => setNews(Array.isArray(data) ? data : []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && news.length > 0) {
      const found = news.find(n => n.id === id);
      if (found) setSelected(found);
    }
  }, [searchParams, news]);

  const handleOpen = (item: NewsItem) => {
    setSelected(item);
    router.push(`/creative-city/news?id=${item.id}`, { scroll: false });
  };

  const handleClose = () => {
    setSelected(null);
    router.push('/creative-city/news', { scroll: false });
  };

  const filtered = useMemo(() => {
    return news.filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const t = ml(item.title as any, locale).toLowerCase();
        const s = ml(item.summary as any, locale).toLowerCase();
        return t.includes(q) || s.includes(q);
      }
      return true;
    });
  }, [news, category, search, locale]);

  return (
    <div dir={dir} className={`min-h-screen bg-gray-50 ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* Hero */}
      <section className="bg-gradient-to-bl from-violet-900 via-purple-800 to-indigo-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5"
          >
            <Newspaper className="w-7 h-7 text-purple-300" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.02 }}
            className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            {t('newsPage.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-black mb-3"
          >
            {t('newsPage.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-purple-200 text-base max-w-xl mx-auto"
          >
            {t('newsPage.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('newsPage.searchPlaceholder')}
              className="w-full pr-9 pl-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-300 bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategory('all')}
              className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${category === 'all' ? 'bg-purple-600 border-purple-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'}`}
            >
              {t('newsPage.all')}
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${category === cat ? 'bg-purple-600 border-purple-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'}`}
              >
                {t(`newsPage.categories.${cat}`)}
              </button>
            ))}
            {(search || category !== 'all') && (
              <button
                onClick={() => { setSearch(''); setCategory('all'); }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-3 h-3" /> {t('newsPage.clearFilter')}
              </button>
            )}
          </div>
          <span className="text-xs text-gray-400 mr-auto">{filtered.length} {t('newsPage.resultLabel')}</span>
        </div>
      </section>

      {/* List */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">{t('newsPage.noResults')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(item => (
                <NewsCard key={item.id} item={item} onClick={() => handleOpen(item)} t={t} locale={locale} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 pb-10">
        <a href="/creative-city/secretariat"
          className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors"
        >
          {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {t('newsPage.backLink')}
        </a>
      </div>

      <AnimatePresence>
        {selected && <NewsModal item={selected} onClose={handleClose} t={t} locale={locale} />}
      </AnimatePresence>
    </div>
  );
}
