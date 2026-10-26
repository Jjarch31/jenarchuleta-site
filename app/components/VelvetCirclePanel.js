import './velvet-circle-panel.css';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';

const PERKS = [
  '$9.99 a month',
  'A private monthly letter from Jen',
  'A private passcode journal',
  'Up to 3 questions a month answered in writing',
  'Live Zooms once the circle reaches 13 members',
];

export default function VelvetCirclePanel() {
  const join = SHOP.velvetCircleMembership;

  return (
    <section className="vc-announce" aria-labelledby="vc-announce-title">
      <div className="vc-announce-photo">
        <div className="vc-announce-frame">
          <img
            src="/assets/velvet-circle-bookclub.jpg"
            alt="Friends gathered for a book club, some wearing black velvet bunny ears"
            width="1152"
            height="864"
          />
          <div className="vc-finder" aria-hidden="true">
            <span className="vc-rec"><i />REC</span>
            <span className="vc-corner vc-corner-tl" />
            <span className="vc-corner vc-corner-tr" />
            <span className="vc-corner vc-corner-bl" />
            <span className="vc-corner vc-corner-br" />
          </div>
        </div>
      </div>

      <div className="vc-announce-copy">
        <p className="vc-announce-eyebrow">THE VELVET CIRCLE</p>
        <h2 id="vc-announce-title">
          A private book club &amp; community for readers of Beyond the Velvet Ropes
        </h2>
        <p className="vc-announce-line">
          Real conversations. Untold stories. A place to connect, ask questions, and grow together.
        </p>
        <ul className="vc-announce-perks">
          {PERKS.map((perk) => <li key={perk}>{perk}</li>)}
        </ul>
        <p className="vc-announce-box">
          <a href="/shop#backstage-box">
            Want the full experience? The Backstage Box has my signed book, my velvet bookmark and black velvet bunny ears.
          </a>
        </p>
        {join ? (
          <a className="btn btn-primary" href={join} target="_blank" rel="noopener noreferrer">
            Join the Velvet Circle
          </a>
        ) : (
          <span className="btn btn-disabled">Coming soon</span>
        )}
        <p className="vc-announce-cancel">
          <a href={STRIPE_CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">Cancel anytime</a>
        </p>
      </div>
    </section>
  );
}
