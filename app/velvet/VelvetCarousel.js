'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import captions from './captions.json';
import sizes from './slide-sizes.json';

const BLANK_ALT = 'Photo from Jen’s personal collection';

function Chevron({ direction }) {
  const d = direction === 'prev' ? 'M14 5 L7 12 L14 19' : 'M10 5 L17 12 L10 19';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VelvetCarousel() {
  const [index, setIndex] = useState(0);
  const touchRef = useRef(null);
  const count = captions.length;
  const slide = captions[index];
  const [width, height] = sizes[slide.file];
  const caption = typeof slide.caption === 'string' ? slide.caption.trim() : '';
  const alt = caption || BLANK_ALT;

  const go = useCallback((step) => {
    setIndex((current) => (current + step + count) % count);
  }, [count]);

  function onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setIndex(count - 1);
    }
  }

  function onTouchStart(event) {
    const touch = event.changedTouches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event) {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  }

  return (
    <section
      className="vc-carousel"
      aria-roledescription="carousel"
      aria-label="A look behind the ropes"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <h3>A look behind the ropes</h3>
      <div
        className="vc-frame"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={slide.file}
          src={`/velvet-carousel/${slide.file}`}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 640px) 86vw, 420px"
          style={{ width: '100%', height: 'auto' }}
          {...(index === 0 ? { priority: true } : { loading: 'lazy' })}
        />
      </div>
      {caption ? <p className="vc-caption">{caption}</p> : null}
      <div className="vc-controls">
        <button type="button" className="vc-arrow" aria-label="Previous photo" onClick={() => go(-1)}>
          <Chevron direction="prev" />
        </button>
        <p className="vc-count" aria-live="polite">
          {index + 1} of {count}
        </p>
        <button type="button" className="vc-arrow" aria-label="Next photo" onClick={() => go(1)}>
          <Chevron direction="next" />
        </button>
      </div>
    </section>
  );
}
