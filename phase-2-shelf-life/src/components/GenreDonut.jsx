const GENRE_COLORS = [
  "#283618",
  "#606c38",
  "#a5b87e",
  "#bc6c25",
  "#dda15e",
  "#d4c5a9",
  "#8b7d6b",
  "#6b8e7f",
];

export function buildGenres(books) {
  const genreMap = books.reduce((acc, book) => {
    if (book.subject) acc[book.subject] = (acc[book.subject] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(genreMap)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count], i) => ({
      name,
      count,
      color: GENRE_COLORS[i % GENRE_COLORS.length],
    }));
}

function GenreDonut({ genres }) {
  const total = genres.reduce((s, g) => s + g.count, 0);

  let cumulative = 0;
  const gradientStops = genres.map(({ count, color }) => {
    const pct = (count / total) * 100;
    const stop = `${color} ${cumulative.toFixed(1)}% ${(cumulative + pct).toFixed(1)}%`;
    cumulative += pct;
    return stop;
  });
  const donutGradient = `conic-gradient(${gradientStops.join(", ")})`;

  return (
    <div className="genre-chart">
      <div className="donut-ring" style={{ background: donutGradient }} />
      <ul className="genre-legend">
        {genres.map(({ name, count, color }) => (
          <li key={name} className="genre-legend-item">
            <span className="genre-dot" style={{ background: color }} />
            <span className="genre-legend-name">{name}</span>
            <span className="genre-legend-pct">
              {Math.round((count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreDonut;
