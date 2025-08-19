import { Event } from '@/types';

export const events: Event[] = [
  {
    id: 'pottery-festival',
    title: 'جشنواره سفال و سرامیک',
    description: 'نمایشگاه و جشنواره سالانه صنایع سفالی لالجین با حضور هنرمندان برجسته.',
    date: '2024-09-15',
    time: '10:00',
    location: 'شهر لالجین',
    category: 'cultural',
    image: 'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg',
    price: 'رایگان',
    capacity: 500,
    registered: 234,
    organizer: 'اداره فرهنگ و ارشاد اسلامی'
  },
  {
    id: 'nowruz-celebration',
    title: 'جشن نوروز باستانی',
    description: 'برگزاری مراسم سنتی نوروز در گنجنامه با اجرای موسیقی محلی.',
    date: '2024-03-20',
    time: '14:00',
    location: 'گنجنامه نهاوند',
    category: 'festival',
    image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
    price: '25,000 تومان',
    capacity: 300,
    registered: 187,
    organizer: 'شهرداری نهاوند'
  },
  {
    id: 'mountain-hiking',
    title: 'کوهپیمایی الوند',
    description: 'برنامه کوهپیمایی گروهی به قله الوند با راهنمای مجرب.',
    date: '2024-08-25',
    time: '06:00',
    location: 'کوه الوند',
    category: 'sports',
    image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg',
    price: '80,000 تومان',
    capacity: 50,
    registered: 32,
    organizer: 'باشگاه کوهنوردی نهاوند'
  }
];