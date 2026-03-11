import matter from 'gray-matter';
// Buffer is now handled in src/main.jsx

/**
 * Loads content from markdown files using Vite's glob import.
 * Fallback logic: Always load zh_tw version first, 
 * then merge with translations from the current language if available.
 * 
 * @param {string} section - 'references' or 'portfolio'
 * @param {string} lang - current language code ('en' or 'zh')
 * @returns {Array} - Array of content items with metadata and body
 */
export const loadMarkdownContent = async (section, lang) => {
  // Vite's import.meta.glob requires string literals, so we must be explicit
  let zhModules, enModules;

  if (section === 'references') {
    zhModules = import.meta.glob('../content/references/zh_tw/*.md', { query: '?raw', import: 'default', eager: true });
    enModules = import.meta.glob('../content/references/en/*.md', { query: '?raw', import: 'default', eager: true });
  } else if (section === 'portfolio') {
    zhModules = import.meta.glob('../content/portfolio/zh_tw/*.md', { query: '?raw', import: 'default', eager: true });
    enModules = import.meta.glob('../content/portfolio/en/*.md', { query: '?raw', import: 'default', eager: true });
  }

  const items = [];
  
  for (const path in zhModules) {
    try {
      const filename = path.split('/').pop();
      const zhContent = zhModules[path];
      const { data: zhData, content: zhBody } = matter(zhContent);

      let finalData = { ...zhData };
      let finalContent = zhBody;

      // 2. If current language is 'en', check if a translated version exists
      if (lang === 'en') {
        const enPath = path.replace('/zh_tw/', '/en/');
        if (enModules[enPath]) {
          try {
            const enContent = enModules[enPath];
            const { data: enData, content: enBody } = matter(enContent);
            finalData = { ...finalData, ...enData };
            finalContent = enBody;
          } catch (e) {
            console.error(`Error loading English translation for ${path}:`, e.name, e.message);
          }
        }
      }

      const normalizedImages = Array.isArray(finalData.images) ? finalData.images.map(img => {
        if (typeof img === 'string') {
          return { image_url: img, image_title: '', origin_url: '' };
        }
        return {
          image_url: img.image_url || '',
          image_title: img.image_title || '',
          origin_url: img.origin_url || ''
        };
      }) : [];

      const item = {
        id: finalData.id || filename.replace('.md', ''),
        type: finalData.type || (section === 'references' ? 'image' : 'project'),
        title: finalData.title || 'Untitled',
        tags: Array.isArray(finalData.tags) ? finalData.tags : [],
        ...finalData,
        images: normalizedImages,
        content: finalContent,
        filename: filename.replace('.md', '')
      };
      
      items.push(item);
    } catch (e) {
      console.error(`CRITICAL: Error loading ${section} at ${path}:`, e.name, e.message);
    }
  }

  return items.sort((a, b) => (a.id || 0) - (b.id || 0));
};
