'use client';
import Image from 'next/image';
import { Clock, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Location } from '@/types';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

interface LocationCardProps {
  location: Location;
  index: number;
  onClick: () => void;
  locale?: string;
}

export function LocationCard({
  location,
  index,
  onClick,
  locale = 'fa',
}: LocationCardProps) {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  // دریافت نام و توضیحات با فال‌بک
  const name = location.name?.[locale] || location.name?.fa || '';
  const description = location.description?.[locale] || location.description?.fa || '';
  const openingHours = location.openingHours?.[locale] || location.openingHours?.fa || '';
  const entryFee = location.entryFee?.[locale] || location.entryFee?.fa || '';

  // دریافت ترجمه دسته‌بندی
  const categoryLabel = t(`categories.${location.category}`);

  // انتخاب تصویر اصلی
  const imageSrc = location.images?.[location.mainImageIndex || 0] || location.images?.[0] || '';
  const fullImageSrc = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL + imageSrc
    : imageSrc;

  return (
    <div
      dir={dir}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer flex flex-col h-full ${isRTL ? 'text-right' : 'text-left'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* تصویر اصلی */}
      <div className="relative h-48 flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={fullImageSrc}
          alt={name}
        />
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm`}>
          <span className="text-sm font-medium text-gray-700">
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* متن */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        {/* اطلاعات زمان و هزینه */}
        <div className="space-y-2 mb-4">
          <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{openingHours}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{entryFee}</span>
          </div>
        </div>

        {/* امتیاز و دکمه */}
        <div className={`flex items-center justify-between mt-auto pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {location.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({location.views} {t('locationCard.views')})
            </span>
          </div>
          <Button size="sm">
            {t('locationCard.details')}
          </Button>
        </div>
      </div>
    </div>
  );
}