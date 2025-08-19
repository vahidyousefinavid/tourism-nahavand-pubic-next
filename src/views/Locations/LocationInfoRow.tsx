import { LucideIcon } from 'lucide-react';

export const LocationInfoRow = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
    <Icon className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

// ----- NoResults.tsx -----
import { MapPin } from 'lucide-react';

export const NoResults = () => (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4">
      <MapPin className="w-16 h-16 mx-auto" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">هیچ مکانی یافت نشد</h3>
    <p className="text-gray-600">لطفاً فیلترهای خود را تغییر دهید و دوباره تلاش کنید</p>
  </div>
);