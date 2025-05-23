import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.ts"
import { Account, Profile } from './models/Account.js'
import { Identity } from '@bcwdev/auth0provider-client'
import { Game } from "./models/Game.ts"
import { Review } from "./models/Review.ts"
import { DetailedGame } from "./models/DetailedGame.ts"
import { Comment } from "./models/Comment.ts"
import { Favorite } from "./models/Favorite.ts"


class ObservableAppState {

  identity: Identity | null = null
  account: Account | null = null
  games: Game[] | null = null
  reviews: Review[] | null = null
  activeGame: DetailedGame | null = null
  gameReviews: Review[] | null = null
  activeReview: Review | null = null
  profileReviews: Review[] | null = null
  activeProfile: Profile | null = null
  comments: Comment[] | null = null
  favoriteProfiles: Favorite[] | null = null
  profileFavorites: Favorite[] | null = null

  constructor() {
    makeAutoObservable(this)
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop: string) {
    isValidProp(target, prop)
    // @ts-ignore
    return target[prop]
  },
  set(target, prop: string, value) {
    isValidProp(target, prop)
    action(() => {
      // @ts-ignore
      target[prop] = value
    })()
    return true
  }
})