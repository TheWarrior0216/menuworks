import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"

class RestaurantsService {

    async getAllRestaurants() {
        const restaurants = await dbContext.Restaurant.find()
        return (restaurants)
    }

    async createRestaurant(restaurantData) {
        logger.log("creating restaurant")
        const restaurant = await dbContext.Restaurant.create(restaurantData)
        logger.log(restaurant)
        return (restaurant)
    }

}
export const restaurantsService = new RestaurantsService()