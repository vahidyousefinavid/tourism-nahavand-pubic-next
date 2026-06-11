import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "../views/Footer/Footer";
import Navbar from "../components/Navbar";
import LanguageProvider from "@/providers/LanguageProvider";
import AppLoader from "@/components/AppLoader";
import TopLoader from "@/components/TopLoader";
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

export const metadata: Metadata = {
  title: "گردشگری نهاوند",
  description: "گردشگری نهاوند",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${tanha.variable} ${parastoo.variable} ${iranyekan.variable} ${vazir.variable} font-sans`}
      >
        <TopLoader />

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
