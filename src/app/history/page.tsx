import Image from 'next/image';
import { Clock, Crown, Scroll, Building, Star } from 'lucide-react';

export default function HistoryPage() {
  const timelinePeriods = [
    {
      period: 'دوران باستان (قبل از اسلام)',
      years: '550 ق.م - 651 م',
      icon: Crown,
      color: 'bg-purple-100 text-purple-600',
      image: '/images/history/20.jpg',
      events: [
        'حکومت هخامنشیان و حکاکی گنجنامه توسط داریوش و خشایارشا',
        'دوران اشکانیان و ساسانیان',
        'نهاوند به عنوان یکی از مراکز مهم ایران باستان',
        'معرکه نهاوند در سال 21 هجری قمری'
      ]
    },
    {
      period: 'دوران اسلامی اولیه',
      years: '651 - 1000 م',
      icon: Scroll,
      color: 'bg-green-100 text-green-600',
      image: '/images/history/islam.jpg',
      events: [
        'فتح نهاوند توسط مسلمانان',
        'تبدیل شدن به مرکز مهم اداری',
        'رشد علم و فرهنگ اسلامی',
        'ساخت مساجد و مدارس مهم'
      ]
    },
    {
      period: 'دوران سلجوقیان و مغول',
      years: '1000 - 1500 م',
      icon: Building,
      color: 'bg-blue-100 text-blue-600',
      image: '/images/history/mongolia.jpg',
      events: [
        'حکومت سلجوقیان و رشد معماری',
        'حمله مغولان و تخریبات',
        'بازسازی و احیای شهر',
        'رشد صنایع دستی و تجارت'
      ]
    },
    {
      period: 'دوران صفویه تا قاجار',
      years: '1500 - 1925 م',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      image: '/images/history/safavid.jpg',
      events: [
        'رشد صنعت سفالگری در لالجین',
        'ساخت بناهای مهم صفوی',
        'توسعه کشاورزی و باغداری',
        'تقویت هویت فرهنگی منطقه'
      ]
    },
    {
      period: 'دوران معاصر',
      years: '1925 - اکنون',
      icon: Clock,
      color: 'bg-red-100 text-red-600',
      image: '/images/history/now.jpg',
      events: [
        'مدرنیزاسیون و توسعه شهری',
        'حفظ و مرمت آثار تاریخی',
        'رشد صنعت گردشگری',
        'ثبت جهانی صنایع دستی لالجین'
      ]
    }
  ];

  const historicalSites = [
    {
      name: 'گنجنامه نهاوند',
      period: 'هخامنشی',
      description: 'کتیبه‌های سنگی داریوش و خشایارشا',
      significance: 'یکی از مهم‌ترین آثار هخامنشی در ایران'
    },
    {
      name: 'قلعه نهاوند',
      period: 'ساسانی - اسلامی',
      description: 'بقایای قلعه تاریخی شهر',
      significance: 'شاهد معرکه مهم نهاوند'
    },
    {
      name: 'مسجد جامع نهاوند',
      period: 'اسلامی',
      description: 'یکی از قدیمی‌ترین مساجد منطقه',
      significance: 'نمونه معماری اسلامی اولیه'
    },
    {
      name: 'کارگاه‌های سفال لالجین',
      period: 'صفوی - معاصر',
      description: 'مرکز تولید سفال و سرامیک',
      significance: 'میراث زنده صنایع دستی ایران'
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            تاریخچه نهاوند
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            سفری در طول تاریخ کهن این سرزمین از دوران باستان تا امروز
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            نهاوند در گذر تاریخ
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            نهاوند، شهری با تاریخی درخشان و پرافتخار است که بیش از دو هزار و پانصد سال 
            شاهد رویدادهای مهم تاریخی بوده است. از دوران هخامنشیان تا امروز، این شهر 
            همواره یکی از مراکز مهم فرهنگی، سیاسی و اقتصادی ایران محسوب می‌شده است.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              خط زمانی تاریخ نهاوند
            </h2>
            <p className="text-lg text-gray-600">
              مروری بر دوران‌های مختلف تاریخی این شهر کهن
            </p>
          </div>

          <div className="space-y-12">
            {timelinePeriods.map((period, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
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
                      <li key={eventIndex} className="flex items-start space-x-3 space-x-reverse">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-80 rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <Image
                    src={period.image}
                    alt={period.period}
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
              آثار تاریخی مهم
            </h2>
            <p className="text-lg text-gray-600">
              بناها و مکان‌هایی که تاریخ نهاوند را روایت می‌کنند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {historicalSites.map((site, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {site.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      دوره: {site.period}
                    </p>
                    <p className="text-gray-600 mb-3">
                      {site.description}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>اهمیت:</strong> {site.significance}
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
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                معرکه نهاوند
              </h2>
              <p className="text-lg opacity-90 leading-relaxed mb-6">
                معرکه نهاوند در سال 21 هجری قمری (642 میلادی) یکی از مهم‌ترین 
                نبردهای تاریخ ایران و اسلام محسوب می‌شود. این نبرد که به "فتح الفتوح" 
                معروف است، پایان حکومت ساسانیان و آغاز دوران اسلامی در ایران را رقم زد.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>فرمانده مسلمانان: نعمان بن مقرن</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>فرمانده ساسانیان: فیروزان</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>نتیجه: پیروزی مسلمانان و فتح ایران</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/history/war.jpg"
                alt="معرکه نهاوند"
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
            نهاوند امروز
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            امروزه نهاوند شهری مدرن است که در عین حفظ هویت تاریخی خود، 
            به سمت توسعه و پیشرفت حرکت می‌کند. صنایع دستی لالجین، گردشگری 
            و کشاورزی از مهم‌ترین بخش‌های اقتصادی این شهر محسوب می‌شوند.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-2">میراث فرهنگی</h3>
              <p className="text-blue-700">حفظ و احیای آثار تاریخی</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-900 mb-2">صنایع دستی</h3>
              <p className="text-green-700">مرکز تولید سفال و سرامیک</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-2">گردشگری</h3>
              <p className="text-purple-700">جذب گردشگران داخلی و خارجی</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}