import { Fragment } from 'react';
import './journal.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { urlFor } from '../sanity/image';
import { getAllPosts } from '../sanity/queries';
import { POSTS as FALLBACK_POSTS } from './_posts';

// Chip order: Podcast, Pup of the Podcast, then the Sponsors page link, then
// the rest of this list. Cooking stays in the list so its chip comes back as
// soon as a post uses that category. Empty categories stay off the row.
const CATEGORY_ORDER = ['Podcast', 'Pup of the Podcast', 'Faith', 'Family', 'Cooking', 'Advocacy', 'Health & Wellness', 'Behind the Book', 'Journal'];

export const metadata = {
  title: 'Journal',
  description:
    'Short, honest writing on faith, family, healing, and starting over, from Jen Archuleta.',
};

// Podcast cards often open with the show name as a stamp. Drop that
// leading label on the card. A sentence that actually says the name stays.
function cardExcerpt(excerpt) {
  if (typeof excerpt !== 'string') return excerpt;
  const text = excerpt.trim();
  const match = text.match(/^[\s\S]{0,90}?Unfiltered with Jen Archuleta\b[\s:.\-–—,…]*/i);
  if (!match) return text;
  const prefix = match[0];
  const promo = /^(?:[\s🎙🎙️🖤🥳❗️🚨🐾🔜📢]*)(?:coming|new episode|this month|welcome|season finale|live now|beyond the bombshell|in this powerful episode)/i;
  if (!promo.test(prefix)) return text;
  const rest = text.slice(prefix.length).trim();
  return rest || text;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Hero image is a string (fallback) or a Sanity image (live).
function heroUrl(img, w = 800, h = 533) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  return urlFor(img).width(w).height(h).fit('crop').url();
}

export default async function JournalPage({ searchParams }) {
  const live = await getAllPosts().catch(() => []);
  const posts = live && live.length > 0 ? live : FALLBACK_POSTS;

  const active = searchParams?.category || 'All';
  const visible = active === 'All' ? posts : posts.filter((p) => p.category === active);

  const counts = posts.reduce((m, p) => {
    if (p.category) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, {});
  // Pup of the Podcast stays up while posts are moved into it. Every other
  // category, including Cooking, appears once counts[c] is at least one.
  // Sponsors is a page link, not a category, and sits right after Pup.
  // A direct empty-category URL still shows the empty line below.
  const presentCategories = [
    ...CATEGORY_ORDER.filter((c) => c === 'Pup of the Podcast' || counts[c]),
    ...Object.keys(counts).filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];

  return (
    <>
      <SiteNav />

      <section className="wrap journal-head">
        <div className="eyebrow">The Journal</div>
        <h1>From the journal.</h1>
        <p className="lead" style={{ maxWidth: '56ch', marginInline: 'auto' }}>
          Short, honest writing on faith, family, healing, and starting over.
        </p>

        <div className="filter-row">
          <a className={`chip ${active === 'All' ? 'is-active' : ''}`} href="/journal">All</a>
          {presentCategories.map((c) => (
            <Fragment key={c}>
              <a
                className={`chip ${active === c ? 'is-active' : ''}`}
                href={`/journal?category=${encodeURIComponent(c)}`}
              >
                {c}
              </a>
              {c === 'Pup of the Podcast' ? (
                <a className="chip" href="/sponsors">Sponsors</a>
              ) : null}
            </Fragment>
          ))}
        </div>
        {active === 'Pup of the Podcast' && (
          <p className="center" style={{ marginTop: '18px' }}>
            <a href="/pups">Meet the Pups of the Podcast</a>
          </p>
        )}
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        {visible.length === 0 ? (
          <p className="center lead">No posts in “{active}” yet. Check back soon.</p>
        ) : (
          <div className="feed">
            {visible.map((p) => {
              const img = heroUrl(p.heroImage);
              return (
                <a key={p.slug} className="post-card" href={`/journal/${p.slug}`}>
                  {img && <img src={img} alt="" />}
                  <div className="body">
                    <div className="k">{p.category} · {formatDate(p.publishedAt)}</div>
                    <h3>{p.title}</h3>
                    <p>{cardExcerpt(p.excerpt)}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      <SiteFooter />
    </>
  );
}
