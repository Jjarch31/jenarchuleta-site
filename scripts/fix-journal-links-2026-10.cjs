/*
 * One-off (2026-10-24): fixes the Journal links Jen flagged, plus two old podcast
 * posts where the Squarespace migration glued links onto the next word.
 *
 *   1. "Now Available at Barnes & Noble" — link went to the B&N homepage → the book's B&N page
 *   2. "The Vindicator" — unclickable Google share link → the actual Vindicator article
 *   3. "From Chapter 2: Hard Work, Heavy Bags, and Open Doors" — store names had no links
 *   4. "Live!" (Weston's Story) — URLs glued to the next word ("...comFollow") → line breaks
 *   5. "Pup of the Podcast: Meet Freddie" — truncated YouTube link → full link
 *
 * Safe to re-run: every change checks the current text first and skips if it's
 * already fixed or if Jen has edited that spot since. Drafts get the same fix.
 *
 * Run from the repo root (needs the Sanity CLI logged in):
 *   npx sanity exec scripts/fix-journal-links-2026-10.cjs --with-user-token
 */
const { getCliClient } = require('sanity/cli');
const client = getCliClient({ apiVersion: '2024-01-01' });

const BN = 'https://www.barnesandnoble.com/w/beyond-the-velvet-ropes-jennifer-walcott-archuleta/1150495088?ean=9798182506885';
const VINDY = 'https://www.vindy.com/life/ticket/2026/08/area-native-offers-peak-behind-the-velvet-rope/';
const BOOK = 'https://jenarchuleta.com/book';
const PAPERBACK = 'https://books.by/beyond-the-velvet-ropes';
const KINDLE = 'https://www.amazon.com/dp/B0H6YK1KTL';
const SPOTIFY_AUDIO = 'https://open.spotify.com/show/153EBrZVIkJY1xaY703km4';
const APPLE_AUDIO = 'https://books.apple.com/us/audiobook/beyond-the-velvet-ropes-my-story-of-perseverance/id6789345549?uo=4';

const span = (_key, text, marks = []) => ({ _type: 'span', _key, text, marks });
const link = (_key, href) => ({ _type: 'link', _key, href });

// Each fix: doc id, block key, a check on the block, and the new block contents.
const FIXES = [
  {
    label: 'Barnes & Noble post',
    id: '3c3f9131-f5ca-4294-aa0f-13dd896beb11',
    block: '3af9afd78856',
    applies: (b) => (b.markDefs || []).some((d) => d._key === '9424e0083dab' && d.href === 'https://www.barnesandnoble.com/'),
    // Only touch the link itself and its label; the rest of the line stays exactly as Jen wrote it.
    set: {
      'markDefs[_key=="9424e0083dab"].href': BN,
      'children[_key=="680a411d3a49"].text': 'Beyond the Velvet Ropes at Barnes & Noble',
    },
  },
  {
    label: 'The Vindicator post',
    id: 'b238ede2-fd8d-48fe-b5fd-37114be8356d',
    block: 'df77aa5df284',
    applies: (b) => (b.children || []).some((c) => (c.text || '').includes('share.google/lPVVgiSmHGN267wb2')),
    children: [
      span('7d0f8b5e71dc', 'Read the full article in The Vindicator: '),
      span('vindyheadline', 'Area Native Offers Peek Behind the ‘Velvet Rope’', ['vindylink']),
    ],
    markDefs: [link('vindylink', VINDY)],
  },
  {
    label: 'Chapter 2 post',
    id: '2d0cb60f-6b1f-4a95-ba37-4c0d223662fe',
    block: '9abab694246a',
    applies: (b) => (b.markDefs || []).length === 0 && (b.children || []).some((c) => (c.text || '').startsWith('Beyond the Velvet Ropes\nAvailable now in paperback, Kindle')),
    children: [
      span('ch2title', 'Beyond the Velvet Ropes', ['ch2book']),
      span('ch2t1', '\nAvailable now in '),
      span('ch2pb', 'paperback', ['ch2paper']),
      span('ch2t2', ', '),
      span('ch2kd', 'Kindle', ['ch2kindle']),
      span('ch2t3', ', '),
      span('ch2sp', 'Spotify', ['ch2spotify']),
      span('ch2t4', ', '),
      span('ch2ap', 'Apple Books', ['ch2apple']),
      span('ch2t5', ', Google Play, Kobo, and audiobook platforms.'),
    ],
    markDefs: [
      link('ch2book', BOOK), link('ch2paper', PAPERBACK), link('ch2kindle', KINDLE),
      link('ch2spotify', SPOTIFY_AUDIO), link('ch2apple', APPLE_AUDIO),
    ],
  },
];

// Text-only fixes (line breaks where the migration glued a link to the next word).
const TEXT_FIXES = [
  {
    label: "Live! (Weston's Story)",
    id: 'post-live',
    block: 'b0',
    span: 'b0s',
    replace: [
      ['WATCH on YouTube:https://youtu.be/uufR5HaGOy4LISTEN on Apple:', '\n\nWATCH on YouTube: https://youtu.be/uufR5HaGOy4\nLISTEN on Apple: '],
      ['?i=1000702405073LISTEN on Buzzsprout:', '?i=1000702405073\nLISTEN on Buzzsprout: '],
      ['buzzsprout.comFollow on Instagram:', 'buzzsprout.com\nFollow on Instagram: '],
      ['@unfilteredpod100Follow Anne Fundner:', '@unfilteredpod100\nFollow Anne Fundner: '],
      ['@anneelizabethusAnne ElizabethLearn More or Support:', '@anneelizabethus\nAnne Elizabeth\nLearn More or Support: '],
      ['https://lvof.org\u{1F43E} Pup of the Podcast: Meet TippySweet,', 'https://lvof.org\n\n\u{1F43E} Pup of the Podcast: Meet Tippy\nSweet,'],
      ['great with kids.To adopt:', 'great with kids.\nTo adopt:'],
      ['Mikeaharrison22@gmail.comMore info:', 'Mikeaharrison22@gmail.com\nMore info:'],
      ['https://humanerescuealliance.orgAdopt Tippy', 'https://humanerescuealliance.org\nAdopt Tippy'],
    ],
  },
  {
    label: 'Pup of the Podcast: Meet Freddie',
    id: 'post-pup-of-the-podcast-2',
    block: 'b9',
    span: 'b9s',
    replace: [['http://youtu.be/xpVgDQpPU-', 'https://youtu.be/xpVgDQpPUjU']],
  },
];

async function patchDoc(docId, fn) {
  const doc = await client.getDocument(docId);
  if (!doc) return 'not found';
  const result = fn(doc);
  if (!result) return 'already fixed / changed since — skipped';
  await client.patch(docId).ifRevisionId(doc._rev).set(result).commit();
  return 'fixed';
}

(async () => {
  for (const f of FIXES) {
    for (const id of [f.id, `drafts.${f.id}`]) {
      const status = await patchDoc(id, (doc) => {
        const b = (doc.body || []).find((x) => x._key === f.block);
        if (!b || !f.applies(b)) return null;
        const prefix = `body[_key=="${f.block}"].`;
        if (f.set) return Object.fromEntries(Object.entries(f.set).map(([k, v]) => [prefix + k, v]));
        return { [`${prefix}children`]: f.children, [`${prefix}markDefs`]: f.markDefs };
      });
      if (!(id.startsWith('drafts.') && status === 'not found')) console.log(`${f.label} (${id}): ${status}`);
    }
  }
  for (const f of TEXT_FIXES) {
    for (const id of [f.id, `drafts.${f.id}`]) {
      const status = await patchDoc(id, (doc) => {
        const b = (doc.body || []).find((x) => x._key === f.block);
        const s = b && (b.children || []).find((c) => c._key === f.span);
        if (!s) return null;
        let text = s.text;
        for (const [from, to] of f.replace) if (text.includes(from)) text = text.split(from).join(to);
        if (text === s.text) return null;
        return { [`body[_key=="${f.block}"].children[_key=="${f.span}"].text`]: text };
      });
      if (!(id.startsWith('drafts.') && status === 'not found')) console.log(`${f.label} (${id}): ${status}`);
    }
  }
  console.log('done — changes show on the site within ~60 seconds');
})().catch((e) => {
  console.error('FAILED:', e.message || e);
  process.exit(1);
});
