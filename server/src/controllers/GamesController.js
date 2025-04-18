import { gamesService } from '../services/GamesService.js';
import { reviewsService } from '../services/ReviewsService.js';
import BaseController from "../utils/BaseController.js";


export class GamesController extends BaseController {
  constructor() {
    super('api/games')
    this.router
      .get('', this.getAll)
      .get('/:gameId', this.getById)
      .get('/:gameId/reviews', this.getReviewsByGameId)
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
      const gameId = request.params.gameId
      const game = await gamesService.getById(gameId)
      response.send(game)
    } catch (error) {
      next(error)
    }
  }

  async getReviewsByGameId(request, response, next) {
    try {
      const gameId = request.params.gameId
      const reviews = await reviewsService.getReviewsByGameId(gameId)
      response.send(reviews)
    } catch (error) {
      next(error)
    }
  }

}