'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { InvestmentOpportunity } from '@/types/investment';
import { InvestmentCard } from '@/components/Cards/InvestmentCard';
import InvestmentModal from '@/components/Modals/InvestmentModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Filter, X } from 'lucide-react';
import i18n from '@/lib/i18n';
import { AppLocale } from '@/types';
import axios from 'axios';

const CATEGORIES = [
  { value: 'real-estate', fa: 'ملکی و ساختمانی', en: 'Real Estate',  ar: 'العقارات',      zh: '房地产' },
  { value: 'agriculture', fa: 'کشاورزی',         en: 'Agriculture',   ar: 'الزراعة',       zh: '农业'   },
  { value: 'tourism',     fa: 'گردشگری',          en: 'Tourism',       ar: 'السياحة',       zh: '旅游业' },
  { value: 'handicrafts', fa: 'صنایع دستی',      en: 'Handicrafts',   ar: 'الحرف اليدوية', zh: '手工艺' },
  { value: 'industry',    fa: 'صنعت',             en: 'Industry',      ar: 'الصناعة',       zh: '工业'   },
  { value: 'technology',  fa: 'فناوری',           en: 'Technology',    ar: 'التكنولوجيا',   zh: '科技'   },
];

export default function InvestmentOpportunitiesPage() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = i18n.language as AppLocale;

  const [all, setAll] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InvestmentOpportunity | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/investments', { params: { limit: 200 } })
      .then(res => {
        const raw = res.data?.data ?? res.data;
        const list = Array.isArray(raw) ? raw : [];
        setAll(list.filter((i: InvestmentOpportunity) => i.status === 'active'));
      })
      .catch(() => setAll([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && all.length > 0) {
      const found = all.find(o => o.id === id);
      if (found && found.id !== selected?.id) {
        setSelected(found);
        fetch(`/api/investments/${found.id}/view`, { method: 'POST' }).catch(() => {});
      }
    }
  }, [searchParams, all]);

  const filtered = useMemo(() => {
    let list = all;
    if (activeCategory) list = list.filter(i => i.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(i => {
        const title = (i.title as any)?.[locale] || (i.title as any)?.fa || '';
        const desc = (i.shortDescription as any)?.[locale] || (i.shortDescription as any)?.fa || '';
        return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
      });
    }
    return list;
  }, [all, activeCategory, search, locale]);

  const handleClick = (inv: InvestmentOpportunity) => {
    setSelected(inv);
    fetch(`/api/investments/${inv.id}/view`, { method: 'POST' }).catch(() => {});
    router.push(`/investment/opportunities?id=${inv.id}`, { scroll: false });
  };

  const handleClose = () => {
    setSelected(null);
    router.push('/investment/opportunities', { scroll: false });
  };

  const getCatLabel = (cat: { value: string; fa: string; en: string; ar: string; zh: string }) =>
    (cat as any)[locale] || cat.fa;

  return (
    <div dir={dir} className={`min-h-screen bg-gradient-to-br from-blue-50/30 to-slate-50 py-10 px-4 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <motion.span
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <TrendingUp className="w-4 h-4" />
            {t('investmentOpportunitiesPage.badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-2"
          >
            {t('investmentOpportunitiesPage.title')}
          </motion.h1>
          <p className="text-gray-500 text-base">{t('investmentOpportunitiesPage.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('investmentOpportunitiesPage.searchPlaceholder')}
              className={`w-full border border-gray-200 rounded-xl py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 ${isRTL ? 'pr-9 pl-10' : 'pl-9 pr-10'}`}
            />
            {search && (
              <button onClick={() => setSearch('')}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${isRTL ? 'left-2.5' : 'right-2.5'}`}>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === null ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
            >
              {t('investmentOpportunitiesPage.filterAll')}
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat.value}
                onClick={() => setActiveCategory(p => p === cat.value ? null : cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === cat.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
              >
                {getCatLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <p className="text-xs text-gray-400 mb-5">
            {filtered.length} {t('investmentOpportunitiesPage.found')}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <TrendingUp className="w-16 h-16 text-blue-100 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">{t('investmentOpportunitiesPage.noResults')}</h3>
            {(search || activeCategory) && (
              <button onClick={() => { setSearch(''); setActiveCategory(null); }}
                className="mt-4 text-sm text-blue-600 hover:underline">
                {t('investmentOpportunitiesPage.filterAll')} ×
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((inv, idx) => (
                <InvestmentCard key={inv.id} opportunity={inv} index={idx} onClick={() => handleClick(inv)} locale={locale} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <InvestmentModal opportunity={selected} isOpen={!!selected} onClose={handleClose} locale={locale} />
    </div>
  );
}
