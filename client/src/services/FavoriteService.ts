import { AppState } from "../AppState";
import { Favorite } from "../models/Favorite";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class FavoriteService {
  async getFavoriteProfiles(gameId: string) {
    logger.log(gameId)
    const response = await api.get(`/api/games/${gameId}/favorites`);
    const favorites = response.data.map((favoritePOJO: any) => new Favorite(favoritePOJO));
    AppState.favoriteProfiles = favorites;
  }

}

export const favoriteService = new FavoriteService();