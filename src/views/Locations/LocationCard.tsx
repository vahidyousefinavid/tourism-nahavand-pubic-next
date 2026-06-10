'use client';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Star, Eye } from 'lucide-react';
import { formatMoney } from '@/lib/format-money';
import { Location } from '@/types';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

interface LocationCardProps {
  location: Location;
  index: number;
  onClick: () => void;
  locale?: string;
}

const CATEGORY_COLORS: Record<string, { badge: string; button: string; bg: string }> = {
  historical: {
    badge: 'bg-amber-500/90 text-white',
    button: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
    bg: 'bg-amber-100',
  },
  natural: {
    badge: 'bg-emerald-500/90 text-white',
    button: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    bg: 'bg-emerald-100',
  },
  cultural: {
    badge: 'bg-blue-500/90 text-white',
    button: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    bg: 'bg-blue-100',
  },
  religious: {
    badge: 'bg-purple-500/90 text-white',
    button: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    bg: 'bg-purple-100',
  },
};

export function LocationCard({ location, index, onClick, locale = 'fa' }: LocationCardProps) {
  const { t, i18n } = useTranslation();
  const { isRTL, dir } = useDirection();

  const lang = locale || i18n.language;

  const name = location.name?.[lang] || location.name?.fa || '';
  const description = location.description?.[lang] || location.description?.fa || '';
  const openingHours = location.openingHours?.[lang] || location.openingHours?.fa || '';
  const entryFee = location.entryFee
    ? (location.entryFee as any)?.amount === 0
      ? t('locationCard.free', 'رایگان')
      : formatMoney(location.entryFee as any, lang)
    : '';
  const categoryLabel = t(`categories.${location.category}`);

  const imageSrc = location.images?.[location.mainImageIndex ?? 0] || location.images?.[0] || '';
  const fullImageSrc = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL + imageSrc
    : imageSrc;

  const colors = CATEGORY_COLORS[location.category] || CATEGORY_COLORS.historical;

  return (
    <motion.div
      dir={dir}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'}`}
    >
      {/* تصویر */}
      <div className="relative h-52 flex-shrink-0 overflow-hidden">
        <img
          src={fullImageSrc}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* badge دسته‌بندی */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
          <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm`}>
            {categoryLabel}
          </span>
        </div>

        {/* امتیاز */}
        <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
          <span className="bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {location.rating}
          </span>
        </div>

        {/* بازدیدها — پایین تصویر */}
        <div className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'} flex items-center gap-1 text-white/80 text-xs`}>
          <Eye className="w-3.5 h-3.5" />
          <span>{location.views?.toLocaleString(lang)}</span>
        </div>
      </div>

      {/* محتوا */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1">{name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">{description}</p>

        {/* اطلاعات */}
        <div className="space-y-1.5 mb-4">
          {openingHours && (
            <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="truncate">{openingHours}</span>
            </div>
          )}
          {entryFee && (
            <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <DollarSign className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="truncate">{entryFee}</span>
            </div>
          )}
        </div>

        {/* دکمه */}
        <button
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${colors.button}`}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {t('locationCard.details', 'مشاهده جزئیات')}
        </button>
      </div>
    </motion.div>
  );
}
