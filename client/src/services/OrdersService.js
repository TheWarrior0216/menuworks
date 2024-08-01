import { AppState } from "../AppState.js"
import { Order } from "../models/Order.js"
import { logger } from "../utils/Logger.js"

class OrdersService{

    createOrder(restaurantId) {
        const orderData = {
            _id: 1234567,
            accountId: AppState.account.id,
            restaurantId: restaurantId,
            placed: false,
            completed: false,
            createdAt: new Date()
        }
        const order =  new Order(orderData)
        logger.log(order)
        AppState.activeOrder = order
    }

}
export const ordersService = new OrdersService()