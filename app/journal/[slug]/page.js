import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import '../journal.css';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { OG_IMAGE } from '../../components/site-data';
import { urlFor } from '../../sanity/image';
import { getPostBySlug, getAllSlugs } from '../../sanity/queries';
import { POSTS as FALLBACK_POSTS, getPost as getFallbackPost } from '../_posts';

// Render each post from the published Sanity document on the request.
// These routes were static ISR. The first view after a publish still received
// the previous HTML, so an edited handle stayed wrong while /journal (dynamic)
// already showed other new posts.
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await getAllSlugs().catch(() => []);
  const all = slugs && slugs.length > 0 ? slugs : FALLBACK_POSTS.map((p) => p.slug);
  return all.map((slug) => ({ slug }));
}

async function resolvePost(slug) {
  const live = await getPostBySlug(slug).catch(() => null);
  return live || getFallbackPost(slug);
}

function descriptionFromBody(body) {
  if (!Array.isArray(body)) return '';
  const text = body
    .filter((block) => block && block._type === 'block' && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child?.text || '').join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  const cut = text.slice(0, 180);
  const end = cut.lastIndexOf('. ');
  const sentence = end > 40 ? cut.slice(0, end + 1) : cut;
  return sentence.length > 160 ? `${sentence.slice(0, 157).trim()}…` : sentence;
}

export async function generateMetadata({ params }) {
  const post = await resolvePost(params.slug);
  if (!post) return {};
  const description = post.seoDescription || post.excerpt || descriptionFromBody(post.body);
  return {
    title: post.seoTitle || post.title,
    description,
    openGraph: {
      title: post.seoTitle || post.title,
      description,
      type: 'article',
      images: [OG_IMAGE],
    },
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function heroUrl(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  return urlFor(img).width(1200).url();
}

// ---------------------------------------------------------------------------
// Auto-link bare URLs (added 2026-10-24).
// URLs pasted into a post in /studio arrive as plain text, and every link in the
// migrated Squarespace posts came across as plain text too — so readers couldn't
// click them. This turns bare http(s) URLs into real links at render time.
// Nothing in Sanity changes; text that's already a link is left alone.
// ---------------------------------------------------------------------------
const BARE_URL = /https?:\/\/[A-Za-z0-9\-._~:/?#[\]@!$&'*+,;=%]+/g;

// These product sheets now 404. Leave the words of the recipe, drop the dead address.
const RETIRED_URLS = new Set([
  'http://www.phpure.com/nutrition_products/pdfs/Nutritional_Flakes.pdf',
  'https://www.phpure.com/nutrition_products/pdfs/Nutritional_Flakes.pdf',
  'http://www.udoerasmus.com/products/pdf_files/Probiotics.pdf',
  'https://www.udoerasmus.com/products/pdf_files/Probiotics.pdf',
]);

function cleanUrl(raw) {
  let url = raw.replace(/[.,;:!?'*\]]+$/, ''); // trailing punctuation
  // Migration glitch: a word glued onto a bare domain ("...buzzsprout.comFollow").
  url = url.replace(/^(https?:\/\/[^/?#]*\.[a-z]{2,})[A-Z][A-Za-z]*$/, '$1');
  // ...or onto the end of a link ("youtu.be/<11-char id>LISTEN", "?i=123LISTEN").
  url = url.replace(/^(https?:\/\/youtu\.be\/[A-Za-z0-9_-]{11})[A-Z][A-Za-z]+$/, '$1');
  url = url.replace(/(=\d+)[A-Z][A-Za-z]+$/, '$1');
  return url;
}

function linkifyBody(blocks) {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
    const linkKeys = new Set(markDefs.filter((d) => d && d._type === 'link').map((d) => d._key));
    let changed = false;
    const children = [];
    block.children.forEach((span, si) => {
      const marks = Array.isArray(span?.marks) ? span.marks : [];
      if (!span || span._type !== 'span' || typeof span.text !== 'string' || marks.some((m) => linkKeys.has(m))) {
        children.push(span);
        return;
      }
      const text = span.text;
      const base = span._key || `s${si}`;
      let last = 0;
      let n = 0;
      for (const m of text.matchAll(BARE_URL)) {
        const url = cleanUrl(m[0]);
        if (!/^https?:\/\/[^/?#]+\.[^/?#]+/.test(url)) continue; // not a real address
        const start = m.index;
        if (start > last) children.push({ ...span, _key: `${base}-t${n}`, text: text.slice(last, start) });
        if (!RETIRED_URLS.has(url)) {
          const key = `autolink-${si}-${n}`;
          markDefs.push({ _type: 'link', _key: key, href: url });
          children.push({ ...span, _key: `${base}-u${n}`, text: url, marks: [...marks, key] });
        }
        last = start + url.length;
        n += 1;
      }
      if (n === 0) {
        children.push(span);
        return;
      }
      if (last < text.length) children.push({ ...span, _key: `${base}-t${n}`, text: text.slice(last) });
      changed = true;
    });
    return changed ? { ...block, markDefs, children } : block;
  });
}

const isExternal = (href) =>
  /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?jenarchuleta\.com(\/|$)/i.test(href);

// Portable Text renderers for links + inline images.
const ptComponents = {
  types: {
    image: ({ value }) => (
      <img src={urlFor(value).width(1100).url()} alt={value?.alt || ''} style={{ width: '100%', borderRadius: 'var(--radius-lg)', margin: '20px 0' }} />
    ),
  },
  marks: {
    link: ({ value, children }) =>
      RETIRED_URLS.has(value?.href || '') ? null : isExternal(value?.href || '') ? (
        <a href={value.href} target="_blank" rel="noopener noreferrer">{children}</a>
      ) : (
        <a href={value?.href}>{children}</a>
      ),
  },
};

export default async function JournalPost({ params }) {
  const post = await resolvePost(params.slug);
  if (!post) notFound();

  const url = `https://jenarchuleta.com/journal/${post.slug}`;
  const shareText = encodeURIComponent(post.title);
  const hero = heroUrl(post.heroImage);
  const bodyIsStrings = Array.isArray(post.body) && typeof post.body[0] === 'string';

  return (
    <>
      <SiteNav />

      <article className="wrap text-wrap">
        <div className="article-head">
          <div className="k">{post.category}</div>
          <h1>{post.title}</h1>
          <div className="meta">{formatDate(post.publishedAt)}</div>
        </div>

        {hero && <img className="article-hero" src={hero} alt="" />}

        <div className="article-body">
          {bodyIsStrings
            ? post.body.map((para, i) => <p key={i}>{para}</p>)
            : post.body && <PortableText value={linkifyBody(post.body)} components={ptComponents} />}
        </div>

        {/* Sponsor block — renders only when a sponsor is set */}
        {post.sponsor && post.sponsor.name && (
          <div className="sponsor-block">
            <div className="k">Sponsored by {post.sponsor.name}</div>
            {post.sponsor.url && (
              <p style={{ margin: '6px 0 0' }}><a href={post.sponsor.url}>{post.sponsor.url}</a></p>
            )}
            {post.sponsor.disclosure && (
              <p className="foot-meta" style={{ margin: '8px 0 0' }}>{post.sponsor.disclosure}</p>
            )}
          </div>
        )}

        {/* Affiliate links + FTC disclosure — renders only when present */}
        {post.affiliateLinks && post.affiliateLinks.length > 0 && (
          <>
            <ul>
              {post.affiliateLinks.map((l, i) => (
                <li key={i}><a href={l.url}>{l.label}</a></li>
              ))}
            </ul>
            <p className="disclosure">
              This post contains affiliate links. If you buy through them I may earn a small
              commission, at no extra cost to you. I only share what I actually use.
            </p>
          </>
        )}

        {/* Share */}
        <div className="share-row">
          <span className="k">Share</span>
          <a className="btn btn-ghost btn-sm" href={`https://x.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`}>X</a>
          <a className="btn btn-ghost btn-sm" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}>Facebook</a>
          <a className="btn btn-ghost btn-sm" href={`mailto:?subject=${shareText}&body=${encodeURIComponent(url)}`}>Email</a>
        </div>

        {/* Book CTA */}
        <div className="book-cta">
          <img src="/assets/book-cover.jpg" alt="Beyond the Velvet Ropes" />
          <div>
            <div className="eyebrow">My memoir is out now.</div>
            <h3 style={{ margin: '.2em 0 .3em' }}>Beyond the Velvet Ropes</h3>
            <p className="foot-meta" style={{ margin: '0 0 14px' }}>My Story of Perseverance, Hope, and Love</p>
            <a href="/book" className="btn btn-primary btn-sm">Get the book</a>
          </div>
        </div>
      </article>

      <SiteFooter />
    </>
  );
}
