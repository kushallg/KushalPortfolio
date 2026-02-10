import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Polyfill Buffer for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

let allPosts = [];

try {
  // Load all markdown files eagerly (synchronously at build time)
  const postFiles = import.meta.glob('/src/content/posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  });

  // Parse all posts immediately
  allPosts = Object.entries(postFiles)
    .filter(([path]) => !path.includes('README.md')) // Skip README
    .map(([path, content]) => {
      try {
        const { data, content: markdown } = matter(content);
        const year = new Date(data.date).getFullYear();

        return {
          slug: data.slug,
          title: data.title,
          date: data.date,
          year: year,
          content: markdown,
          frontmatter: data
        };
      } catch (err) {
        console.error('Error parsing post:', path, err);
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

} catch (err) {
  console.error('Error loading posts:', err);
  allPosts = [];
}

// Get all posts (no async needed!)
export function getAllPosts() {
  return allPosts;
}

// Get a single post by slug
export function getPostBySlug(slug) {
  return allPosts.find(post => post.slug === slug);
}
