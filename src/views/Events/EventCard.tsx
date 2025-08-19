import React from 'react';
import Image from 'next/image';
import { Users, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import InfoRow from './InfoRow';
import { Event } from '@/types';

type EventCardProps = {
  event: Event;
  onClick: (event: Event) => void;
};

export default function EventCard({ event, onClick }: EventCardProps) {
  const getAvailableSpots = () => event.capacity - event.registered;

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer card-hover"
      onClick={() => onClick(event)}
    >
      <div className="relative h-48">
        <Image src={event.image} alt={event.title} fill className="object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700 text-sm font-medium">
          {{
            festival: 'جشنواره',
            cultural: 'فرهنگی',
            sports: 'ورزشی',
            religious: 'مذهبی',
          }[event.category]}
        </div>
        {getAvailableSpots() < 10 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {getAvailableSpots()} جای باقی‌مانده
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4 text-gray-600 text-sm">
          <InfoRow icon={<Calendar className="w-4 h-4" />} text={`${formatDate(event.date)} - ${event.time}`} />
          <InfoRow icon={<MapPin className="w-4 h-4" />} text={event.location} />
          <InfoRow icon={<DollarSign className="w-4 h-4" />} text={event.price} />
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

// چون تابع formatDate در EventCard استفاده شده، اگر در فایل دیگری تعریف شده، باید ایمپورت شود.
// اگر نه، می توانید این تابع را به صورت زیر به این فایل اضافه کنید:

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
