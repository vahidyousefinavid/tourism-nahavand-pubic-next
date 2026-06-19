'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { useState, useEffect } from 'react';
import {
  Target, Eye, Users, BookOpen, Phone, Mail, MapPin,
  TrendingUp, Globe, Award, Lightbulb, Calendar, RefreshCw,
  Newspaper, ChevronLeft, ChevronRight,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  publishedAt?: string;
  createdAt: string;
}

const GOALS = [
  { icon: Lightbulb, key: 'goal1' },
  { icon: Users,     key: 'goal2' },
  { icon: Globe,     key: 'goal3' },
  { icon: Award,     key: 'goal4' },
  { icon: TrendingUp,key: 'goal5' },
  { icon: BookOpen,  key: 'goal6' },
];

const TEAM = [
  { key: 'member1', roleKey: 'secretary',          initial: 'م' },
  { key: 'member2', roleKey: 'culturalDeputy',     initial: 'ز' },
  { key: 'member3', roleKey: 'artsHead',           initial: 'ع' },
  { key: 'member4', roleKey: 'eventsCoordinator',  initial: 'ف' },
];

const STATS = [
  { n: '۱۴۰۰', key: 'foundedYear' },
  { n: '۱۲۰+', key: 'activeMembers' },
  { n: '۴۵',   key: 'implementedProjects' },
  { n: '۸',    key: 'creativeDomains' },
];

const CATEGORY_COLORS: Record<string, string> = {
  event:        'bg-blue-100 text-blue-700 border-blue-200',
  announcement: 'bg-amber-100 text-amber-700 border-amber-200',
  program:      'bg-emerald-100 text-emerald-700 border-emerald-200',
  achievement:  'bg-purple-100 text-purple-700 border-purple-200',
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const NEWS_PREVIEW_COUNT = 6;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

type ML = string | { fa?: string; en?: string; ar?: string; zh?: string } | null | undefined;
const ml = (v: ML, lang: string): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v[lang as keyof typeof v] || v.fa || v.en || '';
};

export default function SecretariatPage() {
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useDirection();
  const locale = i18n.language;
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/creative-city-news/published?limit=100')
      .then(r => r.json())
      .then((data: NewsItem[]) => setNews(Array.isArray(data) ? data : []))
      .catch(() => setNews([]))
      .finally(() => setNewsLoading(false));
  }, []);

  const previewNews = news.slice(0, NEWS_PREVIEW_COUNT);
  const hasMore = news.length > NEWS_PREVIEW_COUNT;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <div dir={dir} className={`min-h-screen bg-gray-50 ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* Hero */}
      <section className="relative bg-gradient-to-bl from-violet-950 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #a855f7 0%, transparent 60%), radial-gradient(circle at 80% 20%, #6366f1 0%, transparent 50%)' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <motion.div {...fade()} className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-400/20 border border-purple-400/40 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-purple-300 text-sm font-semibold">{t('secretariat.tag')}</span>
          </motion.div>
          <motion.h1 {...fade(0.05)} className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            {t('secretariat.title')}
          </motion.h1>
          <motion.p {...fade(0.1)} className="text-purple-200 text-lg max-w-2xl leading-relaxed">
            {t('secretariat.subtitle')}
          </motion.p>
          <motion.div {...fade(0.15)} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {STATS.map(s => (
              <div key={s.key} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-purple-200">{s.n}</div>
                <div className="text-xs text-purple-400 mt-1">{t(`secretariat.stats.${s.key}`)}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-2 gap-6">
        {[
          { icon: Target, color: 'purple', key: 'mission', title: t('secretariat.missionTitle'), body: t('secretariat.missionBody') },
          { icon: Eye,    color: 'indigo', key: 'vision',  title: t('secretariat.visionTitle'),  body: t('secretariat.visionBody')  },
        ].map(({ icon: Icon, color, key, title, body }) => (
          <motion.div key={key} {...fade()} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center mb-5`}>
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{body}</p>
          </motion.div>
        ))}
      </section>

      {/* Goals */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fade()} className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900">{t('secretariat.goalsTitle')}</h2>
            <p className="text-gray-500 text-sm mt-2">{t('secretariat.goalsSubtitle')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GOALS.map(({ icon: Icon, key }, i) => (
              <motion.div key={key} {...fade(i * 0.05)}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all group"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{t(`secretariat.${key}Title`)}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{t(`secretariat.${key}Body`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div {...fade()} className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-900">{t('secretariat.teamTitle')}</h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {TEAM.map(({ key, roleKey, initial }, i) => (
            <motion.div key={key} {...fade(i * 0.07)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black mx-auto mb-4">
                {initial}
              </div>
              <div className="font-bold text-gray-900 text-sm">{t(`secretariat.${key}`)}</div>
              <div className="text-xs text-gray-400 mt-1">{t(`secretariat.roles.${roleKey}`)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* News Preview */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fade()} className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">{t('secretariat.newsTitle')}</h2>
              {!newsLoading && news.length > 0 && (
                <p className="text-gray-400 text-sm mt-0.5">{news.length} {t('secretariat.publishedCount')}</p>
              )}
            </div>
            {hasMore && (
              <a
                href="/creative-city/news"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-all"
              >
                {t('secretariat.viewAll')}
                {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </a>
            )}
          </motion.div>

          {newsLoading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="w-7 h-7 animate-spin text-purple-400" />
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-2xl border border-gray-100">
              <Newspaper className="w-14 h-14 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-semibold">{t('secretariat.noNews')}</p>
              <p className="text-gray-400 text-sm mt-1">{t('secretariat.noNewsSub')}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {previewNews.map((item, i) => {
                const imgSrc = item.imageUrl
                  ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}${item.imageUrl}`)
                  : null;
                const catCls = CATEGORY_COLORS[item.category ?? ''] ?? 'bg-gray-100 text-gray-600 border-gray-200';
                return (
                  <motion.a
                    key={item.id}
                    href="/creative-city/news"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all group"
                  >
                    {/* تصویر */}
                    <div className="relative h-40 flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
                      {imgSrc ? (
                        <img src={imgSrc} alt={ml(item.title as any, locale)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Newspaper className="w-12 h-12 text-purple-200" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {item.category && (
                        <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${catCls}`}>
                          {t(`newsPage.categories.${item.category}`)}
                        </span>
                      )}
                    </div>
                    {/* محتوا */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-2">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.publishedAt ?? item.createdAt)}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1 leading-snug group-hover:text-purple-700 transition-colors">
                        {ml(item.title as any, locale)}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-grow">{ml(item.summary as any, locale)}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}

          {/* دکمه مشاهده همه پایین لیست */}
          {hasMore && (
            <motion.div {...fade(0.1)} className="text-center mt-8">
              <a
                href="/creative-city/news"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-2xl transition-all shadow-sm hover:shadow-md"
              >
                {t('secretariat.viewAllNews')}
                {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div {...fade()} className="bg-gradient-to-l from-purple-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-2xl font-black mb-2">{t('secretariat.contactTitle')}</h2>
          <p className="text-purple-200 text-sm mb-8">{t('secretariat.contactSubtitle')}</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Phone,  v: t('secretariat.phone') },
              { icon: Mail,   v: t('secretariat.email') },
              { icon: MapPin, v: t('secretariat.address') },
            ].map(({ icon: Icon, v }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-purple-100">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
