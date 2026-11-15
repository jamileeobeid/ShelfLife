import { useState, useEffect } from "react";
import Button from "./Button";
import { useBooks } from "../state/BookContext";

function BookReview({ bookId }) {
  const { reviews, saveReview } = useBooks();

  const existingReview = reviews[bookId];

  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [review, setReview] = useState(existingReview?.review ?? "");
  const [savedReview, setSavedReview] = useState(false);

  // Sync state if the review loads from localStorage after mount
  useEffect(() => {
    setRating(existingReview?.rating ?? 0);
    setReview(existingReview?.review ?? "");
  }, [bookId]);

  function handleSave() {
    if (rating === 0 && review.trim() === "") return;
    saveReview(bookId, rating, review.trim());
    setSavedReview(true);
  }

  return (
    <section className="reading-notes">
      <h2>Your Book Review</h2>
      <p>Finished reading? Leave a rating or review if you'd like!</p>

      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={star <= rating ? "star active" : "star"}
            onClick={() => {
              setRating(star);
              setSavedReview(false);
            }}
            aria-label={`Rate ${star} stars`}
            aria-pressed={rating === star}
          >
            ★
          </button>
        ))}
      </div>

      <label htmlFor="book-review">Your review</label>
      <textarea
        id="book-review"
        value={review}
        onChange={(e) => {
          setReview(e.target.value);
          setSavedReview(false);
        }}
        placeholder="Write your book review here..."
        maxLength={500}
      />
      <p className="character-count">{review.length}/500 characters</p>

      <Button
        type="button"
        onClick={handleSave}
        disabled={rating === 0 && review.trim() === ""}
      >
        Save Rating &amp; Review
      </Button>

      {savedReview && (
        <p className="review-confirmation">✓ Your rating/review has been saved!</p>
      )}
    </section>
  );
}

export default BookReview;
