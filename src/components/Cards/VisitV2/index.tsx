'use client';
import { useTranslation } from 'react-i18next';
import { AppLocale } from '@/types';
import { MapPin, Eye } from 'lucide-react';

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  historical: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'تاریخی' },
  natural:    { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'طبیعی' },
  cultural:   { bg: 'bg-purple-100', text: 'text-purple-700', label: 'فرهنگی' },
  religious:  { bg: 'bg-blue-100', text: 'text-blue-700', label: 'مذهبی' },
};

export default function VisitCardV2({
  location,
  index,
  onClick,
  locale = 'fa',
}: {
  location: any;
  index: any;
  onClick?: () => void;
  locale?: AppLocale;
}) {
  const { t } = useTranslation();
  const name = location.name?.[locale] || location.name?.fa || '';
  const description = location.description?.[locale] || location.description?.fa || '';
  const imageUrl =
    (process.env.NEXT_PUBLIC_API_URL || '') +
    (location?.images?.[location?.mainImageIndex ?? 0] || '');
  const cat = CATEGORY_STYLES[location.category] ?? {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    label: location.category,
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
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/back2.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span
          className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${cat.bg} ${cat.text}`}
        >
          {cat.label}
        </span>
        {location.views > 0 && (
          <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1 text-white/80 text-[10px] bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <Eye className="w-3 h-3" />
            {location.views}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 mb-1">
          {name}
        </h3>
        <p className="text-gray-400 text-[12px] line-clamp-2 leading-relaxed mb-3">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-[11px]">
            <MapPin className="w-3 h-3" />
            <span>نهاوند</span>
          </div>
          <button className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition-colors">
            {t('visitCard.details', 'مشاهده')}
          </button>
        </div>
      </div>
    </div>
  );
}
