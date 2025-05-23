import { observer } from "mobx-react";
import { AppState } from "../AppState.js";
import { Review } from "../models/Review.js";
import { Link } from "react-router-dom";
import Pop from "../utils/Pop.js";
import { reviewsService } from "../services/ReviewsService.js";
import { Modal } from "bootstrap";
import ReviewModal from "./ReviewModal.js";
import '../assets/scss/pages/HomePage.scss';

function ReviewCard({ review }: { review: Review }) {
  const activeReview = AppState.activeReview || null;

  async function GetReviewById() {
    try {
      await reviewsService.getReviewById(review?.id);
      Modal.getOrCreateInstance("#reviewModal").show();
    } catch (error: any) {
      Pop.error(error);
    }
  }

  return (
    <div className="col-12 mb-4">
      <div className="game-review-card p-4 rounded shadow-sm bg-dark text-white">
        <div className="flex-column flex-md-row align-items-md-center row">
          <div className="col-md-5">

          <img 
            src={review.game.background_image} 
            alt="Game Cover" 
            className="me-md-4 mb-3 mb-md-0 review-card-img w-100 w-md-auto" // Image takes full width on mobile, auto on larger screens
            />
            </div>
        
          <div className="col"
          >

          <div className="flex-grow-1">
            <Link to={`/games/${review.game.gameId}`} className="text-decoration-none text-white">
              <h5 className="mb-1">{review.game.name}</h5>
            </Link>
            <Link to={AppState.account?.id === review.creatorId ? '/account' : `/profile/${review.creatorId}`}>
                <div className="text-white small mb-2">
                  Reviewed by <strong className="text-white">{review.creator.name}</strong> • {review.createdAt.toLocaleDateString()}
                </div>
            </Link>

            <p className="mb-2">
              {review.body.length > 100 ? review.body.slice(0, 100) + '...' : review.body}
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success">{review.rating}/5 <span className="mdi mdi-star"></span></span>
              <button onClick={GetReviewById} className="btn btn-outline-light btn-sm">Read More</button>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Modal for detailed review */}
      <ReviewModal review={activeReview} />
    </div>
  );
}

export default observer(ReviewCard);
