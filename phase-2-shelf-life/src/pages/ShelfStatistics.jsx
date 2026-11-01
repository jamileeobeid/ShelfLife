import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sampleBooks } from "../data/sampleBooks";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import GenreDonut, { buildGenres } from "../components/GenreDonut";
import "./ShelfStatistics.css";

const SHELF_NAMES = ["Want to Read", "Reading", "Finished"];

const QUOTE = {
  text: "So many books, so little time.",
  author: "Frank Zappa",
};

const startingBooks = sampleBooks.slice(0, 9).map((book, i) => ({
  ...book,
  shelf: i < 4 ? "Want to Read" : i < 6 ? "Reading" : "Finished",
}));

// Read books saved in localStorage
function loadSavedBooks() {
  try {
    const saved = localStorage.getItem("shelflife-books");

    if (saved === null) {
      return startingBooks;
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ShelfStatistics() {
  const [books, setBooks] = useState(loadSavedBooks);

  useEffect(() => {
    // Update statistics when localStorage changes
    function handleStorageChange() {
      setBooks(loadSavedBooks());
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Only include books assigned to an active shelf
  const activeBooks = books.filter((book) =>
    SHELF_NAMES.includes(book?.shelf)
  );

  const shelfCounts = SHELF_NAMES.map((name) => ({
    name,
    count: activeBooks.filter((b) => b.shelf === name).length,
  }));

  const maxShelf = Math.max(
    1,
    ...shelfCounts.map((s) => s.count)
  );

  const finishedCount =
    shelfCounts.find((s) => s.name === "Finished")?.count ?? 0;

  const readingCount =
    shelfCounts.find((s) => s.name === "Reading")?.count ?? 0;

  const wantCount =
    shelfCounts.find((s) => s.name === "Want to Read")?.count ?? 0;

  // Genre statistics
  const genres = buildGenres(activeBooks);
  const topGenre = genres[0]?.name ?? "—";

  // Publication decade statistics
  const decadeMap = activeBooks.reduce((acc, book) => {
    const year = Number(book.year);

   if (!Number.isFinite(year)) return acc;
    const decade = Math.floor(year / 10) * 10;

    acc[decade] = (acc[decade] || 0) + 1;

    return acc;
  }, {});

  const decades = Object.entries(decadeMap)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([d, count]) => ({
      decade: `${d}s`,
      count,
    }));

  const maxDecade = Math.max(
    1,
    ...decades.map((d) => d.count)
  );

  return (
    <div className="stats-page">
      <header className="stats-header">
        <div>
          <p className="stats-eyebrow">SHELFLIFE</p>
          <h1 className="stats-title">Your Reading Journey</h1>
          <p className="stats-subtitle">
            Explore your habits, your favorite genres, and more.
          </p>
        </div>

        <Button as={Link} to="/shelves" variant="ghost">
          ← My Shelves
        </Button>
      </header>

      <div className="stats-body">
        <div className="stats-cards">
          <StatCard
            value={activeBooks.length}
            label="Total Books"
            sub="across all shelves"
          />

          <StatCard
            value={finishedCount}
            label="Books Finished"
            sub={`${readingCount} currently reading`}
          />

          <StatCard
            value={wantCount}
            label="Want to Read"
            sub="on your wish list"
          />

          <StatCard
            value={topGenre}
            label="Top Genre"
            sub={`${genres[0]?.count ?? 0} books`}
            valueClassName="stat-card-value--text"
          />
        </div>

        <div className="stats-panels">
          <section className="stats-panel">
            <h2 className="stats-panel-heading">
              Reading by Genre
            </h2>

            <GenreDonut genres={genres} />
          </section>

          <section className="stats-panel">
            <h2 className="stats-panel-heading">
              Books by Shelf
            </h2>

            <div className="bar-chart">
              {shelfCounts.map((shelf) => (
                <div className="bar-row" key={shelf.name}>
                  <span className="bar-label">
                    {shelf.name}
                  </span>

                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(shelf.count / maxShelf) * 100}%`,
                      }}
                    />
                  </div>

                  <strong className="bar-count">
                    {shelf.count}
                  </strong>
                </div>
              ))}
            </div>

            <h2 className="stats-panel-heading stats-panel-heading--spaced">
              Books by Decade
            </h2>

            <div className="decade-chart">
              {decades.map((item) => (
                <div
                  className="decade-col"
                  key={item.decade}
                >
                  <span className="decade-count">
                    {item.count}
                  </span>

                  <div
                    className="decade-bar"
                    style={{
                      height: `${(item.count / maxDecade) * 100}px`,
                    }}
                  />

                  <span className="decade-label">
                    {item.decade}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="stats-quote-card">
            <p className="stats-quote-text">
              "{QUOTE.text}"
            </p>

            <p className="stats-quote-author">
              — {QUOTE.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShelfStatistics;
