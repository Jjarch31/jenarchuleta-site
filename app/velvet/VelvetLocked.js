import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetCirclePanel from '../components/VelvetCirclePanel';
import { BOOK_BUY_URL } from '../components/site-data';
import VelvetGate from './Gate';
import './teaser.css';

function KeyIcon() {
  return (
    <svg className="vp-key" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function VelvetLocked() {
  return (
    <div className="vp-teaser">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap vp-intro">
        <p className="eyebrow">A private journal</p>
        <h1 className="vp-title"><KeyIcon /> The Velvet Letter</h1>
        <p className="vp-close">The story doesn’t stop here.</p>
        <p className="vp-lock-note">
          You have to buy the book to get in. The passcode is in the back of the book, right under the QR code.
        </p>
        <p className="vp-return">I add something special here every once in a while, so check back.</p>
        <div className="vp-actions">
          <a className="btn btn-primary" href={BOOK_BUY_URL} target="_blank" rel="noopener noreferrer">Buy the book</a>
          <VelvetGate />
        </div>
      </section>
      <VelvetCirclePanel />
      <SiteFooter />
    </div>
  );
}
