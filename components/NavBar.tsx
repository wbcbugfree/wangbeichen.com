"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const isBlogRoute = pathname === "/blog" || pathname?.startsWith("/blog/");
  const activeLang = getActiveLang(pathname ?? "");
  const enHref = toEnPath(pathname ?? "");
  const zhHref = toZhPath(pathname ?? "");

  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 h-12 border-b border-black dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-sm">
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
                ? "font-semibold text-black dark:text-white"
                : "text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`text-sm transition-colors ${
              isBlogRoute
                ? "font-semibold text-black dark:text-white"
                : "text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Blog
          </Link>

          {/* Language toggle — only visible on blog routes; both labels always clickable */}
          {isBlogRoute && (
            <div className="flex items-center gap-1 text-xs border border-gray-300 dark:border-white/20 rounded-full px-2 py-0.5">
              <Link
                href={enHref}
                className={`px-1 transition-colors ${
                  activeLang === "en"
                    ? "font-semibold text-black dark:text-white"
                    : "text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                EN
              </Link>
              <span className="text-gray-300 dark:text-white/20">/</span>
              <Link
                href={zhHref}
                className={`px-1 transition-colors ${
                  activeLang === "zh"
                    ? "font-semibold text-black dark:text-white"
                    : "text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                中文
              </Link>
            </div>
          )}

          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={toggleDark}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
