const API_BASE   = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org";

const HEADERS = {
  "User-Agent": "ShelfLife/1.0 (shelflife-app@example.com)"
};

const MIN_INTERVAL_MS = 340;
let lastRequestTime = 0;

function throttle() {
  const wait = MIN_INTERVAL_MS - (Date.now() - lastRequestTime);
  if (wait <= 0) {
    lastRequestTime = Date.now();
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      lastRequestTime = Date.now();
      resolve();
    }, wait);
  });
}

export class ApiError extends Error {
  constructor(message, code = "UNKNOWN") {
    super(message);
    this.code = code;
  }
}

async function fetchJSON(url, signal) {
  await throttle();

  let response;
  try {
    response = await fetch(url, { signal, headers: HEADERS });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new ApiError(
      "Could not reach Open Library. Check your internet connection.",
      "NETWORK"
    );
  }

  if (response.status === 429) {
    throw new ApiError(
      "Too many requests to Open Library.",
      "RATE_LIMIT"
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `Open Library returned an error (HTTP ${response.status}).`,
      "SERVER"
    );
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError("Received an unexpected response from Open Library.", "PARSE");
  }
}

function normalizeBook(book) {
  const id = book.key?.split("/").pop();
  if (!id) return null;

  return {
    id,
    title:   book.title || "Unknown Title",
    author:  book.author_name?.join(", ") || "Unknown Author",
    year:    book.first_publish_year || "Unknown",
    subject: book.subject?.[0] || "Uncategorized",
    cover:   book.cover_i
      ? `${COVER_BASE}/b/id/${book.cover_i}-L.jpg`
      : "/book-placeholder.svg"
  };
}

export async function searchBooks({ query = "", genre = "", offset = 0 } = {}, signal) {
  let q = query.trim();
  if (genre && genre !== "All") {
    q = q ? `${q} subject:${genre}` : `subject:${genre}`;
  }
  if (!q) q = "fiction";

  const params = new URLSearchParams({
    q,
    limit:  "24",
    offset: String(offset),
    fields: "key,title,author_name,first_publish_year,subject,cover_i"
  });

  const data = await fetchJSON(
    `${API_BASE}/search.json?${params.toString()}`,
    signal
  );

  return {
    books: (data.docs || []).map(normalizeBook).filter(Boolean),
    total: data.numFound || 0,
  };
}

export async function getBookDetails(id, signal) {
  if (!/^OL\d+W$/.test(id)) {
    throw new ApiError("Invalid Open Library work ID.", "INVALID_ID");
  }

  const data = await fetchJSON(`${API_BASE}/works/${id}.json`, signal);

  const description =
    typeof data.description === "string"
      ? data.description
      : data.description?.value || "No description available.";

  return {
    id,
    title:       data.title || "Unknown Title",
    description,
    subjects:    data.subjects || [],
    cover:       data.covers?.[0]
      ? `${COVER_BASE}/b/id/${data.covers[0]}-L.jpg`
      : "/book-placeholder.svg"
  };
}

export async function getBookEditions(id, signal) {
  if (!/^OL\d+W$/.test(id)) {
    throw new ApiError("Invalid Open Library work ID.", "INVALID_ID");
  }

  const data = await fetchJSON(
    `${API_BASE}/works/${id}/editions.json?limit=10`,
    signal
  );

  return (data.entries || []).map((edition) => ({
    id:         edition.key,
    title:      edition.title || "Untitled Edition",
    year:       edition.publish_date || "Unknown",
    publishers: edition.publishers || []
  }));
}
