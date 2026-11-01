import "./EmptyState.css";

const ILLUSTRATIONS = {
  "no-results": (
    <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="30" y="50" width="46" height="62" rx="4" fill="var(--color-border)" />
      <rect x="34" y="44" width="46" height="62" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
      <line x1="42" y1="58" x2="72" y2="58" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="66" x2="72" y2="66" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="74" x2="62" y2="74" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="98" cy="72" r="26" stroke="var(--color-mid)" strokeWidth="3" fill="none" />
      <line x1="118" y1="92" x2="134" y2="108" stroke="var(--color-mid)" strokeWidth="4" strokeLinecap="round" />
      <line x1="88" y1="62" x2="108" y2="82" stroke="var(--color-light)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="108" y1="62" x2="88" y2="82" stroke="var(--color-light)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  ),

  "empty-shelf": (
    <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="108" width="140" height="6" rx="3" fill="var(--color-border)" />
      <rect x="10" y="60" width="140" height="6" rx="3" fill="var(--color-border)" />
      <rect x="10" y="12" width="140" height="6" rx="3" fill="var(--color-border)" />
      <rect x="10" y="12" width="6" height="102" rx="2" fill="var(--color-border)" />
      <rect x="144" y="12" width="6" height="102" rx="2" fill="var(--color-border)" />
      <rect x="28" y="72" width="14" height="36" rx="2" fill="var(--color-border)" opacity="0.5" />
      <rect x="46" y="76" width="10" height="32" rx="2" fill="var(--color-border)" opacity="0.4" />
      <rect x="60" y="68" width="16" height="40" rx="2" fill="var(--color-border)" opacity="0.3" />
      <path d="M85 95 Q90 88 95 95 Q100 88 105 95" stroke="var(--color-light)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M80 85 Q100 65 120 80" stroke="var(--color-border)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
    </svg>
  ),

  "no-stats": (
    <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="100" cy="88" r="62" fill="var(--color-border)" opacity="0.22" />
      <circle cx="170" cy="45" r="3.5" fill="var(--color-border)" opacity="0.4" />
      <circle cx="25" cy="62" r="2.5" fill="var(--color-border)" opacity="0.3" />
      <g transform="rotate(-6, 75, 85)">
        <rect x="28" y="28" width="78" height="100" rx="7" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="3" fill="var(--color-border)" />
        <circle cx="49" cy="40" r="3" fill="var(--color-border)" />
        <circle cx="58" cy="40" r="3" fill="var(--color-border)" />
        <rect x="36" y="88" width="10" height="28" rx="2" fill="var(--color-border)" opacity="0.55" />
        <rect x="51" y="74" width="10" height="42" rx="2" fill="var(--color-border)" opacity="0.45" />
        <rect x="66" y="81" width="10" height="35" rx="2" fill="var(--color-border)" opacity="0.35" />
        <rect x="81" y="67" width="10" height="49" rx="2" fill="var(--color-border)" opacity="0.3" />
        <line x1="32" y1="116" x2="98" y2="116" stroke="var(--color-border)" strokeWidth="1.5" />
      </g>
      <rect x="82" y="38" width="82" height="102" rx="7" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
      <circle cx="95" cy="51" r="3" fill="var(--color-border)" />
      <circle cx="104" cy="51" r="3" fill="var(--color-border)" />
      <circle cx="113" cy="51" r="3" fill="var(--color-border)" />
      <circle cx="123" cy="93" r="26" stroke="var(--color-border)" strokeWidth="8" fill="none" opacity="0.45" />
      <path d="M123 67 A26 26 0 0 1 149 93" stroke="var(--color-mid)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.65" />
      <circle cx="123" cy="93" r="14" fill="var(--color-surface)" />
      <rect x="92" y="128" width="52" height="4" rx="2" fill="var(--color-border)" opacity="0.45" />
      <rect x="97" y="136" width="40" height="3" rx="1.5" fill="var(--color-border)" opacity="0.3" />
      <rect x="12" y="138" width="8" height="26" rx="1.5" fill="var(--color-mid)" opacity="0.45" />
      <rect x="21" y="143" width="7" height="21" rx="1.5" fill="var(--color-border)" opacity="0.6" />
      <rect x="29" y="140" width="9" height="24" rx="1.5" fill="var(--color-light)" opacity="0.5" />
    </svg>
  ),

  "no-editions": (
    <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="38" y="58" width="32" height="44" rx="3" fill="var(--color-border)" opacity="0.6" transform="rotate(-8 54 80)" />
      <rect x="58" y="52" width="32" height="44" rx="3" fill="var(--color-border)" opacity="0.8" transform="rotate(4 74 74)" />
      <rect x="50" y="48" width="32" height="44" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
      <line x1="58" y1="62" x2="74" y2="62" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="69" x2="74" y2="69" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="76" x2="68" y2="76" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="104" cy="52" r="20" fill="var(--color-border)" opacity="0.15" />
      <text x="104" y="57" textAnchor="middle" fontSize="20" fill="var(--color-muted)" fontFamily="Georgia, serif">?</text>
    </svg>
  ),
};

function EmptyState({ type = "no-results", title, message, action }) {
  const illustration = ILLUSTRATIONS[type] ?? ILLUSTRATIONS["no-results"];

  return (
    <div className="empty-state">
      <div className="empty-illustration">{illustration}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
