function SearchBar({ search, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by title, author, or subject..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
        aria-label="Search books"
      />
    </div>
  );
}

export default SearchBar;