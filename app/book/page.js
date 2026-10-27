import './book.css';
import SiteNav from '../components/SiteNav';
import { PODCAST, SHOP } from '../components/site-data';

export const metadata = {
  // Matches the retail listings exactly (Amazon / B&N / Spotify use the full name).
  title: { absolute: 'Beyond the Velvet Ropes by Jennifer Walcott Archuleta' },
  description:
    'Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love by Jennifer Walcott Archuleta. Out now. Read the first chapter free.',
};

const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'Beyond the Velvet Ropes: My Story of Perseverance, Hope, and Love',
  author: {
    '@type': 'Person',
    name: 'Jennifer Walcott Archuleta',
    alternateName: 'Jen Archuleta',
    url: 'https://jenarchuleta.com/about',
  },
  image: 'https://jenarchuleta.com/assets/book-cover.jpg',
  url: 'https://jenarchuleta.com/book',
  datePublished: '2026-07-04',
  sameAs: [
    'https://www.amazon.com/dp/B0H6YZWDT3',
    'https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885',
  ],
};

export default function BookPage() {
  return (
    <div className="dark book-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />
      <SiteNav />

      {/* HERO (dark register, echoes the cover) */}
      <section className="hero-section dark" style={{ background: 'var(--bg)' }}>
        <div className="wrap hero">
          <div><img className="hero-cover" src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1000" height="1500" /></div>
          <div>
            <div className="eyebrow">My memoir is out now.</div>
            <h1>Beyond the Velvet Ropes</h1>
            <p className="sub">My Story of Perseverance, Hope, and Love</p>
            <p style={{ color: 'var(--text)' }}>Here’s what really happened. From the outside, it looked like a dream. It wasn’t the whole story. But the real story lives in the moments no one saw. This is my real story.</p>
            <div className="buy-row">
              {SHOP.signedBook ? (
                <a href={SHOP.signedBook} target="_blank" rel="noopener" className="btn btn-primary">Buy a signed copy</a>
              ) : null}
              <a href="https://books.by/beyond-the-velvet-ropes" target="_blank" rel="noopener" className="btn btn-primary">Get the Paperback</a>
              <a href="https://www.amazon.com/dp/B0H6YZWDT3" target="_blank" rel="noopener" className="btn btn-ghost">Also on Amazon</a>
              <a href="https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885" target="_blank" rel="noopener" className="btn btn-ghost">Barnes &amp; Noble</a>
              <a href="https://www.amazon.com/dp/B0H6YK1KTL" target="_blank" rel="noopener" className="btn btn-ghost">Kindle (Amazon)</a>
              {/* TODO: confirm with Jen which Spotify show ID is the audiobook (this one) and which is the podcast. */}
              <a href="https://open.spotify.com/show/153EBrZVIkJY1xaY703km4" target="_blank" rel="noopener" className="btn btn-ghost">Audiobook (Spotify)</a>
              <a href="https://books.apple.com/us/audiobook/beyond-the-velvet-ropes-my-story-of-perseverance/id6789345549?uo=4" target="_blank" rel="noopener" className="btn btn-ghost">Audiobook (Apple)</a>
            </div>
          </div>
        </div>
      </section>

      {/* THE HOOK */}
      <section className="wrap text-wrap center">
        <div className="threshold-rule" style={{ maxWidth: '220px', margin: '0 auto 24px' }}><span className="diamond" /></div>
        <p className="lead" style={{ fontSize: 'var(--text-body-l)' }}><em>Beyond the Velvet Ropes</em> is about getting through it, and finding my way back to myself.</p>
      </section>

      {/* WHO IT'S FOR */}
      <section className="who">
        <div className="wrap text-wrap center">
          <div className="eyebrow">Who this book is for</div>
          <h2>If your past has ever tried to define you.</h2>
          <ul style={{ textAlign: 'left' }}>
            <li>The woman who’s holding it all together with both hands and no one knows.</li>
            <li>Anyone who’s survived something and is learning that survival isn’t the same as healing.</li>
            <li>Anyone rebuilding, after loss, reinvention, a crisis of faith, or starting over.</li>
            <li>Anyone who’s ever felt judged, underestimated, or counted out.</li>
          </ul>
        </div>
      </section>

      {/* FILM NOTE */}
      <section className="who center">
        <div className="wrap text-wrap">
          <h2>A film adaptation is in development.</h2>
          <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>The story is being adapted for the screen. More to come.</p>
        </div>
      </section>

      <section className="who center">
        <div className="wrap text-wrap">
          <div className="eyebrow">The story is not over yet</div>
          <h2>The Velvet Pages</h2>
          <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>
            In the back of the book there is a QR code, and the passcode printed under it. That passcode opens The Velvet Pages, a private journal for readers. I add something special here every once in a while, so check back.
          </p>
          <p className="lead" style={{ maxWidth: '54ch', marginInline: 'auto' }}>
            The Velvet Letter comes with Velvet Circle membership.
          </p>
          <p><a href="/velvet" className="btn btn-ghost">The Velvet Pages</a></p>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-links">
            <a href={PODCAST.buzzsprout} target="_blank" rel="noopener noreferrer">Podcast on Buzzsprout</a>
            <a href={PODCAST.youtube} target="_blank" rel="noopener noreferrer">Podcast on YouTube</a>
            <a href="/media">Media</a>
            <a href="/contact">Contact</a>
          </div>
          <p className="foot-meta">© 2026 Jen Archuleta, Jennifer Walcott Archuleta. <a href="/">Home</a></p>
          <p className="foot-meta">
            <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a> ·{' '}
            <a href="/shipping-returns">Shipping &amp; Returns</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
