import { AppState } from "../AppState";
import { Favorite } from "../models/Favorite";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class FavoriteService {
  async getFavoritesByProfile(profileId: string | undefined) {
    AppState.profileFavorites = []
    const response = await api.get(`api/profiles/${profileId}/favorites`)
    const favorites = response.data.map((favoritePOJO: any) => new Favorite(favoritePOJO))
    AppState.profileFavorites = favorites
  }
  async deleteFavorite(favoriteId: string | undefined) {
    const response = await api.delete(`api/favorites/${favoriteId}`)
    const favoriteIndex = AppState.favoriteProfiles?.findIndex(favorite => favorite.id == favoriteId)
      AppState.favoriteProfiles?.splice(favoriteIndex!, 1);
  }
  async createFavorite(gameData: { gameId: string | undefined; }) {
    const response = await api.post('api/favorites', gameData)
    const favorite = new Favorite(response.data)
    AppState.favoriteProfiles?.push(favorite)
  }
  async getFavoriteProfiles(gameId: string) {
    logger.log(gameId)
    const response = await api.get(`/api/games/${gameId}/favorites`);
    const favorites = response.data.map((favoritePOJO: any) => new Favorite(favoritePOJO));
    AppState.favoriteProfiles = favorites;
  }

}

export const favoriteService = new FavoriteService();