// import React from 'react';
// import Image from 'next/image';
// import { Users, Calendar, MapPin, DollarSign } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import InfoRow from './InfoRow';
// import { Event } from '@/types';

// type EventCardProps = {
//   event: Event;
//   onClick: (event: Event) => void;
// };

// export default function EventCard({ event, onClick }: EventCardProps) {
//   const getAvailableSpots = () => event.capacity - event.registered;

//   return (
//     <div
//       className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer card-hover"
//       onClick={() => onClick(event)}
//     >
//       <div className="relative h-48">
//         <Image src={event.image} alt={event.title} fill className="object-cover" />
//         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700 text-sm font-medium">
//           {{
//             festival: 'جشنواره',
//             cultural: 'فرهنگی',
//             sports: 'ورزشی',
//             religious: 'مذهبی',
//           }[event.category]}
//         </div>
//         {getAvailableSpots() < 10 && (
//           <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
//             {getAvailableSpots()} جای باقی‌مانده
//           </div>
//         )}
//       </div>

//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
//         <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

//         <div className="space-y-2 mb-4 text-gray-600 text-sm">
//           <InfoRow icon={<Calendar className="w-4 h-4" />} text={`${formatDate(event.date)} - ${event.time}`} />
//           <InfoRow icon={<MapPin className="w-4 h-4" />} text={event.location} />
//           <InfoRow icon={<DollarSign className="w-4 h-4" />} text={event.price} />
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-1 space-x-reverse text-gray-600 text-sm">
//             <Users className="w-4 h-4" />
//             <span>
//               {event.registered}/{event.capacity} نفر
//             </span>
//           </div>
//           <Button size="sm">مشاهده جزئیات</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // چون تابع formatDate در EventCard استفاده شده، اگر در فایل دیگری تعریف شده، باید ایمپورت شود.
// // اگر نه، می توانید این تابع را به صورت زیر به این فایل اضافه کنید:

// function formatDate(dateString: string) {
//   return new Date(dateString).toLocaleDateString('fa-IR', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// }

'use client';
import { Calendar, DollarSign, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Event } from '@/types';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

interface EventCardProps {
  event: Event;
  index?: number;
  onClick: () => void;
  locale?: string;
}

export function EventCard({
  event,
  index = 0,
  onClick,
  locale = 'fa',
}: EventCardProps) {
  const { t, i18n } = useTranslation();
  const { isRTL, dir } = useDirection();

  const lang = locale || i18n.language;

  // داده‌های چندزبانه با fallback
  const title = event.title?.[lang] || event.title?.fa || '';
  const description = event.description?.[lang] || event.description?.fa || '';
  const organizer = event.organizer?.[lang] || event.organizer?.fa || '';
  const locationText = event.location?.[lang] || event.location?.fa || '';

  // تصویر
  const imgSrc = event.image
    ? (process.env.NEXT_PUBLIC_API_URL || '') + event.image
    : '';

  // ظرفیت
  const remaining = event.capacity - event.registered;
  const isLow = remaining < 10;

  // فرمت تاریخ عمومی
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // گرفتن اولین بازه زمانی
  const getTimeLabel = () => {
    if (!event.timeRanges?.length) return '';

    const tr: any = event.timeRanges[0];

    switch (tr.mode) {
      case 'continuous':
        return t('eventCard.time.continuous', {
          start: formatDate(tr.startDate),
          end: formatDate(tr.endDate),
          from: tr.timeStart,
          to: tr.timeEnd,
        });

      case 'daily':
        return t('eventCard.time.daily', { from: tr.timeStart, to: tr.timeEnd });

      case 'weekly':
        return t('eventCard.time.weekly', {
          days: tr.daysOfWeek,
          from: tr.timeStart,
          to: tr.timeEnd,
        });

      case 'specificDates':
        return t('eventCard.time.specificDates', { dates: tr.specificDates });

      default:
        return '';
    }
  };

  return (
    <div
      dir={dir}
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer
        flex flex-col h-full
        ${isRTL ? 'text-right' : 'text-left'}
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* عکس */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* برگزارکننده */}
        {organizer && (
          <div
            className={`
              absolute top-4 ${isRTL ? 'right-4' : 'left-4'}
              bg-white/90 px-3 py-1 rounded-full shadow-sm text-sm font-medium text-gray-700
            `}
          >
            {organizer}
          </div>
        )}

        {/* ظرفیت پایین */}
        {isLow && (
          <div
            className={`
              absolute top-4 ${isRTL ? 'left-4' : 'right-4'}
              bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium
            `}
          >
            {t('eventCard.remainingSpots', { count: remaining })}
          </div>
        )}
      </div>

      {/* متن */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        {/* اطلاعات */}
        <div className="space-y-2 mb-4">
          {/* زمان */}
          <div
            className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''
              }`}
          >
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{getTimeLabel()}</span>
          </div>

          {/* مکان */}
          <div
            className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''
              }`}
          >
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>

          {/* قیمت */}
          <div
            className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''
              }`}
          >
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {event.price === 0
                ? t('eventCard.free')
                : t('eventCard.price', {
                  price: event.price?.toLocaleString(lang),
                })}
            </span>
          </div>
        </div>

        {/* ثبت‌نام / ظرفیت */}
        <div
          className={`
            flex items-center justify-between mt-auto pt-4 border-t border-gray-100
            ${isRTL ? 'flex-row-reverse' : ''}
          `}
        >
          <div
            className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''
              }`}
          >
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {t('eventCard.registered', {
                registered: event.registered,
                capacity: event.capacity,
              })}
            </span>
          </div>

          <Button size="sm">
            {t('eventCard.detailsButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}
