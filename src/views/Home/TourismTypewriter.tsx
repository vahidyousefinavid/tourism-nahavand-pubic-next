"use client"
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const TourismTypewriter = () => {
  const { t, i18n } = useTranslation();

  // دریافت جملات از فایل ترجمه
  const phrases = t('typewriter.phrases', { returnObjects: true }) as string[];

  return (
    <div
      className={clsx(
        "text-[18px] sm:text-[20px] md:text-[26px] font-bold text-black text-center px-4 py-2 sm:px-4 sm:py-3 max-w-[650px] w-full mx-auto my-10 rounded-[20px] shadow-lg select-none tracking-wide cursor-pointer transition-transform duration-300 hover:scale-105",
        // تغییر فونت بر اساس زبان
        (i18n.language === 'fa' || i18n.language === 'ar') ? "font-vazirmatn" : "font-sans"
      )}
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