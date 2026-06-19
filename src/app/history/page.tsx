"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Crown, Scroll, Building, Star, Palette, Music,
  Utensils, Users, Users2, Sword, MapPin, Sparkles, ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

/* ─────────────── avatar with initials fallback ─────────────── */
function PersonAvatar({ src, name, gradient }: { src: string; name: string; gradient: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('');
  if (failed) {
    return (
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto ${gradient}`}>
        {initials}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} onError={() => setFailed(true)}
      className="w-20 h-20 rounded-2xl object-cover mx-auto" />
  );
}

/* ─────────────── section-label badge ─────────────── */
function SectionBadge({ num, label, color }: { num: string; label: string; color: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black ${color}`}>{num}</span>
      <span className="text-sm font-bold tracking-widest uppercase text-gray-400">{label}</span>
    </div>
  );
}

export default function HistoryPage() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  const [activeTab, setActiveTab] = useState<'history' | 'culture' | 'notable'>('history');
  const historySectionRef = useRef<HTMLElement>(null);
  const cultureSectionRef = useRef<HTMLElement>(null);
  const notableSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const map: { id: 'history' | 'culture' | 'notable'; ref: React.RefObject<HTMLElement | null> }[] = [
      { id: 'history', ref: historySectionRef },
      { id: 'culture', ref: cultureSectionRef },
      { id: 'notable', ref: notableSectionRef },
    ];
    const obs = map.map(({ id, ref }) => {
      const o = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) setActiveTab(id); },
        { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
      );
      if (ref.current) o.observe(ref.current);
      return o;
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* ── data ── */
  const timelinePeriods = [
    {
      period: t('historyPage.timeline.period1.title', 'دوران باستان'),
      years: t('historyPage.timeline.period1.years', '۵۵۰ ق.م – ۶۵۱ م'),
      icon: Crown, accent: '#7C3AED', bg: 'bg-violet-500',
      image: '/images/history/20.jpg',
      events: [
        t('historyPage.timeline.period1.event1', 'حکومت هخامنشیان و گنجنامه داریوش و خشایارشا'),
        t('historyPage.timeline.period1.event2', 'دوران اشکانیان و ساسانیان'),
        t('historyPage.timeline.period1.event3', 'نهاوند مرکز مهم ایران باستان'),
        t('historyPage.timeline.period1.event4', 'معرکه نهاوند — سال ۲۱ هجری'),
      ],
    },
    {
      period: t('historyPage.timeline.period2.title', 'دوران اسلامی اولیه'),
      years: t('historyPage.timeline.period2.years', '۶۵۱ – ۱۰۰۰ م'),
      icon: Scroll, accent: '#059669', bg: 'bg-emerald-500',
      image: '/images/history/islam.jpg',
      events: [
        t('historyPage.timeline.period2.event1', 'فتح نهاوند توسط مسلمانان'),
        t('historyPage.timeline.period2.event2', 'تبدیل به مرکز مهم اداری'),
        t('historyPage.timeline.period2.event3', 'رشد علم و فرهنگ اسلامی'),
        t('historyPage.timeline.period2.event4', 'ساخت مساجد و مدارس مهم'),
      ],
    },
    {
      period: t('historyPage.timeline.period3.title', 'سلجوقیان و مغول'),
      years: t('historyPage.timeline.period3.years', '۱۰۰۰ – ۱۵۰۰ م'),
      icon: Building, accent: '#2563EB', bg: 'bg-blue-500',
      image: '/images/history/mongolia.jpg',
      events: [
        t('historyPage.timeline.period3.event1', 'حکومت سلجوقیان و رشد معماری'),
        t('historyPage.timeline.period3.event2', 'حمله مغولان و تخریبات'),
        t('historyPage.timeline.period3.event3', 'بازسازی و احیای شهر'),
        t('historyPage.timeline.period3.event4', 'رشد صنایع دستی و تجارت'),
      ],
    },
    {
      period: t('historyPage.timeline.period4.title', 'صفویه تا قاجار'),
      years: t('historyPage.timeline.period4.years', '۱۵۰۰ – ۱۹۲۵ م'),
      icon: Star, accent: '#D97706', bg: 'bg-amber-500',
      image: '/images/history/safavid.jpg',
      events: [
        t('historyPage.timeline.period4.event1', 'رشد صنعت سفالگری در لالجین'),
        t('historyPage.timeline.period4.event2', 'ساخت بناهای مهم صفوی'),
        t('historyPage.timeline.period4.event3', 'توسعه کشاورزی و باغداری'),
        t('historyPage.timeline.period4.event4', 'تقویت هویت فرهنگی منطقه'),
      ],
    },
    {
      period: t('historyPage.timeline.period5.title', 'دوران معاصر'),
      years: t('historyPage.timeline.period5.years', '۱۹۲۵ – اکنون'),
      icon: Clock, accent: '#DC2626', bg: 'bg-rose-500',
      image: '/images/history/now.jpg',
      events: [
        t('historyPage.timeline.period5.event1', 'مدرنیزاسیون و توسعه شهری'),
        t('historyPage.timeline.period5.event2', 'حفظ و مرمت آثار تاریخی'),
        t('historyPage.timeline.period5.event3', 'رشد صنعت گردشگری'),
        t('historyPage.timeline.period5.event4', 'ثبت جهانی صنایع دستی لالجین'),
      ],
    },
  ];

  const historicalSites = [
    { name: t('historyPage.sites.site1.name', 'گنجنامه نهاوند'), period: t('historyPage.sites.site1.period', 'هخامنشی'), description: t('historyPage.sites.site1.description', 'کتیبه‌های سنگی داریوش و خشایارشا'), significance: t('historyPage.sites.site1.significance', 'یکی از مهم‌ترین آثار هخامنشی در ایران'), color: 'from-violet-500 to-purple-600', icon: MapPin },
    { name: t('historyPage.sites.site2.name', 'قلعه نهاوند'), period: t('historyPage.sites.site2.period', 'ساسانی – اسلامی'), description: t('historyPage.sites.site2.description', 'بقایای قلعه تاریخی شهر'), significance: t('historyPage.sites.site2.significance', 'شاهد معرکه مهم نهاوند'), color: 'from-rose-500 to-red-600', icon: Building },
    { name: t('historyPage.sites.site3.name', 'مسجد جامع نهاوند'), period: t('historyPage.sites.site3.period', 'اسلامی'), description: t('historyPage.sites.site3.description', 'یکی از قدیمی‌ترین مساجد منطقه'), significance: t('historyPage.sites.site3.significance', 'نمونه معماری اسلامی اولیه'), color: 'from-emerald-500 to-teal-600', icon: Sparkles },
    { name: t('historyPage.sites.site4.name', 'کارگاه‌های سفال لالجین'), period: t('historyPage.sites.site4.period', 'صفوی – معاصر'), description: t('historyPage.sites.site4.description', 'مرکز تولید سفال و سرامیک'), significance: t('historyPage.sites.site4.significance', 'میراث زنده صنایع دستی ایران'), color: 'from-amber-500 to-orange-600', icon: Star },
  ];

  const culturalAspects = [
    { icon: Palette, color: 'bg-violet-100 text-violet-600', accent: 'border-violet-400', title: t('culturePage.culturalAspects.handicrafts.title', 'صنایع دستی'), description: t('culturePage.culturalAspects.handicrafts.description', 'صنایع دستی نهاوند از شهرت جهانی برخوردار است'), image: '/images/culture/handicrafts.jpg', details: [t('culturePage.culturalAspects.handicrafts.details1', 'سفالگری لالجین'), t('culturePage.culturalAspects.handicrafts.details2', 'قالیبافی سنتی'), t('culturePage.culturalAspects.handicrafts.details3', 'منبت‌کاری و معرق'), t('culturePage.culturalAspects.handicrafts.details4', 'بافت‌های محلی')] },
    { icon: Music, color: 'bg-blue-100 text-blue-600', accent: 'border-blue-400', title: t('culturePage.culturalAspects.localMusic.title', 'موسیقی محلی'), description: t('culturePage.culturalAspects.localMusic.description', 'موسیقی سنتی و محلی بخش جدایی‌ناپذیر فرهنگ نهاوند'), image: '/images/culture/local-music.jpg', details: [t('culturePage.culturalAspects.localMusic.details1', 'سازهای سنتی محلی'), t('culturePage.culturalAspects.localMusic.details2', 'آواز و ترانه‌های بومی'), t('culturePage.culturalAspects.localMusic.details3', 'جشن‌های موسیقی سالانه'), t('culturePage.culturalAspects.localMusic.details4', 'انتقال سینه‌به‌سینه هنر موسیقی')] },
    { icon: Utensils, color: 'bg-amber-100 text-amber-600', accent: 'border-amber-400', title: t('culturePage.culturalAspects.traditionalFood.title', 'غذاهای سنتی'), description: t('culturePage.culturalAspects.traditionalFood.description', 'آشپزی نهاوند با طعم‌های بی‌نظیر و خاص'), image: '/images/culture/traditional-food.jpg', details: [t('culturePage.culturalAspects.traditionalFood.details1', 'آبگوشت و دیزی سنتی'), t('culturePage.culturalAspects.traditionalFood.details2', 'نان‌های محلی'), t('culturePage.culturalAspects.traditionalFood.details3', 'ترشیجات و مرباهای خانگی'), t('culturePage.culturalAspects.traditionalFood.details4', 'عسل کوهستانی')] },
    { icon: Users, color: 'bg-rose-100 text-rose-600', accent: 'border-rose-400', title: t('culturePage.culturalAspects.tradition.title', 'آداب و رسوم'), description: t('culturePage.culturalAspects.tradition.description', 'آداب و رسوم کهن در میان مردم نهاوند زنده است'), image: '/images/culture/tradition.jpg', details: [t('culturePage.culturalAspects.tradition.details1', 'مراسم نوروز و سیزده‌بدر'), t('culturePage.culturalAspects.tradition.details2', 'جشن‌های عروسی محلی'), t('culturePage.culturalAspects.tradition.details3', 'مراسم سوگواری سنتی'), t('culturePage.culturalAspects.tradition.details4', 'بازی‌های بومی و محلی')] },
  ];

  const festivals = [
    { name: t('culturePage.festivals.festival1.name', 'جشنواره سفال و سرامیک لالجین'), date: t('culturePage.festivals.festival1.date', 'خرداد ماه'), description: t('culturePage.festivals.festival1.description', 'بزرگ‌ترین رویداد صنایع دستی استان'), image: '/images/culture/pottery.jpg', gradient: 'from-amber-600/80 to-orange-700/80' },
    { name: t('culturePage.festivals.festival2.name', 'جشنواره گل محمدی'), date: t('culturePage.festivals.festival2.date', 'اردیبهشت ماه'), description: t('culturePage.festivals.festival2.description', 'جشن برداشت گل‌های معطر'), image: '/images/culture/rose.jpg', gradient: 'from-pink-600/80 to-rose-700/80' },
    { name: t('culturePage.festivals.festival3.name', 'جشنواره موسیقی بومی'), date: t('culturePage.festivals.festival3.date', 'مرداد ماه'), description: t('culturePage.festivals.festival3.description', 'گردهمایی هنرمندان موسیقی محلی'), image: '/images/culture/music.jpg', gradient: 'from-violet-600/80 to-purple-700/80' },
  ];

  const notablePeople = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    key: `p${n}`,
    src: `/images/notable/p${n}.jpg`,
    name: t(`notablePage.people.p${n}.name`, ['کیاکسار', 'آستیاگ', 'فیروزان', 'نعمان بن مقرن', 'ابوسعید ابوالخیر', 'استادان سفال لالجین'][i]),
    role: t(`notablePage.people.p${n}.role`, ['پادشاه ماد', 'آخرین پادشاه ماد', 'سردار ساسانی', 'فرمانده مسلمانان', 'عارف و شاعر', 'هنرمندان صنایع دستی'][i]),
    era: t(`notablePage.people.p${n}.era`, ['۶۲۵–۵۸۵ ق.م', '۵۸۵–۵۵۰ ق.م', 'سده هفتم م', '۶۴۲ م', '۹۶۷–۱۰۴۹ م', 'چند قرن پیشینه'][i]),
    category: t(`notablePage.people.p${n}.category`, ['تاریخی', 'تاریخی', 'نظامی', 'نظامی', 'ادبی', 'هنری'][i]),
    description: t(`notablePage.people.p${n}.description`, [
      'پادشاه بزرگ ماد که امپراتوری ماد را گسترش داد و نهاوند را به مرکز قدرت تبدیل کرد',
      'آخرین پادشاه ماد که نهاوند پایتخت قلمروی او بود',
      'سردار دلیر ساسانی که در معرکه نهاوند در برابر سپاه اسلام رزمید',
      'فرمانده سپاه اسلام در معرکه نهاوند، معروف به فتح‌الفتوح',
      'عارف و شاعر بزرگ ایرانی که از نهاوند می‌گذشت و اشعارش جاودان شد',
      'استادان بی‌نام سفال‌گری لالجین که هنر ایران را به جهان معرفی کردند',
    ][i]),
    gradient: ['bg-gradient-to-br from-amber-500 to-orange-600', 'bg-gradient-to-br from-purple-500 to-violet-600', 'bg-gradient-to-br from-rose-500 to-red-600', 'bg-gradient-to-br from-emerald-500 to-teal-600', 'bg-gradient-to-br from-blue-500 to-indigo-600', 'bg-gradient-to-br from-teal-500 to-cyan-600'][i],
    catColor: (['تاریخی', 'Historical', 'تاريخي', '历史'].includes(t(`notablePage.people.p${n}.category`, ''))) ? 'bg-amber-100 text-amber-800' : (['نظامی', 'Military', 'عسكري', '军事'].includes(t(`notablePage.people.p${n}.category`, ''))) ? 'bg-rose-100 text-rose-800' : (['ادبی', 'Literary', 'أدبي', '文学'].includes(t(`notablePage.people.p${n}.category`, ''))) ? 'bg-blue-100 text-blue-800' : 'bg-teal-100 text-teal-800',
  }));

  const tabs = [
    { id: 'history' as const, label: t('historyPage.tabNav.history', 'تاریخ'), icon: Crown, num: '۰۱', gradient: 'from-amber-500 to-orange-500' },
    { id: 'culture' as const, label: t('historyPage.tabNav.culture', 'فرهنگ'), icon: Palette, num: '۰۲', gradient: 'from-violet-500 to-purple-500' },
    { id: 'notable' as const, label: t('historyPage.tabNav.notable', 'مشاهیر'), icon: Users2, num: '۰۳', gradient: 'from-emerald-500 to-teal-500' },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>

      {/* ══════════ HERO ══════════ */}
      <section className="relative h-[70vh] min-h-[520px] flex flex-col items-center justify-center overflow-hidden">
        {/* bg image */}
        <div className="absolute inset-0">
          <Image src="/images/history/20.jpg" alt="hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/60 to-stone-900/90" />
          {/* decorative grid overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" />
            {t('historyPage.hero.badge', 'نهاوند · استان همدان · ایران')}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
            {t('historyPage.hero.title', 'تاریخ و فرهنگ')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              {t('historyPage.hero.titleAccent', 'نهاوند')}
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            {t('historyPage.hero.subtitle', 'سفری در طول هزاران سال تاریخ، فرهنگ و هنر این سرزمین کهن')}
          </motion.p>

          {/* stats row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4">
            {[
              { value: '۲۵۰۰+', label: t('historyPage.hero.stat1', 'سال تاریخ') },
              { value: '۴', label: t('historyPage.hero.stat2', 'دوران تاریخی') },
              { value: '۶', label: t('historyPage.hero.stat3', 'مشاهیر برجسته') },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 text-center">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* scroll hint */}
        {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <span className="text-xs tracking-widest uppercase">scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div> */}
      </section>

      {/* ══════════ FLOATING SIDE NAV ══════════ */}
      <div className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-40 flex-col items-center ${isRTL ? 'left-5' : 'right-5'}`}>
        {tabs.map(({ id, label, icon: Icon, gradient }, idx) => {
          const isActive = activeTab === id;
          const isLast = idx === tabs.length - 1;
          return (
            <div key={id} className="flex flex-col items-center">
              <button onClick={() => scrollTo(id)} className="group flex items-center gap-2.5 py-1">
                {/* label — fades in on hover or when active */}
                <span className={`text-xs font-bold whitespace-nowrap transition-all duration-200
                  ${isRTL ? 'order-2' : 'order-1'}
                  ${isActive ? 'opacity-100 text-gray-700' : 'opacity-0 group-hover:opacity-100 text-gray-400'}`}>
                  {label}
                </span>
                {/* dot */}
                <motion.div
                  animate={isActive
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.75, opacity: 0.45 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className={`rounded-full flex-shrink-0 ${isRTL ? 'order-1' : 'order-2'}
                    ${isActive
                      ? `w-4 h-4 bg-gradient-to-br ${gradient} shadow-[0_0_0_3px_rgba(255,255,255,1),0_0_0_4px_rgba(0,0,0,0.12)]`
                      : 'w-3 h-3 bg-gray-300 group-hover:bg-gray-500'}`} />
              </button>

              {/* connector line */}
              {!isLast && (
                <div className="w-px h-8 my-0.5 bg-gradient-to-b from-gray-200 to-gray-200" />
              )}
            </div>
          );
        })}
      </div>

      {/* ══════════ SECTION 1 — HISTORY ══════════ */}
      <section id="history" ref={historySectionRef} className="scroll-mt-24">

        {/* intro */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <SectionBadge num="۰۱" label={t('historyPage.tabNav.history', 'تاریخ')} color="bg-gradient-to-br from-amber-500 to-orange-500" />
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
              {t('historyPage.introduction.title', 'نهاوند در گذر تاریخ')}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="text-lg text-gray-500 leading-relaxed">
              {t('historyPage.introduction.content', 'نهاوند شهری با تاریخی درخشان است که بیش از دو هزار و پانصد سال شاهد رویدادهای مهم تاریخی بوده. از دوران هخامنشیان تا امروز، همواره یکی از مراکز مهم فرهنگی، سیاسی و اقتصادی ایران محسوب می‌شده است.')}
            </motion.p>
          </div>
        </div>

        {/* vertical timeline */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                {t('historyPage.timeline.title', 'خط زمانی تاریخ نهاوند')}
              </h2>
              <p className="text-gray-500">{t('historyPage.timeline.subtitle', 'مروری بر دوران‌های مختلف تاریخی این شهر کهن')}</p>
            </div>

            <div className="relative">
              {/* center line */}
              <div className="absolute right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-300 via-violet-300 to-rose-300 hidden lg:block" />

              <div className="space-y-10">
                {timelinePeriods.map((period, index) => {
                  const Icon = period.icon;
                  const isRight = index % 2 === 0;
                  return (
                    <motion.div key={index}
                      initial={{ opacity: 0, x: isRight ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`flex flex-col lg:flex-row items-stretch gap-0 ${isRight ? '' : 'lg:flex-row-reverse'}`}>

                      {/* card */}
                      <div className="flex-1 lg:max-w-[calc(50%-28px)]">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                          {/* top accent bar */}
                          <div className={`h-1.5 ${period.bg}`} />
                          <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${period.bg}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="text-base font-black text-gray-900">{period.period}</h3>
                                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{period.years}</span>
                              </div>
                            </div>
                            <ul className="space-y-2">
                              {period.events.map((ev, ei) => (
                                <li key={ei} className="flex items-start gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: period.accent }} />
                                  {ev}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* center dot on desktop */}
                      <div className="hidden lg:flex w-14 items-center justify-center flex-shrink-0 relative z-10">
                        <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white text-xs font-black ${period.bg}`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* image */}
                      <div className="flex-1 lg:max-w-[calc(50%-28px)]">
                        <div className="relative h-44 lg:h-full min-h-[180px] rounded-2xl overflow-hidden shadow-sm">
                          <Image src={period.image} alt={period.period} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-white text-sm font-bold">{period.period}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* historical sites */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                {t('historyPage.sites.title', 'آثار تاریخی مهم')}
              </h2>
              <p className="text-gray-500">{t('historyPage.sites.subtitle', 'بناها و مکان‌هایی که تاریخ نهاوند را روایت می‌کنند')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {historicalSites.map((site, index) => {
                const Icon = site.icon;
                return (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className={`h-24 bg-gradient-to-br ${site.color} flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white opacity-90" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{site.period}</span>
                      <h3 className="text-base font-black text-gray-900 mt-1 mb-2">{site.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{site.description}</p>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs text-gray-600 leading-relaxed">{site.significance}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Battle of Nahavand */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/history/war.jpg" alt="battle" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/80 to-stone-900/60" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
            <div className="max-w-xl">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                <Sword className="w-3.5 h-3.5" />
                {t('historyPage.battle.badge', 'رویداد تاریخی')}
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-white mb-4">
                {t('historyPage.battle.title', 'معرکه نهاوند')}
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.15 }} className="text-white/70 text-lg leading-relaxed mb-8">
                {t('historyPage.battle.description', 'معرکه نهاوند در سال ۲۱ هجری (۶۴۲ م) یکی از مهم‌ترین نبردهای تاریخ ایران و اسلام است. این نبرد که «فتح الفتوح» نام گرفت، پایان حکومت ساسانیان و آغاز دوران اسلامی در ایران را رقم زد.')}
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: t('historyPage.battle.lblMuslim', 'فرمانده مسلمانان'), value: t('historyPage.battle.commanderMuslim', 'نعمان بن مقرن') },
                  { label: t('historyPage.battle.lblSasanian', 'فرمانده ساسانیان'), value: t('historyPage.battle.commanderSasanian', 'فیروزان') },
                  { label: t('historyPage.battle.lblOutcome', 'نتیجه'), value: t('historyPage.battle.outcome', 'فتح‌الفتوح') },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <p className="text-white/50 text-xs mb-1">{item.label}</p>
                    <p className="text-white font-bold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* modern era */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                {t('historyPage.modern.title', 'نهاوند امروز')}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                {t('historyPage.modern.content', 'امروزه نهاوند شهری مدرن است که در عین حفظ هویت تاریخی خود به سوی توسعه حرکت می‌کند.')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: t('historyPage.modern.item1.title', 'میراث فرهنگی'), desc: t('historyPage.modern.item1.description', 'حفظ و احیای آثار تاریخی'), icon: Building, gradient: 'from-blue-500 to-indigo-500' },
                { title: t('historyPage.modern.item2.title', 'صنایع دستی'), desc: t('historyPage.modern.item2.description', 'مرکز تولید سفال و سرامیک'), icon: Sparkles, gradient: 'from-amber-500 to-orange-500' },
                { title: t('historyPage.modern.item3.title', 'گردشگری'), desc: t('historyPage.modern.item3.description', 'جذب گردشگران داخلی و خارجی'), icon: MapPin, gradient: 'from-emerald-500 to-teal-500' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${item.gradient}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SECTION 2 — CULTURE ══════════ */}
      <section id="culture" ref={cultureSectionRef} className="scroll-mt-24">

        {/* section header */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <SectionBadge num="۰۲" label={t('historyPage.tabNav.culture', 'فرهنگ')} color="bg-gradient-to-br from-violet-500 to-purple-500" />
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
              {t('culturePage.hero.title', 'فرهنگ و هنر نهاوند')}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="text-lg text-gray-500 leading-relaxed">
              {t('culturePage.hero.description', 'میراث غنی فرهنگی و هنری مردمان این سرزمین کهن')}
            </motion.p>
          </div>
        </div>

        {/* cultural aspects — alternating layout */}
        <div className="bg-gray-50 py-4 pb-16 px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {culturalAspects.map((aspect, index) => {
              const Icon = aspect.icon;
              const flipped = index % 2 === 1;
              return (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}
                  className={`flex flex-col ${flipped ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden`}>

                  {/* image */}
                  <div className="relative lg:w-80 xl:w-96 h-56 lg:h-auto flex-shrink-0">
                    <Image src={aspect.image} alt={aspect.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/30 to-transparent" />
                  </div>

                  {/* content */}
                  <div className={`flex-1 p-7 lg:p-10 border-r-4 lg:border-r-0 ${flipped ? '' : `lg:border-r-4`} ${aspect.accent} flex flex-col justify-center`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${aspect.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{aspect.title}</h3>
                    <p className="text-gray-500 mb-5">{aspect.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {aspect.details.map((d, di) => (
                        <div key={di} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* festivals */}
        <div className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                {t('culturePage.festivals.title', 'جشنواره‌ها و رویدادهای فرهنگی')}
              </h2>
              <p className="text-gray-500">{t('culturePage.festivals.description', 'رویدادهای فرهنگی که شادی و نشاط می‌آفرینند')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {festivals.map((fest, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                  className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <div className="relative h-64">
                    <Image src={fest.image} alt={fest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${fest.gradient}`} />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                      {fest.date}
                    </span>
                    <h3 className="text-white font-black text-lg mb-1">{fest.name}</h3>
                    <p className="text-white/80 text-sm">{fest.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* heritage banner */}
        <div className="py-16 px-4 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
                {t('culturePage.heritage.title', 'میراث فرهنگی ماندگار')}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
                {t('culturePage.heritage.description', 'فرهنگ نهاوند، آمیزه‌ای از هزاران سال تمدن، هنر، و خلاقیت مردمانی است که با عشق به زادگاهشان، هویت فرهنگی این شهر را نسل به نسل منتقل کرده‌اند.')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ SECTION 3 — NOTABLE ══════════ */}
      <section id="notable" ref={notableSectionRef} className="scroll-mt-24">

        {/* section header */}
        <div className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <SectionBadge num="۰۳" label={t('historyPage.tabNav.notable', 'مشاهیر')} color="bg-gradient-to-br from-emerald-500 to-teal-500" />
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
              {t('notablePage.title', 'مشاهیر نهاوند')}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="text-lg text-gray-500">
              {t('notablePage.subtitle', 'چهره‌هایی که نام نهاوند را در تاریخ ماندگار کردند')}
            </motion.p>
          </div>
        </div>

        {/* people grid */}
        <div className="pb-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notablePeople.map((person, index) => (
                <motion.div key={person.key}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

                  {/* top gradient strip */}
                  <div className={`h-2 ${person.gradient}`} />

                  <div className="p-6">
                    {/* avatar + name */}
                    <div className="flex items-center gap-4 mb-5">
                      <PersonAvatar src={person.src} name={person.name} gradient={person.gradient} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-gray-900 text-base leading-tight">{person.name}</h3>
                        <p className="text-sm text-gray-400 mt-0.5 truncate">{person.role}</p>
                      </div>
                    </div>

                    {/* era badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                      <span className="text-xs text-gray-400">{person.era}</span>
                      <span className={`mr-auto text-xs font-bold px-2.5 py-0.5 rounded-full ${person.catColor}`}>
                        {person.category}
                      </span>
                    </div>

                    {/* description */}
                    <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                      {person.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
