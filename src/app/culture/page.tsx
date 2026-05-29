"use client";

import Image from 'next/image';
import { Palette, Music, Utensils, Users, Heart, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection'; // Assuming this hook is available

export default function CulturePage() {
  const { t } = useTranslation();
  const { dir } = useDirection(); // Use dir directly if it provides 'rtl' or 'ltr'

  const culturalAspects = [
    {
      icon: Palette,
      title: t('culturePage.culturalAspects.handicrafts.title'),
      description: t('culturePage.culturalAspects.handicrafts.description'),
      image: '/images/culture/handicrafts.jpg',
      details: [
        t('culturePage.culturalAspects.handicrafts.details1'),
        t('culturePage.culturalAspects.handicrafts.details2'),
        t('culturePage.culturalAspects.handicrafts.details3'),
        t('culturePage.culturalAspects.handicrafts.details4')
      ]
    },
    {
      icon: Music,
      title: t('culturePage.culturalAspects.localMusic.title'),
      description: t('culturePage.culturalAspects.localMusic.description'),
      image: '/images/culture/local-music.jpg',
      details: [
        t('culturePage.culturalAspects.localMusic.details1'),
        t('culturePage.culturalAspects.localMusic.details2'),
        t('culturePage.culturalAspects.localMusic.details3'),
        t('culturePage.culturalAspects.localMusic.details4')
      ]
    },
    {
      icon: Utensils,
      title: t('culturePage.culturalAspects.traditionalFood.title'),
      description: t('culturePage.culturalAspects.traditionalFood.description'),
      image: '/images/culture/traditional-food.jpg',
      details: [
        t('culturePage.culturalAspects.traditionalFood.details1'),
        t('culturePage.culturalAspects.traditionalFood.details2'),
        t('culturePage.culturalAspects.traditionalFood.details3'),
        t('culturePage.culturalAspects.traditionalFood.details4')
      ]
    },
    {
      icon: Users,
      title: t('culturePage.culturalAspects.tradition.title'),
      description: t('culturePage.culturalAspects.tradition.description'),
      image: '/images/culture/tradition.jpg',
      details: [
        t('culturePage.culturalAspects.tradition.details1'),
        t('culturePage.culturalAspects.tradition.details2'),
        t('culturePage.culturalAspects.tradition.details3'),
        t('culturePage.culturalAspects.tradition.details4')
      ]
    }
  ];

  const festivals = [
    {
      name: t('culturePage.festivals.festival1.name'),
      date: t('culturePage.festivals.festival1.date'),
      description: t('culturePage.festivals.festival1.description'),
      image: '/images/culture/pottery.jpg'
    },
    {
      name: t('culturePage.festivals.festival2.name'),
      date: t('culturePage.festivals.festival2.date'),
      description: t('culturePage.festivals.festival2.description'),
      image: '/images/culture/rose.jpg'
    },
    {
      name: t('culturePage.festivals.festival3.name'),
      date: t('culturePage.festivals.festival3.date'),
      description: t('culturePage.festivals.festival3.description'),
      image: '/images/culture/music.jpg'
    }
  ];

  return (
    <div className="min-h-screen" dir={dir}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('culturePage.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {t('culturePage.hero.description')}
          </p>
        </div>
      </section>

      {/* Cultural Aspects */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('culturePage.culturalAspects.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('culturePage.culturalAspects.description')}
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
                  <div className="flex items-center space-x-3 space-x-reverse mb-6  gap-3">
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
                      <li key={detailIndex} className="flex items-start space-x-3 space-x-reverse gap-3">
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
                    alt={t(`culturePage.culturalAspects.handicrafts.alt`, 'صنایع دستی')} // Translate alt text
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
              {t('culturePage.festivals.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('culturePage.festivals.description')}
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
                    alt={t(`culturePage.festivals.festival${index + 1}.alt`, 'تصویر جشنواره')} // Translate alt text
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
              {t('culturePage.heritage.title')}
            </h2>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              {t('culturePage.heritage.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action (Optional) */}
      {/* 
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('culturePage.cta.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('culturePage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {t('culturePage.cta.button1')}
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              {t('culturePage.cta.button2')}
            </button>
          </div>
        </div>
      </section> 
      */}
    </div>
  );
}
