
function EditionList({ editions = [] }) {
  return (
    <section className="editions-card">
      <h2>Available Editions</h2>

      <div className="editions-list">
        {editions.length === 0 ? (
          <p>No editions available.</p>
        ) : (
          editions.map((edition) => (
            <div className="edition-row" key={edition.id}>
              <div>
                <span>{edition.title}</span>
                <p>
                  {edition.year || "Unknown publication date"}
                </p>
                <p>
                  {edition.publishers?.join(", ") || "Unknown Publisher"}
                </p>
              </div>

              <span className="edition-arrow">›</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default EditionList;
