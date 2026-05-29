import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { AppLocale } from "@/types";

export default function VisitCardV2({ 
    location, 
    index, 
    onClick, 
    locale = "fa" 
}: { 
    location: any, 
    index: any, 
    onClick?: () => void,
    locale?: AppLocale 
}) {
    const { t } = useTranslation();

    // دریافت نام و توضیحات بر اساس زبان، با فال‌بک (Fallback) به فارسی
    const name = location.name?.[locale] || location.name?.fa || '';
    const description = location.description?.[locale] || location.description?.fa || '';

    // تابع کمکی برای ترجمه دسته‌بندی (Category)
    const getCategoryLabel = (cat: string) => {
        const key = `categories.${cat}`;
        const translation = t(key);
        // اگر ترجمه‌ای پیدا نشد، همان مقدار اصلی را برگردان
        return translation !== key ? translation : cat;
    };

    return (
        <div
            key={location.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="relative w-full h-[220px] sm:h-[310px]">
                <img
                    className="w-full h-[220px] sm:h-[310px] object-cover"
                    src={process.env.NEXT_PUBLIC_API_URL + location?.images[location?.mainImageIndex || 0]}
                    alt={name}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                        {getCategoryLabel(location.category)}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 space-x-reverse flex-wrap gap-2">
                        {/* اگر خواستید امتیاز را نمایش دهید، اینجا فعال کنید */}
                        {/* <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                            {location.rating}
                        </span> */}
                    </div>
                    <Button size="sm" onClick={onClick}>
                        {t('visitCard.details', 'مشاهده جزئیات')}
                    </Button>
                </div>
            </div>
        </div>
    )
}