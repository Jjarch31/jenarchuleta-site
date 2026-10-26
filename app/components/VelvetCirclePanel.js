import './velvet-circle-panel.css';
import PhotoNeeded from './PhotoNeeded';
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
          <PhotoNeeded>
            A warm, cozy cream and gold book club scene. People with a book at a meeting.
          </PhotoNeeded>
        </div>
      </div>

      <div className="vc-announce-copy">
        <p className="vc-announce-eyebrow">THE VELVET CIRCLE</p>
        <h2 id="vc-announce-title">
          A private book club and community for readers of Beyond the Velvet Ropes.
        </h2>
        <p className="vc-announce-line">
          Real conversations. Untold stories. A place to connect, ask questions, and grow together.
        </p>
        <ul className="vc-announce-perks">
          {PERKS.map((perk) => <li key={perk}>{perk}</li>)}
        </ul>
        <p className="vc-announce-box">
          <a href="/shop#backstage-bundle">
            Want the full experience? The Backstage Bundle has my signed book, my velvet bookmark, and black velvet bunny ears.
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
