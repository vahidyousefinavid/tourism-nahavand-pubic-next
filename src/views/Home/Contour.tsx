/**
 * منحنی‌های تراز — امضای بصری سایت.
 *
 * نهاوند در کاسه‌ای از زاگرس نشسته: شهر روی ۱٬۷۴۰ متر، و کوه گرین تا ۳٬۶۲۳ متر
 * دورتادورش بالا می‌رود. این حلقه‌ها همان نقشهٔ ارتفاعی‌اند، نه تزئین.
 */
export default function Contour({
  className = '',
  stroke = 'currentColor',
}: {
  className?: string;
  stroke?: string;
}) {
  // هر حلقه یک تراز ارتفاعی؛ از بیرون (دشت) به مرکز (قله)
  const rings = [
    { rx: 300, ry: 205, rot: -8 },
    { rx: 252, ry: 168, rot: -5 },
    { rx: 205, ry: 134, rot: -2 },
    { rx: 160, ry: 103, rot: 2 },
    { rx: 118, ry: 74, rot: 6 },
    { rx: 78, ry: 48, rot: 10 },
    { rx: 42, ry: 25, rot: 14 },
  ];

  return (
    <svg
      viewBox="0 0 640 440"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke={stroke} strokeWidth="1" opacity="0.55">
        {rings.map((r, i) => (
          <ellipse
            key={i}
            cx="320"
            cy="220"
            rx={r.rx}
            ry={r.ry}
            transform={`rotate(${r.rot} 320 220)`}
            strokeDasharray={i % 3 === 1 ? '5 7' : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
