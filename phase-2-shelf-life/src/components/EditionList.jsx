function EditionList({ editions }) {
  return (
    <section className="details-section">
      <h2>Available Editions</h2>

      {editions.length === 0 ? (
        <p>No editions available.</p>
      ) : (
        <ul className="edition-list">
          {editions.map((edition) => (
            <li key={edition}>{edition}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EditionList;