import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Beichen Wang",
  description:
    "Research notes and writings on soil science, knowledge graphs, and semantic web technologies.",
  openGraph: {
    title: "Blog | Beichen Wang",
    description: "Research notes on soil science and knowledge engineering.",
    type: "website",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-12">
        <h1 className="heading-section">Writing</h1>
        <p className="text-meta mt-2">
          Notes on soil science, knowledge graphs, and building the semantic web
          for earth science.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-meta">No posts yet. Check back soon.</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <time className="text-meta text-xs">
                  {formatDate(post.date)}
                </time>
                <h2 className="heading-panel mt-1 group-hover:underline">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-meta mt-2 leading-relaxed">
                    {post.description}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
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
              </Link>
            </article>
          ))}
        </div>
      )}
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
