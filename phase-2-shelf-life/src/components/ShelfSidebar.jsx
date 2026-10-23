import { Link } from "react-router-dom";
import Button from "./Button";

const SHELVES = ["Want to Read", "Reading", "Finished"];

function ShelfSidebar({ selectedShelf, onSelectShelf, books }) {
  return (
    <aside className="shelves-sidebar">
      <h2 className="shelves-sidebar-title">My Shelves</h2>
      <div className="shelves-sidebar-divider" />
      <nav className="shelves-nav">
        {SHELVES.map((shelf) => (
          <Button
            key={shelf}
            variant="text"
            className={`shelves-nav-item ${selectedShelf === shelf ? "shelves-nav-item--active" : ""}`}
            onClick={() => onSelectShelf(shelf)}
          >
            <span>{shelf}</span>
            <span className="shelves-nav-count">
              {books.filter((b) => b.shelf === shelf).length}
            </span>
          </Button>
        ))}
      </nav>
      <Button as={Link} to="/statistics" variant="text" size="sm">
        View Statistics →
      </Button>
    </aside>
  );
}

export default ShelfSidebar;
