const WORDPRESS_API_URL =
  "https://public-api.wordpress.com/wp/v2/sites/blogcms.kalolwala.com";

// Server-side in-memory cache for ultra-fast page transitions (0ms)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPosts: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache
let isFetching = false;

export async function getPosts() {
  const now = Date.now();

  // If memory cache exists and is fresh, return immediately in 0ms
  if (cachedPosts && now - lastFetchTime < CACHE_TTL) {
    return cachedPosts;
  }

  // If memory cache exists but is stale, trigger background update without blocking the user
  if (cachedPosts && !isFetching) {
    isFetching = true;
    fetch(`${WORDPRESS_API_URL}/posts?per_page=100&_embed`, {
      next: { revalidate: 300 },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          cachedPosts = data;
          lastFetchTime = Date.now();
        }
      })
      .catch((err) => console.error("Background WP fetch error:", err))
      .finally(() => {
        isFetching = false;
      });

    return cachedPosts;
  }

  // Initial fetch (only blocks on first server boot)
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=100&_embed`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        cachedPosts = data;
        lastFetchTime = Date.now();
        return cachedPosts;
      }
    }
  } catch (err) {
    console.error("Failed to fetch WordPress posts:", err);
  }

  return cachedPosts || [];
}