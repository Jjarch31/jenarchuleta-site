import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { BOOKING_EMAIL, PODCAST, SOCIALS } from '../components/site-data';
import './contact.css';

export const metadata = {
  title: { absolute: 'Contact | Jen Walcott Archuleta' },
  description:
    'Press, interviews, speaking, and events. Email Jen Walcott Archuleta.',
};

const FOLLOW = [
  { label: 'Instagram', href: 'https://instagram.com/jenniferwalcott' },
  { label: 'X', href: 'https://x.com/Jenniferwalcott' },
  { label: 'Facebook', href: 'https://facebook.com/therealjenniferwalcott' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jennifer-archuleta-633805115' },
  { label: 'TikTok', href: SOCIALS.tiktok },
  { label: 'Podcast on Buzzsprout', href: PODCAST.buzzsprout },
  { label: 'Podcast on YouTube', href: PODCAST.youtube },
];

export default function ContactPage() {
  const mailto = `mailto:${BOOKING_EMAIL}`;

  return (
    <div className="contact-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <section id="main-content" className="wrap contact-hero">
        <img
          className="contact-cover"
          src="/assets/book-cover.jpg"
          alt="Beyond the Velvet Ropes book cover"
          width="1000"
          height="1500"
        />
        <p className="hero-script" style={{ fontSize: 'var(--text-script-m)' }}>Let’s connect</p>
        <h1>Jen Walcott Archuleta</h1>
        <p className="contact-role">
          Author of Beyond the Velvet Ropes. Co-founder of The Forever Angels. Host of Unfiltered with Jen Archuleta.
        </p>
      </section>

      <section className="wrap contact-body" style={{ paddingTop: 0 }}>
        <p>
          Thank you for reaching out. Whether you are a reporter, an event planner looking for a speaker, or a podcast host who would like to have me on, I would love to hear from you.
        </p>
        <p>For press, interviews, speaking, and events:</p>
        <p className="contact-email"><a href={mailto}>{BOOKING_EMAIL}</a></p>
        <p>
          Please include your name, your outlet or event, the date, and a little about what you have in mind. I read every message.
        </p>

        <h2>Follow along</h2>
        <ul className="contact-follow">
          {FOLLOW.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
