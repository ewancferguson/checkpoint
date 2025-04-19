export class DetailedGame {
  id: number;
  name: string;
  background_image: string;
  description_raw: string;
  esrb_rating: any;
  released: string;
  developers: any;
  genres: any;
  platforms: any;


  constructor(data: DetailedGame) {
    this.id = data.id;
    this.name = data.name;
    this.background_image = data.background_image;
    this.description_raw = data.description_raw;
    this.esrb_rating = data.esrb_rating;
    this.released = data.released;
    this.developers = data.developers;
    this.genres = data.genres;
    this.platforms = data.platforms;
  }
}