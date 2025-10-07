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

import React from 'react';
import Image from 'next/image';
import { Users, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import InfoRow from './InfoRow';
import { Event } from '@/types';

type EventCardProps = {
  event: Event;
  onClick: (event: Event) => void;
  lang?: string; // زبان فعال برای نمایش
};

export default function EventCard({ event, onClick, lang = 'fa' }: EventCardProps) {
  const getAvailableSpots = () => event.capacity - event.registered;

  // 📌 گرفتن اولین بازه زمانی برای نمایش ساده
  const getFirstTimeRange = () => {
    if (!event.timeRanges?.length) return null;
    const tr = event.timeRanges[0];
    if (tr.mode === 'continuous' && tr.startDate && tr.endDate) {
      return `${formatDate(tr.startDate)} تا ${formatDate(tr.endDate)} (${tr.timeStart} - ${tr.timeEnd})`;
    }
    if (tr.mode === 'daily' && tr.timeStart && tr.timeEnd) {
      return `هر روز ${tr.timeStart} - ${tr.timeEnd}`;
    }
    if (tr.mode === 'weekly' && tr.daysOfWeek) {
      return `روزهای ${tr.daysOfWeek} (${tr.timeStart} - ${tr.timeEnd})`;
    }
    if (tr.mode === 'specificDates' && tr.specificDates) {
      return `تاریخ‌های خاص: ${tr.specificDates}`;
    }
    return null;
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer card-hover"
      onClick={() => onClick(event)}
    >
      {/* تصویر */}
      <div className="relative h-48">
        {/* {event.image && (
          <Image src={event.image} alt={event.title[lang] || ''} fill className="object-cover" />
        )} */}
        {event.image && (
          <img
            className="w-full h-full object-cover"
            src={process.env.NEXT_PUBLIC_API_URL + event.image}
            alt={event.title['fa'] || ""}
          />
        )}
        {/* دسته‌بندی */}
        {event.organizer && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700 text-sm font-medium">
            {event.organizer[lang]}
          </div>
        )}
        {/* ظرفیت باقی‌مانده */}
        {getAvailableSpots() < 10 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {getAvailableSpots()} جای باقی‌مانده
          </div>
        )}
      </div>

      {/* محتوا */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title[lang]}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description[lang]}</p>

        <div className="space-y-2 mb-4 text-gray-600 text-sm">
          {/* زمان */}
          {getFirstTimeRange() && (
            <InfoRow icon={<Calendar className="w-4 h-4" />} text={getFirstTimeRange()!} />
          )}
          {/* مکان */}
          <InfoRow icon={<MapPin className="w-4 h-4" />} text={event.location[lang]} />
          {/* قیمت */}
          {event.price !== undefined && (
            <InfoRow
              icon={<DollarSign className="w-4 h-4" />}
              text={event.price === 0 ? 'رایگان' : `${event.price?.toLocaleString('fa-IR')} تومان`}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 space-x-reverse text-gray-600 text-sm">
            <Users className="w-4 h-4" />
            <span>
              {event.registered}/{event.capacity} نفر
            </span>
          </div>
          <Button size="sm">مشاهده جزئیات</Button>
        </div>
      </div>
    </div>
  );
}

// 📌 فرمت تاریخ شمسی
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
