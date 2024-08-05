import { capitalize } from "vue"



export class Restaurant {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = capitalize(data.name)
        this.description = capitalize(data.description)
        this.primaryPictureURL = data.primaryPictureURL
        this.breakfastPictureURL = data?.breakfastPictureURL || null
        this.location = capitalize(data.location)
        this.hours = data.hours
        this.type = capitalize(data.type)
        this.logoURL = data.logoURL
        this.primaryColor = data.primaryColor
        this.spotlightRestaurant = data.spotlightRestaurant
        this.rating = data?.rating || null
        this.yelp = data?.yelp || null
        this.isOpen = data.isOpen || false
    }
}