import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class RestaurantsService {
    async deleteRestaurant(userId, restaurantId) {
        const restaurantToDelete =  await this.getRestaurantById(restaurantId)
        if(restaurantToDelete.creatorId != userId)
        {
            logger.log("userId: ", userId)
            logger.log("restaurantCreatorId: ", restaurantToDelete.creatorId)
            throw new Forbidden()
        }
        await restaurantToDelete.deleteOne()
        return("deleted successfully")
    }

    async getAllRestaurants() {
        const restaurants = await dbContext.Restaurant.find()
        return (restaurants)
    }

    async getRestaurantById(id) {
        const restaurant = await dbContext.Restaurant.findById(id)
        return (restaurant)
    }

    async createRestaurant(restaurantData) {
        const restaurant = await dbContext.Restaurant.create(restaurantData)
        logger.log(restaurant)
        return (restaurant)
    }

}
export const restaurantsService = new RestaurantsService()