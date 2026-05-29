'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language;
    const html = document.documentElement;
    const body = document.body;

    // تنظیم جهت (RTL / LTR)
    if (lang === 'en' || lang === 'zh') {
      html.dir = 'ltr';
    } else {
      html.dir = 'rtl';
    }

    // حذف تمام فونت‌ها
    body.classList.remove(
      'font-tanha',
      'font-parastoo',
      'font-iranyekan',
      'font-vazir'
    );

    // انتخاب فونت بر اساس زبان
    switch (lang) {
      case 'fa':
        body.classList.add('font-iranyekan');
        break;

      case 'ar':
        body.classList.add('font-parastoo');
        break;

      case 'en':
        body.classList.add('font-tanha');
        break;

      case 'zh':
        body.classList.add('font-vazir');
        break;

      default:
        body.classList.add('font-iranyekan');
        break;
    }
  }, [i18n.language]);

  return <>{children}</>;
}
