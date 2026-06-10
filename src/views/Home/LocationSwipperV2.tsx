"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import axios from "axios";
import VisitCardV2 from "@/components/Cards/VisitV2";
import { Modal } from "@/components/ui/Modal";
import { LocationModalContent } from "../Locations/LocationModalContent";
import { useTranslation } from "react-i18next";
import { AppLocale } from "@/types";
import { motion } from "framer-motion";

export default function LocationSwipperV2() {
  const { t, i18n } = useTranslation();
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  useEffect(() => {
    axios.get("/api/locations/top/views").then((res) => {
      setLocations(res.data);
    }).catch(() => {});
  }, []);

  const openInMaps = (coordinates: [number, number]) => {
    const [lat, lng] = coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  const isRTL = i18n.language === "fa" || i18n.language === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-12 sm:pt-16 pb-0 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-3"
            >
              <MapPin className="w-3.5 h-3.5" />
              جاذبه‌های گردشگری
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900"
            >
              {t("locations.title", "مکان‌های برجسته")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-gray-500 text-sm mt-1"
            >
              {t("locations.subtitle", "زیباترین و مهم‌ترین جاذبه‌های گردشگری نهاوند")}
            </motion.p>
          </div>
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm border border-emerald-200 hover:border-emerald-400 px-5 py-2.5 rounded-full transition-all hover:bg-emerald-50 whitespace-nowrap self-start sm:self-auto"
          >
            {t("locations.viewAll", "مشاهده همه")}
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
          {locations.map((location, index) => (
            <SwiperSlide
              key={location.id}
              className="!w-[220px] sm:!w-[240px]"
            >
              <VisitCardV2
                location={location}
                index={index}
                locale={i18n.language as AppLocale}
                onClick={() => {
                  setSelectedLocation(location);
                  fetch(`/api/locations/${location.id}/view`, { method: 'POST' }).catch(() => {});
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Wave → bg-white (EventSwipperV2) */}

      {/* Modal */}
      <Modal
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        title={selectedLocation?.name?.[i18n.language] || selectedLocation?.name?.fa}
      >
        {selectedLocation && (
          <LocationModalContent
            location={selectedLocation}
            openInMaps={openInMaps}
            locale={i18n.language as AppLocale}
          />
        )}
      </Modal>
    </section>
  );
}
