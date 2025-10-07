'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter as FilterIcon, ChevronDown } from 'lucide-react';

type FilterOption = {
  label: string;
  value: string;
};

type FilterPanelProps = {
  searchPlaceholder?: string;
  categoryOptions?: FilterOption[];
  sortOptions: FilterOption[];
  filters: {
    search: string;
    category?: string;
    sortBy: string;
  };
  onChange: (filters: any) => void;
  resultLabel?: string;
  resultCount?: number;
};

export const FilterPanel = ({
  searchPlaceholder = 'جستجو...',
  categoryOptions = [],
  sortOptions,
  filters,
  onChange,
  resultCount = 0,
  resultLabel = 'مورد یافت شد',
}: FilterPanelProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // 📌 چک کردن سایز صفحه فقط روی کلاینت
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4 flex justify-between items-center">
        <span className="font-semibold text-gray-700">فیلترها</span>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="text-sm text-blue-600 flex items-center gap-1"
        >
          <FilterIcon className="w-4 h-4" />
          {showMobileFilters ? 'بستن' : 'باز کردن'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {(showMobileFilters || isDesktop) && (
          <motion.div
            key="filter-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative text-right">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full pr-3 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  value={filters.search}
                  onChange={(e) => onChange({ ...filters, search: e.target.value })}
                />
              </div>

              {/* Category */}
              {categoryOptions.length > 0 && (
                <div className="relative text-right">
                  <ChevronDown className="absolute left-3 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
                  <select
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-right"
                    value={filters.category || ''}
                    onChange={(e) =>
                      onChange({ ...filters, category: e.target.value || undefined })
                    }
                  >
                    <option value="">همه دسته‌ها</option>
                    {categoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort */}
              <div className="relative text-right">
                <ChevronDown className="absolute left-3 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
                <select
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-right"
                  value={filters.sortBy}
                  onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Result Count */}
              <div className="flex items-center justify-center bg-gray-100 rounded-lg px-4 py-3 text-center">
                <span className="text-gray-700 font-medium">
                  {resultCount} {resultLabel}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
