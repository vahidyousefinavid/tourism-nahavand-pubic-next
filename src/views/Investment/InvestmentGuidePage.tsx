'use client';

import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import Image from 'next/image';
import { Building2, TrendingUp, Users, Shield, MapPin, Lightbulb, DollarSign } from 'lucide-react';

export default function InvestmentGuidePage() {
  const { t } = useTranslation();
  const { dir } = useDirection();

  const investmentAreas = [
    {
      icon: Building2,
      title: t('investmentPage.investmentAreas.realEstate.title'),
      description: t('investmentPage.investmentAreas.realEstate.description'),
      image: '/images/back2.jpg',
      details: [
        t('investmentPage.investmentAreas.realEstate.detail1'),
        t('investmentPage.investmentAreas.realEstate.detail2'),
        t('investmentPage.investmentAreas.realEstate.detail3'),
      ]
    },
    {
      icon: TrendingUp,
      title: t('investmentPage.investmentAreas.agriculture.title'),
      description: t('investmentPage.investmentAreas.agriculture.description'),
      image: '/images/back3.jpg',
      details: [
        t('investmentPage.investmentAreas.agriculture.detail1'),
        t('investmentPage.investmentAreas.agriculture.detail2'),
        t('investmentPage.investmentAreas.agriculture.detail3'),
      ]
    },
    {
      icon: Users,
      title: t('investmentPage.investmentAreas.tourism.title'),
      description: t('investmentPage.investmentAreas.tourism.description'),
      image: '/images/back1.jpg',
      details: [
        t('investmentPage.investmentAreas.tourism.detail1'),
        t('investmentPage.investmentAreas.tourism.detail2'),
        t('investmentPage.investmentAreas.tourism.detail3'),
      ]
    },
    {
      icon: Shield,
      title: t('investmentPage.investmentAreas.handicrafts.title'),
      description: t('investmentPage.investmentAreas.handicrafts.description'),
      image: '/images/culture/handicrafts.jpg',
      details: [
        t('investmentPage.investmentAreas.handicrafts.detail1'),
        t('investmentPage.investmentAreas.handicrafts.detail2'),
        t('investmentPage.investmentAreas.handicrafts.detail3'),
      ]
    }
  ];

  const advantages = [
    {
      icon: MapPin,
      title: t('investmentPage.advantages.location.title'),
      description: t('investmentPage.advantages.location.description'),
    },
    {
      icon: DollarSign,
      title: t('investmentPage.advantages.incentives.title'),
      description: t('investmentPage.advantages.incentives.description'),
    },
    {
      icon: TrendingUp,
      title: t('investmentPage.advantages.potential.title'),
      description: t('investmentPage.advantages.potential.description'),
    },
  ];

  return (
    <div dir={dir} className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('investmentPage.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {t('investmentPage.hero.description')}
          </p>
        </div>
      </section>

      {/* Investment Areas Guide Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Lightbulb className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('investmentPage.areas.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('investmentPage.areas.description')}
            </p>
          </div>

          <div className="space-y-16">
            {investmentAreas.map((area, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <area.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    {area.description}
                  </p>
                  <ul className="space-y-3">
                    {area.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-96 rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('investmentPage.advantages.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('investmentPage.advantages.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <advantage.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('investmentPage.cta.title')}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t('investmentPage.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
              {t('investmentPage.cta.button1')}
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
              {t('investmentPage.cta.button2')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}