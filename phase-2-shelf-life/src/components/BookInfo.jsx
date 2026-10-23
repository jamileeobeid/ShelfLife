import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import ShelfSelect from "./ShelfSelect";

function BookInfo({ book, details }) {
  const [selectedShelf, setSelectedShelf] = useState("");
  const [savedShelf, setSavedShelf] = useState("");

  function handleAddBook() {
    if (selectedShelf === "") return;

    const savedBooks = JSON.parse(localStorage.getItem("shelflife-books") || "[]");
    const existingBook = savedBooks.find((item) => item.id === book.id);

    const updatedBooks = existingBook
      ? savedBooks.map((item) =>
          item.id === book.id ? { ...item, shelf: selectedShelf } : item
        )
      : [...savedBooks, { ...book, shelf: selectedShelf }];

    localStorage.setItem("shelflife-books", JSON.stringify(updatedBooks));
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
        <p className="details-subject">{book.subject}</p>
        <h1>{book.title}</h1>
        <p className="book-author">by {book.author}</p>
        <p className="book-year">First published {book.year}</p>

        <div className="book-description">
          <p>{details?.description || "No description available."}</p>
        </div>

        <div className="shelf-selector">
          <label htmlFor="shelf">Add to Your Shelf</label>
          <div className="shelf-actions">
            <ShelfSelect
              id="shelf"
              value={selectedShelf}
              onChange={(e) => setSelectedShelf(e.target.value)}
              placeholder="Select a shelf"
            />
            <Button type="button" onClick={handleAddBook} disabled={!selectedShelf}>
              Add Book
            </Button>
            <Button as={Link} to="/shelves" variant="primary">
              My Shelves
            </Button>
          </div>

          {savedShelf && (
            <p className="shelf-confirmation">✓ Added to {savedShelf}!</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookInfo;
