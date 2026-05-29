// ./InfoRow.tsx (یا مسیر مشابه)
import React from 'react';

type InfoRowProps = {
  icon: React.ReactNode;
  text: string;
  isRTL: boolean; // دریافت وضعیت راست‌چین/چپ‌چین
};

export default function InfoRow({ icon, text, isRTL }: InfoRowProps) {
  return (
    <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      <span className={`ml-2 ${isRTL ? 'ml-0 mr-2' : 'mr-2 ml-0'}`}> {/* تنظیم فاصله برای آیکون */}
        {icon}
      </span>
      <span className="text-gray-600 break-words"> {/* break-words برای جلوگیری از بیرون زدن متن */}
        {text}
      </span>
    </div>
  );
}
