import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { GameSchema } from '../models/Game.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Game = mongoose.model('Game', GameSchema);
}

export const dbContext = new DbContext()
