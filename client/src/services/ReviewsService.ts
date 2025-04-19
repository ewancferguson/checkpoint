import { AppState } from "../AppState";
import { Review } from "../models/Review";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class ReviewsService {
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