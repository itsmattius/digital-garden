import { MetadataRoute } from "next";
import { allPages, allPosts } from "contentlayer/generated";

import { BASE_URL } from "@/lib/metadata";
import { projects } from "@/lib/projects-data";

function getLastModifiedDate(Posts: typeof allPosts) {
  return Posts.reduce((latest, post) => {
    const postDate = post.lastUpdatedDate || post.publishedDate;
    return postDate && new Date(postDate) > new Date(latest) ? new Date(postDate) : latest;
  }, new Date(0));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const loadedPosts = allPosts.filter((post) => post.status === "published");
  const lastPostDate = getLastModifiedDate(loadedPosts);
  const posts = loadedPosts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: post.lastUpdatedDate || post.publishedDate,
  }));

  const tagsFromPosts = Array.from(new Set(loadedPosts.map((post) => post.tags || []).flat()));
  const tags = tagsFromPosts.map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    lastModified: getLastModifiedDate(loadedPosts.filter((post) => post.tags?.includes(tag))),
  }));

  const pages = allPages
    .filter((page) => page.status === "published")
    .map((page) => ({
      url: `${BASE_URL}/${page.slug.split("/pages")}`,
      lastModified: page.lastUpdatedDate,
    }));
  return [
    {
      url: BASE_URL,
      lastModified: lastPostDate,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: lastPostDate,
    },
    {
      url: `${BASE_URL}/social`,
      lastModified: lastPostDate,
    },
    ...pages,
    {
      url: `${BASE_URL}/resume-frontend-cv.pdf`,
      lastModified: lastPostDate,
    },
    {
      url: `${BASE_URL}/resume-backend-cv.pdf`,
      lastModified: lastPostDate,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: lastPostDate,
    },
    ...posts,
    {
      url: `${BASE_URL}/tags`,
      lastModified: lastPostDate,
    },
    ...tags,
  ];
}
