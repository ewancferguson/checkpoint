import { AppState } from '../AppState.js'
import { Account, Profile } from '../models/Account.js'
import { logger } from '../utils/Logger.ts'
import { api } from './AxiosService.ts'
import { reviewsService } from './ReviewsService.ts'

let fetching = false

class AccountService {
  async getProfileById(profileId: string) {
    AppState.activeProfile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('getting profile by id', response.data)
    const profile = new Profile(response.data)
    AppState.activeProfile = profile
  }
  async updateAccount(accountData: { name: string; picture: string }) {
    const response = await api.put('account', accountData)
    logger.log('updating account', response.data)
    AppState.account = new Account(response.data)
    reviewsService.getReviewsByUserID(AppState.account.id)
  }
  async getAccount() {
    try {
      if (AppState.account) {
        return AppState.account
      }
      if (fetching) {
        return
      }
      fetching = true
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      fetching = false
      return AppState.account
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???')
      fetching = false
      return null
    }
  }
}

export const accountService = new AccountService()