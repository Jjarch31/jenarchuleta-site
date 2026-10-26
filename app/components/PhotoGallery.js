'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Public portraits only. Faces are unretouched. Each slide is the whole file
// at its real ratio (width/height below). Do not cover-crop these into a
// shared frame. That was cutting heads, hems, and the sides of wider shots.
const SLIDES = [
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
    src: '/assets/jen-bw-coat.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 1320,
    height: 1971,
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
];

const INTERVAL_MS = 2700;

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
    const touch = event.changedTouches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx > 0 ? -1 : 1);
  };

  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  };

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
            aria-label={`Photo ${index + 1} of ${SLIDES.length}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="gallery-viewport">
              {SLIDES.map((slide, slideIndex) => {
                const active = slideIndex === index;
                return (
                  <div
                    key={slide.src}
                    className={`gallery-slide${active ? ' is-active' : ''}`}
                    aria-hidden={active ? undefined : true}
                  >
                    <Image
                      src={slide.src}
                      alt={active ? slide.alt : ''}
                      width={slide.width}
                      height={slide.height}
                      sizes="(max-width: 760px) 86vw, 440px"
                      priority={slideIndex === 0}
                    />
                  </div>
                );
              })}
            </div>
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
