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

}
export const itemsService = new ItemsService()