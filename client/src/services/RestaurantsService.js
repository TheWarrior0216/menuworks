import { AppState } from "../AppState.js"
import { Restaurant } from "../models/Restaurant.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class RestaurantsService {
  async getAllRestaurants() {
    const response = await api.get('api/restaurants')
    logger.log('Getting all of the restaurants', response.data)
    const restaurants = response.data.map(restaurantData => new Restaurant(restaurantData))
    AppState.restaurants = restaurants
  }

}

export const restaurantsService = new RestaurantsService()