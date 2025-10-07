import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VisitCardV2({ location, index, onClick }: { location: any, index: any, onClick?: () => void }) {
    return (
        <div
            key={location.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="relative w-full h-[220px] sm:h-[310px]">
                {/* <Image
                    src={location.images[0]}
                    alt={location.name}
                    fill
                    className="object-cover"
                /> */}
                <img
                    // className="object-cover"
                    className=" w-full h-[220px] sm:h-[310px]"
                    src={process.env.NEXT_PUBLIC_API_URL + location?.images[location?.mainImageIndex || 0]}
                />
                <div className="absolute z- top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                        {location.category === 'historical' && 'تاریخی'}
                        {location.category === 'natural' && 'طبیعی'}
                        {location.category === 'cultural' && 'فرهنگی'}
                        {location.category === 'religious' && 'مذهبی'}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {location.name['fa']}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {location.description['fa']}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 space-x-reverse flex-wrap gap-2">
                        {/* <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                            {location.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                            ({location.reviews} نظر)
                        </span> */}
                    </div>
                    <Button size="sm" onClick={onClick}>
                        {/* <Link  className="text-nowrap"> */}
                            مشاهده جزئیات
                        {/* </Link> */}
                    </Button>
                </div>
            </div>
        </div>
    )
}