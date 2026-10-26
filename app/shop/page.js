import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { KIT_FREE_CHAPTER_URL, OG_IMAGE, SHOP, STRIPE_CUSTOMER_PORTAL_URL } from '../components/site-data';
import './shop.css';

export const metadata = {
  title: 'Shop',
  description:
    'Signed copies of Beyond the Velvet Ropes, the handmade Signature Velvet Bookmark, the Be the Bumblebee tee, and a way to give back through The Forever Angels.',
  openGraph: { images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
};

// Small reassurance line under each live buy button.
function TrustLine({ note = 'Secure checkout. Stripe, Apple Pay, Google Pay' }) {
  return (
    <>
      <p className="trust">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        {note}
      </p>
      <p className="foot-meta">
        By ordering, you agree to our <a href="/terms">Terms</a> and{' '}
        <a href="/shipping-returns">Shipping &amp; Returns</a> policy.
      </p>
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="shop-page">
      <SiteNav />

      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* HERO + FEATURED PRODUCTS */}
      <section id="main-content" className="wrap">
        <div className="center">
          <div className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>the good stuff…</div>
          <div className="eyebrow">The Shop</div>
          <h2>A few things worth sharing.</h2>
          <p className="lead" style={{ maxWidth: '58ch', marginInline: 'auto' }}>
            A signed copy of the book, a keepsake I make by hand, a tee with a message
            I love, and a rescue close to my heart. Story, a good reminder, and giving back.
          </p>
        </div>

        <div className="product-grid">
          {/* SIGNED BOOK */}
          <article className="product-card">
            <div className="product-media product-media--contain">
              {SHOP.signedBookSoldOut && <span className="badge">Sold out, restocking soon</span>}
              <img
                src="/assets/book-cover.jpg"
                alt="Beyond the Velvet Ropes book cover"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">The Book · Signed &amp; Personalized</div>
              <h3>Signed copy, <em>Beyond the Velvet Ropes</em></h3>
              <p className="price">{SHOP.signedBookPrice}</p>
              <p className="product-desc">
                Signed by me, with a note to whoever you’d like, you, or someone
                who needs to hear that their story isn’t over.
              </p>
              <p className="fulfill">
                {SHOP.signedBookSoldOut ? SHOP.signedBookSoldOutNote : SHOP.signedBookLeadTime}
              </p>
              <div className="product-cta">
                {SHOP.signedBookSoldOut ? (
                  <>
                    <span className="btn btn-disabled">Sold out, restocking soon</span>
                    <a href={KIT_FREE_CHAPTER_URL} className="btn btn-ghost btn-sm">
                      Read the first chapter free
                    </a>
                  </>
                ) : SHOP.signedBook ? (
                  <>
                    <a href={SHOP.signedBook} target="_blank" rel="noopener" className="btn btn-primary">
                      Order a signed copy
                    </a>
                    <TrustLine />
                  </>
                ) : (
                  <>
                    <span className="btn btn-disabled">Coming soon</span>
                    <a href={KIT_FREE_CHAPTER_URL} className="btn btn-ghost btn-sm">
                      Read the first chapter free
                    </a>
                  </>
                )}
              </div>
            </div>
          </article>

          {/* SIGNATURE VELVET BOOKMARK */}
          <article className="product-card">
            <div className="product-media product-media--contain">
              {!SHOP.bookmark && <span className="badge">First drop, coming soon</span>}
              <img
                src="/assets/bookmark.jpg"
                alt="The Signature Velvet Bookmark, black velvet ribbon, a gold heart engraved “you matter. everyone belongs”, and a vintage key pressed in burgundy wax, resting on an open copy of the book"
                loading="lazy"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">Handmade Keepsake</div>
              <h3>The Signature Velvet Bookmark</h3>
              <p className="price">{SHOP.bookmarkPrice}</p>
              <p className="product-desc">
                Black velvet with gold detailing, a vintage-style key pressed into a
                burgundy wax seal, and a gold heart engraved with a reminder I believe
                in: <em>you matter, everyone belongs.</em> Handmade by me, one at a
                time. <strong>Every story is different. Every key is different, so no
                two are ever alike.</strong>
              </p>
              <p className="fulfill">Made in small batches · every piece one of a kind</p>
              <div className="product-cta">
                {SHOP.bookmark ? (
                  <>
                    <a href={SHOP.bookmark} target="_blank" rel="noopener" className="btn btn-primary">
                      Buy the bookmark
                    </a>
                    <TrustLine />
                  </>
                ) : SHOP.bookmarkWaitlist ? (
                  <>
                    <a href={SHOP.bookmarkWaitlist} target="_blank" rel="noopener" className="btn btn-primary">
                      Join the first-drop list
                    </a>
                    <p className="fulfill">Small handmade batches. The list hears first.</p>
                  </>
                ) : (
                  <>
                    <span className="btn btn-disabled">Coming soon</span>
                    <p className="fulfill">First batch is being made now.</p>
                  </>
                )}
              </div>
            </div>
          </article>

          {/* VELVET CIRCLE MEMBERSHIP */}
          {/* TODO: Velvet Circle members area idea is pending Jen's decision. Do not build yet. */}
          <article className="product-card" id="velvet-circle">
            <div className="product-media product-media--portrait">
              <img
                src="/assets/presskit-headshot-floral.jpg"
                alt="Jen Walcott Archuleta"
                width="1100"
                height="1370"
              />
            </div>
            <div className="product-body">
              <div className="eyebrow">Membership</div>
              <h3>Velvet Circle Membership</h3>
              <p className="price">{SHOP.velvetCircleMembershipPrice}</p>
              <ul className="product-list">
                <li>Private monthly letter</li>
                <li>The private passcode journal</li>
                <li>Up to 3 questions a month that Jen answers in writing</li>
                <li>Live monthly Zoom</li>
                <li>
                  <a className="cancel-link" href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener">Cancel anytime</a>
                </li>
              </ul>
              <p className="product-desc">
                Live monthly Zooms begin once the Velvet Circle reaches 13 members. Until then, members can send me up to 3 questions each month, and I&rsquo;ll answer every one in writing.
              </p>
              <div className="product-cta">
                {SHOP.velvetCircleMembership ? (
                  <>
                    <a href={SHOP.velvetCircleMembership} target="_blank" rel="noopener" className="btn btn-primary">
                      Join the Velvet Circle
                    </a>
                    <TrustLine />
                  </>
                ) : (
                  <span className="btn btn-disabled">Coming soon</span>
                )}
              </div>
            </div>
          </article>
        </div>

        <p className="assurance">
          Every direct order checks out securely.
        </p>
      </section>

      {/* ELSEWHERE — Etsy + the rescue */}
      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="center">
          <div className="threshold-rule" style={{ maxWidth: '220px', margin: '0 auto 34px' }}><span className="diamond" /></div>
          <div className="eyebrow">And a little more</div>
        </div>

        <div className="more-grid">
          <a className="mini" href={SHOP.etsyTee} target="_blank" rel="noopener">
            <div className="body">
              <div className="k">Apparel · On Etsy</div>
              <h4>Be the Bumblebee tee</h4>
              <p className="foot-meta">A little reminder to fly your own way. Shop on Etsy →</p>
            </div>
          </a>
          <a className="mini" href={SHOP.foreverAngels} target="_blank" rel="noopener">
            <div className="body">
              <div className="k">Give back</div>
              <h4>The Forever Angels</h4>
              <p className="foot-meta">The rescue closest to my heart. Every bit helps →</p>
            </div>
          </a>
        </div>

        <div className="center" style={{ marginTop: '40px' }}>
          <a href={KIT_FREE_CHAPTER_URL} className="btn btn-ghost">New here? Read the first chapter free</a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
