"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import EventCardV2 from "@/components/Cards/EventV2";
import { Modal } from "@/components/ui/Modal";
import EventModalContent from "../Events/EventModalContent";
import { useTranslation } from "react-i18next";
import { AppLocale } from "@/types";
import { useDirection } from "@/hooks/useDirection";
import SectionHeader from "./SectionHeader";
import CardRail from "./CardRail";

export default function EventSwipperV2() {
  const { t, i18n } = useTranslation();
  const { dir } = useDirection();
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    axios
      .get("/api/events/top/views")
      .then((res) => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch(() => {});
  }, []);

  return (
    <section dir={dir} className="bg-[var(--nh-paper-warm)] py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
        <SectionHeader
          eyebrow={t("events.sectionTag", "تقویم رویدادها")}
          title={t("events.title", "این روزها در نهاوند")}
          subtitle={t(
            "events.subtitle",
            "جشن‌ها، نمایشگاه‌ها و برنامه‌های فرهنگی شهر — با تاریخ و نشانی دقیق.",
          )}
          href="/events"
          linkLabel={t("events.viewAll", "همهٔ رویدادها")}
        />

        <CardRail
          items={events}
          getKey={(e) => e.id}
          empty={{
            title: t("events.emptyTitle", "فعلاً رویدادی در تقویم نیست"),
            body: t(
              "events.emptyBody",
              "به‌محض ثبت برنامه‌های تازهٔ شهر، همین‌جا می‌بینیدشان. تا آن موقع می‌توانید از مکان‌های دیدنی نهاوند شروع کنید.",
            ),
            href: "/locations",
            linkLabel: t("events.emptyCta", "دیدن مکان‌های دیدنی"),
          }}
          more={{
            href: "/events",
            label: t("events.viewAll", "همهٔ رویدادها"),
            note: t("events.moreNote", "تقویم کامل شهر"),
          }}
          renderItem={(event: any, index: number) => (
            <EventCardV2
              id={event.id}
              image={event.image}
              title={event.title}
              description={event.description}
              location={event.location}
              timeRanges={event.timeRanges}
              index={index}
              onClick={() => {
                setSelectedEvent(event);
                fetch(`/api/events/${event.id}/view`, { method: "POST" }).catch(() => {});
              }}
              locale={i18n.language as AppLocale}
            />
          )}
        />
      </div>

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title?.[i18n.language as AppLocale] || selectedEvent?.title?.fa}
      >
        {selectedEvent && (
          <EventModalContent event={selectedEvent} locale={i18n.language as AppLocale} />
        )}
      </Modal>
    </section>
  );
}
