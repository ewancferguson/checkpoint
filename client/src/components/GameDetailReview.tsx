import { Review } from "../models/Review";

export default function GameDetailReview({ review }: { review: Review }){
  return(
    <div>
      <div className="game-review-card p-4 rounded shadow-sm bg-dark text-white mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center">
          <div className="flex-grow-1">
            <h5 className="mb-1">{review.game?.name || "Unknown Game"}</h5>
            <div className="text-white small mb-2">Reviewed by <strong className="text-white">{review.creator?.name || "Anonymous"}</strong> • {review.createdAt ? review.createdAt.toLocaleDateString() : "Unknown Date"}</div>
            <p className="mb-2">
              {review.body.length > 100 ? review.body.slice(0, 100) + '...' : review.body}
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success">{review.rating}/5 <span className="mdi mdi-star"></span></span>
              <button className="btn btn-outline-light btn-sm">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}