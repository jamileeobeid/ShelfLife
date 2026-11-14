import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../state/BookContext";
import ShelfSidebar from "../components/ShelfSidebar";
import BookList from "../components/BookList";
import Button from "../components/Button";
import "./MyShelves.css";

const SHELVES = ["Want to Read", "Reading", "Finished"];

function MyShelves() {
  const [selectedShelf, setSelectedShelf] = useState("Reading");
  const { books, moveBook, removeBook } = useBooks();

  const visibleBooks = books.filter((book) => book.shelf === selectedShelf);

  return (
    <div className="shelves-page">

      <header className="shelves-header">
        <div>
          <p className="shelves-eyebrow">SHELFLIFE</p>
          <h1 className="shelves-title">My Shelves</h1>
          <p className="shelves-subtitle">Keep track of your reading journey.</p>
        </div>
        <div className="shelves-stats">
          {SHELVES.map((shelf) => (
            <div key={shelf} className="shelves-stat">
              <span className="shelves-stat-count">
                {books.filter((b) => b.shelf === shelf).length}
              </span>
              <span className="shelves-stat-label">{shelf}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="shelves-body">

        <ShelfSidebar
          selectedShelf={selectedShelf}
          onSelectShelf={setSelectedShelf}
          books={books}
        />

        <section className="shelves-content">
          <h2 className="shelves-content-heading">
            {selectedShelf}
            <span className="shelves-content-count">({visibleBooks.length})</span>
          </h2>

          {visibleBooks.length === 0 ? (
            <div className="shelves-empty">
              <img src="/empty-placeholder.jpg" alt="No books found" className="shelves-empty-icon" />
              <h3 className="shelves-empty-heading">This shelf is empty</h3>
              <p className="shelves-empty-text">
                You haven't added any books to <strong>{selectedShelf}</strong> yet.<br />
                Discover something new to read.
              </p>
              <Button as={Link} to="/" variant="primary" size="lg">
                Browse Collection →
              </Button>
            </div>
          ) : (
            <BookList
              books={visibleBooks}
              onMoveBook={moveBook}
              onRemoveBook={removeBook}
            />
          )}
        </section>

      </div>
    </div>
  );
}

export default MyShelves;
