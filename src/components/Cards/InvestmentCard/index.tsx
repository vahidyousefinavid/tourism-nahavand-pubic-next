'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { InvestmentOpportunity } from '@/types/investment';
import { formatMoney } from '@/lib/format-money';

interface InvestmentCardProps {
  opportunity: InvestmentOpportunity;
  index?: number;
  onClick: () => void;
  locale?: string;
}

export function InvestmentCard({
  opportunity,
  index = 0,
  onClick,
  locale = 'fa',
}: InvestmentCardProps) {
  const { t, i18n } = useTranslation();
  const { isRTL, dir } = useDirection();
  const [imageLoaded, setImageLoaded] = useState(false);

  const lang = locale || i18n.language;

  // دریافت متن‌های چندزبانه
  const title = opportunity.title?.[lang] || opportunity.title?.fa || '';
  const shortDesc = opportunity.shortDescription?.[lang] || opportunity.shortDescription?.fa || '';
  const categoryLabel = getCategoryLabel(opportunity.category, lang);
  const riskLabel = getRiskLabel(opportunity.riskLevel, lang);

  // ساخت URL تصویر اصلی
  const mainImg = opportunity.images?.length
    ? opportunity.images[opportunity.mainImageIndex ?? 0]
    : opportunity.image;
  const imageUrl = mainImg
    ? `${process.env.NEXT_PUBLIC_API_URL || ''}${mainImg}`
    : '/images/back2.jpg';

  // رنگ‌بندی بر اساس دسته‌بندی
  const categoryColors = getCategoryColors(opportunity.category);

  return (
    <motion.div
      dir={dir}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer
        flex flex-col h-full
        ${isRTL ? 'text-right' : 'text-left'}
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* تصویر */}
      <div className="relative h-52 flex-shrink-0 overflow-hidden">
        {!imageLoaded && (
          <div className={`absolute inset-0 ${categoryColors.bg} animate-pulse`} />
        )}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* برچسب دسته‌بندی */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} flex items-center gap-2`}>
          <span className={`
            ${categoryColors.badge} px-3 py-1 rounded-full text-sm font-medium
            backdrop-blur-sm shadow-sm
          `}>
            {categoryLabel}
          </span>
        </div>

        {/* وضعیت */}
        {opportunity.status === 'active' && (
          <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {t('investmentPage.opportunities.status.active')}
            </span>
          </div>
        )}

        {/* اطلاعات پایین تصویر */}
        <div className="absolute bottom-3 left-0 right-0 px-4 flex items-center justify-between">
          {opportunity.minInvestment && (
            <div className="text-white text-sm font-medium">
              {t('investmentPage.opportunities.minInvestment')}: {formatMoney(opportunity.minInvestment, lang)}
            </div>
          )}
          {opportunity.riskLevel && (
            <div className={`
              px-2 py-0.5 rounded text-xs font-medium
              ${riskLabel === t('investmentPage.opportunities.risk.low') ? 'bg-green-500/80 text-white' : ''}
              ${riskLabel === t('investmentPage.opportunities.risk.medium') ? 'bg-yellow-500/80 text-white' : ''}
              ${riskLabel === t('investmentPage.opportunities.risk.high') ? 'bg-red-500/80 text-white' : ''}
            `}>
              {riskLabel}
            </div>
          )}
        </div>
      </div>

      {/* محتوا */}
      <div className="p-6 flex flex-col flex-grow">
        {/* عنوان */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* توضیح کوتاه */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
          {shortDesc}
        </p>

        {/* اطلاعات کلیدی */}
        {(opportunity.expectedReturn || opportunity.timeframe) && (
          <div className={`space-y-2 mb-4 pb-4 border-b ${isRTL ? 'border-r' : 'border-l'}-gray-200`}>
            {opportunity.expectedReturn && (
              <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-gray-700">
                  {t('investmentPage.opportunities.expectedReturn')}: {opportunity.expectedReturn}
                </span>
              </div>
            )}
            {opportunity.timeframe && (
              <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">
                  {t('investmentPage.opportunities.timeframe')}: {opportunity.timeframe}
                </span>
              </div>
            )}
          </div>
        )}

        {/* دکمه */}
        <button
          className={`
            w-full py-2.5 rounded-xl font-medium transition-all duration-200
            ${categoryColors.button}
            ${isRTL ? 'flex-row-reverse' : ''}
          `}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <span>{t('investmentPage.opportunities.viewDetails')}</span>
          {/* <svg
            className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg> */}
        </button>
      </div>
    </motion.div>
  );
}

// Helper functions
function getCategoryLabel(category: string, lang: string): string {
  const labels: Record<string, Record<string, string>> = {
    'real-estate': { fa: 'ملکی و ساختمانی', en: 'Real Estate', ar: 'عقارات', zh: '房地产' },
    'agriculture': { fa: 'کشاورزی', en: 'Agriculture', ar: 'زراعة', zh: '农业' },
    'tourism': { fa: 'گردشگری', en: 'Tourism', ar: 'سياحة', zh: '旅游业' },
    'handicrafts': { fa: 'صنایع دستی', en: 'Handicrafts', ar: 'حرف دستی', zh: '手工艺品' },
    'industry': { fa: 'صنعتی', en: 'Industry', ar: 'صناعة', zh: '工业' },
    'technology': { fa: 'فناوری', en: 'Technology', ar: 'تكنولوجيا', zh: '科技' },
  };
  return labels[category]?.[lang] || labels[category]?.fa || category;
}

function getRiskLevel(riskLevel?: 'low' | 'medium' | 'high'): string {
  return riskLevel || 'medium';
}

function getRiskLabel(riskLevel?: 'low' | 'medium' | 'high', lang?: string): string {
  const labels: Record<string, Record<string, string>> = {
    low: { fa: 'کم', en: 'Low', ar: 'منخفض', zh: '低' },
    medium: { fa: 'متوسط', en: 'Medium', ar: 'متوسط', zh: '中' },
    high: { fa: 'زیاد', en: 'High', ar: 'مرتفع', zh: '高' },
  };
  const key = getRiskLevel(riskLevel);
  return labels[key]?.[lang || 'fa'] || labels.medium.fa;
}

function getCategoryColors(category: string): {
  badge: string;
  button: string;
  bg: string;
} {
  const colors: Record<string, { badge: string; button: string; bg: string }> = {
    'real-estate': {
      badge: 'bg-blue-500/90 text-white',
      button: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      bg: 'bg-blue-100',
    },
    'agriculture': {
      badge: 'bg-green-500/90 text-white',
      button: 'bg-green-50 text-green-700 hover:bg-green-100',
      bg: 'bg-green-100',
    },
    'tourism': {
      badge: 'bg-purple-500/90 text-white',
      button: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      bg: 'bg-purple-100',
    },
    'handicrafts': {
      badge: 'bg-amber-500/90 text-white',
      button: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
      bg: 'bg-amber-100',
    },
    'industry': {
      badge: 'bg-gray-600/90 text-white',
      button: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
      bg: 'bg-gray-100',
    },
    'technology': {
      badge: 'bg-cyan-500/90 text-white',
      button: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
      bg: 'bg-cyan-100',
    },
  };
  return colors[category] || colors['real-estate'];
}