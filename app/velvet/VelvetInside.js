import { PortableText } from '@portabletext/react';
import './velvet.css';
import VelvetCirclePanel from '../components/VelvetCirclePanel';
import { urlFor } from '../sanity/image';

function formatLetterDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function softenDashes(text) {
  if (typeof text !== 'string' || !text.includes('—')) return text;
  const trimmed = text.trim();
  if (trimmed === '— Jen' || trimmed === '—Jen') return 'Jen.';
  return text.replace(/\s*—\s*/g, ', ');
}

function softenBody(value) {
  if (!Array.isArray(value)) return value;
  return value.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    return {
      ...block,
      children: block.children.map((child) => (
        child && typeof child.text === 'string'
          ? { ...child, text: softenDashes(child.text) }
          : child
      )),
    };
  });
}

const letterComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1100).url()}
        alt={value?.alt || ''}
        style={{ width: '100%', borderRadius: 'var(--radius, 10px)', margin: '18px 0' }}
      />
    ),
  },
  marks: {
    link: ({ value, children }) => <a href={value?.href}>{children}</a>,
  },
};

const PHOTOS = [
  { src: '/velvet/young-jen.jpg', alt: 'Jen as a young girl' },
  { src: '/velvet/kitchen-1981.jpg', alt: 'The kitchen, February 1981' },
  { src: '/velvet/cowgirl.jpg', alt: 'Little cowgirl' },
  { src: '/velvet/horseback.jpg', alt: 'On horseback' },
  { src: '/velvet/her-parents.jpg', alt: 'Her parents, back then' },
  { src: '/velvet/girls.jpg', alt: 'The girls' },
  { src: '/velvet/photo-booth.jpg', alt: 'The photo booth' },
  { src: '/velvet/glam.jpg', alt: 'The glamour years' },
  { src: '/velvet/bunny-era.jpg', alt: 'The velvet-rope world' },
  { src: '/velvet/mansion-group.jpg', alt: 'Inside the world of velvet ropes' },
  { src: '/velvet/flying.jpg', alt: 'At the controls' },
  { src: '/velvet/mom-dad-kiss.jpg', alt: 'Mom and Dad' },
  { src: '/velvet/wedding.jpg', alt: 'The wedding' },
  { src: '/velvet/the-dip.jpg', alt: 'Still us' },
  { src: '/velvet/the-dogs.jpg', alt: 'The whole pack' },
];

export default function VelvetInside({ letters = [] }) {
  return (
    <>
      <VelvetCirclePanel />
      <div className="dark velvet-page">
        <nav className="nav">
          <div className="nav-inner">
            <a href="/" className="brand">Jen Archuleta</a>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/book">The Book</a>
              <a href="/podcast">Podcast</a>
            </div>
          </div>
        </nav>

        <section className="wrap text-wrap letter">
          <div className="eyebrow">You made it</div>
          <h1>You’re in.</h1>
          <p>
            If you&rsquo;re reading this, you just finished my story, or you skipped
            to the back. Either way, I&rsquo;m glad you&rsquo;re here.
          </p>
          <p>
            This page is my thank-you.
            It&rsquo;s where I&rsquo;ll keep adding the things that didn&rsquo;t fit
            between the covers, the photos up close, the stories behind them, the
            parts I read out loud, the scenes that almost made it in.
          </p>
          <p className="signoff">Jen.</p>
        </section>

        {letters && letters.length > 0 && (
          <section className="letters-band">
            <div className="wrap text-wrap">
              <div className="center">
                <div className="eyebrow">The Velvet Letters</div>
                <h2>Notes for readers.</h2>
                <p className="lead letters-note">
                  The behind-the-scenes updates I share with the people who read the book first.
                </p>
              </div>
              <div className="letters-feed">
                {letters.map((letter) => (
                  <article className="vletter" key={letter._id}>
                    <div className="vletter-date">{formatLetterDate(letter.publishedAt)}</div>
                    <h3 className="vletter-title">{softenDashes(letter.title)}</h3>
                    {letter.image && (
                      <img
                        className="vletter-img"
                        src={urlFor(letter.image).width(1200).url()}
                        alt={letter.image.alt || ''}
                        loading="lazy"
                      />
                    )}
                    {letter.body && (
                      <div className="vletter-body">
                        <PortableText value={softenBody(letter.body)} components={letterComponents} />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="gallery-band">
          <div className="wrap">
            <div className="center">
              <div className="eyebrow">From the book</div>
              <h2>The photos, up close.</h2>
              <p className="lead gallery-note">
                Every photo from the book, bigger than the printed page could show
                them. I&rsquo;m adding the story behind each one. Check back.
              </p>
            </div>
            <div className="gallery">
              {PHOTOS.map((photo) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap">
          <div className="center">
            <div className="eyebrow">Being added now</div>
            <h2>What&rsquo;s coming to this page.</h2>
          </div>
          <div className="soon-grid">
            <div className="soon-card">
              <h3>Me, reading to you</h3>
              <p>A chapter from the book, read out loud, the one that was hardest to write.</p>
            </div>
            <div className="soon-card">
              <h3>What didn&rsquo;t make the book</h3>
              <p>Stories and scenes that were cut, and why they almost stayed.</p>
            </div>
            <div className="soon-card">
              <h3>The film, first look</h3>
              <p>Beyond the Velvet Ropes is being adapted for the screen. Readers see it here first.</p>
            </div>
          </div>
        </section>

        <section className="review-band">
          <div className="wrap text-wrap center">
            <div className="eyebrow">One small thing</div>
            <h2>If this story mattered to you.</h2>
            <p className="lead">
              A short review helps this book find the next woman who needs it,
              someone in the middle of her own hard chapter. I&rsquo;d be honored.
            </p>
            <div className="review-row">
              <a
                href="https://www.amazon.com/review/create-review?asin=B0H6YZWDT3"
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                Review on Amazon
              </a>
              <a
                href="https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885"
                target="_blank"
                rel="noopener"
                className="btn btn-ghost"
              >
                Review on Barnes &amp; Noble
              </a>
            </div>
          </div>
        </section>

        <footer>
          <div className="wrap">
            <p className="foot-meta">
              © 2026 Jen Archuleta, Jennifer Walcott Archuleta. <a href="/">Home</a>
            </p>
            <p className="foot-meta">
              <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a> ·{' '}
              <a href="/shipping-returns">Shipping &amp; Returns</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
