import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from './env';

// Viewer read token. Server only. Never NEXT_PUBLIC, and never sent to the browser.
// Unset until the production dataset is made private. Reads stay public until then.
const token = (process.env.SANITY_API_READ_TOKEN || '').trim();

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The public CDN does not accept an authenticated read. A token uses the API.
  useCdn: !token,
  token: token || undefined,
  perspective: 'published',
});
