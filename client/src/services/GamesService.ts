import { AppState } from "../AppState";
import { Game } from "../models/Game";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class GamesService{
  async fetchGames() {
    const response = await api.get('api/games')
    logger.log('fetching games', response.data)
    const games= response.data.map((gamePOJO:Game) => new Game(gamePOJO))
    AppState.games = games
  }
 
  


}


export const gamesService = new GamesService();