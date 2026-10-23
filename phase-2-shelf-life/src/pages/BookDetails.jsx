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
  const book = sampleBooks.find((b) => b.id === id);

  if (!book) {
    return <div className="book-not-found">Book not found.</div>;
  }

  const details = bookDetailsData[id];

  return (
    <div className="page-container book-details-page">
      <Link to="/" className="back-link">← Back to Discover</Link>
      <BookInfo book={book} details={details} />
      <SubjectList subjects={details?.subjects || [book.subject]} />
      <div className="details-bottom-grid">
        <EditionList editions={details?.editions || []} />
        <BookReview key={book.id} />
      </div>
    </div>
  );
}

export default BookDetails;
