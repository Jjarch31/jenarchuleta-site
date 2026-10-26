'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import captions from '../velvet/captions.json';
import sizes from '../velvet/slide-sizes.json';

// One slideshow. The original gallery portraits, including jen-fun, except
// jen-bw-coat (the same coat shot as velvet 07, with magazine text over it;
// the file stays in the repo and on the other pages that use it). Then the
// two home-page row photos that are not already here (jen-sultry, jen-fun2),
// then the Velvet Circle photos except 08.jpg (the signed Miss August 2001
// portrait), 44.jpg (the puppy selfie), and 09.jpg. 09.jpg stays in the
// /velvet slideshow; the sharper press-kit copy is the home slide. 08 and
// 44 stay in the repo and out of both slideshows. 24, 25, and 26 stay.
// jen-glam and jen-fitness stay once. Faces are unretouched. Each slide is
// the whole file at its real ratio. Do not cover-crop these into a shared frame.
const BLANK_ALT = 'Photo from Jen’s personal collection';

const PORTRAITS = [
  {
    src: '/assets/presskit-headshot-floral.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 1100,
    height: 1370,
  },
  {
    src: '/assets/jen-glam.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 700,
    height: 835,
  },
  {
    src: '/assets/jen-joy.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 841,
    height: 1960,
  },
  {
    src: '/assets/presskit-headshot-glam.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 1320,
    height: 1259,
  },
  {
    src: '/assets/jen-fitness.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 1077,
    height: 887,
  },
  {
    src: '/assets/jen-fun.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 1320,
    height: 1756,
  },
  {
    src: '/assets/jen-sultry.jpg',
    alt: 'Jen Archuleta',
    width: 599,
    height: 1111,
  },
  {
    src: '/assets/jen-fun2.jpeg',
    alt: 'Jen Archuleta with a rescue puppy',
    width: 510,
    height: 512,
  },
];

// 09.jpg stays in captions.json so /velvet still shows it.
const HOME_ONLY_SKIP = new Set(['09.jpg']);

const FAMILY = captions.filter((item) => !HOME_ONLY_SKIP.has(item.file)).map((item) => {
  const caption = typeof item.caption === 'string' ? item.caption.trim() : '';
  const [width, height] = sizes[item.file];
  return {
    src: `/velvet-carousel/${item.file}`,
    alt: caption || BLANK_ALT,
    caption,
    width,
    height,
  };
});

const SLIDES = [...PORTRAITS, ...FAMILY];

const INTERVAL_MS = 4000;

function Chevron({ direction }) {
  const d = direction === 'prev' ? 'M14 5 L7 12 L14 19' : 'M10 5 L17 12 L10 19';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PhotoGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stageRef = useRef(null);
  const touchRef = useRef(null);

  const go = useCallback((step) => {
    setIndex((current) => (current + step + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotion = () => setReduceMotion(motion.matches);
    applyMotion();
    motion.addEventListener('change', applyMotion);

    const stage = stageRef.current;
    const view = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    if (stage) view.observe(stage);

    return () => {
      motion.removeEventListener('change', applyMotion);
      view.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || !inView) return undefined;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, inView, index, go]);

  const onTouchStart = (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
    setPaused(true);
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    setPaused(false);
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx > 0 ? -1 : 1);
  };

  const onTouchCancel = () => {
    touchRef.current = null;
    setPaused(false);
  };

  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  };

  const count = SLIDES.length;
  const slide = SLIDES[index];
  const nearby = [-1, 0, 1].map((offset) => {
    const i = (index + offset + count) % count;
    return { offset, slide: SLIDES[i] };
  });

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  };

  return (
    <section id="gallery" className="gallery-band" aria-labelledby="gallery-heading">
      <div className="wrap">
        <h2 id="gallery-heading">Gallery</h2>
        <div
          ref={stageRef}
          className="gallery-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        >
          <button
            type="button"
            className="gallery-arrow gallery-arrow--prev"
            aria-label="Previous photo"
            onClick={() => go(-1)}
          >
            <Chevron direction="prev" />
          </button>

          <div
            className="gallery-frame"
            role="group"
            aria-roledescription="carousel"
            aria-label={`Photo ${index + 1} of ${count}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
          >
            <div className="gallery-viewport">
              {nearby.map(({ offset, slide: item }) => (
                <div
                  key={item.src}
                  className={`gallery-slide${offset === 0 ? ' is-active' : ''}`}
                  aria-hidden={offset === 0 ? undefined : true}
                >
                  <Image
                    src={item.src}
                    alt={offset === 0 ? item.alt : ''}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 760px) 86vw, 440px"
                    {...(offset === 0 && index === 0 ? { priority: true } : { loading: 'eager' })}
                  />
                </div>
              ))}
            </div>
            {slide.caption ? <p className="gallery-caption">{slide.caption}</p> : null}
          </div>

          <button
            type="button"
            className="gallery-arrow gallery-arrow--next"
            aria-label="Next photo"
            onClick={() => go(1)}
          >
            <Chevron direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
