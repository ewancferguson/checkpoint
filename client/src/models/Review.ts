import { Profile } from "./Account";
import { Game } from "./Game";

export class Review {
  id: string;
  creatorId: string;
  gameId: number;
  body: string
  rating: number
  game: Game
  creator: Profile
  createdAt: Date
  updatedAt: Date
    
  constructor(data: Review) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.gameId = data.gameId;
    this.body = data.body;
    this.rating = data.rating;
    this.game = new Game(data.game);
    this.creator = new Profile(data.creator);
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
}

}