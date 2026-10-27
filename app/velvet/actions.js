'use server';

import { passcodeMatches, setPagesCookie } from './passcode';

export async function unlockVelvetPages(formData) {
  const pass = String(formData.get('passcode') || '');
  if (!passcodeMatches(pass)) return { ok: false };
  setPagesCookie();
  return { ok: true };
}
