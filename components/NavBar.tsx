"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Return the English-version path for the current page. */
function toEnPath(pathname: string): string {
  if (pathname === "/blog/zh") return "/blog";
  if (pathname?.startsWith("/blog/zh/")) {
    return `/blog/${pathname.slice("/blog/zh/".length)}`;
  }
  return pathname; // already English
}

/** Return the Chinese-version path for the current page. */
function toZhPath(pathname: string): string {
  if (pathname === "/blog") return "/blog/zh";
  if (pathname?.startsWith("/blog/") && !pathname.startsWith("/blog/zh")) {
    return `/blog/zh/${pathname.slice("/blog/".length)}`;
  }
  return pathname; // already Chinese
}

function getActiveLang(pathname: string): "en" | "zh" {
  if (pathname === "/blog/zh" || pathname?.startsWith("/blog/zh/")) return "zh";
  return "en";
}

export default function NavBar() {
  const pathname = usePathname();
  const isBlogRoute = pathname === "/blog" || pathname?.startsWith("/blog/");
  const activeLang = getActiveLang(pathname ?? "");
  const enHref = toEnPath(pathname ?? "");
  const zhHref = toZhPath(pathname ?? "");

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 h-12 border-b border-black bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-5">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          Beichen Wang
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              pathname === "/"
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`text-sm transition-colors ${
              isBlogRoute
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Blog
          </Link>

          {/* Language toggle — only visible on blog routes; both labels always clickable */}
          {isBlogRoute && (
            <div className="flex items-center gap-1 text-xs border border-gray-300 rounded-full px-2 py-0.5">
              <Link
                href={enHref}
                className={`px-1 transition-colors ${
                  activeLang === "en"
                    ? "font-semibold text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                EN
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                href={zhHref}
                className={`px-1 transition-colors ${
                  activeLang === "zh"
                    ? "font-semibold text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                中文
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
