import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, DollarSign, Users, User } from 'lucide-react';
import InfoRow from './InfoRow';
import { Button } from '@/components/ui/Button';
import { Event } from '@/types';

type EventModalContentProps = {
  event: Event;
  onClose: () => void;
};

export default function EventModalContent({ event }: EventModalContentProps) {
  const getAvailableSpots = () => event.capacity - event.registered;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="space-y-6 w-full sm:w-[450px]">
      <div className="relative h-64 rounded-lg overflow-hidden w-full">
        <Image src={event.image} alt={event.title} fill className="object-cover" />
      </div>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">توضیحات رویداد</h3>
        <p className="text-gray-600 leading-relaxed">{event.description}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">جزئیات رویداد</h3>
          <InfoRow icon={<Calendar className="w-5 h-5 text-blue-600" />} text={`${formatDate(event.date)} - ${event.time}`} />
          <InfoRow icon={<MapPin className="w-5 h-5 text-blue-600" />} text={event.location} />
          <InfoRow icon={<DollarSign className="w-5 h-5 text-blue-600" />} text={event.price} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">اطلاعات ثبت‌نام</h3>
          <InfoRow icon={<Users className="w-5 h-5 text-blue-600" />} text={`ظرفیت: ${event.capacity} نفر`} />
          <InfoRow icon={<User className="w-5 h-5 text-blue-600" />} text={`ثبت‌نام شده: ${event.registered} نفر`} />
          <InfoRow icon={<Users className="w-5 h-5 text-blue-600" />} text={`جای باقی‌مانده: ${getAvailableSpots()} نفر`} />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">برگزارکننده</h3>
        <p className="text-gray-600">{event.organizer}</p>
      </section>

      <section className="border-t pt-6">
        {getAvailableSpots() > 0 ? (
          <Button size="lg" className="w-full">
            ثبت‌نام در رویداد
          </Button>
        ) : (
          <Button size="lg" variant="secondary" className="w-full" disabled>
            ظرفیت تکمیل شده
          </Button>
        )}
      </section>
    </div>
  );
}
