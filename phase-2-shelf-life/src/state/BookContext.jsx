import { createContext, useContext, useReducer, useEffect } from "react";
import { sampleBooks } from "../data/sampleBooks";
import { booksReducer, reviewsReducer } from "./booksReducer";

const BookContext = createContext(null);

const startingBooks = sampleBooks.slice(0, 9).map((book, index) => ({
  ...book,
  shelf: index < 4 ? "Want to Read" : index < 6 ? "Reading" : "Finished",
}));

function loadBooks() {
  try {
    const saved = localStorage.getItem("shelflife-books");
    if (!saved) return startingBooks;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : startingBooks;
  } catch {
    return startingBooks;
  }
}

function loadReviews() {
  try {
    const saved = localStorage.getItem("shelflife-reviews");
    if (!saved) return {};

    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function BookProvider({ children }) {
  const [books, dispatch] = useReducer(
    booksReducer,
    undefined,
    loadBooks
  );

  const [reviews, reviewDispatch] = useReducer(reviewsReducer, undefined, loadReviews);

  useEffect(() => {
    try {
      localStorage.setItem("shelflife-books", JSON.stringify(books));
    } catch {
      // Ignore errors when saving to localStorage
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem("shelflife-reviews", JSON.stringify(reviews));
    } catch {
      // Ignore errors when saving to localStorage
    }
  }, [reviews]);

  function addBook(book) {
    dispatch({ type: "ADD_BOOK", book });
  }

  function moveBook(bookId, newShelf) {
    dispatch({ type: "MOVE_BOOK", bookId, newShelf });
  }

  function removeBook(bookId) {
    dispatch({ type: "REMOVE_BOOK", bookId });
  }

  function saveReview(bookId, rating, review) {
    reviewDispatch({
      type: "SAVE_REVIEW",
      bookId,
      rating,
      review
    });
  }

  return (
    <BookContext
      value={{ books, addBook, moveBook, removeBook, reviews, saveReview }}
    >
      {children}
    </BookContext>
  );
}

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks must be used inside BookProvider");
  }

  return context;
}
