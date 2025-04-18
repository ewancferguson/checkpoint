import { dbContext } from '../db/DbContext.js'
class GamesService {

  async getAll() {
    const games = await dbContext.Game.find()
    return games
  }

  async getById(gameId) {
    const game = (await dbContext.Game.findOne({ gameId: gameId }))
    if (!game) {
      throw new Error('Game not found')
    }
    return game
  }

}

export const gamesService = new GamesService()