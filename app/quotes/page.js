import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import './quotes.css';

export const metadata = {
  title: 'Quotes',
  description: 'Lines from Jen Archuleta and Beyond the Velvet Ropes.',
};

const QUOTES = [
  {
    text: 'Your story isn’t what happened to you. It’s what you do with it.',
  },
  {
    text: 'You didn’t need rescuing. You needed time. Time to find your voice. Time to believe it mattered.',
  },
  {
    text: 'I’ve lost people by being myself, but I would have lost myself by being who they wanted.',
  },
  {
    text: 'To those who doubted me, you didn’t break me. You made me fight harder. And still, I forgive you.',
  },
  {
    text: 'I’m not trying to be anybody. I’m just really happy being who I am.',
    source: 'Jen Archuleta',
  },
  {
    text: 'It’s not who I am, it’s what I did. And the bunny ears here were just representing a piece of my life, not my whole life.',
    source: 'Jen Walcott Archuleta, WKBN 27 First News, Aug 23, 2026',
  },
];

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
