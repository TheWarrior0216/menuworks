import { AppState } from "../AppState.js"
import { Item } from "../models/Item.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class ItemsService {

    async deleteItem(id) {
        const confirm = await Pop.confirm("are you sure you want to delete this item")
        if(confirm){
        const response = await api.delete(`api/items/${id}`)
        Pop.success('Item Deleted')
    }
    }

    async createItem(newItemData) {

        const response = await api.post(`api/items`, newItemData)
        logger.log(response.data)
        AppState.items.push(response.data)

    }
    decrease() {
        AppState.quantity--
    }
    increase() {
        AppState.quantity++
    }

    setActiveItem(itemProp) {
        AppState.activeItem = itemProp
        AppState.quantity = 1
    }

    async getItemsByRestaurantId(id) {
        const response = await api.get(`api/items/${id}/restaurant`)
        const items = response.data.map((itemData) => new Item(itemData))
        AppState.items = items
        logger.log(items)
    }

}
export const itemsService = new ItemsService()