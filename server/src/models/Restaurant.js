import { Schema } from "mongoose";

export const RestaurantSchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    description: { type: String, minLength: 15, maxLength: 500, required: true },
    primaryPicture: { type: URL, required: true },
    breakfastPicture: { type: URL, required: false },
    location: { type: String, required: true },
    hours: { type: [{}], required: true },
    type: {
        type: String, enum: ["mexican", "indian", "italian", "american", "japanese", "thai", "french", "chinese", "greek", "brazilian", "spanish", "vietnamese", "korean", "african", "caribbean", "cuban", "barbarque", "other"
        ]
    },
    logo: { type: URL, required: true},
    primaryColor: { type: String, required: true, minLength: 6, maxLength: 8},
    spotlightRestaurant: { type: Boolean, required: true, default: false},
    rating: { type: Number, min: 0, max: 5, required: false},
    yelp: { type: URL, required: false}
})