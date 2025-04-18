import { dbContext } from '../db/DbContext.js'
class GamesService {

  async getAll() {
    const games = await dbContext.Game.find()
    return games
  }



}

export const gamesService = new GamesService()