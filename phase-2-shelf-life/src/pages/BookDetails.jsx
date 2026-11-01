import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getBookDetails, getBookEditions } from "../services/openLibrary";
import BookInfo from "../components/BookInfo";
import SubjectList from "../components/SubjectList";
import EditionList from "../components/EditionList";
import BookReview from "../components/BookReview";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const location = useLocation();

  // Get the book information passed from Discover
  const selectedBook =
    location.state?.book?.id === id
      ? location.state.book
      : null;

  const [book, setBook] = useState(null);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBook() {
      setLoading(true);
      setError(null);
      setBook(null);
      setEditions([]);

      try {
        // Fetch full book details from Open Library
        const bookData = await getBookDetails(
          id,
          controller.signal
        );

        // Fetch available editions
        const editionData = await getBookEditions(
          id,
          controller.signal
        );

        if (!controller.signal.aborted) {
          // Combine Discover data with API details
          const completeBook = {
            ...selectedBook,
            ...bookData,

            author:
              selectedBook?.author ||
              bookData.author ||
              "Unknown Author",

            year:
              selectedBook?.year ||
              bookData.year ||
              "Unknown",

            subject:
              selectedBook?.subject ||
              bookData.subjects?.[0] ||
              "Uncategorized",

            cover:
              bookData.cover &&
              bookData.cover !== "/book-placeholder.svg"
                ? bookData.cover
                : selectedBook?.cover || "/book-placeholder.svg"
          };

          setBook(completeBook);
          setEditions(editionData);
        }
      } catch (err) {
        if (
          err.name !== "AbortError" &&
          !controller.signal.aborted
        ) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBook();

    return () => controller.abort();
  }, [id, selectedBook]);

  if (loading) {
    return (
      <div className="book-details-page">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-not-found" role="alert">
        Error: {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-not-found">
        Book not found.
      </div>
    );
  }

  const details = {
    description: book.description,
    subjects: book.subjects,
    editions: editions
  };

  return (
    <div className="page-container book-details-page">
      <Link to="/" className="back-link">
        ← Back to Discover
      </Link>

      <BookInfo book={book} details={details} />

      <SubjectList subjects={book.subjects || []} />

      <div className="details-bottom-grid">
        <EditionList editions={editions} />
        <BookReview key={book.id} />
      </div>
    </div>
  );
}

export default BookDetails;
