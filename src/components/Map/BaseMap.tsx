'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import { ACTIVE_TILE } from '@/config/map-provider';

/**
 * قفل/بازکردن تعامل نقشه بعد از ساخته‌شدن آن.
 *
 * پراپ‌های MapContainer فقط موقع ساخت اعمال می‌شوند، پس برای تغییر در زمان اجرا
 * باید مستقیم سراغ هندلرهای خود لیفلت رفت.
 */
function InteractionLock({ enabled }: { enabled: boolean }) {
  const map = useMap();
  useEffect(() => {
    const handlers = [
      map.dragging,
      map.touchZoom,
      map.doubleClickZoom,
      map.scrollWheelZoom,
      map.boxZoom,
      map.keyboard,
    ];
    handlers.forEach((h) => (enabled ? h?.enable() : h?.disable()));
  }, [map, enabled]);
  return null;
}

interface BaseMapProps {
  center: [number, number];
  zoom: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  zoomPosition?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  scrollWheelZoom?: boolean;
  /** وقتی false باشد نقشه لمس و چرخ ماوس را نمی‌گیرد و صفحه آزادانه اسکرول می‌شود. */
  interactive?: boolean;
  preferCanvas?: boolean;
  tileUrl?: string;
  tileAttribution?: string;
}

export default function BaseMap({
  center,
  zoom,
  children,
  style,
  zoomPosition = 'bottomleft',
  scrollWheelZoom = true,
  interactive = true,
  preferCanvas,
  tileUrl,
  tileAttribution,
}: BaseMapProps) {
  const url = tileUrl ?? ACTIVE_TILE.url;
  const attribution = tileAttribution ?? ACTIVE_TILE.attribution;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={style ?? { height: '100%', width: '100%' }}
      scrollWheelZoom={scrollWheelZoom && interactive}
      dragging={interactive}
      touchZoom={interactive}
      doubleClickZoom={interactive}
      zoomControl={false}
      preferCanvas={preferCanvas}
    >
      <InteractionLock enabled={interactive} />
      <ZoomControl position={zoomPosition} />
      <TileLayer
        key={url}
        url={url}
        attribution={attribution}
        subdomains={ACTIVE_TILE.subdomains ?? 'abcd'}
        maxZoom={ACTIVE_TILE.maxZoom ?? 19}
        keepBuffer={4}
        updateWhenIdle={false}
        detectRetina
        crossOrigin="anonymous"
      />
      {children}
    </MapContainer>
  );
}
