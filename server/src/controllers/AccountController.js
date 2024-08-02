// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ordersService } from "../services/OrdersService.js"
import { restaurantsService } from "../services/RestaurantsService.js"
// Test from Zach

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/orders', this.getOrdersByAccountId)
      .get('/restaurant', this.getRestaurantByAccountId)
      .put('', this.editUserAccount)
  }
  async getRestaurantByAccountId(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const restaurant = await restaurantsService.getRestaurantByAccountId(accountId)
      res.send(restaurant)
    } catch (error) {
      next(error)
    }
  }
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getOrdersByAccountId(req, res, next) {
    try {
      const account = req.userInfo
      const orders = await ordersService.getOrdersByAccountId(account.id)
      res.send(orders)
    } catch (error) {
      next(error)
    }
  }
  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

}
