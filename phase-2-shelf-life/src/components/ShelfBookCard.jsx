import { Link } from "react-router-dom";

const shelfNames = ["Want to Read", "Reading", "Finished"];

function ShelfBookCard({ book, onMoveBook, onRemoveBook }) {
  return (
    <div className="shelf-book-card">
      <Link to={`/books/${book.id}`}>
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="shelf-book-cover"
        />
      </Link>

      <div className="shelf-book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>Published: {book.year}</p>

        <Link to={`/books/${book.id}`} className="shelf-details-link">
          View Details
        </Link>
      </div>

      <div className="shelf-book-actions">
        <label htmlFor={`move-${book.id}`}>Move to:</label>

        <select
          id={`move-${book.id}`}
          value={book.shelf}
          onChange={(e) => onMoveBook(book.id, e.target.value)}
        >
          {shelfNames.map((shelf) => (
            <option key={shelf} value={shelf}>
              {shelf}
            </option>
          ))}
        </select>

        <button
          className="remove-book-button"
          onClick={() => onRemoveBook(book.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default ShelfBookCard;
