import React, { useState, useEffect } from "react";
import { Review } from "../models/Review";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { reviewsService } from "../services/ReviewsService";
import { Modal } from "bootstrap";
import { commentService } from "../services/CommentService";
import CommentCard from "./CommentCard";

function ReviewModal({ review }: { review: Review | null }) {
  const [editableBody, setEditableBody] = useState("");
  const [editableRating, setEditableRating] = useState(0);
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    if (review) {
      setEditableBody(review.body);
      setEditableRating(review.rating);
      getCommentsByReview(review);
    }
  }, [review]);

  const isCreator = review?.creator.id === AppState.account?.id;
  const account = AppState.account;

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
      reviewsService.fetchReviews();
      reviewsService.fetchReviewsByGameId(review.gameId.toString());
      Pop.success("Review Updated!");
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function deleteReview(reviewId: string) {
    try {
      const yes = await Pop.confirm("Are you sure you want to delete this review?");
      if (!yes) return;
      Modal.getOrCreateInstance("#reviewModal").hide();
      await reviewsService.deleteReview(reviewId);
      Pop.success("Review Deleted!");
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function submitComment() {
    try {
      if (!review) return;
      const commentData = {
        body: commentBody,
        reviewId: review.id,
      };
      await commentService.createComment(commentData);
      Pop.success("Comment submitted!");
      setCommentBody("");
      getCommentsByReview(review);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function getCommentsByReview(review: Review) {
    try {
      await commentService.getCommentsByReview(review.id);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  const commentcards = AppState.comments?.slice().reverse().map(comment => (
    <CommentCard key={comment.id} comment={comment} />
  ));

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
                <Link to={`/games/${review.game.gameId}`} className="text-decoration-none text-white">
                  <h4 data-bs-dismiss="modal">{review.game.name}</h4>
                </Link>
                  <Link to={account?.id === review.creatorId ? '/account' : `/profile/${review.creatorId}`}>
                  <p data-bs-dismiss="modal" className="mb-1 text-white">
                    Reviewed by <strong>{review.creator.name}</strong> on{" "}
                  </p>
                  </Link>
                  <p>
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
                        onChange={(e) => setEditableRating(+e.target.value)}
                      />
                    ) : (
                      <span className="badge bg-success fs-6">
                        {review.rating}/5 <i className="mdi mdi-star"></i>
                      </span>
                    )}
                  </div>
                  {isCreator ? (
                    <>
                      <form onSubmit={updateReview}>
                        <textarea
                          className="form-control bg-secondary text-light mb-3"
                          rows={5}
                          value={editableBody}
                          onChange={(e) => setEditableBody(e.target.value)}
                        />
                      <div className="d-flex gap-2 flex-wrap">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => deleteReview(review.id)} >
                          Delete Review
                          </button>
                          </div>
                          </form>

                    </>
                  ) : (
                    <>
                      <p className="lead">{review.body}</p>
                      <Link
                        to={`/games/${review.game.gameId}`}
                        className="btn btn-outline-light mt-3"
                      >
                        View Game Details
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-5">Loading review...</div>
            )}

            <hr className="border-secondary mt-5" />
            {account && (
              <>
                <h5>Leave a Comment</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitComment();
                  }}
                >
                  <div className="mb-3">
                    <textarea
                      className="form-control bg-secondary text-light"
                      placeholder="Write your comment..."
                      rows={3}
                      value={commentBody}
                      onChange={(e) => setCommentBody(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-light">
                    Submit Comment
                  </button>
                </form>
                <hr className="border-secondary mt-4" />
              </>
            )}

            <h5>All Comments</h5>
            <div className="mt-3">
              {commentcards?.length ? commentcards : <p className="text-center">No comments yet.</p>}
            </div>
          </div>
          <div className="modal-footer border-secondary">
            {!isCreator && (
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(ReviewModal);
