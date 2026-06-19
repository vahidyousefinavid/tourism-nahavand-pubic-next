'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, User, FileText, DollarSign, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { useDirection } from '@/hooks/useDirection';
import { useTranslation } from 'react-i18next';

// ── moved outside component so they are never recreated on re-render ──

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(err?: string) {
  return `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-400 ${
    err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
  }`;
}

// ─────────────────────────────────────────────────────────────────────────────

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  nationalCode: string;
  title: string;
  description: string;
  investmentArea: string;
  category: string;
  estimatedAmount: string;
  currency: string;
  expectedReturn: string;
  timeframe: string;
  additionalNotes: string;
}

const EMPTY: FormState = {
  fullName: '', phone: '', email: '', nationalCode: '',
  title: '', description: '', investmentArea: '', category: '',
  estimatedAmount: '', currency: 'IRT',
  expectedReturn: '', timeframe: '', additionalNotes: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function InvestmentSuggestPage() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>('idle');

  // categories / timeframes / currencies use t() so they must stay in component,
  // but they are plain arrays — no components, no hooks → safe to define here
  const CATEGORIES = [
    { value: 'real-estate', label: t('investmentSuggest.catRealEstate') },
    { value: 'agriculture', label: t('investmentSuggest.catAgriculture') },
    { value: 'tourism',     label: t('investmentSuggest.catTourism') },
    { value: 'handicrafts', label: t('investmentSuggest.catHandicrafts') },
    { value: 'industry',    label: t('investmentSuggest.catIndustry') },
    { value: 'technology',  label: t('investmentSuggest.catTechnology') },
  ];

  const CURRENCIES = [
    { value: 'IRT', label: t('investmentSuggest.currIRT') },
    { value: 'IRR', label: t('investmentSuggest.currIRR') },
    { value: 'USD', label: t('investmentSuggest.currUSD') },
  ];

  const TIMEFRAMES = [
    { value: 'lt1',  label: t('investmentSuggest.tfLt1') },
    { value: '1to3', label: t('investmentSuggest.tf1to3') },
    { value: '3to5', label: t('investmentSuggest.tf3to5') },
    { value: 'gt5',  label: t('investmentSuggest.tfGt5') },
  ];

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.fullName.trim())
      e.fullName = `${t('investmentSuggest.labelName')} ${t('investmentSuggest.errRequired')}`;
    if (!form.phone.trim())
      e.phone = `${t('investmentSuggest.labelPhone')} ${t('investmentSuggest.errRequired')}`;
    else if (!/^09\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = t('investmentSuggest.errPhone');
    if (!form.title.trim())
      e.title = `${t('investmentSuggest.labelTitle')} ${t('investmentSuggest.errRequired')}`;
    if (!form.description.trim())
      e.description = `${t('investmentSuggest.labelDescription')} ${t('investmentSuggest.errRequired')}`;
    else if (form.description.trim().length < 50)
      e.description = t('investmentSuggest.errDescMin');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      await axios.post('/api/investment-suggestions', {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email || undefined,
        nationalCode: form.nationalCode || undefined,
        title: form.title,
        description: form.description,
        investmentArea: form.investmentArea || undefined,
        category: form.category || undefined,
        estimatedAmount: form.estimatedAmount
          ? { amount: Number(form.estimatedAmount.replace(/,/g, '')), currency: form.currency }
          : undefined,
        expectedReturn: form.expectedReturn || undefined,
        timeframe: form.timeframe || undefined,
        additionalNotes: form.additionalNotes || undefined,
      });
      setStatus('success');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div dir={dir} className="min-h-screen bg-gradient-to-br from-purple-50/50 to-slate-50 flex items-center justify-center py-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            {t('investmentSuggest.successTitle')}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {t('investmentSuggest.successDesc')}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-2xl transition-all text-sm"
          >
            {t('investmentSuggest.newSuggestion')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div dir={dir} className={`min-h-screen bg-gradient-to-br from-purple-50/50 to-slate-50 py-10 px-4 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5"
          >
            <Lightbulb className="w-8 h-8 text-purple-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-3"
          >
            {t('investmentSuggest.title')}
          </motion.h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            {t('investmentSuggest.subtitle')}
          </p>
        </div>

        {/* Error alert */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4"
            >
              <AlertCircle className="w-7 h-7 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 text-lg mb-1">{t('investmentSuggest.errorTitle')}</h3>
                <p className="text-red-700 text-sm">{t('investmentSuggest.errorDesc')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={submit} className="space-y-6">

          {/* اطلاعات تماس */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <User className="w-5 h-5 text-purple-500" />
              {t('investmentSuggest.sectionContact')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={t('investmentSuggest.labelName')} error={errors.fullName} required>
                <input
                  value={form.fullName}
                  onChange={set('fullName')}
                  placeholder={t('investmentSuggest.placeholderName')}
                  className={inputCls(errors.fullName)}
                />
              </Field>
              <Field label={t('investmentSuggest.labelPhone')} error={errors.phone} required>
                <input
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder={t('investmentSuggest.placeholderPhone')}
                  dir="ltr"
                  className={inputCls(errors.phone)}
                />
              </Field>
              <Field label={t('investmentSuggest.labelEmail')} error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="example@email.com"
                  dir="ltr"
                  className={inputCls(errors.email)}
                />
              </Field>
              <Field label={t('investmentSuggest.labelNationalCode')} error={errors.nationalCode}>
                <input
                  value={form.nationalCode}
                  onChange={set('nationalCode')}
                  placeholder="XXXXXXXXXX"
                  dir="ltr"
                  className={inputCls(errors.nationalCode)}
                />
              </Field>
            </div>
          </div>

          {/* جزئیات پیشنهاد */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <FileText className="w-5 h-5 text-purple-500" />
              {t('investmentSuggest.sectionDetails')}
            </h2>
            <div className="space-y-5">
              <Field label={t('investmentSuggest.labelTitle')} error={errors.title} required>
                <input
                  value={form.title}
                  onChange={set('title')}
                  placeholder={t('investmentSuggest.placeholderTitle')}
                  className={inputCls(errors.title)}
                />
              </Field>
              <Field label={t('investmentSuggest.labelDescription')} error={errors.description} required>
                <textarea
                  value={form.description}
                  onChange={set('description')}
                  rows={5}
                  placeholder={t('investmentSuggest.placeholderDescription')}
                  className={`${inputCls(errors.description)} resize-none`}
                />
                <p className="mt-1 text-xs text-gray-400">{form.description.length} / 50+</p>
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={t('investmentSuggest.labelCategory')}>
                  <select
                    value={form.category}
                    onChange={set('category')}
                    className={inputCls()}
                  >
                    <option value="">{t('investmentSuggest.selectCategory')}</option>
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label={t('investmentSuggest.labelArea')}>
                  <input
                    value={form.investmentArea}
                    onChange={set('investmentArea')}
                    placeholder={t('investmentSuggest.placeholderArea')}
                    className={inputCls()}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* اطلاعات مالی */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <DollarSign className="w-5 h-5 text-purple-500" />
              {t('investmentSuggest.sectionFinancial')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={t('investmentSuggest.labelAmount')}>
                <div className="flex gap-2">
                  <input
                    value={form.estimatedAmount}
                    onChange={set('estimatedAmount')}
                    placeholder={t('investmentSuggest.placeholderAmount')}
                    dir="ltr"
                    className={`${inputCls()} flex-1`}
                  />
                  <select
                    value={form.currency}
                    onChange={set('currency')}
                    className="border border-gray-200 rounded-xl px-3 py-3 text-sm bg-white focus:ring-2 focus:ring-purple-400 outline-none"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field label={t('investmentSuggest.labelReturn')}>
                <input
                  value={form.expectedReturn}
                  onChange={set('expectedReturn')}
                  placeholder={t('investmentSuggest.placeholderReturn')}
                  className={inputCls()}
                />
              </Field>
              <Field label={t('investmentSuggest.labelTimeframe')}>
                <select
                  value={form.timeframe}
                  onChange={set('timeframe')}
                  className={inputCls()}
                >
                  <option value="">{t('investmentSuggest.selectTimeframe')}</option>
                  {TIMEFRAMES.map(tf => (
                    <option key={tf.value} value={tf.label}>{tf.label}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* توضیحات تکمیلی */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <FileText className="w-5 h-5 text-purple-500" />
              {t('investmentSuggest.sectionNotes')}
            </h2>
            <textarea
              value={form.additionalNotes}
              onChange={set('additionalNotes')}
              rows={4}
              placeholder={t('investmentSuggest.labelNotes')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white hover:border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none resize-none transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all text-base shadow-lg shadow-purple-200 hover:shadow-purple-300"
          >
            {status === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('investmentSuggest.submitting')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('investmentSuggest.submit')}
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            {t('investmentSuggest.privacy')}
          </p>
        </form>
      </div>
    </div>
  );
}
