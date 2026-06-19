'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import {
  User, Palette, FileText, Heart, CheckCircle, ChevronLeft, ChevronRight,
  Send, Lightbulb, Music, Utensils, Cpu, GraduationCap, Pen, Building, Star,
} from 'lucide-react';

// ── Outside component: no focus-loss bug ────────────────────────────────────

interface StepHeaderProps { step: number; total: number; title: string; subtitle: string }
function StepHeader({ step, total, title, subtitle }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-purple-600">{step} / {total}</span>
        <div className="flex-1 bg-gray-100 rounded-full h-1">
          <div
            className="h-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all duration-500"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>
      <h2 className="text-xl font-black text-gray-900 mt-4">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function inputCls(err?: boolean) {
  return `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:ring-2 focus:ring-purple-400 ${
    err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
  }`;
}

// ── Data ────────────────────────────────────────────────────────────────────

const DOMAINS = [
  { key: 'handicrafts', icon: Palette,     color: '#f59e0b' },
  { key: 'music',       icon: Music,       color: '#3b82f6' },
  { key: 'gastronomy',  icon: Utensils,    color: '#ef4444' },
  { key: 'tech',        icon: Cpu,         color: '#8b5cf6' },
  { key: 'education',   icon: GraduationCap, color: '#10b981' },
  { key: 'literature',  icon: Pen,         color: '#6366f1' },
  { key: 'architecture',icon: Building,    color: '#64748b' },
  { key: 'visualArts',  icon: Star,        color: '#d946ef' },
];

const AGE_GROUPS = ['زیر ۱۸', '۱۸–۳۰', '۳۰–۵۰', 'بالای ۵۰'];

const PARTICIPATION_TYPES = [
  { key: 'volunteer',  icon: Heart,      label: 'داوطلبانه' },
  { key: 'teach',      icon: GraduationCap, label: 'آموزش و تدریس' },
  { key: 'showcase',   icon: Star,       label: 'نمایش آثار' },
  { key: 'collaborate',icon: Lightbulb,  label: 'همکاری در پروژه' },
];

interface FormData {
  name: string; phone: string; ageGroup: string;
  domain: string; ideaTitle: string; ideaDesc: string;
  participation: string[];
}

const EMPTY: FormData = {
  name: '', phone: '', ageGroup: '',
  domain: '', ideaTitle: '', ideaDesc: '',
  participation: [],
};

const TOTAL_STEPS = 4;

// ── Page ────────────────────────────────────────────────────────────────────

export default function YouPage() {
  const { t } = useTranslation();
  const { dir, isRTL } = useDirection();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }));

  const toggleParticipation = (k: string) =>
    setForm(p => ({
      ...p,
      participation: p.participation.includes(k)
        ? p.participation.filter(x => x !== k)
        : [...p.participation, k],
    }));

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = 'الزامی';
      if (!form.phone.trim()) e.phone = 'الزامی';
      if (!form.ageGroup) e.ageGroup = 'الزامی';
    }
    if (step === 2 && !form.domain) e.domain = 'یک حوزه انتخاب کنید';
    if (step === 3) {
      if (!form.ideaTitle.trim()) e.ideaTitle = 'الزامی';
      if (!form.ideaDesc.trim() || form.ideaDesc.length < 30) e.ideaDesc = 'حداقل ۳۰ کاراکتر';
    }
    if (step === 4 && form.participation.length === 0) e.participation = 'الزامی';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, TOTAL_STEPS)); };
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/creative-city-participations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('server error');
      setSubmitted(true);
    } catch {
      setErrors({ name: 'خطا در ارسال. لطفاً دوباره تلاش کنید.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div dir={dir} className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="max-w-md w-full bg-white rounded-3xl border border-purple-100 shadow-xl p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-purple-600" />
          </motion.div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">{t('you.successTitle')}</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">{t('you.successDesc')}</p>
          <button
            onClick={() => { setForm(EMPTY); setStep(1); setSubmitted(false); }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-2xl transition-all text-sm"
          >
            {t('you.again')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div dir={dir} className={`min-h-screen bg-gray-50 ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* Hero */}
      <section className="bg-gradient-to-bl from-violet-900 via-purple-800 to-fuchsia-900 text-white px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5"
          >
            <Heart className="w-7 h-7 text-purple-300" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-black mb-3"
          >
            {t('you.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-purple-200 leading-relaxed max-w-xl mx-auto"
          >
            {t('you.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6 py-12">

        {/* Step Dots */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1,2,3,4].map(s => (
            <div key={s} className={`transition-all rounded-full ${
              s === step ? 'w-8 h-3 bg-purple-600' : s < step ? 'w-3 h-3 bg-purple-300' : 'w-3 h-3 bg-gray-200'
            }`} />
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 30 : -30 }}
              transition={{ duration: 0.25 }}
              className="p-8"
            >

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
                  <StepHeader step={1} total={4} title={t('you.step1Title')} subtitle={t('you.step1Subtitle')} />
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('you.labelName')} <span className="text-red-500">*</span></label>
                      <input value={form.name} onChange={set('name')} placeholder={t('you.placeholderName')} className={inputCls(!!errors.name)} />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('you.labelPhone')} <span className="text-red-500">*</span></label>
                      <input value={form.phone} onChange={set('phone')} placeholder="09XXXXXXXXX" dir="ltr" className={inputCls(!!errors.phone)} />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('you.labelAge')} <span className="text-red-500">*</span></label>
                      <div className="flex flex-wrap gap-2">
                        {AGE_GROUPS.map(ag => (
                          <button key={ag} type="button"
                            onClick={() => setForm(p => ({ ...p, ageGroup: ag }))}
                            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                              form.ageGroup === ag
                                ? 'bg-purple-600 border-purple-600 text-white'
                                : 'border-gray-200 text-gray-600 hover:border-purple-300'
                            }`}
                          >{ag}</button>
                        ))}
                      </div>
                      {errors.ageGroup && <p className="mt-1 text-xs text-red-500">{errors.ageGroup}</p>}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Domain */}
              {step === 2 && (
                <>
                  <StepHeader step={2} total={4} title={t('you.step2Title')} subtitle={t('you.step2Subtitle')} />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {DOMAINS.map(({ key, icon: Icon, color }) => (
                      <button key={key} type="button"
                        onClick={() => setForm(p => ({ ...p, domain: key }))}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center ${
                          form.domain === key
                            ? 'border-purple-500 bg-purple-50 shadow-sm'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: color + '25' }}>
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{t(`inCity.sector.${key}`)}</span>
                      </button>
                    ))}
                  </div>
                  {errors.domain && <p className="mt-3 text-xs text-red-500">{errors.domain}</p>}
                </>
              )}

              {/* Step 3: Idea */}
              {step === 3 && (
                <>
                  <StepHeader step={3} total={4} title={t('you.step3Title')} subtitle={t('you.step3Subtitle')} />
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('you.labelIdeaTitle')} <span className="text-red-500">*</span></label>
                      <input value={form.ideaTitle} onChange={set('ideaTitle')} placeholder={t('you.placeholderIdeaTitle')} className={inputCls(!!errors.ideaTitle)} />
                      {errors.ideaTitle && <p className="mt-1 text-xs text-red-500">{errors.ideaTitle}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('you.labelIdeaDesc')} <span className="text-red-500">*</span></label>
                      <textarea value={form.ideaDesc} onChange={set('ideaDesc')} rows={6}
                        placeholder={t('you.placeholderIdeaDesc')}
                        className={`${inputCls(!!errors.ideaDesc)} resize-none`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.ideaDesc && <p className="text-xs text-red-500">{errors.ideaDesc}</p>}
                        <p className="text-xs text-gray-400 mr-auto">{form.ideaDesc.length} / 30+</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Participation type */}
              {step === 4 && (
                <>
                  <StepHeader step={4} total={4} title={t('you.step4Title')} subtitle={t('you.step4Subtitle')} />
                  <div className="space-y-3">
                    {PARTICIPATION_TYPES.map(({ key, icon: Icon, label }) => {
                      const active = form.participation.includes(key);
                      return (
                        <button key={key} type="button"
                          onClick={() => toggleParticipation(key)}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-right ${
                            active ? 'border-purple-500 bg-purple-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            active ? 'bg-purple-600 text-white' : 'bg-white text-gray-400 border border-gray-200'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`font-bold text-sm ${active ? 'text-purple-800' : 'text-gray-700'}`}>{label}</span>
                          {active && <CheckCircle className="w-5 h-5 text-purple-500 mr-auto flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {errors.participation && <p className="mt-3 text-xs text-red-500">{errors.participation}</p>}
                </>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Footer Buttons */}
          <div className="px-8 pb-8 flex gap-3">
            {step > 1 && (
              <button onClick={prev}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 transition-all"
              >
                {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                {t('you.back')}
              </button>
            )}
            <button
              onClick={step === TOTAL_STEPS ? submit : next}
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-purple-200"
            >
              {step === TOTAL_STEPS ? (
                submitting
                  ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> {t('you.submitting')}</>
                  : <><Send className="w-4 h-4" /> {t('you.submit')}</>
              ) : (
                <>{t('you.next')} {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">{t('you.privacy')}</p>
      </section>
    </div>
  );
}
