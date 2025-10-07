"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import VisitCardV2 from "@/components/Cards/VisitV2";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { Modal } from "@/components/ui/Modal";
import { LocationModalContent } from "../Locations/LocationModalContent";

export default function LocationSwipperV2() {
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

    useEffect(() => {
        const fetchTopLocations = async () => {
            try {
                const res = await axios.get(`/api/locations/top/views`);
                setLocations(res.data);
            } catch (error) {
                console.error("خطا در دریافت مکان‌های پر بازدید:", error);
            }
        };

        fetchTopLocations();
    }, []);

    const openInMaps = (coordinates: [number, number]) => {
        const [lat, lng] = coordinates;
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    };

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="mx-auto">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        مکان‌های برجسته
                    </h2>
                    <p className="text-lg text-gray-600">
                        زیباترین و مهم‌ترین جاذبه‌های گردشگری نهاوند
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
                    {locations.map((location, index) => (
                        <SwiperSlide
                            key={location.id}
                            className="!w-[260px] sm:!w-[390px] flex justify-center"
                        >
                            <VisitCardV2
                                location={location}
                                index={index}
                                onClick={() => setSelectedLocation(location)} // 👈 مودال باز میشه
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
                            <span>مشاهده همه مکان‌ها</span>
                            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Modal */}
                <Modal
                    isOpen={!!selectedLocation}
                    onClose={() => setSelectedLocation(null)}
                    title={selectedLocation?.name?.fa}
                >
                    {selectedLocation && (
                        <LocationModalContent
                            location={selectedLocation}
                            openInMaps={openInMaps}
                        />
                    )}
                </Modal>
            </div>
        </section>
    );
}
