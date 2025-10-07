// import React from 'react';
// import moment from 'jalali-moment';
// import { Calendar, MapPin, MapPinCheckInside } from "lucide-react";
// import { Button } from '@/components/ui/Button';
// import Link from 'next/link';

// type TimeType = {
//     startDate: string;
//     startTime?: string;
//     endDate?: string;
//     endTime?: string;
// };

// function formatTimeRange(startTime?: string, endTime?: string) {
//     if (startTime && endTime) return `ساعت ${startTime} تا ${endTime}`;
//     if (startTime) return `ساعت ${startTime}`;
//     return '';
// }

// function formatDate(date: string) {
//     return moment(date, 'YYYY-MM-DD').locale('fa').format('jD jMMMM jYYYY');
// }

// function getFormattedTime(time: TimeType) {
//     const { startDate, startTime, endDate, endTime } = time;

//     const startDateFormatted = formatDate(startDate);
//     const endDateFormatted = endDate ? formatDate(endDate) : null;

//     if (!endDateFormatted || startDate === endDate) {
//         // یک روزه یا بدون endDate
//         const timeRange = formatTimeRange(startTime, endTime);
//         return timeRange ? `${startDateFormatted}\n${timeRange}` : startDateFormatted;
//     }

//     // چند روزه با یا بدون ساعت متفاوت
//     if (startTime || endTime) {
//         const startPart = `${startDateFormatted}${startTime ? ' ساعت ' + startTime : ''}`;
//         const endPart = `${endDateFormatted}${endTime ? ' ساعت ' + endTime : ''}`;
//         return `${startPart}\n--------\n${endPart}`;
//     }

//     // چند روزه بدون ساعت
//     return `${startDateFormatted}\n--------\n${endDateFormatted}`;
// }

// export default function EventCardV2({
//     image,
//     description,
//     title,
//     index,
//     date,
//     id,
//     location,
//     onClick
// }: {
//     id: any;
//     image: string;
//     title: string;
//     description: string;
//     index: any;
//     date: any;
//     location: string;
//     onClick?: any
// }) {
//     return (
//         <div
//             key={id}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
//             style={{ animationDelay: `${index * 0.1}s` }}
//         >
//             <div className="md:flex">
//                 <div className="md:w-1/3">
//                     <div className="relative h-48 md:h-full">
//                         {/* <Image
//                             src={event.image}
//                             alt={event.title}
//                             fill
//                             className="object-cover"
//                         /> */}
//                         <img
//                             // className="object-cover"
//                             className=" w-full h-[200px] sm:h-[210px]"
//                             src={'/images/pexels.jpg'}
//                         />
//                     </div>
//                 </div>
//                 <div className="md:w-2/3 p-6">
//                     <div className="flex items-center space-x-2 space-x-reverse mb-2">
//                         <Calendar className="w-4 h-4 text-blue-600" />
//                         <span className="text-sm text-gray-600">
//                             {new Date(date).toLocaleDateString('fa-IR')}
//                         </span>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">
//                         {title}
//                     </h3>
//                     <p className="text-gray-600 mb-4 line-clamp-2">
//                         {description}
//                     </p>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2 space-x-reverse">
//                             <MapPin className="w-4 h-4 text-gray-400" />
//                             <span className="text-sm text-gray-600">
//                                 {location}
//                             </span>
//                         </div>
//                         <Button size="sm" onClick={onClick}>
//                             {!onClick && <Link href={`/events?id=${id}`}>
//                                 جزئیات
//                             </Link>}
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import moment from 'jalali-moment';
import { Calendar, MapPin } from "lucide-react";
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type TimeRange = {
  startDate: string;
  endDate?: string;
  timeStart?: string;
  timeEnd?: string;
};

function formatTimeRange(range: TimeRange) {
  const { startDate, endDate, timeStart, timeEnd } = range;
  const startDateFormatted = moment(startDate, 'YYYY-MM-DD').locale('fa').format('jD jMMMM jYYYY');
  const endDateFormatted = endDate ? moment(endDate, 'YYYY-MM-DD').locale('fa').format('jD jMMMM jYYYY') : null;

  let datePart = startDateFormatted;
  if (endDateFormatted && endDate !== startDate) {
    datePart = `${startDateFormatted} - ${endDateFormatted}`;
  }

  let timePart = '';
  if (timeStart && timeEnd) timePart = ` | ساعت ${timeStart} تا ${timeEnd}`;
  else if (timeStart) timePart = ` | ساعت ${timeStart}`;

  return `${datePart}${timePart}`;
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
  locale = "fa",
}: {
  id: string;
  image: string;
  title: Record<string, string>;
  description: Record<string, string>;
  location: Record<string, string>;
  timeRanges: TimeRange[];
  index: number;
  onClick?: () => void;
  locale?: "fa" | "en" | "ar" | "zh";
}) {
  const firstTime = timeRanges?.[0] || null;
  const formattedTime = firstTime ? formatTimeRange(firstTime) : "بدون زمان مشخص";

  return (
    <div
      key={id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Image Section */}
        <div className="relative w-full h-56"> {/* 👈 ارتفاع ثابت */}
          <img
            className="w-full h-full object-cover"
            src={process.env.NEXT_PUBLIC_API_URL + image}
            alt={title[locale] || ""}
          />
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 flex flex-col justify-between p-4 md:p-6">
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{formattedTime}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
              {title[locale]}
            </h3>

            <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
              {description[locale]}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="truncate max-w-[150px] sm:max-w-[200px]">{location[locale]}</span>
            </div>
            <Button size="sm" className="whitespace-nowrap">
              {onClick ? (
                <span onClick={onClick}>جزئیات</span>
              ) : (
                <Link href={`/events?id=${id}`}>جزئیات</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
