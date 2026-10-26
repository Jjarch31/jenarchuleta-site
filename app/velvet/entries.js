import { getVelvetLetters } from '../sanity/queries';

function blockText(body) {
  if (!Array.isArray(body)) return '';
  const lines = [];
  body.forEach((block) => {
    if (!block || block._type !== 'block' || !Array.isArray(block.children)) return;
    const line = block.children.map((child) => child?.text || '').join('').trim();
    if (line) lines.push(line);
  });
  return lines.join(' ');
}

// First line or two, never the rest of the entry.
function previewOf(body) {
  const text = blockText(body).replace(/\s+/g, ' ').trim();
  if (text.length <= 140) return text;
  const cut = text.slice(0, 140);
  const trimmed = cut.replace(/\s+\S*$/, '');
  return trimmed || cut;
}

function soften(text) {
  if (typeof text !== 'string' || !text.includes('—')) return text || '';
  return text.replace(/\s*—\s*/g, ', ');
}

const STANDING = [
  { id: 'photos', title: 'The photos, up close' },
  { id: 'reading', title: 'Me, reading to you' },
  { id: 'cut', title: 'What didn’t make the book' },
  { id: 'film', title: 'The film, first look' },
];

export async function getLockedEntries() {
  const letters = await getVelvetLetters().catch(() => []);
  const cards = (letters || []).map((letter) => ({
    id: letter._id,
    title: soften(letter.title),
    date: letter.publishedAt || '',
    preview: soften(previewOf(letter.body)),
  }));
  return [...cards, ...STANDING];
}
