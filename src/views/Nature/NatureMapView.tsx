'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { NaturalPlace } from './NaturePage';

const CAT_COLOR: Record<string, string> = {
  waterfall: '#0891b2',
  river:     '#2563eb',
  mountain:  '#7c3aed',
  forest:    '#16a34a',
  valley:    '#65a30d',
  lake:      '#0284c7',
  plain:     '#ca8a04',
  spring:    '#059669',
};

const CAT_EMOJI: Record<string, string> = {
  waterfall: '💧',
  river:     '🌊',
  mountain:  '⛰',
  forest:    '🌲',
  valley:    '🏔',
  lake:      '🏞',
  plain:     '🌾',
  spring:    '💦',
};

function createIcon(category: string, selected: boolean) {
  const color = CAT_COLOR[category] ?? '#059669';
  const emoji = CAT_EMOJI[category] ?? '📍';
  const size = selected ? 48 : 38;
  const pulse = selected
    ? `<div class="nature-pulse" style="position:absolute;inset:-10px;border-radius:50%;border:2.5px solid ${color};pointer-events:none;"></div>`
    : '';
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      ${pulse}
      <div style="
        width:${size}px;height:${size}px;
        background:${color};
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 3px 14px rgba(0,0,0,0.28)${selected ? `,0 0 0 4px ${color}50` : ''};
        display:flex;align-items:center;justify-content:center;
        font-size:${Math.round(size * 0.44)}px;
        transition:all 0.25s;
      ">${emoji}</div>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FlyToSelected({ place }: { place: NaturalPlace | null }) {
  const map = useMap();
  const prevId = useRef<string | null>(null);
  useEffect(() => {
    if (!place || place.id === prevId.current) return;
    prevId.current = place.id;
    map.flyTo([place.lat, place.lng], 14, { duration: 0.9, easeLinearity: 0.3 });
  }, [place, map]);
  return null;
}

interface Props {
  places: NaturalPlace[];
  allPlaces: NaturalPlace[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showTrail: boolean;
  trailPath: [number, number][];
  darkMap: boolean;
}

export default function NatureMapView({ places, allPlaces, selectedId, onSelect, showTrail, trailPath, darkMap }: Props) {
  const selectedPlace = allPlaces.find(p => p.id === selectedId) ?? null;

  const tileUrl = darkMap
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <MapContainer
      center={[34.183, 48.355]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom
      zoomControl
    >
      <TileLayer
        key={tileUrl}
        url={tileUrl}
        attribution='&copy; OpenStreetMap &copy; CARTO'
        subdomains="abcd"
        maxZoom={19}
        keepBuffer={4}
        updateWhenIdle={false}
        detectRetina
        crossOrigin="anonymous"
      />

      {places.map(place => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createIcon(place.category, place.id === selectedId)}
          eventHandlers={{ click: () => onSelect(place.id) }}
        />
      ))}

      {showTrail && (
        <>
          <Polyline positions={trailPath} color="white" weight={7} opacity={0.6} />
          <Polyline
            positions={trailPath}
            color="#16a34a"
            weight={3.5}
            opacity={0.95}
            className="nature-trail"
          />
        </>
      )}

      <FlyToSelected place={selectedPlace} />
    </MapContainer>
  );
}
