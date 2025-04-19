import { App } from "../App";
import { AppState } from "../AppState";
import { Review } from "../models/Review";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ReviewsService {
  async getReviewsByUserID(id: string | undefined) {
    AppState.profileReviews = []
    const response = await api.get(`api/profiles/${id}/reviews`)
    logger.log('getting reviews by user id', response.data)
    const reviews = response.data.map((reviewPOJO: any) => new Review(reviewPOJO))
    logger.log('[REVIEWS after mapping]', reviews)
    AppState.profileReviews = reviews
  }
  async deleteReview(reviewId: string) {
    const response = await api.delete(`api/reviews/${reviewId}`)
    logger.log('deleting review', response.data)
    const index = AppState.gameReviews?.findIndex(review => review.id === reviewId)
    const index2 = AppState.reviews?.findIndex(review => review.id === reviewId)
    const index3 = AppState.profileReviews?.findIndex(review => review.id === reviewId)
    AppState.gameReviews?.splice(index!, 1)
    AppState.reviews?.splice(index2!, 1)
    AppState.profileReviews?.splice(index3!, 1)
  }
  async updateReview(reviewId: string, reviewData: { body: string; rating: number; }) {
    const response = await api.put(`api/reviews/${reviewId}`, reviewData)
    AppState.activeReview = new Review(response.data)
  }
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