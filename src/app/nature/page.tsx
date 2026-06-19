import { Suspense } from 'react';
import NaturePage from '@/views/Nature/NaturePage';

export default function NatureRoute() {
  return (
    <Suspense>
      <NaturePage />
    </Suspense>
  );
}
