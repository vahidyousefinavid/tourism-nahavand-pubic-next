import Image from 'next/image';
import { Users, Target, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'مجید یوسفی نوید',
      role: 'شهردار',
      image: '/images/mayor.jpg',
      // description: 'متخصص گردشگری با بیش از 10 سال تجربه'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            درباره نهاوند گردی
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            ما متعهد به معرفی زیبایی‌ها و جاذبه‌های بی‌نظیر شهر تاریخی نهاوند هستیم
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ماموریت ما</h3>
              <p className="text-gray-600 leading-relaxed">
                معرفی و ترویج جاذبه‌های گردشگری نهاوند و ارائه بهترین خدمات گردشگری 
                به مسافران و علاقه‌مندان به تاریخ و فرهنگ ایران
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ارزش‌های ما</h3>
              <p className="text-gray-600 leading-relaxed">
                احترام به میراث فرهنگی، ارائه خدمات با کیفیت، حفظ محیط زیست 
                و ایجاد تجربه‌ای فراموش‌نشدنی برای مسافران
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">چشم‌انداز ما</h3>
              <p className="text-gray-600 leading-relaxed">
                تبدیل شدن به مرجع اصلی اطلاعات گردشگری نهاوند و کمک به رشد 
                صنعت گردشگری پایدار در این منطقه تاریخی
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Nahavand */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                چرا نهاوند؟
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  نهاوند، شهری با تاریخی کهن و فرهنگی غنی است که در استان همدان واقع شده است. 
                  این شهر به عنوان یکی از مراکز مهم تمدن ایران باستان شناخته می‌شود.
                </p>
                <p>
                  از گنجنامه‌های داریوش و خشایارشا گرفته تا صنایع دستی بی‌نظیر لالجین، 
                  نهاوند گنجینه‌ای از تاریخ، هنر و فرهنگ ایرانی است.
                </p>
                <p>
                  ما در نهاوند گردی، متعهد به معرفی این زیبایی‌ها و ایجاد تجربه‌ای 
                  فراموش‌نشدنی برای شما هستیم.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/history/now.jpg"
                alt="نهاوند"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               شهرداری نهاوند
            </h2>
            {/* <p className="text-lg text-gray-600">
              مجید یوسفی نوید
            </p> */}
          </div>

          <div 
          // className="grid grid-cols-1 md:grid-cols-3 gap-8"
          className='flex justify-center'
          >
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white w-[400px] rounded-2xl shadow-lg overflow-hidden card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  {/* <p className="text-gray-600">
                    {member.description}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              تماس با ما
            </h2>
            <p className="text-lg opacity-90">
              برای اطلاعات بیشتر و مشاوره رایگان با ما در تماس باشید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">تلفن تماس</h3>
              <p className="opacity-90">081-33334444</p>
              <p className="opacity-90">09123456789</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">ایمیل</h3>
              <p className="opacity-90">info@nahavandtour.ir</p>
              <p className="opacity-90">support@nahavandtour.ir</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">آدرس</h3>
              <p className="opacity-90">نهاوند،شهرداری نهاوند</p>
              {/* <p className="opacity-90">ساختمان گردشگری، طبقه دوم</p> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}