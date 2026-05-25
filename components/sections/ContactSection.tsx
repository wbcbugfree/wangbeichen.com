import type { ReactElement } from "react";
import type { ContactEntry } from "@/data/types";

type ContactSectionProps = {
  data: ContactEntry[];
};

// ── Inline SVG icons ──────────────────────────────────────────────────────────

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const GoogleScholarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const OrcidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
  </svg>
);

const ResearchGateIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className="w-5 h-5">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.04 15.97c0,8.85 -7.18,16.03 -16.02,16.03 -8.85,0 -16.02,-7.18 -16.02,-16.03 0,-8.85 7.17,-16.03 16.02,-16.03 8.84,0 16.02,7.18 16.02,16.03zm-14.79 7c-1.43,-0.28 -2.28,-1.11 -4.45,-4.33 -0.72,-1.08 -0.72,-1.08 -1.42,-1.13 -1.03,-0.07 -0.95,-0.25 -0.92,2.02 0.04,2.58 0.01,2.52 1.5,2.77 0.39,0.06 0.42,0.09 0.42,0.32 0,0.26 0,0.26 -2.62,0.28 -2.46,0.02 -2.62,0.01 -2.67,-0.14 -0.1,-0.29 0.05,-0.43 0.59,-0.53 0.61,-0.11 0.93,-0.36 1.01,-0.78 0.04,-0.16 0.05,-2.32 0.03,-4.8 -0.03,-5.21 0.03,-4.9 -0.93,-5.11 -0.6,-0.13 -0.79,-0.27 -0.71,-0.51 0.06,-0.16 0.19,-0.17 2.92,-0.22 4.06,-0.08 4.82,0.05 5.9,1.01 1.13,1.01 1.29,2.55 0.39,3.84 -0.4,0.58 -1.2,1.2 -1.82,1.43 -0.29,0.11 -0.53,0.23 -0.53,0.27 0,0.12 0.92,1.43 1.49,2.13 1.52,1.85 2.34,2.57 3.19,2.79 0.53,0.14 0.68,0.29 0.53,0.55 -0.16,0.27 -0.96,0.33 -1.9,0.14zm-3.83 -6.63c2,-0.82 2.15,-3.57 0.25,-4.38 -0.49,-0.21 -0.62,-0.22 -1.85,-0.22 -1.33,0 -1.33,0 -1.35,2.31 -0.02,1.27 -0.01,2.37 0.02,2.43 0.09,0.21 2.34,0.1 2.93,-0.14zm6.97 -2.85c-1.55,-0.29 -2.06,-1.24 -1.98,-3.68 0.04,-1.35 0.15,-1.72 0.67,-2.28 0.92,-0.99 3.2,-0.9 4.04,0.16 0.36,0.45 0.33,0.59 -0.17,0.74 -0.39,0.13 -0.39,0.13 -0.75,-0.23 -0.85,-0.82 -2.32,-0.52 -2.58,0.54 -0.13,0.47 -0.12,2.46 0.01,2.91 0.35,1.27 2.46,1.27 2.82,0 0.22,-0.81 0.17,-0.87 -0.8,-0.92 -0.47,-0.02 -0.47,-0.02 -0.47,-0.41 0,-0.38 0,-0.38 1.12,-0.41 1.45,-0.03 1.43,-0.05 1.36,1.01 -0.09,1.33 -0.45,1.97 -1.32,2.35 -0.57,0.24 -1.35,0.33 -1.95,0.22z"
    />
  </svg>
);

const CONTACT_ICONS: Record<string, () => ReactElement> = {
  Email: EmailIcon,
  GitHub: GitHubIcon,
  "Google Scholar": GoogleScholarIcon,
  LinkedIn: LinkedInIcon,
  ORCID: OrcidIcon,
  ResearchGate: ResearchGateIcon,
};

// ── Component ─────────────────────────────────────────────────────────────────

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <div className="h-full">
      <h3 className="heading-section-sm">Contact Me</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {data.map((entry) => {
          const Icon = CONTACT_ICONS[entry.type];
          return (
            <a
              key={entry.type}
              href={entry.href}
              title={`${entry.type}: ${entry.value}`}
              target={entry.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={entry.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white transition-colors"
              aria-label={entry.type}
            >
              {Icon ? <Icon /> : <span className="text-xs font-semibold">{entry.type.slice(0, 2)}</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}
