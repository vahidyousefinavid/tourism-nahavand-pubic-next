import React from 'react';
import moment from 'jalali-moment';
import { Calendar, MapPin, MapPinCheckInside } from "lucide-react";
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type TimeType = {
    startDate: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
};

function formatTimeRange(startTime?: string, endTime?: string) {
    if (startTime && endTime) return `ساعت ${startTime} تا ${endTime}`;
    if (startTime) return `ساعت ${startTime}`;
    return '';
}

function formatDate(date: string) {
    return moment(date, 'YYYY-MM-DD').locale('fa').format('jD jMMMM jYYYY');
}

function getFormattedTime(time: TimeType) {
    const { startDate, startTime, endDate, endTime } = time;

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = endDate ? formatDate(endDate) : null;

    if (!endDateFormatted || startDate === endDate) {
        // یک روزه یا بدون endDate
        const timeRange = formatTimeRange(startTime, endTime);
        return timeRange ? `${startDateFormatted}\n${timeRange}` : startDateFormatted;
    }

    // چند روزه با یا بدون ساعت متفاوت
    if (startTime || endTime) {
        const startPart = `${startDateFormatted}${startTime ? ' ساعت ' + startTime : ''}`;
        const endPart = `${endDateFormatted}${endTime ? ' ساعت ' + endTime : ''}`;
        return `${startPart}\n--------\n${endPart}`;
    }

    // چند روزه بدون ساعت
    return `${startDateFormatted}\n--------\n${endDateFormatted}`;
}

export default function EventCardV2({
    image,
    description,
    title,
    index,
    date,
    id,
    location
}: {
    id: any;
    image: string;
    title: string;
    description: string;
    index: any;
    date: any;
    location: string
}) {
    return (
        <div
            key={id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="md:flex">
                <div className="md:w-1/3">
                    <div className="relative h-48 md:h-full">
                        {/* <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                        /> */}
                        <img
                            // className="object-cover"
                            className=" w-full h-[200px] sm:h-[210px]"
                            src={'/images/pexels.jpg'}
                        />
                    </div>
                </div>
                <div className="md:w-2/3 p-6">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                            {new Date(date).toLocaleDateString('fa-IR')}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                                {location}
                            </span>
                        </div>
                        <Button size="sm">
                            <Link href={`/events?id=${id}`}>
                                جزئیات
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
