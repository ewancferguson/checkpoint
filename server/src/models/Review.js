import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  body: { type: String, required: true, minlength: 1, maxLength: 1000 },
  rating: { type: Number, min: 0, max: 5, required: true },
  gameId: {
    type: Number, required: true, ref: 'Game', match: /^gameId$/
  }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })


ReviewSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
ReviewSchema.virtual('game', {
  localField: 'gameId',
  foreignField: 'gameId',
  justOne: true,
  ref: 'Game'
})