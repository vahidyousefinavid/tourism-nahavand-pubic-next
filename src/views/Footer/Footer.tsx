'use client';
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
} from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection";

export default function Footer() {
    const { t } = useTranslation();
    const { isRTL, dir } = useDirection();

    return (
        <footer className="bg-gray-100 text-gray-800 py-4 pt-12 px-6" dir={dir}>
            <div className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 ${isRTL ? 'text-right' : 'text-left'}`}>
                
                {/* بخش برند */}
                <div>
                    <div className='flex'>
                        <a
                            className='flex flex-col justify-center items-center gap-2 cursor-pointer'
                            href='/'
                        >
                            <img
                                src={'/images/cities/icons/nahavand.png'}
                                alt='Logo'
                                className='!w-[40px]'
                            />
                            <h2 className='font-bold'>
                                {t('footer.brand', 'شهرداری نهاوند')}
                            </h2>
                        </a>
                    </div>
                </div>

                {/* درباره نهاوند */}
                <div>
                    <h3 className="text-lg font-bold mb-4">{t('footer.aboutTitle', 'درباره نهاوند')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/about" className="hover:text-blue-600 transition-colors">{t('footer.aboutCity', 'معرفی شهر')}</a>
                        </li>
                        <li>
                            <a href="/history" className="hover:text-blue-600 transition-colors">{t('footer.history', 'تاریخچه نهاوند')}</a>
                        </li>
                        <li>
                            <a href="/culture" className="hover:text-blue-600 transition-colors">{t('footer.culture', 'فرهنگ و مردم')}</a>
                        </li>
                    </ul>
                </div>

                {/* راهنمای سفر */}
                <div>
                    <h3 className="text-lg font-bold mb-4">{t('footer.travelGuideTitle', 'راهنمای سفر')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/locations" className="hover:text-blue-600">{t('footer.locations', 'مکان ها')}</a></li>
                        <li><a href="/events" className="hover:text-blue-600">{t('footer.events', 'رویدادها')}</a></li>
                    </ul>
                </div>

                {/* لینک‌های مفید */}
                <div>
                    <h3 className="text-lg font-bold mb-4">{t('footer.usefulLinksTitle', 'لینک‌های مفید')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="http://sh-nahavand.ir/" className="hover:text-blue-600">{t('footer.municipality', 'شهرداری نهاوند')}</a></li>
                    </ul>
                </div>
            </div>

            {/* کپی‌رایت */}
            <div className="mt-10 border-t border-gray-300 pt-6 text-sm text-gray-600 text-center">
                © {new Date().getFullYear()} {t('footer.copyright', 'تمامی حقوق برای')} <span className="font-bold">{t('footer.brandName', 'نهاوند‌گردی')}</span> {t('footer.reserved', 'محفوظ است.')}.
            </div>
            
            {/* طراح */}
            <div className="mt-2 text-sm text-gray-600 text-center">
                | {t('footer.designBy', 'طراحی و توسعه توسط شرکت رادمان افزار هومان (تلفن تماس: 09999096052)')} |
            </div>
        </footer>
    );
}