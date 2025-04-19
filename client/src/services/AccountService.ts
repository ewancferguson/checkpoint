import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.ts'
import { api } from './AxiosService.ts'

let fetching = false

class AccountService {
  async updateAccount(accountData: { name: string; picture: string }) {
    const response = await api.put('account', accountData)
    logger.log('updating account', response.data)
    AppState.account = new Account(response.data)
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