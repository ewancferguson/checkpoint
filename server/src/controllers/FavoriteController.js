import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js";


export class FavoriteController extends BaseController {
  constructor() {
    super('api/favorites')
    this.router
      .get('/:accountId', this.getByAccountId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:favoriteId', this.delete)
  }



  async getByAccountId(request, response, next) {
    try {
      const accountId = request.params.accountId
      const favorites = await favoritesService.getByAccountId(accountId)
      return response.send(favorites)
    } catch (error) {
      next(error)
    }
  }

  async create(request, response, next) {
    try {
      const favoriteData = request.body
      favoriteData.accountId = request.userInfo.id
      const favorite = await favoritesService.create(favoriteData)
      return response.send(favorite)
    } catch (error) {
      next(error)
    }
  }

  async delete(request, response, next) {
    try {
      const accountId = request.account.id
      const favoriteId = request.params.favoriteId
      await favoritesService.delete(favoriteId, accountId)
      return response.send('deleted')
    } catch (error) {
      next(error)
    }
  }






}