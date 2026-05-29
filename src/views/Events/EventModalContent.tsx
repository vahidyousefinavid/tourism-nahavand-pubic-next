// import React from 'react';
// import Image from 'next/image';
// import { Calendar, MapPin, DollarSign, Users, User } from 'lucide-react';
// import InfoRow from './InfoRow';
// import { Button } from '@/components/ui/Button';
// import { Event } from '@/types';

// type EventModalContentProps = {
//   event: Event;
//   onClose?: () => void;
// };

// export default function EventModalContent({ event }: EventModalContentProps) {
//   const getAvailableSpots = () => event.capacity - event.registered;

//   function formatDate(dateString: string) {
//     return new Date(dateString).toLocaleDateString('fa-IR', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   }

//   return (
//     <div className="space-y-6 w-full sm:w-[450px]">
//       <div className="relative h-64 rounded-lg overflow-hidden w-full">
//         <Image src={event.image} alt={event.title} fill className="object-cover" />
//       </div>

//       <section>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">توضیحات رویداد</h3>
//         <p className="text-gray-600 leading-relaxed">{event.description}</p>
//       </section>

//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-3">جزئیات رویداد</h3>
//           <InfoRow icon={<Calendar className="w-5 h-5 text-blue-600" />} text={`${formatDate(event.date)} - ${event.time}`} />
//           <InfoRow icon={<MapPin className="w-5 h-5 text-blue-600" />} text={event.location} />
//           <InfoRow icon={<DollarSign className="w-5 h-5 text-blue-600" />} text={event.price} />
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-3">اطلاعات ثبت‌نام</h3>
//           <InfoRow icon={<Users className="w-5 h-5 text-blue-600" />} text={`ظرفیت: ${event.capacity} نفر`} />
//           <InfoRow icon={<User className="w-5 h-5 text-blue-600" />} text={`ثبت‌نام شده: ${event.registered} نفر`} />
//           <InfoRow icon={<Users className="w-5 h-5 text-blue-600" />} text={`جای باقی‌مانده: ${getAvailableSpots()} نفر`} />
//         </div>
//       </section>

//       <section>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">برگزارکننده</h3>
//         <p className="text-gray-600">{event.organizer}</p>
//       </section>

//       <section className="border-t pt-6">
//         {getAvailableSpots() > 0 ? (
//           <Button size="lg" className="w-full">
//             ثبت‌نام در رویداد
//           </Button>
//         ) : (
//           <Button size="lg" variant="secondary" className="w-full" disabled>
//             ظرفیت تکمیل شده
//           </Button>
//         )}
//       </section>
//     </div>
//   );
// }


'use client';
import React from 'react';
import { Calendar, MapPin, DollarSign, Users, User } from 'lucide-react';
import InfoRow from './InfoRow'; // فرض می‌کنیم InfoRow در همین پوشه است
import { Button } from '@/components/ui/Button';
import { Event } from '@/types';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

type EventModalContentProps = {
  event: Event;
  locale?: 'fa' | 'en' | 'ar' | 'zh';
  onClose?: () => void;
};

export default function EventModalContent({ event, locale = 'fa' }: EventModalContentProps) {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  const getAvailableSpots = () => event.capacity - event.registered;

  function formatDate(dateString?: string) {
    if (!dateString) return '';
    try {
      const localeMap: Record<string, string> = {
        fa: 'fa-IR',
        en: 'en-US',
        ar: 'ar-AE',
        zh: 'zh-CN',
      };
      return new Date(dateString).toLocaleDateString(localeMap[locale] || 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  }

  const getLocalizedValue = (obj: Record<string, string> | undefined) => {
    if (!obj) return '';
    return obj?.[locale] ?? obj?.fa ?? Object.values(obj)[0] ?? '';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale).format(num);
  };

  const formatPrice = (price: number) => {
    let localeForPrice = 'en-US';
    let currency = 'USD';
    switch (locale) {
      case 'fa':
        localeForPrice = 'fa-IR';
        currency = 'IRR';
        break;
      case 'ar':
        localeForPrice = 'ar-AE';
        currency = 'AED';
        break;
      case 'zh':
        localeForPrice = 'zh-CN';
        currency = 'CNY';
        break;
      case 'en':
      default:
        localeForPrice = 'en-US';
        currency = 'USD';
        break;
    }
    return new Intl.NumberFormat(localeForPrice, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const firstRange = event.timeRanges?.[0];
  const dateText = formatDate(firstRange?.startDate);
  const timeText = firstRange?.timeStart ? ` - ${firstRange.timeStart}` : '';
  const dateAndTime = (dateText || timeText) ? `${dateText}${timeText}` : '';

  return (
    <div 
      dir={dir} 
      className={`w-full sm:w-[450px] ${isRTL ? 'text-right' : 'text-left'}`}
    >
      {/* Image */}
      <div className="relative h-64 rounded-lg overflow-hidden w-full bg-gray-100">
        {event.image ? (
          <img
            src={
              process.env.NEXT_PUBLIC_API_URL
                ? `${process.env.NEXT_PUBLIC_API_URL}${event.image}`
                : event.image
            }
            alt={getLocalizedValue(event.title)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {t('eventModal.noImage')}
          </div>
        )}
      </div>

      {/* Description */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('eventModal.description')}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {getLocalizedValue(event.description)}
        </p>
      </section>

      {/* Event Details + Registration Info */}
      <section className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ${isRTL ? 'md:grid-flow-row-reverse' : ''}`}>
        {/* ستون جزئیات رویداد */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t('eventModal.details')}
          </h3>
          {dateAndTime && (
            <InfoRow 
              icon={<Calendar className="w-5 h-5 text-blue-600" />} 
              // اینجا prop isRTL را به InfoRow پاس می‌دهیم
              text={dateAndTime} 
              isRTL={isRTL} 
            />
          )}
          <InfoRow 
            icon={<MapPin className="w-5 h-5 text-blue-600" />} 
            text={getLocalizedValue(event.location)} 
            isRTL={isRTL}
          />
          {typeof event.price === 'number' && (
            <InfoRow
              icon={<DollarSign className="w-5 h-5 text-blue-600" />}
              text={formatPrice(event.price)}
              isRTL={isRTL}
            />
          )}
        </div>
        
        {/* ستون اطلاعات ثبت‌نام */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {t('eventModal.registrationInfo')}
          </h3>
          <InfoRow 
            icon={<Users className="w-5 h-5 text-blue-600" />} 
            text={`${t('eventModal.capacity')}: ${formatNumber(event.capacity)}`} 
            isRTL={isRTL}
          />
          <InfoRow 
            icon={<User className="w-5 h-5 text-blue-600" />} 
            text={`${t('eventModal.registered')}: ${formatNumber(event.registered)}`} 
            isRTL={isRTL}
          />
          <InfoRow 
            icon={<Users className="w-5 h-5 text-blue-600" />} 
            text={`${t('eventModal.spotsLeft')}: ${formatNumber(getAvailableSpots())}`} 
            isRTL={isRTL}
          />
        </div>
      </section>

      {/* Organizer */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('eventModal.organizer')}
        </h3>
        <p className="text-gray-600">
          {getLocalizedValue(event.organizer)}
        </p>
      </section>

      {/* CTA Button */}
      <section className="border-t pt-6 mt-6">
        {getAvailableSpots() > 0 ? (
          <Button size="lg" className="w-full">
            {t('eventModal.registerBtn')}
          </Button>
        ) : (
          <Button size="lg" variant="secondary" className="w-full" disabled>
            {t('eventModal.capacityFull')}
          </Button>
        )}
      </section>
    </div>
  );
}
