import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  const slugs = getAllSlugs("zh");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "zh");
  return {
    title: `${post.title} | 王贝辰`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function ZhBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "zh");

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      {/* Back navigation */}
      <nav className="mb-10">
        <Link
          href="/blog/zh"
          className="text-meta text-sm hover:text-black transition-colors"
        >
          ← 所有文章
        </Link>
      </nav>

      {/* Post header */}
      <header className="mb-10">
        <time className="text-meta text-xs">{formatDate(post.date)}</time>
        <h1 className="heading-section mt-2 leading-tight">{post.title}</h1>
        {post.description && (
          <p className="text-meta mt-3 text-base leading-relaxed">
            {post.description}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <hr className="mb-10 border-black" />

      {/* MDX content */}
      <article className="prose prose-neutral max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-code:text-sm prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-a:text-black prose-a:underline hover:prose-a:opacity-70">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rehypePlugins: [[rehypePrettyCode as any, { theme: "github-light", keepBackground: true }]],
            },
          }}
        />
      </article>

      {/* Footer navigation */}
      <footer className="mt-16 border-t border-gray-200 pt-8">
        <Link
          href="/blog/zh"
          className="text-meta text-sm hover:text-black transition-colors"
        >
          ← 返回所有文章
        </Link>
      </footer>
    </main>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
