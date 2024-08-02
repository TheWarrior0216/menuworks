import { AppState } from "../AppState.js"

export class OrderItem{
    constructor(data){
        this.id = data._id || AppState.idNum++
        this.orderId = data.orderId
        this.itemId = data.itemId
        this.quantity = data.quantity
        this.specialInstructions = data.specialInstructions
        this.item = data.item || null
    }
}