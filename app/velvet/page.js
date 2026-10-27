import { getVelvetLetters } from '../sanity/queries';
import { OG_IMAGE } from '../components/site-data';
import { isPagesUnlocked } from './passcode';
import VelvetLocked from './VelvetLocked';
import VelvetInside from './VelvetInside';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'The Velvet Letter',
  description: 'The Velvet Letter, a private journal for readers of Beyond the Velvet Ropes.',
  robots: { index: false, follow: false },
  openGraph: { images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

export default async function VelvetPage() {
  if (!isPagesUnlocked()) return <VelvetLocked />;
  const letters = await getVelvetLetters().catch(() => []);
  return <VelvetInside letters={letters || []} />;
}
