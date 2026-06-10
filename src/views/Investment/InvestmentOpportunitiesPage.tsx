'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import { InvestmentOpportunity } from '@/types/investment';
import { InvestmentCard } from '@/components/Cards/InvestmentCard';
import InvestmentModal from '@/components/Modals/InvestmentModal';
import { fetchInvestmentOpportunities } from '@/lib/investment-api';
import { motion } from 'framer-motion';
import i18n from '@/lib/i18n';

export default function InvestmentOpportunitiesPage() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<InvestmentOpportunity | null>(null);

  // Fetch opportunities from API
  useEffect(() => {
    const loadOpportunities = async () => {
      setLoading(true);
      try {
        const data = await fetchInvestmentOpportunities();
        setOpportunities(data);
      } catch (err) {
        console.error('❌ Error fetching investment opportunities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  // Handle modal from URL query
  useEffect(() => {
    const opportunityId = searchParams.get('id');
    if (opportunityId && opportunities.length > 0) {
      const found = opportunities.find((o) => o.id === opportunityId);
      if (found && found.id !== selectedOpportunity?.id) {
        setSelectedOpportunity(found);
        trackView(found.id);
      }
    }
  }, [searchParams, opportunities]);

  const trackView = (id: string) => {
    const base = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${base}/api/investments/${id}/view`, { method: 'POST' }).catch(() => {});
  };

  const handleOpportunityClick = (opportunity: InvestmentOpportunity) => {
    setSelectedOpportunity(opportunity);
    trackView(opportunity.id);
    router.push(`/investment/opportunities?id=${opportunity.id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setSelectedOpportunity(null);
    router.push('/investment/opportunities', { scroll: false });
  };

  return (
    <div dir={dir} className={`min-h-screen py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('investmentPage.opportunities.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('investmentPage.opportunities.description')}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-18 h-18 rounded-full bg-blue-10 shadow-lg"
            >
              <img
                src="/images/noah.png"
                alt="loading"
                className="w-[80px] h-full object-contain"
              />
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {t('investmentPage.opportunities.noResults') || 'در حال حاضر فرصت سرمایه‌گذاری فعالی وجود ندارد.'}
                </p>
              </div>
            ) : (
              opportunities.map((opportunity, index) => (
                <InvestmentCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  index={index}
                  onClick={() => handleOpportunityClick(opportunity)}
                  locale={i18n.language}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <InvestmentModal
        opportunity={selectedOpportunity}
        isOpen={!!selectedOpportunity}
        onClose={handleCloseModal}
        locale={i18n.language}
      />
    </div>
  );
}