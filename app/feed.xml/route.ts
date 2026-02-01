import { allPosts } from "contentlayer/generated";
import RSS from "rss";

import siteMetadata, { BASE_URL, defaultAuthor } from "@/lib/metadata";

export async function GET(request: Request) {
  const publishedPosts = allPosts.filter((post) => post.status === "published");
  const lastPostDate = publishedPosts.reduce((latest, post) => {
    const postDate = post.lastUpdatedDate || post.publishedDate;
    return postDate && new Date(postDate) > new Date(latest) ? new Date(postDate) : latest;
  }, new Date(0));
  const feed = new RSS({
    title: siteMetadata.title.default,
    description: siteMetadata.description,
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.xml`,
    copyright: `© 2026 ${defaultAuthor.name}`,
    language: "en-US",
    pubDate: lastPostDate,
  });

  publishedPosts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${BASE_URL}/posts/${post.slug}`,
      url: `${BASE_URL}/posts/${post.slug}`,
      date: post.lastUpdatedDate as string,
      description: post.description || "",
      author: defaultAuthor.name,
      categories: post?.tags?.map((tag) => tag) || [],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
