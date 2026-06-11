'use client';

import { Modal } from '@/components/ui/Modal';
import { InvestmentOpportunity } from '@/types/investment';
import { formatMoney } from '@/lib/format-money';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { X, MapPin, Clock, TrendingUp, Shield, CheckCircle, AlertCircle, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface InvestmentModalProps {
  opportunity: InvestmentOpportunity | null;
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
}

export default function InvestmentModal({
  opportunity,
  isOpen,
  onClose,
  locale = 'fa',
}: InvestmentModalProps) {
  const { t, i18n } = useTranslation();
  const { isRTL, dir } = useDirection();

  const lang = locale || i18n.language;
  const [activeImg, setActiveImg] = useState(0);

  const getLocalizedValue = (value: Record<string, string> | undefined) => {
    if (!value) return '';
    return value[lang] ?? value.fa ?? Object.values(value)[0] ?? '';
  };

  const getLocalizedArray = (value: Record<string, string[]> | undefined) => {
    if (!value) return [];
    return value[lang] ?? value.fa ?? Object.values(value)[0] ?? [];
  };

  if (!opportunity) return null;

  const title = opportunity.title?.[lang] || opportunity.title?.fa || '';
  const fullDescription = opportunity.fullDescription?.[lang] || opportunity.fullDescription?.fa || '';

  const images = opportunity.images?.length ? opportunity.images : (opportunity.image ? [opportunity.image] : []);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const currentImageUrl = images.length
    ? `${apiUrl}${images[activeImg]}`
    : '/images/back2.jpg';

  const prevImg = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % images.length);

  // رنگ‌بندی بر اساس دسته‌بندی
  const getCategoryAccent = () => {
    const colors: Record<string, string> = {
      'real-estate': 'from-blue-500 to-blue-600',
      'agriculture': 'from-green-500 to-green-600',
      'tourism': 'from-purple-500 to-purple-600',
      'handicrafts': 'from-amber-500 to-amber-600',
      'industry': 'from-gray-500 to-gray-600',
      'technology': 'from-cyan-500 to-cyan-600',
    };
    return colors[opportunity.category] || colors['real-estate'];
  };

  const getRiskBadge = () => {
    const riskLevel = opportunity.riskLevel || 'medium';
    const config = {
      low: { bg: 'bg-green-100', text: 'text-green-700', label: t('investmentPage.opportunities.risk.low') },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: t('investmentPage.opportunities.risk.medium') },
      high: { bg: 'bg-red-100', text: 'text-red-700', label: t('investmentPage.opportunities.risk.high') },
    };
    const c = config[riskLevel];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
        <Shield className="w-4 h-4" />
        {c.label}
      </span>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div dir={dir} className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* carousel تصاویر */}
        <div className="relative h-64 rounded-xl overflow-hidden">
          <Image src={currentImageUrl} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {images.length > 1 && (
            <>
              <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 z-10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 z-10">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1 z-10">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            </>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`bg-gradient-to-r ${getCategoryAccent()} text-white px-4 py-1.5 rounded-full text-sm font-medium`}>
                  {getLocalizedValue({ [lang]: getCategoryLabel(opportunity.category, lang), fa: getCategoryLabel(opportunity.category, 'fa') })}
                </span>
                {getRiskBadge()}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                opportunity.status === 'active' ? 'bg-green-500 text-white' :
                opportunity.status === 'pending' ? 'bg-yellow-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {opportunity.status === 'active' ? t('investmentPage.opportunities.status.active') :
                 opportunity.status === 'pending' ? t('investmentPage.opportunities.status.pending') :
                 t('investmentPage.opportunities.status.completed')}
              </span>
            </div>
          </div>
        </div>

        {/* thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}>
                <img
                  src={`${apiUrl}${img}`}
                  className={`w-16 h-16 object-cover rounded-lg border-2 transition-all ${i === activeImg ? 'border-blue-500' : i === (opportunity.mainImageIndex ?? 0) ? 'border-yellow-400' : 'border-gray-200'}`}
                  alt=""
                />
              </button>
            ))}
          </div>
        )}

        {/* توضیحات کامل */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('investmentPage.opportunities.description')}</h3>
          <p className="text-gray-700 leading-relaxed">{fullDescription}</p>
        </div>

        {/* اطلاعات کلیدی سرمایه‌گذاری */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-gray-50 rounded-xl ${isRTL ? 'md:grid-flow-row-reverse' : ''}`}>
          {opportunity.minInvestment && (
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('investmentPage.opportunities.minInvestment')}</p>
                <p className="font-semibold text-gray-900">{formatMoney(opportunity.minInvestment, lang)}</p>
              </div>
            </div>
          )}
          {opportunity.expectedReturn && (
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('investmentPage.opportunities.expectedReturn')}</p>
                <p className="font-semibold text-gray-900">{opportunity.expectedReturn}</p>
              </div>
            </div>
          )}
          {opportunity.timeframe && (
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('investmentPage.opportunities.timeframe')}</p>
                <p className="font-semibold text-gray-900">{opportunity.timeframe}</p>
              </div>
            </div>
          )}
          {opportunity.maxInvestment && (
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('investmentPage.opportunities.maxInvestment')}</p>
                <p className="font-semibold text-gray-900">{formatMoney(opportunity.maxInvestment, lang)}</p>
              </div>
            </div>
          )}
        </div>

        {/* ویژگی‌ها و مزایا */}
        {(opportunity.features || opportunity.benefits) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunity.features && getLocalizedArray(opportunity.features).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {t('investmentPage.opportunities.features')}
                </h3>
                <ul className="space-y-2">
                  {getLocalizedArray(opportunity.features).map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {opportunity.benefits && getLocalizedArray(opportunity.benefits).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  {t('investmentPage.opportunities.benefits')}
                </h3>
                <ul className="space-y-2">
                  {getLocalizedArray(opportunity.benefits).map((benefit, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* شرایط و الزامات */}
        {opportunity.requirements && getLocalizedArray(opportunity.requirements).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              {t('investmentPage.opportunities.requirements')}
            </h3>
            <ul className="space-y-2">
              {getLocalizedArray(opportunity.requirements).map((req, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-xs font-medium text-amber-700 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* اطلاعات تماس */}
        {(opportunity.supportPhone || opportunity.contactInfo) && (
          <div className={`p-5 bg-green-50 rounded-xl ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('investmentPage.opportunities.contactTitle')}</h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isRTL ? 'md:grid-flow-row-reverse' : ''}`}>
              {opportunity.supportPhone && (
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('investmentPage.opportunities.contact.phone')}</p>
                    <p className="font-semibold text-gray-900 dir-ltr">{opportunity.supportPhone}</p>
                  </div>
                </div>
              )}
              {opportunity.contactInfo?.email && (
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('investmentPage.opportunities.contact.email')}</p>
                    <p className="font-semibold text-gray-900">{opportunity.contactInfo.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* دکمه اقدام */}
        {/* <div className={`flex flex-col sm:flex-row gap-3 pt-4 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            {t('investmentPage.opportunities.contactInquiry')}
          </button>
          <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            {t('investmentPage.opportunities.downloadBrochure')}
          </button>
        </div> */}
      </div>
    </Modal>
  );
}

function getCategoryLabel(category: string, lang: string): string {
  const labels: Record<string, Record<string, string>> = {
    'real-estate': { fa: 'ملکی و ساختمانی', en: 'Real Estate', ar: 'عقارات', zh: '房地产' },
    'agriculture': { fa: 'کشاورزی', en: 'Agriculture', ar: 'زراعة', zh: '农业' },
    'tourism': { fa: 'گردشگری', en: 'Tourism', ar: 'سياحة', zh: '旅游业' },
    'handicrafts': { fa: 'صنایع دستی', en: 'Handicrafts', ar: 'حرف دستی', zh: '手工艺品' },
    'industry': { fa: 'صنعتی', en: 'Industry', ar: 'صناعة', zh: '工业' },
    'technology': { fa: 'فناوری', en: 'Technology', ar: 'تكنولوجيا', zh: '科技' },
  };
  return labels[category]?.[lang] || labels[category]?.fa || category;
}