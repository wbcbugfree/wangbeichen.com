"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (!pathname?.startsWith("/blog")) return null;

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-4 px-5 flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
      <span>© 2025 Beichen Wang</span>
      <span>Built with Next.js</span>
    </footer>
  );
}
