import { Schema } from "mongoose";

export const FavoriteSchema = new Schema({
  accountId: { type: Schema.ObjectId, required: true, ref: "Account" },
  gameId: { type: Schema.ObjectId, required: true, ref: "Game" },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },

  })



FavoriteSchema.virtual("account", {
  localField: "accountId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

FavoriteSchema.virtual("game", {
  localField: "gameId",
  foreignField: "gameId",
  justOne: true,
  ref: "Game",
});