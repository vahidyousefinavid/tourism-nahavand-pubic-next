import { Suspense } from 'react';
import NewsListPage from '@/views/CreativeCity/NewsListPage';

export default function CreativeCityNewsRoute() {
  return <Suspense><NewsListPage /></Suspense>;
}
