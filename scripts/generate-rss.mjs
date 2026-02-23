#!/usr/bin/env node
// Generates public/feed.xml (RSS 2.0) and public/atom.xml from content/blog/*.mdx
// Run: node scripts/generate-rss.mjs
// Runs automatically before `next build` via the "prebuild" npm script.

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { Feed } from "feed";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BLOG_DIR = join(ROOT, "content", "blog");
const PUBLIC_DIR = join(ROOT, "public");

const SITE_URL = "https://wangbeichen.com";
const AUTHOR = { name: "Beichen Wang", email: "beichen.wang@example.com", link: SITE_URL };

function getSlug(filename) {
  return filename.replace(/\.mdx?$/, "");
}

function readPosts() {
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = readFileSync(join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      const slug = getSlug(file);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? new Date(data.date) : new Date(0),
        description: data.description ?? "",
        coverImage: data.coverImage ?? null,
      };
    })
    .filter((p) => p.date.getTime() > 0)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

const posts = readPosts();

const feed = new Feed({
  title: "Beichen Wang — Blog",
  description: "Research blog by Beichen Wang",
  id: `${SITE_URL}/`,
  link: `${SITE_URL}/blog`,
  language: "en",
  image: `${SITE_URL}/pic.png`,
  favicon: `${SITE_URL}/favicon.ico`,
  copyright: `© ${new Date().getFullYear()} Beichen Wang`,
  author: AUTHOR,
});

for (const post of posts) {
  feed.addItem({
    title: post.title,
    id: `${SITE_URL}/blog/${post.slug}`,
    link: `${SITE_URL}/blog/${post.slug}`,
    description: post.description,
    date: post.date,
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
  });
}

mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(join(PUBLIC_DIR, "feed.xml"), feed.rss2());
writeFileSync(join(PUBLIC_DIR, "atom.xml"), feed.atom1());

console.log(`RSS feed generated: ${posts.length} posts → public/feed.xml, public/atom.xml`);
