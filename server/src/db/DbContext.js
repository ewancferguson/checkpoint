import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { GameSchema } from '../models/Game.js';
import { ReviewSchema } from '../models/Review.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Game = mongoose.model('Game', GameSchema);
  Review = mongoose.model('Review', ReviewSchema)
}

export const dbContext = new DbContext()
