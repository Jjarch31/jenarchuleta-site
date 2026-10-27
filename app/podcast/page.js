import './podcast.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
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
          <a href={PODCAST.youtube} className="btn btn-ghost btn-sm">YouTube</a>
          <a href={PODCAST.buzzsprout} className="btn btn-ghost btn-sm">Buzzsprout</a>
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

      <section className="wrap center">
        <div className="eyebrow">Pups of the Podcast</div>
        <h2>Meet the pups.</h2>
        <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>
          Every episode features a rescue pup looking for a home.
        </p>
        <div style={{ marginTop: '20px' }}>
          <a href="/pups" className="btn btn-primary">Meet the Pups of the Podcast</a>
        </div>
      </section>

      <section className="wrap center">
        <div className="eyebrow">Sponsors</div>
        <h2>Thank you.</h2>
        <p className="lead" style={{ maxWidth: '46ch', marginInline: 'auto' }}>
          Thank you to the sponsors who have supported the show.
        </p>
        <div style={{ marginTop: '20px' }}>
          <a href="/sponsors" className="btn btn-ghost">See the sponsors</a>
        </div>
        <p className="foot-meta" style={{ marginTop: '18px' }}>
          <a href="/about#faith">The dogs at home</a>
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

      <SiteFooter />
    </>
  );
}
