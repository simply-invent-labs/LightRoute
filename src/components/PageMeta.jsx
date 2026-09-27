import { useEffect } from 'react';

const origin = 'https://reference.lightroute.dev';

export default function PageMeta({ title, description, path, language = 'en' }) {
  useEffect(() => {
    document.title = `${title} | LightRoute`;
    document.documentElement.lang = language;
    const setMeta = (selector, key, value) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement(key === 'rel' ? 'link' : 'meta');
        document.head.appendChild(element);
      }
      element.setAttribute(key, key === 'rel' ? 'canonical' : 'description');
      element.setAttribute(key === 'rel' ? 'href' : 'content', value);
    };
    setMeta('meta[name="description"]', 'name', description);
    setMeta('link[rel="canonical"]', 'rel', `${origin}${path}`);
  }, [title, description, path, language]);
  return null;
}
