import { Item } from "../models/Item.js"
import { api } from "./AxiosService.js"

class ItemsService{

    async getItemsByRestaurantId(id) {
        const response = await api.get(`api/items/${id}`)
        const items = response.data.map((itemData)=>{new Item(itemData)})
        
    }

}
export const itemsService = new ItemsService()