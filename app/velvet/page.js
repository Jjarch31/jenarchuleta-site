import { OG_IMAGE } from '../components/site-data';
import { isPagesUnlocked } from './passcode';
import VelvetLocked from './VelvetLocked';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'The Velvet Letter',
  description: 'The Velvet Letter, a private journal for readers of Beyond the Velvet Ropes.',
  robots: { index: false, follow: false },
  openGraph: { images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

export default async function VelvetPage() {
  // Locked render stops here. Letter documents are not fetched, so they
  // cannot appear in this response.
  if (!isPagesUnlocked()) return <VelvetLocked />;

  const { getVelvetLetters } = await import('../sanity/queries');
  const { default: VelvetInside } = await import('./VelvetInside');
  let letters = [];
  try {
    letters = await getVelvetLetters();
  } catch {
    console.error('Velvet Letter fetch failed');
    letters = [];
  }
  return <VelvetInside letters={Array.isArray(letters) ? letters : []} />;
}
