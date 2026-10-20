const shelfNames = ["Want to Read", "Reading", "Finished"];

function ShelfSidebar({ selectedShelf, onSelectShelf, books }) {
  return (
    <aside className="shelf-sidebar">
      <h2>My Shelves</h2>
      {shelfNames.map((shelf) => (
        <button
          key={shelf}
          className={`shelf-tab ${selectedShelf === shelf ? "active" : ""}`}
          onClick={() => onSelectShelf(shelf)}
        >
          <span>{shelf}</span>
          <span>{books.filter((book) => book.shelf === shelf).length}</span>
        </button>
      ))}
    </aside>
  );
}

export default ShelfSidebar;
