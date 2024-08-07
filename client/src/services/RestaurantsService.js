import { AppState } from "../AppState.js"
import { Restaurant } from "../models/Restaurant.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class RestaurantsService {
  updateSearch(search) {
    AppState.restaurants = null
    AppState.search = search
    this.searchRestaurants()
  }
  async updateRestaurantDetails(editableRestaurantData, restaurantId) {
    const response = await api.put(`api/restaurants/${restaurantId}`, editableRestaurantData)
    logger.log('Updating the restaurant details', response.data)
  }
  async searchRestaurants() {
    const response = await api.get(`api/restaurants/search?name=${AppState.search}`)
    const gotem = response.data.map(pojo => new Restaurant(pojo))
    AppState.restaurants = gotem

  }
  async toggleRestaurantOpen(restaurantId, data) {
    const response = await api.put(`api/restaurants/${restaurantId}/open`, data)
    logger.log(response.data)
    AppState.activeRestaurant.isOpen = !AppState.activeRestaurant.isOpen
  }

  async getRestaurantById(id) {
    AppState.activeRestaurant = null
    this.getDay()
    const response = await api.get(`api/restaurants/${id}`)
    logger.log('got the restaurant', response.data)
    const restaurant = new Restaurant(response.data)
    AppState.activeRestaurant = restaurant
  }

  async getAllRestaurants() {
    this.getDay()
    const response = await api.get(`api/restaurants?query=${AppState.search}`)
    logger.log('Getting all of the restaurants', response.data)
    const restaurants = response.data.map(restaurantData => new Restaurant(restaurantData))
    const spotlightRestaurant = restaurants.find((restaurant) => restaurant.spotlightRestaurant == true)
    AppState.restaurants = restaurants
    AppState.spotlightRestaurant = spotlightRestaurant
  }

  getDay() {
    const date = new Date()
    AppState.currentDay = AppState.weekday[date.getDay()]
    logger.log(AppState.currentDay)
  }

}

export const restaurantsService = new RestaurantsService()