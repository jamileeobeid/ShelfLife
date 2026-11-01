import EmptyState from "./EmptyState";

const OL_BASE = "https://openlibrary.org";

function EditionList({ editions = [] }) {
  return (
    <section className="editions-card">
      <h2>Available Editions</h2>
      <div className="editions-list">
        {editions.length === 0 ? (
          <EmptyState
            type="no-editions"
            title="No editions found"
            message="We couldn't find any editions for this book in Open Library."
          />
        ) : (
          editions.map((edition) => (
            <a
              className="edition-row"
              key={edition.id}
              href={`${OL_BASE}${edition.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="edition-info">
                <span className="edition-title">{edition.title}</span>
                <span className="edition-meta">
                  {edition.year || "Unknown year"}
                  {edition.publishers?.length ? ` · ${edition.publishers[0]}` : ""}
                </span>
              </div>
              <span className="edition-arrow">›</span>
            </a>
          ))
        )}
      </div>
    </section>
  );
}

export default EditionList;
