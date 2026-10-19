import { Link, useParams } from "react-router-dom";
import { sampleBooks } from "../data/sampleBooks";
import { bookDetailsData } from "../data/bookDetailsData";
import BookInfo from "../components/BookInfo";
import SubjectList from "../components/SubjectList";
import EditionList from "../components/EditionList";
import BookReview from "../components/BookReview";

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
        ‹ Back to results
      </Link>

      <BookInfo key={book.id} book={book} details={details} />

      <SubjectList subjects={details?.subjects || [book.subject]} />

      <div className="details-bottom-grid">
        <EditionList editions={details?.editions || []} />
        <BookReview key={book.id} />
      </div>
    </main>
  );
}

export default BookDetails;
