function EditionList({ editions }) {
  return (
    <section className="editions-card">
      <h2>Available Editions</h2>

      <div className="editions-list">
        {editions.map((edition) => (
          <div className="edition-row" key={edition}>
            <span>{edition}</span>
            <span className="edition-arrow">›</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EditionList;