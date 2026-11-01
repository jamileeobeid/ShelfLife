import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getBookDetails, getBookEditions } from "../services/openLibrary";
import BookInfo from "../components/BookInfo";
import SubjectList from "../components/SubjectList";
import EditionList from "../components/EditionList";
import BookReview from "../components/BookReview";
import { BookDetailsSkeleton } from "../components/Skeleton";
import ErrorState from "../components/ErrorState";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const location = useLocation();

  const selectedBook =
    location.state?.book?.id === id
      ? location.state.book
      : null;

  const [book, setBook] = useState(null);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBook() {
      setLoading(true);
      setError(null);
      setBook(null);
      setEditions([]);

      try {
        const bookData = await getBookDetails(
          id,
          controller.signal
        );

        const editionData = await getBookEditions(
          id,
          controller.signal
        );

        if (!controller.signal.aborted) {
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
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBook();

    return () => controller.abort();
  }, [id, selectedBook, retryCount]);

  if (loading) return <BookDetailsSkeleton />;

  if (error) {
    return (
      <div className="page-container">
        <Link to="/" className="back-link">← Back to Discover</Link>
        <ErrorState
          type={error?.code ?? "DEFAULT"}
          onRetry={() => setRetryCount((c) => c + 1)}
        />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="page-container">
        <Link to="/" className="back-link">← Back to Discover</Link>
        <ErrorState type="NOT_FOUND" />
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
