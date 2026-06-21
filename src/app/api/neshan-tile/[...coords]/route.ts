import { NextRequest, NextResponse } from 'next/server';

const NESHAN_STYLE = 'standard-day';
const TILE_BASE = `https://api.neshan.org/v1/map-tiles/${NESHAN_STYLE}`;

export async function GET(
  _req: NextRequest,
  { params }: { params: { coords: string[] } }
) {
  const [z, x, y] = params.coords;

  if (!z || !x || !y) {
    return new NextResponse('Missing tile coordinates', { status: 400 });
  }

  const apiKey = process.env.NESHAN_API_KEY;
  if (!apiKey) {
    return new NextResponse('NESHAN_API_KEY not configured', { status: 503 });
  }

  try {
    const upstream = await fetch(`${TILE_BASE}/${z}/${x}/${y}.png`, {
      headers: { 'Api-Key': apiKey },
      cache: 'force-cache',
    });

    if (!upstream.ok) {
      return new NextResponse('Upstream tile error', { status: upstream.status });
    }

    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Tile fetch failed', { status: 502 });
  }
}
