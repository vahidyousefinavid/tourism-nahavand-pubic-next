'use client';
import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';

/**
 * ریل کارت‌ها.
 *
 * تا سه کارت گرید معمولی رندر می‌شود و از چهار به بالا اسلایدر.
 * دلیلش: Swiper با centeredSlidesBounds وقتی فقط یک کارت هست آن را به لبه می‌چسباند
 * و بقیهٔ عرض صفحه خالی می‌ماند — همان حفرهٔ بزرگی که در صفحهٔ قبلی دیده می‌شد.
 */
export default function CardRail<T>({
  items,
  renderItem,
  getKey,
  empty,
  more,
  moreSpan = 'lg:col-span-2',
  slideWidth = '!w-[260px] sm:!w-[290px]',
  gridCols = 'sm:grid-cols-2 lg:grid-cols-3',
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string | number;
  empty?: { title: string; body: string; href?: string; linkLabel?: string };
  /** کاشی «ادامه» که وقتی کارت‌ها کم‌اند جای خالی ردیف را پر می‌کند */
  more?: { href: string; label: string; note?: string };
  /** وقتی فقط یک کارت هست، کاشی «ادامه» بقیهٔ ردیف را می‌گیرد تا ستون خالی نماند */
  moreSpan?: string;
  slideWidth?: string;
  gridCols?: string;
}) {
  const { isRTL } = useDirection();

  if (items.length === 0) {
    if (!empty) return null;
    return (
      <div className="rounded-2xl border border-dashed border-[var(--nh-line)] bg-white/60 px-6 py-12 sm:py-16 text-center">
        <p className="font-display text-[var(--nh-ink)] text-lg sm:text-xl mb-2">{empty.title}</p>
        <p className="text-[var(--nh-ink)]/55 text-sm leading-[1.9] max-w-[46ch] mx-auto">
          {empty.body}
        </p>
        {empty.href && empty.linkLabel && (
          <Link
            href={empty.href}
            className="inline-flex mt-5 items-center gap-2 bg-[var(--nh-spring)] hover:bg-[var(--nh-spring-dk)] text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
          >
            {empty.linkLabel}
          </Link>
        )}
      </div>
    );
  }

  if (items.length <= 3) {
    /* با یک یا دو کارت، بقیهٔ ردیف خالی می‌ماند و صفحه شکسته به نظر می‌رسد.
       به‌جای گذاشتن حفره، یک کاشی «ادامه» می‌گذاریم که کاربر را جلو می‌برد. */
    return (
      <div className={`grid grid-cols-1 ${gridCols} gap-4 sm:gap-5`}>
        {items.map((item, i) => (
          <div key={getKey(item, i)}>{renderItem(item, i)}</div>
        ))}
        {more && items.length < 3 && (
          <Link
            href={more.href}
            className={`group flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-[var(--nh-line)] bg-white/50 hover:bg-white hover:border-[var(--nh-spring)]/40 transition-colors min-h-[190px] p-6 ${
              items.length === 1 ? moreSpan : ''
            }`}
          >
            <span className="w-11 h-11 rounded-full bg-[var(--nh-spring)]/10 text-[var(--nh-spring)] flex items-center justify-center mb-3 text-xl leading-none transition-colors group-hover:bg-[var(--nh-spring)] group-hover:text-white">
              +
            </span>
            <span className="font-bold text-[var(--nh-ink)] text-sm">{more.label}</span>
            {more.note && (
              <span className="text-[var(--nh-ink)]/45 text-[0.78rem] mt-1.5 leading-snug max-w-[24ch]">
                {more.note}
              </span>
            )}
          </Link>
        )}
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView="auto"
      spaceBetween={20}
      className="!py-2 !-mx-1 !px-1"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {items.map((item, i) => (
        <SwiperSlide key={getKey(item, i)} className={slideWidth}>
          {renderItem(item, i)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
