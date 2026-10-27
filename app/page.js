import './journal/journal.css';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import KitInlineForm from './components/KitInlineForm';
import PhotoGallery from './components/PhotoGallery';
import VelvetCirclePanel from './components/VelvetCirclePanel';
import { BOOK_BUY_URL, KIT_FORM_UID, SOCIALS, SHOP, PODCAST } from './components/site-data';
import { QUOTE_FORGIVE, QUOTE_RESCUE, QUOTE_STORY } from './quotes/quotes-data';
import { urlFor } from './sanity/image';
import { getAllPosts } from './sanity/queries';

function HomeQuote({ quote, more = false, id }) {
  return (
    <section className="home-quote" id={id}>
      <figure>
        <blockquote>
          <p>{quote.text}</p>
        </blockquote>
        {quote.source ? <figcaption>{quote.source}</figcaption> : null}
        {more ? (
          <p className="home-quote-more">
            <a href="/quotes">More quotes</a>
          </p>
        ) : null}
      </figure>
    </section>
  );
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function cardExcerpt(excerpt) {
  if (typeof excerpt !== 'string') return '';
  const text = excerpt.replace(/\s+/g, ' ').trim();
  if (text.length <= 140) return text;
  return `${text.slice(0, 140).replace(/\s+\S*$/, '')}…`;
}

function heroUrl(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  try {
    return urlFor(img).width(800).height(533).fit('crop').url();
  } catch {
    return null;
  }
}

export default async function Home() {
  const live = await getAllPosts().catch(() => []);
  const featured = (Array.isArray(live) ? live : []).filter((post) => post?.slug).slice(0, 3);

  return (
    <>
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* HERO */}
      <section id="main-content" className="wrap hero">
        <div className="hero-copy">
          <div className="eyebrow">Author · Speaker · Advocate</div>
          <div className="hero-script">Here’s what really<br />happened.</div>
          <h1>Faith, family, and a bunch of dogs.</h1>
          <div className="eyebrow" style={{ marginTop: '16px' }}>Author of <em>Beyond the Velvet Ropes</em></div>
          <p className="lead">These days I’m happiest in the small stuff. My kids, my husband, a houseful of rescue animals, my faith, and finding ways to give back. I’m grateful for the wild, wonderful run that came before this. But the part I care about most isn’t the glamorous version. It’s the ordinary, happy life I have now, and the book I wrote about finding my way here.</p>
          <div className="hero-ctas">
            <a href={BOOK_BUY_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Buy the book</a>
          </div>
        </div>
        <div className="hero-media">
          <div className="portrait hero-frame">
            <img src="/assets/presskit-headshot-floral.jpg" alt="Jen Walcott Archuleta" width="1100" height="1370" />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="wrap pillars">
        <div className="p">
          <div className="eyebrow">Story</div>
          <h3>The Author</h3>
          <p>My book, and what I write about the hard years.</p>
          <p><a href="/book" className="btn btn-ghost btn-sm">The book</a></p>
        </div>
        <div className="p">
          <div className="eyebrow">Voice</div>
          <h3>The Speaker</h3>
          <p>I talk about faith, getting through hard things, and starting over.</p>
          <p><a href="/media#speaking" className="btn btn-ghost btn-sm">Speaking</a></p>
        </div>
        <div className="p">
          <div className="eyebrow">Heart</div>
          <h3>The Advocate</h3>
          <p>Beyond the Ropes and <a href={SOCIALS.foreverAngels}>The Forever Angels</a>. I help the people and animals who get passed over.</p>
          <p><a href="#movement" className="btn btn-ghost btn-sm">The movement</a></p>
        </div>
      </section>

      {/* BOOK (dark register) */}
      <section id="book" className="book dark">
        <div className="wrap inner">
          <div><img className="book-cover" src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes book cover" width="1000" height="1500" loading="lazy" /></div>
          <div>
            <div className="eyebrow">My memoir is out now.</div>
            <h2>Beyond the Velvet Ropes</h2>
            <p className="sub">My Story of Perseverance, Hope, and Love</p>
            <p style={{ color: 'var(--text)' }}>From the outside, my twenties looked like the dream. The real story is the one I wrote down.</p>
            <p>
              <a href={BOOK_BUY_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Buy the book</a>
              {' '}
              <a href="/book" className="btn btn-ghost">The book</a>
            </p>
          </div>
        </div>
        <div className="wrap trailer-feature">
          <div className="tf-copy">
            <div className="eyebrow">Watch the Trailer</div>
            <p className="tf-logline">Watch the trailer.</p>
            <p className="tf-cap">The official trailer for the book, about ninety seconds.</p>
          </div>
          <figure className="tf-video">
            <video
              src="/trailer.mp4"
              poster="/trailer-poster.jpg"
              controls
              playsInline
              preload="none"
              className="book-trailer-video"
            />
          </figure>
        </div>
      </section>

      <HomeQuote id="quote-book" quote={QUOTE_RESCUE} />

      {/* STORY */}
      <section id="story" className="wrap">
        <div className="story-grid">
          <div>
            <h2>How I got here.</h2>
            <p>I grew up in a small Ohio town being told what I couldn’t do, and I spent the years after that proving otherwise, in rooms most people never get to see. I’m grateful for every bit of it.</p>
            <p>I also walked through some genuinely hard things to get here. I stopped hiding them, and I learned that the hard chapters can become something you give back. What I’m proudest of now isn’t any of the rooms I used to stand in. It’s the plain, happy life right in front of me.</p>
          </div>
          <div className="ph"><img src="/assets/jen-bw-coat2.jpg" alt="Jen Archuleta portrait" width="800" height="1195" loading="lazy" /></div>
        </div>
      </section>

      <PhotoGallery />

      <HomeQuote id="quote-gallery" quote={QUOTE_FORGIVE} more />

      <VelvetCirclePanel />

      {/* PODCAST. Subscribe buttons. The buy row's Spotify link is the audiobook, not the show.
          TODO: confirm with Jen which Spotify show ID is the podcast and which is the audiobook. */}
      <section id="podcast" className="wrap center" style={{ background: 'var(--surface)' }}>
        <div className="eyebrow">The Podcast</div>
        <h2>{PODCAST.name}</h2>
        <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>Real talks about faith, family, and starting over.</p>
        <div className="hero-ctas" style={{ justifyContent: 'center', marginTop: '8px' }}>
          <a href="/podcast" className="btn btn-primary">Listen to the podcast</a>
        </div>
        <p className="foot-meta" style={{ marginTop: '18px' }}>
          <a href="/sponsors">Sponsors</a>
        </p>
      </section>

      {/* MEET JEN (beauty + personality) */}
      <section className="wrap">
        <div className="center">
          <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>the fun part…</div>
          <h2>Still here, still laughing, still writing.</h2>
          <p className="lead" style={{ maxWidth: '62ch', marginInline: 'auto' }}>Let’s be honest. I’ve never minded the camera. Magazine covers, red carpets, getting dressed up, a good laugh. I’ve always had a soft spot for animals, and plenty of rescues at home to prove it. Faith, family, and fun, all at once, and I wouldn’t have it any other way.</p>
        </div>
        <div className="photo-row">
          <img src="/assets/jen-glam.jpg" alt="Jen Archuleta, glamour portrait" width="941" height="1123" loading="lazy" />
          <img src="/assets/jen-sultry.jpg" alt="Jen Archuleta" width="599" height="1111" loading="lazy" />
          <img src="/assets/jen-fun2.jpeg" alt="Jen Archuleta with a rescue puppy" width="510" height="512" loading="lazy" />
          <img src="/assets/jen-fitness.jpg" alt="Jen Walcott Archuleta" width="1077" height="887" loading="lazy" />
        </div>
        <div className="center" style={{ marginTop: '26px' }}>
          <a href={SOCIALS.instagram} className="btn btn-ghost">Follow along on Instagram</a>
        </div>
      </section>

      {/* MOVEMENT */}
      <section id="movement" className="wrap creed" style={{ background: 'var(--surface)' }}>
        <div className="threshold-rule" style={{ marginBottom: '20px' }}><span className="diamond" /></div>
        <h2>Everyone belongs.</h2>
        <p className="lead" style={{ maxWidth: '60ch', marginInline: 'auto' }}>A velvet rope decides who gets in. I’d rather let everyone in. No one’s story is over.</p>
        <ul>
          <li>Everyone belongs, so we choose the overlooked.</li>
          <li>No one’s story is over.</li>
          <li>We forgive, even without the apology.</li>
          <li>We fall, we learn, and we get back up.</li>
          <li>What we went through can help someone else.</li>
        </ul>
      </section>

      {/* JOURNAL */}
      <section id="journal" className="wrap">
        <div className="center"><h2>From the journal.</h2>
          <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>Short, honest writing on faith, family, healing, and starting over.</p></div>
        {featured.length > 0 ? (
          <div className="feed">
            {featured.map((post) => {
              const img = heroUrl(post.heroImage);
              const excerpt = cardExcerpt(post.excerpt);
              const meta = [post.category, formatDate(post.publishedAt)].filter(Boolean).join(' · ');
              return (
                <a key={post.slug} className="post-card" href={`/journal/${post.slug}`}>
                  {img ? <img src={img} alt="" /> : null}
                  <div className="body">
                    {meta ? <div className="k">{meta}</div> : null}
                    <h3>{post.title}</h3>
                    {excerpt ? <p>{excerpt}</p> : null}
                  </div>
                </a>
              );
            })}
          </div>
        ) : null}
        <div className="center" style={{ marginTop: '28px' }}><a href="/journal" className="btn btn-ghost">Read the journal</a></div>
      </section>

      {/* SHOP */}
      <section id="shop" className="wrap" style={{ background: 'var(--surface)' }}>
        <div className="center"><h2>A few things worth sharing.</h2>
          <p className="lead" style={{ maxWidth: '58ch', marginInline: 'auto' }}>A signed copy of the book, and a tee I love.</p></div>
        <div className="cards-3">
          <a className="mini" href="/shop"><div className="body"><div className="k">Book</div><h3>Signed copy, <em>Beyond the Velvet Ropes</em></h3><p className="foot-meta">In the shop →</p></div></a>
          <a className="mini" href={SHOP.etsyTee} target="_blank" rel="noopener"><div className="body"><div className="k">Apparel</div><h3>Be the Bumblebee tee</h3><p className="foot-meta">Shop on Etsy →</p></div></a>
        </div>
        <div className="center" style={{ marginTop: '28px' }}><a href="/shop" className="btn btn-ghost">Visit the shop</a></div>
      </section>

      <HomeQuote id="quote-letter" quote={QUOTE_STORY} />

      {/* CAPTURE. id was "speaking"; that anchor now lives on /media#speaking. */}
      <section id="letter" className="capture">
        <div className="wrap text-wrap">
          <div className="eyebrow">Stay close</div>
          <h2>Get the First Chapter Free</h2>
          <p className="lead">Read how it started. I’ll email you the first chapter. If it sounds like your story too, I wrote it for you.</p>
          <KitInlineForm uid={KIT_FORM_UID} />
        </div>
        <div className="signup-banner">
          <picture>
            <source media="(max-width: 700px)" srcSet="/assets/first-chapter-banner-mobile.jpg?v=5" />
            <img
              src="/assets/first-chapter-banner.jpg?v=5"
              alt="Jen as a girl, and her black-and-white glamour portrait, with gold stars"
              width="2048"
              height="633"
            />
          </picture>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
