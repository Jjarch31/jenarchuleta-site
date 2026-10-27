import './pups.css';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';
import { PUPS } from '../../lib/pups';

export const metadata = {
  title: 'Pups of the Podcast',
  description:
    'Every episode of Unfiltered with Jen Archuleta features a rescue pup looking for a home. The Archuleta family donates toward adoption fees.',
};

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
        <img src={photo} alt={pup.alt || pup.name} />
        {pup.adopted ? <span className="pup-badge">Adopted</span> : null}
      </div>
      <div className="pup-body">
        <h2>{pup.name}</h2>
        {pup.breedAge ? <p className="pup-breed">{pup.breedAge}</p> : null}
        {pup.rescue ? (
          <p className="pup-rescue">
            <span className="pup-k">Rescue </span>
            {pup.rescueHref ? (
              <a href={pup.rescueHref} target="_blank" rel="noopener noreferrer">{pup.rescue}</a>
            ) : pup.rescue}
          </p>
        ) : null}
        {pup.guest ? (
          <p className="pup-guest"><span className="pup-k">With </span>{pup.guest}</p>
        ) : null}
        {pup.note ? <p className="pup-note">{pup.note}</p> : null}
        {pup.watch ? (
          <a className="pup-more" href={pup.watch} target="_blank" rel="noopener noreferrer">Watch the episode</a>
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
          {pups.map((pup) => {
            const photo = pup.src || (pup.imageSlug ? photos[pup.imageSlug] : null);
            if (!photo) return null;
            return <PupCard key={pup.name} pup={pup} photo={photo} />;
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
