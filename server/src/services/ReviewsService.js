import { dbContext } from '../db/DbContext.js'
class ReviewsService {

  async createReview(reviewData) {
    const review = (await (await dbContext.Review.create(reviewData)).populate('creator', 'name picture')).populate('game', 'name background_image')
    return review
  }

}


export const reviewsService = new ReviewsService()