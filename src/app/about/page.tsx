'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Users, Target, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { useDirection } from '@/hooks/useDirection';

export default function AboutPage() {
  const { t } = useTranslation();
  const { dir } = useDirection();

  const team = [
    {
      name: t('aboutPage.team.mayor.name'),
      role: t('aboutPage.team.mayor.role'),
      image: '/images/mayor.jpg',
    },
  ];

  return (
    <div className="min-h-screen" dir={dir}>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('aboutPage.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {t('aboutPage.hero.description')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('aboutPage.mission.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutPage.mission.description')}
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('aboutPage.values.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutPage.values.description')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center card-hover">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('aboutPage.vision.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutPage.vision.description')}
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
                {t('aboutPage.aboutNahavand.title')}
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t('aboutPage.aboutNahavand.p1')}</p>
                <p>{t('aboutPage.aboutNahavand.p2')}</p>
                <p>{t('aboutPage.aboutNahavand.p3')}</p>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/history/now.jpg"
                alt={t('aboutPage.aboutNahavand.title')}
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
              {t('aboutPage.team.title')}
            </h2>
          </div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white w-[400px] rounded-2xl shadow-lg overflow-hidden card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={t('aboutPage.team.mayor.imageAlt')}
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
              {t('aboutPage.contact.title')}
            </h2>
            <p className="text-lg opacity-90">
              {t('aboutPage.contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Phone */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('aboutPage.contact.phoneTitle')}</h3>
              <p className="opacity-90">{t('aboutPage.contact.phone1')}</p>
              <p className="opacity-90">{t('aboutPage.contact.phone2')}</p>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('aboutPage.contact.emailTitle')}</h3>
              <p className="opacity-90">{t('aboutPage.contact.email1')}</p>
              <p className="opacity-90">{t('aboutPage.contact.email2')}</p>
            </div>

            {/* Address */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('aboutPage.contact.addressTitle')}</h3>
              <p className="opacity-90">{t('aboutPage.contact.address')}</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
