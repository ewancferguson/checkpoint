import React, { useState, useEffect } from "react";
import { Review } from "../models/Review";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { reviewsService } from "../services/ReviewsService";
import { Modal } from "bootstrap";

function ReviewModal({ review }: { review: Review | null }) {
  const [editableBody, setEditableBody] = useState("");
  const [editableRating, setEditableRating] = useState(0);

  useEffect(() => {
    if (review) {
      setEditableBody(review.body);
      setEditableRating(review.rating);
    }
  }, [review]);

  const isCreator = review?.creator.id === AppState.account?.id;

  async function updateReview(formData: React.FormEvent<HTMLFormElement>) {
    formData.preventDefault();
  
    if (!review || !review.id) {
      Pop.error("Review is not available.");
      return;
    }
  
    try {
      const reviewData = {
        body: editableBody,
        rating: editableRating,
      };
  
      await reviewsService.updateReview(review.id, reviewData);
      reviewsService.fetchReviews()
      Pop.success("Review Updated!");
  
    } catch (error: any) {
      Pop.error(error);
    }
  }
  

  return (
    <div
      className="modal fade"
      id="reviewModal"
      tabIndex={-1}
      aria-labelledby="reviewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header border-secondary">
            <h5 className="modal-title" id="reviewModalLabel">
              {review ? `Review for ${review.game.name}` : "Loading..."}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={updateReview}>
            <div className="modal-body">
              {review ? (
                <div className="row g-4">
                  <div className="col-md-4">
                    <img
                      src={review.game.background_image}
                      alt={review.game.name}
                      className="img-fluid rounded shadow"
                    />
                  </div>
                  <div className="col-md-8">
                    <h4>{review.game.name}</h4>
                    <p className="mb-1">
                      Reviewed by <strong>{review.creator.name}</strong> on{" "}
                      {review.createdAt.toLocaleDateString()}
                    </p>
                    <div className="mb-3">
                      {isCreator ? (
                        <input
                          type="number"
                          className="form-control bg-secondary text-light w-auto"
                          min={1}
                          max={5}
                          value={editableRating}
                          onChange={(rating) => setEditableRating(+rating.target.value)}
                        />
                      ) : (
                        <span className="badge bg-success fs-6">
                          {review.rating}/5 <i className="mdi mdi-star"></i>
                        </span>
                      )}
                    </div>
                    {isCreator ? (
                      <textarea
                        className="form-control bg-secondary text-light"
                        rows={5}
                        value={editableBody}
                        onChange={(body) => setEditableBody(body.target.value)}
                      />
                    ) : (
                      <p className="lead">{review.body}</p>
                    )}
                    <Link
                      to={`/games/${review.game.gameId}`}
                      className="btn btn-outline-light mt-3"
                    >
                      View Game Details
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">Loading review...</div>
              )}
            </div>
            <div className="modal-footer border-secondary">
              {isCreator ? (
                <button data-bs-dismiss="modal" type="submit"className="btn btn-primary">
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default observer(ReviewModal);
