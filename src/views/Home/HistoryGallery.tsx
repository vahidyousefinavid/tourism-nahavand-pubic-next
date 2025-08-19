'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Navigation, Autoplay } from 'swiper/modules'; // 👈 اضافه شد
import 'swiper/css';
import 'swiper/css/navigation';

const gallery = [
    {
        src: '/images/back1.png',
        caption: 'چشمه‌های طبیعی نهاوند',
    },
    {
        src: '/images/back2.jpg',
        caption: 'سراب گیان در بهار',
    },
    {
        src: '/images/back3.jpg',
        caption: 'باغ‌های نهاوند',
    },
    {
        src: '/images/back4.jpg',
        caption: 'مناطق باستانی شهر',
    },
];

export default function HistoryGallery() {
    return (
        <section className="w-full bg-blue-600 mx-auto py-10 px-4">
            <Swiper
                modules={[Navigation,Autoplay]}
                navigation
                centeredSlides={true}
                centeredSlidesBounds={true}
                slidesPerView={1}
                spaceBetween={35}
                autoplay={{
                    delay: 5000,      
                    disableOnInteraction: false, 
                }}
                speed={2000}

            >
                {gallery.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col items-center text-center relative">
                            <div className="w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
                                <Image
                                    src={item.src}
                                    alt={item.caption}
                                    layout="responsive"
                                    width={800}
                                    height={450}
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                            <div className="absolute bottom-6 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md">
                                <p className="text-white text-lg font-medium">{item.caption}</p>
                                <hr className="mt-1 border-white/50" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
