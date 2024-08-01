import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { itemsService } from "../services/ItemsService.js";

export class ItemsController extends BaseController {
  constructor() {
    super('api/items')
    this.router
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createItem)
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
}