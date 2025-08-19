import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="bg-blue-600 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    آماده کشف نهاوند هستید؟
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    با ما همراه شوید و بهترین تجربه سفر را داشته باشید
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                        <Link href="/about">درباره ما</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white bg-[none] hover:bg-white hover:text-blue-600">
                        <Link href="/culture">فرهنگ نهاوند</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}