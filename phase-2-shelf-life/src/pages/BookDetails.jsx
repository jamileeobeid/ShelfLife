
import { Link, useParams } from "react-router-dom";
import { sampleBooks } from "../data/sampleBooks";
import { bookDetailsData } from "../data/bookDetailsData";

import BookInfo from "../components/BookInfo";
import SubjectList from "../components/SubjectList";
import EditionList from "../components/EditionList";

import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();

  const book = sampleBooks.find((book) => book.id === id);

  if (!book) {
    return <h2>Book not found</h2>;
  }

  const details = bookDetailsData[id];

  return (
    <main className="book-details-page">
      <Link to="/" className="back-link">
        Back to Discover
      </Link>

      <BookInfo book={book} details={details} />

      <section className="details-section">
        <h2>Description</h2>
        <p>{details?.description || "No description available."}</p>
      </section>

      <SubjectList subjects={details?.subjects || [book.subject]} />

      <EditionList editions={details?.editions || []} />
    </main>
  );
}

export default BookDetails;
