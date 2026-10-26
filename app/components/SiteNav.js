'use client';

import { useState } from 'react';

// Light-register site nav used on the homepage, /podcast and /journal.
// (The book page keeps its own minimal dark nav.)
// Desktop: inline links. Mobile (<=760px): hamburger toggles a dropdown.
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav nav--collapsible">
      <div className="nav-inner">
        <a href="/" className="brand" onClick={close}>Jen Archuleta</a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
          <a href="/about" onClick={close}>About</a>
          <a href="/#gallery" onClick={close}>Gallery</a>
          <a href="/book" onClick={close}>Book</a>
          <a href="/quotes" onClick={close}>Quotes</a>
          <a href="/podcast" onClick={close}>Podcast</a>
          <a href="/journal" onClick={close}>Journal</a>
          <a href="/velvet" className="nav-velvet" onClick={close}>
            <svg className="nav-key" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="8.2" cy="8.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path d="M11.6 11.2 L20 19.2 M15.6 16.4 L18.4 19.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            Velvet Pages
          </a>
          <a href="/velvet-letter" onClick={close}>Velvet Letter</a>
          <a href="/media" onClick={close}>Media</a>
          <a href="/media#speaking" onClick={close}>Speaking</a>
          <a href="/shop" onClick={close}>Shop</a>
          <a href="/contact" onClick={close}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
