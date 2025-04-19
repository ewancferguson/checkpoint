import { observer } from "mobx-react";
import { AppState } from "../AppState.js";
import { Game } from "../models/Game.js";
import '../assets/scss/pages/HomePage.scss'
import { Review } from "../models/Review.js";


export default function ReviewCard({ review }: { review: Review }) {

  
  
  

  return (
    <div className="col-12 mb-4">
    <div className="game-review-card p-4 rounded shadow-sm bg-dark text-white">
    <div className="d-flex flex-column flex-md-row align-items-md-center">
      <img src={review.game.background_image} alt="Game Cover" className="me-md-4 mb-3 mb-md-0 review-card-img" />
      <div className="flex-grow-1">
        <h5 className="mb-1">{review.game.name}</h5>
        <div className="text-white small mb-2">Reviewed by <strong className="text-white">{review.creator.name}</strong> • {review.createdAt.toLocaleDateString()}</div>
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
