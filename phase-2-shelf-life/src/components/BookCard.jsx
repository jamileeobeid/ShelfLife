import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="book-cover"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />

      <div className="book-info">
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Published:</strong> {book.year}</p>
        <p><strong>Subject:</strong> {book.subject}</p>

        <Link
          to={`/books/${book.id}`}
          className="details-button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default BookCard;