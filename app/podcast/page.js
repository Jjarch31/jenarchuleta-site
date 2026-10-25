import './podcast.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import KitForm from '../components/KitForm';
import BuzzsproutPlayer from '../components/BuzzsproutPlayer';
import { BOOKING_EMAIL, PODCAST } from '../components/site-data';

export const metadata = {
  title: { absolute: 'Podcast, Unfiltered with Jen Archuleta' },
  description:
    'Unfiltered with Jen Archuleta. Real talks about faith, family, and starting over. Listen to every episode and subscribe.',
};

export default function PodcastPage() {
  const { name, buzzsproutSite, buzzsproutId, subscribe } = PODCAST;

  // Subscribe links fall back to the show home until real URLs are confirmed.
  const sub = {
    spotify: subscribe.spotify || buzzsproutSite,
    apple: subscribe.apple || buzzsproutSite,
    youtube: subscribe.youtube || buzzsproutSite,
  };

  return (
    <>
      <SiteNav />

      {/* HERO */}
      <section className="wrap pod-hero">
        <div className="eyebrow">The Podcast</div>
        <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>unfiltered…</div>
        <h1>{name}</h1>
        <p className="lead" style={{ maxWidth: '60ch', marginInline: 'auto' }}>
          Real talks about faith, family, and starting over.
          New episodes land here automatically.
        </p>
        <div className="subscribe-row">
          <a href={sub.spotify} className="btn btn-ghost btn-sm">Spotify</a>
          <a href={sub.apple} className="btn btn-ghost btn-sm">Apple Podcasts</a>
          <a href={sub.youtube} className="btn btn-ghost btn-sm">YouTube</a>
        </div>
      </section>

      {/* EPISODES — Buzzsprout native large player (auto-lists every episode) */}
      <section className="wrap" style={{ paddingTop: 0 }}>
        {buzzsproutId ? (
          <BuzzsproutPlayer showId={buzzsproutId} />
        ) : (
          <div className="pod-embed">
            <iframe src={buzzsproutSite} title={`${name}, episodes`} loading="lazy" allow="autoplay" />
          </div>
        )}
        <p className="foot-meta center" style={{ marginTop: '14px' }}>
          Prefer your own app? <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Open the show on Buzzsprout →</a>
        </p>
      </section>

      {/* BE A GUEST */}
      <section className="wrap guest" style={{ background: 'var(--surface)' }}>
        <div className="eyebrow">Come on the show</div>
        <h2>Have a story worth telling?</h2>
        <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>
          Have a story to tell? I’d love to hear it.
        </p>
        <div className="center" style={{ marginTop: '20px' }}>
          <a
            href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent('Podcast guest, Unfiltered with Jen Archuleta')}`}
            className="btn btn-primary"
          >
            Be a guest
          </a>
        </div>
      </section>

      <KitForm
        heading="Never miss an episode."
        blurb="Get new episodes and the first chapter of the book, straight to your inbox."
        cta="Join the newsletter"
      />

      <SiteFooter />
    </>
  );
}
