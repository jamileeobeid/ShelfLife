import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function extractLeftEdgeColor(src, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    try {
      const h = img.naturalHeight || 200;
      const canvas = document.createElement("canvas");
      canvas.width = 4;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      // Sample only the leftmost 4px strip of the cover
      ctx.drawImage(img, 0, 0, 4, h);
      const { data } = ctx.getImageData(0, 0, 4, h);
      const pixels = data.length / 4;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i]; g += data[i + 1]; b += data[i + 2];
      }
      // Darken so the spine reads as a shadowed side face
      const d = 0.7;
      callback(`rgb(${Math.round(r / pixels * d)},${Math.round(g / pixels * d)},${Math.round(b / pixels * d)})`);
    } catch {
      // CORS blocked on this host — keep default
    }
  };
  img.src = src;
}

function Book3DItem({ book }) {
  const [spineColor, setSpineColor] = useState("#2a2418");

  useEffect(() => {
    extractLeftEdgeColor(book.cover, setSpineColor);
  }, [book.cover]);

  return (
    <li className="book-item">
      <Link
        to={`/books/${book.id}`}
        className="book-scene"
        aria-label={`View details for ${book.title}`}
      >
        <div className="book-3d">
          <div className="book-spine" style={{ background: spineColor }}>
            <span>{book.title}</span>
          </div>
          <div
            className="book-front"
            style={{ backgroundImage: `url('${book.cover}')` }}
          />
        </div>
      </Link>

      <div className="book-meta">
        <h3 className="book-meta-title">{book.title}</h3>
        <p className="book-meta-byline">{book.author} · {book.year}</p>
      </div>
    </li>
  );
}

export default Book3DItem;
