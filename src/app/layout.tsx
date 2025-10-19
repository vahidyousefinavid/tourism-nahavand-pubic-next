import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import Footer from "../views/Footer/Footer";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazir = Vazirmatn({
  subsets: ["arabic"], // یا ["latin", "arabic"] برای پشتیبانی دوزبانه
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "گردشگری نهاوند",
  description: "گردشگری نهاوند",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} font-sans`}
      >
        <Navbar />
        <div className="min-h-[100vh] pt-[100px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
