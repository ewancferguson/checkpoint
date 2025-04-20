
import { Game } from "../models/Game.js";
import '../assets/scss/pages/HomePage.scss'
import { Link } from "react-router-dom";


export default function GameCard({ game }: { game: Game }) {

  
  
  

  return (
    <div className="col-md-4">
      <div className="mb-3 event-card w-100">
      <div className="d-flex justify-content-center">
        <Link to={`/games/${game.gameId}`} >
          <img src={game.background_image} className="card-img-top card-img mb-3" alt="Event cover image" />
        </Link>
      </div>
        <div className="card-body">
      <h5 className="card-title text-center">{ game.name }</h5>
        </div>
      </div>
    </div>
  )
}
