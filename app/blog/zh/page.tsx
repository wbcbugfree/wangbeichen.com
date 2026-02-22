import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "博客 | 王贝辰",
  description: "关于土壤科学、知识图谱和语义网络技术的研究笔记与文章。",
  openGraph: {
    title: "博客 | 王贝辰",
    description: "关于土壤科学和知识工程的研究笔记。",
    type: "website",
  },
};

export default function ZhBlogIndex() {
  const posts = getAllPosts("zh");

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-12">
        <h1 className="heading-section">文章</h1>
        <p className="text-meta mt-2">
          关于土壤科学、知识图谱以及地球科学语义网络建设的研究笔记。
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-meta">暂无文章，请稍后回来查看。</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0">
              <Link href={`/blog/zh/${post.slug}`} className="group block">
                <time className="text-meta text-xs">{formatDate(post.date)}</time>
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
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
