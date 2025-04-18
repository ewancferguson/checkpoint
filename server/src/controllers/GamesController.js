import { gamesService } from '../services/GamesService.js';
import BaseController from "../utils/BaseController.js";


export class GamesController extends BaseController {
  constructor() {
    super('api/games')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
  }

  /**
   * Creates a new album from request body and returns the album
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */


  async getAll(request, response, next) {
    try {
      const games = await gamesService.getAll()
      response.send(games)
    } catch (error) {
      next(error)
    }
  }

  async getById(request, response, next) {
    try {
      const game = await gamesService.getById(request.params.id)
      response.send(game)
    } catch (error) {
      next(error)
    }
  }

}