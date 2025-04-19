import { useState } from "react";

export default function CreateReview() {
  const [rating, setRating] = useState<number>(0); // Explicitly define the type for rating

  const handleStarClick = (value: number) => {
    setRating(value); // Update the selected rating
  };

  return (
    <div
      className="modal fade"
      id="createReview"
      tabIndex={-1}
      aria-labelledby="createReviewLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header border-secondary">
            <h5 className="modal-title" id="createReviewLabel">
              Write a Review
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="reviewForm">
              <div className="mb-3">
                <label htmlFor="reviewBody" className="form-label">
                  Your Thoughts
                </label>
                <textarea
                  className="form-control bg-secondary text-light"
                  id="reviewBody"
                  rows={4}
                  placeholder="What did you think about this game?"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div
                  id="starRating"
                  className="d-flex gap-2 fs-3"
                  aria-labelledby="starRating"
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <i
                      key={val}
                      className={`mdi ${rating >= val ? 'mdi-star' : 'mdi-star-outline'} cursor-pointer text-warning`}
                      onClick={() => handleStarClick(val)}
                      aria-hidden="true"
                      role="button"
                    ></i>
                  ))}
                </div>
                <input
                  type="hidden"
                  id="reviewRating"
                  name="rating"
                  value={rating}
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
