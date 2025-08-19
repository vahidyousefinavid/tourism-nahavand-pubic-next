'use client';
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 py-4 pt-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-right">
                <div>
                    <div className='flex '>
                        <a
                            className='flex flex-col justify-center items-center gap-2 cursor-pointer'
                            href='/'
                        >
                            <img
                                src={'/images/cities/icons/nahavand.png'}
                                className='!w-[40px]'
                            />
                            <h2 className='font-bold'>
                                شهرداری نهاوند
                            </h2>
                        </a>
                    </div>
                    {/* <h3 className="text-lg font-bold mb-4">ما را دنبال کنید</h3> */}
                    <div className="flex justify-end gap-4 rtl:flex-row-reverse">
                        {/* <a href="https://twitter.com" target="_blank" aria-label="Twitter" className="hover:text-[#1DA1F2] transition">
                            <Twitter size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" aria-label="Instagram" className="hover:text-[#E1306C] transition">
                            <Instagram size={20} />
                        </a>
                        <a href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:text-[#1877F2] transition">
                            <Facebook size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="hover:text-[#0077b5] transition">
                            <Linkedin size={20} />
                        </a> */}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">درباره نهاوند</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/about" className="hover:text-blue-600 transition-colors">معرفی شهر</a>
                        </li>
                        <li>
                            <a href="/history" className="hover:text-blue-600 transition-colors">تاریخچه نهاوند</a>
                        </li>
                        <li>
                            <a href="/culture" className="hover:text-blue-600 transition-colors">فرهنگ و مردم</a>
                        </li>
                        <li>
                            {/* <a href="/nature" className="hover:text-blue-600 transition-colors">چشمه‌ها و طبیعت</a> */}
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">راهنمای سفر</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/places" className="hover:text-blue-600">مکان ها</a></li>
                        <li><a href="/events" className="hover:text-blue-600">رویدادها</a></li>
                        {/* <li><a href="/restaurants" className="hover:text-blue-600">رستوران‌های سنتی</a></li> */}
                        {/* <li><a href="/weather" className="hover:text-blue-600">آب‌و‌هوا و اقلیم</a></li> */}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">لینک‌های مفید</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="http://sh-nahavand.ir/" className="hover:text-blue-600">شهرداری نهاوند</a></li>
                        {/* <li><a href="/contact" className="hover:text-blue-600">تماس با ما</a></li>
                        <li><a href="/about-us" className="hover:text-blue-600">درباره ما</a></li> */}
                        {/* <li><a href="/terms" className="hover:text-blue-600">قوانین سایت</a></li> */}
                    </ul>
                </div>
            </div>

            {/* کپی‌رایت */}
            <div className="mt-10 border-t border-gray-300 pt-6 text-sm text-gray-600 text-center">
                © {new Date().getFullYear()} تمامی حقوق برای <span className="font-bold">نهاوند‌گردی</span> محفوظ است.
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
                | طراحی و توسعه توسط شرکت رادمان افزار  هومان (تلفن تماس: 09999096052) |
            </div>
        </footer>
    );
}
