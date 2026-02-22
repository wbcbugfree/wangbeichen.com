import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

function blogDir(lang: "en" | "zh" = "en"): string {
  return lang === "zh" ? path.join(BLOG_ROOT, "zh") : BLOG_ROOT;
}

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  coverImage?: string;
  lang?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export function getAllPosts(lang: "en" | "zh" = "en"): BlogPostMeta[] {
  const dir = blogDir(lang);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        description: (data.description as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        coverImage: (data.coverImage as string) ?? undefined,
        lang: (data.lang as string) ?? lang,
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostBySlug(slug: string, lang: "en" | "zh" = "en"): BlogPost {
  const dir = blogDir(lang);
  const filepath = path.join(dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    description: (data.description as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    coverImage: (data.coverImage as string) ?? undefined,
    lang: (data.lang as string) ?? lang,
    content,
  };
}

/** Returns all slugs available in the given language. */
export function getAllSlugs(lang: "en" | "zh" = "en"): string[] {
  const dir = blogDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
