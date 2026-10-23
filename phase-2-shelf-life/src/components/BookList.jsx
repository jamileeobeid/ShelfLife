import ShelfBookCard from "./ShelfBookCard";

function BookList({ books, onMoveBook, onRemoveBook }) {
  return (
    <div className="shelf-books-list">
      {books.map((book) => (
        <ShelfBookCard
          key={book.id}
          book={book}
          onMoveBook={onMoveBook}
          onRemoveBook={onRemoveBook}
        />
      ))}
    </div>
  );
}

export default BookList;
