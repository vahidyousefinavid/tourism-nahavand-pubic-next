/**
 * Map provider configuration.
 *
 * To switch to Neshan:
 *  1. Set NEXT_PUBLIC_MAP_PROVIDER=neshan  in .env / docker-compose
 *  2. Set NESHAN_API_KEY=<your-key>        in .env / docker-compose (server-side)
 *  3. Uncomment and deploy — the proxy route at /api/neshan-tile handles auth.
 *
 * Current default: OpenStreetMap with Persian-optimized tiles (works without any key).
 */

export type MapProvider = 'osm' | 'neshan';

const PROVIDER = (process.env.NEXT_PUBLIC_MAP_PROVIDER ?? 'osm') as MapProvider;

interface TileConfig {
  url: string;
  attribution: string;
  subdomains?: string;
  maxZoom?: number;
}

const TILE_CONFIGS: Record<MapProvider, TileConfig> = {
  /**
   * CartoDB Voyager — free, no key, Fastly CDN (faster than OSM in Middle East).
   * Shows Persian labels via OSM data.
   */
  osm: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  },

  /**
   * Neshan — Iranian map, works inside Iran even when international internet is blocked.
   * Tiles are fetched server-side via /api/neshan-tile/{z}/{x}/{y} to keep the API key private.
   * See: src/app/api/neshan-tile/[...coords]/route.ts  (ready to activate)
   */
  neshan: {
    url: '/api/neshan-tile/{z}/{x}/{y}',
    attribution: '&copy; <a href="https://neshan.org">نشان</a>',
    maxZoom: 19,
  },
};

export const ACTIVE_TILE = TILE_CONFIGS[PROVIDER];
export const ACTIVE_PROVIDER = PROVIDER;
