"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import VisitCardV2 from "@/components/Cards/VisitV2";
import { Modal } from "@/components/ui/Modal";
import { LocationModalContent } from "../Locations/LocationModalContent";
import { useTranslation } from "react-i18next";
import { AppLocale } from "@/types";

export default function LocationSwipperV2() {
    const { t, i18n } = useTranslation();
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

    useEffect(() => {
        const fetchTopLocations = async () => {
            try {
                const res = await axios.get(`/api/locations/top/views`);
                setLocations(res.data);
            } catch (error) {
                console.error("Error fetching top locations:", error);
            }
        };
        fetchTopLocations();
    }, []);

    const openInMaps = (coordinates: [number, number]) => {
        const [lat, lng] = coordinates;
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    };

    // تابع کمکی برای تشخیص جهت صفحه
    const isRTL = i18n.language === 'fa' || i18n.language === 'ar';
    const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="mx-auto">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('locations.title', 'مکان‌های برجسته')}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t('locations.subtitle', 'زیباترین و مهم‌ترین جاذبه‌های گردشگری نهاوند')}
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
                    dir={isRTL ? 'rtl' : 'ltr'} // تنظیم جهت اسلایدر
                >
                    {locations.map((location, index) => (
                        <SwiperSlide
                            key={location.id}
                            className="!w-[260px] sm:!w-[390px] flex justify-center"
                        >
                            <VisitCardV2
                                location={location}
                                index={index}
                                locale={i18n.language as AppLocale}
                                onClick={() => setSelectedLocation(location)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* View All Button */}
                <div className="text-center mt-12 flex justify-center">
                    <Link
                        href="/locations"
                        className="flex items-center space-x-2 space-x-reverse text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
                    >
                        <Button
                            size="lg"
                            variant="outline"
                            className="group gap-2 hover:border-gray-700 transition-colors duration-300 cursor-pointer"
                        >
                            <span>{t('locations.viewAll', 'مشاهده همه مکان‌ها')}</span>
                            <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                        </Button>
                    </Link>
                </div>

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
            </div>
        </section>
    );
}