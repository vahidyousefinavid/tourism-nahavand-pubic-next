'use client';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { Mountain, Users, Map, Compass, CheckCircle2 } from 'lucide-react';

export default function CityInfo() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  const stats = [
    {
      icon: <Users className="w-7 h-7" />,
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      value: t('cityInfo.population.value', '۱۲۰,۰۰۰+'),
      label: t('cityInfo.population.label', 'نفر ساکن'),
    },
    {
      icon: <Mountain className="w-7 h-7" />,
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50',
      value: t('cityInfo.height.value', '۱,۷۴۰'),
      label: t('cityInfo.height.label', 'متر ارتفاع'),
    },
    {
      icon: <Map className="w-7 h-7" />,
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      value: t('cityInfo.area.value', '۱,۵۲۴'),
      label: t('cityInfo.area.label', 'کیلومتر مربع'),
    },
    {
      icon: <Compass className="w-7 h-7" />,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      value: '۱۸۰+',
      label: t('cityInfo.destinationsLabel', 'مقصد گردشگری'),
    },
  ];

  const highlights = [
    t('cityInfo.destinations.list.1', 'چشمه‌های نهاوند'),
    t('cityInfo.destinations.list.2', 'آبشارهای سراب گیان'),
    t('cityInfo.destinations.list.3', 'فرهنگ محلی'),
    t('cityInfo.destinations.list.4', 'باغ‌های تاریخی'),
  ];

  return (
    <section dir={dir} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
          >
            {t('cityInfo.sectionTag', 'آمار و اطلاعات شهر')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-3 leading-tight"
          >
            {t('cityInfo.titleMain', 'نهاوند،')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              {t('cityInfo.titleAccent', 'شهری کهن در دل زاگرس')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xl mx-auto text-base"
          >
            {t('cityInfo.description', 'هزاران سال تاریخ، طبیعتی بکر و فرهنگی غنی در قلب ایران')}
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${stat.bg} rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} text-white rounded-2xl flex items-center justify-center mb-4 shadow-md`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1 w-full">
            <h3
              className={`text-2xl font-black text-gray-900 mb-2 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {t('cityInfo.destinations.title', '۱۸۰+ مقصد گردشگری')}
            </h3>
            <p
              className={`text-gray-500 text-sm mb-6 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              {t(
                'cityInfo.destinations.subtitle',
                'برترین تجربه‌ها از مردم و گردشگران'
              )}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 text-gray-700 font-medium ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src="/images/back32.jpg"
                alt="نهاوند"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
