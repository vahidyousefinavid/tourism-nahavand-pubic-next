import { Suspense } from "react";
import LocationsPage from "@/views/Locations/LocationsPage";

export default function LocationsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LocationsPage />
    </Suspense>
  );
}
