import { dbContext } from "../db/DbContext.js"

class OrderItemsService {
  async getAllOrderItems() {
    const res = await dbContext.OrderItems.find().populate('item')
    return res
  }
  async getOrderItemById(orderId) {
    const res = await dbContext.OrderItems.findById(orderId).populate('item')
    return res
  }
  async createOrderItems(orderData) {
    const response = await dbContext.OrderItems.create(orderData)
    await response.populate('item')
    return response
  }
}
export const orderItemsService = new OrderItemsService()