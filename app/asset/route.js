import { NextResponse } from 'next/server';
import { projectId, dataset } from '../sanity/env';

export const dynamic = 'force-dynamic';

// Serves a Sanity image without putting the read token in the page.
// Only this project's image CDN is allowed.
export async function GET(request) {
  const src = request.nextUrl.searchParams.get('src') || '';
  let url;
  try {
    url = new URL(src);
  } catch {
    return new NextResponse('Bad image', { status: 400 });
  }

  const prefix = `/images/${projectId}/${dataset}/`;
  const allowed = url.protocol === 'https:'
    && url.hostname === 'cdn.sanity.io'
    && url.pathname.startsWith(prefix)
    && !url.pathname.includes('..');
  if (!allowed) return new NextResponse('Bad image', { status: 400 });

  url.searchParams.delete('token');
  const token = (process.env.SANITY_API_READ_TOKEN || '').trim();
  if (token) url.searchParams.set('token', token);

  const upstream = await fetch(url.toString(), { cache: 'no-store' });
  if (!upstream.ok) return new NextResponse('Image unavailable', { status: 502 });

  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
