function SearchBar({ search, onSearchChange, onSubmit }) {
  function handleKeyDown(e) {
    if (e.key === "Enter" && onSubmit) onSubmit();
  }

  return (
    <div className="search-container">
      <div className="search-field">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="book-search"
          name="book-search"
          type="text"
          placeholder="Search by title, author, or subject…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
          aria-label="Search books"
        />
        <button
          className="search-submit"
          aria-label="Search"
          onClick={onSubmit}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
