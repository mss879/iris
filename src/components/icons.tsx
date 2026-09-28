/** Hairline icons drawn at the weight of the type, never heavier. */

type P = { className?: string };

export function SearchIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M12.6 12.6L17 17" />
    </svg>
  );
}

export function HeartIcon({ className = "h-4 w-4", filled = false }: P & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
      <path d="M10 16.5S3 12.4 3 7.9A3.4 3.4 0 0 1 10 6a3.4 3.4 0 0 1 7 1.9c0 4.5-7 8.6-7 8.6z" />
    </svg>
  );
}

export function BagIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 6.5h12l-1 10.5H5L4 6.5z" />
      <path d="M7.2 6.5V5.4a2.8 2.8 0 0 1 5.6 0v1.1" />
    </svg>
  );
}

export function UserIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="10" cy="7" r="3.3" />
      <path d="M3.8 17c.9-3.1 3.3-4.8 6.2-4.8s5.3 1.7 6.2 4.8" />
    </svg>
  );
}

export function ChevronIcon({ className = "h-2.5 w-2.5" }: P) {
  return (
    <svg viewBox="0 0 12 8" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M1 1.5l5 5 5-5" />
    </svg>
  );
}

export function CloseIcon({ className = "h-3.5 w-3.5" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-3 w-4" }: P) {
  return (
    <svg viewBox="0 0 18 10" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M0 5h16.5M12.5 1l4 4-4 4" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M14 8.5h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3.4h2.5V21H14v-6.6h2.4l.6-3.4h-3V9.2c0-.4.3-.7.7-.7z" />
    </svg>
  );
}
