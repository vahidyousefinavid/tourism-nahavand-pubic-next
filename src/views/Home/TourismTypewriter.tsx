"use client"

import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TourismTypewriter = () => {
  const phrases = [
    'نهاوند، شهر چشمه‌های جوشان',
    'سفر به آرامش در دل طبیعت نهاوند',
    'آبشارهای خروشان و دشت‌های سرسبز',
    'کوه‌های باشکوه، تاریخ کهن',
    'مقصدی بکر برای عاشقان طبیعت',
    'نهاوند، نگین سبز غرب ایران',
  ];

  return (
    <div
      className="text-[18px] sm:text-[20px] md:text-[26px] font-bold text-black text-center rtl font-vazirmatn px-4 py-2 sm:px-4 sm:py-3 max-w-[650px] w-full mx-auto my-10 rounded-[20px] shadow-lg  select-none tracking-wide cursor-pointer transition-transform duration-300 hover:scale-105"
      aria-label="جملات گردشگری نهاوند"
    >
      <Typewriter
        words={phrases}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={2200}
      />
    </div>
  );
};

export default TourismTypewriter;
