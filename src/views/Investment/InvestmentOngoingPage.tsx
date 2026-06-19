'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, Clock, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { InvestmentOpportunity } from '@/types/investment';
import { InvestmentCard } from '@/components/Cards/InvestmentCard';
import InvestmentModal from '@/components/Modals/InvestmentModal';
import i18n from '@/lib/i18n';
import { AppLocale } from '@/types';

type Tab = 'ongoing' | 'completed';

export default function InvestmentOngoingPage() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = i18n.language as AppLocale;

  const [pending, setPending] = useState<InvestmentOpportunity[]>([]);
  const [completed, setCompleted] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InvestmentOpportunity | null>(null);
  const [tab, setTab] = useState<Tab>('ongoing');

  useEffect(() => {
    Promise.all([
      axios.get('/api/investments', { params: { limit: 200 } }),
    ])
      .then(([res]) => {
        const raw = res.data?.data ?? res.data;
        const list: InvestmentOpportunity[] = Array.isArray(raw) ? raw : [];
        setPending(list.filter(i => i.status === 'pending'));
        setCompleted(list.filter(i => i.status === 'completed'));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeList = tab === 'ongoing' ? pending : completed;

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && activeList.length > 0) {
      const found = activeList.find(i => i.id === id);
      if (found && found.id !== selected?.id) setSelected(found);
    }
  }, [searchParams, activeList]);

  const handleClick = (inv: InvestmentOpportunity) => {
    setSelected(inv);
    fetch(`/api/investments/${inv.id}/view`, { method: 'POST' }).catch(() => {});
    router.push(`/investment/ongoing?id=${inv.id}`, { scroll: false });
  };

  const handleClose = () => {
    setSelected(null);
    router.push('/investment/ongoing', { scroll: false });
  };

  const thisMonthCount = (list: InvestmentOpportunity[]) =>
    list.filter(i => {
      const d = new Date(i.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

  return (
    <div dir={dir} className={`min-h-screen bg-gradient-to-br from-amber-50/40 to-slate-50 py-10 px-4 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <motion.span
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Play className="w-4 h-4 fill-amber-600" />
            {t('investmentOngoing.badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-2"
          >
            {t('investmentOngoing.title')}
          </motion.h1>
          <p className="text-gray-500 text-base">{t('investmentOngoing.subtitle')}</p>
        </div>

        {/* Stats row */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: TrendingUp,    label: t('investmentOngoing.statActive'),      value: pending.length,                  color: 'amber'   },
              { icon: CheckCircle2, label: t('investmentOngoing.statCompleted'),    value: completed.length,                color: 'emerald' },
              { icon: Clock,        label: t('investmentOngoing.statWithTimeframe'),value: [...pending,...completed].filter(i => i.timeframe).length, color: 'blue' },
              { icon: Calendar,     label: t('investmentOngoing.statThisMonth'),    value: thisMonthCount([...pending,...completed]), color: 'purple' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-100 flex-shrink-0`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 w-fit mb-7">
          <button
            onClick={() => setTab('ongoing')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'ongoing' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Play className={`w-4 h-4 ${tab === 'ongoing' ? 'fill-amber-500 text-amber-500' : ''}`} />
            {t('investmentOngoing.tabOngoing')}
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === 'ongoing' ? 'bg-amber-100 text-amber-700' : 'bg-gray-200 text-gray-500'}`}>
              {pending.length}
            </span>
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'completed' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <CheckCircle2 className={`w-4 h-4 ${tab === 'completed' ? 'text-emerald-500' : ''}`} />
            {t('investmentOngoing.tabCompleted')}
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tab === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
              {completed.length}
            </span>
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {activeList.length === 0 ? (
                <div className="text-center py-20">
                  {tab === 'ongoing'
                    ? <Play className="w-16 h-16 text-amber-100 mx-auto mb-4" />
                    : <CheckCircle2 className="w-16 h-16 text-emerald-100 mx-auto mb-4" />
                  }
                  <h3 className="text-xl font-bold text-gray-400 mb-2">
                    {tab === 'ongoing' ? t('investmentOngoing.emptyOngoing') : t('investmentOngoing.emptyCompleted')}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {tab === 'ongoing' ? t('investmentOngoing.emptyOngoingSub') : t('investmentOngoing.emptyCompletedSub')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeList.map((inv, idx) => (
                    <div key={inv.id} className="relative">
                      {/* Status badge overlay */}
                      <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} z-10 flex items-center gap-1.5 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow ${tab === 'ongoing' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                        {tab === 'ongoing'
                          ? <><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />{t('investmentOngoing.badgeOngoing')}</>
                          : <><CheckCircle2 className="w-3 h-3" />{t('investmentOngoing.badgeCompleted')}</>
                        }
                      </div>
                      <InvestmentCard opportunity={inv} index={idx} onClick={() => handleClick(inv)} locale={locale} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <InvestmentModal opportunity={selected} isOpen={!!selected} onClose={handleClose} locale={locale} />
    </div>
  );
}
