'use server';

import { createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { velvetLetterToken } from './token';

const COOKIE = 'velvet_letter';

function digest(value) {
  return createHash('sha256').update(value).digest();
}

export async function unlockVelvetLetter(formData) {
  const pass = String(formData.get('passcode') || '');
  const expected = process.env.VELVET_LETTER_PASSCODE || '';
  if (!expected || !pass) return { ok: false };

  const a = digest(pass);
  const b = digest(expected);
  if (!timingSafeEqual(a, b)) return { ok: false };

  cookies().set(COOKIE, velvetLetterToken(expected), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/velvet-letter',
    maxAge: 60 * 60 * 24 * 30,
  });
  return { ok: true };
}
