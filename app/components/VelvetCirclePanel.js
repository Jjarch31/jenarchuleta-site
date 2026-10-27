import './velvet-circle-panel.css';
import { SHOP, STRIPE_CUSTOMER_PORTAL_URL } from './site-data';

const PERKS = [
  '$9.99 a month',
  'The Velvet Letter',
  'The Velvet Pages, the private journal',
  'Up to 3 questions a month answered in writing',
  'Live monthly Zooms begin once the circle reaches 13 members',
];

export default function VelvetCirclePanel() {
  const join = SHOP.velvetCircleMembership;

  return (
    <section className="vc-announce" aria-labelledby="vc-announce-title">
      <div className="vc-announce-photo">
        <div className="vc-announce-frame">
          <img
            src="/assets/velvet-circle-room.jpg"
            alt="Friends in a candlelit living room, some wearing black bunny ears, holding copies of Beyond the Velvet Ropes"
            width="842"
            height="1402"
          />
        </div>
      </div>

      <div className="vc-announce-copy">
        <img
          className="vc-mark"
          src="/assets/velvet-circle-mark.png"
          alt=""
          width="436"
          height="436"
        />
        <div className="vc-announce-text">
          <p className="vc-announce-eyebrow">THE VELVET CIRCLE</p>
          <h2 id="vc-announce-title">
            A private book club and community for readers of Beyond the Velvet Ropes.
          </h2>
          <p className="vc-announce-line">
            Real conversations. Untold stories. A place to connect, ask questions, and grow together.
          </p>
          <p className="vc-announce-line">
            The QR code in the back of the book, and the passcode printed under it, open The Velvet Pages. The Velvet Letter comes with membership.
          </p>
          <ul className="vc-announce-perks">
            {PERKS.map((perk) => <li key={perk}>{perk}</li>)}
          </ul>
          <p className="vc-announce-box">
            Want the full experience? The Backstage Bundle is coming soon. It has my signed book, my velvet bookmark, and black velvet bunny ears.{' '}
            <a href="/shop#backstage-bundle">See the bundle</a>
            {' · '}
            <a href="/#letter">Notify me</a>
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
      </div>
    </section>
  );
}
