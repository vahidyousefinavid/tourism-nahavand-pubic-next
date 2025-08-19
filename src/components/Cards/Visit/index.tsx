import { Locate, LocateIcon, MapPinCheckInside } from "lucide-react";

export default function VisitCard({ image, address, title }: { image: string, address: string, title: string }) {
    return (
        <div className="flex text-black flex-col rounded-[18px] w-[260px] sm:w-[390px] bg-white shadow-lg sm:shadow-none gap-[10px]">
            <img
                className="rounded-t-[18px] sm:rounded-[18px] sm:shadow-lg w-full h-[260px] sm:h-[390px]"
                src={image}
            />
            <div className="flex gap-1 text-black text-[14px] items-center mt-[8px] px-[7px]">
                <MapPinCheckInside color="black" width={18} />
                {address}
            </div>

         <div className="flex flex-col sm:flex-row gap-4 justify-between px-6 pb-4 pt-2 items-center">
                <div className="sm:pr-5 font-bold text-lg">{title}</div>
                <button className="bg-[#304C89] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1f355a] transition">
                    بیشتر
                </button>
            </div>
        </div>
    )
}