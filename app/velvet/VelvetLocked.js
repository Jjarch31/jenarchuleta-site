import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetCirclePanel from '../components/VelvetCirclePanel';
import { BOOK_BUY_URL } from '../components/site-data';
import VelvetGate from './Gate';
import './teaser.css';

export default function VelvetLocked() {
  return (
    <div className="vp-teaser">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap vp-intro">
        <p className="eyebrow">A private journal</p>
        <h1>The Velvet Pages</h1>
        <p className="lead">
          Letters, photos, and the pieces that live past the last page. This is the journal I keep for readers of the book.
        </p>
        <p className="vp-lock-note">
          The Velvet Pages are for readers of Beyond the Velvet Ropes. Your passcode is printed in the back of the book, under the QR code.
        </p>
        <p className="vp-return">I add something special here every once in a while, so check back.</p>
        <div className="vp-actions">
          <a className="btn btn-primary" href={BOOK_BUY_URL} target="_blank" rel="noopener noreferrer">Buy the book</a>
          <VelvetGate />
        </div>
        <p className="vp-close">The story doesn’t stop here.</p>
      </section>
      <VelvetCirclePanel />
      <SiteFooter />
    </div>
  );
}
