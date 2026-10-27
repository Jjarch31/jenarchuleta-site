import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { SOCIALS } from '../components/site-data';

export const metadata = {
  title: 'The Forever Angels',
  description:
    'The Forever Angels, the nonprofit Jen co-founded for families, veterans, hospice patients, and animals who get passed over.',
};

// The old Squarespace paths /forever-angels and /the-forever-angels pointed at
// the homepage movement band. This is that page, in one place.
export default function ForeverAngelsPage() {
  return (
    <>
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap text-wrap" style={{ paddingBlock: 'clamp(56px, 9vw, 110px)' }}>
        <p className="eyebrow">What I support</p>
        <h1>The Forever Angels</h1>
        <p className="lead">
          I co-founded The Forever Angels, for the families, veterans, hospice patients, and animals who get passed over.
        </p>
        <p>
          Beyond the Ropes and The Forever Angels. Choosing the overlooked, one act at a time.
        </p>
        <p>
          <a className="btn btn-primary" href={SOCIALS.foreverAngels} target="_blank" rel="noopener noreferrer">
            Visit The Forever Angels
          </a>
        </p>
      </section>
      <SiteFooter />
    </>
  );
}
