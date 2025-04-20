import { AppState } from "../AppState";
import { DetailedGame } from "../models/DetailedGame";
import { Game } from "../models/Game";
import { logger } from "../utils/Logger";
import { api, rawgApi } from "./AxiosService";

class GamesService{



  async getGameById(gameId: string) {
    AppState.activeGame = null
    const response = await rawgApi.get(`games/${gameId}`)
    logger.log('getting game by id', response.data)
    const game = new DetailedGame(response.data)
    AppState.activeGame = game
    logger.log('active game', AppState.activeGame)
  }



  async fetchGames() {
    const response = await api.get('api/games')
    logger.log('fetching games', response.data)
    const games= response.data.map((gamePOJO:Game) => new Game(gamePOJO))
    AppState.games = games
  }
 
  


}


export const gamesService = new GamesService();