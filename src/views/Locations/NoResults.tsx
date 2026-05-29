'use client';

import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

export function NoResults() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection(); 

  return (
    <div dir={dir} className="col-span-full text-center py-12 text-gray-600 ">
      <div className="text-gray-400 mb-4">
        <MapPin className="w-16 h-16 mx-auto" />
      </div>

      <h3
        className={`text-xl font-semibold text-gray-900 mb-2`}
      >
        {t('noResults.title')}
      </h3>

      <p
        className={`text-gray-600`}
      >
        {t('noResults.subtitle')}
      </p>
    </div>
  );
}
