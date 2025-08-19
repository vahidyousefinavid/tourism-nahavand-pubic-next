import React from 'react';
import moment from 'jalali-moment';
import { MapPinCheckInside } from "lucide-react";

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

export default function EventCard({
    image,
    address,
    title,
    time,
}: {
    image: string;
    address: string;
    title: string;
    time: TimeType;
}) {
    return (
        <div className="relative flex text-black flex-col rounded-[18px] w-[260px] sm:w-[390px] bg-white shadow-lg sm:shadow-none gap-[10px] overflow-hidden">
            <div className="relative flex text-black flex-col w-[260px] sm:w-[390px] shadow-lg sm:shadow-none gap-[10px] overflow-hidden">
                <img
                    className="rounded-t-[18px] sm:rounded-[18px] sm:shadow-lg w-full h-[260px] sm:h-[390px] object-cover"
                    src={image}
                    alt={title}
                />
                <div className="absolute bottom-2 z-10 w-[100%] rounded-lg overflow-hidden">
                    <div className="bg-[#17171782] bg-opacity-30 px-4 py-2 text-white text-base font-semibold whitespace-pre-line">
                        {getFormattedTime(time)}
                    </div>
                </div>

                {/* ادامه کارت... */}
            </div>
            <div className="flex gap-1 text-black text-[14px] items-center mt-[8px] px-[10px]">
                <MapPinCheckInside color="black" width={18} />
                <span>{address}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between px-6 pb-4 pt-2 items-center">
                <div className="sm:pr-5 font-bold text-lg">{title}</div>
                <button className="bg-[#304C89] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1f355a] transition">
                    بیشتر
                </button>
            </div>
        </div>
    );
}
