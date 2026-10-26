import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'velvet_pages';

// The word printed in the book. Compared only in this server module.
const BOOK_GATE = 'velvet';

function sha(value) {
  return createHash('sha256').update(String(value)).digest();
}

function same(attempt, expected) {
  return timingSafeEqual(sha(attempt), sha(expected));
}

export function passcodeMatches(pass) {
  const attempt = String(pass || '');
  if (!attempt) return false;
  const secrets = [process.env.VELVET_LETTER_PASSCODE, process.env.VELVET_PAGES_PASSCODE]
    .filter(Boolean);
  if (secrets.some((secret) => same(attempt, secret))) return true;
  return same(attempt.toLowerCase(), BOOK_GATE);
}

function pagesToken() {
  const secret = process.env.VELVET_LETTER_PASSCODE
    || process.env.VELVET_PAGES_PASSCODE
    || BOOK_GATE;
  return createHmac('sha256', secret).update('velvet-pages').digest('hex');
}

export function isPagesUnlocked() {
  const got = cookies().get(COOKIE)?.value || '';
  const expected = pagesToken();
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  if (a.length !== b.length || a.length === 0) return false;
  return timingSafeEqual(a, b);
}

export function setPagesCookie() {
  cookies().set(COOKIE, pagesToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: Boolean(process.env.VERCEL),
    path: '/velvet',
    maxAge: 60 * 60 * 24 * 30,
  });
}
