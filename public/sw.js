const TILE_CACHE = 'map-tiles-v1';

const isTile = (url) => {
  const { hostname, pathname } = new URL(url);
  return (
    hostname.endsWith('basemaps.cartocdn.com') ||
    hostname.endsWith('tile.openstreetmap.org') ||
    pathname.startsWith('/api/neshan-tile/')
  );
};

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!isTile(event.request.url)) return;

  event.respondWith(
    caches.open(TILE_CACHE).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) return cached;

      const response = await fetch(event.request);
      if (response.ok) cache.put(event.request, response.clone());
      return response;
    })
  );
});
