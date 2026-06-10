'use client';
import { Clock, DollarSign, Star, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AppLocale, Location } from '@/types';
import { useTranslation } from 'react-i18next';

interface LocationModalContentProps {
  location: Location;
  openInMaps: (coordinates: [number, number]) => void;
  locale: AppLocale;
}

export function LocationModalContent({ location, openInMaps, locale }: LocationModalContentProps) {
  const { t } = useTranslation();

  // تعیین جهت متن بر اساس زبان
  const isRTL = locale === 'fa' || locale === 'ar';

  // دریافت داده‌ها بر اساس زبان انتخاب شده، با فال‌بک به فارسی
  const name = location.name?.[locale] || location.name?.fa || '';
  const description = location.description?.[locale] || location.description?.fa || '';
  const openingHours = location.openingHours?.[locale] || location.openingHours?.fa || '';
  const entryFeeRaw = location.entryFee as any;
  const entryFee = !entryFeeRaw
    ? ''
    : entryFeeRaw?.amount === 0
      ? t('locationModal.free', 'رایگان')
      : entryFeeRaw?.amount
        ? new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(entryFeeRaw.amount) + (entryFeeRaw.currency === 'IRT' ? ' تومان' : entryFeeRaw.currency === 'IRR' ? ' ریال' : ` ${entryFeeRaw.currency}`)
        : '';
  const facilities = location.facilities?.[locale] || location.facilities?.fa || [];

  // انتخاب تصویر اصلی
  const mainImageSrc = location.images?.[location.mainImageIndex || 0] || '';
  const fullImageSrc = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL + mainImageSrc
    : mainImageSrc;

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full ${isRTL ? 'text-right' : 'text-left'}`}
    >
      {/* Main Image Section */}
      <div className="relative w-full h-64 md:h-80 flex-shrink-0">
        <img
          src={fullImageSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6 flex-grow">
        
        {/* Description */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('locationModal.description')}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {description}
          </p>
        </section>

        {/* Details Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('locationModal.generalInfo')}
            </h3>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  {t('locationModal.visitingHours')}: {openingHours}
                </span>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  {t('locationModal.entryFee')}: {entryFee}
                </span>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Star className="w-5 h-5 text-yellow-400 fill-current flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  {t('locationModal.rating')}: {location.rating} {t('locationModal.ratingOutOf')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('locationModal.facilities')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {facilities.length > 0 ? (
                facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-medium"
                  >
                    {facility}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">
                  {t('locationModal.noFacilities')}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Map and Navigation */}
        {location.latlng && (
          <section className="pt-4 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t('locationModal.location')}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <MapPin className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-gray-500 text-sm mb-4 font-mono">
                {location.latlng.lat}, {location.latlng.lng}
              </p>
              <Button
                onClick={() =>
                  openInMaps([location?.latlng?.lat, location.latlng?.lng])
                }
                className="w-full md:w-auto"
              >
                <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Navigation className="w-4 h-4" />
                  {t('locationModal.viewOnMap')}
                </span>
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}