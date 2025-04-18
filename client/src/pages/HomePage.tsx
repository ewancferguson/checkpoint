import { useEffect, useState } from "react";
import '../assets/scss/pages/HomePage.scss'
import Pop from "../utils/Pop";
import { gamesService } from "../services/GamesService";
import { AppState } from "../AppState";
import Gamecard from "../components/Gamecard";

export default function HomePage() {
  const [count, setCount] = useState(0)
  const games = AppState.games?.slice(0, 6).map(game => <Gamecard key={game.gameId} game={game} />)


  useEffect(() => {
    fetchGames()
  }, [])
  
  
  async function fetchGames() {
    try {
      await gamesService.fetchGames()
    }
    catch (error: any){
      Pop.error(error);
    }
  }



  return (
    <div className="bg-dark">
      <div className="container-fluid bg-hero d-flex flex-column justify-content-center">
        <div className="row p-md-5 mt-md-5 text-bg kanit-regular text-md-start text-center">
          <div className="col-12">
            <h2 className="">Player-powered reviews you can trust</h2>
          </div>
          <div className="col-md-6 col-12">
            <h4>
            Whether you're into RPGs, shooters, or indie gems, thousands of gamers are sharing reviews and insights on our platform. New opinions drop daily—log in, rate, and join the conversation.
            </h4>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h4>Browse Games</h4>
            <div className="row">
              {games}
            </div>
      </div>
  </div>
  )}