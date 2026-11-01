import Button from "./Button";
import "./ErrorState.css";

const CONFIGS = {
  RATE_LIMIT: {
    title: "Slow down, speed reader!",
    message:
      "You're browsing so fast that Open Library needs a breather. Wait a moment and try again.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="var(--color-border)" />
        <circle cx="32" cy="32" r="22" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
        <line x1="32" y1="16" x2="32" y2="34" stroke="var(--color-mid)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="34" x2="42" y2="40" stroke="var(--color-mid)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="34" r="2" fill="var(--color-mid)" />
        <line x1="24" y1="11" x2="22" y2="8" stroke="var(--color-light)" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="9"  x2="32" y2="6" stroke="var(--color-light)" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="11" x2="42" y2="8" stroke="var(--color-light)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  NETWORK: {
    title: "Lost in the stacks",
    message:
      "We couldn't reach Open Library right now. Check your internet connection and give it another shot.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="20" width="44" height="28" rx="4" fill="var(--color-border)" />
        <rect x="13" y="23" width="38" height="22" rx="2" fill="var(--color-surface)" />
        <line x1="24" y1="52" x2="40" y2="52" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
        <line x1="14" y1="14" x2="50" y2="50" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  SERVER: {
    title: "The library is closed",
    message:
      "Open Library's servers hit a snag. This is on their end, not yours. Try again in a minute.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="12" y="16" width="40" height="32" rx="4" fill="var(--color-border)" />
        <rect x="15" y="19" width="34" height="26" rx="2" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
        <line x1="22" y1="28" x2="42" y2="28" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="34" x2="36" y2="34" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="46" cy="46" r="10" fill="var(--color-danger-bg)" stroke="var(--color-danger)" strokeWidth="1.5" />
        <line x1="46" y1="40" x2="46" y2="46" stroke="var(--color-danger)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="46" cy="50" r="1.2" fill="var(--color-danger)" />
      </svg>
    ),
  },
  NOT_FOUND: {
    title: "Book not found",
    message:
      "We couldn't find the book you were looking for. It may have moved shelves or the link might be wrong.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8"  y="12" width="30" height="40" rx="3" fill="var(--color-border)" />
        <rect x="12" y="8"  width="30" height="40" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
        <circle cx="27" cy="24" r="7" stroke="var(--color-muted)" strokeWidth="2" />
        <line x1="32" y1="29" x2="38" y2="35" stroke="var(--color-muted)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="18" y1="38" x2="30" y2="38" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="44" x2="26" y2="44" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  DEFAULT: {
    title: "Something went wrong",
    message: "An unexpected error occurred. Give it another try.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8"  y="12" width="30" height="40" rx="3" fill="var(--color-border)" />
        <rect x="12" y="8"  width="30" height="40" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
        <line x1="18" y1="20" x2="36" y2="20" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="27" x2="36" y2="27" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="34" x2="28" y2="34" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="46" cy="46" r="12" fill="var(--color-danger-bg)" />
        <line x1="42" y1="42" x2="50" y2="50" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="42" x2="42" y2="50" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

function ErrorState({ type = "DEFAULT", title, message, onRetry }) {
  const config = CONFIGS[type] ?? CONFIGS.DEFAULT;
  const displayTitle   = title   ?? config.title;
  const displayMessage = message ?? config.message;

  return (
    <div className="error-state" role="alert">
      <div className="error-icon">{config.icon}</div>
      <h2 className="error-title">{displayTitle}</h2>
      <p className="error-message">{displayMessage}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
