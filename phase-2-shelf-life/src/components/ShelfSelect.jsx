import "./ShelfSelect.css";

const SHELVES = ["Want to Read", "Reading", "Finished"];

function ShelfSelect({ id, value, onChange, placeholder, size = "md", className = "" }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`shelf-select shelf-select--${size} ${className}`.trim()}
    >
      {placeholder && <option value="" hidden>{placeholder}</option>}
      {SHELVES.map((shelf) => (
        <option key={shelf} value={shelf}>{shelf}</option>
      ))}
    </select>
  );
}

export default ShelfSelect;
