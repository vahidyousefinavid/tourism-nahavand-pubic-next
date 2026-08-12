'use client';

import { useEffect, useRef } from 'react';
import { IRAN_RING, NAHAVAND, isInIran, isLand } from './globe-data';

/**
 * کرهٔ نهاوند.
 *
 * کرهٔ نقطه‌ای چرخان روی کانواس دو‌بعدی ساده — بدون three.js، بدون WebGL، بدون
 * هیچ وابستگی. سه‌بعدی واقعی است: نقطه‌های واقعی روی کره، چرخانده با ماتریس و
 * تقسیم‌شده بر عمق، پس نیم‌رخ کره و پارالاکس هر دو واقعی‌اند.
 *
 * نسخهٔ اول نقطه‌ها را یکنواخت روی کل کره می‌پاشید. نتیجه یک توپ انتزاعی بود که
 * هیچ‌جای زمین را نشان نمی‌داد، و نشانهٔ نهاوند روی آن هیچ زمینه‌ای نداشت.
 * حالا سه لایه روی هم می‌نشیند و هرکدام یک پله از سؤال «نهاوند کجاست» را
 * جواب می‌دهد:
 *
 *   ۱. نقطه‌ها فقط روی خشکی‌اند (ماسک Natural Earth) → کره «زمین» خوانده می‌شود
 *   ۲. مرز واقعی ایران رویش کشیده و داخلش روشن‌تر است → «این‌جای زمین»
 *   ۳. نهاوند با نقطهٔ سفید و ضربان داخل ایران → «این نقطه از ایران»
 *
 * حلقه‌های عرض جغرافیایی نسخهٔ قبلی حذف شدند: با ابر نقطهٔ خشکی روی هم می‌افتادند
 * و تصویر را شلوغ می‌کردند بدون اینکه چیزی بگویند.
 */

interface Props {
  /** پیکسل CSS. بافر کانواس این عدد ضربدر نسبت پیکسلی دستگاه است. */
  size?: number;
  className?: string;
  /** متن جایگزین برای صفحه‌خوان‌ها. از بیرون می‌آید تا ترجمه‌پذیر بماند. */
  label?: string;
}

/** نامزدهای نقطه روی کل کره؛ بعد از ماسک حدود یک‌سومش می‌ماند.
 *  با ۵۲۰۰ نامزد فقط ~۹۰۰ نقطه روی نیمکرهٔ دیده‌شده می‌افتاد و چون تصویر کره
 *  نقطه‌ها را طرف لبه فشرده می‌کند، کره حلقه‌ای توخالی به نظر می‌رسید نه قاره‌دار. */
const CANDIDATES = 15000;

interface Pt { x: number; y: number; z: number; iran: boolean }

/** طول و عرض جغرافیایی → نقطه روی کرهٔ واحد */
function geo(lat: number, lon: number) {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return {
    x: Math.cos(la) * Math.cos(lo),
    y: Math.sin(la),
    z: Math.cos(la) * Math.sin(lo),
  };
}

/**
 * کرهٔ فیبوناچی: تنها راه ارزان برای پخش *یکنواخت* نقطه روی کره.
 * شبکهٔ ساده طول/عرض همه‌چیز را کنار قطب‌ها تلنبار می‌کند.
 * هر نامزد از ماسک خشکی رد می‌شود و فقط خشکی‌ها می‌مانند.
 */
function landPoints(n: number): Pt[] {
  const out: Pt[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = phi * i;
    const x = Math.cos(th) * r;
    const z = Math.sin(th) * r;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(z, x) * 180) / Math.PI;
    if (!isLand(lat, lon)) continue;
    out.push({ x, y, z, iran: isInIran(lat, lon) });
  }
  return out;
}

/** مقدار یک متغیر CSS را به رنگ واقعی تبدیل می‌کند. */
function cssVar(el: Element, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

export default function NahavandGlobe({ size = 460, className, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const pts = landPoints(CANDIDATES);
    const mark = geo(NAHAVAND.lat, NAHAVAND.lon);
    // مرز ایران یک‌بار به نقاط کره تبدیل می‌شود، نه هر فریم.
    const ring: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < IRAN_RING.length; i += 2) {
      ring.push(geo(IRAN_RING[i + 1], IRAN_RING[i]));
    }

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.36;
    // فاصلهٔ دوربین برحسب شعاع کره. کم‌تر از این فیش‌آی می‌شود،
    // بیشتر از این تقسیم بر عمق دیده نمی‌شود و کره تخت می‌زند.
    const CAM = 3.2;

    const theme = (() => {
      const root = document.documentElement;
      return {
        land: cssVar(root, '--nh-water', '#8fc0b6'),
        iran: cssVar(root, '--nh-gold', '#d9a441'),
        spring: cssVar(root, '--nh-spring', '#0e6b58'),
      };
    })();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // زاویه‌ای که ایران را دقیقاً روبه‌روی بیننده می‌آورد، از خود مختصات حساب می‌شود.
    const FACE = Math.PI - Math.atan2(mark.x, mark.z);
    // چرخش کامل ایران را نیمی از زمان می‌بَرد پشت کره — یعنی همان نیمه‌ای که
    // تصویر حرفی برای گفتن ندارد. پس آرام حول همان زاویه تاب می‌خورد.
    const SWING = 0.62;

    let raf = 0;
    let t = 0;
    let spin = FACE;
    let last = performance.now();
    let visible = true;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    const onVisibility = () => { if (!document.hidden) last = performance.now(); };
    document.addEventListener('visibilitychange', onVisibility);

    // شیب ثابت تا نیم‌کرهٔ شمالی رو به بیننده بیفتد و کره دیسک تخت نشود.
    const tiltS = Math.sin(-0.38);
    const tiltC = Math.cos(-0.38);

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      // محدودشده: برگشت از تب پس‌زمینه نباید کره را بپراند.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      t += dt;
      spin = FACE + Math.sin(t * 0.16) * SWING;
      draw();
    }

    /** نقطهٔ جهانی → صفحه، همراه با عمق برای شفافیت و اندازه. */
    function project(p: { x: number; y: number; z: number }) {
      const sin = Math.sin(spin);
      const cos = Math.cos(spin);
      const x1 = p.x * cos + p.z * sin;
      const z1 = -p.x * sin + p.z * cos;
      const y2 = p.y * tiltC - z1 * tiltS;
      const z2 = p.y * tiltS + z1 * tiltC;
      const k = CAM / (CAM + z2);
      // منهای y2، نه به‌علاوه: محور y کانواس رو به پایین است و محور y دنیا رو به بالا.
      // با جمع، کره وارونه می‌شد و ایران به‌جای بالای استوا زیرش می‌افتاد.
      return { sx: cx + x1 * R * k, sy: cy - y2 * R * k, depth: z2, k };
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      /* ── قرص اقیانوس: کره باید جسم باشد، نه ابر نقطهٔ معلق ── */
      const ocean = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      ocean.addColorStop(0, withAlpha(theme.spring, 0.34));
      ocean.addColorStop(1, withAlpha(theme.spring, 0.1));
      ctx.fillStyle = ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      /* ── لبهٔ کره ── */
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = theme.land;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      /* ── خشکی‌ها: اول نیمهٔ پشتی، بعد نیمهٔ جلویی ── */
      for (const pass of [1, -1]) {
        for (const p of pts) {
          const pr = project(p);
          if (pass === 1 ? pr.depth < 0 : pr.depth >= 0) continue;
          const back = pr.depth >= 0;
          if (p.iran) {
            // ایران با رنگ لهجه و درشت‌تر، جدا از بقیهٔ خشکی‌ها
            ctx.globalAlpha = back ? 0.1 : 0.95;
            ctx.fillStyle = theme.iran;
            ctx.beginPath();
            ctx.arc(pr.sx, pr.sy, (back ? 0.7 : 1.9) * pr.k, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.globalAlpha = back ? 0.055 : 0.6;
            ctx.fillStyle = theme.land;
            ctx.beginPath();
            ctx.arc(pr.sx, pr.sy, (back ? 0.6 : 1.15) * pr.k, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      /* ── مرز ایران ── */
      ctx.lineWidth = 1.6;
      ctx.lineJoin = 'round';
      for (let i = 0; i < ring.length; i++) {
        const p0 = project(ring[i]);
        const p1 = project(ring[(i + 1) % ring.length]);
        // اگر هر دو سر قطعه پشت کره باشند نباید کشیده شود
        if (p0.depth >= 0 && p1.depth >= 0) continue;
        ctx.globalAlpha = p0.depth < 0 ? 0.9 : 0.25;
        ctx.strokeStyle = theme.iran;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.stroke();
      }

      /* ── نهاوند ── */
      const m = project(mark);
      if (m.depth < 0) {
        const face = Math.min(1, -m.depth / 0.8);
        const pulse = reduced ? 0.45 : (Math.sin(t * 2.1) + 1) / 2;

        // حلقهٔ ضربان
        ctx.globalAlpha = 0.5 * face * (1 - pulse);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(m.sx, m.sy, 5 + pulse * 20, 0, Math.PI * 2);
        ctx.stroke();

        // نشانه داخل ایرانِ طلایی می‌نشیند، پس سفیدِ تنها رویش گم می‌شود.
        // یک حلقهٔ تیره دورش می‌گذاریم تا از زمینه جدا شود.
        ctx.globalAlpha = face * 0.85;
        ctx.fillStyle = 'rgba(19,32,25,0.95)';
        ctx.beginPath();
        ctx.arc(m.sx, m.sy, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = face;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(m.sx, m.sy, 3.4, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── هالهٔ بیرونی ── */
      ctx.globalAlpha = 1;
      const glow = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.42);
      glow.addColorStop(0, withAlpha(theme.spring, 0.42));
      glow.addColorStop(1, withAlpha(theme.spring, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      ctx.globalAlpha = 1;
    }

    if (reduced) draw();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size, display: 'block' }}
      role="img"
      aria-label={label ?? 'کرهٔ زمین؛ ایران مشخص شده و نهاوند روی آن علامت خورده است'}
    />
  );
}

/** اعمال آلفا روی رنگی که ممکن است hex باشد یا rgb() — هر دو در متغیرها هست. */
function withAlpha(color: string, a: number): string {
  const c = color.trim();
  if (c.startsWith('#')) {
    const hex = c.length === 4 ? c.slice(1).split('').map((ch) => ch + ch).join('') : c.slice(1, 7);
    const n = parseInt(hex, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  const nums = c.match(/[\d.]+/g);
  if (nums && nums.length >= 3) return `rgba(${nums[0]}, ${nums[1]}, ${nums[2]}, ${a})`;
  return c;
}
