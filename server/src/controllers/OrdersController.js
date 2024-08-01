import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ordersService } from "../services/OrdersService.js";
import { accountService } from "../services/AccountService.js";

export class OrdersController extends BaseController {
  constructor() {
    super('api/orders')
    this.router
      .get('', this.getAllOrders)
      .get('/:orderId', this.getSpecificOrder)
      .use('', Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createOrder)

  }
  async getAllOrders(req, res, next) {
    try {
      const orders = await ordersService.getAllOrders()
      res.send(orders)
    } catch (error) {
      next(error)
    }
  }
  async getSpecificOrder(req, res, next) {
    try {

      const orderId = req.params.orderId
      const order = await ordersService.getSpecificOrder(orderId)
      res.send(order)
    } catch (error) {
      next(error)
    }
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
