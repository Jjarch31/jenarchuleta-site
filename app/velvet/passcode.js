import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'velvet_pages';

// SHA-256 of the word the live site already accepts, after the same
// normalization used below. The word itself stays out of this repo.
const LIVE_DIGEST = Buffer.from(
  'f4c44266a2dfad9847930615218f2811c5ee3248c6df3d3921a6d2b8e67c8bf6',
  'hex',
);

export function normalizePasscode(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u0060\u00B4]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u2033]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\u00A0/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/^['"]+|['"]+$/g, '');
}

function sha(value) {
  return createHash('sha256').update(String(value)).digest();
}

function same(attempt, expected) {
  return timingSafeEqual(sha(attempt), sha(expected));
}

function configuredSecret() {
  for (const value of [process.env.VELVET_LETTER_PASSCODE, process.env.VELVET_PAGES_PASSCODE]) {
    if (value && String(value).trim()) return String(value);
  }
  return '';
}

export function passcodeMatches(pass) {
  const attempt = normalizePasscode(pass);
  if (!attempt) return false;
  const secrets = [process.env.VELVET_LETTER_PASSCODE, process.env.VELVET_PAGES_PASSCODE]
    .map((value) => normalizePasscode(value))
    .filter(Boolean);
  if (secrets.some((secret) => same(attempt, secret))) return true;
  const digest = sha(attempt);
  return digest.length === LIVE_DIGEST.length && timingSafeEqual(digest, LIVE_DIGEST);
}

// Cookie signatures keep the raw env value when one is set, so a
// passcode saved before this change still opens the door. With no env
// value, the signature key is the digest above, never the word.
export function gateKey() {
  return configuredSecret() || LIVE_DIGEST.toString('hex');
}

function pagesToken() {
  return createHmac('sha256', gateKey()).update('velvet-pages').digest('hex');
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
