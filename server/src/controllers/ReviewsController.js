import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { reviewsService } from "../services/ReviewsService.js";





export class ReviewsController extends BaseController {
  constructor() {
    super('api/reviews')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)

  }

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
}
