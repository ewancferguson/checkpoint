import { observer } from "mobx-react";
import { AppState } from "../AppState.js";
import { useParams } from "react-router-dom";
import Pop from "../utils/Pop.js";
import { gamesService } from "../services/GamesService.js";
import { useEffect, useState } from "react";
import { logger } from "../utils/Logger.js";
import "../assets/scss/pages/GameDetailsPage.scss";
import { DetailedGame } from "../models/DetailedGame.js";

function GameDetailsPage() {
  const { gameId } = useParams<{ gameId: string }>();
  

  const reviews = AppState.reviews || []; // Assuming reviews are in AppState
  const game = AppState.activeGame || null; // Assuming activeGame is in AppState
  useEffect(() => {
    if (gameId) {
      GetGameById(gameId);
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

  return (
    <div className="container-fluid bg-dark text-light py-5 px-md-5 min-vh-100">
      <div className="row g-4">
        <div className="col-md-6">
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
                  <strong>Description:</strong> {game.description_raw || "No description available."}
                </p>
                <p className="card-text">
                  <strong>Genres:</strong> {game.genres? game.genres.map((genre: any) => genre.name).join(", ") : "N/A"}
                </p>
                <p className="card-text">
                  <strong>Platforms:</strong> {game.platforms? game.platforms.map((platform: any) => platform.platform.name).join(", ") : "N/A"}
                </p>
                <p className="card-text">
                  <strong>ESRB Rating:</strong> {game.esrb_rating ? game.esrb_rating.name : "N/A"}
                </p>
                <p className="card-text">
                  <strong>Developers:</strong> {game.developers ? game.developers.map((dev: any) => dev.name).join(", ") : "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <p>Loading game details...</p>
          )}
        </div>

        <div className="col-md-6">
          <div className="card bg-dark text-light shadow-sm">
            <div className="card-body">
              <h4>Player Reviews</h4>
              {reviews.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {reviews.map((review, index) => (
                    <li key={index} className="list-group-item bg-dark text-light border-0">
                      
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(GameDetailsPage);
