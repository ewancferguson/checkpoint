import { Profile } from "./Account";
import { Game } from "./Game";

export class Favorite {
  id: string;
  accountId: string;
  gameId: number;
  game: Game | null;
  account: Profile | null;
  constructor(data: Favorite) {
    this.id = data.id;
    this.accountId = data.accountId;
    this.gameId = data.gameId;
    this.account = data.account ? new Profile(data.account) : null;
    this.game = data.game ? new Game(data.game) : null;
  }
  
}