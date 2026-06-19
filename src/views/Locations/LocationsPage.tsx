'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Location, FilterOptions, AppLocale } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { NoResults } from './NoResults';
import { LocationCard } from './LocationCard';
import { LocationModalContent } from './LocationModalContent';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import i18n from '@/lib/i18n';
import { LayoutGrid, Map } from 'lucide-react';

const MapView = dynamic(() => import('@/views/Home/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">در حال بارگذاری نقشه...</p>
      </div>
    </div>
  ),
});

type ViewMode = 'grid' | 'map';

export default function LocationsPage() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [filters] = useState<FilterOptions>({
    search: '',
    category: '',
    sortBy: 'name',
  });

  const trackView = (id: string) => {
    fetch(`/api/locations/${id}/view`, { method: 'POST' }).catch(() => {});
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/locations', {
        params: {
          search: filters.search,
          category: filters.category,
          sortBy: filters.sortBy,
        },
      });
      setLocations(res.data.data || res.data);
    } catch (err) {
      console.error('❌ Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [filters]);

  useEffect(() => {
    const locationId = searchParams.get('id');
    if (locationId && locations.length > 0) {
      const found = locations.find((l) => l.id === locationId);
      if (found && found.id !== selectedLocation?.id) {
        setSelectedLocation(found);
        trackView(found.id!);
      }
    }
  }, [searchParams, locations]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    trackView(location.id!);
    router.push(`/locations?id=${location.id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
    router.push('/locations', { scroll: false });
  };

  const openInMaps = (coordinates: [number, number]) => {
    const [lat, lng] = coordinates;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  const locale = i18n.language as AppLocale;
  const mapLocations = locations.filter((l) => l.latlng);

  return (
    <div dir={dir} className={`min-h-screen py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('locationsPage.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('locationsPage.subtitle')}
          </p>
        </div>

        {/* View Toggle */}
        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mb-6`}>
          <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1 gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              {t('locationsPage.gridView', 'نمای کارت')}
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Map className="w-4 h-4" />
              {t('locationsPage.mapView', 'نمای نقشه')}
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-18 h-18 rounded-full shadow-lg"
            >
              <img src="/images/Noah.png" alt="logo" className="w-[80px] h-full object-contain" />
            </motion.div>
          </div>
        ) : viewMode === 'map' ? (
          <div
            className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
            style={{ height: '600px' }}
          >
            <MapView
              locations={mapLocations}
              locale={locale}
              activeCategory={filters.category || null}
              selectedId={selectedLocation?.id ?? null}
              onSelectLocation={handleLocationClick}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.length === 0 ? (
              <NoResults />
            ) : (
              locations.map((location: Location, index: number) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  index={index}
                  onClick={() => handleLocationClick(location)}
                  locale={locale}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedLocation}
        onClose={handleCloseModal}
        title={selectedLocation?.name[i18n.language] || selectedLocation?.name?.fa}
      >
        {selectedLocation && (
          <LocationModalContent
            location={selectedLocation}
            openInMaps={openInMaps}
            locale={locale}
          />
        )}
      </Modal>
    </div>
  );
}
