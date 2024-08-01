export class OrderItem{
    constructor(data){
        this.id = data._id
        this.orderId = data.orderId
        this.itemId = data.itemId
        this.quantity = data.quantity
        this.specialInstructions = data.specialInstructions
        this.item = data.item
    }
}