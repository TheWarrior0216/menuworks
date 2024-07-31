


export class Restaurant {
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.primaryPictureURL = data.primaryPictureURL
        this.breakfastPictureURL = data?.breakfastPictureURL || null
        this.location = data.location
        this.hours = data.hours
        this.type = data.type
        this.logoURL = data.logoURL
        this.primaryColor = data.primaryColor
        this.spotlightRestaurant = data.spotlightRestaurant
        this.rating = data?.rating || null
        this.yelp = data?.yelp || null
    }
}