"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import VisitCardV2 from '@/components/Cards/VisitV2';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { locations } from '@/data/location';
import EventCardV2 from '@/components/Cards/EventV2';
import { events } from '@/data/events';

export default function EventSwipperV2() {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className=" mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        رویدادهای پیش رو
                    </h2>
                    <p className="text-lg text-gray-600">
                        برنامه‌های فرهنگی و تفریحی نهاوند
                    </p>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
                <Swiper
                    modules={[Navigation]}
                    navigation
                    centeredSlides={true}
                    centeredSlidesBounds={true}
                    slidesPerView="auto"
                    spaceBetween={35}
                    className="!py-8"
                    breakpoints={{
                        // 640: {
                        //     slidesOffsetBefore: 80
                        // }
                    }}
                >
                    {events.map((event, index) => (
                        <SwiperSlide
                            key={index}
                            className="!w-[260px] sm:!w-[550px] flex justify-center"
                        >
                            <EventCardV2
                                key={index}
                                date={event?.date}
                                description={event.description}
                                location={event.location}
                                id={event.id}
                                image={event.image}
                                title={event.title}
                                index={index}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* </div> */}

                <div className="text-center mt-12 flex justify-center">
                    <Link
                        href="/events"
                        className="flex items-center  !cursor-[pointer] space-x-2 space-x-reverse text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
                    >
                        <Button
                            size="lg"
                            variant="outline"
                            className="group gap-2 hover:border-gray-700 transition-colors duration-300 cursor-pointer"
                        >

                            <span>مشاهده همه رویدادها</span>
                            <ArrowLeft
                                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                            />

                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}