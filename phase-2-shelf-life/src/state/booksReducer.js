export function booksReducer(books, action) {
  switch (action.type) {
    case "ADD_BOOK": {
      const book = action.book;
      const alreadyExists = books.some((b) => b.id === book.id);

      if (alreadyExists) {
        return books.map((b) =>
          b.id === book.id ? { ...b, ...book } : b
        );
      }

      return [...books, book];
    }

    case "MOVE_BOOK":
      return books.map((book) =>
        book.id === action.bookId
          ? { ...book, shelf: action.newShelf }
          : book
      );

    case "REMOVE_BOOK":
      return books.filter((book) => book.id !== action.bookId);

    default:
      return books;
  }
}


export function reviewsReducer(reviews, action) {
  switch (action.type) {
    case "SAVE_REVIEW":
      return {
        ...reviews,
        [action.bookId]: {
          rating: action.rating,
          review: action.review
        }
      };

    default:
      return reviews;
  }
}

