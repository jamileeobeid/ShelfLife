import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sampleBooks } from "../data/sampleBooks";
import ShelfSidebar from "../components/ShelfSidebar";
import ShelfBookCard from "../components/ShelfBookCard";
import "./MyShelves.css";

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

  function saveBooks(updatedBooks) {
    setBooks(updatedBooks);
  }

  function moveBook(bookId, newShelf) {
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, shelf: newShelf } : book,
    );

    saveBooks(updatedBooks);
  }

  function removeBook(bookId) {
    const updatedBooks = books.filter((book) => book.id !== bookId);

    saveBooks(updatedBooks);
  }

  const visibleBooks = books.filter((book) => book.shelf === selectedShelf);

  return (
    <main className="my-shelves-page">
      <div className="shelves-header">
        <h1>My Shelves</h1>
        <p>Keep track of your reading journey.</p>
      </div>

      <div className="shelves-layout">
        {}
        <div className="shelves-left">
          <ShelfSidebar
            selectedShelf={selectedShelf}
            onSelectShelf={setSelectedShelf}
            books={books}
          />
          <Link to="/statistics" className="view-stats-btn">
            My Reading Statistics!
          </Link>
        </div>

        {}
        <section className="shelves-content">
          <h2>
            {selectedShelf} ({visibleBooks.length})
          </h2>

          {visibleBooks.length === 0 ? (
            <p className="empty-shelf">No books on this shelf yet.</p>
          ) : (
            <div className="shelf-books-list">
              {visibleBooks.map((book) => (
                <ShelfBookCard
                  key={book.id}
                  book={book}
                  onMoveBook={moveBook}
                  onRemoveBook={removeBook}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default MyShelves;
