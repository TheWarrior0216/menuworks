export class OrderItem{
    constructor(data){
        this.id = data._id || 1234567890
        this.orderId = data.orderId
        this.itemId = data.itemId
        this.quantity = data.quantity
        this.specialInstructions = data.specialInstructions
        this.item = data.item || null
    }
}