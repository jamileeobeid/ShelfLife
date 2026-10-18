
import { useState } from "react";

function BookInfo({ book }) {
  const [selectedShelf, setSelectedShelf] = useState("");
  const [savedShelf, setSavedShelf] = useState("");

  function handleAddBook() {
    if (selectedShelf === "") return;
    setSavedShelf(selectedShelf);
  }

  return (
    <section className="book-details-hero">
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="details-cover"
      />

      <div className="details-book-info">
        <h1>{book.title}</h1>
        <p className="book-author">by {book.author}</p>
        <p>First published: {book.year}</p>

        <div className="shelf-selector">
          <label htmlFor="shelf">Add to Your Shelf</label>

          <div className="shelf-actions">
            <select
              id="shelf"
              value={selectedShelf}
              onChange={(e) => setSelectedShelf(e.target.value)}
            >
              <option value="" hidden>Select a shelf</option>
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>

            <button
              type="button"
              onClick={handleAddBook}
              disabled={!selectedShelf}
              className="add-book-button"
            >
              Add Book
            </button>
          </div>

          {savedShelf && (
            <p className="shelf-confirmation">
              Added to {savedShelf}!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookInfo;
