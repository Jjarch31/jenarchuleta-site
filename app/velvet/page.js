import VelvetClient from './VelvetClient';
import { getVelvetLetters } from '../sanity/queries';
import { OG_IMAGE } from '../components/site-data';

export const metadata = {
  title: 'The Velvet Pages',
  description: 'Exclusive content for readers of Beyond the Velvet Ropes.',
  robots: { index: false, follow: false },
  openGraph: { images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

export default async function VelvetPage() {
  const letters = await getVelvetLetters().catch(() => []);
  return <VelvetClient letters={letters} />;
}
