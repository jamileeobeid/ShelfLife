import "./Skeleton.css";

export function Skeleton({ width, height, borderRadius, className = "" }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

export function BookGridSkeleton({ count = 10 }) {
  return (
    <ul className="book-grid-3d" aria-busy="true" aria-label="Loading books">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="book-item">
          <div className="skeleton-book-3d" />
          <div className="skeleton-book-meta">
            <Skeleton height="13px" borderRadius="4px" className="skeleton-w-full" />
            <Skeleton height="11px" borderRadius="4px" className="skeleton-w-70" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function BookDetailsSkeleton() {
  return (
    <div className="page-container skeleton-details-wrap" aria-busy="true" aria-label="Loading book">
      <Skeleton width="140px" height="13px" borderRadius="4px" />
      <div className="skeleton-hero">
        <Skeleton className="skeleton-cover" borderRadius="6px" />
        <div className="skeleton-info">
          <Skeleton width="72px" height="11px" borderRadius="4px" />
          <Skeleton height="38px" borderRadius="6px" className="skeleton-w-80" />
          <Skeleton width="55%" height="15px" borderRadius="4px" />
          <Skeleton width="35%" height="13px" borderRadius="4px" />
          <div className="skeleton-desc">
            <Skeleton height="13px" borderRadius="4px" className="skeleton-w-full" />
            <Skeleton height="13px" borderRadius="4px" className="skeleton-w-full" />
            <Skeleton height="13px" borderRadius="4px" className="skeleton-w-75" />
          </div>
          <div className="skeleton-shelf">
            <Skeleton height="44px" borderRadius="8px" className="skeleton-w-full" />
            <Skeleton height="44px" width="100px" borderRadius="8px" />
          </div>
        </div>
      </div>
    </div>
  );
}
