import { useState } from "react";
import { Link } from "react-router";
import Button from "./Button";
import ShelfSelect from "./ShelfSelect";
import { useBooks } from "../state/BookContext";

function BookInfo({ book, details }) {
  const [selectedShelf, setSelectedShelf] = useState("");
  const [savedShelf, setSavedShelf] = useState("");
  const { books, addBook } = useBooks();

  const existingBook = books.find((item) => item.id === book.id);

  function handleAddBook() {
    if (selectedShelf === "") return;

    const bookToSave = {
      ...book,
      author: book.author || "Unknown Author",
      year: book.year || "Unknown",
      subject: book.subject || book.subjects?.[0] || "Uncategorized",
      shelf: selectedShelf
    };

    addBook(bookToSave);
    setSavedShelf(selectedShelf);
  }

  return (
    <section className="book-details-hero">
      <img
        src={book.cover || "/book-placeholder.svg"}
        alt={`Cover of ${book.title}`}
        className="details-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/book-placeholder.svg";
        }}
      />

      <div className="details-book-info">
        <p className="details-subject">
          {book.subject || book.subjects?.[0] || "Uncategorized"}
        </p>

        <h1>{book.title || "Unknown Title"}</h1>

        <p className="book-author">
          by {book.author || "Unknown Author"}
        </p>

        <p className="book-year">
          First published {book.year || "Unknown"}
        </p>

        <div className="book-description">
          <p>{details?.description || "No description available."}</p>
        </div>

        <div className="shelf-selector">
          <label htmlFor="shelf">Add to Your Shelf</label>

          <div className="shelf-actions">
            <ShelfSelect
              id="shelf"
              value={selectedShelf || existingBook?.shelf || ""}
              onChange={(e) => setSelectedShelf(e.target.value)}
              placeholder="Select a shelf"
            />

            <Button
              type="button"
              onClick={handleAddBook}
              disabled={!selectedShelf || selectedShelf === existingBook?.shelf}
            >
              Add Book
            </Button>

            <Button as={Link} to="/shelves" variant="primary">
              My Shelves
            </Button>
          </div>

          {savedShelf && (
            <p className="shelf-confirmation">
              ✓ Added to {savedShelf}!
            </p>
          )}

        </div>
      </div>
    </section>
  );
}

export default BookInfo;
