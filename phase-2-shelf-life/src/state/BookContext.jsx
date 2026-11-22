import { createContext, useContext, useReducer, useEffect } from "react";
import { booksReducer, reviewsReducer } from "./booksReducer";

const BookContext = createContext(null);

function loadBooks() {
  try {
    const saved = localStorage.getItem("shelflife-books");
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
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
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem("shelflife-reviews", JSON.stringify(reviews));
    } catch {
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
