import { Profile } from "./Account";
import { Game } from "./Game";

export class Favorite {
  id: string;
  accountId: string;
  gameId: number;
  game: Game;
  account: Profile;
  constructor(data: Favorite) {
    this.id = data.id;
    this.accountId = data.accountId;
    this.gameId = data.gameId;
    this.game = new Game(data.game);
    this.account = new Profile(data.account);
  }
}