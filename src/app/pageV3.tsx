"use client"

import React from "react";
import Navbar from "../components/Navbar";
import SectionTitle from "../views/Home/SectionTitle";
import TourismTypewriter from "../views/Home/TourismTypewriter";
import ExpandableText from "../views/Home/ExpandableText";
import VisitCard from "../components/Cards/Visit";
import CTACard from "../components/Cards/CTA";
import LocationSwipper from "../views/Home/LocationSwipper";
import EventSwipper from "../views/Home/EventSwipper";
import HistoryGallery from "../views/Home/HistoryGallery";
import CityInfo from "../views/Home/CityInfo";

export default function Home() {
  return (
    <div
      className="flex flex-col top-0 left-0 w-full h-full z-[-1] bg-white bg-contain bg-no-repeat bg-center py-[0px] p-[8px] pb-[30px] gap-12"
    >
      <div className="flex items-center justify-center pt-[120px] sm:pt-[80px]  relative">
        <img
          src="/images/o.png"
          alt="background"
          className="max-w-[80%] max-h-[80vh] object-contain"
        />
      </div>
      {/* <SwitcherCard /> */}
      <TourismTypewriter />
      {/* <ExpandableText /> */}
      <SectionTitle text="مکان های گردشگری" />
      <LocationSwipper />
      <SectionTitle text="رویداد ها" />
      <EventSwipper />
      <CityInfo/>
      <SectionTitle text="تصاویر" />
      <HistoryGallery />
    </div>
  );
}
