import { Suspense } from "react";
import EventsPage from "@/views/Events/EventsPage";

export default function Events() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsPage />
    </Suspense>
  );
}
