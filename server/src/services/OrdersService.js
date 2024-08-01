import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class OrdersService {
  async decimateOrder(userId, orderId) {
    const order = await dbContext.Orders.findById(orderId)
    if (order.completed || order.isCancelled == true) throw new BadRequest('Already Completed')
    if (order.placed == true) order.isCancelled = true
    await order.deleteOne()
    return 'Deleted Order'
  }
  async changeOrder(orderId, orderData) {
    const foundOrder = await dbContext.Orders.findById(orderId)
    foundOrder.placed = orderData.placed
    foundOrder.completed = orderData.completed
    await foundOrder.save()
    return foundOrder
  }
  async getAllOrders() {
    const orders = await dbContext.Orders.find().populate('profile restaurant')
    return orders
  }
  async getOrdersByAccountId(accountId) {
    const orders = await dbContext.Orders.find({ accountId: accountId }).populate('restaurant')
    return orders
  }
  async getSpecificOrder(orderId) {
    const order = await dbContext.Orders.findById(orderId).populate('profile restaurant')
    return order
  }
  async createOrder(orderData) {
    const order = await dbContext.Orders.create(orderData)
    await order.populate('profile restaurant')
    return order
  }

}
export const ordersService = new OrdersService