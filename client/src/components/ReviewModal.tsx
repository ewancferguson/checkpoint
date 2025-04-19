import React from "react";
import { Review } from "../models/Review";
import { Link } from "react-router-dom";

export default function ReviewModal({ review }: { review: Review | null }) {
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
                    <span className="badge bg-success fs-6">
                      {review.rating}/5 <i className="mdi mdi-star"></i>
                    </span>
                  </div>
                  <p className="lead">{review.body}</p>
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
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
