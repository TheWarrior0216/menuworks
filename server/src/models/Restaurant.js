import { Schema } from "mongoose";

export const RestaurantSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true},
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    description: { type: String, minLength: 15, maxLength: 500, required: true },
    primaryPictureURL: { type: String, required: true },
    breakfastPictureURL: { type: String, required: false },
    location: { type: String, required: true },
    hours: { type: [{}], required: true },
    type: {
        type: String, enum: ["mexican", "indian", "italian", "american", "japanese", "thai", "french", "chinese", "greek", "brazilian", "spanish", "vietnamese", "korean", "african", "caribbean", "cuban", "barbarque", "other"
        ]
    },
    logoURL: { type: String, required: true},
    primaryColor: { type: String, required: true, minLength: 6, maxLength: 8},
    spotlightRestaurant: { type: Boolean, required: true, default: false},
    rating: { type: Number, min: 0, max: 5, required: false},
    yelp: { type: String, required: false}
})



// {
//     "name": "Mcdonalds",
//     "description": "this is a test of the post request for restaurants",
//     "primaryPictureURL": "https://images.unsplash.com/photo-1606720335177-3d04e70fb13b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "location": "21520 Ustick rd caldwell idaho",
//     "hours": [{"open": 2, "close": 3, "day": "monday"},{"open": 2, "close": 3, "day": "tuesday"},{"open": 2, "close": 3, "day": "wednesday"},{"open": 2, "close": 3, "day": "thursday"},{"open": 2, "close": 3, "day": "friday"},{"open": 2, "close": 3, "day": "saturday"},{"open": 2, "close": 3, "day": "sunday"}],
//     "type": "american",
//     "primaryColor": "#000000",
//     "logoURL": "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// }