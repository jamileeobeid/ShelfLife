import { useState } from "react";
import { Link } from "react-router-dom";

function BookInfo({ book, details }) {
  const [selectedShelf, setSelectedShelf] = useState("");
  const [savedShelf, setSavedShelf] = useState("");

  // function handleAddBook() {
  //   if (selectedShelf === "") return;

  //   setSavedShelf(selectedShelf);
  // }

  function handleAddBook() {
    if (selectedShelf === "") return;

    // Get books already saved by the user
    const savedBooks = JSON.parse(
      localStorage.getItem("shelflife-books") || "[]",
    );

    // Check if this book is already on a shelf
    const existingBook = savedBooks.find((item) => item.id === book.id);

    let updatedBooks;

    if (existingBook) {
      // Move the book to the selected shelf
      updatedBooks = savedBooks.map((item) =>
        item.id === book.id ? { ...item, shelf: selectedShelf } : item,
      );
    } else {
      // Add the new book
      updatedBooks = [...savedBooks, { ...book, shelf: selectedShelf }];
    }

    // Save the updated list
    localStorage.setItem("shelflife-books", JSON.stringify(updatedBooks));

    // Display the existing confirmation message
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

        <div className="shelf-selector" style={{ marginTop: "24px" }}>
          <label htmlFor="shelf">Add to Your Shelf</label>

          <div className="shelf-actions" style={{ maxWidth: "420px" }}>
            <select
              id="shelf"
              value={selectedShelf}
              onChange={(e) => setSelectedShelf(e.target.value)}
            >
              <option value="" hidden>
                Select a shelf
              </option>
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
            <Link to="/shelves" className="view-shelves-btn">
              My Shelves 
            </Link>
          </div>

          {savedShelf && (
            <p className="shelf-confirmation" style={{ marginTop: "10px" }}>
              Added to {savedShelf}!
            </p>
          )}
        </div>

        <div
          className="book-description"
          style={{
            marginTop: "45px",
            maxWidth: "650px",
          }}
        >
          <p>{details?.description || "No description available."}</p>
        </div>
      </div>
    </section>
  );
}

export default BookInfo;
