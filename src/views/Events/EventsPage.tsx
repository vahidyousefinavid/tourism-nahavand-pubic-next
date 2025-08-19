'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { events } from '@/data/events';
import { Event, FilterOptions } from '@/types';
import { FilterPanel } from '@/components/FilterPanel/FilterPanel';
import EventCard from './EventCard';
import NoResults from './NoResults';
import { Modal } from '@/components/ui/Modal';
import EventModalContent from './EventModalContent';

export default function EventsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    sortBy: 'date',
  });

  useEffect(() => {
    const eventId = searchParams.get('id');
    if (eventId) {
      const event = events.find((e) => e.id === eventId);
      if (event) setSelectedEvent(event);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || event.category === filters.category;

      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price':
          return a.price.localeCompare(b.price, 'fa');
        default:
          return a.title.localeCompare(b.title, 'fa');
      }
    });

    setFilteredEvents(filtered);
  }, [filters]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    router.push(`/events?id=${event.id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    router.push('/events', { scroll: false });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">رویدادهای نهاوند</h1>
          <p className="text-lg text-gray-600">برنامه‌های فرهنگی، ورزشی و تفریحی شهر</p>
        </header>

        <FilterPanel
          filters={filters}
          onChange={setFilters}
          searchPlaceholder="جستجو در رویدادها..."
          categoryOptions={[
            { label: 'جشنواره', value: 'festival' },
            { label: 'فرهنگی', value: 'cultural' },
            { label: 'ورزشی', value: 'sports' },
            { label: 'مذهبی', value: 'religious' },
          ]}
          sortOptions={[
            { label: 'تاریخ', value: 'date' },
            { label: 'نام', value: 'title' },
            { label: 'قیمت', value: 'price' },
          ]}
          resultCount={filteredEvents.length}
          resultLabel="رویداد یافت شد"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={handleEventClick} />
            ))
          ) : (
            <NoResults />
          )}
        </div>
      </div>

      <Modal isOpen={!!selectedEvent} onClose={handleCloseModal} title={selectedEvent?.title}>
        {selectedEvent && <EventModalContent event={selectedEvent} onClose={handleCloseModal} />}
      </Modal>
    </div>
  );
}
