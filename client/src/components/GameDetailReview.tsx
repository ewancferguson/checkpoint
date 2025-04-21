import { Modal } from "bootstrap";
import { AppState } from "../AppState";
import { Review } from "../models/Review";
import { reviewsService } from "../services/ReviewsService";
import Pop from "../utils/Pop";
import ReviewModal from "./ReviewModal";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

function GameDetailReview({ review }: { review: Review }) {

  
  const activeReview = AppState.activeReview;

  async function GetReviewById() {
    try {
      
      await reviewsService.getReviewById(review?.id);
      Modal.getOrCreateInstance("#reviewModal").show();
    } catch (error: any) {
      Pop.error(error);
    }
  }

  return (
    <div>
      <div className="game-review-card p-4 rounded shadow-sm bg-dark text-white mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center">
          <div className="flex-grow-1">
            <h5 className="mb-1">{review.game?.name || "Unknown Game"}</h5>
            <div className="text-white small mb-2">
              Reviewed by
              <Link to={AppState.account?.id === review.creatorId ? '/account' : `/profile/${review.creatorId}`}>
              <strong className="text-white"> {review.creator?.name} </strong>
              </Link> 
               • {review.createdAt ? review.createdAt.toLocaleDateString() : "Unknown Date"}
            </div>
            <p className="mb-2">
              {review.body.length > 100 ? review.body.slice(0, 150) + '...' : review.body}
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success">{review.rating}/5 <span className="mdi mdi-star"></span></span>
              <button onClick={GetReviewById} className="btn btn-outline-light btn-sm">Read More</button>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal review={activeReview} />
    </div>
  );
}

export default observer(GameDetailReview);