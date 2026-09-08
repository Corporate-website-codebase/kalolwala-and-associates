const WORDPRESS_API_URL =
  "https://public-api.wordpress.com/wp/v2/sites/blogcms.kalolwala.com";

export async function getPosts() {
  const response = await fetch(
    `${WORDPRESS_API_URL}/posts?per_page=100&_embed`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress posts");
  }

  return response.json();
}