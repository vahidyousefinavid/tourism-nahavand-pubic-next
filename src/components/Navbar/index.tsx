'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import BorderDecoration from '../BorderDecoration';
import {
  Menu, X, ChevronDown, Home, Map, BookOpen, Info, Phone, Landmark, CalendarDays, Languages, Globe, TrendingUp
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

const menuItems = [
  {
    labelKey: 'nav.home',
    href: '/',
    icon: Home,
  },
  {
    labelKey: 'nav.events',
    href: '/events',
    icon: CalendarDays,
  },
  // {
  //   labelKey: 'nav.locations',
  //   icon: Map,
  //   children: [
  //     {
  //       labelKey: 'nav.nature',
  //       href: '/locations?filter.place=nature',
  //     },
  //     {
  //       labelKey: 'nav.religious',
  //       href: '/locations?filter.place=religious',
  //     },
  //     {
  //       labelKey: 'nav.historical',
  //       href: '/locations?filter.place=historical',
  //     },
  //     {
  //       labelKey: 'nav.cultural',
  //       href: '/locations?filter.place=cultural',
  //     },
  //   ],
  // },
  {
    labelKey: 'nav.locations',
    href: '/locations',
    icon: Map,
  },
  {
    labelKey: 'nav.history',
    href: '/history',
    icon: Landmark,
  },
  {
    labelKey: 'nav.culture',
    href: '/culture',
    icon: BookOpen,
  },
  {
    labelKey: 'nav.investment',
    href: '/investment',
    icon: TrendingUp,
    children: [
      {
        labelKey: 'nav.investmentGuide',
        href: '/investment',
      },
      {
        labelKey: 'nav.investmentOpportunities',
        href: '/investment/opportunities',
      },
    ],
  },
  {
    labelKey: 'nav.about',
    href: '/about',
    icon: Info,
  },
];

const languages = [
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>({});
  const { dir, isRTL } = useDirection()
  // استیت برای باز و بسته شدن منوی زبان در دسکتاپ
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  // استیت برای باز و بسته شدن منوی زبان در موبایل (Accordion)
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (lng === 'en' || lng === 'zh') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lng;
    } else {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lng;
    }
    setLangMenuOpen(false);
    setMobileLangOpen(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSubmenu = (label: string) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const panelAnimation = dir === 'rtl'
    ? { x: 0, opacity: 1 }
    : { x: 0, opacity: 1 };

  const panelInitial = dir === 'rtl'
    ? { x: '100%' }
    : { x: '-100%' };

  const panelExit = dir === 'rtl'
    ? { x: '100%' }
    : { x: '-100%' };

  return (
    <nav
      className={clsx(
        'fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out z-50',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10',
        scrolled ? 'w-[95%] max-w-6xl' : 'w-[90%] max-w-5xl'
      )}
      dir={dir}
    >
      <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg px-6 min-h-[70px] flex justify-between items-center">
        {/* Left (Logo + Menu) */}
        <div className='flex h-[70px] items-center justify-center gap-8'>
          <div className="text-lg font-bold text-gray-900">{t('nav.title', 'گردشگری نهاوند')}</div>

          {/* Desktop Menu */}
          <div className="hidden h-full sm:flex gap-8 items-center text-sm font-bold text-gray-800">
            {menuItems.map((item) =>
              item.children ? (
                <div key={item.labelKey} className="flex h-full relative group cursor-pointer">
                  <div className="flex items-center h-full gap-1 hover:text-blue-600">
                    <span>{t(item.labelKey)}</span>
                  </div>
                  <div className="absolute top-[70px] right-0 bg-white/95 backdrop-blur-lg shadow-md rounded-xl w-48 p-2 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-40">
                    <BorderDecoration isRTL={isRTL} />
                    {item.children.map((child) => (
                      <Link prefetch key={child.labelKey} href={child.href} className="block py-1 px-4 hover:text-blue-600">
                        {t(child.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link prefetch key={item.labelKey} href={item.href} className="hover:text-blue-600">
                  {t(item.labelKey)}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Right Section: Language Switcher & Logo */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Desktop Animated Language Switcher */}
          <div className="relative h-full flex items-center">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-white/50"
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase">{i18n.language}</span>
              <ChevronDown size={14} className={clsx(langMenuOpen && 'rotate-180', 'transition-transform duration-300')} />
            </button>

            {/* Animated Dropdown */}
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[60px] right-0 w-40 bg-white/95 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden z-50 border border-gray-100"
                >
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className={clsx(
                        "w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 transition-colors",
                        i18n.language === lng.code && "bg-blue-50 text-blue-600 font-bold"
                      )}
                    >
                      <span>{lng.label}</span>
                      <span className="text-lg">{lng.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <img
            src="/images/Noah.png"
            alt="logo"
            className="w-[50px] h-full object-contain"
          />
        </div>

        {/* Mobile Drawer Button */}
        <div className="sm:hidden h-auto flex justify-center gap-4">
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Dialog.Trigger asChild>
              <button className="text-gray-800" aria-label={t('nav.menu')}>
                <Menu size={30} />
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {drawerOpen && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild>
                    <motion.div
                      className="fixed inset-0 bg-black/40 z-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setDrawerOpen(false)}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild>
                    <motion.div
                      className={clsx(
                        "fixed top-0 h-full w-[280px] bg-white shadow-xl z-50 flex flex-col",
                        dir === 'rtl' ? 'right-0' : 'left-0' // تعیین موقعیت پنل
                      )}
                      initial={{ x: panelInitial.x }}
                      animate={{ x: panelAnimation.x, opacity: panelAnimation.opacity }}
                      exit={{ x: panelExit.x }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className={clsx(
                        "flex justify-between items-center p-5 border-b border-gray-100 shrink-0",
                        // برای RTL، عنوان باید به راست و دکمه بستن به چپ برود
                        // با justify-between این حالت به طور خودکار اتفاق می افتد
                        // اما می توانیم متن را هم تنظیم کنیم
                        dir === 'rtl' ? 'text-right' : 'text-left',
                        isRTL ? "flex-row" : "flex-row-reverse"
                      )}>
                        <h2 className="text-lg font-bold text-gray-900">{t('nav.menu')}</h2>
                        <button onClick={() => setDrawerOpen(false)} aria-label={t('nav.close')} className="p-2 hover:bg-gray-100 rounded-full">
                          <X size={20} />
                        </button>
                      </div>

                      {/* Menu Items */}
                      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3">
                        <ul className="space-y-1">
                          {menuItems.map((item) => {
                            const Icon = item.icon;
                            return item.children ? (
                              <li key={item.labelKey}>
                                <button
                                  onClick={() => toggleSubmenu(item.labelKey)}
                                  className={clsx(
                                    "flex justify-between w-full text-gray-800 hover:text-blue-600 items-center p-3 rounded-lg hover:bg-gray-50 transition-colors", // ترکیب همه کلاس ها در یک className
                                    "flex items-center gap-3", // کلاس های مربوط به چیدمان فلکس
                                    isRTL ? "flex-row" : "flex-row-reverse" // منطق صحیح برای ترتیب آیکون و متن
                                  )}                                >
                                  <span className={clsx(
                                    "flex items-center gap-3 font-medium text-sm",
                                    isRTL ? "flex-row" : "flex-row-reverse"
                                  )} >
                                    {Icon && <Icon size={18} className="text-gray-500" />}
                                    {t(item.labelKey)}
                                  </span>
                                  <ChevronDown
                                    size={16}
                                    className={clsx(
                                      submenuOpen[item.labelKey] && 'rotate-180',
                                      'transition-transform duration-300 text-gray-400'
                                    )}
                                  />
                                </button>
                                <AnimatePresence initial={false}>
                                  {submenuOpen[item.labelKey] && (
                                    <motion.ul
                                      // برای تنظیم padding سمت راست و چپ بر اساس جهت
                                      className={clsx(
                                        "pr-8 pl-2 py-2 space-y-1 overflow-hidden",
                                        dir === 'rtl' ? 'pr-8 pl-2' : 'pr-2 pl-8' // اگر RTL بود padding راست بیشتر، اگر LTR بود padding چپ بیشتر
                                        // نکته: ممکن است نیاز باشد این منطق را برعکس کنید یا padding ها را به دلخواه تنظیم کنید.
                                        // مثال: برای RTL، ممکن است بخواهید padding سمت راست بیشتر باشد تا آیتم‌ها کمی به سمت راست متمایل شوند.
                                        // اما اگر آیتم‌های زیرمنو باید دقیقاً زیر آیتم اصلی قرار بگیرند، ممکن است نیاز به padding یکسان در دو طرف و استفاده از margin باشد.
                                        // این بخش را بر اساس ظاهر دلخواه خود تنظیم کنید.
                                      )}
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {item.children.map((child) => (
                                        <li key={child.labelKey}>
                                          <Link
                                            prefetch
                                            href={child.href}
                                            className={clsx(
                                              "flex items-center gap-2 text-gray-600 hover:text-blue-600 py-2 text-sm",
                                              isRTL ? "flex-row" : "flex-row-reverse"
                                            )}
                                          >
                                            {/* این نقطه برای نشان دادن زیرمنو است، می توان آن را هم بر اساس جهت تنظیم کرد */}
                                            <span className={clsx(
                                              "w-1.5 h-1.5 rounded-full bg-gray-300 inline-block",
                                              dir === 'rtl' ? 'ml-3' : 'mr-3' // margin بر اساس جهت
                                            )} />
                                            {t(child.labelKey)}
                                          </Link>
                                        </li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </li>
                            ) : (
                              <li key={item.labelKey}>
                                <Link
                                  href={item.href}
                                  className={clsx(
                                    "flex items-center gap-3 text-gray-800 hover:text-blue-600 p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm",
                                    isRTL ? "flex-row" : "flex-row-reverse"
                                  )}
                                >
                                  {Icon && <Icon size={18} className="text-gray-500" />}
                                  {t(item.labelKey)}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Mobile Language Section (Compact Accordion) */}
                      <div className="shrink-0 border-t border-gray-100 bg-gray-50/50">
                        <button
                          onClick={() => setMobileLangOpen(!mobileLangOpen)}
                          className={clsx(
                            "w-full flex items-center justify-between p-4 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors",
                            dir === 'rtl' ? 'text-right' : 'text-left',
                            isRTL ? "flex-row" : "flex-row-reverse"
                          )}
                        >
                          <span className={clsx(
                            "flex items-center gap-2",
                            isRTL ? "flex-row" : "flex-row-reverse"
                          )}>
                            <Globe size={18} />
                            {t('nav.language')}
                          </span>
                          <ChevronDown size={16} className={clsx(mobileLangOpen && 'rotate-180', 'transition-transform')} />
                        </button>
                        <AnimatePresence>
                          {mobileLangOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className={clsx(
                                "grid grid-cols-4 gap-1 p-2 pt-0",
                                // می توانید اینجا هم چیدمان grid را بر اساس جهت تنظیم کنید، اما معمولا grid نیازی به تنظیم ندارد.
                              )}>
                                {languages.map((lng) => (
                                  <button
                                    key={lng.code}
                                    onClick={() => changeLanguage(lng.code)}
                                    className={clsx(
                                      "flex flex-col items-center justify-center p-2 rounded-md border transition-all",
                                      // فرض می‌کنیم i18n.language وجود دارد و زبان فعلی را برمی‌گرداند
                                      // اگر از state dir استفاده می کنید، این شرط را مطابق آن تغییر دهید:
                                      // (dir === 'rtl' && lng.code === 'fa') || (dir === 'ltr' && lng.code === 'en')
                                      i18n.language === lng.code
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                                    )}
                                  >
                                    <span className="text-lg mb-0.5">{lng.flag}</span>
                                    <span className="text-[10px] font-bold">{lng.code.toUpperCase()}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Noah image */}
                      <div className="p-4 pb-6 shrink-0 flex justify-center bg-white">
                        <img
                          src="/images/Noah.png"
                          alt="Noah"
                          className="w-16 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </nav>
  );
}