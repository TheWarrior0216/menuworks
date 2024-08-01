import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { itemsService } from "../services/ItemsService.js";
import { restaurantsService } from "../services/RestaurantsService.js";

export class ItemsController extends BaseController {
  constructor() {
    super('api/items')
    this.router
      .get('', this.getAllItems)
      .get('/:itemId', this.getItemById)
      .get('/:restrauntId/restaurant', this.getAllItemsByRestaurantId)
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createItem)
      .put('/:itemId', this.changeItem)
      .delete('/:itemId', this.deleteItem)
  }
  async getAllItems(req, res, next) {
    try {
      const items = await itemsService.getAllItems()
      res.send(items)
    } catch (error) {
      next(error)
    }
  }
  async getItemById(req, res, next) {
    try {
      const itemId = req.params.itemId
      const item = await itemsService.getItemById(itemId)
      res.send(item)
    } catch (error) {
      next(error)
    }
  }
  async getAllItemsByRestaurantId(req, res, next) {
    try {
      const restrauntId = req.params.restrauntId
      const item = await restaurantsService.getAllItemsByRestaurantId(restrauntId)
      res.send(item)
    } catch (error) {
      next(error)
    }
  }
  async createItem(request, response, next) {
    try {
      const itemBody = request.body
      const newItem = await itemsService.createItem(itemBody)
      response.send(newItem)
    } catch (error) {
      next(error)
    }
  }
  async changeItem(req, res, next) {
    try {
      const itemId = req.params.itemId
      const itemBody = req.body
      const changedItem = await itemsService.changeItem(itemId, itemBody)
      res.send(changedItem)
    } catch (error) {
      next(error)
    }
  }
  async deleteItem(req, res, next) {
    try {
      const itemId = req.params.itemId
      const message = await itemsService.delteItem(itemId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
}