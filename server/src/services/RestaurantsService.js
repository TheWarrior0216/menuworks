import { logger } from "../utils/Logger.js"

class RestaurantsService {
    async createRestaurant(restaurantData) {
        logger.log(restaurantData)
    }

}
export const restaurantsService = new RestaurantsService()