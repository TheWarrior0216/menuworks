import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class RestaurantsService {

    async getAllItemsByRestaurantId(itemId) {
        const items = await dbContext.Items.find({ restaurantId: itemId })
        return items
    }

    async getAllOrdersByRestaurantId(id) {
        const orders = await dbContext.Orders.find({ restaurantId: id }).populate('profile orderItem')
        return orders
    }

    async getItemsByRestaurantId(itemId) {
        const items = await dbContext.Items.find({ restaurantId: itemId, isDeleted: false })
        return items
    }

    async editRestaurant(restaurantId, editData, userId) {
        const restaurantToEdit = await this.getRestaurantById(restaurantId)
        console.log(editData)
        if (restaurantToEdit.creatorId != userId) {
            throw new Forbidden('You cannot edit this restaurant')
        }
        restaurantToEdit.name = editData.name || restaurantToEdit.name
        restaurantToEdit.description = editData.description || restaurantToEdit.description
        restaurantToEdit.primaryPictureURL = editData.primaryPictureURL || restaurantToEdit.primaryPictureURL
        restaurantToEdit.breakfastPictureURL = editData.breakfastPictureURL || restaurantToEdit.breakfastPictureURL
        restaurantToEdit.location = editData.location || restaurantToEdit.location
        restaurantToEdit.hours = editData.hours || restaurantToEdit.hours
        restaurantToEdit.type = editData.type || restaurantToEdit.type
        restaurantToEdit.logoURL = editData.logoURL || restaurantToEdit.logoURL
        restaurantToEdit.primaryColor = editData.primaryColor || restaurantToEdit.primaryColor
        restaurantToEdit.spotlightRestaurant = editData.spotlightRestaurant || restaurantToEdit.spotlightRestaurant
        restaurantToEdit.yelp = editData.yelp || restaurantToEdit.yelp
        await restaurantToEdit.save()
        return (restaurantToEdit)
    }

    async deleteRestaurant(userId, restaurantId) {
        const restaurantToDelete = await this.getRestaurantById(restaurantId)
        if (restaurantToDelete.creatorId != userId) {
            logger.log("userId: ", userId)
            logger.log("restaurantCreatorId: ", restaurantToDelete.creatorId)
            throw new Forbidden()
        }
        await restaurantToDelete.deleteOne()
        return ("deleted successfully")
    }

    async getAllRestaurants() {
        const restaurants = await dbContext.Restaurant.find()
        return (restaurants)
    }
    async searchRestaurants(name = '') {
        const filter = new RegExp(name, 'ig')
        return await dbContext.Restaurant
            .aggregate([{
                $match: { name: filter }
            }])
            .collation({ locale: 'en_US', strength: 1 })
            .exec()
    }

    async getRestaurantById(id) {
        const restaurant = await dbContext.Restaurant.findById(id)
        if (restaurant == undefined) {
            throw new BadRequest(`No restaurant found with id ${id}`)
        }
        return (restaurant)
    }

    async createRestaurant(restaurantData) {
        const restaurant = await dbContext.Restaurant.create(restaurantData)
        logger.log(restaurant)
        return (restaurant)
    }
    async getRestaurantByAccountId(accountId) {
        const restaurant = await dbContext.Restaurant.find({ creatorId: accountId })
        return restaurant
    }

    async toggleRestaurantOpen(restaurantId, editData, userId) {
        const restaurantToEdit = await this.getRestaurantById(restaurantId)
        console.log(editData)
        if (restaurantToEdit.creatorId != userId) {
            throw new Forbidden('You cannot edit this restaurant')
        }
        restaurantToEdit.isOpen = editData.isOpen
        await restaurantToEdit.save()
        return (restaurantToEdit)
    }

}
export const restaurantsService = new RestaurantsService()