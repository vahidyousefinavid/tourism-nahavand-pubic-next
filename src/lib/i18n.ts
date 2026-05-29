// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// جلوگیری از اجرا در سمت سرور (Server Side)
if (typeof window !== 'undefined') {
  // وارد کردن فایل‌های ترجمه با مسیرهای جدید
  import('../../public/locales/fa.json').then(fa => {
    i18n.addResourceBundle('fa', 'translation', fa.default);
  });
  import('../../public/locales/en.json').then(en => {
    i18n.addResourceBundle('en', 'translation', en.default);
  });
  import('../../public/locales/ar.json').then(ar => {
    i18n.addResourceBundle('ar', 'translation', ar.default);
  });
  import('../../public/locales/zh.json').then(zh => {
    i18n.addResourceBundle('zh', 'translation', zh.default);
  });

  let savedLang = 'fa';
  if (typeof window !== 'undefined') {
    const lng = localStorage.getItem('i18nextLng');
    if (lng) savedLang = lng;
  }

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'fa',
      lng: savedLang,   // ⭐ این کار مانع چشمک‌زدن می‌شود
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });
}

export default i18n;