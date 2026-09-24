import { unstable_cache } from 'next/cache';

const WORDPRESS_API_URL =
  "https://public-api.wordpress.com/wp/v2/sites/blogcms.kalolwala.com";

// Server-side in-memory cache for ultra-fast page transitions (0ms)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPosts: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

async function fetchFromWordPress() {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=100&_embed`,
      {
        next: {
          revalidate: 600,
          tags: ['wordpress-posts'],
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch WordPress posts:", err);
  }
  return [];
}

const getCachedWordPressPosts = unstable_cache(
  async () => fetchFromWordPress(),
  ['wordpress-posts-cache-v1'],
  {
    revalidate: 600,
    tags: ['wordpress-posts'],
  }
);

export async function getPosts() {
  const now = Date.now();

  // 1. Process-level memory cache (0ms in persistent Node process)
  if (cachedPosts && now - lastFetchTime < CACHE_TTL) {
    return cachedPosts;
  }

  // 2. Next.js Data Cache (persisted across serverless cold starts in production/deployed)
  try {
    const posts = await getCachedWordPressPosts();
    if (Array.isArray(posts) && posts.length > 0) {
      cachedPosts = posts;
      lastFetchTime = now;
      return cachedPosts;
    }
  } catch (err) {
    console.error("Error retrieving cached WordPress posts:", err);
  }

  // 3. Fallback direct fetch
  const direct = await fetchFromWordPress();
  if (Array.isArray(direct) && direct.length > 0) {
    cachedPosts = direct;
    lastFetchTime = now;
  }

  return cachedPosts || [];
}