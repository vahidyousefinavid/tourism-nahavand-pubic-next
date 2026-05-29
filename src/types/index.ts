export interface Location {
  id: string;

  // چندزبانه پویا
  name: Record<string, string>; // { fa: '...', en: '...', ... }
  description: Record<string, string>; // { fa: '...', en: '...', ... }

  category: 'historical' | 'natural' | 'cultural' | 'religious';

  images: string[];
  mainImageIndex: number;

  latlng?: {
    lat: number;
    lng: number;
  };

  facilities?: Record<string, string[]>; // { fa: ['وای‌فای'], en: ['Wi-Fi'] }

  openingHours: Record<string, string>; // { fa: '۸-۲۰', en: '8am-8pm' }
  entryFee: Record<string, string>; // { fa: 'رایگان', en: 'Free' }

  rating: number;
  views: number;

  createdAt: string; // یا Date اگر سرور ISO string برگردونه بهتره string بذاری
  updatedAt: string;
}

export interface EventTimeRange {
  id: string;
  mode: 'continuous' | 'daily' | 'weekly' | 'specificDates' | 'multipleRanges';
  startDate?: string;
  endDate?: string;
  timeStart?: string;
  timeEnd?: string;
  daysOfWeek?: string; // "1,3,5" -> میشه آرایه کنیم توی UI
  specificDates?: string; // JSON string یا آرایه بعد از پارس کردن
  exceptions?: string; // JSON string یا آرایه بعد از پارس کردن
  ranges?: string; // JSON string یا آرایه بعد از پارس کردن
}

export interface Event {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  image?: string;
  location: Record<string, string>; // چندزبانه مثل Location.name
  latlng?: { lat: number; lng: number };
  price?: number;
  capacity: number;
  registered: number;
  organizer: Record<string, string>;
  views: number;
  timeRanges: EventTimeRange[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  sortBy: string;
}

export type AppLocale = "fa" | "en" | "ar" | "zh";