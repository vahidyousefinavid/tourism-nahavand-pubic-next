"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import EventCardV2 from "@/components/Cards/EventV2";
import { Modal } from "@/components/ui/Modal";
import EventModalContent from "../Events/EventModalContent";

export default function EventSwipperV2() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`/api/events/top/views`); // 👈 این API باید رویدادهای آینده رو بده
        setEvents(res.data);
      } catch (error) {
        console.error("خطا در دریافت رویدادها:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            رویدادهای پیش رو
          </h2>
          <p className="text-lg text-gray-600">
            برنامه‌های فرهنگی و تفریحی نهاوند
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation
          centeredSlides
          centeredSlidesBounds
          slidesPerView="auto"
          spaceBetween={35}
          className="!py-8"
        >
          {events.map((event, index) => (
            <SwiperSlide
              key={event.id}
              className="!w-[260px] sm:!w-[550px] flex justify-center"
            >
              <EventCardV2
                id={event.id}
                image={event.image}
                title={event.title}
                description={event.description}
                location={event.location}
                timeRanges={event.timeRanges}
                index={index}
                onClick={() => setSelectedEvent(event)}
                locale="fa"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        <div className="text-center mt-12 flex justify-center">
          <Link
            href="/events"
            className="flex items-center space-x-2 space-x-reverse text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
          >
            <Button
              size="lg"
              variant="outline"
              className="group gap-2 hover:border-gray-700 transition-colors duration-300 cursor-pointer"
            >
              <span>مشاهده همه رویدادها</span>
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Modal */}
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent?.title?.fa}
        >
          {selectedEvent && (
            <EventModalContent event={selectedEvent} />
          )}
        </Modal>
      </div>
    </section>
  );
}
