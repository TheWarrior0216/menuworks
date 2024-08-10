import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { itemsService } from "./ItemsService.js"
import { ordersService } from "./OrdersService.js"
import { restaurantsService } from "./RestaurantsService.js"

class OrderItemsService {
  async decimateOrderItem(orderData) {
    const res = await dbContext.OrderItems.findById(orderData)
    await res.deleteOne()
    return 'Deleted'
  }
  async editCount(Id, body) {
    const res = await dbContext.OrderItems.findById(Id)
    res.quantity = body.quantity
    res.specialInstructions = body.specialInstructions
    await res.save()
    await res.populate('item')
    return res
  }
  async getAllOrderItems() {
    const res = await dbContext.OrderItems.find().populate('item')
    return res
  }
  async getOrderItemById(orderId) {
    const res = await dbContext.OrderItems.findById(orderId).populate('item')
    return res
  }
  async createOrderItems(orderData) {
    const order = await ordersService.getSpecificOrder(orderData.orderId)
    const items = await restaurantsService.getItemsByRestaurantId(order.restaurantId)
    if(items.find((item)=>{item._id != orderData.itemId})){
      throw new Forbidden('item not on restaurant')
    }
    const response = await dbContext.OrderItems.create(orderData)
    await response.populate('item')
    return response
  }
}
export const orderItemsService = new OrderItemsService()