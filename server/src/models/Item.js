import { Schema } from "mongoose";

export const ItemSchema = new Schema({
  restaurantId: { type: Schema.ObjectId, required: true, ref: 'Restaurant' },
  name: { type: String, required: true, maxLength: 20, },
  picture: { type: String, required: true, maxLength: 200, },
  price: { type: Number, min: 0, max: 1000, required: true },
  description: { type: String, required: true, maxLength: 200, },
  isAvailable: { type: Boolean, required: true, default: true },
  type: { type: String, enum: [`breakfast`, `lunch`, `dinner`, `burgers`, `pizza`, `sushi`, `sandwiches`, `salads`, `seafood`, `barbecue`, `breakfast`, `brunch`, `desserts`, `ice cream`, `wings`, `vegetarian`, `vegan`, `healthy`, `fast food`, `comfort food`, `noodles`, `pasta`, `poke`, `ramen`, `smoothies`, `coffee`, `bakery`, `donuts`, `fried chicken`, `tacos`, `burritos`, `soup`, `steak`, `seafood`, `wraps`, `kebabs`, `halal`]},
  isDeleted: { type: Boolean, required: true, default: false }
},
  { timestamps: true, toJSON: { virtuals: true } })