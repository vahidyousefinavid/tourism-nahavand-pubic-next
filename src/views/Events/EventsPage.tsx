'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Event, FilterOptions } from '@/types';
import { Modal } from '@/components/ui/Modal';
import {EventCard} from './EventCard';
import EventModalContent from './EventModalContent';
import NoResults from './NoResults';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/useDirection';
import i18n from '@/lib/i18n';

export default function EventsPage() {
  const { t } = useTranslation();
  const { isRTL, dir } = useDirection();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    sortBy: 'date',
  });

  const trackView = (id: string) => {
    fetch(`/api/events/${id}/view`, { method: 'POST' }).catch(() => {});
  };

  // 📌 گرفتن دیتا از API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/events', {
        params: {
          search: filters.search,
          category: filters.category,
          sortBy: filters.sortBy,
        },
      });
      setEvents(res.data.data || res.data);
    } catch (err) {
      console.error('❌ Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  // 📌 باز کردن مودال بر اساس Query
  useEffect(() => {
    const eventId = searchParams.get('id');
    if (eventId && events.length > 0) {
      const found = events.find((e) => e.id === eventId);
      if (found && found.id !== selectedEvent?.id) {
        setSelectedEvent(found);
        trackView(found.id);
      }
    }
  }, [searchParams, events]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    trackView(event.id);
    router.push(`/events?id=${event.id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    router.push('/events', { scroll: false });
  };

  return (
    <div dir={dir} className={`min-h-screen py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('eventsPage.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('eventsPage.subtitle')}
          </p>
        </div>

        {/* Grid */}
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
            {events.length === 0 ? (
              <NoResults />
            ) : (
              events.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event)}
                  locale={i18n.language as any}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={handleCloseModal}
        title={
          selectedEvent?.title?.[i18n.language] ||
          selectedEvent?.title?.fa ||
          selectedEvent?.title?.en
        }
      >
        {selectedEvent && (
          <EventModalContent
            event={selectedEvent}
            locale={i18n.language as any}
          />
        )}
      </Modal>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import axios from 'axios';

// import { Event, FilterOptions } from '@/types';
// import { FilterPanel } from '@/components/FilterPanel/FilterPanel';
// import EventCard from './EventCard';
// import NoResults from './NoResults';
// import { Modal } from '@/components/ui/Modal';
// import EventModalContent from './EventModalContent';

// export default function EventsPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [events, setEvents] = useState<Event[]>([]);
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [filters, setFilters] = useState<FilterOptions>({
//     search: '',
//     category: '',
//     sortBy: 'date',
//   });

//   // 📌 گرفتن رویدادها از API با فیلتر
//   const fetchEvents = async (filters: FilterOptions) => {
//     try {
//       const res = await axios.get('/api/events', {
//         params: {
//           search: filters.search || undefined,
//           category: filters.category || undefined,
//           sortBy: filters.sortBy || undefined,
//           page: 1,
//           limit: 50,
//         },
//       });

//       // فرض: بک می‌ده { items: Event[], total: number }
//       setEvents(res.data?.data || res.data);
//     } catch (err) {
//       console.error('❌ خطا در گرفتن لیست رویدادها', err);
//     }
//   };

//   // 📌 وقتی فیلترها تغییر کنن، دوباره از بک بگیر
//   useEffect(() => {
//     fetchEvents(filters);
//   }, [filters]);

//   // 📌 باز کردن مودال بر اساس query id
//   useEffect(() => {
//     const eventId = searchParams.get('id');
//     if (eventId && events.length) {
//       const event = events.find((e) => e.id === eventId);
//       if (event) setSelectedEvent(event);
//     }
//   }, [searchParams, events]);

//   const handleEventClick = (event: Event) => {
//     setSelectedEvent(event);
//     router.push(`/events?id=${event.id}`, { scroll: false });
//   };

//   const handleCloseModal = () => {
//     setSelectedEvent(null);
//     router.push('/events', { scroll: false });
//   };

//   return (
//     <div className="min-h-screen py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <header className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">رویدادهای نهاوند</h1>
//           <p className="text-lg text-gray-600">برنامه‌های فرهنگی، ورزشی و تفریحی شهر</p>
//         </header>

//         <FilterPanel
//           filters={filters}
//           onChange={setFilters}
//           searchPlaceholder="جستجو در رویدادها..."
//           categoryOptions={[
//             { label: 'جشنواره', value: 'festival' },
//             { label: 'فرهنگی', value: 'cultural' },
//             { label: 'ورزشی', value: 'sports' },
//             { label: 'مذهبی', value: 'religious' },
//           ]}
//           sortOptions={[
//             { label: 'تاریخ', value: 'date' },
//             { label: 'نام', value: 'title' },
//             { label: 'قیمت', value: 'price' },
//           ]}
//           resultCount={events.length}
//           resultLabel="رویداد یافت شد"
//         />

//         {/* 📌 لیست کارت‌ها */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.length ? (
//             events.map((event) => (
//               <EventCard key={event.id} event={event} onClick={handleEventClick} />
//             ))
//           ) : (
//             <NoResults />
//           )}
//         </div>
//       </div>

//       {/* 📌 مودال */}
//       <Modal
//         isOpen={!!selectedEvent}
//         onClose={handleCloseModal}
//         title={selectedEvent?.title?.fa}
//       >
//         {selectedEvent && (
//           <EventModalContent event={selectedEvent} />
//         )}
//       </Modal>
//     </div>
//   );
// }
