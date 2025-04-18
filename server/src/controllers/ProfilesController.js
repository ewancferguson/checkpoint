import { profileService } from '../services/ProfileService.js'
import { reviewsService } from '../services/ReviewsService.js'
import BaseController from '../utils/BaseController.js'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:id/reviews', this.getProfileReviews)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getProfileReviews(request, response, next) {
    try {
      const profileId = request.params.id
      const reviews = await reviewsService.getProfileReviews(profileId)
      response.send(reviews)
    } catch (error) {
      next(error)
    }
  }
}
