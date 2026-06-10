"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import axios from "axios";
import EventCardV2 from "@/components/Cards/EventV2";
import { Modal } from "@/components/ui/Modal";
import EventModalContent from "../Events/EventModalContent";
import { useTranslation } from "react-i18next";
import { AppLocale } from "@/types";
import { motion } from "framer-motion";

export default function EventSwipperV2() {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    axios.get("/api/events/top/views").then((res) => {
      setEvents(res.data);
    }).catch(() => {});
  }, []);

  const isRTL = i18n.dir() === "rtl";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-12 sm:pt-16 pb-0 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-3"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              تقویم رویدادها
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900"
            >
              {t("events.title", "رویدادهای پیش رو")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-gray-500 text-sm mt-1"
            >
              {t("events.subtitle", "برنامه‌های فرهنگی و تفریحی نهاوند")}
            </motion.p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm border border-purple-200 hover:border-purple-400 px-5 py-2.5 rounded-full transition-all hover:bg-purple-50 whitespace-nowrap self-start sm:self-auto"
          >
            {t("events.viewAll", "مشاهده همه")}
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation
          centeredSlides
          centeredSlidesBounds
          slidesPerView="auto"
          spaceBetween={16}
          className="!py-4 !-mx-1 !px-1"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {events.map((event, index) => (
            <SwiperSlide
              key={event.id}
              className="!w-[220px] sm:!w-[240px]"
            >
              <EventCardV2
                id={event.id}
                image={event.image}
                title={event.title}
                description={event.description}
                location={event.location}
                timeRanges={event.timeRanges}
                index={index}
                onClick={() => {
                  setSelectedEvent(event);
                  fetch(`/api/events/${event.id}/view`, { method: 'POST' }).catch(() => {});
                }}
                locale={i18n.language as AppLocale}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title?.[i18n.language as AppLocale] || selectedEvent?.title?.fa}
      >
        {selectedEvent && (
          <EventModalContent event={selectedEvent} locale={i18n.language as AppLocale} />
        )}
      </Modal>
    </section>
  );
}
