import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { BOOKING_EMAIL } from '../components/site-data';
import './sponsors.css';

export const metadata = {
  title: 'Sponsors',
  description:
    'Past sponsors of Unfiltered with Jen Archuleta.',
};

const SPONSORS = [
  {
    name: 'Sunsets & Bonfires',
    links: [
      { label: 'sunsetsandbonfires.com', href: 'https://sunsetsandbonfires.com' },
      { label: 'Instagram @sunsetsbonfires', href: 'https://instagram.com/sunsetsbonfires' },
    ],
  },
  {
    name: 'Thrive Media',
    note: 'Also produced the podcast.',
    links: [
      { label: 'Instagram @thrivemedia.social', href: 'https://instagram.com/thrivemedia.social' },
    ],
  },
  {
    name: 'Photos of Jennifer Walcott (An Autographs Company)',
    links: [
      { label: 'Instagram @PhotosofJenniferWalcott', href: 'https://instagram.com/PhotosofJenniferWalcott' },
    ],
  },
  {
    name: 'KJ Classic Creations',
    links: [
      { label: 'kjclassiccreations.etsy.com', href: 'https://kjclassiccreations.etsy.com' },
      { label: 'Instagram @kjclassiccreations', href: 'https://instagram.com/kjclassiccreations' },
    ],
  },
  {
    name: 'Ring My Belle: Beauty, Delivered',
    links: [
      { label: 'ringmybelle.com', href: 'https://ringmybelle.com' },
      { label: 'Instagram @ringmybelleco', href: 'https://instagram.com/ringmybelleco' },
    ],
  },
  {
    name: 'Ask Eloise (Dr. Eloise Nelson)',
    note: 'Holistic nutrition.',
  },
  {
    name: 'MTJ Electric',
  },
  {
    name: 'Shred Mill Speed',
    links: [
      { label: 'Instagram @shredmillspeed', href: 'https://instagram.com/shredmillspeed' },
    ],
  },
];

export default function SponsorsPage() {
  return (
    <div className="sponsors-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap sponsors-head">
        <div className="eyebrow">The Podcast</div>
        <h1>Sponsors</h1>
        <p className="lead">
          Thank you to the sponsors who have supported Unfiltered with Jen Archuleta.
        </p>
        <ul className="sponsor-list">
          {SPONSORS.map((sponsor) => (
            <li key={sponsor.name}>
              <h2>{sponsor.name}</h2>
              {sponsor.note ? <p className="sponsor-note">{sponsor.note}</p> : null}
              {sponsor.links ? (
                <p className="sponsor-links">
                  {sponsor.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="sponsors-close">
          Want to sponsor an episode? Email{' '}
          <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
