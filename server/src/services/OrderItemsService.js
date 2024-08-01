import { dbContext } from "../db/DbContext.js"

class OrderItemsService {
  async createOrderItems(orderData) {
    const response = await dbContext.OrderItems.create(orderData)
    await response.populate('item')
    return response
  }
}
export const orderItemsService = new OrderItemsService()