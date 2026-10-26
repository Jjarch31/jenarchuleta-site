import './pups.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';
import { GALLERY_PUPS, PUPS } from '../../lib/pups';

export const metadata = {
  title: 'Pups of the Podcast',
  description:
    'Every episode of Unfiltered with Jen Archuleta features a rescue pup looking for a home. The Archuleta family donates toward adoption fees.',
};

function Paw() {
  return (
    <svg className="pup-paw" viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="18" cy="26" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="30" cy="18" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="42" cy="18" rx="6" ry="8" fill="currentColor" />
      <ellipse cx="52" cy="28" rx="5.5" ry="7.5" fill="currentColor" />
      <ellipse cx="34" cy="42" rx="14" ry="12" fill="currentColor" />
    </svg>
  );
}

async function heroUrls(slugs) {
  if (!slugs.length) return {};
  try {
    const rows = await client.fetch(
      `*[_type == "post" && slug.current in $slugs]{ "slug": slug.current, heroImage }`,
      { slugs },
      { cache: 'no-store' },
    );
    const urls = {};
    for (const row of rows || []) {
      if (!row?.heroImage) continue;
      urls[row.slug] = urlFor(row.heroImage).width(900).fit('max').auto('format').url();
    }
    return urls;
  } catch {
    return {};
  }
}

function PupCard({ pup, photo }) {
  return (
    <article className="pup-card">
      <div className="pup-media">
        {photo ? (
          <img src={photo} alt={pup.alt || pup.name} />
        ) : (
          <Paw />
        )}
        {pup.adopted ? <span className="pup-badge">Adopted</span> : null}
      </div>
      <div className="pup-body">
        <h2>{pup.name}</h2>
        {pup.breedAge ? <p className="pup-breed">{pup.breedAge}</p> : null}
        {pup.rescue ? (
          <p className="pup-rescue"><span className="pup-k">Rescue </span>{pup.rescue}</p>
        ) : null}
        {pup.guest ? (
          <p className="pup-guest"><span className="pup-k">With </span>{pup.guest}</p>
        ) : null}
        {pup.post ? <a className="pup-more" href={`/journal/${pup.post}`}>Read more</a> : null}
      </div>
    </article>
  );
}

export default async function PupsPage() {
  const pups = [...PUPS].sort((a, b) => a.date.localeCompare(b.date));
  const photos = await heroUrls([...new Set(pups.map((p) => p.imageSlug).filter(Boolean))]);

  return (
    <div className="pups-page">
      <SiteNav />

      <section className="wrap pups-head">
        <div className="eyebrow">Unfiltered with Jen Archuleta</div>
        <h1>Pups of the Podcast</h1>
        <p className="lead">
          Every episode of Unfiltered with Jen Archuleta features a rescue pup looking for a home.
          The Archuleta family donates toward each pup’s adoption fees.
        </p>
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <div className="pups-grid">
          {pups.map((pup) => (
            <PupCard
              key={pup.date}
              pup={pup}
              photo={pup.imageSlug ? photos[pup.imageSlug] : null}
            />
          ))}
          {GALLERY_PUPS.map((pup) => (
            <PupCard
              key={pup.src}
              pup={{ ...pup, name: 'Pup of the Podcast' }}
              photo={pup.src}
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
