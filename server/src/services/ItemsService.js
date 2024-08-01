import { dbContext } from "../db/DbContext.js"

class ItemsService {
  async createItem(itemBody) {
    const response = await dbContext.Items.create(itemBody)
    return (response)
  }

}
export const itemsService = new ItemsService()