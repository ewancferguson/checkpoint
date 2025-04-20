import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { GameSchema } from '../models/Game.js';
import { ReviewSchema } from '../models/Review.js';
import { CommentSchema } from '../models/Comment.js';
import { FavoriteSchema } from '../models/Favorite.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Game = mongoose.model('Game', GameSchema);
  Review = mongoose.model('Review', ReviewSchema)
  Comment = mongoose.model('Comment', CommentSchema)
  Favorite = mongoose.model('Favorite', FavoriteSchema)
}

export const dbContext = new DbContext()
