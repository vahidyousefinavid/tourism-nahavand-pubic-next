'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDirection } from '@/hooks/useDirection';

/**
 * تیتر مشترک بخش‌ها.
 * ابرو + تیتر درشت + خط موئینی که تا لبهٔ کانتینر ادامه پیدا می‌کند،
 * و در صورت وجود، یک لینک «همه» در انتهای همان خط.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  tone?: 'light' | 'dark';
}) {
  const { isRTL } = useDirection();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const dark = tone === 'dark';

  return (
    <div className="mb-9 sm:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        {/* ابرو */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`h-px w-8 ${dark ? 'bg-[var(--nh-gold)]' : 'bg-[var(--nh-clay)]'}`} />
          <span
            className={`font-data text-[0.74rem] sm:text-[0.8rem] font-medium tracking-[0.13em] ${
              dark ? 'text-[var(--nh-gold)]' : 'text-[var(--nh-clay)]'
            }`}
          >
            {eyebrow}
          </span>
        </div>

        {/* تیتر + خط + لینک */}
        <div className="flex items-end gap-5 sm:gap-8">
          <h2
            className={`font-display leading-[1.15] shrink-0 ${
              dark ? 'text-white' : 'text-[var(--nh-ink)]'
            }`}
            style={{ fontSize: 'var(--nh-h2)' }}
          >
            {title}
          </h2>

          <div
            className={`flex-1 mb-3 h-px hidden sm:block ${
              dark ? 'bg-white/15' : 'bg-[var(--nh-line)]'
            }`}
          />

          {href && linkLabel && (
            <Link
              href={href}
              className={`hidden sm:inline-flex items-center gap-2 shrink-0 mb-1.5 text-sm font-bold transition-colors ${
                dark
                  ? 'text-white/70 hover:text-white'
                  : 'text-[var(--nh-spring)] hover:text-[var(--nh-spring-dk)]'
              }`}
            >
              {linkLabel}
              <Arrow className="w-4 h-4" />
            </Link>
          )}
        </div>

        {subtitle && (
          <p
            className={`mt-3 text-[0.95rem] sm:text-base leading-[1.9] max-w-[58ch] ${
              dark ? 'text-white/55' : 'text-[var(--nh-ink)]/60'
            }`}
          >
            {subtitle}
          </p>
        )}

        {/* در موبایل لینک زیر تیتر می‌آید */}
        {href && linkLabel && (
          <Link
            href={href}
            className={`sm:hidden inline-flex items-center gap-2 mt-4 text-sm font-bold ${
              dark ? 'text-white/70' : 'text-[var(--nh-spring)]'
            }`}
          >
            {linkLabel}
            <Arrow className="w-4 h-4" />
          </Link>
        )}
      </motion.div>
    </div>
  );
}
