import { App } from "../App";
import { AppState } from "../AppState";
import { Review } from "../models/Review";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ReviewsService {
  async getReviewById(ReviewId: string) {
    AppState.activeReview = null
    const response = await api.get(`api/reviews/${ReviewId}`)
    logger.log('getting review by id', response.data)
    const review = new Review(response.data)
    AppState.activeReview = review
  }
  async createReview(reviewData: object) {
    const response = await api.post('api/reviews', reviewData)
    logger.log('creating review', response)
    AppState.gameReviews?.push(new Review(response.data))
  }
  async fetchReviewsByGameId(gameId: string) {
    AppState.gameReviews = []
    const response = await api.get(`api/games/${gameId}/reviews`)
    logger.log('[REVIEWS]', response.data)
    const reviews = response.data.map((reviewPOJO: any) => new Review(reviewPOJO))
    logger.log('[REVIEWS after mapping]', reviews)
    AppState.gameReviews = reviews
  }
  async fetchReviews() {
    const response = await api.get('api/reviews')
    logger.log('[REVIEWS]', response.data)
    const reviews = response.data.map((reviewPOJO: any) => new Review(reviewPOJO))
    logger.log('[REVIEWS after mapping]', reviews)
    AppState.reviews = reviews
    logger.log('[REVIEWS appstate]', AppState.reviews)
  }
  
}

export const reviewsService = new ReviewsService();