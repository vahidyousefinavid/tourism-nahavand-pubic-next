"use client"
import Image from 'next/image';
import { Clock, Crown, Scroll, Building, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { useDirection } from '@/hooks/useDirection';

export default function HistoryPage() {
  const { t } = useTranslation(); // Get the t function

  const timelinePeriods = [
    {
      period: t('historyPage.timeline.period1.title', 'دوران باستان (قبل از اسلام)'),
      years: t('historyPage.timeline.period1.years', '550 ق.م - 651 م'),
      icon: Crown,
      color: 'bg-purple-100 text-purple-600',
      image: '/images/history/20.jpg',
      events: [
        t('historyPage.timeline.period1.event1', 'حکومت هخامنشیان و حکاکی گنجنامه توسط داریوش و خشایارشا'),
        t('historyPage.timeline.period1.event2', 'دوران اشکانیان و ساسانیان'),
        t('historyPage.timeline.period1.event3', 'نهاوند به عنوان یکی از مراکز مهم ایران باستان'),
        t('historyPage.timeline.period1.event4', 'معرکه نهاوند در سال 21 هجری قمری')
      ]
    },
    {
      period: t('historyPage.timeline.period2.title', 'دوران اسلامی اولیه'),
      years: t('historyPage.timeline.period2.years', '651 - 1000 م'),
      icon: Scroll,
      color: 'bg-green-100 text-green-600',
      image: '/images/history/islam.jpg',
      events: [
        t('historyPage.timeline.period2.event1', 'فتح نهاوند توسط مسلمانان'),
        t('historyPage.timeline.period2.event2', 'تبدیل شدن به مرکز مهم اداری'),
        t('historyPage.timeline.period2.event3', 'رشد علم و فرهنگ اسلامی'),
        t('historyPage.timeline.period2.event4', 'ساخت مساجد و مدارس مهم')
      ]
    },
    {
      period: t('historyPage.timeline.period3.title', 'دوران سلجوقیان و مغول'),
      years: t('historyPage.timeline.period3.years', '1000 - 1500 م'),
      icon: Building,
      color: 'bg-blue-100 text-blue-600',
      image: '/images/history/mongolia.jpg',
      events: [
        t('historyPage.timeline.period3.event1', 'حکومت سلجوقیان و رشد معماری'),
        t('historyPage.timeline.period3.event2', 'حمله مغولان و تخریبات'),
        t('historyPage.timeline.period3.event3', 'بازسازی و احیای شهر'),
        t('historyPage.timeline.period3.event4', 'رشد صنایع دستی و تجارت')
      ]
    },
    {
      period: t('historyPage.timeline.period4.title', 'دوران صفویه تا قاجار'),
      years: t('historyPage.timeline.period4.years', '1500 - 1925 م'),
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      image: '/images/history/safavid.jpg',
      events: [
        t('historyPage.timeline.period4.event1', 'رشد صنعت سفالگری در لالجین'),
        t('historyPage.timeline.period4.event2', 'ساخت بناهای مهم صفوی'),
        t('historyPage.timeline.period4.event3', 'توسعه کشاورزی و باغداری'),
        t('historyPage.timeline.period4.event4', 'تقویت هویت فرهنگی منطقه')
      ]
    },
    {
      period: t('historyPage.timeline.period5.title', 'دوران معاصر'),
      years: t('historyPage.timeline.period5.years', '1925 - اکنون'),
      icon: Clock,
      color: 'bg-red-100 text-red-600',
      image: '/images/history/now.jpg',
      events: [
        t('historyPage.timeline.period5.event1', 'مدرنیزاسیون و توسعه شهری'),
        t('historyPage.timeline.period5.event2', 'حفظ و مرمت آثار تاریخی'),
        t('historyPage.timeline.period5.event3', 'رشد صنعت گردشگری'),
        t('historyPage.timeline.period5.event4', 'ثبت جهانی صنایع دستی لالجین')
      ]
    }
  ];

  const historicalSites = [
    {
      name: t('historyPage.sites.site1.name', 'گنجنامه نهاوند'),
      period: t('historyPage.sites.site1.period', 'هخامنشی'),
      description: t('historyPage.sites.site1.description', 'کتیبه‌های سنگی داریوش و خشایارشا'),
      significance: t('historyPage.sites.site1.significance', 'یکی از مهم‌ترین آثار هخامنشی در ایران')
    },
    {
      name: t('historyPage.sites.site2.name', 'قلعه نهاوند'),
      period: t('historyPage.sites.site2.period', 'ساسانی - اسلامی'),
      description: t('historyPage.sites.site2.description', 'بقایای قلعه تاریخی شهر'),
      significance: t('historyPage.sites.site2.significance', 'شاهد معرکه مهم نهاوند')
    },
    {
      name: t('historyPage.sites.site3.name', 'مسجد جامع نهاوند'),
      period: t('historyPage.sites.site3.period', 'اسلامی'),
      description: t('historyPage.sites.site3.description', 'یکی از قدیمی‌ترین مساجد منطقه'),
      significance: t('historyPage.sites.site3.significance', 'نمونه معماری اسلامی اولیه')
    },
    {
      name: t('historyPage.sites.site4.name', 'کارگاه‌های سفال لالجین'),
      period: t('historyPage.sites.site4.period', 'صفوی - معاصر'),
      description: t('historyPage.sites.site4.description', 'مرکز تولید سفال و سرامیک'),
      significance: t('historyPage.sites.site4.significance', 'میراث زنده صنایع دستی ایران')
    }
  ];
  const { isRTL, dir } = useDirection();

  return (
    <div className="min-h-screen " dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('historyPage.hero.title', 'تاریخچه نهاوند')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {t('historyPage.hero.subtitle', 'سفری در طول تاریخ کهن این سرزمین از دوران باستان تا امروز')}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('historyPage.introduction.title', 'نهاوند در گذر تاریخ')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('historyPage.introduction.content', 'نهاوند، شهری با تاریخی درخشان و پرافتخار است که بیش از دو هزار و پانصد سال شاهد رویدادهای مهم تاریخی بوده است. از دوران هخامنشیان تا امروز، این شهر همواره یکی از مراکز مهم فرهنگی، سیاسی و اقتصادی ایران محسوب می‌شده است.')}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('historyPage.timeline.title', 'خط زمانی تاریخ نهاوند')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('historyPage.timeline.subtitle', 'مروری بر دوران‌های مختلف تاریخی این شهر کهن')}
            </p>
          </div>

          <div className="space-y-12">
            {timelinePeriods.map((period, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-3 space-x-reverse mb-4 gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${period.color}`}>
                      <period.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {period.period}
                      </h3>
                      <p className="text-gray-600">{period.years}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {period.events.map((event, eventIndex) => (
                      <li key={eventIndex} className="flex items-start space-x-3 space-x-reverse gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-80 rounded-2xl overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1' : ''
                  }`}>
                  <Image
                    src={period.image}
                    alt={t('historyPage.timeline.imageAlt', 'تصویری از دوران تاریخی')} // Generic alt text, can be improved
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Sites */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('historyPage.sites.title', 'آثار تاریخی مهم')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('historyPage.sites.subtitle', 'بناها و مکان‌هایی که تاریخ نهاوند را روایت می‌کنند')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {historicalSites.map((site, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 space-x-reverse gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {site.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      {t('historyPage.sites.site.periodLabel', 'دوره')}: {site.period}
                    </p>
                    <p className="text-gray-600 mb-3">
                      {site.description}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>{t('historyPage.sites.site.significanceLabel', 'اهمیت')}:</strong> {site.significance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Battle of Nahavand */}
      <section className="py-16 px-6 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('historyPage.battle.title', 'معرکه نهاوند')}
              </h2>
              <p className="text-lg opacity-90 leading-relaxed mb-6">
                {t('historyPage.battle.description', 'معرکه نهاوند در سال 21 هجری قمری (642 میلادی) یکی از مهم‌ترین نبردهای تاریخ ایران و اسلام محسوب می‌شود. این نبرد که به "فتح الفتوح" معروف است، پایان حکومت ساسانیان و آغاز دوران اسلامی در ایران را رقم زد.')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{t('historyPage.battle.commanderMuslim', 'فرمانده مسلمانان: نعمان بن مقرن')}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{t('historyPage.battle.commanderSasanian', 'فرمانده ساسانیان: فیروزان')}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{t('historyPage.battle.outcome', 'نتیجه: پیروزی مسلمانان و فتح ایران')}</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/history/war.jpg"
                alt={t('historyPage.battle.imageAlt', 'تصویری از معرکه نهاوند')} // Generic alt text
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Era */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('historyPage.modern.title', 'نهاوند امروز')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {t('historyPage.modern.content', 'امروزه نهاوند شهری مدرن است که در عین حفظ هویت تاریخی خود، به سمت توسعه و پیشرفت حرکت می‌کند. صنایع دستی لالجین، گردشگری و کشاورزی از مهم‌ترین بخش‌های اقتصادی این شهر محسوب می‌شوند.')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-2">{t('historyPage.modern.item1.title', 'میراث فرهنگی')}</h3>
              <p className="text-blue-700">{t('historyPage.modern.item1.description', 'حفظ و احیای آثار تاریخی')}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-900 mb-2">{t('historyPage.modern.item2.title', 'صنایع دستی')}</h3>
              <p className="text-green-700">{t('historyPage.modern.item2.description', 'مرکز تولید سفال و سرامیک')}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-2">{t('historyPage.modern.item3.title', 'گردشگری')}</h3>
              <p className="text-purple-700">{t('historyPage.modern.item3.description', 'جذب گردشگران داخلی و خارجی')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
