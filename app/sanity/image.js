import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from './env';

const builder = imageUrlBuilder({ projectId, dataset });

// With a server read token, browsers must not be given cdn.sanity.io URLs.
// A private dataset refuses those. /asset fetches the file with the token
// and returns the bytes. The token never appears in HTML.
// width() and the other options return a new builder, so each one is wrapped.
function hideToken(image) {
  if (!(process.env.SANITY_API_READ_TOKEN || '').trim()) return image;
  return new Proxy(image, {
    get(target, prop) {
      if (prop === 'url' || prop === 'toString') {
        return () => {
          const cdn = target.url();
          if (!cdn) return cdn;
          return `/asset?src=${encodeURIComponent(cdn)}`;
        };
      }
      const value = target[prop];
      if (typeof value !== 'function') return value;
      return (...args) => {
        const result = value.apply(target, args);
        if (result && result.constructor === target.constructor) return hideToken(result);
        return result;
      };
    },
  });
}

// urlFor(post.heroImage).width(1200).url()
export function urlFor(source) {
  return hideToken(builder.image(source));
}
