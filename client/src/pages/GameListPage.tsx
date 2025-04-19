import { useEffect } from "react";
import { AppState } from "../AppState"
import GameCard from "../components/Gamecard"
import { gamesService } from "../services/GamesService";
import Pop from "../utils/Pop";
import { observer } from "mobx-react";

function AboutPage() {

  const gamecards = AppState.games?.map(game => <GameCard key={game.gameId} game={game} />) 


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
    <div className="container">
      <h2>Browse All Games</h2>
      <div className="row mt-3">
        {gamecards}
      </div>
    </div>
  )
}


export default observer(AboutPage)