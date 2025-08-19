import Image from 'next/image';
import { Palette, Music, Utensils, Users, Heart, Star } from 'lucide-react';

export default function CulturePage() {
  const culturalAspects = [
    {
      icon: Palette,
      title: 'صنایع دستی',
      description: 'سفالگری لالجین، قالی‌بافی و صنایع چوبی',
      image: '/images/culture/handicrafts.jpg',
      details: [
        'سفال و سرامیک لالجین با تاریخی چندین هزار ساله',
        'قالی‌بافی سنتی با نقوش محلی',
        'صنایع چوبی و معرق‌کاری',
        'طلاکاری و نقره‌کاری'
      ]
    },
    {
      icon: Music,
      title: 'موسیقی محلی',
      description: 'آهنگ‌های سنتی و رقص‌های محلی نهاوند',
      image: '/images/culture/local-music.jpg',
      details: [
        'موسیقی کردی و لری منطقه',
        'سازهای سنتی مثل دف و تنبور',
        'رقص‌های محلی در جشن‌ها',
        'ترانه‌های عاشقانه و حماسی'
      ]
    },
    {
      icon: Utensils,
      title: 'غذاهای محلی',
      description: 'طعم‌های اصیل و سنتی آشپزی نهاوند',
      image: '/images/culture/traditional-food.jpg',
      details: [
        'آش دوغ و آش رشته محلی',
        'کباب کوبیده نهاوندی',
        'دولمه برگ مو و کلم',
        'شیرینی‌های سنتی مثل باقلوا'
      ]
    },
    {
      icon: Users,
      title: 'آداب و رسوم',
      description: 'سنت‌ها و مراسم مردم نهاوند',
      image: '/images/culture/tradition.jpg',
      details: [
        'مراسم عروسی سنتی',
        'جشن نوروز و چهارشنبه سوری',
        'مراسم مذهبی و عزاداری',
        'مهمان‌نوازی اصیل ایرانی'
      ]
    }
  ];

  const festivals = [
    {
      name: 'جشنواره سفال',
      date: 'شهریور ماه',
      description: 'نمایشگاه و جشنواره سالانه صنایع سفالی',
      image: '/images/culture/pottery.jpg'
    },
    {
      name: 'جشن گلاب‌گیری',
      date: 'اردیبهشت ماه',
      description: 'برداشت گل محمدی و تولید گلاب',
      image: '/images/culture/rose.jpg'
    },
    {
      name: 'جشنواره موسیقی محلی',
      date: 'مهر ماه',
      description: 'اجرای موسیقی سنتی و محلی',
      image: '/images/culture/music.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            فرهنگ غنی نهاوند
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            آشنایی با سنت‌ها، هنرها و فرهنگ اصیل مردم نهاوند
          </p>
        </div>
      </section>

      {/* Cultural Aspects */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              جنبه‌های فرهنگی
            </h2>
            <p className="text-lg text-gray-600">
              کشف ابعاد مختلف فرهنگ و هنر نهاوند
            </p>
          </div>

          <div className="space-y-16">
            {culturalAspects.map((aspect, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-3 space-x-reverse mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <aspect.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {aspect.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    {aspect.description}
                  </p>
                  <ul className="space-y-3">
                    {aspect.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3 space-x-reverse">
                        <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-96 rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <Image
                    src={aspect.image}
                    alt={aspect.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              جشنواره‌ها و رویدادهای فرهنگی
            </h2>
            <p className="text-lg text-gray-600">
              برنامه‌های سالانه که فرهنگ نهاوند را زنده نگه می‌دارند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {festivals.map((festival, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48">
                  <Image
                    src={festival.image}
                    alt={festival.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      {festival.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {festival.name}
                  </h3>
                  <p className="text-gray-600">
                    {festival.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              میراث فرهنگی ما
            </h2>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              فرهنگ نهاوند، ترکیبی زیبا از سنت‌های کهن ایرانی و تأثیرات محلی است. 
              از صنایع دستی بی‌نظیر گرفته تا موسیقی دلنشین و غذاهای خوشمزه، 
              همه و همه نشان‌دهنده غنای فرهنگی این سرزمین کهن است. 
              ما افتخار می‌کنیم که وارث چنین میراث ارزشمندی هستیم.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            تجربه فرهنگ اصیل نهاوند
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            با ما همراه شوید تا از نزدیک با فرهنگ غنی و سنت‌های زیبای نهاوند آشنا شوید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              مشاهده رویدادهای فرهنگی
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              بازدید از کارگاه‌های صنایع دستی
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}