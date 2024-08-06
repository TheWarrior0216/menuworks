export class Item{
    constructor(data){
        this.id = data._id
        this.restaurantId = data.restaurantId
        this.name = data.name
        this.picture = data.picture
        this.price = data.price
        this.description = data.description
        this.isAvailable = data.isAvailable
        this.type = data.type
        this.isDeleted = data.isDeleted
    }
}