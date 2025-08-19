import BorderDecoration from "@/components/BorderDecoration";

const stats = [
  { value: "120,000+", label: "جمعیت", icon: "/icons/users.svg" },
  { value: "1,740", label: "ارتفاع (متر)", icon: "/icons/height.svg" },
  { value: "1,524", label: "وسعت (کیلومتر مربع)", icon: "/icons/area.svg" }
];

export default function CityInfo() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-12 grid lg:grid-cols-[2fr_1fr] gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* کارت بزرگ بالا */}
        <div className="relative col-span-1 text-center md:col-span-2 bg-white justify-center rounded-2xl shadow-md p-6 flex justify-between items-center">
          <BorderDecoration />
          <div >
            <div className="text-3xl font-extrabold text-purple-700">120,000+</div>
            <div className="text-lg font-medium mt-1 text-gray-800">نفر ساکن در نهاوند</div>
          </div>
          {/* <Image src="/images/map-icon.png" alt="Map icon" width={80} height={80} /> */}
        </div>

        {/* سه کارت کوچک زیر */}
        {stats.slice(1).map((item, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center"
          >
            <BorderDecoration />
            <div className="text-2xl font-extrabold text-purple-700">{item.value}</div>
            <div className="text-sm text-gray-700 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* کارت بلند سمت راست */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-extrabold text-purple-700">180+  مقصد گردشگری</div>
          <p className="text-sm text-gray-600 mt-2">برترین تجربه‌ها از مردم و گردشگران</p>
        </div>
        <ul className="mt-6 space-y-3 text-sm font-medium text-black">
          <li>01. چشمه‌های نهاوند</li>
          <li>02. آبشارهای سراب گیان</li>
          <li>03. فرهنگ محلی</li>
          <li>04. باغ‌های تاریخی</li>
        </ul>
      </div>
    </section>
  );
}
