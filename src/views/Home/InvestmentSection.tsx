'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import { TrendingUp, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import CardRail from './CardRail';
import InvestmentModal from '@/components/Modals/InvestmentModal';
import { InvestmentOpportunity } from '@/types/investment';
import { AppLocale } from '@/types';
import { formatMoney } from '@/lib/format-money';
import { FallbackImage } from '@/components/ui/FallbackImage';

const CATEGORY_STYLES: Record<string, { bg: string; text: string; labelKey: string }> = {
  'real-estate': { bg: 'bg-blue-100', text: 'text-blue-700', labelKey: 'investmentPage.categories.realEstate' },
  agriculture:   { bg: 'bg-emerald-100', text: 'text-emerald-700', labelKey: 'investmentPage.categories.agriculture' },
  tourism:       { bg: 'bg-purple-100', text: 'text-purple-700', labelKey: 'investmentPage.categories.tourism' },
  handicrafts:   { bg: 'bg-amber-100', text: 'text-amber-700', labelKey: 'investmentPage.categories.handicrafts' },
  industry:      { bg: 'bg-gray-100', text: 'text-gray-700', labelKey: 'investmentPage.categories.industry' },
  technology:    { bg: 'bg-cyan-100', text: 'text-cyan-700', labelKey: 'investmentPage.categories.technology' },
};

function InvestmentCardCompact({
  opportunity,
  locale,
  onClick,
}: {
  opportunity: InvestmentOpportunity;
  locale: string;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const title = opportunity.title?.[locale] || opportunity.title?.fa || '';
  const shortDesc = opportunity.shortDescription?.[locale] || opportunity.shortDescription?.fa || '';
  const mainImg = opportunity.images?.length
    ? opportunity.images[opportunity.mainImageIndex ?? 0]
    : opportunity.image;
  const imageUrl = mainImg
    ? `${process.env.NEXT_PUBLIC_API_URL || ''}${mainImg}`
    : '/images/back2.jpg';
  const cat = CATEGORY_STYLES[opportunity.category] ?? {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    labelKey: '',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 w-full select-none"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <FallbackImage
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <span
          className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}
        >
          {cat.labelKey ? t(cat.labelKey, opportunity.category) : opportunity.category}
        </span>
        {opportunity.status === 'active' && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {t('investmentPage.active', 'فعال')}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{title}</h3>
        <p className="text-gray-400 text-[12px] line-clamp-2 leading-relaxed mb-3">{shortDesc}</p>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            {opportunity.minInvestment ? (
              <span className="font-semibold text-gray-700 text-[11px]">
                {formatMoney(opportunity.minInvestment, locale)}
              </span>
            ) : opportunity.expectedReturn ? (
              <span className="text-emerald-600 text-[11px] font-medium">
                {t('investmentPage.return', 'بازده:')} {opportunity.expectedReturn}
              </span>
            ) : null}
          </div>
          <button className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full transition-colors whitespace-nowrap flex-shrink-0">
            {t('investmentPage.more', 'بیشتر')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InvestmentSection() {
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [investments, setInvestments] = useState<InvestmentOpportunity[]>([]);
  const [selected, setSelected] = useState<InvestmentOpportunity | null>(null);

  useEffect(() => {
    axios
      .get('/api/investments?page=1&limit=10')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setInvestments(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section dir={dir} className="bg-[var(--nh-paper)] py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
        <SectionHeader
          eyebrow={t('investmentPage.sectionTag', 'فرصت‌های سرمایه‌گذاری')}
          title={t('investmentPage.title', 'سرمایه‌گذاری در نهاوند')}
          subtitle={t(
            'investmentPage.homeSubtitle',
            'طرح‌های باز در گردشگری، کشاورزی و صنایع‌دستی — همراه با سرمایهٔ لازم و وضعیت هر طرح.',
          )}
          href="/investment/opportunities"
          linkLabel={t('investmentPage.viewAll', 'همهٔ فرصت‌ها')}
        />

        <CardRail
          items={investments}
          getKey={(inv) => inv.id}
          slideWidth="!w-[240px] sm:!w-[265px]"
          gridCols="sm:grid-cols-2 lg:grid-cols-4"
          empty={{
            title: t('investmentPage.emptyTitle', 'هنوز فرصتی منتشر نشده'),
            body: t(
              'investmentPage.emptyBody',
              'طرح‌های سرمایه‌گذاری پس از بررسی در همین بخش منتشر می‌شوند. اگر طرحی در نهاوند دارید، می‌توانید آن را پیشنهاد بدهید.',
            ),
            href: '/investment/suggest',
            linkLabel: t('investmentPage.emptyCta', 'پیشنهاد یک طرح'),
          }}
          more={{
            href: '/investment/suggest',
            label: t('investmentPage.emptyCta', 'پیشنهاد یک طرح'),
            note: t('investmentPage.moreNote', 'طرح خودتان را ثبت کنید'),
          }}
          moreSpan="sm:col-span-1 lg:col-span-3"
          renderItem={(inv) => (
            <InvestmentCardCompact
              opportunity={inv}
              locale={i18n.language}
              onClick={() => {
                setSelected(inv);
                const base = process.env.NEXT_PUBLIC_API_URL || '';
                fetch(`${base}/api/investments/${inv.id}/view`, { method: 'POST' }).catch(() => {});
              }}
            />
          )}
        />
      </div>

      {/* Modal */}
      <InvestmentModal
        opportunity={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        locale={i18n.language}
      />
    </section>
  );
}
