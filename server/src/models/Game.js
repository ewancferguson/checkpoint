import { Schema } from "mongoose";

export const GameSchema = new Schema({
  gameId: { type: Number, required: true },
  name: { type: String, required: true },
  backgroundImage: { type: String, required: true },
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })