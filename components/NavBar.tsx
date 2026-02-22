"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

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
              pathname?.startsWith("/blog")
                ? "font-semibold text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
