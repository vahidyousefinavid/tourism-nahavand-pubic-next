
"use client"
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection";

export default function CTASection() {
    const { t } = useTranslation();
    const { dir } = useDirection();

    return (
        <section className="bg-blue-600 text-white py-16 px-4" dir={dir}>
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {t('cta.title', 'آماده کشف نهاوند هستید؟')}
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    {t('cta.subtitle', 'با ما همراه شوید و بهترین تجربه سفر را داشته باشید')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                        <Link href="/about">{t('cta.aboutBtn', 'درباره ما')}</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white bg-[none] hover:bg-white hover:text-blue-600">
                        <Link href="/culture">{t('cta.cultureBtn', 'فرهنگ نهاوند')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}