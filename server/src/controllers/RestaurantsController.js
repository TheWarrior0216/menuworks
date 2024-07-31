import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { restaurantsService } from "../services/RestaurantsService.js";
import { logger } from "../utils/Logger.js";

export class RestaurantsController extends BaseController{
    constructor(){
        super('api/restaurants')
        this.router
            .use('', Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createRestaurant)
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
        catch (error){
            next(error)
        }
    }
}