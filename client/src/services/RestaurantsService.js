import { AppState } from "../AppState.js"
import { Restaurant } from "../models/Restaurant.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class RestaurantsService {

  async getRestaurantsById(id) {
    this.getDay()
    const response = await api.get(`api/restaurants/${id}`)
    logger.log('got the restaurant', response.data)
    const restaurant = new Restaurant(response.data)
    AppState.activeRestaurant = restaurant
  }

  async getAllRestaurants() {
    this.getDay()
    const response = await api.get('api/restaurants')
    logger.log('Getting all of the restaurants', response.data)
    const restaurants = response.data.map(restaurantData => new Restaurant(restaurantData))
    AppState.restaurants = restaurants
  }

  getDay() {
    const date = new Date()
    AppState.currentDay = AppState.weekday[date.getDay()]
    logger.log(AppState.currentDay)
  }

}

export const restaurantsService = new RestaurantsService()