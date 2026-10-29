const API_BASE = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org";

async function fetchJSON(url, signal) {
  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Open Library request failed (HTTP ${response.status}).`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error(
      `Unable to load books from Open Library. ${error.message}`
    );
  } finally {
    // The requesting component manages its loading state.
  }
}

function normalizeBook(book) {
  const id = book.key?.split("/").pop();

  if (!id) return null;

  return {
    id,
    title: book.title || "Unknown Title",
    author: book.author_name?.join(", ") || "Unknown Author",
    year: book.first_publish_year || "Unknown",
    subject: book.subject?.[0] || "Uncategorized",
    cover: book.cover_i
      ? `${COVER_BASE}/b/id/${book.cover_i}-L.jpg`
      : "/book-placeholder.svg"
  };
}

export async function searchBooks(query = "", signal) {
  const searchTerm = query.trim() || "fiction";

  const params = new URLSearchParams({
    q: searchTerm,
    limit: "24",
    fields: "key,title,author_name,first_publish_year,subject,cover_i"
  });

  const data = await fetchJSON(
    `${API_BASE}/search.json?${params.toString()}`,
    signal
  );

  return (data.docs || [])
    .map(normalizeBook)
    .filter(Boolean);
}

export async function getBookDetails(id, signal) {
  if (!/^OL\d+W$/.test(id)) {
    throw new Error("Invalid Open Library work ID.");
  }

  const data = await fetchJSON(
    `${API_BASE}/works/${id}.json`,
    signal
  );

  const description =
    typeof data.description === "string"
      ? data.description
      : data.description?.value || "No description available.";

  return {
    id,
    title: data.title || "Unknown Title",
    description,
    subjects: data.subjects || [],
    cover: data.covers?.[0]
      ? `${COVER_BASE}/b/id/${data.covers[0]}-L.jpg`
      : "/book-placeholder.svg"
  };
}

export async function getBookEditions(id, signal) {
  if (!/^OL\d+W$/.test(id)) {
    throw new Error("Invalid Open Library work ID.");
  }

  const data = await fetchJSON(
    `${API_BASE}/works/${id}/editions.json?limit=10`,
    signal
  );

  return (data.entries || []).map((edition) => ({
    id: edition.key,
    title: edition.title || "Untitled Edition",
    year: edition.publish_date || "Unknown",
    publishers: edition.publishers || []
  }));
}