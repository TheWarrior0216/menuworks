import { Schema } from "mongoose";

export const RestaurantSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true },
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    description: { type: String, minLength: 15, maxLength: 500, required: true },
    primaryPictureURL: { type: String, required: true },
    breakfastPictureURL: { type: String, required: false },
    location: { type: String, required: true },
    hours: {
        type: [{
            open: { type: String },
            closed: { type: String },
            day: { type: String },
        }], required: true
    },
    type: {
        type: String, enum: ["mexican", "indian", "italian", "american", "japanese", "thai", "french", "chinese", "greek", "brazilian", "spanish", "vietnamese", "korean", "african", "caribbean", "cuban", "barbarque", "other"
        ], lowercase: true
    },
    logoURL: { type: String, required: true },
    primaryColor: { type: String, required: true, minLength: 6, maxLength: 8 },
    spotlightRestaurant: { type: Boolean, required: true, default: false },
    rating: { type: Number, min: 0, max: 5, required: false },
    yelp: { type: String, required: false },
    isOpen: { type: Boolean, required: true, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })



// {
//     "name": "Mcdonalds",
//         "description": "this is a test of the post request for restaurants",
//             "primaryPictureURL": "https://images.unsplash.com/photo-1606720335177-3d04e70fb13b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//                 "location": "21520 Ustick rd caldwell idaho",
//                     "hours": [
//                         {
//                             "open": "10:00",
//                             "close": "21:00",
//                             "day": "Monday"
//                         },
//                         {
//                             "open": "10:00",
//                             "close": "21:00",
//                             "day": "Tuesday"
//                         },
//                         {
//                             "open": "10:00",
//                             "close": "21:00",
//                             "day": "Wednesday"
//                         },
//                         {
//                             "open": "10:00",
//                             "close": "21:00",
//                             "day": "Thursday"
//                         },
//                         {
//                             "open": "10:00",
//                             "close": "21:00",
//                             "day": "Friday"
//                         },
//                         {
//                             "open": "9:00",
//                             "close": "23:00",
//                             "day": "Saturday"
//                         }, {
//                             "open": "9:00", "close": "23:00", "day": "Sunday"
//                         }
//                     ],
//                     "type": "american",
//                         "primaryColor": "#000000",
//                             "logoURL": "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// }