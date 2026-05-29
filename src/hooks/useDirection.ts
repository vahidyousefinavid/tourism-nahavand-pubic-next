// src/hooks/useDirection.ts
import { useTranslation } from 'react-i18next';

export const useDirection = () => {
  const { i18n } = useTranslation();

  // زبان‌های راست‌چین
  const isRTL = i18n.language === 'fa' || i18n.language === 'ar';
  
  // مقدار رشته‌ای جهت برای استفاده در کلاس‌ها یا پراپ‌ها
  const dir = isRTL ? 'rtl' : 'ltr';

  return { isRTL, dir };
};