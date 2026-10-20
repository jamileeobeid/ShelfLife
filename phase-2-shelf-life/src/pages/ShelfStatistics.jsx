import { useState } from "react";
import { sampleBooks } from "../data/sampleBooks";
import "./ShelfStatistics.css";

const shelfNames = ["Want to Read", "Reading", "Finished"];

const startingBooks = sampleBooks.slice(0, 9).map((book, index) => ({
  ...book,
  shelf: index < 4 ? "Want to Read" : index < 6 ? "Reading" : "Finished",
}));

function ShelfStatistics() {
  const [books] = useState(() => {
    try {
      const saved = localStorage.getItem("shelflife-books");
      return saved ? JSON.parse(saved) : startingBooks;
    } catch {
      return startingBooks;
    }
  });

  const shelfCounts = shelfNames.map((name) => ({
    name,
    count: books.filter((book) => book.shelf === name).length,
  }));

  const decadeCounts = Object.entries(
    books.reduce((counts, book) => {
      const year = Number(book.year);
      if (!Number.isFinite(year)) return counts;

      const decade = Math.floor(year / 10) * 10;
      counts[decade] = (counts[decade] || 0) + 1;
      return counts;
    }, {}),
  )
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([decade, count]) => ({
      decade: `${decade}s`,
      count,
    }));

  const maxShelf = Math.max(1, ...shelfCounts.map((s) => s.count));
  const maxDecade = Math.max(1, ...decadeCounts.map((d) => d.count));

  return (
    <main className="statistics-page">
      <header className="statistics-header">
        <h1>Reading Statistics</h1>
        <p>A snapshot of your reading journey.</p>
      </header>

      <div className="statistics-charts">
        <section className="statistics-panel">
          <h2>Books by Shelf</h2>

          <div className="shelf-chart">
            {shelfCounts.map((shelf) => (
              <div className="shelf-chart-row" key={shelf.name}>
                <span className="shelf-chart-label">{shelf.name}</span>

                <div className="shelf-chart-track">
                  <div
                    className="shelf-chart-fill"
                    style={{
                      width: `${(shelf.count / maxShelf) * 100}%`,
                    }}
                  />
                </div>

                <strong>{shelf.count}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="statistics-panel">
          <h2>Books by Publication Date</h2>

          <div className="decade-chart">
            {decadeCounts.map((item) => (
              <div className="decade-column" key={item.decade}>
                <span className="decade-count">{item.count}</span>

                <div
                  className="decade-bar"
                  style={{
                    height: `${(item.count / maxDecade) * 150}px`,
                  }}
                />

                <span className="decade-label">{item.decade}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="statistics-summary">
        {shelfCounts.map((shelf) => (
          <div className="summary-card" key={shelf.name}>
            <span className="summary-number">{shelf.count}</span>
            <h3>{shelf.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ShelfStatistics;
