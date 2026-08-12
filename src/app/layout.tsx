import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Footer from "../views/Footer/Footer";
import Navbar from "../components/Navbar";
import LanguageProvider from "@/providers/LanguageProvider";
import AppLoader from "@/components/AppLoader";
import TopLoader from "@/components/TopLoader";
import SwRegister from "@/components/Map/SwRegister";
// import ClientProgressBar from "@/components/ClientProgressBar";

const tanha = localFont({
  src: [
    {
      path: "../../public/fonts/Tanha/Tanha.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tanha",
});

const parastoo = localFont({
  src: [
    {
      path: "../../public/fonts/Parastoo/Parastoo.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-parastoo",
});

const iranyekan = localFont({
  src: [
    {
      path: "../../public/fonts/IRANYekan/IRANYekan.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan",
});

const vazir = localFont({
  src: [
    {
      path: "../../public/fonts/Vazir/Vazir.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
});

// لاله‌زار — تیترها. برگرفته از حروف‌نگاری تابلوهای شهری ایران.
const lalezar = localFont({
  src: [{ path: "../../public/fonts/Lalezar/Lalezar-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-lalezar",
  display: "swap",
});

// استعداد — عددها و برچسب‌های ریز
const estedad = localFont({
  src: [
    { path: "../../public/fonts/Estedad/Estedad-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Estedad/Estedad-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-estedad",
  display: "swap",
});

// وزیرمتن — متن اصلی
const vazirmatn = localFont({
  src: [
    { path: "../../public/fonts/Vazirmatn/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Vazirmatn/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Vazirmatn/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

// این متادیتا سمت سرور ساخته می‌شود و زبان سایت سمت کلاینت عوض می‌شود،
// پس تا وقتی مسیرها زبان‌دار نشوند (‎/en/…‎) فقط یک زبان می‌تواند اینجا بنشیند.
// فارسی انتخاب شده چون زبان پیش‌فرض و اصلی مخاطب است.
export const metadata: Metadata = {
  title: "گردشگری نهاوند | سراب‌ها، تپه گیان و طبیعت زاگرس",
  description:
    "راهنمای سفر به نهاوند در استان همدان: مکان‌های دیدنی، سراب گیان و فارسبان، تپهٔ گیان، رویدادهای شهر و فرصت‌های سرمایه‌گذاری.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${tanha.variable} ${parastoo.variable} ${iranyekan.variable} ${vazir.variable} ${lalezar.variable} ${estedad.variable} ${vazirmatn.variable} font-sans`}
      >
        <TopLoader />
        <SwRegister />

        <LanguageProvider>
          <AppLoader>
            <Navbar />
            {/* <ClientProgressBar /> */}
            <div className="min-h-[100vh] pt-[100px]">
              {children}
            </div>
            <Footer />
          </AppLoader>
        </LanguageProvider>
      </body>
    </html>
  );
}
