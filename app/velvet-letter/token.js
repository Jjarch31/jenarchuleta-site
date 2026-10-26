import { createHmac } from 'crypto';

export function velvetLetterToken(secret) {
  return createHmac('sha256', secret).update('velvet-letter').digest('hex');
}
