import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { BOOKING_EMAIL } from '../components/site-data';
import './sponsors.css';

export const metadata = {
  title: 'Sponsors and partners',
  description:
    'Sponsors and partners of Unfiltered with Jen Archuleta.',
};

// Jen's official list, this order. A link is included only after the
// destination loaded a real page (a store, a company site, a practice).
// Instagram, Etsy, and anything that 404s, parks, or will not load stays off.
const SPONSORS = [
  {
    name: 'Sunsets & Bonfires',
    links: [
      { label: 'sunsetsandbonfires.com', href: 'https://www.sunsetsandbonfires.com/' },
    ],
  },
  {
    name: 'PhotosofJenniferWalcott (An Autographs Company)',
  },
  {
    name: 'KJ Classic Creations',
  },
  {
    name: 'Ring My Belle',
    links: [
      { label: 'ringmybelle.com', href: 'https://ringmybelle.com' },
    ],
  },
  {
    name: 'Coursen Security Group',
    links: [
      { label: 'coursensecuritygroup.com', href: 'https://www.coursensecuritygroup.com/' },
    ],
  },
  {
    name: 'Thrive Media',
  },
  {
    name: 'Ask Eloise / Dr. Eloise Nelson',
    links: [
      { label: 'askeloise.com', href: 'https://www.askeloise.com/' },
    ],
  },
  {
    name: 'Optimize Scottsdale',
    links: [
      { label: 'optimizescottsdale.com', href: 'https://optimizescottsdale.com/' },
    ],
  },
  {
    name: 'MTJ Electric',
    links: [
      { label: 'mtjelectric.com', href: 'https://mtjelectric.com/' },
    ],
  },
  {
    name: "Lil' DUDE Wipes",
    links: [
      { label: 'dudewipes.com', href: 'https://dudewipes.com/' },
    ],
  },
  {
    name: 'SHREDmill',
    links: [
      { label: 'shredmill.com', href: 'https://www.shredmill.com/' },
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
        <h1>Sponsors and partners</h1>
        <p className="lead">
          Thank you to the sponsors and partners who have supported Unfiltered with Jen Archuleta.
        </p>
        <ul className="sponsor-list">
          {SPONSORS.map((sponsor) => (
            <li key={sponsor.name}>
              <h2>{sponsor.name}</h2>
              {sponsor.person ? <p className="sponsor-person">{sponsor.person}</p> : null}
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
