'use client';

import { useRouter } from 'next/navigation';
import { Map, TrendingUp, Play, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { motion } from 'framer-motion';

const TABS = [
  { key: 'atlas',         href: '/investment/atlas',         icon: Map,        color: 'emerald' },
  { key: 'opportunities', href: '/investment/opportunities', icon: TrendingUp, color: 'blue'    },
  { key: 'ongoing',       href: '/investment/ongoing',       icon: Play,       color: 'amber'   },
  { key: 'suggest',       href: '/investment/suggest',       icon: Lightbulb,  color: 'purple'  },
] as const;

const COLOR_MAP = {
  emerald: { card: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100', icon: 'bg-emerald-100 text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700 text-white', label: 'text-emerald-700' },
  blue:    { card: 'bg-blue-50 border-blue-200 hover:border-blue-400 hover:bg-blue-100',             icon: 'bg-blue-100 text-blue-700',       btn: 'bg-blue-600 hover:bg-blue-700 text-white',       label: 'text-blue-700'    },
  amber:   { card: 'bg-amber-50 border-amber-200 hover:border-amber-400 hover:bg-amber-100',         icon: 'bg-amber-100 text-amber-700',     btn: 'bg-amber-600 hover:bg-amber-700 text-white',     label: 'text-amber-700'   },
  purple:  { card: 'bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100',     icon: 'bg-purple-100 text-purple-700',   btn: 'bg-purple-600 hover:bg-purple-700 text-white',   label: 'text-purple-700'  },
};

export default function InvestmentHubPage() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const router = useRouter();

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-5"
          >
            <TrendingUp className="w-4 h-4" />
            {t('investmentHub.badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight"
          >
            {t('investmentHub.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            {t('investmentHub.subtitle')}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TABS.map((tab, i) => {
            const colors = COLOR_MAP[tab.color];
            const Icon = tab.icon;
            const label = t(`investmentHub.${tab.key}.label`);
            const desc = t(`investmentHub.${tab.key}.desc`);
            return (
              <motion.button
                key={tab.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => router.push(tab.href)}
                className={`group relative flex flex-col items-${isRTL ? 'end' : 'start'} text-${isRTL ? 'right' : 'left'} p-8 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-lg ${colors.card}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${colors.icon}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h2 className={`text-xl font-bold mb-2 ${colors.label}`}>
                  {label}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {desc}
                </p>
                <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors ${colors.btn}`}>
                  {t('investmentHub.enterSection')}
                </span>
              </motion.button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
