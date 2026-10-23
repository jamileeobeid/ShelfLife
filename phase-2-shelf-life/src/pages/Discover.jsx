import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Book3DItem from "../components/Book3DItem";
import Button from "../components/Button";
import { sampleBooks } from "../data/sampleBooks";
import "./Discover.css";

const GENRES = ["All", "Fiction", "Non-Fiction", "Romance", "Mystery", "Classics", "Poetry", "Historical", "Literary"];

const FEATURED_BOOKS = sampleBooks.slice(-3);

function Discover() {
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = sampleBooks.filter((book) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.subject.toLowerCase().includes(q);
    const matchesGenre =
      activeGenre === "All" ||
      book.subject.toLowerCase().includes(activeGenre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

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
          <SearchBar search={search} onSearchChange={setSearch} />
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
          <span className="collection-count">{filtered.length} {filtered.length === 1 ? "book" : "books"}</span>
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

        {filtered.length === 0 ? (
          <p className="book-grid-empty">No books match this filter.</p>
        ) : (
          <ul className="book-grid-3d">
            {filtered.map((book) => (
              <Book3DItem key={book.id} book={book} />
            ))}
          </ul>
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
