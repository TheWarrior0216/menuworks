import { dbContext } from "../db/DbContext.js"

class OrdersService {
  async getAllOrders() {
    const orders = await dbContext.Orders.find()
    return orders
  }
  async getOrdersByAccountId(accountId) {
    const orders = await dbContext.Orders.find({ accountId: accountId })
    return orders
  }
  async getSpecificOrder(orderId) {
    const order = await dbContext.Orders.findById(orderId)
    return order
  }
  async createOrder(orderData) {
    const order = await dbContext.Orders.create(orderData)
    return order
  }

}
export const ordersService = new OrdersService