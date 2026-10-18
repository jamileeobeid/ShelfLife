import BookCard from "./BookCard";

function BookList({ books }) {
  if (books.length === 0) {
    return (
      <p className="no-results">
        No books found. Try a different search.
      </p>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;