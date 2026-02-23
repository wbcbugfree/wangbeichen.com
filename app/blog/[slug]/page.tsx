import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

// Required for static export: pre-renders a page for every blog post
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} | Beichen Wang`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      {/* Back navigation */}
      <nav className="mb-10">
        <Link
          href="/blog"
          className="text-meta text-sm hover:text-black transition-colors"
        >
          ← All posts
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
                className="rounded-full border border-gray-300 dark:border-white/20 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
      )}

      <hr className="mb-10 border-black dark:border-white/10" />

      {/* MDX content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-code:text-sm prose-pre:bg-gray-50 dark:prose-pre:bg-white/5 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10 prose-a:text-black dark:prose-a:text-white prose-a:underline hover:prose-a:opacity-70">
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
      <footer className="mt-16 border-t border-gray-200 dark:border-white/10 pt-8">
        <Link
          href="/blog"
          className="text-meta text-sm hover:text-black dark:hover:text-white transition-colors"
        >
          ← Back to all posts
        </Link>
      </footer>
    </main>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
