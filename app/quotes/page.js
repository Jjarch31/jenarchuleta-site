import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { QUOTES } from './quotes-data';
import './quotes.css';

export const metadata = {
  title: 'Quotes',
  description: 'Lines from Jen Archuleta and Beyond the Velvet Ropes.',
};

export default function QuotesPage() {
  return (
    <div className="quotes-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap quotes-head">
        <div className="eyebrow">In her words</div>
        <h1>Quotes</h1>
        <div className="quotes-list">
          {QUOTES.map((quote) => (
            <figure key={quote.text}>
              <blockquote>
                <p>{quote.text}</p>
              </blockquote>
              {quote.source ? <figcaption>{quote.source}</figcaption> : null}
            </figure>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
