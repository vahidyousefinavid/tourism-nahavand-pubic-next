import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import EventCard from '@/src/components/Cards/Event';

const cardItems = [
    {
        title: 'گردشگری در دل طبیعت',
        address: "نهاوند، خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        time: {
            startDate: '2025-08-12',
        },
    },
    {
        title: 'تور چند روزه',
        address: "تهران، خیابان ولیعصر",
        image: '/images/back2.jpg',
        time: {
            startDate: '2025-08-27',
            endDate: '2025-08-30',
        },
    },
    {
        title: 'کارگاه آموزشی',
        address: "اصفهان، خیابان چهارباغ",
        image: '/images/pexels.jpg',
        time: {
            startDate: '2025-08-27',
            startTime: '15:00',
            endTime: '18:00',
        },
    },
    {
        title: 'فستیوال تابستانه',
        address: "شیراز، باغ دلگشا",
        image: '/images/back2.jpg',
        time: {
            startDate: '2025-08-27',
            startTime: '15:00',
            endDate: '2025-08-30',
            endTime: '18:00',
        },
    },
    {
        title: 'گردش تاریخی',
        address: "تبریز، میدان ساعت",
        image: '/images/back2.jpg',
        time: {
            startDate: '2025-09-10',
            startTime: '10:00',
            endDate: '2025-09-12',
        },
    },
];

export default function EventSwiper() {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                navigation
                centeredSlides={true}
                centeredSlidesBounds={true}
                slidesPerView="auto"
                spaceBetween={35}
                className="!py-8"
                breakpoints={{
                    640: {
                        slidesOffsetBefore: 80
                    }
                }}
            >
                {cardItems.map((card, idx) => (
                    <SwiperSlide
                        key={idx}
                        className="!w-[260px] sm:!w-[390px] flex justify-center"
                    >
                        <EventCard
                            time={card.time}
                            image={card.image}
                            address={card.address}
                            title={card.title}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
