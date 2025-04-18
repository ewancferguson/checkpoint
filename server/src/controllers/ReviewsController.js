import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from "../utils/BaseController.js";
import { reviewsService } from "../services/ReviewsService.js";


export class ReviewsController extends BaseController {
  constructor() {
    super('api/reviews')
    this.router
      .get('', this.getAll)
      .get('/:reviewId', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:reviewId', this.editReview)
      .delete('/:reviewId', this.deleteReview)
  }


  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */


  async create(request, response, next) {

    try {
      const reviewData = request.body
      reviewData.creatorId = request.userInfo.id
      const review = await reviewsService.createReview(reviewData)
      response.send(review)
    } catch (error) {
      next(error)
    }

  }

  async getAll(request, response, next) {
    try {
      const reviews = await reviewsService.getAll()
      response.send(reviews)
    } catch (error) {
      next(error)
    }
  }

  async getById(request, response, next) {
    try {
      const reviewId = request.params.reviewId
      const review = await reviewsService.getById(reviewId)
      response.send(review)
    } catch (error) {
      next(error)
    }

  }

  async editReview(request, response, next) {
    try {
      const reviewId = request.params.reviewId
      const reviewData = request.body
      const userId = request.userInfo.id
      const review = await reviewsService.editReview(reviewId, reviewData, userId)
      response.send(review)
    } catch (error) {
      next(error)
    }
  }

  async deleteReview(request, response, next) {
    try {
      const reviewId = request.params.reviewId
      const userId = request.userInfo.id
      const reviewToDelete = await reviewsService.deleteReview(reviewId, userId)
      response.send(reviewToDelete)
    } catch (error) {
      next(error)
    }
  }
}
