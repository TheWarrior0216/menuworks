export class Order{
    constructor(data){
        this.id = data._id
        this.accountId = data.accountId
        this.restaurantId = data.restaurantId
        this.placed = data.placed
        this.completed = data.completed
        this.createdAt = data.createdAt
        this.profile = data.profile || null
        this.restaurant = data.restaurant || null
        this.items = data.orderItem || null
    }
}