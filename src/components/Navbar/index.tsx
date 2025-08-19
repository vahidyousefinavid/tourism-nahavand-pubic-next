'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import BorderDecoration from '../BorderDecoration';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Map,
  BookOpen,
  Info,
  Phone,
  Landmark,
  CalendarDays,
} from 'lucide-react';

const menuItems = [
  {
    label: 'خانه',
    href: '/',
    icon: Home,
  },
  {
    label: 'رویدادها',
    href: '/events',
    icon: CalendarDays,
  },
  {
    label: 'مکان‌ها',
    icon: Map,
    children: [
      {
        label: 'طبیعی',
        href: '/locations?filter.place=nature',
      },
      {
        label: 'مذهبی',
        href: '/locations?filter.place=nature',
      },
      {
        label: 'تاریخی',
        href: '/locations?filter.place=historical',
      },
      {
        label: 'فرهنگی',
        href: '/locations?filter.place=cultural',
      },
    ],
  },
  {
    label: 'تاریخ شهر نهاوند',
    href: '/history',
    icon: Landmark,
  },
  {
    label: 'فرهنگ شهر نهاوند',
    href: '/culture',
    icon: BookOpen,
  },
  {
    label: 'درباره ما',
    href: '/about',
    icon: Info,
  },
];


export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>({});

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

  return (
    <nav
      className={clsx(
        'fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out z-50',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10',
        scrolled ? 'w-[95%] max-w-6xl' : 'w-[90%] max-w-5xl'
      )}
    >
      <div className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg px-6 min-h-[70px] flex justify-between items-center">
        {/* Left (Logo + Menu) */}
        <div className='flex h-[70px] items-center justify-center gap-8'>
          <div className="text-lg font-bold text-gray-900">گردشگری نهاوند</div>

          {/* Desktop Menu */}
          <div className="hidden h-full sm:flex gap-8 items-center text-sm font-bold text-gray-800">
            {menuItems.map((item) =>
              item.children ? (
                <div key={item.label} className="flex h-full relative group cursor-pointer">
                  <div className="flex items-center h-full gap-1 hover:text-blue-600">
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute top-[70px] right-0 bg-white/95 backdrop-blur-lg shadow-md rounded-xl w-120 p-2 pr-6 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-40">
                    <BorderDecoration />
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className="block py-1 px-2 hover:text-blue-600">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className="hover:text-blue-600 !font-[Vazirmatn]">
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Desktop Logo */}
        <div className="hidden sm:block">
          <img
            src="/images/noah.png"
            alt="logo"
            className="w-[50px] h-full object-contain"
          />
        </div>

        {/* Mobile Drawer Button */}
        <div className="sm:hidden h-auto flex justify-center ">
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Dialog.Trigger asChild>
              <button className="text-gray-800" aria-label="منو">
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
                      className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl p-6 z-50 rounded-l-xl flex flex-col"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-center mb-4 text-black shrink-0">
                        <h2 className="text-lg font-bold">منو</h2>
                        <button onClick={() => setDrawerOpen(false)} aria-label="بستن">
                          <X size={24} />
                        </button>
                      </div>

                      {/* Menu Items - takes remaining height and scrolls if needed */}
                      <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        <ul className="space-y-4 text-right">
                          {menuItems.map((item) => {
                            const Icon = item.icon;
                            return item.children ? (
                              <li key={item.label}>
                                <button
                                  onClick={() => toggleSubmenu(item.label)}
                                  className="flex justify-between w-full text-gray-800 hover:text-blue-600 items-center"
                                >
                                  <span className="flex items-center gap-2">
                                    {Icon && <Icon size={18} />}
                                    {item.label}
                                  </span>
                                  <ChevronDown
                                    size={16}
                                    className={clsx(
                                      submenuOpen[item.label] && 'rotate-180',
                                      'transition-transform duration-300'
                                    )}
                                  />
                                </button>

                                {/* زیرمنو با انیمیشن */}
                                <AnimatePresence initial={false}>
                                  {submenuOpen[item.label] && (
                                    <motion.ul
                                      className="pr-4 mt-1 mb-4 space-y-2 text-sm gap-5 overflow-hidden"
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {item.children.map((child) => (
                                        <li key={child.label} className='mt-3'>
                                          <Link
                                            href={child.href}
                                            className="flex items-center gap-2 text-black hover:text-gray-600"
                                          >
                                            <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" />
                                            {child.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </li>
                            ) : (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
                                >
                                  {Icon && <Icon size={18} />}
                                  {item.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Noah image always at bottom */}
                      <div className="pt-4 shrink-0">
                        <img
                          src="/images/noah.png"
                          alt="Noah"
                          className="w-24 h-auto mx-auto rounded-xl hover:scale-105 transition-transform duration-300"
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
