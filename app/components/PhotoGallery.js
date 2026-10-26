'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import captions from '../velvet/captions.json';
import sizes from '../velvet/slide-sizes.json';

// One slideshow. The Hollywood set is first, together, so those slides
// lead. Then portraits that are not already on the homepage, then
// Velvet Circle photos, then gallery-new. A file stays in the repo when
// its slide is left out. /velvet still reads captions.json.
// Out of this slideshow:
// presskit-headshot-floral (home hero). jen-glam, jen-fitness, jen-sultry,
// and jen-fun2 (the homepage photo row; the row itself stays). jen-fun
// (group of adults, not a dog photo). jen-bw-coat and velvet 07 (the coat
// already in the story section as jen-bw-coat2). 08 and 44 are already
// out of captions.json. 09 stays on /velvet. 24, 25, and 26 show the kids
// and stay on /velvet only. 27 and 45 are dog photos on /pups. 43 is the
// same Urban Axes outing as gallery-new new_24, so new_24 stays.
// gallery-new left out: new_02, new_10, new_11, new_12, new_15, new_17,
// new_20, new_21, new_26, new_27. new_17, new_20, and new_21 repeat the
// Childhelp luncheon in velvet 37, which stays. new_10, new_11, and
// new_12 are on /pups. new_01, new_29, new_30, new_32, and new_33 are not
// in the repo. Faces are unretouched. Each slide is the whole file at its
// real ratio. Do not cover-crop these into a shared frame. Only the
// current slide and its two neighbors are mounted.
const BLANK_ALT = 'Photo from Jen’s personal collection';

// Long edge already at or under 1600. Stored at the original size.
const HOLLYWOOD = [
  {
    src: '/assets/gallery-hw/hw_01.jpg',
    alt: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    caption: 'On stage at Playboy’s Rock the Rabbit party, SXSW',
    width: 1242,
    height: 781,
  },
  {
    src: '/assets/gallery-hw/hw_02.jpg',
    alt: 'Jen Walcott Archuleta on a red carpet',
    width: 1320,
    height: 1067,
  },
  {
    src: '/assets/gallery-hw/hw_03.jpg',
    alt: 'With Tommy Lee',
    caption: 'With Tommy Lee',
    width: 960,
    height: 998,
  },
  {
    src: '/assets/gallery-hw/hw_04.jpg',
    alt: 'With Howard Stern',
    caption: 'With Howard Stern',
    width: 1242,
    height: 950,
  },
  {
    src: '/assets/gallery-hw/hw_05.jpg',
    alt: 'With Shaggy in Los Angeles',
    caption: 'With Shaggy in Los Angeles',
    width: 1320,
    height: 1290,
  },
  {
    src: '/assets/gallery-hw/hw_06.jpg',
    alt: 'My name on the Palms marquee in Las Vegas',
    caption: 'My name on the Palms marquee in Las Vegas',
    width: 640,
    height: 480,
  },
  {
    src: '/assets/gallery-hw/hw_07.jpg',
    alt: 'Swimming with a dolphin',
    caption: 'Swimming with a dolphin',
    width: 1179,
    height: 817,
  },
  {
    src: '/assets/gallery-hw/hw_09.jpg',
    alt: 'Jen Walcott Archuleta',
    width: 786,
    height: 1577,
  },
];

const PORTRAITS = [
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
];

// These stay in captions.json so /velvet still shows them.
const HOME_ONLY_SKIP = new Set([
  '07.jpg',
  '09.jpg',
  '24.jpg',
  '25.jpg',
  '26.jpg',
  '27.jpg',
  '43.jpg',
  '45.jpg',
]);

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

const GALLERY_NEW = [
  { src: '/assets/gallery-new/new_03.jpg', alt: 'Jen Walcott Archuleta holding her book', width: 1062, height: 1600 },
  { src: '/assets/gallery-new/new_04.jpg', alt: 'Jen Walcott Archuleta in a white dress', width: 1320, height: 1537 },
  { src: '/assets/gallery-new/new_05.jpg', alt: 'Jen Walcott Archuleta on a red carpet', width: 1280, height: 1600 },
  { src: '/assets/gallery-new/new_06.jpg', alt: 'Jen Walcott Archuleta in a black coat', width: 1065, height: 1600 },
  { src: '/assets/gallery-new/new_07.jpg', alt: 'Jen Walcott Archuleta in a black and white portrait', width: 1266, height: 1600 },
  { src: '/assets/gallery-new/new_08.jpg', alt: 'Jen Walcott Archuleta holding her book at a signing', width: 869, height: 1232 },
  { src: '/assets/gallery-new/new_09.jpg', alt: 'Jen Walcott Archuleta with her husband', width: 1320, height: 837 },
  { src: '/assets/gallery-new/new_13.jpg', alt: 'Jen Walcott Archuleta in a black dress', width: 845, height: 1600 },
  { src: '/assets/gallery-new/new_14.jpg', alt: 'Jen Walcott Archuleta in a car', width: 1097, height: 1600 },
  { src: '/assets/gallery-new/new_16.jpg', alt: 'Jen Walcott Archuleta laughing outdoors', width: 1168, height: 1460 },
  { src: '/assets/gallery-new/new_18.jpg', alt: 'Jen Walcott Archuleta in a black blazer', width: 827, height: 1002 },
  { src: '/assets/gallery-new/new_19.jpg', alt: 'Jen Walcott Archuleta on a red carpet', width: 1200, height: 1600 },
  { src: '/assets/gallery-new/new_22.jpg', alt: 'Jen Walcott Archuleta signing a copy of her book', width: 1224, height: 917 },
  { src: '/assets/gallery-new/new_23.jpg', alt: 'Jen Walcott Archuleta at an outdoor book signing', width: 828, height: 934 },
  { src: '/assets/gallery-new/new_24.jpg', alt: 'Jen Walcott Archuleta with her book', width: 828, height: 831 },
  { src: '/assets/gallery-new/new_25.jpg', alt: 'Jen Walcott Archuleta on a red carpet in a white dress', width: 1600, height: 1200 },
  { src: '/assets/gallery-new/new_28.jpg', alt: 'Jen Walcott Archuleta in a black dress', width: 829, height: 1600 },
  { src: '/assets/gallery-new/new_34.jpg', alt: 'Jen Walcott Archuleta with her husband', width: 1179, height: 1100 },
  { src: '/assets/gallery-new/new_35.jpg', alt: 'Jen Walcott Archuleta in a white dress', width: 1320, height: 1296 },
  { src: '/assets/gallery-new/new_36.jpg', alt: 'Jen Walcott Archuleta with her husband', width: 1320, height: 1607 },
  { src: '/assets/gallery-new/new_37.jpg', alt: 'Jen Walcott Archuleta on a red carpet', width: 790, height: 2000 },
  { src: '/assets/gallery-new/new_38.jpg', alt: 'Jen Walcott Archuleta in a black dress', width: 1500, height: 2000 },
];

const SLIDES = [...HOLLYWOOD, ...PORTRAITS, ...FAMILY, ...GALLERY_NEW];

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
            <p className="gallery-count" aria-hidden="true">{index + 1} / {count}</p>
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
