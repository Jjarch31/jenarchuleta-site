import { timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { PortableText } from '@portabletext/react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { urlFor } from '../sanity/image';
import { getVelvetLetters } from '../sanity/queries';
import { gateKey } from '../velvet/passcode';
import { velvetLetterToken } from './token';
import Gate from './Gate';
import './velvet-letter.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Velvet Letter',
  description:
    'A private space for readers of Beyond the Velvet Ropes. Personal letters, reflections, and updates.',
};

function unlocked() {
  const secret = gateKey();
  if (!secret) return false;
  const got = cookies().get('velvet_letter')?.value || '';
  const expected = velvetLetterToken(secret);
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function softenDashes(text) {
  if (typeof text !== 'string' || !text.includes('—')) return text;
  const trimmed = text.trim();
  if (trimmed === '— Jen' || trimmed === '—Jen') return 'Jen.';
  return text.replace(/\s*—\s*/g, ', ');
}

function softenBody(value) {
  if (!Array.isArray(value)) return value;
  return value.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    return {
      ...block,
      children: block.children.map((child) => (
        child && typeof child.text === 'string'
          ? { ...child, text: softenDashes(child.text) }
          : child
      )),
    };
  });
}

function formatLetterDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function VelvetLetterPage() {
  const open = unlocked();
  const letters = open ? await getVelvetLetters().catch(() => null) : null;

  return (
    <div className="vl-page">
      <SiteNav />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <section id="main-content" className="wrap vl-intro">
        <div className="eyebrow">Velvet Letter</div>
        <h1>Velvet Letter</h1>
        <p>
          The story doesn’t end on the last page. Welcome to a private space for readers of Beyond the Velvet Ropes, where I share personal letters, reflections, and updates as my story continues. I’d love for you to be part of what comes next.
        </p>
        <p>
          Don’t have access yet? Buy Beyond the Velvet Ropes to receive your QR code and passcode, then come inside.
        </p>
        <a className="btn btn-ghost" href="/book">Buy the Book</a>
      </section>

      {open ? (
        <section className="wrap vl-letters">
          {letters === null ? (
            <p>The letters will be here in a moment. Please refresh.</p>
          ) : letters.length === 0 ? (
            <p>The first letter is on its way.</p>
          ) : (
            letters.map((letter) => (
              <article key={letter._id}>
                <p className="vl-date">{formatLetterDate(letter.publishedAt)}</p>
                <h2>{softenDashes(letter.title)}</h2>
                {letter.image ? (
                  <img
                    src={urlFor(letter.image).width(1200).url()}
                    alt={letter.image.alt || ''}
                  />
                ) : null}
                {letter.body ? <PortableText value={softenBody(letter.body)} /> : null}
              </article>
            ))
          )}
        </section>
      ) : (
        <section className="wrap vl-enter">
          <Gate />
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
