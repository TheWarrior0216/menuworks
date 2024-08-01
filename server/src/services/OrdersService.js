import { dbContext } from "../db/DbContext.js"

class OrdersService {
  async createOrder(orderData) {
    const order = await dbContext.Orders.create(orderData)
    return order
  }

}
export const ordersService = new OrdersService