export class Game {

  gameId: number;
  name: string;
  background_image: string;


  constructor(data: Game) {
    this.gameId = data.gameId;
    this.name = data.name;
    this.background_image = data.background_image;
  }
}