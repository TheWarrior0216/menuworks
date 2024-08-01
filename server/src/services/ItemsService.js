import { dbContext } from "../db/DbContext.js"

class ItemsService {
  async getAllItems() {
    const items = await dbContext.Items.find()
    return items
  }
  async createItem(itemBody) {
    const response = await dbContext.Items.create(itemBody)
    return response
  }
  async getItemById(itemId) {
    const item = await dbContext.Items.findById(itemId)
    return item
  }
}
export const itemsService = new ItemsService()