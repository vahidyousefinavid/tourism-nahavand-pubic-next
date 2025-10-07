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


import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, DollarSign, Users, User } from 'lucide-react';
import InfoRow from './InfoRow';
import { Button } from '@/components/ui/Button';
import { Event } from '@/types';

type EventModalContentProps = {
  event: Event;
  locale?: 'fa' | 'en' | 'ar' | 'zh';
  onClose?: () => void;
};

export default function EventModalContent({ event, locale = 'fa' }: EventModalContentProps) {
  const getAvailableSpots = () => event.capacity - event.registered;

  // ایمن کردن تاریخ
  function formatDate(dateString?: string) {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  }

  // helper برای گرفتن مقدار چندزبانه با fallback
  const t = (obj: Record<string, string> | undefined) =>
    obj?.[locale] ?? obj?.fa ?? Object.values(obj ?? {})[0] ?? '';

  const firstRange = event.timeRanges?.[0];
  const dateText = formatDate(firstRange?.startDate);
  const timeText = firstRange?.timeStart ? ` - ${firstRange.timeStart}` : '';
  const dateAndTime = (dateText || timeText) ? `${dateText}${timeText}` : '';

  return (
    <div className="space-y-6 w-full sm:w-[450px]">
      {/* Image */}
      <div className="relative h-64 rounded-lg overflow-hidden w-full bg-gray-100">
        {event.image ? (
          // <Image src={event.image} alt={t(event.title)} fill className="object-cover" />
          <img
            src={
              process.env.NEXT_PUBLIC_API_URL
                ? process.env.NEXT_PUBLIC_API_URL + event.image
                : event.image
            }
            alt={`${event.title['fa']} - تصویر `}
            // fill
            className="object-cover rounded-lg"
          // priority={index === 0}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            بدون تصویر
          </div>
        )}
      </div>

      {/* Description */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">توضیحات رویداد</h3>
        <p className="text-gray-600 leading-relaxed">{t(event.description)}</p>
      </section>

      {/* Event Details + Registration Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">جزئیات رویداد</h3>

          {dateAndTime && (
            <InfoRow icon={<Calendar className="w-5 h-5 text-blue-600" />} text={dateAndTime} />
          )}

          <InfoRow icon={<MapPin className="w-5 h-5 text-blue-600" />} text={t(event.location)} />

          {typeof event.price === 'number' && (
            <InfoRow
              icon={<DollarSign className="w-5 h-5 text-blue-600" />}
              text={`${event.price.toLocaleString()} تومان`}
            />
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">اطلاعات ثبت‌نام</h3>
          <InfoRow icon={<Users className="w-5 h-5 text-blue-600" />} text={`ظرفیت: ${event.capacity} نفر`} />
          <InfoRow icon={<User className="w-5 h-5 text-blue-600" />} text={`ثبت‌نام شده: ${event.registered} نفر`} />
          <InfoRow icon={<Users className="w-5 h-5 text-blue-600" />} text={`جای باقی‌مانده: ${getAvailableSpots()} نفر`} />
        </div>
      </section>

      {/* Organizer */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">برگزارکننده</h3>
        <p className="text-gray-600">{t(event.organizer)}</p>
      </section>

      {/* CTA Button */}
      {/* <section className="border-t pt-6">
        {getAvailableSpots() > 0 ? (
          <Button size="lg" className="w-full">
            ثبت‌نام در رویداد
          </Button>
        ) : (
          <Button size="lg" variant="secondary" className="w-full" disabled>
            ظرفیت تکمیل شده
          </Button>
        )}
      </section> */}
    </div>
  );
}
