import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { orderItemsService } from "../services/OrderItemsService.js";


export class OrderItemsController extends BaseController {
  constructor() {
    super('api/orderItems')
    this.router
      .get('', this.getAllOrderItems)
      .get('/:orderItemId', this.getOrderItemById)
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createOrderItems)
      .put('/:orderItemId', this.editCount)
  }
  async getAllOrderItems(req, res, next) {
    try {
      const orderItems = await orderItemsService.getAllOrderItems()
      res.send(orderItems)
    } catch (error) {
      next(error)
    }
  }
  async getOrderItemById(req, res, next) {
    try {
      const orderId = req.params.orderItemId
      const orderItem = await orderItemsService.getOrderItemById(orderId)
      res.send(orderItem)
    } catch (error) {
      next(error)
    }
  }
  async editCount(req, res, next) {
    try {
      const Id = req.params.orderItemId
      const body = req.body
      const response = await orderItemsService.editCount(Id, body)
      res.send(response)
    } catch (error) {
      next(error)
    }
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