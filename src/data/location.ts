import { Location } from '@/types';

export const locations: Location[] = [
  {
    id: 'ganjnameh',
    name: 'گنجنامه نهاوند',
    description: 'کتیبه‌های باستانی داریوش و خشایارشا که بر روی صخره‌های کوه الوند حک شده‌اند.',
    category: 'historical',
    images: [
      'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
      'https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg'
    ],
    coordinates: [34.1897, 48.5164],
    facilities: ['پارکینگ', 'راهنمای تور', 'فروشگاه صنایع دستی'],
    openingHours: '8:00 - 18:00',
    entryFee: '50,000 تومان',
    rating: 4.8,
    reviews: 245
  },
  {
    id: 'lalejin',
    name: 'شهر سفال لالجین',
    description: 'مرکز تولید سفال و سرامیک ایران با تاریخی چندین هزار ساله.',
    category: 'cultural',
    images: [
      'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg',
      'https://images.pexels.com/photos/1094768/pexels-photo-1094768.jpeg'
    ],
    coordinates: [34.9772, 48.5069],
    facilities: ['کارگاه‌های سفالگری', 'موزه سفال', 'فروشگاه'],
    openingHours: '9:00 - 17:00',
    entryFee: 'رایگان',
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'abbas-abad',
    name: 'باغ عباس آباد',
    description: 'باغ تاریخی زیبا با معماری صفوی و چشم‌اندازهای خیره‌کننده.',
    category: 'natural',
    images: [
      'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg',
      'https://images.pexels.com/photos/1166210/pexels-photo-1166210.jpeg'
    ],
    coordinates: [34.2089, 48.5234],
    facilities: ['باغ', 'رستوران', 'محل استراحت'],
    openingHours: '7:00 - 20:00',
    entryFee: '30,000 تومان',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'imamzadeh-ibrahim',
    name: 'امامزاده ابراهیم',
    description: 'مقبره مقدس با معماری اسلامی زیبا و اهمیت مذهبی بالا.',
    category: 'religious',
    images: [
      'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg'
    ],
    coordinates: [34.1956, 48.5178],
    facilities: ['مسجد', 'محل وضو', 'پارکینگ'],
    openingHours: '5:00 - 22:00',
    entryFee: 'رایگان',
    rating: 4.9,
    reviews: 312
  }
];