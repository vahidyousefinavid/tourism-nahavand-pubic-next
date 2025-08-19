export interface Location {
  id: string;
  name: string;
  description: string;
  category: 'historical' | 'natural' | 'cultural' | 'religious';
  images: string[];
  coordinates: [number, number];
  facilities: string[];
  openingHours: string;
  entryFee: string;
  rating: number;
  reviews: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'festival' | 'cultural' | 'sports' | 'religious';
  image: string;
  price: string;
  capacity: number;
  registered: number;
  organizer: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  sortBy: string;
}