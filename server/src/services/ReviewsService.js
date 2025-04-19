import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
class ReviewsService {

  async createReview(reviewData) {
    const review = (await (await dbContext.Review.create(reviewData)).populate('creator', 'name picture')).populate('game', 'name background_image')
    return review
  }

  async getAll() {
    const reviews = await dbContext.Review.find().populate('creator', 'name picture').populate('game', 'name background_image')
    return reviews
  }

  async getById(reviewId) {
    const review = (await (await dbContext.Review.findById(reviewId)).populate('creator', 'name picture')).populate('game', 'name background_image')
    return review
  }


  async editReview(reviewId, reviewData, userId) {
    const review = await dbContext.Review.findById(reviewId)
    if (review.creatorId != userId) {
      throw new Forbidden('You are not the creator of this review')
    }
    if (reviewData.body) review.body = reviewData.body ?? review.body
    if (reviewData.rating) review.rating = reviewData.rating ?? review.rating
    await review.save()
    const populatedReview = await dbContext.Review.findById(reviewId).populate('creator', 'name picture').populate('game', 'name background_image')

    return populatedReview
  }

  async deleteReview(reviewId, userId) {
    const review = await dbContext.Review.findById(reviewId)
    if (!review) {
      throw new Error('Review not found')
    }
    if (review.creatorId != userId) {
      throw new Forbidden('You are not the creator of this review')
    }
    await review.deleteOne()
    return 'Review deleted'
  }

  async getReviewsByGameId(gameId) {
    const reviews = await dbContext.Review.find({ gameId: gameId }).populate('creator', 'name picture').populate('game', 'name background_image')
    return reviews
  }


  async getProfileReviews(profileId) {
    const reviews = await dbContext.Review.find({ creatorId: profileId }).populate('creator', 'name picture').populate('game', 'name background_image')
    return reviews
  }

}

export const reviewsService = new ReviewsService()