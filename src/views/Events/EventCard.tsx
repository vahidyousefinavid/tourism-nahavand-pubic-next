'use client';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react';
import { formatMoney } from '@/lib/format-money';
import { Event } from '@/types';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

interface EventCardProps {
  event: Event;
  index?: number;
  onClick: () => void;
  locale?: string;
}

const CATEGORY_COLORS: Record<string, { badge: string; button: string; bg: string }> = {
  festival: {
    badge: 'bg-orange-500/90 text-white',
    button: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
    bg: 'bg-orange-100',
  },
  cultural: {
    badge: 'bg-blue-500/90 text-white',
    button: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    bg: 'bg-blue-100',
  },
  sports: {
    badge: 'bg-emerald-500/90 text-white',
    button: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    bg: 'bg-emerald-100',
  },
  religious: {
    badge: 'bg-purple-500/90 text-white',
    button: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    bg: 'bg-purple-100',
  },
  default: {
    badge: 'bg-gray-600/90 text-white',
    button: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
    bg: 'bg-gray-100',
  },
};

export function EventCard({ event, index = 0, onClick, locale = 'fa' }: EventCardProps) {
  const { t, i18n } = useTranslation();
  const { isRTL, dir } = useDirection();

  const lang = locale || i18n.language;

  const title = event.title?.[lang] || event.title?.fa || '';
  const description = event.description?.[lang] || event.description?.fa || '';
  const organizer = event.organizer?.[lang] || event.organizer?.fa || '';
  const locationText = event.location?.[lang] || event.location?.fa || '';

  const imgSrc = event.image ? (process.env.NEXT_PUBLIC_API_URL || '') + event.image : '';

  const remaining = event.capacity - event.registered;
  const isLow = remaining < 10 && remaining >= 0;

  // تاریخ اولین بازه
  const firstRange = event.timeRanges?.[0];
  const dateLabel = (() => {
    if (!firstRange) return '';
    if (firstRange.startDate) {
      return new Date(firstRange.startDate).toLocaleDateString(
        lang === 'fa' ? 'fa-IR' : lang === 'ar' ? 'ar-SA' : 'en-US',
        { month: 'long', day: 'numeric' }
      );
    }
    return '';
  })();

  const colors = CATEGORY_COLORS[(event as any).category] || CATEGORY_COLORS.default;

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
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full ${colors.bg}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* badge برگزارکننده/دسته‌بندی */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
          <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm`}>
            {organizer || t(`categories.${(event as any).category}`, organizer)}
          </span>
        </div>

        {/* ظرفیت کم */}
        {isLow && (
          <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
            <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-medium">
              {t('eventCard.remainingSpots', { count: remaining })}
            </span>
          </div>
        )}

        {/* تاریخ — پایین تصویر */}
        {dateLabel && (
          <div className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'} flex items-center gap-1.5 text-white/90 text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full`}>
            <Calendar className="w-3.5 h-3.5" />
            <span>{dateLabel}</span>
          </div>
        )}
      </div>

      {/* محتوا */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">{description}</p>

        {/* اطلاعات */}
        <div className="space-y-1.5 mb-4">
          {locationText && (
            <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MapPin className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="truncate">{locationText}</span>
            </div>
          )}
          <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <DollarSign className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span>
              {!event.price || (event.price as any)?.amount === 0
                ? t('eventCard.free', 'رایگان')
                : formatMoney(event.price as any, lang)}
            </span>
          </div>
          <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Users className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span>{t('eventCard.registered', { registered: event.registered, capacity: event.capacity })}</span>
          </div>
        </div>

        {/* دکمه */}
        <button
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${colors.button}`}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {t('eventCard.detailsButton', 'مشاهده جزئیات')}
        </button>
      </div>
    </motion.div>
  );
}
