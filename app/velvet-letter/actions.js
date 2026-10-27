'use server';

import { cookies } from 'next/headers';
import { gateKey, passcodeMatches } from '../velvet/passcode';
import { velvetLetterToken } from './token';

const COOKIE = 'velvet_letter';

export async function unlockVelvetLetter(formData) {
  const pass = String(formData.get('passcode') || '');
  if (!passcodeMatches(pass)) return { ok: false };
  const expected = gateKey();
  if (!expected) return { ok: false };

  cookies().set(COOKIE, velvetLetterToken(expected), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/velvet-letter',
    maxAge: 60 * 60 * 24 * 30,
  });
  return { ok: true };
}
