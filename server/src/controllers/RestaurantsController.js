import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { restaurantsService } from "../services/RestaurantsService.js";
import { logger } from "../utils/Logger.js";
import { ordersService } from "../services/OrdersService.js";

export class RestaurantsController extends BaseController {
    constructor() {
        super('api/restaurants')
        this.router
            .get('', this.getAllRestaurants)
            .get('/search', this.searchRestaurants)
            .get('/:restaurantId', this.getRestaurantById)
            .get('/:restaurantId/orders', this.getRestaurantOrders)
            .use('', Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createRestaurant)
            .put('/:restaurantId', this.editRestaurant)
            .delete('/:restaurantId', this.deleteRestaurant)
            .put('/:restaurantId/open', this.toggleRestaurantOpen)
    }

    async toggleRestaurantOpen(request, response, next) {
        try {
            const restaurantId = request.params.restaurantId
            const editData = request.body
            const userId = request.userInfo.id
            const orders = await restaurantsService.toggleRestaurantOpen(restaurantId, editData, userId)
            response.send(orders)
        }
        catch (error) {
            next(error)
        }
    }

    async getRestaurantOrders(request, response, next) {
        try {
            const restaurantId = request.params.restaurantId
            const orders = await restaurantsService.getAllOrdersByRestaurantId(restaurantId)
            response.send(orders)
        }
        catch (error) {
            next(error)
        }
    }

    async editRestaurant(request, response, next) {
        try {
            const restaurantId = request.params.restaurantId
            const editData = request.body
            const userId = request.userInfo.id
            const restaurant = await restaurantsService.editRestaurant(restaurantId, editData, userId)
            response.send(restaurant)
        }
        catch (error) {
            next(error)
        }
    }

    async getRestaurantById(request, response, next) {
        try {
            const id = request.params.restaurantId
            const restaurant = await restaurantsService.getRestaurantById(id)
            response.send(restaurant)
        }
        catch (error) {
            next(error)
        }
    }

    async deleteRestaurant(request, response, next) {
        try {
            const userId = request.userInfo.id
            const restaurantId = request.params.restaurantId
            const message = await restaurantsService.deleteRestaurant(userId, restaurantId)
            response.send(message)
        }
        catch (error) {
            next(error)
        }
    }

    async getAllRestaurants(request, response, next) {
        try {
            const restaurants = await restaurantsService.getAllRestaurants()
            response.send(restaurants)
        }
        catch (error) {
            next(error)
        }
    }
    async searchRestaurants(request, response, next) {
        try {
            const searchQuery = request.query
            // logger.log(searchQuery)
            const restaurants = await restaurantsService.searchRestaurants(searchQuery.name)
            response.send(restaurants)
        }
        catch (error) {
            next(error)
        }
    }

    async createRestaurant(request, response, next) {
        try {
            const restaurantData = request.body
            const userInfo = request.userInfo
            restaurantData.creatorId = userInfo.id
            logger.log('resturant data constructed')
            const restaurant = await restaurantsService.createRestaurant(restaurantData)
            response.send(restaurant)
        }
        catch (error) {
            next(error)
        }
    }
}