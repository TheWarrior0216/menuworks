import { AppState } from "../AppState.js"
import { OrderItem } from "../models/OrderItem.js"
import { logger } from "../utils/Logger.js"

class OrderItemsService {

    createOrderItem(quantity, id, specialInstructions, item) {
        const orderItemData = {
            itemId: id,
            orderId: AppState.activeOrder.id,
            quantity: quantity,
            specialInstructions: specialInstructions,
            item: item
        }
        const orderItem = new OrderItem(orderItemData)
        logger.log(orderItem)
        AppState.orderItems.push(orderItem)
        logger.log(AppState.orderItems)
    }
}
export const orderItemsService = new OrderItemsService()