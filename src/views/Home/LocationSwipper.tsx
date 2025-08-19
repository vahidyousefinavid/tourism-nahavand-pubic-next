import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import VisitCard from '@/components/Cards/Visit';

const cardItems = [
    {
        title: 'گردشگری در دل طبیعت',
        description: 'تجربه‌ای ناب از کوه، چشمه و فرهنگ',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'بیشتر بدانید',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
    {
        title: 'برنامه‌ریزی سفر شما',
        description: 'با راهنمای کامل سفر به نهاوند',
        address: "نهاوند،خیابان شریعتی، خیابان کوچه",
        image: '/images/pexels.jpg',
        buttonText: 'شروع کن',
    },
];

export default function LocationSwipper() {
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
                        <VisitCard
                            image={card.image}
                            address={card.address}
                            title={card.title}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}