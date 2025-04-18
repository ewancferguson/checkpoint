import { dbContext } from '../db/DbContext.js'
class ReviewsService {

  async createReview(reviewData) {
    const review = (await (await dbContext.Review.create(reviewData)).populate('creator', 'name picture')).populate('game', 'name background_image')
    return review
  }

  async getAll() {
    const reviews = await dbContext.Review.find().populate('creator', 'name picture').populate('game', 'name background_image')
    return reviews
  }

}


export const reviewsService = new ReviewsService()