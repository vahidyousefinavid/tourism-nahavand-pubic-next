'use client';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { ACTIVE_TILE } from '@/config/map-provider';

interface BaseMapProps {
  center: [number, number];
  zoom: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  zoomPosition?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  scrollWheelZoom?: boolean;
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
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={false}
      preferCanvas={preferCanvas}
    >
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
