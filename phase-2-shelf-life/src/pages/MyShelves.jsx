import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sampleBooks } from "../data/sampleBooks";
import ShelfSidebar from "../components/ShelfSidebar";
import BookList from "../components/BookList";
import Button from "../components/Button";
import "./MyShelves.css";

const SHELVES = ["Want to Read", "Reading", "Finished"];

const startingBooks = sampleBooks.slice(0, 9).map((book, index) => ({
  ...book,
  shelf: index < 4 ? "Want to Read" : index < 6 ? "Reading" : "Finished",
}));

function MyShelves() {
  const [selectedShelf, setSelectedShelf] = useState("Reading");

  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("shelflife-books");
      return saved ? JSON.parse(saved) : startingBooks;
    } catch {
      return startingBooks;
    }
  });

  useEffect(() => {
    localStorage.setItem("shelflife-books", JSON.stringify(books));
  }, [books]);

  function moveBook(bookId, newShelf) {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, shelf: newShelf } : book
      )
    );
  }

  function removeBook(bookId) {
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
  }

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
