export type Currency = 'IRT' | 'IRR' | 'USD' | 'EUR' | 'AED' | 'CNY' | 'GBP';

export interface MoneyValue {
  amount: number;
  currency: Currency;
}

const LOCALE_MAP: Record<string, string> = {
  fa: 'fa-IR',
  ar: 'ar-SA',
  zh: 'zh-CN',
  en: 'en-US',
};

const ISO_MAP: Record<Currency, string> = {
  IRT: 'IRR',
  IRR: 'IRR',
  USD: 'USD',
  EUR: 'EUR',
  AED: 'AED',
  CNY: 'CNY',
  GBP: 'GBP',
};

const POST_SYMBOL: Set<Currency> = new Set(['IRT', 'IRR', 'AED']);

const SYMBOL_MAP: Record<Currency, string> = {
  IRT: 'تومان',
  IRR: 'ریال',
  USD: '$',
  EUR: '€',
  AED: 'د.إ',
  CNY: '¥',
  GBP: '£',
};

export function formatMoney(
  value: MoneyValue | string | null | undefined,
  locale = 'fa',
): string {
  if (!value) return '';
  if (typeof value === 'string') return value;

  const { amount, currency } = value as MoneyValue;
  const bcp = LOCALE_MAP[locale] ?? 'fa-IR';
  const symbol = SYMBOL_MAP[currency] ?? currency;

  let formatted: string;
  try {
    formatted = new Intl.NumberFormat(bcp, {
      currency: ISO_MAP[currency] ?? 'IRR',
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    formatted = amount.toLocaleString();
  }

  return POST_SYMBOL.has(currency)
    ? `${formatted} ${symbol}`
    : `${symbol}${formatted}`;
}

export function isMoneyValue(v: unknown): v is MoneyValue {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as MoneyValue).amount === 'number' &&
    typeof (v as MoneyValue).currency === 'string'
  );
}
