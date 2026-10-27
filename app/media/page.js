import fs from 'fs';
import path from 'path';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import CopyTextButton from '../components/CopyTextButton';
import { BOOKING_EMAIL, PODCAST } from '../components/site-data';
import './media.css';

export const metadata = {
  title: { absolute: 'Media | Jen Walcott Archuleta' },
  description:
    'Interviews, articles, and conversations with Jen Walcott Archuleta, plus a short bio and headshots for press.',
};

// Do not publish FilmFreeway personal details (birth date, height, school, college)
// or a representative's phone number or street address.
// Speaking reel and past events: render nothing until Jen supplies them.
// Boardman News links to the outlet's Facebook post. The article host's
// certificate is expired, so the card does not point at boardmannews.net.
// Direct WKBN video embed is omitted until a video URL exists. The article link stands in.
// Press kit PDF is shown only when public/press/jen-walcott-archuleta-press-kit.pdf exists.
// Book cover download is omitted. public/assets/book-cover.jpg is the compressed
// web image (1000x1500), not a press-resolution file.
// Outlet logos are names until files arrive in public/assets/logos/.

const PRESS_BIO = 'Jennifer Walcott Archuleta is the author of Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love, and the host of the podcast Unfiltered with Jen Archuleta. Raised in Youngstown, Ohio, she moved to California at 18, worked as a makeup artist, and became Playboy’s Miss August 2001. She co-founded The Forever Angels, a nonprofit that helps families, veterans, hospice patients, and animals in need. A film based on her memoir is in development with Leone Marucci’s Steelyard Pictures, and a feature documentary is in development with Mark Andrew Hamer of Crash Cat Media Group. She lives on the West Coast with her husband, former NFL safety Adam Archuleta, their three children, and a houseful of rescue animals.';

const PRESS = [
  {
    outlet: 'Tribune Chronicle',
    headline: 'Area native offers peek behind the Velvet Rope',
    byline: 'Andy Gray',
    date: 'Aug 20, 2026',
    href: 'https://www.vindy.com/life/ticket/2026/08/area-native-offers-peak-behind-the-velvet-rope/',
  },
  {
    outlet: 'The Business Journal Daily',
    headline: 'Youngstown Native Jennifer Walcott Archuleta Returns Home for Book Signing',
    date: 'Aug 18, 2026',
    href: 'https://businessjournaldaily.com/youngstown-native-jennifer-walcott-archuleta-returns-home-for-book-signing/',
  },
  {
    outlet: 'Mahoning Matters',
    headline: 'Youngstown native Jen Archuleta releases book focusing on overcoming challenges',
    byline: 'Kelcey Norris',
    date: 'Aug 13, 2026',
    href: 'https://www.mahoningmatters.com/news/local/article316760975.html',
  },
  {
    outlet: 'Boardman News',
    headline: 'Former Playboy Playmate Will Hold Book Signing Aug. 23 at Barnes & Noble',
    href: 'https://www.facebook.com/boardmannews/posts/former-playboy-playmate-will-hold-book-signing-aug-23-at-barnes-nobleaug-6-12-20/1703665671629905/',
  },
  {
    outlet: 'Akron Beacon Journal',
    headline: 'Book Talk',
    byline: 'Barbara McIntyre',
    date: 'Aug 23, 2026',
    href: 'https://www.beaconjournal.com/story/entertainment/books/2026/08/23/cleveland-author-vivien-chien-releases-and-then-there-were-bun-part-of-noodle-shop-series-book-talk/91354166007/',
  },
];

const APPEARANCES = [
  {
    outlet: 'WKBN 27 First News',
    kind: 'TV',
    headline: 'Former Playboy Bunny holds book signing in Boardman',
    byline: 'Sydney Brown',
    date: 'Aug 23, 2026',
    note: 'Video interview',
    href: 'https://www.wkbn.com/news/local-news/boardman-news/former-playboy-bunny-holds-book-signing-in-boardman/',
    linkLabel: 'Watch the interview',
  },
  {
    outlet: 'The Mr. Sports Show, Star 94.7 FM',
    kind: 'Radio',
    headline: 'Interview on the memoir',
    date: 'Aug 2026',
    href: 'https://riverside.com/shared/exported-clip/1d1e2c38397aa65200f6',
    linkLabel: 'Listen',
  },
  {
    outlet: 'Unfiltered with Jen Archuleta',
    kind: 'Podcast',
    headline: 'The episode where Adam interviews Jen',
    date: 'May 26, 2026',
    href: 'https://unfilteredwithjenarchuleta.buzzsprout.com/2467154/episodes/19243689-jennifer-archuleta-abuse-the-fbi-sting-beyond-the-velvet-ropes',
    linkLabel: 'Listen',
  },
];

const HEADSHOTS = [
  { href: '/assets/presskit-headshot-floral.jpg', label: 'Candid', width: 1100, height: 1370 },
  { href: '/assets/jen-headshot-bw.jpg', label: 'Glamour', width: 1320, height: 1946 },
  { href: '/assets/jen-headshot-signature.jpg', label: 'Signature', width: 1162, height: 1597 },
];

const LOGO_NAMES = [
  'The Vindicator',
  'Tribune Chronicle',
  'WKBN 27 First News',
  'The Business Journal Daily',
  'Mahoning Matters',
  'Akron Beacon Journal',
  'Star 94.7 FM',
  'Steelyard Pictures',
  'Crash Cat Media Group',
];

function publicFileExists(rel) {
  return fs.existsSync(path.join(process.cwd(), 'public', rel));
}

function cardMeta(item) {
  return [item.kind, item.byline, item.date, item.note].filter(Boolean).join(' · ');
}

export default function MediaPage() {
  const hasPressKit = publicFileExists('press/jen-walcott-archuleta-press-kit.pdf');
  const mailto = `mailto:${BOOKING_EMAIL}`;

  return (
    <div className="media-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap">
        <h1>Media</h1>
        <p className="media-lead">
          Thank you for your interest in my story. Here you will find the interviews, articles, and conversations around Beyond the Velvet Ropes, my podcast, and The Forever Angels. If you would like me on your show, at your event, or in your pages, I would love to hear from you.
        </p>
      </section>

      <section className="wrap">
        <h2>Press coverage</h2>
        <div className="media-grid">
          {PRESS.map((item) => (
            <article className="media-card" key={item.href}>
              <p className="eyebrow">{item.outlet}</p>
              <h3>{item.headline}</h3>
              <p className="media-meta">{cardMeta(item)}</p>
              <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">Read</a>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap">
        <h2>Media appearances</h2>
        <div className="media-grid">
          {APPEARANCES.map((item) => (
            <article className="media-card" key={item.href}>
              <p className="eyebrow">{item.outlet}</p>
              <h3>{item.headline}</h3>
              <p className="media-meta">{cardMeta(item)}</p>
              <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap text-wrap">
        <h2>Film and documentary</h2>
        <p>
          Beyond the Velvet Ropes is being developed into a feature film with Leone Marucci and Steelyard Pictures. The screenplay was named a Second Rounder in the 2026 Austin Film Festival Screenplay Competition.
        </p>
        <p>
          A feature documentary based on Beyond the Velvet Ropes is in development with filmmaker Mark Andrew Hamer of{' '}
          <a href="https://CrashCatMedia.com" target="_blank" rel="noopener noreferrer">Crash Cat Media Group</a>.
        </p>
        <p>
          <a href="https://www.steelyardpictures.com/bio" target="_blank" rel="noopener noreferrer">Steelyard Pictures</a>
          {' · '}
          <a href="https://CrashCatMedia.com" target="_blank" rel="noopener noreferrer">Crash Cat Media Group</a>
          {' · '}
          <a href="https://filmfreeway.com/JenniferArchuleta" target="_blank" rel="noopener noreferrer">FilmFreeway</a>
        </p>
      </section>

      <section className="wrap">
        <h2>My podcast</h2>
        <p className="media-lead">Unfiltered with Jen Archuleta.</p>
        <div className="media-actions">
          <a className="btn btn-primary" href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Listen on Buzzsprout</a>
          <a className="btn btn-ghost" href={PODCAST.youtube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
      </section>

      <section id="speaking" className="wrap text-wrap">
        <h2>Speaking</h2>
        <p>
          I speak about faith, resilience, and starting over. About surviving hard things and rebuilding. And about giving back, through The Forever Angels, hospice volunteering, and animal rescue.
        </p>
        <p>
          To invite me to speak, email <a href={mailto}>{BOOKING_EMAIL}</a>.
        </p>
      </section>

      <section className="wrap">
        <h2>Press kit</h2>
        <div className="bio-block">
          <div className="bio-head">
            <h3>Short bio</h3>
            <CopyTextButton text={PRESS_BIO} label="Copy" />
          </div>
          <p>{PRESS_BIO}</p>
        </div>
        <div className="headshot-grid">
          {HEADSHOTS.map((shot) => (
            <figure key={shot.href}>
              <img src={shot.href} alt={`${shot.label} headshot of Jen Walcott Archuleta`} width={shot.width} height={shot.height} />
              <figcaption>{shot.label}</figcaption>
              <a className="btn btn-ghost btn-sm" href={shot.href} download>
                {shot.label}
              </a>
            </figure>
          ))}
        </div>
        <div className="media-actions">
          {hasPressKit ? (
            <a className="btn btn-ghost btn-sm" href="/press/jen-walcott-archuleta-press-kit.pdf" download>
              Press kit PDF
            </a>
          ) : null}
        </div>
      </section>

      <section className="wrap center">
        <h2>As seen in</h2>
        <ul className="media-logos">
          {LOGO_NAMES.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section className="booking">
        <div className="wrap text-wrap">
          <p className="lead">For press, interviews, and speaking, email <a href={mailto}>{BOOKING_EMAIL}</a></p>
          <a className="btn btn-primary" href={mailto}>Email Jen</a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
