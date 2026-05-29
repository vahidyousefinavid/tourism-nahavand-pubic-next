'use client'; 

import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';

export default function NoResults() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection(); 

  return (
    <div
      dir={dir}
      className={`col-span-full text-center py-12 text-gray-600 `}
    >
      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 className="text-xl font-semibold mb-2">
        {t('noEvents.title')} 
      </h3>
      <p>
        {t('noEvents.subtitle')} 
      </p>
    </div>
  );
}
