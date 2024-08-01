import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ordersService } from "../services/OrdersService.js";

export class OrdersController extends BaseController {
  constructor() {
    super('api/orders')
    this.router
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createOrder)
  }
  async createOrder(req, res, next) {
    try {
      const user = req.userInfo
      const orderData = req.body
      orderData.accountId = user.id
      const order = await ordersService.createOrder(orderData)
      res.send(order)
    } catch (error) {
      next(error)
    }
  }
}
