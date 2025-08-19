'use client';

import Image from 'next/image';
import { Clock, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Location } from '@/types';

interface LocationCardProps {
  location: Location;
  index: number;
  onClick: () => void;
}

export function LocationCard({ location, index, onClick }: LocationCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-48">
        <Image
          src={location.images[0]}
          alt={location.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-700">
            {location.category === 'historical' && 'تاریخی'}
            {location.category === 'natural' && 'طبیعی'}
            {location.category === 'cultural' && 'فرهنگی'}
            {location.category === 'religious' && 'مذهبی'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{location.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 gap-2 space-x-reverse text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{location.openingHours}</span>
          </div>
          <div className="flex items-center space-x-2 gap-2 space-x-reverse text-sm text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>{location.entryFee}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 space-x-reverse">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{location.rating}</span>
            <span className="text-sm text-gray-500">({location.reviews} نظر)</span>
          </div>
          <Button size="sm">مشاهده جزئیات</Button>
        </div>
      </div>
    </div>
  );
}
