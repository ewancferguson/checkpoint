import { dbContext } from "../db/DbContext.js"

class FavoritesService {

  async getByAccountId(accountId) {
    const favorites = await dbContext.Favorite.find({ accountId: accountId }).populate('game')
    return favorites
  }
  async create(favoriteData) {
    const favorite = await dbContext.Favorite.create(favoriteData)
    await favorite.populate('game')
    await favorite.populate('account')
    return favorite
  }

  async delete(favoriteId, userId) {
    const favoriteToDelete = await dbContext.Favorite.findById(favoriteId)

    if (favoriteToDelete == null) {
      throw new Error("Invalid Id");
    }
    if (favoriteToDelete.accountId != userId) {
      throw new Forbidden('Not your favorite')
    }
    await favoriteToDelete.deleteOne()
    return 'favorite gone'
  }


  async getFavorites(gameId) {
    const favorites = await dbContext.Favorite.find({ gameId: gameId }).populate('account')
    return favorites
  }

}


export const favoritesService = new FavoritesService()