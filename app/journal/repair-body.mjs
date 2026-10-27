// Render-time journal fixes. Sanity has no write token, so posts stay as
// published and these repairs run when a post is drawn.

const FOREVER_ANGELS = 'https://theforeverangels.com/';
const WESTON_FORMULA = 'https://www.westonaprice.org/health-topics/formula-homemade-baby-formula/';
const FLORA_TODDLER_PROBIOTIC = 'https://www.florahealth.com/products/toddlers-probiotic';

const RETIRED_URLS = [
  'http://www.phpure.com/nutrition_products/pdfs/Nutritional_Flakes.pdf',
  'https://www.phpure.com/nutrition_products/pdfs/Nutritional_Flakes.pdf',
  'http://www.udoerasmus.com/products/pdf_files/Probiotics.pdf',
  'https://www.udoerasmus.com/products/pdf_files/Probiotics.pdf',
  'http://www.cocoonnutrition.org/catalog/pdf_docs/Nutritional_Flakes.pdf',
  'https://www.cocoonnutrition.org/catalog/pdf_docs/Nutritional_Flakes.pdf',
  'http://www.tdi-dog.org/HowToJoin.aspx?Page=New+TDI+Test',
  'https://www.tdi-dog.org/HowToJoin.aspx?Page=New+TDI+Test',
];

const RETIRED_SET = new Set(RETIRED_URLS);

export function isRetiredHref(href) {
  const value = href || '';
  if (RETIRED_SET.has(value)) return true;
  // FilmFreeway profiles publish birth date, height, and school. Do not link them.
  if (/filmfreeway\.com/i.test(value)) return true;
  if (/tdi-dog\.org/i.test(value)) return true;
  return false;
}

const BARE_URL = /https?:\/\/[A-Za-z0-9\-._~:/?#[\]@!$&'*+,;=%]+/g;
const FOREVER_ANGELS_URL = /(?:https?:\/\/)?(?:www\.)?theforeverangels\.com(?:\/[A-Za-z0-9\-._~:/?#[\]@!$&'*+,;=%]*)?/gi;
const BARE_PODCAST = /(?<![\w@/])((?:www\.)?(?:unfilteredwithjenarchuleta\.buzzsprout\.com|buzzsprout\.com|youtube\.com|youtu\.be|podcasts\.apple\.com)(?:\/[A-Za-z0-9\-._~:/?#[\]@!$&'*+,;=%]*)?)/gi;

const YT = (id) => `https://www.youtube.com/watch?v=${id}`;
const APPLE = (id) => `https://podcasts.apple.com/us/podcast/unfiltered-with-jen-archuleta/id1806868424?i=${id}`;
const BUZZ = (slug) => `https://www.buzzsprout.com/2467154/episodes/${slug}`;

const SHOW = {
  youtube: 'https://www.youtube.com/playlist?list=PLQqx8LCwrxbY',
  buzz: 'https://www.buzzsprout.com/2467154',
  apple: 'https://podcasts.apple.com/us/podcast/unfiltered-with-jen-archuleta/id1806868424',
};

// Full-episode watch URLs are the ones on the channel playlist
// "Unfiltered with Jen Archuleta | Full Episodes".
const EPISODES = {
  1: {
    youtube: YT('V4m6pmYYX64'),
    buzz: BUZZ('16926602-ep-1-adam-archuleta-former-nfl-safety-and-cbs-sports-analyst-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000702405073'),
  },
  2: {
    youtube: YT('uufR5HaGOy4'),
    buzz: BUZZ('17244807-ep-2-anne-fundner-mother-and-fentanyl-awareness-advocate-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000710372242'),
  },
  3: {
    youtube: YT('duVA5Ft39Mg'),
    buzz: BUZZ('17373784-ep-3-sean-patrick-flanery-and-lauren-flanery-on-faith-and-family-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000713973661'),
  },
  4: {
    youtube: YT('pMZKglehV0o'),
    buzz: BUZZ('17491948-ep-4-brande-roderick-actress-and-former-baywatch-star-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000716889738'),
  },
  5: {
    youtube: YT('xpVgDQpPUjU'),
    buzz: BUZZ('17731108-ep-5-amy-palmiero-winters-amputee-endurance-athlete-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000723483061'),
  },
  6: {
    youtube: YT('HeATChefF4k'),
    buzz: BUZZ('17849563-ep-6-spencer-coursen-founder-of-coursen-security-group-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000726972071'),
  },
  7: {
    youtube: YT('Xqkv2TU4qAE'),
    buzz: BUZZ('18045199-ep-7-father-tim-catholic-priest-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000732713228'),
  },
  8: {
    youtube: YT('4ops3RINs9Y'),
    buzz: BUZZ('18288950-ep-8-chris-dorris-mental-toughness-coach-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000739391759'),
  },
  9: {
    youtube: YT('1abB8_pzqwE'),
    buzz: BUZZ('18435236-ep-9-dr-eloise-nelson-holistic-health-and-nutrition-expert-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000743288240'),
  },
  10: {
    youtube: YT('ZgfIKWnmnhA'),
    buzz: BUZZ('18692660-ep-10-nick-lowery-chiefs-all-time-leading-scorer-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000749983828'),
  },
  11: {
    youtube: YT('xmYOq9wEPzY'),
    buzz: BUZZ('18785141-ep-11-jessica-jordaan-mrs-usa-2022-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000752950365'),
  },
  12: {
    youtube: YT('DZ7tquu4lDQ'),
    buzz: BUZZ('18983736-ep-12-brett-tippie-mountain-bike-pioneer-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000760302646'),
  },
  13: {
    youtube: YT('YAcjg-4y3nM'),
    buzz: BUZZ('19243689-ep-13-jen-walcott-archuleta-season-1-finale-unfiltered-with-jen-archuleta'),
    apple: APPLE('1000769706062'),
  },
};

const EPISODE_BY_SLUG = {
  'first-podcast-outtakes-perfection-chaos-one-very-bold-fly': 1,
  'football-was-his-whole-identity-until-washington-forced-him-to-face-the-man-in-the-mirror': 1,
  'my-first-podcast-episode-drops-monday-unfiltered-with-jen-archuleta-real-stories-no-filters': 1,
  'my-podcast-is-live': 1,
  'youtube-shorts': 1,
  unfiltered: 1,
  'they-say-the-bumblebee-s-not-built-to-fly': 1,
  'they-all-grieve-differently': 2,
  'next-podcast': 3,
  'now-streaming': 3,
  'lauren-flanery': 3,
  'oklahoma-fires': 3,
  'brande-roderick': 4,
  'coming-soon-4': 4,
  'coming-this-july-on-the-podcast': 4,
  filters: 4,
  'live-3': 4,
  'live-2': 6,
  'coming-soon-2': 7,
  'furever-home': 7,
  'dr-eloise-nelson': 9,
  'jessica-jordaan': 11,
  'brett-tippie-2': 12,
  'pup-of-the-podcast-3': 13,
};

// These posts name a platform and then stop, but they are not a podcast episode.
const REMOVE_ONLY = new Set([
  'turn-your-pain-into-purpose',
  'jennifer-walcott-archuleta-mr-sports-show',
]);

const SHOW_SLUGS = new Set([
  'all-right-it-s-that-time-again',
  'please-review',
  'they-didn-t-know-our-story-until-they-listened',
  'what-did-they-say',
]);

function linksFor(slug) {
  if (REMOVE_ONLY.has(slug)) return null;
  if (SHOW_SLUGS.has(slug)) return SHOW;
  const episode = EPISODE_BY_SLUG[slug];
  if (episode) return EPISODES[episode];
  return SHOW;
}

function cleanUrl(raw) {
  let url = raw.replace(/[.,;:!?'*\]]+$/, '');
  url = url.replace(/^(https?:\/\/[^/?#]*\.[a-z]{2,})[A-Z][A-Za-z]*$/, '$1');
  url = url.replace(/^(https?:\/\/youtu\.be\/[A-Za-z0-9_-]{11})[A-Z][A-Za-z]+$/, '$1');
  url = url.replace(/(=\d+)[A-Z][A-Za-z]+$/, '$1');
  return url;
}

function rewriteText(text) {
  if (typeof text !== 'string' || !text) return text;
  let next = text;
  next = next.replace(/(?:--\s*|\*+)(?=https?:\/\/(?:www\.)?(?:phpure|udoerasmus|cocoonnutrition)\.)/gi, '');
  for (const url of RETIRED_URLS) next = next.split(url).join('');
  next = next.replace(FOREVER_ANGELS_URL, FOREVER_ANGELS);
  next = next.replace(/http:\/\//gi, 'https://');
  next = next.replace(BARE_PODCAST, (full, host, offset, str) => {
    const before = str.slice(0, offset);
    if (/https?:\/\/(?:www\.)?$/i.test(before) || /[\w.]$/.test(before)) return full;
    return `https://${host}`;
  });
  next = next.replace(/\bFelling the Love\b/g, 'Feeling the Love');
  next = next.replace(/\bShawn Patrick Flanery\b/g, 'Sean Patrick Flanery');
  next = next.replace(/\s*View Jennifer[’']s press coverage, media appearances and screenplay recognition on FilmFreeway\.?\s*/gi, ' ');
  return next;
}

function rewriteBlocks(blocks) {
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = (block.markDefs || []).map((def) => {
      if (!def || def._type !== 'link') return def;
      if (isRetiredHref(def.href)) return { ...def, href: '' };
      if (/^(?:https?:\/\/)?(?:www\.)?theforeverangels\.com(?:\/|$)/i.test(def.href || '')) {
        return { ...def, href: FOREVER_ANGELS };
      }
      if (/^http:\/\//i.test(def.href || '')) {
        return { ...def, href: def.href.replace(/^http:\/\//i, 'https://') };
      }
      return def;
    });
    const children = block.children.map((span) => (
      span && typeof span.text === 'string' ? { ...span, text: rewriteText(span.text) } : span
    ));
    return { ...block, markDefs, children };
  });
}

function linkifyBody(blocks) {
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
    const linkKeys = new Set(markDefs.filter((d) => d && d._type === 'link' && d.href).map((d) => d._key));
    let changed = false;
    const children = [];
    block.children.forEach((span, si) => {
      const marks = Array.isArray(span?.marks) ? span.marks : [];
      if (!span || span._type !== 'span' || typeof span.text !== 'string' || marks.some((m) => linkKeys.has(m))) {
        children.push(span);
        return;
      }
      const text = span.text;
      const base = span._key || `s${si}`;
      let last = 0;
      let n = 0;
      for (const match of text.matchAll(BARE_URL)) {
        const url = cleanUrl(match[0]);
        if (!/^https?:\/\/[^/?#]+\.[^/?#]+/.test(url)) continue;
        const start = match.index;
        if (start > last) children.push({ ...span, _key: `${base}-t${n}`, text: text.slice(last, start) });
        if (!isRetiredHref(url)) {
          const key = `autolink-${si}-${n}`;
          markDefs.push({ _type: 'link', _key: key, href: url });
          children.push({ ...span, _key: `${base}-u${n}`, text: url, marks: [...marks, key] });
        }
        last = start + url.length;
        n += 1;
      }
      if (n === 0) {
        children.push(span);
        return;
      }
      if (last < text.length) children.push({ ...span, _key: `${base}-t${n}`, text: text.slice(last) });
      changed = true;
    });
    return changed ? { ...block, markDefs, children } : block;
  });
}

function linkPhrase(blocks, phrase, href) {
  return blocks.map((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return block;
    const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
    const linkKeys = new Set(markDefs.filter((d) => d && d._type === 'link').map((d) => d._key));
    let changed = false;
    const children = [];
    block.children.forEach((span, si) => {
      const marks = Array.isArray(span?.marks) ? span.marks : [];
      if (!span || span._type !== 'span' || typeof span.text !== 'string' || !span.text.includes(phrase) || marks.some((m) => linkKeys.has(m))) {
        children.push(span);
        return;
      }
      const parts = span.text.split(phrase);
      parts.forEach((part, pi) => {
        const base = span._key || `s${si}`;
        if (part) children.push({ ...span, _key: `${base}-a${pi}`, text: part, marks });
        if (pi < parts.length - 1) {
          const key = `phrase-${si}-${pi}`;
          markDefs.push({ _type: 'link', _key: key, href });
          linkKeys.add(key);
          children.push({ ...span, _key: `${base}-b${pi}`, text: phrase, marks: [...marks, key] });
        }
      });
      changed = true;
    });
    return changed ? { ...block, markDefs, children } : block;
  });
}

function blockText(block) {
  if (!block || block._type !== 'block' || !Array.isArray(block.children)) return '';
  return block.children.map((child) => child?.text || '').join('');
}

function splitLines(blocks) {
  const out = [];
  blocks.forEach((block) => {
    const text = blockText(block);
    const linked = (block.markDefs || []).some((def) => def && def._type === 'link' && def.href);
    if (!text.includes('\n') || linked || (block.children || []).length !== 1) {
      out.push(block);
      return;
    }
    text.split('\n').forEach((line, i) => {
      if (!line.trim()) return;
      const span = block.children[0];
      out.push({
        ...block,
        _key: `${block._key || 'b'}-ln${i}`,
        markDefs: [],
        children: [{ ...span, _key: `${span._key || 's'}-ln${i}`, text: line, marks: [] }],
      });
    });
  });
  return out;
}

function isDanglingLabel(text) {
  const line = text.replace(/\s+/g, ' ').trim();
  if (!line || line.length > 220 || /https?:\/\//i.test(line)) return false;
  if (/listen more|watch you bleed|won.?t listen|nobody is watching|little orphan|watching my kids/i.test(line)) return false;
  const words = line.split(/\s+/).length;
  const ctaStart = /^(?:[\p{Extended_Pictographic}\uFE0F\u200D\s▶🎧]*)?(watch\b|listen\b|subscribe\b|more information\b|see more on my youtube|follow on instagram\b|youtube\b|buzzsprout\b|apple podcasts\b|also available on buzzsprout|please subscribe\b|episode out now\b|full episode streaming soon)/iu
  if (!ctaStart.test(line)) return false;
  if (words > 18 && !/:\s*$/.test(line) && !/^watch the full episode/i.test(line) && !/listen (&|and) subscribe/i.test(line)) return false;
  return true;
}

function urlsForLabel(text, links) {
  if (/interview here/i.test(text) || /youtube shorts/i.test(text) || /^follow on instagram\b/i.test(text.trim())) return [];
  if (/more information/i.test(text)) return links?.more ? [links.more] : [];
  if (!links) return [];
  const urls = [];
  const watch = /\bwatch\b|youtube/i.test(text);
  const buzz = /buzzsprout/i.test(text);
  const apple = /\bapple\b/i.test(text);
  const listen = (/\blisten\b|subscribe|streaming soon/i.test(text))
    || (/full episode/i.test(text) && !watch);
  if (watch && links.youtube) urls.push(links.youtube);
  if (buzz && links.buzz) urls.push(links.buzz);
  if (apple && links.apple) urls.push(links.apple);
  if (watch && listen && links.buzz && !buzz) urls.push(links.buzz);
  if (!urls.length && listen && links.buzz) urls.push(links.buzz);
  return urls;
}

function hasLinkSoon(blocks, index) {
  for (let j = index + 1; j < blocks.length; j += 1) {
    const text = blockText(blocks[j]).trim();
    if (!text) continue;
    return /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|buzzsprout\.com|podcasts\.apple\.com|unfilteredwithjenarchuleta\.buzzsprout\.com)/i.test(text);
  }
  return false;
}

function appendUrls(block, urls) {
  const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
  const children = [...block.children];
  urls.forEach((url, n) => {
    const key = `listenfix-${n}`;
    markDefs.push({ _type: 'link', _key: key, href: url });
    children.push({
      _type: 'span',
      _key: `listenfix-s${n}`,
      text: ` ${url}`,
      marks: [key],
    });
  });
  return { ...block, markDefs, children };
}

function repairLabels(blocks, slug) {
  const links = linksFor(slug);
  const flat = splitLines(blocks);
  return flat.flatMap((block, index) => {
    const text = blockText(block);
    if (!isDanglingLabel(text) || hasLinkSoon(flat, index)) return [block];
    const urls = urlsForLabel(text, links);
    if (!urls.length) return [];
    return [appendUrls(block, urls)];
  });
}

function dropPrivatePitches(blocks) {
  return blocks.filter((block) => {
    const text = blockText(block);
    if (/press coverage, media appearances and screenplay recognition on FilmFreeway/i.test(text)) return false;
    return true;
  });
}

export function prepareJournalBody(blocks, slug) {
  if (!Array.isArray(blocks)) return blocks;
  let next = linkifyBody(rewriteBlocks(dropPrivatePitches(blocks)));
  if (slug === 'homemade-formula') {
    next = linkPhrase(next, 'THE HOMEMADE FORMULA RECIPES', WESTON_FORMULA);
    next = linkPhrase(next, 'Weston A. Price Foundation', WESTON_FORMULA);
    next = linkPhrase(next, 'Udos Choice infant probiotic', FLORA_TODDLER_PROBIOTIC);
  }
  if (slug === 'baby-formula-shortage') {
    next = linkPhrase(next, 'formula homemade', WESTON_FORMULA);
  }
  return repairLabels(next, slug);
}
