"use client"
import { useTranslation } from "react-i18next";
import BorderDecoration from "@/components/BorderDecoration";

export default function CityInfo() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-12 grid lg:grid-cols-[2fr_1fr] gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* کارت بزرگ بالا */}
        <div className="relative col-span-1 text-center md:col-span-2 bg-white justify-center rounded-2xl shadow-md p-6 flex justify-between items-center">
          <div>
            {<BorderDecoration
              dir={i18n.dir()}
              isRTL={isRTL}
            />}
            <div className="text-3xl font-extrabold text-purple-700">
              {t('cityInfo.population.value', '120,000+')}
            </div>
            <div className="text-lg font-medium mt-1 text-gray-800">
              {t('cityInfo.population.label', 'نفر ساکن در نهاوند')}
            </div>
          </div>
        </div>

        {/* سه کارت کوچک زیر */}
        {/* ارتفاع */}
        <div className="relative bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <BorderDecoration
            dir={i18n.dir()}
            isRTL={isRTL}
          />
          <div className="text-2xl font-extrabold text-purple-700">
            {t('cityInfo.height.value', '1,740')}
          </div>
          <div className="text-sm text-gray-700 mt-1">
            {t('cityInfo.height.label', 'ارتفاع (متر)')}
          </div>
        </div>

        {/* وسعت */}
        <div className="relative bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <BorderDecoration
            dir={i18n.dir()}
            isRTL={isRTL}
          />
          <div className="text-2xl font-extrabold text-purple-700">
            {t('cityInfo.area.value', '1,524')}
          </div>
          <div className="text-sm text-gray-700 mt-1">
            {t('cityInfo.area.label', 'وسعت (کیلومتر مربع)')}
          </div>
        </div>
      </div>

      {/* کارت بلند سمت راست */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className={`text-2xl font-extrabold text-purple-700 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('cityInfo.destinations.title', '180+ مقصد گردشگری')}
          </div>
          <p className={`text-sm text-gray-600 mt-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('cityInfo.destinations.subtitle', 'برترین تجربه‌ها از مردم و گردشگران')}
          </p>
        </div>
        <ul className={`mt-6 space-y-3 text-sm font-medium text-black ${isRTL ? 'text-right' : 'text-left'}`}>
          <li>{t('cityInfo.destinations.list.1', 'چشمه‌های نهاوند')}</li>
          <li>{t('cityInfo.destinations.list.2', 'آبشارهای سراب گیان')}</li>
          <li>{t('cityInfo.destinations.list.3', 'فرهنگ محلی')}</li>
          <li>{t('cityInfo.destinations.list.4', 'باغ‌های تاریخی')}</li>
        </ul>
      </div>
    </section>
  );
}