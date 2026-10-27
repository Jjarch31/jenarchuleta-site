import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import VelvetCirclePanel from '../components/VelvetCirclePanel';
import VelvetGate from './Gate';
import './teaser.css';

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function Lock() {
  return (
    <span className="vp-lock">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="11" width="14" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 11 V8 a4 4 0 0 1 8 0 V11" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
      Locked
    </span>
  );
}

export default function VelvetLocked({ entries }) {
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
          The Velvet Pages are for readers of Beyond the Velvet Ropes. Your passcode is printed inside the book.
        </p>
        <div className="vp-actions">
          <a className="btn btn-primary" href="/book">Get the book</a>
          <VelvetGate />
        </div>
      </section>
      <section className="wrap" aria-label="Journal entries">
        <ul className="vp-entries">
          {entries.map((entry) => (
            <li className="vp-entry" key={entry.id}>
              <div className="vp-entry-top">
                {entry.date ? <p className="vp-date">{formatDate(entry.date)}</p> : <span />}
                <Lock />
              </div>
              <h2>{entry.title}</h2>
              {entry.preview ? <p className="vp-excerpt">{entry.preview}</p> : null}
            </li>
          ))}
        </ul>
      </section>
      <VelvetCirclePanel />
      <SiteFooter />
    </div>
  );
}
