import { observer } from "mobx-react";
import { AppState } from "../AppState.js";
import { Game } from "../models/Game.js";
import '../assets/scss/pages/HomePage.scss'


export default function GameCard({ game }: { game: Game }) {

  
  
  

  return (
    <div className="col-md-4">
      <div className="mb-3 event-card" style={{ width: "20rem" }}>
      <div>
        <img src={game.background_image} className="card-img-top card-img mb-3" alt="Event cover image" />
      </div>
        <div className="card-body">
      <h5 className="card-title">{ game.name }</h5>
        </div>
      </div>
    </div>
  )
}
