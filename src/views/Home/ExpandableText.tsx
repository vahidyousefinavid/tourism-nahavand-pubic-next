'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpandableText() {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setFullHeight(contentRef.current.scrollHeight);
    }
  }, []);

  const text = (
    <>
      در سرزمینی کهن، جایی میان دامنه‌های پرشکوه زاگرس، شهری آرمیده است که ریشه در تاریخ{' '}
      <span className="font-bold text-blue-700">ایران</span> دارد؛ نهاوند. این دیار، یکی از گهواره‌های تمدن ایرانی‌ست؛ جایی که از روزگاران مادها تا نبردهای سرنوشت‌ساز با اعراب، همواره بخشی از شناسنامه‌ی این خاک بوده است. نهاوند نه فقط یک شهر، بلکه یکی از فصل‌های کتاب تاریخ{' '}
      <span className="font-bold text-blue-700">ایران</span>‌زمین است. اما نهاوند فقط به تاریخش نمی‌نازد. چشمه‌های جوشان، رودخانه‌های زلال، دشت‌های همیشه‌سبز و آبشارهایی که با نغمه‌ی باد درآمیخته‌اند، چهره‌ای دیگر از این سرزمین را نمایان می‌کنند؛ چهره‌ای که روح را تازه می‌کند و قلب را آرام. هر نسیمی که در نهاوند می‌وزد، قصه‌ای از طبیعت می‌گوید و هر سنگی که زیر پا می‌گذاری، زمزمه‌ای از تاریخ دارد. اینجا،{' '}
      <span className="font-bold text-blue-700">ایران</span> را در خالص‌ترین و زنده‌ترین شکلش حس می‌کنی. اگر دلت برای وطن می‌تپد و می‌خواهی عظمت{' '}
      <span className="font-bold text-blue-700">ایران</span> را از نزدیک ببینی و با طبیعتش آشتی کنی، نهاوند منتظر توست. اینجا، جایی‌ست که عاشقانه‌تر از همیشه،{' '}
      <span className="font-bold text-blue-700">ایران</span> را زندگی خواهی کرد.
    </>
  );

  return (
    <div className="relative max-w-[1200px] px-6 py-4 text-black mx-auto text-justify">
      <AnimatePresence initial={false}>
        <motion.div
          key={expanded ? 'open' : 'closed'}
          initial={{ height: expanded ? 160 : 160 }}
          animate={{ height: expanded ? fullHeight : 160 }}
          exit={{ height: 160 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="overflow-hidden relative"
        >
          <div ref={contentRef} className="leading-relaxed text-[16px]">
            {text}
          </div>

          {!expanded && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </motion.div>
      </AnimatePresence>

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-4 text-blue-600 font-semibold hover:underline"
        >
          مشاهده بیشتر
        </button>
      )}
    </div>
  );
}
