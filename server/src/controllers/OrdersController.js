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
      .put('/:orderId', this.changeOrder)
      .post('', this.createOrder)
      .delete('/:orderId', this.decimateOrder)
      .delete('/:orderId/delete', this.realDeleteOrder)

  }
  async realDeleteOrder(req, res, next) {
    try {
      const orderId = req.params.orderId
      const userInfo = req.userInfo
      await ordersService.realDeleteOrder(userInfo.id, orderId)
      res.send('deleted')
    }
    catch (error){
      next(error)
    }
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
  async changeOrder(req, res, next) {
    try {
      const orderData = req.body
      const orderId = req.params.orderId
      const changedOrder = await ordersService.changeOrder(orderId, orderData)
      res.send(changedOrder)
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
  async decimateOrder(req, res, next) {
    try {
      const userId = req.userInfo.Id
      const orderId = req.params.orderId
      const message = await ordersService.decimateOrder(userId, orderId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
