'use client';
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { Location, FilterOptions } from '@/types';
// import { locations } from '@/data/location';


// import { FilterPanel } from '@/components/FilterPanel/FilterPanel';
// import { Modal } from '@/components/ui/Modal';
// import { NoResults } from './NoResults';
// import { LocationCard } from './LocationCard';
// import { LocationModalContent } from './LocationModalContent';

// export default function LocationsPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
//   const [filters, setFilters] = useState<FilterOptions>({
//     search: '',
//     category: '',
//     sortBy: 'name',
//   });

//   // Handle URL params open location modal
//   useEffect(() => {
//     const locationId = searchParams.get('id');
//     if (locationId) {
//       const found = locations.find(l => l.id === locationId);
//       if (found) setSelectedLocation(found);
//     }
//   }, [searchParams]);

//   // Filter & sort locations based on filters
//   useEffect(() => {
//     let filtered = locations.filter(location => {
//       const matchesSearch =
//         location.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//         location.description.toLowerCase().includes(filters.search.toLowerCase());

//       const matchesCategory = !filters.category || location.category === filters.category;

//       return matchesSearch && matchesCategory;
//     });

//     filtered.sort((a, b) => {
//       switch (filters.sortBy) {
//         case 'rating':
//           return b.rating - a.rating;
//         case 'reviews':
//           return b.reviews - a.reviews;
//         default:
//           return a.name.localeCompare(b.name, 'fa');
//       }
//     });

//     setFilteredLocations(filtered);
//   }, [filters]);

//   const handleLocationClick = (location: Location) => {
//     setSelectedLocation(location);
//     router.push(`/locations?id=${location.id}`, { scroll: false });
//   };

//   const handleCloseModal = () => {
//     setSelectedLocation(null);
//     router.push('/locations', { scroll: false });
//   };

//   const openInMaps = (coordinates: [number, number]) => {
//     const [lat, lng] = coordinates;
//     window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
//   };

//   return (
//     <div className="min-h-screen py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">مکان‌های دیدنی نهاوند</h1>
//           <p className="text-lg text-gray-600">کشف جاذبه‌های گردشگری و تاریخی شهر نهاوند</p>
//         </div>

//         {/* Filters */}
//         <FilterPanel
//           filters={filters}
//           onChange={setFilters}
//           searchPlaceholder="جستجو در مکان‌ها..."
//           categoryOptions={[
//             { label: 'تاریخی', value: 'historical' },
//             { label: 'طبیعی', value: 'natural' },
//             { label: 'فرهنگی', value: 'cultural' },
//             { label: 'مذهبی', value: 'religious' },
//           ]}
//           sortOptions={[
//             { label: 'مرتب‌سازی بر اساس نام', value: 'name' },
//             { label: 'مرتب‌سازی بر اساس امتیاز', value: 'rating' },
//             { label: 'مرتب‌سازی بر اساس نظرات', value: 'reviews' },
//           ]}
//           resultCount={filteredLocations.length}
//           resultLabel="مکان یافت شد"
//         />

//         {/* Locations Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredLocations.length === 0 ? (
//             <NoResults />
//           ) : (
//             filteredLocations.map((location, index) => (
//               <LocationCard
//                 key={location.id}
//                 location={location}
//                 index={index}
//                 onClick={() => handleLocationClick(location)}
//               />
//             ))
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal
//         isOpen={!!selectedLocation}
//         onClose={handleCloseModal}
//         title={selectedLocation?.name}
//       >
//         {selectedLocation && (
//           <LocationModalContent location={selectedLocation} openInMaps={openInMaps} />
//         )}
//       </Modal>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Location, FilterOptions } from '@/types';

import { Modal } from '@/components/ui/Modal';
import { NoResults } from './NoResults';
import { LocationCard } from './LocationCard';
import { LocationModalContent } from './LocationModalContent';
import { motion } from 'framer-motion';

export default function LocationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    sortBy: 'name',
  });

  // 📌 گرفتن دیتا از API
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
      setLocations(res.data.data || res.data); // فرض می‌کنیم API { items: Location[] } یا فقط [] برگردونه
    } catch (err) {
      console.error('❌ خطا در گرفتن مکان‌ها:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [filters]);

  // 📌 باز کردن مودال بر اساس query
  useEffect(() => {
    const locationId = searchParams.get('id');
    if (locationId && locations.length > 0) {
      const found = locations.find((l) => l.id === locationId);
      if (found) setSelectedLocation(found);
    }
  }, [searchParams, locations]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
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

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مکان‌های دیدنی نهاوند</h1>
          <p className="text-lg text-gray-600">کشف جاذبه‌های گردشگری و تاریخی شهر نهاوند</p>
        </div>

        {/* Filters */}
        {/* <FilterPanel
          filters={filters}
          onChange={setFilters}
          searchPlaceholder="جستجو در مکان‌ها..."
          categoryOptions={[
            { label: 'تاریخی', value: 'historical' },
            { label: 'طبیعی', value: 'natural' },
            { label: 'فرهنگی', value: 'cultural' },
            { label: 'مذهبی', value: 'religious' },
          ]}
          sortOptions={[
            { label: 'مرتب‌سازی بر اساس نام', value: 'name' },
            { label: 'مرتب‌سازی بر اساس امتیاز', value: 'rating' },
            { label: 'مرتب‌سازی بر اساس نظرات', value: 'reviews' },
          ]}
          resultCount={locations.length}
          resultLabel="مکان یافت شد"
        /> */}

        {/* Locations Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-18 h-18 rounded-full bg-blue-10 shadow-lg"
            > <img
                src="/images/noah.png"
                alt="logo"
                className="w-[80px] h-full object-contain"
              /></motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.length === 0 && !loading ? (
              <NoResults />
            ) : (
              locations.map((location: Location, index: any) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  index={index}
                  onClick={() => handleLocationClick(location)}
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
        title={selectedLocation?.name.fa || selectedLocation?.name.en}
      >
        {selectedLocation && (
          <LocationModalContent location={selectedLocation} openInMaps={openInMaps} />
        )}
      </Modal>
    </div>
  );
}
