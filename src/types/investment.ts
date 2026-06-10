export type Currency = 'IRT' | 'IRR' | 'USD' | 'EUR' | 'AED' | 'CNY' | 'GBP';

export interface MoneyValue {
  amount: number;
  currency: Currency;
}

export interface InvestmentOpportunity {
  id: string;
  title: Record<string, string>; // { fa: '...', en: '...', ... }
  shortDescription: Record<string, string>; // خلاصه کوتاه برای کارت
  fullDescription: Record<string, string>; // توضیح کامل و کاربرپسند
  images?: string[];
  mainImageIndex?: number;
  image?: string; // deprecated – use images[mainImageIndex]
  category: 'real-estate' | 'agriculture' | 'tourism' | 'handicrafts' | 'industry' | 'technology';
  icon: string; // نام آیکون از lucide-react

  // اطلاعات سرمایه‌گذاری
  minInvestment?: MoneyValue | null;
  maxInvestment?: MoneyValue | null;
  expectedReturn?: string; // بازدهی مورد انتظار
  timeframe?: string; // بازه زمانی
  riskLevel?: 'low' | 'medium' | 'high'; // سطح ریسک
  
  // جزئیات بیشتر
  features: Record<string, string[]>; // ویژگی‌ها و مزایا
  requirements: Record<string, string[]>; // شرایط و الزامات
  benefits: Record<string, string[]>; // مزایا
  
  // اطلاعات تماس و پشتیبانی
  contactInfo?: Record<string, string>;
  supportPhone?: string;
  
  status: 'active' | 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentArea {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  icon: string;
  image: string;
  keyPoints: Record<string, string[]>;
  opportunitiesCount?: number;
}

export interface InvestmentAdvantage {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  icon: string;
}