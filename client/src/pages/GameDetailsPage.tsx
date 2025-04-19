import { observer } from "mobx-react";
import { AppState } from "../AppState.js";
import { useParams } from "react-router-dom";
import Pop from "../utils/Pop.js";
import { gamesService } from "../services/GamesService.js";
import { useEffect, useState } from "react";
import { logger } from "../utils/Logger.js";
import "../assets/scss/pages/GameDetailsPage.scss";
import { DetailedGame } from "../models/DetailedGame.js";
import { reviewsService } from "../services/ReviewsService.js";
import GameDetailReview from "../components/GameDetailReview.js";
import CreateReview from "../components/CreateReview.js";

function GameDetailsPage() {
  const { gameId } = useParams<{ gameId: string }>();

  const reviews = AppState.reviews || [];
  const game = AppState.activeGame || null;

  useEffect(() => {
    if (gameId) {
      GetGameById(gameId);
      fetchReviewsByGameId(gameId);
    }
  }, [gameId]);

  async function GetGameById(gameId: string) {
    try {
      logger.log("getting game by id", gameId);
      await gamesService.getGameById(gameId);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function fetchReviewsByGameId(gameId: string) {
    try {
      await reviewsService.fetchReviewsByGameId(gameId);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  const reviewcards = AppState.gameReviews?.slice().reverse().map(review => (
    <GameDetailReview key={review.id} review={review} />
  ));

  return (
    <div className="container-fluid bg-dark text-light py-5 px-md-5 min-vh-100">
      <div className="row g-4">
        <div className="col-md-5">
          {game ? (
            <div className="card bg-dark text-light shadow-sm">
              <img
                src={game.background_image || "placeholder.jpg"}
                className="card-img-top object-fit-cover"
                alt="Game Placeholder"
                style={{ height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">
                  <strong>Release Date:</strong> {game.released || "N/A"}
                </p>
                <p className="card-text">
                  <strong>Description:</strong>{" "}
                  {game.description_raw || "No description available."}
                </p>
                <p className="card-text">
                  <strong>Genres:</strong>{" "}
                  {game.genres
                    ? game.genres.map((genre: any) => genre.name).join(", ")
                    : "N/A"}
                </p>
                <p className="card-text">
                  <strong>Platforms:</strong>{" "}
                  {game.platforms
                    ? game.platforms
                        .map((platform: any) => platform.platform.name)
                        .join(", ")
                    : "N/A"}
                </p>
                <p className="card-text">
                  <strong>ESRB Rating:</strong>{" "}
                  {game.esrb_rating ? game.esrb_rating.name : "N/A"}
                </p>
                <p className="card-text">
                  <strong>Developers:</strong>{" "}
                  {game.developers
                    ? game.developers.map((dev: any) => dev.name).join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <p>Loading game details...</p>
          )}
        </div>

        <div className="col-md-7">
          <div className="card bg-dark text-light shadow-sm">
            <div className="card-body">
              <div className="mb-3">
                <h4 className="mb-2">Player Reviews</h4>
                <p className="mb-2">Want to share your thoughts about this game?</p>
                <button data-bs-toggle="modal" data-bs-target="#createReview" className="btn btn-outline-primary btn-sm">
                  ✍️ Write a Review
                </button>
                <CreateReview />
              </div>

              <div className="row">
                {reviewcards}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(GameDetailsPage);
