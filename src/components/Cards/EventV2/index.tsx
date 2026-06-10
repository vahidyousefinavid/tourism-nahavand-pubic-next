'use client';
import React from 'react';
import moment from 'jalali-moment';
import { Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AppLocale } from '@/types';

type TimeRange = {
  startDate: string;
  endDate?: string;
  timeStart?: string;
  timeEnd?: string;
};

function formatShortDate(date: string, locale: AppLocale): string {
  try {
    const m = moment(date, 'YYYY-MM-DD').locale(locale === 'fa' ? 'fa' : locale);
    return locale === 'fa' ? m.format('jD jMMMM') : m.format('D MMM');
  } catch {
    return date;
  }
}

export default function EventCardV2({
  image,
  description,
  title,
  index,
  id,
  location,
  timeRanges,
  onClick,
  locale = 'fa',
}: {
  id: string;
  image: string;
  title: Record<string, string>;
  description: Record<string, string>;
  location: Record<string, string>;
  timeRanges: TimeRange[];
  index: number;
  onClick?: () => void;
  locale?: AppLocale;
}) {
  const { t } = useTranslation();
  const firstTime = timeRanges?.[0] ?? null;
  const dateText = firstTime ? formatShortDate(firstTime.startDate, locale) : '';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 w-full select-none"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={(process.env.NEXT_PUBLIC_API_URL || '') + image}
          alt={title[locale] || ''}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/pexels.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {dateText && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
            <Calendar className="w-3 h-3 text-purple-500" />
            {dateText}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">
          {title[locale] || title.fa}
        </h3>
        <p className="text-gray-400 text-[12px] line-clamp-2 leading-relaxed mb-3">
          {description[locale] || description.fa}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-[11px] truncate max-w-[130px]">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{location?.[locale] || location?.fa}</span>
          </div>
          <button className="text-[11px] font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-full transition-colors whitespace-nowrap">
            {t('eventCard.details', 'جزئیات')}
          </button>
        </div>
      </div>
    </div>
  );
}
