import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { orderItemsService } from "../services/OrderItemsService.js";


export class OrderItemsController extends BaseController {
  constructor() {
    super('api/orderItems')
    this.router
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createOrderItems)
  }
  async createOrderItems(req, res, next) {
    try {
      const orderData = req.body
      const orderItem = await orderItemsService.createOrderItems(orderData)
      res.send(orderItem)
    } catch (error) {
      next(error)
    }
  }
}