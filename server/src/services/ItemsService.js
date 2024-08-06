import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { restaurantsService } from "./RestaurantsService.js"

class ItemsService {
  async getAllItems() {
    const data =  {isDeleted: false}
    const items = await dbContext.Items.find(data)
    return items
  }
  async getItemById(itemId) {
    const item = await dbContext.Items.findById(itemId)
    return item
  }
  async createItem(itemBody, userId) {
    const restaurant = await restaurantsService.getRestaurantById(itemBody.restaurantId)
    if (restaurant.creatorId != userId) {
      throw new Forbidden('you cannot add items to this restaurant')
    }
    const response = await dbContext.Items.create(itemBody)
    return response
  }
  async changeItem(itemId, itemBody) {
    const foundItem = await dbContext.Items.findById(itemId)
    foundItem.name = itemBody.name
    foundItem.picture = itemBody.picture
    foundItem.price = itemBody.price
    foundItem.description = itemBody.description
    foundItem.isAvailable = itemBody.isAvailable
    foundItem.type = itemBody.type
    await foundItem.save()
    return foundItem
  }
  async deleteItem(itemId) {
    const foundItem = await dbContext.Items.findById(itemId)
    foundItem.isDeleted = true
    await foundItem.save()
    return `You have deleted ${foundItem}`
  }
}
export const itemsService = new ItemsService()