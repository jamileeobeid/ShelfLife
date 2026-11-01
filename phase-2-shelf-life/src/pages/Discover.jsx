import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Book3DItem from "../components/Book3DItem";
import Button from "../components/Button";
import { BookGridSkeleton } from "../components/Skeleton";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { sampleBooks } from "../data/sampleBooks";
import "./Discover.css";
import { searchBooks } from "../services/openLibrary";

const GENRES = ["All", "Fiction", "Non-Fiction", "Romance", "Mystery", "Classics", "Poetry", "Historical", "Literary"];
const PAGE_SIZE = 24;
const FEATURED_BOOKS = sampleBooks.slice(-3);

function Discover() {
  const [search, setSearch]           = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [books, setBooks]             = useState([]);
  const [total, setTotal]             = useState(0);
  const [offset, setOffset]           = useState(0);
  const [loading, setLoading]         = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError]             = useState(null);
  const [retryCount, setRetryCount]   = useState(0);
  const abortRef = useRef(null);

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setBooks([]);
    setTotal(0);
    setOffset(0);

    const timer = setTimeout(async () => {
      try {
        const { books: results, total: count } = await searchBooks(
          { query: search, genre: activeGenre, offset: 0 },
          controller.signal
        );
        if (!controller.signal.aborted) {
          setBooks(results);
          setTotal(count);
        }
      } catch (err) {
        if (!controller.signal.aborted) setError(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, activeGenre, retryCount]);

  async function handleLoadMore() {
    const nextOffset = offset + PAGE_SIZE;
    const controller = new AbortController();
    setLoadingMore(true);

    try {
      const { books: more } = await searchBooks(
        { query: search, genre: activeGenre, offset: nextOffset },
        controller.signal
      );
      setBooks((prev) => [...prev, ...more]);
      setOffset(nextOffset);
    } catch (err) {
      if (err.name !== "AbortError") setError(err);
    } finally {
      setLoadingMore(false);
    }
  }

  const hasMore = books.length < total && books.length > 0;

  return (
    <div className="discover-page">

      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">SHELFLIFE</p>
          <h1 className="hero-title">
            Find your next<br />great read.
          </h1>
          <p className="hero-subtitle">
            Search across classics, contemporary fiction,<br />
            poetry, and beyond.
          </p>
          <SearchBar
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setActiveGenre("All");
            }}
            onSubmit={() => setRetryCount((c) => c + 1)}
          />
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80"
            alt="Cozy reading nook with books and plants"
            className="hero-photo"
          />
        </div>
      </section>

      <section className="collection">
        <div className="collection-header">
          <h2 className="collection-heading">
            <span className="collection-dash">—</span> Our Collection
          </h2>
          {!loading && !error && (
            <span className="collection-count">
              {books.length} of {total.toLocaleString()} books
            </span>
          )}
        </div>

        <div className="genre-filters" role="group" aria-label="Filter by genre">
          {GENRES.map((g) => (
            <button
              key={g}
              className={`genre-pill ${activeGenre === g ? "genre-pill--active" : ""}`}
              onClick={() => setActiveGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {loading ? (
          <BookGridSkeleton count={10} />
        ) : error ? (
          <ErrorState
            type={error.code ?? "DEFAULT"}
            onRetry={() => setRetryCount((c) => c + 1)}
          />
        ) : books.length === 0 ? (
          <EmptyState
            type={search.trim() ? "no-results" : "empty-shelf"}
            title={search.trim() ? `No results for "${search}"` : `Nothing in ${activeGenre}`}
            message={
              search.trim()
                ? "We couldn't find any books matching your search. Try different keywords or browse by genre."
                : "There are no books in this genre right now. Try a different genre or search for something specific."
            }
          />
        ) : (
          <>
            <ul className="book-grid-3d">
              {books.map((book) => (
                <Book3DItem key={book.id} book={book} />
              ))}
            </ul>

            {loadingMore && <BookGridSkeleton count={6} />}

            {hasMore && !loadingMore && (
              <div className="load-more">
                <Button variant="cta" size="lg" onClick={handleLoadMore}>
                  Load More Books
                </Button>
                <span className="load-more-hint">
                  Showing {books.length} of {total.toLocaleString()}
                </span>
              </div>
            )}
          </>
        )}
      </section>

      <section className="featured">
        <div className="featured-left">
          <p className="featured-eyebrow">FEATURED PICKS</p>
          <h2 className="featured-title">
            Stories that stay<br />with you.
          </h2>
          <p className="featured-subtitle">
            Handpicked books for every mood, moment,<br />and season.
          </p>
          <Button as={Link} to="/" variant="ghost" size="lg">
            Explore Collection <span aria-hidden="true">→</span>
          </Button>
        </div>

        <div className="featured-books" aria-hidden="true">
          {FEATURED_BOOKS.map((book, i) => (
            <img
              key={book.id}
              src={book.cover}
              alt={book.title}
              className={`featured-book featured-book--${i}`}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Discover;
