// Server component — no "use client" needed since footer shows on all pages uniformly.
// lastUpdated is passed from the root layout (computed at build time for static export).

type FooterProps = {
  lastUpdated?: string;
};

export default function Footer({ lastUpdated }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-4 px-5 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 dark:text-gray-500">
      <span>© {new Date().getFullYear()} Beichen Wang</span>
      <div className="flex items-center gap-4">
        {lastUpdated && <span>Last updated: {lastUpdated}</span>}
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
