'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import { TrendingUp, ArrowLeft, ArrowRight } from 'lucide-react';
import InvestmentModal from '@/components/Modals/InvestmentModal';
import { InvestmentOpportunity } from '@/types/investment';
import { AppLocale } from '@/types';
import { formatMoney } from '@/lib/format-money';

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  'real-estate': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'ملکی' },
  agriculture:   { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'کشاورزی' },
  tourism:       { bg: 'bg-purple-100', text: 'text-purple-700', label: 'گردشگری' },
  handicrafts:   { bg: 'bg-amber-100', text: 'text-amber-700', label: 'صنایع دستی' },
  industry:      { bg: 'bg-gray-100', text: 'text-gray-700', label: 'صنعت' },
  technology:    { bg: 'bg-cyan-100', text: 'text-cyan-700', label: 'فناوری' },
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
    label: opportunity.category,
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 w-full select-none"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/back2.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <span
          className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}
        >
          {cat.label}
        </span>
        {opportunity.status === 'active' && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            فعال
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
                بازده: {opportunity.expectedReturn}
              </span>
            ) : null}
          </div>
          <button className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full transition-colors whitespace-nowrap flex-shrink-0">
            بیشتر
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

  if (investments.length === 0) return null;

  return (
    <section dir={dir} className="py-12 sm:py-16 px-4 bg-gradient-to-b from-amber-50/60 to-white relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-3"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              فرصت‌های سرمایه‌گذاری
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900"
            >
              {t('investmentPage.title', 'سرمایه‌گذاری در نهاوند')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-gray-500 text-sm mt-1"
            >
              بهترین فرصت‌های رشد و سودآوری در قلب غرب ایران
            </motion.p>
          </div>
          <Link
            href="/investment/opportunities"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm border border-amber-200 hover:border-amber-400 px-5 py-2.5 rounded-full transition-all hover:bg-amber-50 whitespace-nowrap self-start sm:self-auto"
          >
            مشاهده همه
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation
          centeredSlides
          centeredSlidesBounds
          slidesPerView="auto"
          spaceBetween={16}
          className="!py-4 !-mx-1 !px-1"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {investments.map((inv, index) => (
            <SwiperSlide
              key={inv.id}
              className="!w-[220px] sm:!w-[240px]"
            >
              <InvestmentCardCompact
                opportunity={inv}
                locale={i18n.language}
                onClick={() => {
                  setSelected(inv);
                  const base = process.env.NEXT_PUBLIC_API_URL || '';
                  fetch(`${base}/api/investments/${inv.id}/view`, { method: 'POST' }).catch(() => {});
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
