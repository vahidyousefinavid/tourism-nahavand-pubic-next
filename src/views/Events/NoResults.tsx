import React from 'react';
import { Calendar } from 'lucide-react';

export default function NoResults() {
  return (
    <div className="col-span-full text-center py-12 text-gray-600">
      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <h3 className="text-xl font-semibold mb-2">هیچ رویدادی یافت نشد</h3>
      <p>لطفاً فیلترهای خود را تغییر دهید و دوباره تلاش کنید</p>
    </div>
  );
}
