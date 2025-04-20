import { useState } from "react";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { reviewsService } from "../services/ReviewsService";
import { Modal } from "bootstrap";

export default function CreateReview() {
  const [body, setBody] = useState<string>(""); // Explicitly define the type for body
  const [rating, setRating] = useState<number>(0); // Explicitly define the type for rating
  const gameId = AppState.activeGame?.id
  const handleStarClick = (value: number) => {
    setRating(value); // Update the selected rating
  };

async function createReview(formData: React.FormEvent<HTMLFormElement>) {
  formData.preventDefault()
  try {
    const reviewData = {
      gameId: gameId,
      body: body,
      rating: rating,
    }
    await reviewsService.createReview(reviewData)
    Pop.success('Review Created!')

    setBody('')
    setRating(0)
    Modal.getOrCreateInstance('#createReview').hide()
  }
  catch (error: any){
    Pop.error(error);
  }
}


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
            <form onSubmit={createReview} id="reviewForm">
              <div className="mb-3">
                <label htmlFor="reviewBody" className="form-label">
                  Your Thoughts
                </label>
                <textarea
                  className="form-control bg-secondary text-light"
                  id="reviewBody"
                  rows={4}
                  placeholder="What did you think about this game?"
                  onChange={(e) => setBody(e.target.value)}
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
                  onChange={(e) => setRating(Number(e.target.value))}
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
