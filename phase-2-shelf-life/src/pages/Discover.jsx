import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { sampleBooks } from "../data/sampleBooks";
import "./Discover.css";

function Discover() {
  const [search, setSearch] = useState("");

  const filteredBooks = sampleBooks.filter((book) => {
    const query = search.toLowerCase().trim();

    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.subject.toLowerCase().includes(query)
    );
  });

  return (
    <main className="discover-page">
      <div className="discover-header">
        <h1>Discover Books</h1>
        <p>
          Explore books, find your next great read,
          and discover new stories.
        </p>
      </div>

      <SearchBar
        search={search}
        onSearchChange={setSearch}
      />

      <h2>Explore Our Collection</h2>

      <BookList books={filteredBooks} />
    </main>
  );
}

export default Discover;