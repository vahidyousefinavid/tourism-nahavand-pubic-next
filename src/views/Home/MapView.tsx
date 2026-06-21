'use client';

import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { Location, AppLocale } from '@/types';
import BaseMap from '@/components/Map/BaseMap';

// Nahavand city center
const NAHAVAND_CENTER: [number, number] = [34.183, 48.355];

const CATEGORY_CONFIG: Record<string, { color: string; emoji: string }> = {
  historical: { color: '#7C3AED', emoji: '🏛' },
  natural:    { color: '#059669', emoji: '🌿' },
  cultural:   { color: '#2563EB', emoji: '🎭' },
  religious:  { color: '#D97706', emoji: '🕌' },
};

function createPinIcon(category: string, isActive = false) {
  const cfg = CATEGORY_CONFIG[category] ?? { color: '#4B5563', emoji: '📍' };
  const circleSize = isActive ? 44 : 36;
  const fontSize = isActive ? 20 : 16;
  const shadow = isActive
    ? '0 4px 20px rgba(0,0,0,0.4)'
    : '0 2px 10px rgba(0,0,0,0.25)';
  const totalHeight = circleSize + 10; // circle + triangle height

  const html = `
    <div style="display:flex; flex-direction:column; align-items:center; cursor:pointer;">
      <div style="
        width:${circleSize}px;
        height:${circleSize}px;
        background:${cfg.color};
        border-radius:50%;
        border:${isActive ? '3px' : '2.5px'} solid white;
        box-shadow:${shadow};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:${fontSize}px;
        line-height:1;
        transition: transform 0.15s ease;
        ${isActive ? 'transform: scale(1.15);' : ''}
      ">${cfg.emoji}</div>
      <div style="
        width:0; height:0;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:9px solid ${cfg.color};
        margin-top:-1px;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.15));
      "></div>
    </div>`;

  return L.divIcon({
    className: '',
    html,
    iconSize: [circleSize, totalHeight],
    iconAnchor: [circleSize / 2, totalHeight],
    tooltipAnchor: [0, -(totalHeight + 4)],
  });
}

interface MapViewProps {
  locations: Location[];
  locale: AppLocale;
  activeCategory: string | null;
  selectedId: string | null;
  onSelectLocation: (loc: Location) => void;
}

export default function MapView({ locations, locale, activeCategory, selectedId, onSelectLocation }: MapViewProps) {
  const filtered = activeCategory
    ? locations.filter(l => l.category === activeCategory)
    : locations;

  return (
    <BaseMap center={NAHAVAND_CENTER} zoom={12} preferCanvas>
      {filtered.map(location => {
        if (!location.latlng) return null;
        const isActive = location.id === selectedId;
        const icon = createPinIcon(location.category, isActive);
        const name = location.name?.[locale] || location.name?.fa || '';

        return (
          <Marker
            key={location.id}
            position={[location.latlng.lat, location.latlng.lng]}
            icon={icon}
            zIndexOffset={isActive ? 1000 : 0}
            eventHandlers={{ click: () => onSelectLocation(location) }}
          >
            <Tooltip
              direction="top"
              opacity={0.95}
              permanent={false}
            >
              <span style={{
                fontFamily: 'inherit',
                fontSize: '12px',
                fontWeight: 600,
                color: '#111827',
                whiteSpace: 'nowrap',
              }}>
                {name}
              </span>
            </Tooltip>
          </Marker>
        );
      })}
    </BaseMap>
  );
}
