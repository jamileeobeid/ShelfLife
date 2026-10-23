import { Link } from "react-router-dom";
import Button from "./Button";
import ShelfSelect from "./ShelfSelect";

function ShelfBookCard({ book, onMoveBook, onRemoveBook }) {
  return (
    <div className="shelf-book-card">

      {/* Cover */}
      <Link to={`/books/${book.id}`} className="shelf-book-cover-link">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="shelf-book-cover"
        />
      </Link>

      {/* Info */}
      <div className="shelf-book-info">
        <Link to={`/books/${book.id}`} className="shelf-book-title-link">
          <h3>{book.title}</h3>
        </Link>
        <p className="shelf-book-author">{book.author}</p>
        <p className="shelf-book-year">{book.year}</p>
      </div>

      {/* Actions */}
      <div className="shelf-book-actions">
        <div className="shelf-move">
          <label htmlFor={`move-${book.id}`}>Move to</label>
          <ShelfSelect
            id={`move-${book.id}`}
            value={book.shelf}
            onChange={(e) => onMoveBook(book.id, e.target.value)}
            size="sm"
          />
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemoveBook(book.id)}
        >
          Remove
        </Button>
      </div>

    </div>
  );
}

export default ShelfBookCard;
