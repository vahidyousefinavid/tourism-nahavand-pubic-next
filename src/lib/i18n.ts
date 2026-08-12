// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ترجمه‌ها به صورت استاتیک import می‌شوند تا همراه باندل حاضر باشند.
// قبلاً با import() داینامیک لود می‌شدند و init قبل از رسیدن‌شان اجرا می‌شد؛
// نتیجه‌اش این بود که کلیدهای بدون مقدار پیش‌فرض خام رندر می‌شدند و تعویض زبان کار نمی‌کرد.
import fa from '../../public/locales/fa.json';
import en from '../../public/locales/en.json';
import ar from '../../public/locales/ar.json';
import zh from '../../public/locales/zh.json';

export const SUPPORTED_LANGS = ['fa', 'en', 'ar', 'zh'] as const;

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        fa: { translation: fa },
        en: { translation: en },
        ar: { translation: ar },
        zh: { translation: zh },
      },
      fallbackLng: 'fa',
      supportedLngs: SUPPORTED_LANGS as unknown as string[],
      // روی سرور همیشه fa تا مارک‌آپ SSR و اولین رندر کلاینت یکی باشد
      lng: typeof window === 'undefined' ? 'fa' : undefined,
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      react: { useSuspense: false },
    });
}

export default i18n;
